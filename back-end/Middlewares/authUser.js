import User from '../Models/Users.js';
import cookieParser from 'cookie-parser';

const verificarTokenUser = async (req, res, next) => {
    const token = req.cookies.token;  

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const user = await User.findOne({ where: { token } });

        if (!user) {
            return res.redirect('/login');
        }

        if(!(user.type_user === "user" || user.type_user === "admin")){
            return res.redirect('/login');
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.status(403).json({ error: 'Erro ao verificar o token' });
    }
};

export default verificarTokenUser;
