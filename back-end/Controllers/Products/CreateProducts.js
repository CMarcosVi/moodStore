import axios from "axios";
import Product from "../../Models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const sanitizeInput = (input) => {
    return input.trim().replace(/<[^>]*>/g, ''); 
};
const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }); 
};
const createProduct = async (req, res) => {
    const { name, id_product, quantity } = req.body;

    // Verificar se todos os campos obrigatórios foram fornecidos
    if (!name || !quantity || !id_product) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios", product: req.body });
    }

    // Validar se 'quantity' e 'id_product' são números válidos
    const sanitized_quantity = parseInt(quantity, 10); // Garantir que a quantidade seja um número inteiro
    const sanitized_id_product = parseInt(id_product, 10); // Garantir que o id_product seja um número inteiro

    if (isNaN(sanitized_quantity) || isNaN(sanitized_id_product)) {
        return res.status(400).json({ error: 'Quantity e id_product devem ser números válidos' });
    }

    try {
        // Sanitizar o nome para remover qualquer HTML ou caracteres especiais
        const sanitized_name = sanitizeInput(name);

        // Verificar se o produto com o mesmo id já existe
        const existingProduct = await Product.findOne({ where: { id_product: sanitized_id_product } });

        if (existingProduct) {
            return res.status(400).json({ error: 'Este Produto já está cadastrado.' });
        }

        // Criar o novo produto no banco de dados
        const createNewProduct = await Product.create({
            name: sanitized_name,
            quantity: sanitized_quantity,
            id_product: sanitized_id_product
        });

        const urlAnalitcs = 'http://127.0.0.1:5900/analytics'
        const currentDateTime = getCurrentDateTime();
        await axios.post(urlAnalitcs, {
            type: 'create',
            name: sanitized_name,
            quantity: sanitized_quantity,
            id_product: sanitized_id_product,
            created_at: currentDateTime
        },{
            headers: {
                'X-API-Key': process.env.X_API_key,
            }
        })
        // Retornar uma resposta de sucesso
        return res.status(201).json({ message: 'Novo produto criado', Produto: createNewProduct });

    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Exportando a função para ser utilizada em outro lugar
export default createProduct;
