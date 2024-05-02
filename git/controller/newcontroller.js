const fs=require('fs').promises
const path=require('path')
const User=require('../models').users
const Designer=require('../models').designers
const Product=require('../models').products
const Cart=require('../models').carts
const UserOrder=require('../models').userorders
const Productreview=require('../models').productreviews
const Designerreview=require('../models').designerreviews


const base64attribute='data:image/jpeg;base64,'

async function segregatedesignerorders (orders){
        const pendingorders=new Array
        const acceptedorders=new Array
        const paidorders=new Array
        const startedorders=new Array
        const shippedorders=new Array
        const rejectedorders= new Array
        const cancelledorders= new Array
        for(let i=0;i<orders.length;i++){
            
            const image =base64attribute + await fs.readFile(orders[i].imagepath,'base64')
            const cur_product =await Product.findOne({where:{productid:orders[i].productid}})
            const {username}= await User.findOne({where:{userid:orders[i].userid}})
            const cur_order={
            image:image,
            username:username,
            orderid:orders[i].orderid,
            NumberofItems:orders[i].NumberofItems,
            productid:orders[i].productid,
            orderdate:orders[i].orderdate,
            description:orders[i].description,
            ownproduct:orders[i].ownproduct,
            orderstatus:orders[i].orderstatus,
            amounttopay:orders[i].amt_to_pay,
            paymentid:orders[i].paymentid,
            paidamount:orders[i].paid_amount,
            tentativedate:orders[i].tentativedate,
            fabric:cur_product.fabric,
            fit:cur_product.fit,
            colours:cur_product.colours,
            washing_instructions:cur_product.washing_instructions,
            approx_price:cur_product.approx_price,
            special_attribute:cur_product.special_attribute,
            shipmentdate:orders[i].shipmentdate
        }
        
        if(orders[i].orderstatus=="pending"){
            pendingorders.push(cur_order)
        }
        else if(orders[i].orderstatus=="accepted"){
            acceptedorders.push(cur_order)
        }
        else if(orders[i].orderstatus=="paid"){
            paidorders.push(cur_order)
        }
        else if(orders[i].orderstatus=="started"){
            if(new Date()>=new Date(orders[i].shipmentdate)){
                await UserOrder.update({orderstatus:'shipped'},{where:{orderid:orders[i].orderid}})
                shippedorders.push(cur_order)
            }
            else startedorders.push(cur_order)
        }
        else if(orders[i].orderstatus=="shipped"){
            shippedorders.push(cur_order)
        }
        else if(orders[i].orderstatus=="cancelled"){
            cancelledorders.push(cur_order)
        }
        else {
            rejectedorders.push(cur_order)
        }
    }
    const allorders=[
        {status:"pending",arr:pendingorders},
        {status:"accepted",arr:acceptedorders},
        {status:"paid",arr:paidorders},
        {status:"started",arr:startedorders},
        {status:"shipped",arr:shippedorders},
        {status:"rejected",arr:rejectedorders},
        {status:"cancelled",arr:cancelledorders}
    ]
    return allorders
}


//9.show single product
const seesingleproduct=async (req,res)=>{
    try{
        const productId=req.params.productid 
        const selectedproduct=await Product.findOne({where:{productid:productId}})
        let image=await fs.readFile(selectedproduct.imagepath,'base64')
        //console.log(selectedproduct)
        const des= await Designer.findOne({where:{designerid:selectedproduct.designerid}})
        if(!des){
            //console.log(err) 
            return res.status(400).json({error:'this product has been deleted by the designer'})
        }
        const review= await Productreview.findAll({where:{productid:productId},attributes:[
            'username',
            'review',
            'rating'
        ]})
        const cur_product={
            productid:selectedproduct.productid,
            image:image, 
            description:selectedproduct.description,
            designerid:selectedproduct.designerid,
            designername:des.designername, 
            fabric:selectedproduct.fabric,
            fit:selectedproduct.fit,
            colours:selectedproduct.colours,
            washing_instructions:selectedproduct.washing_instructions,
            approx_price:selectedproduct.approx_price,
            special_attribute:selectedproduct.special_attribute,
            rev:review
        }
        //console.log(cur_product)
        return res.status(200).json(cur_product)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }
}

