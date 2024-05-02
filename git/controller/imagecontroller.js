const fs=require('fs').promises
const path=require('path')
const User=require('../models').users
const Designer=require('../models').designers
const Product=require('../models').products
const Cart=require('../models').carts
const UserOrder=require('../models').userorders


const cur_url=process.env.serverngrokurl

const OpenAI= require("openai")
const open=new OpenAI({
    apiKey:process.env.openaiAPIKEY
});


const generateimage=async (req,res)=>{
 
    const {prompt,n}=req.body
    const image=await open.images.generate({
        prompt:prompt,
        n:n,
        size:"512x512"
    })
    res.send(image.data[0].url)
    
 }

 module.exports={
    generateimage
 }
