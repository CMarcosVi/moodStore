// /middleware/verificarToken.js
import User from '../../Models/Users'; // Modelo de usuário

const verificarToken = async (req, res) => {
    const token = req.cookies.token;

    // Verifica se o token existe nos cookies
    if (!token) {
        // Se não houver token, redireciona para a página de login
        return res.redirect('/login');
    }

    try {
        // Verificando no banco se o token corresponde a um usuário
        const user = await User.findOne({ where: { token } });

        // Se o token não for encontrado ou não corresponder a nenhum usuário, redireciona para a página de login
        if (!user) {
            return res.redirect('/login');
        }

        // Adiciona o usuário à requisição
        req.user = user;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.status(403).json({ error: 'Erro ao verificar o token' });
    }
};

export default verificarToken;
