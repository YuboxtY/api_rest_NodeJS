const Categoria = require('../models/categoria.model');
exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevaCategoria = await Categoria.create({
            nombre,
            descripcion
        });
        res.status(201).json(nuevaCategoria);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la categoria'
        });
    }
}

// Obtener todas las categorias
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las categorias'
        });
    }
}

// Obtener una categoria por ID
exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoria no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener la categoria'
        });
    }

}
// Actualizar una categoria
exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoria no encontrada' });
        }
        const { nombre, descripcion } = req.body;
        categoria.nombre = nombre;
        categoria.descripcion = descripcion;
        await categoria.save();
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la categoria'
        });
    }

}
// Eliminar una categoria
exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoria no encontrada' });
        }

        await categoria.destroy();
        res.status(200).json({ mensaje: 'Categoria eliminada exitosamente' });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la categoria'
        });
    }
}


