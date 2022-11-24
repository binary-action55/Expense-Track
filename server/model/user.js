const path = require('path');
const mongoose = require('mongoose');
const rootDirectory = require('../utils/rootDirectory');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    membership:{
        type:String,
        required:true,
    }
})


module.exports = mongoose.model('User',userSchema);


// const user = sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true,
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     isPremium:{
//         type:Sequelize.BOOLEAN,
//         allowNull:false,
//         defaultValue:false,
//     }
// });