import { DataTypes } from 'sequelize';
import sequelize from './ConfingDb.js';
import User from './Users.js';

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
      model: 'Users',
      key: 'id_collaborator',
    },
  },
  component2: {
    type: DataTypes.STRING,
    references: {
      model: 'Users',
      key: 'id_collaborator',
    },
  },
  component3: {
    type: DataTypes.STRING,
    references: {
      model: 'Users',
      key: 'id_collaborator',
    },
  },
  component4: {
    type: DataTypes.STRING,
    references: {
      model: 'Users',
      key: 'id_collaborator',
    },
  },
}, {
  tableName: 'Teams',
  timestamps: false,
});

// Definindo associações
Team.belongsTo(User, { foreignKey: 'component1' });
Team.belongsTo(User, { foreignKey: 'component2' });
Team.belongsTo(User, { foreignKey: 'component3' });
Team.belongsTo(User, { foreignKey: 'component4' });

export default Team;
