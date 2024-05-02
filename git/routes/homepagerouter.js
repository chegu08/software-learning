const router=require('express').Router()
const {
    seeUserprofile,
    seeDesignerprofile,
    updateDesigner,
    updateUser,
    createproduct,
    seecart,
    uploadproducts,
    addtocart
    
    // singledesignerorder
}=require('../controllers/homepagecontroller')








// 1. seeing a users profile
router.post('/userprofile',seeUserprofile)

// 2. seeing a designers profile
router.post('/designerprofile',seeDesignerprofile)

// 3. update a user profile
router.put('/userprofile/update',updateUser)

// 4.update a designer
router.put('/designerprofile/update',updateDesigner)

//5.creating a designer product
router.post('/createproduct',createproduct)

//6.seeing all the items in the cart
router.post('/seecart',seecart)

//7.displaying all products in user's homepage
router.post('/',uploadproducts)
  
//8.adding a item to cart 
router.post('/addtocart',addtocart)



module.exports=router
