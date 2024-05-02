// const fs = require('fs').promises
// const path = require('path')
// const User = require('../models').users
// const Designer = require('../models').designers
// const Product = require('../models').products
// const Cart = require('../models').carts
const UserOrder = require('../models').userorders
const axios = require('axios');
const uniqid=require('uniqid')
const sha256=require('sha256')
const Razorpay = require('razorpay');
require('dotenv').config();


const mainurl=process.env.frontendngrokurl
const paymentupdateurl=process.env.serverngrokurl
const HOST_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox'
const MERCHANT_ID = 'PGTESTPAYUAT'
const SALT_KEY = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'
const SALT_INDEX = 1

//redirecturl=`${mainurl}/userOrders/${userid}`


const instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
});
var amt;
const checkout = async (req, res) => {
    try {
        //const {userid,price}=req.body
        const userid=req.params.userid
        const orderid=req.params.orderid
        const price=req.params.price
        amt=price;
        await UserOrder.update({orderstatus:'paid',paid_amount:price,paymentid:uniqid()},{where:{orderid:orderid}})
        res.sendFile('standard.html', { root: __dirname });

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}



const createorder = async (req,res)=>{
    try{
        console.log("create order request ", req.body);
    const options = {
        amount: req.body.amount,  // Amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send("hi");
    });
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}



const getvariables = async (req,res)=>{
    try{
        res.json({amount:amt,url:paymentupdateurl})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}



module.exports = {
    checkout,
    createorder,
    getvariables
}