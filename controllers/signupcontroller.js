const User=require('../models').users
const Designer=require('../models').designers


const createuser=async (req,res)=>{
    const {username,age,address,password,phonenumber,gender,mailID}=req.body;
    if(!username || !age ||!address ||!password ||!phonenumber || !gender || !mailID){
        return res.status(400).json({error:'Enter all mandoatory fields'})
    }

    const userinfo={
        username:req.body.username,
        mailID:req.body.mailID,
        gender:req.body.gender,
        address:req.body.address,
        phonenumber:req.body.phonenumber,
        age:req.body.age,
        password:req.body.password,
        userid:10000+Math.random()*(99999-10000)
    }
    const newuser = await User.create(userinfo)
    res.status(200).json(newuser)
}

const createdesigner=async (req,res)=>{
    const {designername,age,address,password,phonenumber,gender,mailID}=req.body;
    if(!designername || !age ||!address ||!password ||!phonenumber || !gender || !mailID){
        return res.status(400).json({error:'Enter all mandoatory fields'})
    }
    const designerinfo={
        designername:req.body.designername,
        active:true,
        mailID:req.body.mailID,
        gender:req.body.gender,
        address:req.body.address,
        phonenumber:req.body.phonenumber,
        age:req.body.age,
        password:req.body.password,
        designerid:10000+Math.random()*(99999-10000)
    }
    const newdesigner = await Designer.create(designerinfo)
    res.status(200).json(newdesigner)
}

module.exports={
    createuser,
    createdesigner
}