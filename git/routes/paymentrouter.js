const router=require('express').Router();

const {
    checkout,
    createorder,
    getvariables
}=require('../controllers/paymentcontroller')

router.get('/:userid/:orderid/:price',checkout)

router.post('/createorder',createorder)

router.get('/getvar',getvariables)

module.exports=router