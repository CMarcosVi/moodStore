import User from '../Models/Users.js';
import cookieParser from 'cookie-parser';

const verificarTokenAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return res.redirect('/login');
        }
        const user = await User.findOne({ where: { token } });

        if (!user || user.type_user !== 'admin') {
            return res.redirect('/login');
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.status(403).json({ error: 'Erro ao verificar o token' });
    }
};

export default verificarTokenAdmin;
