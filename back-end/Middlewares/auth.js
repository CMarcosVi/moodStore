import User from '../Models/Users.js';

const verificarToken = async (req, res, next) => {
    const token = '952e437ee9d5d365755c2cc360df6f29262041070eb54df5fa9688d570f36ca88ef434e08755b56acb24f6dddae73b30d9bd4d13b0fb3828252f65c2ea89a8bd';  // Obtém o token dos cookies

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const user = await User.findOne({ where: { token } });

        if (!user) {
            return res.redirect('/login');
        }
        req.user = user;

        next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.status(403).json({ error: 'Erro ao verificar o token' });
    }
};

export default verificarToken;
