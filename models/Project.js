import { DataTypes } from 'sequelize';

import SEQUELIZE_CONNECTION from '../utils/database.js';

const Project = SEQUELIZE_CONNECTION.define('projects', {
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

export default Project;