// questo file definisce la connessione al database SQLite utilizzando Sequelize
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false  // Imposta a true se vuoi vedere i log delle query SQL
});

module.exports = sequelize;