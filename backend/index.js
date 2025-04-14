const express = require('express');
const cors = require('cors');
const path = require('path');

// Crea l'app Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware globali
app.use(cors());
app.use(express.json());

// Serve file statici per uploads, se necessario
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importa le rotte dei gatti
const catsRoutes = require('./routes/cats.routes');
app.use('/api/cats', catsRoutes);

// Importa le rotte di autenticazione
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Sincronizza il database e avvia il server
const sequelize = require('./models/index');
const Cat = require('./models/cat');
const User = require('./models/User');

sequelize.sync().then(async () => {
  // (Facoltativo) Inserisce dati seed se necessario
  const count = await Cat.count();
  if (count === 0) {
    await Cat.create({
      name: 'Gatto Esploratore',
      description: 'Inserito come record di esempio.',
      lat: 40.8522,
      lng: 14.2681,
      image: null
    });
    console.log('Record di seed inserito per i gatti.');
  }
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Errore durante la sincronizzazione del database:', err.message);
});