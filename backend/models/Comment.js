module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text:      { type: DataTypes.TEXT, allowNull: false },
  }, { timestamps: true });

  Comment.associate = models => {
    Comment.belongsTo(models.Cat,  { foreignKey: 'catId',  onDelete: 'CASCADE' });
    Comment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return Comment;
};