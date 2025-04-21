import User from '../Models/Users.js';

const verificarTokenUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log("Token recebido:", token);

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    const user = await User.findOne({ where: { token } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não autorizado." });
    }

    if (token !== user.token) {
      return res.status(403).json({ error: "Token inválido." });
    }

    // ✅ Verificação do tipo de usuário
    if (!(user.type_user === "user" || user.type_user === "admin")) {
      return res.status(403).json({ error: "Permissão insuficiente." });
    }

    console.log("Usuário autenticado:", user);

    req.user = user;
    next(); // ✅ Middleware autorizado, continua
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(500).json({ error: "Erro interno ao verificar token." });
  }
};

export default verificarTokenUser;
