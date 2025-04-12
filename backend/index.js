// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');

// Crea l'app Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware globali
app.use(cors());
app.use(express.json());

// Serve i file statici in "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importa le rotte dei gatti
const catsRoutes = require('./routes/cats.routes');
app.use('/api/cats', catsRoutes);

// (Opzionale) Configurazione per servire un frontend statico, se necessario
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Importa e sincronizza il database con Sequelize
const sequelize = require('./models/index');
const Cat = require('./models/cat');

sequelize.sync().then(async () => {
  const count = await Cat.count();
  if (count === 0) {
    await Cat.create({
      name: 'Gatto Esploratore',
      description: 'Inserito come record di esempio.',
      lat: 40.8522,
      lng: 14.2681,
      image: null
    });
    console.log('Record di seed inserito.');
  }
  // Avvia il server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Errore durante la sincronizzazione del database:', err.message);
});