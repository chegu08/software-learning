const User=require('../models').users
const Designer=require('../models').designers
const fs=require('fs').promises
const path=require('path')
const bcrypt=require('bcrypt')
const admin=require("firebase-admin")
const credentials=require("../craftsnstitch-firebase-adminsdk-5syxu-8d6b0f110b.json")
admin.initializeApp({
    credential:admin.credential.cert(credentials)
})

const createuser=async (req,res)=>{
    const {username,age,address,password,phonenumber,gender,mailID,userdp}=req.body;
    if(!username || !age ||!address ||!password ||!phonenumber || !gender || !mailID){
        return res.status(400).json({error:'Enter all mandoatory fields'})
    }
    let dp=userdp;
    const hash=await bcrypt.hash(password,12)
    try{
    const user={
        email:mailID,
        password:hash
    }
    try{
        if(!userdp){
            dp= await fs.readFile('default_dp.txt','utf8')
        }
        
    }
    catch(error){
        console.log(error)
        return res.status(400).json({error:error})
    }
    const base64=dp.replace(/^data:image\/\w+;base64,/, '')
    const buffer=Buffer.from(base64,'base64')
    const imageName=`${username}_profile.png`
    const imagePath=(!userdp)?'default_dp.txt':path.join(__dirname,'images',imageName) 

    
        if(userdp){
            await fs.writeFile(imagePath,buffer)  
        }
        try{
            await admin.auth().createUser({
                email:user.email,
                password:hash,
                emailVerified:false,
                disabled:false
            })
        }
        catch(err){
            console.log(err)
            return res.status(400).json({error:"Invalid credentials or user already exists"})
        }
        
        const userinfo={
            username:req.body.username,
            mailID:req.body.mailID,
            gender:req.body.gender,
            address:req.body.address,
            phonenumber:req.body.phonenumber,
            age:req.body.age,
            password:hash,
            userid:10000+Math.floor(Math.random()*(99999-10000)),
            image:imagePath
        }
        const newuser = await User.create(userinfo)
            //console.log(newuser.id)
            res.status(200).json({userid:newuser.userid})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }
}


const createdesigner=async (req,res)=>{
    const {designername,age,address,password,designerdp,phonenumber,gender,mailID}=req.body;
    if(!designername || !age ||!address || !password ||!phonenumber || !gender || !mailID){
        return res.status(400).json({error:'Enter all mandoatory fields'})
    }

    const check_des=await Designer.findOne({where:{designername:designername}})
    if(check_des){
       return res.status(409).json({error:'A desiger with the same username already exists'})
    }
    let dp= designerdp
    const hash=await bcrypt.hash(password,12)
    try{
        if(!designerdp){
            dp= await fs.readFile('default_dp.txt','utf8')
        }
        
    }
    catch(error){
        console.log(error)
        return res.status(400).json({error:error})
    }
    
    const base64=dp.replace(/^data:image\/\w+;base64,/, '')
    const buffer=Buffer.from(base64,'base64')
    const imageName=`${designername}_designer.png`
    const imagePath=(!designerdp)?'default_dp.txt':path.join(__dirname,'images',imageName)
    if(designerdp){
        await fs.writeFile(imagePath,buffer)  
    }
    const designerinfo={
        designername:req.body.designername,
        active:true,
        mailID:req.body.mailID,
        gender:req.body.gender,
        address:req.body.address,
        phonenumber:req.body.phonenumber,
        age:req.body.age,
        password:hash,
        designerid:10000+Math.floor(Math.random()*(99999-10000)),
        image:imagePath
    }
    const newdesigner = await Designer.create(designerinfo)
    res.status(200).json({id:newdesigner.designerid})
}

module.exports={
    createuser,
    createdesigner
}