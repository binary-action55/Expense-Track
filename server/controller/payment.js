const path = require('path');
const user = require('../model/user');
const rootDirectory = require('../utils/rootDirectory');
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports.initiatePayment = async (req,res,next) => {
    
    try{
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: req.body.cardNumber,
                exp_month: 12,
                exp_year: 2023,
                cvc: req.body.CVV,
              },
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000,
            currency: 'inr',
            payment_method_types: ['card'],
            payment_method:paymentMethod.id,
            confirm:true,
          });
        req.user.membership='premium';
        await req.user.save();
        res.status(200).json({success:true,message:'Payment Successful'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err});
    }
}