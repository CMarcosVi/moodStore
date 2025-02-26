// LoginUser.js

import Product from "../../Models/Product.js";


const deleteProduct = async (req, res) => {
    const { id_product } = req.body;

    if (!id_collaborator) {
        return res.status(400).json({ error: 'Por favor insira um valor' });
    }

    try {
        const Product = await Product.findOne({ where: { id_product } }); //mudar User para Product
        if (!Product) {
            return res.status(400).json({ error: 'produto não encontrado' });
        }

        await Product.destroy({where: {id_product}});
        return res.status(200).json({ message: 'Excluido com sucesso' });

    } catch (error) {
       console.error('Erro ao deletar produto:', error);
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default deleteProduct;
