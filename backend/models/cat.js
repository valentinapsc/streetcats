// questo file definisce il modello per i gatti utilizzando Sequelize e definisce le colonne del database
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Cat = sequelize.define('Cat', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  lat: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  lng: {
    type: DataTypes.REAL,
    allowNull: false,
  },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
      timestamps: true   // aggiunge createdAt / updatedAt
      // createdAt si popola automaticamente all’INSERT
});

module.exports = Cat;