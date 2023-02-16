const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authentication = require('../middleware/authentication');


router.post('/login', adminController.login);

router.post('/addItems', authentication, adminController.addItems);
router.post('/addAdmin', adminController.addAdmin);
router.get('/categories', adminController.getCategories);
router.post('/addCategory', authentication, adminController.addCategories);
router.put('/items/:id', authentication, adminController.updateItems);
router.delete('/items/:id', authentication, adminController.deleteItems);


module.exports = router;