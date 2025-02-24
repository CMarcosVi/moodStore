// LoginUser.js

import User from "../../Models/Users.js";


const deleteUser = async (req, res) => {
    const { id_collaborator } = req.body;

    if (!id_collaborator) {
        return res.status(400).json({ error: 'Por favor insira um valor' });
    }

    try {
        const user = await User.findOne({ where: { id_collaborator } });
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        await User.destroy({where: {id_collaborator}});
        return res.status(200).json({ message: 'Excluido com sucesso' });

    } catch (error) {
       console.error('Erro ao deletar usuário:', error);
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default deleteUser;