const controller = require('../controllers/producto.controller');
const express = require('express');
const router = express.Router();

// Rutas de los productos
router.post('/', controller.crearProducto); // Crear
router.get('/', controller.obtenerProductos); // Leer Todos
router.get('/:id', controller.obtenerProductoPorId); // Leer por ID
router.put('/:id', controller.actualizarProducto); // Actualizar
router.delete('/:id', controller.eliminarProducto); // Eliminar

module.exports = router;