import { Sequelize } from "sequelize";

const SEQUELIZE_CONNECTION = new Sequelize('hours-tracker', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});


export default SEQUELIZE_CONNECTION;