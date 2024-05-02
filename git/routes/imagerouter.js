const router = require('express').Router();
const {
    generateimage,
}=require('../controllers/imagecontroller')


//2.create image
router.post('/generateimage',generateimage)










module.exports=router