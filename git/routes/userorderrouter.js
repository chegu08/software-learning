const router=require('express').Router()

const {
    allorders,
    placeneworder,
    updatepaymentdetails
}=require('../controllers/userordercontroller')

//2.place a new order
router.post('/',placeneworder)

//1.displaying all orders
router.post('/:userid',allorders)

//3.updating the order after the payment has been done
router.post('/:orderid/:paymentid',updatepaymentdetails)





module.exports=router