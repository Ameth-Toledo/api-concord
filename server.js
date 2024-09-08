const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./models');

const app = express();
const port = process.env.PORT || 3000; // Usa el puerto de la variable de entorno, o 3000 si no está definido

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente.', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
