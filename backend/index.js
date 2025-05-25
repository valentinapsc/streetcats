//require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');

const { sequelize, Cat } = require('./models');

const app  = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cats', require('./routes/cats.routes'));

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB OK');
    await sequelize.sync();           // una sola volta
    if (await Cat.count() === 0) {
      await Cat.create({
        name: 'Gatto Esploratore',
        description: 'Seed di esempio',
        lat: 40.8522, lng: 14.2681
      });
    }
    app.listen(port, () => console.log(`Server ${port}`));
  } catch (err) {
    console.error('Avvio fallito:', err);
  }
})();