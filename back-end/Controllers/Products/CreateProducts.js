import axios from "axios";
import Product from "../../Models/Product.js";
import dotenv from "dotenv";
import sanitization from "../../utils/sanitization.js";
dotenv.config();

const sanitizeInput = (input) => {
    // Remove tags HTML, mas permite espaços e caracteres comuns
    return input.trim().replace(/<[^>]*>/g, '');
};

const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

const createProduct = async (req, res) => {
    const { name, id_product, quantity } = req.body;

    if (!name || !quantity || !id_product) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios", product: req.body });
    }

    try {
        const sanitized_name = sanitization.sanitizeName(name);
        const sanitization_quantity = sanitization.sanitizeNumber(quantity)
        const sanitization_id_product = sanitization.sanitizeNumber(id_product)

        const existingProduct = await Product.findOne({ where: { id_product: sanitization_id_product } });

        if (existingProduct) {
            return res.status(400).json({ error: 'Este Produto já está cadastrado.' });
        }

        const createNewProduct = await Product.create({
            name: sanitized_name,
            quantity: sanitization_quantity,
            id_product: sanitization_id_product
        });

        // até aqui tudo bem

        const urlAnalitcs = 'http://127.0.0.1:5900/analytics';
        console.log('até aqui suave');
        const currentDateTime = getCurrentDateTime();
        console.log('até aqui suave2');

        // Enviar os dados para o endpoint de Analytics
        const response = await axios.post(urlAnalitcs, {
            type: 'create',
            name: sanitized_name,
            quantity: sanitization_quantity,
            id_product: sanitization_id_product,
            created_at: currentDateTime
        }, {
            headers: {
                'X-API-Key': process.env.X_API_key,  // A chave da API
            }
        });

        // Verificar a resposta da API de Analytics
        if (response.status !== 200) {
            return res.status(500).json({ error: 'Falha ao registrar dados de analytics', details: response.data });
        }

        // Retornar uma resposta de sucesso
        return res.status(201).json({ message: 'Novo produto criado', Produto: createNewProduct });

    } catch (error) {
        console.error('Erro ao criar produto:', error);

        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            return res.status(500).json({ error: 'Sem resposta da API de analytics' });
        } else {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
};

export default createProduct;
