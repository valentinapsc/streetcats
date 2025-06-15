import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Instanza di Sequelize con SQLite
const sequelize = new Sequelize({
  dialect : 'sqlite',
  storage : path.join(__dirname, '../db.sqlite'),
  logging : false
});

// Importa le factory dei modelli
import UserFactory from './User.js';
import CatFactory from './Cat.js';
import CommentFactory from './Comment.js';

// Definisci i modelli
const User    = UserFactory(sequelize, DataTypes);
const Cat     = CatFactory(sequelize, DataTypes);
const Comment = CommentFactory(sequelize, DataTypes);

// Associazioni
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cat.hasMany(Comment, { foreignKey: 'catId',  onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Cat,  { foreignKey: 'catId'  });

// Sincronizza il DB
await sequelize.sync();
console.log('Database sincronizzato');

export { sequelize, User, Cat, Comment };  