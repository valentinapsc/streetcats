import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email e password sono obbligatori.' });
    }
    // verifica unicità
    const existing = await User.findOne({
      where: { username }  // puoi estendere con Op.or su email
    });
    if (existing) {
      return res.status(409).json({ error: 'Username già in uso.' });
    }
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({ username, email, password: hashed });
    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt
    });
  } catch (err) {
    console.error('Errore register:', err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: err.errors.map(e=>e.message).join(', ') });
    }
    return res.status(500).json({ error: 'Errore interno durante la registrazione' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email e password sono obbligatori.' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenziali non valide.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Credenziali non valide.' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.error('Errore login:', err);
    return res.status(500).json({ error: 'Errore interno durante il login' });
  }
}