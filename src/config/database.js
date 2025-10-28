const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // base de datos nombre
  process.env.DB_USER, // base de datos usuario
  process.env.DB_PASSWORD, // base de datos contraseña
  {
    host: process.env.DB_HOST, // base de datos host
    port: process.env.DB_PORT, // base de datos puerto
    dialect: "mysql",    // base de datos MySQL
    logging: false, // desactiva los logs de Sequelize
  }
);

module.exports = sequelize;     
