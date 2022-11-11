const Sequelize = require('sequelize');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));

const expenseFile = sequelize.define('expenseFile',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    URL:{
        type:Sequelize.STRING,
        allowNull:false,
    },
});

module.exports = expenseFile;