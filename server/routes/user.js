const express = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');

const router = express.Router();

const userController = require(path.join(rootDirectory,'controller','user'));

router.post('/signup',userController.addUser);
router.post('/login',userController.checkLogin);

module.exports = router;