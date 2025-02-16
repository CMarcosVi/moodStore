import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, { host: DB_HOST, dialect: DB_DIALECT, logging: false  })

async function testConection() {
    try{
        await sequelize.authenticate();
    }catch(error){
        console.log(error)
    }  
}
testConection();

export default sequelize;