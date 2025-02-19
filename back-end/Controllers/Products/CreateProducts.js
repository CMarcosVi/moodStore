// CreateUser.js

import User from "../../Models/Users";

const sanitizeInput = (input) => {
    return input.trim().replace(/<[^>]*>/g, ''); 
};

const createProduct = async (req, res) => {
    const { name, id_product ,quantidy } = req.body;

    if (!name || !quantidy) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const sanitized_name = sanitizeInput(name);
        const sanitized_quantidy = parseInt(quantidy);
        const sanitized_id_product = parseInt(id_product, 8);


        const existingUser = await User.findOne({ where: { email: sanitized_name } }); //mudar User para Product

        if (existingUser) {
            return res.status(400).json({ error: 'Este email já está cadastrado.' });
        }

        
        const createNewProduct = await User.create({
            name: sanitized_name,
            access: sanitized_quantidy,
            quantidy: sanitized_id_product
        });

        return res.status(201).json({ message: 'Novo produto criado', user: createNewProduct });

    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Exportando a função para ser utilizada em outro lugar
export default createProduct;
