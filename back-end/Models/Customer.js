import { DataTypes } from 'sequelize';
import sequelize from './ConfingDb.js';

const Customers = sequelize.define('Customers', {
   id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
   },
   company_name: {
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
   phone: {
       type: DataTypes.NUMBER(128),  // Specifies a max length for password
       allowNull: false,
   },
   id_Customer: {
       type: DataTypes.INTEGER,
       allowNull: false,
   },
   status: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended'),
        allowNull: false,
   },
   country: {
        type: DataTypes.STRING,
        allowNull: false,
   }

}, {
   tableName: 'Customers',
   timestamps: false, // Disables createdAt and updatedAt fields
   indexes: [
       { unique: true, fields: ['email'] },
       { fields: ['id_Customer'] },
   ],
});

export default Customers;
