const express = require('express');
const router = express.Router();
const userRouters = require('./userRouters');

router.use('/users', userRouters);

module.exports = router;
