const User=require('../models').users
const Designer=require('../models').designers

const userlogin=async (req,res)=>{
    const {username,password}=req.body
    
    const cur_user= await User.findOne({where:{username:username}})

    if(!cur_user){
        return res.status(401).json({error:`The user with username ${username} don't exist`})
    }
    if(cur_user.password!==password){
        return res.status(401).json({error:'Invalid username and password'})
    }
    res.status(200).json({message:'Authenticated'})
}

const designerlogin=async (req,res)=>{
    const {designername,password}=req.body
    
    const cur_designer=await Designer.findOne({where:{designername:designername}})

    if(!cur_designer){
        return res.status(401).json({error:`The designer with username ${designername} don't exist`})
    }
    if(cur_designer.password!==password){
        return res.status(401).json({error:'Invalid username and password'})
    }
    res.status(200).json({message:'Authenticated'})
}


module.exports={
    userlogin,
    designerlogin
}