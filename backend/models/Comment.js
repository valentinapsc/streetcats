// Definisce il modello Comment per Sequelize, che rappresenta una tabella nel database.
// Questo modello è associato a Cat e User, permettendo di gestire i commenti sui gatti

export default function CommentFactory(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    catId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Cats', key: 'id' }
    }
  }, {
    timestamps: true
  });
}

/* FILE Comments.js
import { DataTypes } from "sequelize";

export function createModel(database){

  database.define('Comment', {

  });
}

*/



/* FILE database.js
import { createModel as createCommentModel } from "..."

const sequelize = new Sequelize(...);

createCommentModel(database);

*/