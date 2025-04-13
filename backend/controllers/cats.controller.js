// serve per gestire le richieste relative ai gatti
const Cat = require('../models/cat');

// Funzione per ottenere tutti i gatti
// Restituisce un array di gatti in formato JSON
exports.getAllCats = async (req, res) => {
  try {
    const cats = await Cat.findAll();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funzione per ottenere un gatto specifico
exports.getCatById = async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: 'Gatto non trovato' });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funzione per creare un nuovo gatto
// Utilizza multer per gestire il file upload
exports.createCat = async (req, res) => {
  const { name, description, lat, lng } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !description || !lat || !lng) {
    return res.status(400).json({ error: 'I campi name, description, lat e lng sono obbligatori.' });
  }

  try {
    const newCat = await Cat.create({
      name,
      description,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      image,
    });
    res.json(newCat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funzione per aggiornare un gatto
exports.updateCat = async (req, res) => {
  const id = req.params.id;
  const { name, description, lat, lng } = req.body;
  // Se viene caricato un nuovo file, usiamo il suo filename
  const image = req.file ? req.file.filename : null;

  try {
    const cat = await Cat.findByPk(id);
    if (!cat) {
      return res.status(404).json({ error: 'Gatto non trovato' });
    }
    // Aggiorna i campi, se sono stati forniti nel body
    cat.name = name || cat.name;
    cat.description = description || cat.description;
    cat.lat = lat ? parseFloat(lat) : cat.lat;
    cat.lng = lng ? parseFloat(lng) : cat.lng;
    if (image) {
      cat.image = image;
    }
    await cat.save();
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funzione per cancellare un gatto
exports.deleteCat = async (req, res) => {
  const id = req.params.id;
  try {
    const cat = await Cat.findByPk(id);
    if (!cat) {
      return res.status(404).json({ error: 'Gatto non trovato' });
    }
    await cat.destroy();
    res.json({ message: 'Gatto eliminato con successo' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};