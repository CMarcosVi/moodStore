import User from "../../Models/Users.js";

const VerifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido ou mal formatado." });
    }

    const user = await User.findOne({ where: { token } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não autorizado." });
    }

    if (token !== user.token) {
      return res.status(403).json({ error: "Token inválido." });
    }

    req.user = user;
    return res.status(200).json({ message: "Token válido" });
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(500).json({ error: "Erro interno ao verificar token." });
  }
};

export default VerifyToken;
