// servidor con Express
const express = require('express');
//cargar variables de entorno
require('dotenv').config();
const app = express();

app.use(express.json());

// --- Rutas ---

// Ruta GET
app.get('/api/hello', (req, res) => {
    const name = "Juan";
    res.send(`Hola, mi nombre es ${name}`);
});

// Ruta POST
app.post('/api/saludo', (req, res) => {
    const { name, apellido } = req.body;
    console.log(name, apellido);
    res.status(200).send('se ha recibido el saludo');
});

//Crear un end point de tipo POST que reciba en body datos de un producto
//y devolver por console el end point /api/producto

app.post('/api/producto', (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    console.log(nombre, precio, descripcion);
    res.status(200).send('se ha recibido el producto');
})


//Iniciar Servidor en el puerto 3000

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});