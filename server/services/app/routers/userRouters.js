const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/items', userController.getItems);
router.post('/items/add', userController.addFoods);
router.get('/items/:id', userController.getItemById);
router.delete('/items/:id', userController.deleteItem);
router.put('/items/:id', userController.updateItem);
module.exports = router;
