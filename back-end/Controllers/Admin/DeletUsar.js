import User from "../../Models/Users.js";
import Team from '../../Models/Team.js';

const deleteUser = async (req, res) => {
    const { id_collaborator } = req.body;

    if (!id_collaborator) {
        return res.status(400).json({ error: 'Por favor insira um valor para id_collaborator.' });
    }

    const transaction = await sequelize.transaction();  // Usando uma transação para garantir que todas as operações sejam consistentes

    try {
        console.log('Procurando usuário com id_collaborator:', id_collaborator);

        // Verificar se o usuário existe no banco
        const user = await User.findOne({ where: { id_collaborator } }, { transaction });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Remover as referências do usuário nas colunas da tabela 'teams' (sem limpar a tabela inteira)
        await Team.update(
            {
                component1: sequelize.literal('CASE WHEN component1 = :name THEN NULL ELSE component1 END'),
                component2: sequelize.literal('CASE WHEN component2 = :name THEN NULL ELSE component2 END'),
                component3: sequelize.literal('CASE WHEN component3 = :name THEN NULL ELSE component3 END'),
                component4: sequelize.literal('CASE WHEN component4 = :name THEN NULL ELSE component4 END')
            },
            {
                where: {
                    [sequelize.Op.or]: [
                        { component1: user.name },
                        { component2: user.name },
                        { component3: user.name },
                        { component4: user.name }
                    ]
                },
                replacements: { name: user.name }, // Substituindo pelo nome do usuário
                transaction
            }
        );

        // Agora podemos excluir o usuário
        await User.destroy({ where: { id_collaborator }, transaction });

        // Commit da transação para garantir que todas as operações ocorram
        await transaction.commit();

        return res.status(200).json({ message: 'Usuário e suas referências excluídas com sucesso' });

    } catch (error) {
        // Rollback em caso de erro para garantir que não haja dados inconsistentes
        await transaction.rollback();
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default deleteUser;
