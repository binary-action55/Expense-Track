const Sequelize = require('sequelize');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));

const expense = sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    amount:{
        type:Sequelize.DOUBLE,
        allowNull:false,
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

module.exports = expense;