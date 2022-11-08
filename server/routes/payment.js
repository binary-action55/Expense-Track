const express = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');

const router = express.Router();

const paymentController = require(path.join(rootDirectory,'controller','payment'));


router.post('/',paymentController.initiatePayment);

module.exports = router;