import Team from '../../../Models/Team.js';

const getTeamById = async (req, res) => {
  const  {nameTeam} = req.body;
  
  if (!nameTeam) {
    return res.status(400).json({ error: 'Por favor insira um valor' });
  }

  try {
    const team = await Team.findOne({ where: { nameTeam } });
    if (!team) {
        return res.status(400).json({ error: 'Time não encontrado' });
    }
    return res.status(200).json({ value: team });
  } catch (error) {
    console.error('Erro ao procurar usuario', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export default getTeamById;