// Questo file definisce le rotte per gestire i commenti sui gatti, inclusa la visualizzazione e la creazione di commenti.

const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const comments = require("../controllers/comments.controller");

router.get("/", comments.list); // /api/cats/:catId/comments
router.post("/", auth, comments.create); // protetto

module.exports = router;