import Product from "../../Models/Product.js";

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

            const externalUrl = 'http://127.0.0.1:5900';
            await axios.post(externalUrl, {
                type: 'edit',
                id_product: product.id_product,
                name: product.name,
                quantity: product.quantity
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
