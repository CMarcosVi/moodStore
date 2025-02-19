// /middleware/verificarToken.js
import User from '../../Models/Users'; // Modelo de usuário

const verificarToken = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const user = await User.findOne({ where: { token } });
        if (!user) {
            return res.redirect('/login');
        }
        req.user = user;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.status(403).json({ error: 'Erro ao verificar o token' });
    }
};

export default verificarToken;
