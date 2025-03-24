import Customer from "../../Models/Customer.js";
import dotenv from "dotenv";
//import axios from "axios";
import sanitization from "../../utils/sanitization.js";

dotenv.config();

/*const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};*/

const deleteProduct = async (req, res) => {
    const { id_collaborator } = req.body;

    const sanitized_id_collaborator = sanitization.sanitizeNumber(id_collaborator);

    if (!sanitized_id_collaborator) {
        return res.status(400).json({ error: 'Por favor insira um valor válido para o ID do Cliente' });
    }

    try {
        const customer = await Customer.findOne({ where: { id_Customer: sanitized_id_collaborator } });

        if (!customer) {
            return res.status(400).json({ error: 'Cliente não encontrado' });
        }
        /*
        const urlAnalitcs = 'http://127.0.0.1:5900/analyticsPerson';
        let analyticsMessage = 'Usuário atualizado com sucesso, mas não foi possível enviar os dados para a API de Analytics.'
        try {
            const response = await axios.post(urlAnalitcs, {
                type: 'delete',
                company_name: customer.company_name,
                id_Customer: sanitized_id_collaborator,
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
        // Excluindo o produto do banco de dados
        await customer.destroy();

        return res.status(200).json({ message: 'Produto excluído com sucesso' });

    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default deleteProduct;
