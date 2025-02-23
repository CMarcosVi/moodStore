import Team from '../models/Team';

export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.body;
    const team = await Team.findByPk(id);

    if (team) {
      await team.destroy();
      res.status(200).json({ message: 'Time excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Time não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erro ao excluir time', error });
  }
};
