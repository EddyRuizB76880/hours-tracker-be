import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const SEQUELIZE_CONNECTION = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});


export default SEQUELIZE_CONNECTION;