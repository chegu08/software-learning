const router=require('express').Router()
const {
    createuser,
    createdesigner
}=require('../controllers/signupcontroller')

//1.a new user sign up
router.post('/createuser',createuser)

//2.A new designer signup
router.post('/createdesigner',createdesigner)


module.exports=router