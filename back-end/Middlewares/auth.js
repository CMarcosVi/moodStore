// /middleware/auth.js
import User from '../Models/Users.js'; // Modelo de usuário

const verificarToken = async (req, res, next) => {
    const token = '952e437ee9d5d365755c2cc360df6f29262041070eb54df5fa9688d570f36ca88ef434e08755b56acb24f6dddae73b30d9bd4d13b0fb3828252f65c2ea89a8bd';  // Obtém o token dos cookies

    if (!token) {
        // Se não houver token, redireciona para a página de login
        return res.redirect('/login');
    }

    try {
        // Busca o usuário associado a esse token
        const user = await User.findOne({ where: { token } });

        if (!user) {
            // Se o usuário não for encontrado, redireciona para a página de login
            return res.redirect('/login');
        }

        // Se o token for válido, coloca o usuário na requisição para uso nas rotas seguintes
        req.user = user;

        // Passa o controle para o próximo middleware ou rota
        next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.status(403).json({ error: 'Erro ao verificar o token' });
    }
};

export default verificarToken;
