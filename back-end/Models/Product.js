import { DataTypes } from 'sequelize';
import sequelize from './ConfingDb.js';

const Product = sequelize.define('Products', {
   id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
   },
   name: {
       type: DataTypes.STRING,
       allowNull: false,
   },
   quantity: {  // Corrigido de 'quantidy' para 'quantity'
       type: DataTypes.INTEGER,
       allowNull: false,
   },
   id_product: {
       type: DataTypes.INTEGER,
       allowNull: false,
       unique: true,
   },
   price_for_unit: {
    type: DataTypes.FLOAT,
    allowNull: false,
},
}, {
   tableName: 'Products',  // Corrigido de 'Users' para 'Products'
   timestamps: false, // Desativa os campos createdAt e updatedAt, caso não queira usá-los
});

export default Product;
