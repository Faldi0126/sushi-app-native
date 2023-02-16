const router = require('express').Router();
const ControllerUser = require('../controllers/userController');

router.get('/', ControllerUser.findAll);
router.post('/addUser', ControllerUser.createOne);
router.get('/:id', ControllerUser.findOne);
router.delete('/:id', ControllerUser.deleteOne);

module.exports = router;
