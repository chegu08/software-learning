const fs=require('fs').promises
const path=require('path')
const User=require('../models').users
const Designer=require('../models').designers
const Product=require('../models').products
const Cart=require('../models').carts
const UserOrder=require('../models').userorders


const mainurl=process.env.frontendngrokurl
const base64attribute='data:image/jpeg;base64,'

//1.displaying all items
const allorders= async (req,res)=>{
    try{
        const userid=req.params.userid
        const orders= await UserOrder.findAll({where:{userid:userid}})
        if(orders.length===0){
            return res.status(404).json({error:"You have no orders"})
        }
        const allorders=new Array
        for(let i=0;i<orders.length;i++){
        
                const image =base64attribute + await fs.readFile(orders[i].imagepath,'base64')
                const cur_product =await Product.findOne({where:{productid:orders[i].productid}})
                let orderstatus=orders[i].orderstatus;
                if(orders[i].shipment){
                    const cur_date= new Date()
                    orderstatus=(cur_date>=Date(orders[i].shipmentdate))?"delivered":orderstatus;
                }

            allorders.push({
                image:image,
                userid:orders[i].userid,
                orderid:orders[i].orderid,
                NumberofItems:orders[i].NumberofItems,
                productid:orders[i].productid,
                orderdate:orders[i].orderdate,
                description:orders[i].description,
                designer_contact_number:orders[i].des_cont_num,
                designerid:orders[i].des_id,
                ownproduct:orders[i].ownproduct,
                designername:orders[i].des_name,
                orderstatus:orderstatus,
                amounttopay:orders[i].amt_to_pay,
                paymentid:orders[i].paymentid,
                paidamount:orders[i].paid_amount,
                tentativedate:orders[i].tentativedate,
                fabric:cur_product.fabric,
                fir:cur_product.fit,
                colours:cur_product.colours,
                washing_instructions:cur_product.washing_instructions,
                approx_price:cur_product.approx_price,
                shipment_date:orders[i].shipmentdate,
                special_attribute:cur_product.special_attribute
            })
        }
        res.status(200).json(allorders)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}

//2.place a new order
const placeneworder = async (req,res)=>{
    try{
        const {userid,ownproduct,productid,numberofitems,designerid,description,image}=req.body
        if(!ownproduct){
            const cur_product= await Product.findOne({where:{productid:productid}})
            if(!cur_product){
                return res.status(404).json({error:'This product no longer exists'})
            }
            //console.log(numberofitems)
            const {designername,phonenumber} = await Designer.findOne({where:{designerid:designerid}})
            //console.log(designername,phonenumber)
            const neworder= await UserOrder.create({
                userid:userid,
                productid:productid,
                orderid:Math.floor(Math.random()*(99999-10000))+10000,
                NumberofItems:numberofitems,
                description:cur_product.description,
                des_id:cur_product.designerid,
                orderstatus:'pending',
                des_name:designername,
                des_cont_num:phonenumber,
                ownproduct:false,
                orderdate:new Date(),
                imagepath:cur_product.imagepath
            })
            console.log(neworder.NumberofItems)
            res.status(200).json(neworder)
        }
        else{
            const base64Data = image.replace(/^data:image\/\w+;base64,/,'');
            const dataBuffer = Buffer.from(base64Data, 'base64');
            const imageName = `${Date.now()}_order.png`;
            const imagePath=path.join(__dirname,'images',imageName)
            await fs.writeFile(imagePath,dataBuffer)
            const {designername,phonenumber} = await Designer.findOne({where:{designerid:designerid}})
            //console.log(designername,phonenumber)
            const neworder= await UserOrder.create({
                userid:userid,
                productid:productid,
                orderid:Math.floor(Math.random()*(99999-10000))+10000,
                NumberofItems:numberofitems,
                description:description,
                des_id:designerid,
                orderstatus:'pending',
                des_name:designername,
                des_cont_num:phonenumber,
                ownproduct:true,
                orderdate:new Date(),
                imagepath:imagePath
            })
            res.status(200).json(neworder)
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal serrver error"})
    }
}

//3.updating the order after the payment has been done
const updatepaymentdetails = async (req,res)=>{
    try{
        const {orderid,paymentid}=req.params
        const cur_order=await UserOrder.findOne({where:{orderid:orderid}})
        await UserOrder.update({
            orderstatus:'paid',
            paid_amount:cur_order.amt_to_pay,
            paymentid:paymentid
        },
        {where:{orderid:orderid}})
        const redirecturl=`${mainurl}/userOrders/${cur_order.userid}`
        res.redirect(redirecturl);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Error while updating payment details"})
    }

}



module.exports={
    allorders, 
    placeneworder,
    updatepaymentdetails
    
}