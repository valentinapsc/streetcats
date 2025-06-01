// Questo file definisce il modello Cat per Sequelize, che rappresenta una tabella nel database.
// (Sequelize è un ORM per Node.js che facilita l'interazione con i database relazionali)

module.exports = (sequelize, DataTypes) => {
  const Cat = sequelize.define(
    "Cat",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      lat: { type: DataTypes.REAL, allowNull: false },
      lng: { type: DataTypes.REAL, allowNull: false },
      image: { type: DataTypes.STRING },
    },
    { timestamps: true }
  );

  return Cat;
};
