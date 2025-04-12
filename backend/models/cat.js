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
  },
});

module.exports = Cat;