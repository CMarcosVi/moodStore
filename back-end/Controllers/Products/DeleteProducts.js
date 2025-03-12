import { Kafka } from 'kafkajs';
import Product from "../../Models/Product.js";
import dotenv from "dotenv";

dotenv.config();


const kafka = new Kafka({
    clientId: 'product-service',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();

const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }); 
};

const deleteProduct = async (req, res) => {
    const { id_product } = req.body;

    if (!id_product) {
        return res.status(400).json({ error: 'Por favor insira um valor' });
    }

    try {
        const product = await Product.findOne({ where: { id_product } });
        if (!product) {
            return res.status(400).json({ error: 'Produto não encontrado' });
        }

        await product.destroy({ where: { id_product } });

        // Enviar a operação de delete para o Kafka
        await producer.connect();
        const currentDateTime = getCurrentDateTime();
        await producer.send({
            topic: 'product-events',  // Nome do tópico Kafka
            messages: [
                {
                    value: JSON.stringify({
                        type: 'delete',
                        name: product.name,
                        id_product: product.id_product,
                        created_at: currentDateTime,
                    })
                }
            ]
        });

        await producer.disconnect();

        return res.status(200).json({ message: 'Produto excluído com sucesso' });

    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default deleteProduct;
