import Team from '../../../Models/Team.js';
import User from '../../../Models/Users.js'; // Importando User para verificar a validade dos componentes

export const updateTeam = async (req, res) => {
  try {
    const { nameTeam, teamArea, component1, component2, component3, component4 } = req.body;

    // Verificar se o time existe
    const team = await Team.findOne({ where: { nameTeam } });

    if (!team) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }

    // Verificar se todos os componentes são usuários válidos
    const components = [component1, component2, component3, component4];
    for (const component of components) {
      if (component && !await User.findOne({ where: { id_collaborator: component } })) {
        return res.status(400).json({ error: `O componente com ID ${component} não é um usuário válido.` });
      }
    }

    // Preparar os dados a serem atualizados, mantendo os valores existentes se o novo valor for vazio
    const updatedData = {
      teamArea: teamArea || team.teamArea, // Se teamArea for vazio, mantém o valor atual
      component1: component1 === null ? null : (component1 === "" ? team.component1 : component1), // Atualiza com base na lógica descrita
      component2: component2 === null ? null : (component2 === "" ? team.component2 : component2), // Mesma lógica para component2
      component3: component3 === null ? null : (component3 === "" ? team.component3 : component3), // Mesma lógica para component3
      component4: component4 === null ? null : (component4 === "" ? team.component4 : component4)  // Mesma lógica para component4
    };
    if(component1,component2,component3,component4){
      
    }
    // Atualizar o time no banco de dados
    await team.update(updatedData);

    // Retornar o time atualizado
    res.status(200).json(team);
  } catch (error) {
    console.error('Erro ao atualizar time:', error);
    res.status(400).json({ message: 'Erro ao atualizar time', error: error.message });
  }
};

export default updateTeam;