//10.remove an item from cart
const deleteProductfromcart = async (req,res)=>{
    try{
        const {userid,productid}=req.body
        //console.log('userid:'+ userid/n+'productid: ')
        const ItemtoDelete=await Cart.destroy({where:{userid:userid,productid:productid}})
        if(!ItemtoDelete){
            return res.status(400).json({error:'Invalid userid or productid'})
        }
        res.status(200).json({message:'Item successfully deleted from cart'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
}

//11.update number of items to an item
const updateNumberofItems=async (req,res)=>{
    try{
        const {userid,productid,NumberofItems} = req.body
        const updatedRows= await Cart.update({NumberofItems:NumberofItems},{where:{userid:userid,productid:productid}})
        if(!updatedRows){
            return res.status(400).json({error:'Invalid userid or productid'})
        }
        const cur_item=await Cart.findOne({where:{userid:userid,productid:productid}})
        res.status(200).json(cur_item.NumberofItems)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }
}

//12.displaying all orders for the designer
const alldesignerorders= async (req,res)=>{
    try{
        const designerid=req.params.designerid
        console.log(designerid)
        const orders = await UserOrder.findAll({where:{des_id:designerid}})
        if(orders.length===0){
            return res.status(404).json({error:"You have no orders"})
        }
        const allorders= await segregatedesignerorders(orders)
        //console.log(allorders[0].arr)
        res.status(200).json(allorders)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}

//13.designer is updating the selected order
const updateselectedorder = async (req,res)=>{
    try{
        const {orderid,status,tentativedate,price,paid,shipment_date}= req.body
        console.log(status)
        if(status=="accepted"){
            const updated_order= await UserOrder.update(
                {  
                    amt_to_pay:price,
                    orderstatus:status,
                    tentativedate:tentativedate
                },
                {where:{orderid:orderid}}
            )
            return res.status(200).json({message:'Price updated succesfully',updated_order})
        }
        else if(status=="rejected"){
            const updated_order= await UserOrder.update(
                {orderstatus:status},
                {where:{orderid:orderid}}
            )
            return res.status(200).json({message:'order rejected succesfully',updated_order})
        }
        else if(status=="started"){
            
            const updated_order= await UserOrder.update(
                {
                    orderstatus:status,
                    shipmentdate:shipment_date
                },
                {where:{orderid:orderid}}
            )
            console.log(typeof shipment_date)
            return res.status(200).json({message:'order started succesfully',updated_order})   
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}

//14. view a single selected order in designer page
// const singledesignerorder =async (req,res)=>{
//     try{
//         const designerid=req.params.orderid
//         const cur_order=await UserOrder.findOne({where:{orderid:orderid}})
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({error:"internal server error"})
//     }
// }

//15.create a product review
const productreview = async (req,res)=>{
    try{
        const {userid,designerid,productid,review,rating} = req.body
        const {username}=await User.findOne({where:{userid:userid}})
       // console.log(username)
        await Productreview.create({
            userid:userid,
            productid:productid,
            designerid:designerid,
            review:review,
            rating:rating,
            username:username
        })
        res.status(200).json({message:'Review submitted successfully'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Internal server error")
    }
}

//16.create a designer review
const designerreview = async (req,res)=>{
    try{
        const {userid,designerid,productid,review,rating} = req.body
        const {username}=await User.findOne({where:{userid:userid}})
        await Designerreview.create({
            userid:userid,
            productid:productid,
            designerid:designerid,
            review:review,
            rating:rating,
            username:username
        })
        res.status(200).json({message:'Review submitted successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json("Internal server error")
    }
}


//17.see all the feedback given to the designer
const designerfeedback = async (req,res)=>{
    try{
        const designerid=req.params.designerid
        const feedbacks= await Designerreview.findAll({where:{designerid:designerid},attributes:[
            'username',
            'rating',
            'review'
        ]})
        res.status(200).json(feedbacks)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}



module.exports={
    seesingleproduct,
    deleteProductfromcart,
    updateNumberofItems,
    alldesignerorders,
    updateselectedorder,
    productreview,
    designerreview,
    designerfeedback
}