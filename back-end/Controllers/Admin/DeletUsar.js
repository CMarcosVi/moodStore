import { Op, Sequelize } from 'sequelize'; // Importando Op e Sequelize do Sequelize
import User from "../../Models/Users.js";
import Team from "../../Models/Team.js";

const deleteUser = async (req, res) => {
    const { id_collaborator } = req.body;

    if (!id_collaborator) {
        return res.status(400).json({ error: 'Por favor insira um valor para id_collaborator.' });
    }

    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ where: { id_collaborator } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verificar se o usuário está relacionado a algum time (referência no Team)
        const userTeamDelete = await Team.findOne({
            where: {
                [Op.or]: [
                    { component1: id_collaborator },
                    { component2: id_collaborator },
                    { component3: id_collaborator },
                    { component4: id_collaborator }
                ]
            }
        });

        if (!userTeamDelete) {
            return res.status(404).json({ error: 'Usuário não encontrado na tabela Team' });
        }

        await Team.update(
            {
                component1: Sequelize.literal(`CASE WHEN component1 = ${id_collaborator} THEN NULL ELSE component1 END`),
                component2: Sequelize.literal(`CASE WHEN component2 = ${id_collaborator} THEN NULL ELSE component2 END`),
                component3: Sequelize.literal(`CASE WHEN component3 = ${id_collaborator} THEN NULL ELSE component3 END`),
                component4: Sequelize.literal(`CASE WHEN component4 = ${id_collaborator} THEN NULL ELSE component4 END`)
            },
            {
                where: {
                    [Op.or]: [
                        { component1: id_collaborator },
                        { component2: id_collaborator },
                        { component3: id_collaborator },
                        { component4: id_collaborator }
                    ]
                }
            }
        );
        const urlAnalitcs = 'http://127.0.0.1:5900/analytics';

        const response = await axios.post(urlAnalitcs, {
            type: 'delete',
            name: id_collaborator,
            id_collaborator: user.name,
            wage: user.wage,
            position: user.position
        }, {
            headers: {
                'X-API-Key': process.env.X_API_key,  // A chave da API
            }
        });
        // Verificar a resposta da API de Analytics
        if (response.status !== 200) {
            return res.status(500).json({ error: 'Falha ao registrar dados de analytics', details: response.data });
        }
        // Deletar o usuário da tabela User
        await User.destroy({ where: { id_collaborator } });

        return res.status(200).json({ message: 'Usuário e suas referências excluídas com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.stack);
        return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
};

export default deleteUser;
