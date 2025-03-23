import { Op, Sequelize } from 'sequelize'; // Importando o Op e Sequelize do Sequelize
import User from "../../Models/Users.js";
import Team from "../../Models/Team.js";
import axios from 'axios'; // Importando axios

const updateUser = async (req, res) => {
    const { id_collaborator, name, email, access, password, type_user, wage, position } = req.body;

    // Verificando se o id_collaborator foi fornecido
    if (!id_collaborator) {
        return res.status(400).json({ error: 'Por favor, insira um valor para id_collaborator.' });
    }

    try {
        // 1. Verificar se o usuário existe na tabela User
        const user = await User.findOne({ where: { id_collaborator } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // 2. Verificar se os dados recebidos são diferentes dos existentes no banco
        const isDataSame = user.name === name &&
                           user.email === email &&
                           user.access === access &&
                           user.password === password &&
                           user.type_user === type_user &&
                           user.wage === wage &&
                           user.position === position;

        // Se todos os dados forem iguais, não permite a atualização
        if (isDataSame) {
            return res.status(400).json({ error: 'Nenhuma alteração detectada nos dados do usuário' });
        }

        // 3. Atualizar o usuário na tabela User com os dados recebidos
        await User.update(
            {
                name,      // Atualiza o nome
                email,     // Atualiza o email
                access,    // Atualiza o access
                password,  // Atualiza a senha
                type_user, // Atualiza o tipo de usuário
                wage,      // Atualiza o salário
                position,  // Atualiza a posição
            },
            {
                where: { id_collaborator },
            }
        );

        // 4. Verificar se o id_collaborator está relacionado a algum time
        const userTeam = await Team.findOne({
            where: {
                [Op.or]: [
                    { component1: id_collaborator },
                    { component2: id_collaborator },
                    { component3: id_collaborator },
                    { component4: id_collaborator },
                ],
            },
        });

        if (userTeam) {
            // 5. Se o colaborador estiver em algum time, atualizar os campos da tabela Team (se necessário)
            await Team.update(
                {
                    component1: Sequelize.literal(
                        `CASE WHEN component1 = ${id_collaborator} THEN ${id_collaborator} ELSE component1 END`
                    ),
                    component2: Sequelize.literal(
                        `CASE WHEN component2 = ${id_collaborator} THEN ${id_collaborator} ELSE component2 END`
                    ),
                    component3: Sequelize.literal(
                        `CASE WHEN component3 = ${id_collaborator} THEN ${id_collaborator} ELSE component3 END`
                    ),
                    component4: Sequelize.literal(
                        `CASE WHEN component4 = ${id_collaborator} THEN ${id_collaborator} ELSE component4 END`
                    ),
                },
                {
                    where: {
                        [Op.or]: [
                            { component1: id_collaborator },
                            { component2: id_collaborator },
                            { component3: id_collaborator },
                            { component4: id_collaborator },
                        ],
                    },
                }
            );
        }

        // Enviar os dados para a API de Analytics
        const urlAnalitcs = 'http://127.0.0.1:5900/analytics';
        let analyticsMessage = 'Usuário atualizado com sucesso, mas não foi possível enviar os dados para a API de Analytics.';

        try {
            const response = await axios.post(urlAnalitcs, {
                type: 'edit',
                name,
                id_collaborator,
                wage,
                position
            }, {
                headers: {
                    'X-API-Key': process.env.X_API_key,  // A chave da API
                }
            });

            // Verificar a resposta da API de Analytics
            if (response.status === 200) {
                analyticsMessage = 'Usuário atualizado com sucesso e dados enviados para a API de Analytics.';
            } else {
                throw new Error(`Falha ao comunicar com a API de Analytics. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API de Analytics:', error.message);
        }

        return res.status(200).json({ message: analyticsMessage });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.stack);
        return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
};

export default updateUser;
