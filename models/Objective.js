import { DataTypes } from 'sequelize';

import SEQUELIZE_CONNECTION from '../utils/database.js';

const Objective = SEQUELIZE_CONNECTION.define('objectives', {
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default Objective;