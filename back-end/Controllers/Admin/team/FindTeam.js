import Team from '../../../Models/team.js';

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: 'Time não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erro ao obter time', error });
  }
};

export default getTeamById;