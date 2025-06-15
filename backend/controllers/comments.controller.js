import { Comment, User } from '../models/index.js';

// GET /api/cats/:catId/comments
export async function list(req, res) {
  try {
    const comments = await Comment.findAll({
      where: { catId: req.params.catId },
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['id', 'username'] }]
    });
    return res.json(comments);
  } catch (err) {
    console.error('Errore listComments:', err);
    return res.status(500).json({ error: err.message });
  }
}

// POST /api/cats/:catId/comments
export async function create(req, res) {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Testo obbligatorio.' });
  }

  try {
    const userId = req.user.id;
    const catId  = parseInt(req.params.catId, 10);

    // 1) creo il commento
    const comment = await Comment.create({ text, catId, userId });

    // 2) ricarico con l’associazione User
    const created = await Comment.findByPk(comment.id, {
      include: [{ model: User, attributes: ['id', 'username'] }]
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error('Errore createComment:', err);
    return res.status(500).json({ error: err.message });
  }
}