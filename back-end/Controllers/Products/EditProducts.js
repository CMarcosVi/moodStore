
import Product from "../../Models/Product.js";
import dotenv from "dotenv";
import axios from "axios";
import sanitization from "../../utils/sanitization.js";

dotenv.config();


const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });  
};

const updateProduct = async (req, res) => {
    try {
        const { id_product, name, quantity, price_for_unit } = req.body;

        if (!id_product || !name || !quantity || !price_for_unit) {
            return res.status(400).json({ error: "Campos obrigatórios faltando." });
        }
        const sanitization_id_product = sanitization.sanitizeID(id_product);
        const product = await Product.findOne({ where: { id_product:sanitization_id_product } });

        if (product) {
            const sanitization_name = sanitization.sanitizeName(name);
            const sanitization_quantity = sanitization.sanitizeName(quantity);
            const sanitization_price_product = sanitization.sanitizeFloat(price_for_unit);

            product.name = sanitization_name;
            product.quantity = sanitization_quantity;
            product.price_for_unit = sanitization_price_product;

            await product.save();
            
            const urlAnalitcs = 'http://127.0.0.1:5900/analytics'
            const currentDateTime = getCurrentDateTime();

            await axios.post(urlAnalitcs, {
                type: 'edit',
                name: product.name,
                quantity: product.quantity,
                id_product: product.id_product,
                price_product: sanitization_price_product,
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
