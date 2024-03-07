const express = require('express');

const skelbimaiRouter = express.Router();
const skelbimaiController = require('../controllers/skelbimaiController');
const {validateJWTToken} = require("../middleware");

// GET /api/skelbimai Gauti visa sarasa
skelbimaiRouter.get('/skelbimai', skelbimaiController.all);

// GET /api/skelbimai/:id Gauti viena skelbimaia pagal ID
skelbimaiRouter.get('/skelbimai/:id', skelbimaiController.single);

// POST  /api/skelbimai Irasyti skelbimaia
skelbimaiRouter.post('/skelbimai', skelbimaiController.create);

// PUT /api/skelbimai/:id skelbimaio duomenu atnaujinimas pagal nurodyta jo id
skelbimaiRouter.put('/skelbimai/:id', skelbimaiController.update);

// DELETE /api/skelbimai/:id skelbimaio istrinimas pagal nurodyta jo id
skelbimaiRouter.delete('/skelbimai/:id', skelbimaiController.delete);

module.exports = skelbimaiRouter;
