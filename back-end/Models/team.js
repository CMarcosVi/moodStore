import { DataTypes } from 'sequelize';
import sequelize from './ConfingDb.js';


const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameTeam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamArea: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  component1: {
    type: DataTypes.STRING,
    references: {
      model: 'Users', // Tabela Users
      key: 'name', // Chave estrangeira referencia o campo name
    },
  },
  component2: {
    type: DataTypes.STRING,
    references: {
      model: 'Users',
      key: 'name',
    },
  },
  component3: {
    type: DataTypes.STRING,
    references: {
      model: 'Users',
      key: 'name',
    },
  },
  component4: {
    type: DataTypes.STRING,
    references: {
      model: 'Users',
      key: 'name',
    },
  },
}, {
  tableName: 'Teams',
  timestamps: false, // Caso não queira utilizar createdAt/updatedAt
});

export default Team;
