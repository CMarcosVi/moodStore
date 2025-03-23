import { where } from 'sequelize';
import Team from '../../../Models/Team.js';
import User from '../../../Models/Users.js'; // Importando o modelo User para validação

const createTeam = async (req, res) => {
  try {
    // Extrair os valores do corpo da requisição
    const { nameTeam, teamArea, component1, component2, component3, component4 } = req.body;

    // Verificar se algum dos componentes está vazio e atribuir null
    const teamData = {
      nameTeam,
      teamArea,
      component1: component1 || null, // Se component1 estiver vazio, define como null
      component2: component2 || null, // Se component2 estiver vazio, define como null
      component3: component3 || null, // Se component3 estiver vazio, define como null
      component4: component4 || null, // Se component4 estiver vazio, define como null
    };

    // Verificar se o time já existe
    const teamExist = await Team.findOne({ where: { nameTeam } });
    if (teamExist) {
      return res.status(400).json({ error: 'Time já existente.' });
    }

    // Verificar se todos os componentes são usuários válidos
    const components = [component1, component2, component3, component4];
    for (const component of components) {
      if (component && !await User.findOne({ where: { id_collaborator: component } })) {
        return res.status(400).json({ error: `O componente com ID ${component} não é um usuário válido.` });
      }
    }

    // Criar o time no banco de dados
    const team = await Team.create(teamData);

    // Responder com o time criado
    res.status(201).json(team);
  } catch (error) {
    console.error('Erro ao criar time:', error);
    res.status(400).json({ message: 'Erro ao criar time', error: error.message });
  }
};

export default createTeam;
