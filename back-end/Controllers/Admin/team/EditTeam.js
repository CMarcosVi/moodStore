import Team from '../../../Models/team.js';

export const updateTeam = async (req, res) => {
  try {
    const { nameTeam, teamArea, component1, component2, component3, component4 } = req.body;
    const team = await Team.findByPk(req.body.id);

    if (team) {
      await team.update({ nameTeam, teamArea, component1, component2, component3, component4 });
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: 'Time não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar time', error });
  }
};

export default updateTeam;
