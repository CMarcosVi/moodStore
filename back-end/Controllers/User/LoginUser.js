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
        const accessSanitizad = sanitization.sanitizeName(access);
        const passwordSanitizad = sanitization.sanitizePassword(password);
        const user = await User.findOne({ where: { access: accessSanitizad } });
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        /*
        const isPasswordValid = await bcrypt.compare(passwordSanitizad, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha inválida' });
        }
            */

        // teste APROVADO
        if(passwordSanitizad !== user.password){
            return res.status(400).json({error : 'MDJEINVJ'});
        }

        const token = crypto.randomBytes(64).toString('hex');

        await user.update({ token });

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
