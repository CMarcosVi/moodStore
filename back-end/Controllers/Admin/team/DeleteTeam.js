import Team from '../../../Models/Team.js';

const deleteTeam = async (req, res) => {
  try {
    const { nameTeam } = req.body;
    console.log(nameTeam);
    const team = await Team.findOne({where :{nameTeam}});

    if (team) {
      await team.destroy();
      res.status(200).json({ message: 'Time excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Time não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erro ao excluir time', error: error });
  }
};

export default deleteTeam;