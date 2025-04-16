import User from "../../Models/Users.js";

const VerifyToken = async (req,res) => {

    const { token } = req.body;

    if(!token){
        return res.status(400).json({ error: 'Acesso e Senha são obrigatórios' });
    }
    console.log(token)
    try{
        const user = await User.findOne({ where: { token: token } });
        console.log(user)
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
        if(!(token  === user.dataValues.token) ){
            res.status(400).json({
                error: 'jsson'
            })
        }
        res.status(200).json("deu certo")

    }catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export default VerifyToken;