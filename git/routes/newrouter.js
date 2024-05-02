const {
    seesingleproduct,
    deleteProductfromcart,
    updateNumberofItems,
    alldesignerorders,
    updateselectedorder,
    productreview,
    designerreview,
    designerfeedback
}=require('../controllers/newcontroller')
const router=require('express').Router()


//9.display single product
router.post('/:productid',seesingleproduct)

//10.remove an item from cart
router.delete('/deleteitem',deleteProductfromcart)

//11.update number of items to an item 
router.put('/updateNumberofItems',updateNumberofItems)

//12.displaying all orders for the designer
router.post('/designerorders/:designerid',alldesignerorders)

//13.designer is updating the selected order
router.put('/designerorder/update',updateselectedorder)

//14. view a single selected order in designer page
// router.post('/singleorder/:orderid',singledesignerorder)

//15.create a product review
router.put('/productreview',productreview)

//16.create a designer review
router.put('/designerreview',designerreview)

//17.see all the feedback given to the designer
router.post('/feedback/:id',designerfeedback)



module.exports=router