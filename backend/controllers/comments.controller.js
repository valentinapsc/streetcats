const { Comment, User } = require("../models"); // Importa i modelli Comment e User per accedere ai dati dei commenti e degli utenti

// Funzione per ottenere tutti i commenti di una categoria
// Restituisce un array di commenti in formato JSON, ordinati per data di creazione
exports.list = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { catId: req.params.catId },
      order: [["createdAt", "DESC"]],
      include: [{ model: User, attributes: ["username"] }],
    });
    res.json(comments);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Funzione per creare un nuovo commento
// Utilizza il modello Comment per creare un nuovo commento associato a una categoria e all'utente autenticato
exports.create = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Testo obbligatorio" });

  try {
    const comment = await Comment.create({
      text,
      catId: req.params.catId,
      userId: req.user.id,
    });

    const created = await Comment.findByPk(comment.id, {
      include: [{ model: User, attributes: ["id", "username"] }],
    });

    return res.status(201).json(created);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
