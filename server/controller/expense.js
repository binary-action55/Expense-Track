const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const Expense = require(path.join(rootDirectory,'model','expense'));

module.exports.addExpense = async (req,res,next)=>{
    const {description,amount,category} = req.body;
    if(description==null || amount==null || category==null)
        return res.status(400).json({message:'Bad Input'});
    
    try{
        const expense = await Expense.create({
            description,
            amount,
            category,
        })
        res.status(201).json({success:true,expense});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err});
    }
}

module.exports.getExpenses = async(req,res,next)=>{
    try{
        const expenses = await Expense.findAll({order:[['createdAt','ASC']]});
        res.status(200).json({success:true,expenses});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err});
    }
}

module.exports.deleteExpense = async(req,res,next)=>{
    const id = req.params.id;
    if(id==null)
        return res.status(400).json({message:'Bad Input'});
    try{
        const deleteStatus = await Expense.destroy({where:{id}});
        console.log
        if(deleteStatus===1)
            res.status(201).json({success:true});
        else
            res.status(400).json({message:'id not found'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err});
    }
}