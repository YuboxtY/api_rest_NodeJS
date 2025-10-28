// src/models/producto.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoria.model');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})
// Relacion de 1 a n. Una Categoria tiene muchos Productos
Categoria.hasMany(Producto, {
  foreignKey: 'categoriaId',
  as: 'productos',
});

//Relacion inversa. Un Producto pertenece a una Categoria
Producto.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria',
});


module.exports = Producto;