import User from "../../Models/Users.js";
import sanitization from "../../utils/sanitization.js";


const updateUser = async (req, res) => {
    try {
      
      const { name, email, access, password,id_collaborator, type_user } = req.body;
      const user = await User.findByPk(req.params.id_collaborator);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      if (user) {
        user.name = name || sanitization.sanitizeName(user.name);
        user.email = email || sanitization.sanitizeEmail(user.email);
        user.access = access || sanitization.sanitizeName(user.access);
        user.password = hashedPassword || user.hashedPassword;
        user.id_collaborator = id_collaborator || sanitization.sanitizeID(user.id_collaborator);
        user.type_user = type_user || sanitization.sanitizeName(user.type_user);
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o usuário', message: error.message });
    }
};

export default updateUser;