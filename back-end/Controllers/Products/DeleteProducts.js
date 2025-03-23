import Product from "../../Models/Product.js";
import dotenv from "dotenv";
import axios from "axios";
import sanitization from "../../utils/sanitization.js";

dotenv.config();

const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

const deleteProduct = async (req, res) => {
    const { id_product } = req.body;

    const sanitized_id_product_initial = sanitization.sanitizeNumber(id_product);

    if (!sanitized_id_product_initial) {
        return res.status(400).json({ error: 'Por favor insira um valor válido para o ID do produto' });
    }

    try {
        const product = await Product.findOne({ where: { id_product: sanitized_id_product_initial } });

        if (!product) {
            return res.status(400).json({ error: 'Produto não encontrado' });
        }

        // Sanitizing other fields from the product before sending to analytics
        const sanitized_name = sanitization.sanitizeName(product.name);
        const sanitized_quantity = sanitization.sanitizeNumber(product.quantity);
        const sanitized_price_for_unit = sanitization.sanitizeNumber(product.price_for_unit);

        // Excluindo o produto do banco de dados
        await product.destroy();

        // Obter a data e hora atual
        const currentDateTime = getCurrentDateTime();

        // Enviar dados de analytics
        const urlAnalitcs = 'http://127.0.0.1:5900/analytics';
        await axios.post(urlAnalitcs, {
            type: 'delete',  // Alterando para 'delete' já que o produto está sendo excluído
            name: sanitized_name,
            quantity: sanitized_quantity,
            id_product: sanitized_id_product_initial,
            price_for_unit: sanitized_price_for_unit,  // Usando o ID sanitizado
            deleted_at: currentDateTime,  // Alterando o campo para 'deleted_at'
        }, {
            headers: {
                'X-API-Key': process.env.X_API_key,  // A chave da API
            }
        });

        return res.status(200).json({ message: 'Produto excluído com sucesso' });

    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default deleteProduct;
