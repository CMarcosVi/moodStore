import Team from '../../../Models/Team.js';

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

    // Criar o time no banco de dados
    const team = await Team.create(teamData);

    // Responder com o time criado
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar time', error });
  }
};

export default createTeam;
