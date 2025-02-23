import Team from '../models/Team';

// Obter todos os times
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao obter times', error });
  }
};
