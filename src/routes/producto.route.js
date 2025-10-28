const controller = require('../controllers/producto.controller');
const express = require('express');
const router = express.Router();

router.post('/', controller.crearProducto);
router.get('/', controller.obtenerProductos);

module.exports = router;