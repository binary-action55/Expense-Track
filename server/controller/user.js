const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const User = require(path.join(rootDirectory,'model','user'));

module.exports.addUser = async (req,res,next) =>{
   if(req.body.name==null ||
      req.body.email==null ||
      req.body.password==null 
    ){
        res.status(400).json({message:"Bad Input"});
    }
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const item = await User.create({
            name,
            email,
            password,
        })
        res.status(201).json({success:true,message:'User Created'});
    }
    catch(err){
        console.log(err);
        const error = err.get('email');
        console.log(error);
        res.status(400).json({message:err});
    }
}