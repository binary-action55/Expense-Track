const express = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');

const router = express.Router();

const expenseController = require(path.join(rootDirectory,'controller','expense'));

router.get('/',expenseController.getExpenses);
router.post('/',expenseController.addExpense);
router.delete('/:id',expenseController.deleteExpense);


module.exports = router;