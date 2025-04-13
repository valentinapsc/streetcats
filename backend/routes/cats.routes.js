// In questo file abbiamo definito le rotte per il nostro API RESTful per i gatti.
// Abbiamo anche configurato multer per gestire l'upload delle immagini e creato una cartella per gli upload se non esiste già.const express = require('express');

const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats.controller.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configura la cartella per gli upload
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configura multer per gestire l'upload dei file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Rotte esistenti
router.get('/', catsController.getAllCats);             // GET /api/cats
router.get('/:id', catsController.getCatById);            // GET /api/cats/:id
router.post('/', upload.single('image'), catsController.createCat);  // POST /api/cats

// Nuovi endpoint per l'aggiornamento e la cancellazione
router.put('/:id', upload.single('image'), catsController.updateCat);  // PUT /api/cats/:id
router.delete('/:id', catsController.deleteCat);                        // DELETE /api/cats/:id

module.exports = router;