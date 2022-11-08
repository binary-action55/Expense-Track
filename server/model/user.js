const Sequelize = require('sequelize');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));

const user = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    isPremium:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    }
});

module.exports = user;