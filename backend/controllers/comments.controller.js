const { Comment, User } = require('../models');

exports.list = async (req, res) => {
  const { catId } = req.params;
  const comments = await Comment.findAll({
    where: { catId },
    order: [['createdAt', 'DESC']],
    include: [{ model: User, attributes: ['username'] }]
  });
  res.json(comments);
};

exports.create = async (req, res) => {
  const { catId } = req.params;
  const { text }  = req.body;
  if (!text) return res.status(400).json({ error: 'Testo obbligatorio' });

  const comment = await Comment.create({
    text,
    catId,
    userId: req.user.id
  });
  res.json(comment);
};