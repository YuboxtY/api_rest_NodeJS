const controller = require('../controllers/categoria.controller');
const express = require('express');
const router = express.Router();

router.post('/', controller.crearCategoria);
router.get('/', controller.obtenerCategorias);

router.get('/:id', controller.obtenerCategoriaPorId);

router.put('/:id', controller.actualizarCategoria);

router.delete('/:id', controller.eliminarCategoria);

module.exports = router;
