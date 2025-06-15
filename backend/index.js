import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Importa Sequelize e modelli (fa già sync in index dei modelli)
import './models/index.js'; // esegue il codice di sincronizzazione

// Importa le rotte
import authRoutes from './routes/auth.routes.js';
import catsRoutes from './routes/cats.routes.js';
import commentsRoutes from './routes/comments.routes.js';

// Utility per __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Directory per gli upload
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Mount delle API
app.use('/api/auth', authRoutes);
app.use('/api/cats', catsRoutes);
app.use('/api/cats/:catId/comments', commentsRoutes);

// Errore 404 per rotte non trovate
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trovato' });
});

// Error handler centrale
app.use((err, req, res, next) => {
  console.error('Errore interno:', err);
  res.status(500).json({ error: 'Errore interno del server' });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});

