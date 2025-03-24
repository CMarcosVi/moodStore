import Customer from "../../Models/Customer.js";
import dotenv from "dotenv";

dotenv.config();

const AllCustomers = async (req,res) => {
    try{
        const AllCustomers = await Customer.findAll();

        if (!AllCustomers || AllCustomers.length === 0) {
            return res.status(404).json({ error: 'Nenhum produto encontrado' });
        }

        return res.status(200).json({ value: AllCustomers });
    }catch (error) {
        console.error('Erro ao procurar Clientes:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export default AllCustomers;