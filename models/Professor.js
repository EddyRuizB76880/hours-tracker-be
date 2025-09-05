import { DataTypes } from 'sequelize';

import SEQUELIZE_CONNECTION from '../utils/database.js';

const Professor = SEQUELIZE_CONNECTION.define('professors', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
  field: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  professorId:{
    type: DataTypes.STRING,
    autoIncrement: false,
  }
});

export default Professor;