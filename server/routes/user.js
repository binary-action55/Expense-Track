const express = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');

const router = express.Router();

const userController = require(path.join(rootDirectory,'controller','user'));

router.post('/signup',userController.addUser);
router.post('/login',userController.checkLogin);
router.post('/forgotPassword',userController.forgotPassword);
router.post('/resetPassword',userController.resetPassword);

module.exports = router;