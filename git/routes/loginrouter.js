const router=require('express').Router()
const {
    userlogin,
    designerlogin
}=require('../controllers/logincontroller')

//1.user login
router.post('/loginuser',userlogin)

//2.designer login
router.post('/logindesigner',designerlogin)


module.exports=router