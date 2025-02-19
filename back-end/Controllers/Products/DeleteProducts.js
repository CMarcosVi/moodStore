// LoginUser.js

import User from "../../Models/Users";


const deleteProduct = async (req, res) => {
    const { id_product } = req.body;

    if (!id_collaborator) {
        return res.status(400).json({ error: 'Por favor insira um valor' });
    }

    try {
        const user = await User.findOne({ where: { id_product } }); //mudar User para Product
        if (!user) {
            return res.status(400).json({ error: 'produto não encontrado' });
        }

        await User.destroy({where: {id_product}});
        return res.status(200).json({ message: 'Excluido com sucesso' });

    } catch (error) {
       console.error('Erro ao deletar produto:', error);
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default deleteProduct;
