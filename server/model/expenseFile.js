const Sequelize = require('sequelize');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseFileSchema = new Schema({
    URL:{
        type:String,
        required:false,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
});

module.exports = mongoose.model('ExpenseFile',expenseFileSchema);

// // const expenseFile = sequelize.define('expenseFile',{
//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//     },
//     URL:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
// // });

// // module.exports = expenseFile;