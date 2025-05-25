module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: { type: DataTypes.TEXT, allowNull: false }
  }, { timestamps: true });

  Comment.associate = models => {
    Comment.belongsTo(models.Cat,  {
      foreignKey: { name: 'catId', allowNull: false },
      onDelete:   'CASCADE', onUpdate: 'CASCADE'
    });
    Comment.belongsTo(models.User, {
      foreignKey: { name: 'userId', allowNull: false },
      onDelete:   'CASCADE', onUpdate: 'CASCADE'
    });
  };

  return Comment;
};