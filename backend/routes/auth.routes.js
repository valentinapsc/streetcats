// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Endpoint per registrazione
router.post('/register', authController.register);

// Endpoint per login
router.post('/login', authController.login);

module.exports = router;