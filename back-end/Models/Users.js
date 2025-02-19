import { DataTypes } from 'sequelize';
import sequelize from './ConfingDb';

const User = sequelize.define('User', {
   id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
   },
   name: {
       type: DataTypes.STRING,
       allowNull: false,
   },
   access: {
       type: DataTypes.STRING,
       allowNull: false,
   },
   email: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
   },
   password: {
       type: DataTypes.STRING,
       allowNull: false,
   },
   id_collaborator: {
       type: DataTypes.INTEGER,
       allowNull: false,
   },
   type_user: {
       type: DataTypes.ENUM('user', 'admin'),
       allowNull: false,
   },
   token: {
    type: DataTypes.STRING,
    allowNull: true,
   }
}, {
   tableName: 'Users',
   timestamps: false, // Desativa os campos createdAt e updatedAt, caso não queira usá-los
});



 export default User;