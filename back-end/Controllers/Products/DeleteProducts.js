
import axios from "axios";
import Product from "../../Models/Product.js";
import dotenv from "dotenv";

dotenv.config();

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
        const Products = await Product.findOne({ where: { id_product } });
        if (!Products) {
            return res.status(400).json({ error: 'produto não encontrado' });
        }

        await Products.destroy({where: {id_product}});

        const externalUrl = 'http://127.0.0.1:5900/analytics';
        const currentDateTime = getCurrentDateTime();
        await axios.post(externalUrl, {
            type: 'delete',
            id_product: id_product,
            created_at: currentDateTime 
        },{
            headers: {
                'X-API-Key': process.env.X_API_key,
            }
        });
        return res.status(200).json({ message: 'Excluido com sucesso' });

    } catch (error) {
       console.error('Erro ao deletar produto:', error);
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default deleteProduct;
