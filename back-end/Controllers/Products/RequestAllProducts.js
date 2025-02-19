// requestUser.js

import Product from "../../Models/Product";  // Importando o modelo de usuário

const requestAllProduct = async (req, res) => {
    try {
        const products = await Product.findAll(); //mudar User para Products

        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'Nenhum usuário encontrado' });
        }

        return res.status(200).json({ message: 'Usuários encontrados', value: products });

    } catch (error) {
        console.error('Erro ao procurar usuários:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default requestAllProduct;
