// src/app.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const productoRoutes = require('./routes/producto.route');
const categoriaRoutes = require('./routes/categoria.route');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/login.route');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api/auth', authRoutes);
app.use('/api/productos', authMiddleware, productoRoutes);
app.use('/api/categorias', authMiddleware, categoriaRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion establecida a la base de datos exitosa');
        await sequelize.sync({ alter: true });
        console.log('tablas sincronizadas');
        app.listen(process.env.PORT, () => {
            console.log(`Tu servidor esta corriendo en el puerto ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
})();

