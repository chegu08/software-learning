const User=require('../models').users
const Designer=require('../models').designers
const bcrypt=require('bcrypt')

const userlogin=async (req,res)=>{
    try{
        const {username,password}=req.body
        const cur_user= await User.findOne({where:{username:username}})
        if(!cur_user){
            return res.status(401).json({error:`The user with username ${req.body.username} don't exist`})
        }
        const hash=bcrypt.hash(password,12)
        if(!(await bcrypt.compare(password,cur_user.password))){
            return res.status(401).json({error:'Invalid username and password'})
        }
        res.status(200).json({
            message:'Authenticated',
            userid:cur_user.userid
        })
    }
    catch(err){
        console.log(err)
        res.status(502).json({error:'Internal server error'})
    }
}

const designerlogin=async (req,res)=>{
    
    try{
        const {designername,password}=req.body
    
    const cur_designer=await Designer.findOne({where:{designername:designername}})

    if(!cur_designer){
        return res.status(401).json({error:`The designer with username ${designername} don't exist`})
    }
    const hash=bcrypt.hash(password,12)
    if(!(await bcrypt.compare(password,cur_designer.password))){
        return res.status(401).json({error:'Invalid username and password'})
    }
    res.status(200).json({
        message:'Authenticated',
        designerid:cur_designer.designerid
    })
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:'Internal server error'})
    }
}


module.exports={
    userlogin,
    designerlogin
}