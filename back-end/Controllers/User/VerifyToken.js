import User from "../../Models/Users.js";

const verificarTokenUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "Token não fornecido." });
        }

        const user = await User.findOne({ where: { token } });

        if (!user) {
            return res.status(401).json({ error: "Usuário não autorizado." });
        }

        // Você pode colocar user no req para uso futuro:
        req.user = user;

        next(); // ✅ prossegue para o próximo middleware ou controller
    } catch (error) {
        console.error("Erro ao verificar token:", error);
        return res.status(500).json({ error: "Erro interno ao verificar token." });
    }
};

export default verificarTokenUser;
