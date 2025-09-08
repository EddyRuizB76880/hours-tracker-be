import { DataTypes } from 'sequelize';

import SEQUELIZE_CONNECTION from '../utils/database.js';

const Student = SEQUELIZE_CONNECTION.define('students', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.SMALLINT,
    defaultValue: 0,
    allowNull: false
  },
  internalId:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    autoIncrement: false,
  },
  hoursRemaining: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  beganOn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

export default Student;