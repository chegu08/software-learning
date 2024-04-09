const router=require('express').Router()
const {
    userlogin,
    designerlogin
}=require('../controllers/logincontroller')

//1.user login
router.get('/loginuser',userlogin)

//2.designer login
router.get('/logindesigner',designerlogin)


module.exports=router