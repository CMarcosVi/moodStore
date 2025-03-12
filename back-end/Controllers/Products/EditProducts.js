import { Kafka } from 'kafkajs';
import Product from "../../Models/Product.js";
import dotenv from "dotenv";

dotenv.config();

// Configuração do Kafka
const kafka = new Kafka({
    clientId: 'product-service',
    brokers: ['localhost:9092'] // Seu broker Kafka
});
const producer = kafka.producer();

const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });  
};

const updateProduct = async (req, res) => {
    try {
        const { id_product, name, quantity } = req.body;

        if (!id_product || !name || !quantity) {
            return res.status(400).json({ error: "Campos obrigatórios faltando." });
        }

        const product = await Product.findOne({ where: { id_product } });

        if (product) {
            product.name = name || product.name;
            product.quantity = quantity || product.quantity;  

            await product.save();

            // Enviar a operação de edit para o Kafka
            await producer.connect();
            const currentDateTime = getCurrentDateTime();
            await producer.send({
                topic: 'product-events',  // Nome do tópico Kafka
                messages: [
                    {
                        value: JSON.stringify({
                            type: 'edit',
                            id_product: product.id_product,
                            name: product.name,
                            quantity: product.quantity,
                            created_at: currentDateTime
                        })
                    }
                ]
            });

            await producer.disconnect();

            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar o produto', message: error.message });
    }
};

export default updateProduct;
