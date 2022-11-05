const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const User = require(path.join(rootDirectory,'model','user'));


const SEQUELIZE_UNIQUE_ERROR = 'SequelizeUniqueConstraintError';

module.exports.addUser = async (req,res,next) =>{
   if(req.body.name==null ||
      req.body.email==null ||
      req.body.password==null 
    ){
        return res.status(400).json({message:"Bad Input"});
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
        res.status(500).json({message:err});
    }
}

module.exports.checkLogin = async (req,res,next) =>{
    if(req.body.userName==null ||
       req.body.password==null 
     ){
         return res.status(400).json({message:"Bad Input"});
     }
     const userName = req.body.userName;
     const password = req.body.password;
 
     try{
         const items = await User.findAll({
             where:{
                 email:userName,
             }
         })
         if(items.length==0)
             return res.status(404).json({message:'User not found',userNameValid:false});
         if(items[0].password!==password)
             return res.status(400).json({message:'User not Authorized',userNameValid:true,passwordValid:false});
         res.status(201).json({success:true,message:'User Login Successful',userNameValid:true,passwordValid:true});
     }
     catch(err){
         res.status(500).json({message:err});
     }
 }