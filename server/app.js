const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const rootDirectory = require('./utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));

const userRoutes = require(path.join(rootDirectory,'routes','user'));
const errorRoutes = require(path.join(rootDirectory,'routes','error'));

const app = express();

app.use(cors());

app.use(bodyParser.json({extended:false}));

app.use('/user',userRoutes);
app.use('/',errorRoutes);

sequelize
.sync({force:true})
.then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err));