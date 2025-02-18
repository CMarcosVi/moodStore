// CreateUser.js

import User from "../../Models/Users";

// Função para sanitizar os dados de entrada
const sanitizeInput = (input) => {
    return input.trim().replace(/<[^>]*>/g, ''); // Remove tags HTML e espaços extras
};

// Função para criar o usuário
const createUser = async (req, res) => {
    const { name, access, email, password, id_collaborator, type_user } = req.body;

    if (!name || !access || !email || !password || !id_collaborator || !type_user) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const sanitized_name = sanitizeInput(name);
        const sanitized_access = sanitizeInput(access);
        const sanitized_email = sanitizeInput(email);
        const sanitized_password = sanitizeInput(password);
        const sanitized_id_collaborator = parseInt(id_collaborator, 10); // Garantir que o id_collaborator seja um número
        const sanitized_type_user = sanitizeInput(type_user);

        if (!['user', 'admin'].includes(sanitized_type_user)) {
            return res.status(400).json({ error: 'O tipo de usuário deve ser "user" ou "admin".' });
        }

        // Verificando se o email já está cadastrado
        const existingUser = await User.findOne({ where: { email: sanitized_email } });

        if (existingUser) {
            return res.status(400).json({ error: 'Este email já está cadastrado.' });
        }

        // Criando o novo usuário
        const newUserCreate = await User.create({
            name: sanitized_name,
            access: sanitized_access,
            email: sanitized_email,
            password: sanitized_password,  // Em um ambiente real, criptografe a senha!
            id_collaborator: sanitized_id_collaborator,
            type_user: sanitized_type_user
        });

        return res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUserCreate });

    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Exportando a função para ser utilizada em outro lugar
export default createUser;
