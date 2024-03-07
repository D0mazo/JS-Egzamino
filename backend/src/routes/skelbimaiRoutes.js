const express = require('express');

const skelbimaiRouter = express.Router();
const skelbimaiController = require('../controllers/skelbimaiController');
const {validateJWTToken} = require("../middleware");


skelbimaiRouter.get('/skelbimai', skelbimaiController.all);
skelbimaiRouter.get('/skelbimai/:id', skelbimaiController.single);
skelbimaiRouter.post('/skelbimai', skelbimaiController.create);
skelbimaiRouter.put('/skelbimai/:id', skelbimaiController.update);
skelbimaiRouter.delete('/skelbimai/:id', skelbimaiController.delete);

module.exports = skelbimaiRouter;
