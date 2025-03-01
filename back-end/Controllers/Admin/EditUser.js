import User from "../../Models/Users.js";
import Team from "../../Models/Team.js";
import sanitization from "../../utils/sanitization.js";
import bcrypt from "bcrypt";

const updateUser = async (req, res) => {
  const { name, email, access, password, id_collaborator, type_user } = req.body;

  try {
    if (!id_collaborator) {
      return res.status(400).json({ error: "Por favor, forneça o id_collaborator." });
    }

    const user = await User.findOne({ where: { id_collaborator } });
    if (user) {
      let hashedPassword = user.password;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);~
        console.log(hashedPassword)
      }

      // Atualizando as informações do usuário
      user.name = name || sanitization.sanitizeName(user.name);
      user.email = email || sanitization.sanitizeEmail(user.email);
      user.access = access || sanitization.sanitizeName(user.access);
      user.password = hashedPassword; // Senha será atualizada apenas se fornecida
      user.type_user = type_user || sanitization.sanitizeName(user.type_user);

      // Atualizando a tabela Team, removendo o nome do usuário de todos os componentes
      await Team.update(
        { component1: null, component2: null, component3: null, component4: null },
        {
          where: {
            [sequelize.Op.or]: [
              { component1: user.name },
              { component2: user.name },
              { component3: user.name },
              { component4: user.name }
            ]
          }
        }
      );

      // Salvar as alterações do usuário
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar o usuário", message: error.message });
  }
};

export default updateUser;
