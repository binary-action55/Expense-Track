const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const User = require(path.join(rootDirectory,'model','user'));


const SEQUELIZE_UNIQUE_ERROR = 'SequelizeUniqueConstraintError';

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
        res.status(201).json({success:true,message:'User Created',uniqueEmail:true});
    }
    catch(err){
        if(err.name===SEQUELIZE_UNIQUE_ERROR)
        {
            if(err.fields.hasOwnProperty('email'))
                return res.status(400).json({message:'Email is already Registered',uniqueEmail:false});
        }
        res.status(500).json({message:err,uniqueEmail:undefined});
    }
}