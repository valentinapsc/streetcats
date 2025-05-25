const { Sequelize, DataTypes } = require('sequelize');

// 1.  CREA L'ISTANZA SEQUELIZE 
const sequelize = new Sequelize({
  dialect : 'sqlite',
  storage : './db.sqlite',
  logging : false                 // true se vuoi loggare le query
});

// 2.  IMPORTA MODELLI (pattern factory)
const Cat     = require('./Cat')(sequelize, DataTypes);
const User    = require('./User')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);

// 3.  REGISTRA ASSOCIAZIONI se il modello espone .associate()

Object.values(sequelize.models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(sequelize.models));

/*  Esempio:
Cat.belongsTo(User,    { foreignKey:'userId' });
User.hasMany(Cat,      { foreignKey:'userId' });
Comment.belongsTo(Cat, { foreignKey:'catId' });
Comment.belongsTo(User,{ foreignKey:'userId' });
*/

// 4. Sincronizza subito in sviluppo

if (process.env.NODE_ENV === 'development') {
  sequelize.sync({ alter: true })
           .then(() => console.log('📄 DB sincronizzato (dev)'))
           .catch(err => console.error('Errore sync:', err));
}

// 5.  EXPORT così nei controller faccio:
//       const { Cat } = require('../models');

module.exports = { sequelize, Cat, User, Comment };