// questo file definisce la connessione al database SQLite utilizzando Sequelize
const sequelize = require('../config/db');

// import di tutti i modelli
const Cat      = require('./Cat')(sequelize, Sequelize.DataTypes);
const User     = require('./User')(sequelize, Sequelize.DataTypes);
const Comment  = require('./Comment')(sequelize, Sequelize.DataTypes);

// chiamata alle associate per ogni modello
// in modo che possano essere collegate tra loro
Object.values(sequelize.models)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => model.associate(sequelize.models));

// sincronizza il database
sequelize.sync().then(() => console.log('DB sincronizzato'));