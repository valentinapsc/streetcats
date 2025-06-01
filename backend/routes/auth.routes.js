// File per la gestione delle rotte di autenticazione

const express = require("express"); // Importa il modulo express per creare il router
const router = express.Router(); // Crea un nuovo router per gestire le rotte di autenticazione
const authController = require("../controllers/auth.controller"); // Importa il controller per l'autenticazione

// Endpoint per registrazione
router.post("/register", authController.register);

// Endpoint per login
router.post("/login", authController.login);

module.exports = router; // Esporta il router per poterlo utilizzare in altri file