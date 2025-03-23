import { DataTypes } from 'sequelize';
import sequelize from './ConfingDb.js';

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
       validate: {
           isEmail: true, // Ensures the email is in the correct format
       },
   },
   password: {
       type: DataTypes.STRING(128),  // Specifies a max length for password
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
        defaultValue: null,
   },
   wage: {
        type: DataTypes.DECIMAL(10, 2), // For monetary precision
        allowNull: true,
   },
   position: {
        type: DataTypes.STRING,
        allowNull: true,
   }
}, {
   tableName: 'Users',
   timestamps: false, // Disables createdAt and updatedAt fields
   indexes: [
       { unique: true, fields: ['email'] },
       { fields: ['id_collaborator'] },
   ],
});

export default User;
