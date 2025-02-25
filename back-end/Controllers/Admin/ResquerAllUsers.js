// requestUser.js
// teste APROVADO
import User from "../../Models/Users.js"; 
const requestAllUser = async (req, res) => {
    try {
        const users = await User.findAll();

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'Nenhum usuário encontrado' });
        }

        return res.status(200).json({ message: 'Usuários encontrados', value: users });

    } catch (error) {
        console.error('Erro ao procurar usuários:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default requestAllUser;
