const controller = require('../controllers/categoria.controller');
const express = require('express');
const router = express.Router();

router.post('/', controller.crearCategoria);
router.get('/', controller.obtenerCategorias);

module.exports = router;
