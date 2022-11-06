const jwt = require('jsonwebtoken');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const User = require(path.join(rootDirectory,'model','user'));

module.exports.authorize = async (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const user = jwt.verify(token,process.env.JWT_KEY);
        const storedUser = await User.findByPk(user.id);
        if(storedUser){
            req.user = storedUser;
            next();
        }
        else{
            return res.status(401).json({message:'user not authorized'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }

}