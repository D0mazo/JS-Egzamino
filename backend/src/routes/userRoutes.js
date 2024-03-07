const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');


userRouter.get('/users', userController.all);
userRouter.get('/users/:id', userController.single);
userRouter.post('/users', userController.create);
userRouter.put('/users/:id', userController.update);
userRouter.delete('/users/:id', userController.delete);

module.exports = userRouter;
