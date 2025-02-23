import Team from '../models/Team';

export const createTeam = async (req, res) => {
  try {
    const { nameTeam, teamArea, component1, component2, component3, component4 } = req.body;
    const team = await Team.create({ nameTeam, teamArea, component1, component2, component3, component4 });
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar time', error });
  }
};
