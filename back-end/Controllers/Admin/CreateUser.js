import User from "../../Models/Users.js";
import bcrypt from 'bcrypt';
import sanitization from "../../utils/sanitization.js";
import axios from "axios";

const createUser = async (req, res) => {
    const { name, access, email, password, id_collaborator, type_user, wage, position } = req.body;

    if (!name || !access || !email || !password || !id_collaborator || !type_user || !wage || !position) {
        return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
    }

    try {
        const sanitized_name = sanitization.sanitizeName(name);
        const sanitized_access = sanitization.sanitizeName(access);
        const sanitized_email = sanitization.sanitizeEmail(email);
        const sanitized_password = sanitization.sanitizePassword(password);
        const sanitized_id_collaborator = parseInt(id_collaborator, 10);
        const sanitized_type_user = sanitization.sanitizeName(type_user);
        const sanitized_wage = sanitization.sanitizeFloat(wage)
        const sanitized_position = sanitization.sanitizeTextMessage(position)

        if (!['user', 'admin'].includes(sanitized_type_user)) {
            return res.status(400).json({ error: 'O tipo de usuário deve ser "user" ou "admin".' });
        }

        const existingAccess = await User.findOne({ where: { access: sanitized_access } });
        if (existingAccess) {
            return res.status(400).json({ error: 'Este tipo de acesso já está em uso.' });
        }

        const existingCollaborator = await User.findOne({ where: { id_collaborator: sanitized_id_collaborator } });
        if (existingCollaborator) {
            return res.status(400).json({ error: 'Este ID de colaborador já está em uso.' });
        }

        const existingUser = await User.findOne({ where: { email: sanitized_email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Este email já está cadastrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sanitized_password, salt);

        const newUserCreate = await User.create({
            name: sanitized_name,
            access: sanitized_access,
            email: sanitized_email,
            password: hashedPassword,
            id_collaborator: sanitized_id_collaborator,
            type_user: sanitized_type_user,
            wage: sanitized_wage,
            position: sanitized_position,
        });
        function getCurrentTimestamp() {
            const now = new Date();
        
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Lembre-se que os meses são de 0 a 11
            const year = now.getFullYear();
        
            return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
        }
        // Enviar os dados para a API de Analytics
        const urlAnalitcs = 'http://127.0.0.1:5900/analyticsPerson';
        let analyticsMessage = 'Usuário criado com sucesso, mas não foi possível enviar os dados para a API de Analytics.';

        try {
            const response = await axios.post(urlAnalitcs, {
                type: 'create',
                name: sanitized_name,
                id_collaborator: sanitized_id_collaborator,
                type_user: sanitized_type_user,
                wage: sanitized_wage,
                position: sanitized_position,
                create_at: getCurrentTimestamp()  // Adiciona o horário atual no formato desejado
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

        return res.status(200).json({ message: analyticsMessage, user: newUserCreate });

    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default createUser;
