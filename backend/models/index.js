// Definisci i modelli Sequelize per il progetto
// Questo file importa Sequelize, definisce i modelli e le associazioni tra di essi.

const { Sequelize, DataTypes } = require("sequelize");

// CREA L'ISTANZA SEQUELIZE
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false, // true se vuoi loggare le query
});

// IMPORTA MODELLI (pattern factory perchè ogni modello è una funzione che accetta sequelize e DataTypes)
const Cat = require("./Cat")(sequelize, DataTypes);
const User = require("./User")(sequelize, DataTypes);
const Comment = require("./Comment")(sequelize, DataTypes);

// REGISTRA ASSOCIAZIONI se il modello espone .associate()
Object.values(sequelize.models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(sequelize.models));

/*  Esempio:
Cat.belongsTo(User,    { foreignKey:'userId' });
User.hasMany(Cat,      { foreignKey:'userId' });
Comment.belongsTo(Cat, { foreignKey:'catId' });
Comment.belongsTo(User,{ foreignKey:'userId' });
*/

// Sincronizza subito in sviluppo, cioè crea le tabelle se non esistono
// e aggiorna le colonne se necessario (alter: true)
if (process.env.NODE_ENV === "development") {
  sequelize
    .sync({ alter: true })
    .then(() => console.log("📄 DB sincronizzato (dev)"))
    .catch((err) => console.error("Errore sync:", err));
}

// EXPORT così nei controller faccio:
// const { Cat } = require('../models');
// e posso accedere ai metodi dei modelli come Cat.findAll(), User.create(), etc.

module.exports = { sequelize, Cat, User, Comment };