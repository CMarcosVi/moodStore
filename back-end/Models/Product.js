import { DataTypes } from 'sequelize';
import sequelize from './ConfingDb.js';

const Product = sequelize.define('Product', {
   id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
   },
   name: {
       type: DataTypes.STRING,
       allowNull: false,
   },
   quantidy: {
       type: DataTypes.INTEGER,
       allowNull: false,
   },
   id_product: {
       type: DataTypes.INTEGER,
       allowNull: false,
       unique: true,
   },
}, {
   tableName: 'Users',
   timestamps: false, // Desativa os campos createdAt e updatedAt, caso não queira usá-los
});



 export default Product;