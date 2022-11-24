const path = require('path');
const user = require('../model/user');
const rootDirectory = require('../utils/rootDirectory');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports.initiatePayment = async (req,res,next) => {
    
    try{
        /*const customer = await stripe.customers.create({
            email:'asd@gmail.com',
            name:req.body.name,
        });*/
        req.user.membership='premium';
        await req.user.save();
        res.status(200).json({success:true,message:'Payment Successful'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err});
    }
}