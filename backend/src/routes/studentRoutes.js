const express = require('express');

const studentRouter = express.Router();
const studentController = require('../controllers/studentController');
const {validateJWTToken} = require("../middleware");

// GET /api/students Gauti visa sarasa
studentRouter.get('/students', studentController.all);

// GET /api/students/:id Gauti viena studenta pagal ID
studentRouter.get('/students/:id', studentController.single);

// POST  /api/students Irasyti studenta
studentRouter.post('/students', studentController.create);

// PUT /api/students/:id Studento duomenu atnaujinimas pagal nurodyta jo id
studentRouter.put('/students/:id', studentController.update);

// DELETE /api/student/:id Studento istrinimas pagal nurodyta jo id
studentRouter.delete('/students/:id', studentController.delete);

module.exports = studentRouter;
