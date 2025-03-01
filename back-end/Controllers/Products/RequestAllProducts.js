
import Product from "../../Models/Product.js";

const requestAllProduct = async (req, res) => {
    try {
        const products = await Product.findAll();

        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'Nenhum produto encontrado' });
        }

        return res.status(200).json({ value: products });

    } catch (error) {
        console.error('Erro ao procurar produtos:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default requestAllProduct;
