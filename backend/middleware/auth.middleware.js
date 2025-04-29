const jwt = require('jsonwebtoken');

// In produzione una variabile d'ambiente per la chiave segreta
const JWT_SECRET = 'la_mia_chiave_super_segretissima';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Accesso negato: token non fornito' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // si possono utilizzare i dati dell'utente in req.user se necessario
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Accesso negato: token non valido' });
  }
};