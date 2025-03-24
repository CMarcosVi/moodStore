//import axios from "axios";
import Customer from "../../Models/Customer.js";
import dotenv from "dotenv";
import sanitization from "../../utils/sanitization.js";
dotenv.config();

/*const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};*/

const createCustomer = async (req, res) => {
    const { company_name, email, phone, id_Customer, status, country } = req.body;

    if (!company_name || !email || !phone || !id_Customer || !status || !country) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios", product: req.body });
    }

    try {
        const sanitized_company_name = sanitization.sanitizeName(company_name);
        const sanitization_email = sanitization.sanitizeEmail(email)
        const sanitization_phone = sanitization.sanitizeNumber(phone)
        const sanitization_id_Customer = sanitization.sanitizeNumber(id_Customer)
        const sanitized_status = sanitization.sanitizeName(status);
        const sanitization_country = sanitization.sanitizeName(country)

        const existingProduct = await Product.findOne({ where: { id_Customer: sanitization_id_Customer } });

        if (existingProduct) {
            return res.status(400).json({ error: 'Este Produto já está cadastrado.' });
        }

        const createNewCustomer = await Customer.create({
            company_name: sanitized_company_name,
            email: sanitization_email,
            phone: sanitization_phone,
            id_Customer: sanitization_id_Customer,
            status:sanitized_status,
            country: sanitization_country
        });
        /*
        const urlAnalitcs = 'http://127.0.0.1:5900/analyticsCustomers';
        let analyticsMessage = 'Usuário atualizado com sucesso, mas não foi possível enviar os dados para a API de Analytics.'
        try {
            const response = await axios.post(urlAnalitcs, {
                type: 'Create',
                company_name: sanitized_company_name,
                email: sanitization_email,
                phone: sanitization_phone,
                id_Customer: sanitization_id_Customer,
                status:sanitized_status,
                country: sanitization_country
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

        return res.status(201).json({ message: 'Novo produto criado', Produto: createNewCustomer });

    } catch (error) {
        console.error('Erro ao criar produto:', error);

    }
};

export default createCustomer;
