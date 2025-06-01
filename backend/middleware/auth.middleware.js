// Questo middleware verifica la presenza e la validità di un token JWT nell'header Authorization

const jwt = require("jsonwebtoken"); // Per la verifica dei token JWT

// In produzione una variabile d'ambiente per la chiave segreta
const JWT_SECRET = "la_mia_chiave_super_segretissima";

// Questo middleware verifica la presenza e la validità di un token JWT nell'header Authorization
// Se il token è valido, aggiunge i dati dell'utente a req.user e chiama next()
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Accesso negato: token non fornito" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // si possono utilizzare i dati dell'utente in req.user se necessario
    next(); // Passa al prossimo middleware o alla route
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ error: "Accesso negato: token non valido" });
  }
};

// Il backend è stateless, quindi non mantiene lo stato della sessione tra le richieste.
// Questa scelta consente di scalare facilmente l'applicazione, poiché ogni richiesta contiene tutte le informazioni necessarie per autenticare l'utente.
