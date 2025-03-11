import axios from "axios";
import Product from "../../Models/Product.js";
import dotenv from "dotenv";

dotenv.config();

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

            const externalUrl = 'http://127.0.0.1:5900/analytics';
            const currentDateTime = getCurrentDateTime();
            await axios.post(externalUrl, {
                type: 'edit',
                id_product: product.id_product,
                name: product.name,
                quantity: product.quantity,
                created_at: currentDateTime 
            },{
                headers: {
                    'X-API-Key': process.env.X_API_key,
                }
            });
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar o produto', message: error.message });
    }
};

export default updateProduct;
