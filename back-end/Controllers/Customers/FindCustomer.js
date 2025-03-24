import Customer from "../../Models/Customer.js";
import dotenv from "dotenv";
import sanitization from "../../utils/sanitization.js";

dotenv.config();

const findCustomer = async (req, res) => {
    const { id_Customer } = req.body;
    const sanitized_id_product_initial = sanitization.sanitizeNumber(id_Customer);
    if (!sanitized_id_product_initial) {
        return res.status(400).json({ error: 'Cliente Não Encontrado' });
    }

    try {
        const FindCustomer = await Customer.findOne({ where: { id_Customer: sanitized_id_product_initial } });

        if (!FindCustomer) {
            return res.status(404).json({ error: 'Nenhum cliente encontrado' });
        }

        return res.status(200).json({ value: FindCustomer });
    } catch (error) {
        console.error('Erro ao procurar Clientes:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export default findCustomer;
