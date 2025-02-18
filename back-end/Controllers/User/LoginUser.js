// LoginUser.js

import User from "../../Models/Users";


const loginUser = async (req, res) => {
    const { access, password } = req.body;

    if (!access || !password) {
        return res.status(400).json({ error: 'Acesso e Senha são obrigatórios' });
    }

    try {
        const user = await User.findOne({ where: { access } });
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
        if(user.password !== password){
            res.status(400).json({ error : 'senha invalida'})
        };
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha inválida' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido', token });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default loginUser;
