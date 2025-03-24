import Customer from "../../Models/Customer.js";
import dotenv from "dotenv";
import sanitization from "../../utils/sanitization.js";

dotenv.config();

const updateProduct = async (req, res) => {
    try {
        const { company_name, email, phone, id_Customer, status, country } = req.body;

        if (!id_Customer) {
            return res.status(400).json({ error: "O campo 'id_Customer' é obrigatório" });
        }

        const sanitization_id_customer = sanitization.sanitizeID(id_Customer);

        const customer = await Customer.findOne({ where: { id_Customer: sanitization_id_customer } });

        if (customer) {
            if (company_name) {
                customer.company_name = sanitization.sanitizeName(company_name);
            }
            if (email) {
                customer.email = sanitization.sanitizeEmail(email);
            }
            if (phone) {
                customer.phone = sanitization.sanitizeNumber(phone);
            }
            if (status) {
                customer.status = sanitization.sanitizeName(status);
            }
            if (country) {
                customer.country = sanitization.sanitizeName(country);
            }
            await customer.save();
            /*
            const urlAnalitcs = 'http://127.0.0.1:5900/analyticsPerson';
            let analyticsMessage = 'Usuário atualizado com sucesso, mas não foi possível enviar os dados para a API de Analytics.'
            try {
                const response = await axios.post(urlAnalitcs, {
                    type: 'edit',
                    company_name: customer.company_name,
                    email: customer.email,
                    phone: customer.phone,
                    id_Customer: sanitization_id_Customer,
                    status: customer.status,
                    country: customer.country
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
            return res.status(200).json(customer);
        } else {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar o Cliente', message: error.message });
    }
};

export default updateProduct;
