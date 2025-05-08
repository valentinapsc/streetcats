// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Una chiave segreta per JWT (in produzione dovrei usare una variabile d'ambiente)
const JWT_SECRET = 'la_mia_chiave_super_segretissima';

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'I campi username, email e password sono obbligatori.' });
  }
  try {
    // Controlla se l'utente esiste già
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email già registrata.' });
    }

    // Hash della password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea l'utente
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Rimuove la password dalla risposta
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    };

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'I campi email e password sono obbligatori.' });
  }
  try {
    // Trova l'utente per email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato.' });
    }

    // Verifica la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenziali non valide.' });
    }

    // Genera un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};