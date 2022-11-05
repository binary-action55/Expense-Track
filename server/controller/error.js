const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const User = require(path.join(rootDirectory,'model','user'));

module.exports.page404 = (req,res,next) =>{
    res.status(404).json({message:'page not found'});
}