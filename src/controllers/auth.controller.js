const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

// Generar Token de Acceso
const generarToken = (user) => {
    return jwt.sign({
        id: user.id,
        correo: user.correo,
        nombre: user.nombre
    },
        process.env.JWT_SECRET || 'secreto_super_seguro',
        { expiresIn: '1h' });
};

// Generar Refresh Token
const generarRefreshToken = (user) => {
    return jwt.sign({
        id: user.id
    },
        process.env.REFRESH_TOKEN_SECRET || 'refresh_secreto_super_seguro',
        { expiresIn: '7d' });
};

exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const existe = await Usuario.findOne({ where: { correo } });

        if (existe) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }
        const hash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            password: hash,
            refreshToken: ''
        });
        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ where: { correo: correo } });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Credenciales invalidas' });
        }

        const valido = await bcrypt.compare(password, usuario.password);
        if (!valido) {
            return res.status(400).json({ mensaje: 'Credenciales invalidas' });
        }

        const token = generarToken(usuario);
        const refreshToken = generarRefreshToken(usuario);

        // Actualizar refresh token en BD
        usuario.refreshToken = refreshToken;
        await usuario.save();

        // Enviar refresh token en cookie httpOnly
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // true en producción con https
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        });

        res.status(200).json({ mensaje: 'Login exitoso', token: token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: 'No autorizado' });

        const usuario = await Usuario.findOne({ where: { refreshToken: token } });
        if (!usuario) return res.status(401).json({ message: 'No autorizado' });

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || 'refresh_secreto_super_seguro');

        const nuevoToken = generarToken(usuario);
        res.status(200).json({ token: nuevoToken });
    } catch (error) {
        res.status(401).json({ message: 'No autorizado' });
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(204).end();

        const usuario = await Usuario.findOne({ where: { refreshToken: token } });
        if (usuario) {
            usuario.refreshToken = null;
            await usuario.save();
        }

        res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'strict' });
        res.json({ message: 'Logout exitoso' });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};