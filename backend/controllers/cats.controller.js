import fs from 'fs';
import path from 'path';
import { Cat } from '../models/index.js';

// GET /api/cats
export async function getAllCats(req, res) {
  try {
    const cats = await Cat.findAll();
    return res.json(cats);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

// GET /api/cats/:id
export async function getCatById(req, res) {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Gatto non trovato' });
    return res.json(cat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

// POST /api/cats
export async function createCat(req, res) {
  try {
    const { name, description, lat, lng } = req.body;
    if (!name || !description || !lat || !lng) {
      return res.status(400).json({ error: 'Campi obbligatori mancanti.' });
    }
    const image = req.file?.filename || null;
    const newCat = await Cat.create({
      name,
      description,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      image
    });
    return res.status(201).json(newCat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

// PUT /api/cats/:id
export async function updateCat(req, res) {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Gatto non trovato' });
    const { name, description, lat, lng } = req.body;
    if (name) cat.name = name;
    if (description) cat.description = description;
    if (lat)  cat.lat = parseFloat(lat);
    if (lng)  cat.lng = parseFloat(lng);
    if (req.file) {
      // rimuovi vecchia immagine
      if (cat.image) fs.unlinkSync(path.join(process.cwd(), 'uploads', cat.image));
      cat.image = req.file.filename;
    }
    await cat.save();
    return res.json(cat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

// DELETE /api/cats/:id
export async function deleteCat(req, res) {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Gatto non trovato' });
    if (cat.image) fs.unlinkSync(path.join(process.cwd(), 'uploads', cat.image));
    await cat.destroy();
    return res.json({ message: 'Gatto eliminato con successo' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}