import User from "../Models/Users.js";

const VerifyAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    const user = await User.findOne({ where: { token } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não autorizado." });
    }

    if (user.type_user !== 'admin') {
      return res.status(403).json({ error: "Acesso restrito a administradores." });
    }

    return res.status(200) ;
  } catch (error) {
    console.error("Erro ao verificar admin:", error);
    return res.status(500).json({ error: "Erro interno na verificação de admin." });
  }
};

export default VerifyAdmin;
