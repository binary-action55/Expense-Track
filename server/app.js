const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const rootDirectory = require('./utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));

const User = require(path.join(rootDirectory,'model','user'));
const Expense = require(path.join(rootDirectory,'model','expense'));

const userAuthorization = require(path.join(rootDirectory,'middleware','authorize'));

const userRoutes = require(path.join(rootDirectory,'routes','user'));
const errorRoutes = require(path.join(rootDirectory,'routes','error'));
const expenseRoutes = require(path.join(rootDirectory,'routes','expense'));
const paymentRoutes = require(path.join(rootDirectory,'routes','payment'));

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/user',userRoutes);
app.use('/expense',userAuthorization.authorize,expenseRoutes);
app.use('/payment',userAuthorization.authorize,paymentRoutes);
app.use('/',errorRoutes);

User.hasMany(Expense);
Expense.belongsTo(User,{contraints:true,onDelete:'CASCADE'});

sequelize
.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err));