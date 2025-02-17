import { DataTypes } from 'sequelize';
import sequelize from './ConfingDb';

const User = sequelize.define('User',  { 
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
     }
     ,
     name: { 
        type: DataTypes.STRING,
        allowNull: false,
     },
     email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
     }

 }, {  
   tableName: 'users',
   timestamps: false,
 } );


 export default User;