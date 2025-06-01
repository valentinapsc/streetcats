const bcrypt = require("bcryptjs"); // Per l'hashing delle password
const jwt = require("jsonwebtoken"); // Per la generazione dei token JWT
const { User } = require("../models"); // Per accedere al modello User

// Una chiave segreta per JWT (in produzione dovrei usare una variabile d'ambiente), serve per firmare i token
// Nota: Non dovrei mai hardcodare la chiave segreta in un file di codice, solo per scopo dimostrativo si usa qui
// In un'applicazione reale, dovrei usare process.env.JWT_SECRET o simile per gestire le chiavi segrete

//(un token JWT è un modo per rappresentare in modo sicuro le informazioni tra due parti, come un client e un server)

const JWT_SECRET = "la_mia_chiave_super_segretissima";

// Funzioni per la registrazione e il login degli utenti
// Queste funzioni saranno utilizzate nei router per gestire le richieste di autenticazione
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "I campi username, email e password sono obbligatori." });
  }
  try {
    // Controlla se l'utente esiste già
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "Email già registrata." });
    }

    // Hash della password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea l'utente
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Rimuove la password dalla risposta per sicurezza
    // Non dovrei mai inviare la password in chiaro come risposta
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funzione per il login degli utenti
// Questa funzione verifica le credenziali dell'utente e genera un token JWT se sono corrette
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "I campi email e password sono obbligatori." });
  }
  try {
    // Trova l'utente per email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato." });
    }

    // Verifica la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenziali non valide." });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
