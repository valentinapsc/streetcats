// Definisce il modello Comment per Sequelize, che rappresenta una tabella nel database.
// Questo modello è associato a Cat e User, permettendo di gestire i commenti sui gatti

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      text: { type: DataTypes.TEXT, allowNull: false },
    },
    { timestamps: true }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.Cat, {
      foreignKey: { name: "catId", allowNull: false },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Comment.belongsTo(models.User, {
      foreignKey: { name: "userId", allowNull: false },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Comment;
};
