import bcrypt from 'bcrypt'; 
import crypto from 'crypto';
import User from "../../Models/Users.js";
import sanitization from '../../utils/sanitization.js';

const loginUser = async (req, res) => {
    const { access, password } = req.body;

    if (!access || !password) {
        return res.status(400).json({ error: 'Acesso e Senha são obrigatórios' });
    }

    try { 
        // Sanitizar os dados de entrada
        const accessSanitized = sanitization.sanitizeName(access);
        const passwordSanitized = sanitization.sanitizePassword(password);

        // Encontrar o usuário baseado no 'access' (nome ou email)
        const user = await User.findOne({ where: { access: accessSanitized } });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Comparar a senha fornecida com a senha armazenada (criptografada)
        const isPasswordValid = await bcrypt.compare(passwordSanitized, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha inválida' });
        }

        // Gerar um token único e seguro
        const token = crypto.randomBytes(64).toString('hex');

        // Atualizar o token no banco de dados do usuário
        await user.update({ token });

        // Enviar o token como cookie na resposta
        res.cookie('token', token, {
            httpOnly: true,  // O cookie não pode ser acessado via JavaScript
            secure: false,   // Defina como 'true' se você estiver usando HTTPS
            maxAge: 10080000, // Expiração do cookie (1 hora, por exemplo)
            sameSite: 'None', // Se você estiver trabalhando com diferentes domínios, use 'None'
        });

        // Retornar a resposta com sucesso e o token
        return res.status(200).json({ 
            message: 'Login bem-sucedido',
            token: token
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default loginUser;
