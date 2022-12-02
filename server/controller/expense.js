const path = require('path');
const AWS = require('aws-sdk');
const rootDirectory = require('../utils/rootDirectory');
const mongoose = require('mongoose');
const User = require(path.join(rootDirectory,'model','user'));
const Expense = require(path.join(rootDirectory,'model','expense'));
const ExpenseFile = require(path.join(rootDirectory,'model','expenseFile'));

module.exports.addExpense = async (req,res,next)=>{
    const {description,amount,category} = req.body;
    if(description==null || amount==null || category==null)
        return res.status(400).json({message:'Bad Input'});
    
    try{
        const expense = new Expense({description,amount,category,userId:req.user});
        await expense.save();    
        res.status(201).json({success:true,expense});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err});
    }
}

module.exports.getExpenses = async(req,res,next)=>{
    try{
        const currentPage = +req.query.currentPage;
        const expensePerPage = +req.query.expensesPerPage || 2;
        const userId = req.user._id;
        const offset = (currentPage-1)*expensePerPage;
        const expensesCount = await Expense.find({userId}).count();
        const expenses = await Expense.find({userId}).skip(offset).limit(expensePerPage);
        //const expenses = await req.user.getExpenses({limit:expensePerPage,offset:offset,order:[['createdAt','ASC']]});
        res.status(200).json({
            success:true,
            expenses,
            hasNextPage:(expensePerPage*currentPage)<expensesCount,
            hasPreviousPage:currentPage>1,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err});
    }
}

module.exports.getUserExpenses = async(req,res,next)=>{
    const userId = req.params.id || null;
    try{
        const expenses = await Expense.find({userId});
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
        const expense = await Expense.findByIdAndRemove(id);
        //const expense = await req.user.getExpenses({where:{id}});
        if(!expense)
            return res.status(400).json({message:'id not found'});
        res.status(201).json({success:true});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err});
    }
}

module.exports.getLeaderBoard = async (req,res,next) =>{
    try{
    const users = await User.find();
    const userExpenseLeaderBoard = [];
    for(let user of users){
        const expenseSums = await Expense.aggregate([
            {$match:{
                userId:user._id,
            }},
            {$group:{
                _id:'',
                sum:{
                    $sum:'$amount',
                }
            }}
        ]);
        const total = expenseSums.length>0 ? expenseSums[0].sum : 0;
        const userDetail = {
            id:user._id,
            name: user.name,
            total,
        }
        userExpenseLeaderBoard.push(userDetail);
    }
        userExpenseLeaderBoard.sort((a,b)=>{
            if(a.total>b.total)
                return -1;
            if(a.total===b.total)
                return 0;
            return 1;
        });
        res.status(200).json({userExpenseLeaderBoard});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }      

}

async function uploadToS3(fileContents,fileName){

    const s3Client = new AWS.S3({
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKeyId:process.env.SECRET_ACCESS_KEY,
    });

    const params = {
        Bucket:`demo1211`,
        Key: fileName,
        Body:fileContents,
    
    };
    return new Promise((res,rej)=>{
        s3Client.upload(params,(err,result)=>{
            if(err){
                console.log(err);
                rej("Error");
            }
            res(result.Location);
        }); 
    });
}

module.exports.downloadList = async (req,res,next)=>{
    
    try{
        const expenses = await Expense.find({userId:req.user._id});
        if(expenses.length===0)
            throw new Error('No expenses');
        const fileContents = JSON.stringify(expenses);
        const fileName = `expenses${req.user.email}-${new Date()}.txt`;
        const fileUrl = await uploadToS3(fileContents,fileName);
        const expenseFile = new ExpenseFile({URL:fileUrl,userId:req.user._id});
        await expenseFile.save();
        return res.status(200).json({url:fileUrl,success:true});      
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }
}

module.exports.downloadHistory = async(req,res,next)=>{
    try{
        const links = await ExpenseFile.find({userId:req.user._id});
        if(links.length===0)
            return res.status(200).json({hasDownloaded:false});
        res.status(200).json({hasDownloaded:true,links});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }
}