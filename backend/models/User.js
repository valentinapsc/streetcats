// Definisce il modello User per Sequelize, che rappresenta una tabella nel database.
// Questo modello è utilizzato per gestire gli utenti del sistema, con campi per username, email e password

export default function UserFactory(sequelize, DataTypes) {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true, notEmpty: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6, 100] }
    }
  }, {
    timestamps: true
  });
}
