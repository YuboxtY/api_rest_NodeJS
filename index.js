const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>¡El servidor está funcionando!</h1>');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});