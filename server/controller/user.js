const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const User = require(path.join(rootDirectory,'model','user'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UNIQUE_ERROR_CODE = 11000;

module.exports.addUser = async (req,res,next) =>{
   if(req.body.name==null ||
      req.body.email==null ||
      req.body.password==null 
    ){
        return res.status(400).json({message:"Bad Input"});
    }
    
    const name = req.body.name;
    const email = req.body.email;
    

    try{
        const password = req.body.password;
        const hash = await bcrypt.hash(password,10);
        const user = new User({name,email,password:hash,membership:'regular'});
        await user.save();
        res.status(201).json({success:true,message:'User Created',uniqueEmail:true});
    }
    catch(err){
        console.log(err);
        if(err.code===UNIQUE_ERROR_CODE)
        {
            if(err.keyValue.hasOwnProperty('email'))
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
        const user = await User.findOne({email:userName});
        console.log('user',user);
        if(!user)
            return res.status(404).json({message:'User not found',userNameValid:false});
        
        const result = await bcrypt.compare(password,user.password);
        if(!result)
            return res.status(400).json({message:'User not Authorized',userNameValid:true,passwordValid:false});
        
        const token = jwt.sign({id:user._id.toString(),name:user.name},process.env.JWT_KEY);
        
        res.status(200).json({success:true,message:'User Login Successful',userNameValid:true,passwordValid:true,token,
        isPremium:user.membership==='premium'});
    }
     catch(err){
         res.status(500).json({message:err});
    }
 }

 module.exports.forgotPassword = async (req,res,next)=>{
    if(req.body.email==null){
        return res.status(400).json({message:'email is missing or undefined'});
    }
    const email = req.body.email;

    const user = await User.findOne({email:email});
    if(!user){
        return res.status(400).json({message:'Email is not registered',isRegisteredEmail:false});
    }
    const secret = process.env.JWT_KEY + user.password;
    const token = jwt.sign({email:user.email},secret,{expiresIn:'15m'});
    const link = `http://localhost:5500/client/resetPassword.html?email=${user.email}&token=${token}`;
    res.status(200).json({message:'Email has been sent',isRegisteredEmail:true,resetPasswordLink:link});
 }

 module.exports.resetPassword = async (req,res,next)=>{
    if(req.body.email==null){
        return res.status(400).json({message:'email is missing or undefined'});
    }
    const email = req.body.email;

    const user = await User.findOne({email:email});
    if(!user){
        return res.status(400).json({message:'Email is not registered',isRegisteredEmail:false});
    }

    const token = req.body.token;
    const password = req.body.password;
    const secret = process.env.JWT_KEY + user.password;

    try{
        const userDetails = jwt.verify(token,secret);
        const newPassword = await  bcrypt.hash(password,10);
        user.password=newPassword;
        await user.save();
        res.status(201).json({message:'password updated'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err});
    } 
 }