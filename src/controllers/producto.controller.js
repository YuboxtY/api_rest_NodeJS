const Producto = require('../models/producto.model');

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoriaId, descripcion } = req.body;
        const nuevoProducto = await Producto.create({
            nombre,
            precio,
            stock,
            categoriaId,
            descripcion
        });
        res.status(201).json(nuevoProducto);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear el producto'
        });
    }
}

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos'
        });
    }
}

// Obtener un producto por ID 
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el producto'
        });
    }
}

// Actualizar un producto 
exports.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        // Actualiza el producto con los datos del body
        await producto.update(req.body);

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el producto'
        });
    }
}

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        await producto.destroy();
        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el producto'
        });
    }
}