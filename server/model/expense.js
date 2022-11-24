const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    description:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
});

module.exports = mongoose.model('Expense',expenseSchema);

// const expense = sequelize.define('expense',{
//     id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     amount:{
//         type:Sequelize.DOUBLE,
//         allowNull:false,
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     }
// });

// module.exports = expense;