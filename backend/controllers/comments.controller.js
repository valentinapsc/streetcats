const { Comment, User } = require('../models');

exports.list = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { catId: req.params.catId },
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['username'] }]
    });
    res.json(comments);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.create = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Testo obbligatorio' });

  try {
    const comment = await Comment.create({
      text,
      catId: req.params.catId,
      userId: req.user.id
    });
    res.json(comment);
  } catch (e) { res.status(500).json({ error: e.message }); }
};