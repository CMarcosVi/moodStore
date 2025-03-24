import { Op, Sequelize } from 'sequelize';
import User from "../../Models/Users.js";
import Team from "../../Models/Team.js";
import axios from 'axios';  // Importando axios para chamada da API de analytics

const deleteUser = async (req, res) => {
    const { id_collaborator } = req.body;

    if (!id_collaborator) {
        return res.status(400).json({ error: 'Por favor insira um valor para id_collaborator.' });
    }

    try {
        // Verificar se o usuário existe na tabela Users
        const user = await User.findOne({ where: { id_collaborator } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado na tabela Users' });
        }

        // Verificar se o usuário está relacionado a algum time (referência na tabela Team)
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

        if (userTeamDelete) {
            // Se o usuário for encontrado na tabela Team, atualize a tabela para remover a referência
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
        }
        /*
        const urlAnalitcs = 'http://127.0.0.1:5900/analyticsPerson';
        let analyticsMessage = 'Usuário atualizado com sucesso, mas não foi possível enviar os dados para a API de Analytics.'
        try {
            const response = await axios.post(urlAnalitcs, {
                type: 'delete',
                id_collaborator: user.id_collaborator,  // Alterado para id_collaborator
                name: user.name,  // nome do usuário
                wage: user.wage,
                position: user.position
            }, {
                headers: {
                    'X-API-Key': process.env.X_API_key,  // A chave da API
                }
            });
             

            // Verificar a resposta da API de Analytics
            if (response.status === 200) {
                analyticsMessage = 'Usuário criado com sucesso e dados enviados para a API de Analytics.';
            } else {
                throw new Error(`Falha ao comunicar com a API de Analytics. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API de Analytics:', error.message);
        }
        */
        await User.destroy({ where: { id_collaborator } });

        return res.status(200).json({ message: 'Usuário e suas referências excluídas com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.stack);
        if (error.response) {
            // Logando os detalhes do erro de resposta do Axios
            console.error('Detalhes da resposta de erro do Axios:', error.response.data);
            return res.status(500).json({ error: 'Erro ao comunicar com a API de Analytics', details: error.response.data });
        }
        return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
};

export default deleteUser;
