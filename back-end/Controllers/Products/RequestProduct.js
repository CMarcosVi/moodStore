// LoginUser.js

import User from "../../Models/Users";


const requestProducts = async (req, res) => {
    const { id_product } = req.body;

    if (!id_product) {
        return res.status(400).json({ error: 'Por favor insira um valor' });
    }

    try {
        const products = await User.findOne({ where: { id_product } }); //mudar User para Products
        if (!products) {
            return res.status(400).json({ error: 'Produto não encontrado' });
        }
        return res.status(200).json({ message: 'Produto encontrado', value: products });

    } catch (error) {
       console.error('Erro ao procurar Produto', error);
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default requestProducts;
