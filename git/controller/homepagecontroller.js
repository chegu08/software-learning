const fs=require('fs').promises
const path=require('path')
const User=require('../models').users
const Designer=require('../models').designers
const Product=require('../models').products
const Cart=require('../models').carts
const UserOrder=require('../models').userorders
const Productreview=require('../models').productreviews
const Designerreview=require('../models').designerreviews
// const multer=require('multer')
// const upload=multer({dest:'uploads/'})

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
            special_attribute:cur_product.special_attribute
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
            startedorders.push(cur_order)
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


//1.seeing a user
const seeUserprofile=async (req,res)=>{
    try{
        const cur_user= await User.findOne({where:{userid:req.body.userid}})
        if(!cur_user){
            return res.status(404).json({error:'User not found'})
        }
        const imagepath=cur_user.image;
        console.log(imagepath)
        
        let image = await fs.readFile(imagepath,'base64',(err,data)=>{
            if(err){
                return res.status(500).json({error:'Error getting dp'})
            }
            console.log("Dp is obtained")
           //return data
        })
        const base64attribute='data:image/jpeg;base64,'
        image=base64attribute+image;
        res.status(200).json({
            username:cur_user.username,
            age:cur_user.age,
            address:cur_user.address,
            gender:cur_user.gender,
            phonenumber:cur_user.phonenumber,
            mailID:cur_user.mailID,
            dp:image
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}

//2.seeing a designer
const seeDesignerprofile=async (req,res)=>{
    try{
        const cur_designer= await Designer.findOne({where:{designerid:req.body.designerid}})
        if(!cur_designer){
            return res.status(404).json({error:'User not found'})
        }
        res.status(200).json({
            designername:cur_designer.designername,
            age:cur_designer.age,
            address:cur_designer.address,
            gender:cur_designer.gender,
            phonenumber:cur_designer.phonenumber,
            mailID:cur_designer.mailID,
            active:cur_designer.active
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}

//3.update a user profile
const updateUser=async (req,res)=>{
    try{
        const id=req.body.userid
        await User.update(req.body,{where:{userid:id}})
        res.status(200).json({message:"User updated successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}

//4.update a designer profile
const updateDesigner=async (req,res)=>{
    try{
        const id=req.body.designerid
        await Designer.update(req.body,{where:{designerid:id}})
        res.status(200).json({message:"Designer updated successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}

//5. create a new product
const createproduct=async(req,res)=>{
    //console.log(req.headers['content-length'])
    const {
            designerid,
            description,
            productImage,
            fabric,
            fit,
            colours,
            washingInstructions,
            approxPrice,
            specialAttributes
        }=req.body

    try {

        const base64Data = productImage.replace(/^data:image\/\w+;base64,/, '');
        const dataBuffer = Buffer.from(base64Data, 'base64');
    
        // Generate a unique name for the image
        const imageName = `${Date.now()}.png`;
        const imagePath = path.join(__dirname, 'images', imageName);
        // Write the image data to the file system
        await fs.writeFile(imagePath, dataBuffer)
          try {
            // Save the image path to the database
            const imagePathInDatabase = imagePath;
            const newproduct={
                designerid:designerid,
                description:description,
                imagepath:imagePathInDatabase,
                productid:1000000+Math.floor(Math.random()*(9999999-1000000)),
                fabric:fabric,
                fit:fit,
                colours:colours,
                washing_instructions:washingInstructions,
                approx_price:approxPrice,
                special_attribute:specialAttributes
            }
            await Product.create(newproduct);
            res.status(201).json({message:'A new product inserted succesfully'})
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to save image path to database' });
          }
        }
    
    catch(err){
        console.log(err)
        res.status(400).json({error:'Invalid image data format'})
    }
}

//6. see the products in the user's cart
const seecart=async (req,res)=>{
    try{
        const {userid}=req.body
        const items= await Cart.findAll({where:{userid:userid}})
        if(items.length===0){
            return res.status(404).json({error:'You have no items in your cart'})
        }
        const allitems=new Array
        for(let i=0;i<items.length;i++){
            //const image=base64attribute+ await fs.readFile(items[i].imagepath,'base64')
            const cur_product =await Product.findOne({where:{productid:items[i].productid}})
            const cur_item={
                userid:items[i].userid,
                image:base64attribute+ await fs.readFile(items[i].imagepath,'base64'),
                description:items[i].description,
                NumberofItems:items[i].NumberofItems,
                productid:items[i].productid,
                approx_price:items[i].approx_price,
                designerid:items[i].designerid,
                fabric:cur_product.fabric,
                fir:cur_product.fit,
                colours:cur_product.colours,
                washing_instructions:cur_product.washing_instructions,
                approx_price:cur_product.approx_price,
                special_attribute:cur_product.special_attribute
            }
            allitems.push(cur_item)
        }
        res.status(200).json(allitems)
    }
     catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
     }
}

//7.displaying all products in user hompage
const uploadproducts=async (req,res)=>{
    try{
        //console.log(req)
        const {count}=req.body
        let start=count*20
        let des_products= await Product.findAll()
        const length=(start+20<=des_products.length)?start+20:des_products.length
        const cur_page_products=new Array
        for(let i=start;i<length;i++){

        
            const imagePath=des_products[i].imagepath
            let image=await fs.readFile(imagePath,'base64',(err,data)=>{
                if(err){
                    return res.status(400).json({error:'cannot load product image'})
                }
            })
            
            image=base64attribute+image;
            const singleProduct={
                productid:des_products[i].productid,
                approx_price:des_products[i].approx_price,
                image:image,
                designerid:des_products[i].designerid
            }
            cur_page_products.push(singleProduct)
        }
        
        return res.status(200).json({cur_page_products,totalproducts:des_products.length})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }

}

//8.adding a item to cart
const addtocart = async (req,res)=>{
    try{
        const {userid,designerid,productid,description,image}=req.body
        if(!designerid){ 
            const base64Data = image.replace(/^data:image\/\w+;base64,/,'');
            const dataBuffer = Buffer.from(base64Data, 'base64');
            const imageName = `${Date.now()}_cartitem.png`;
            const imagePath=path.join(__dirname,'images',imageName)
            await fs.writeFile(imagePath,dataBuffer)
            const new_item={
                description:description,
                imagepath:imagePath,
                userid:userid,
                NumberofItems:1
            }
            await Cart.create(new_item)
        }
        else{
            const duplicate_items= await Cart.findOne({where:{productid:productid,userid:userid}})
            if(duplicate_items){
                return res.status(409).json({error:'Item already in cart'})
            }
            const cur_item=await Product.findOne({where:{productid:productid}})
            const new_item={
                userid:userid,
                imagepath:cur_item.imagepath,
                description:cur_item.description,
                designerid:cur_item.designerid,
                approx_price:cur_item.approx_price,
                NumberofItems:1,
                imagepath:cur_item.imagepath,
                productid: cur_item.productid
            }
            await Cart.create(new_item)
        }
       res.status(200).json({message:'Item added to cart'}) 
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }
}








module.exports={
    seeUserprofile,
    seeDesignerprofile,
    updateDesigner,
    updateUser,
    createproduct,
    seecart,
    uploadproducts,
    addtocart
    
    // singledesignerorder
}