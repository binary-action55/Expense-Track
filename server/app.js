const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const rootDirectory = require('./utils/rootDirectory');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// const User = require(path.join(rootDirectory,'model','user'));
// const Expense = require(path.join(rootDirectory,'model','expense'));
// const ExpenseFile = require(path.join(rootDirectory,'model','expenseFile'))

const userAuthorization = require(path.join(rootDirectory,'middleware','authorize'));

const userRoutes = require(path.join(rootDirectory,'routes','user'));
const errorRoutes = require(path.join(rootDirectory,'routes','error'));
const expenseRoutes = require(path.join(rootDirectory,'routes','expense'));
const paymentRoutes = require(path.join(rootDirectory,'routes','payment'));

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/user',userRoutes);
app.use('/expense',userAuthorization.authorize,expenseRoutes);
app.use('/payment',userAuthorization.authorize,paymentRoutes);
app.use('/',errorRoutes);


mongoose.connect(`mongodb+srv://userRoot1:${process.env.MONGODB_PASS}@cluster0.puse2rv.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("connected");
    app.listen(3000);
})
.catch(err=>console.log(err));