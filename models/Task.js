import { DataTypes } from 'sequelize';

import SEQUELIZE_CONNECTION from '../utils/database.js';

const Task = SEQUELIZE_CONNECTION.define('tasks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hoursSpent: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull:false
  },
  rejectionReason: {
    type: DataTypes.STRING,
    allowNull: true
  } 
});

export default Task;