// src/models/categoria.model.js
const { DataTypes } = require('sequelize'); // Importa los tipos de datos de Sequelize
const sequelize = require('../config/database'); // Importa la configuración de la base de datos

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})


module.exports = Categoria; // Exporta el modelo Categoria