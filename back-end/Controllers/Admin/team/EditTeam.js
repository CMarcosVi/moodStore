import Team from '../../../Models/Team.js';

export const updateTeam = async (req, res) => {
  try {
    const { nameTeam, teamArea, component1, component2, component3, component4 } = req.body;
    
    // Encontrar o time pelo nome
    const team = await Team.findOne({ where: { nameTeam } });

    if (team) {
      // Preparar os dados a serem atualizados, mantendo os valores existentes se o novo valor for vazio
      const updatedData = {
        teamArea: teamArea || team.teamArea, // Se teamArea for vazio, mantém o valor atual
        component1: component1 || team.component1, // Se component1 for vazio, mantém o valor atual
        component2: component2 || team.component2, // Se component2 for vazio, mantém o valor atual
        component3: component3 || team.component3, // Se component3 for vazio, mantém o valor atual
        component4: component4 || team.component4  // Se component4 for vazio, mantém o valor atual
      };

      // Atualizar o time no banco de dados
      await team.update(updatedData);

      // Retornar o time atualizado
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: 'Time não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar time', error: error.message });
  }
};

export default updateTeam;
