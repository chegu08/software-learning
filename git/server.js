const express=require('express');
const app=express()
const cors=require('cors')
const bodyparser=require('body-parser')
var corOptions={
    origin:'*',
    allowedHeaders:['Content-Type','Authorization'],
}

//middleware
app.use(cors(corOptions))
app.use(express.json({limit:'20mb'}))
app.use(express.urlencoded({limit:'20mb',extended:true}))
app.use(bodyparser.json({limit:'20mb'}))
app.use(bodyparser.urlencoded({limit:'20mb',extended:true}))

//router
const signuprouter=require('./routes/signuprouter')
app.use('/signup',signuprouter)
const loginrouter=require('./routes/loginrouter')
app.use('/login',loginrouter)
const homepagerouter=require('./routes/homepagerouter')
app.use('/homepage',homepagerouter)
const userorderrouter=require('./routes/userorderrouter')
app.use('/userorder',userorderrouter)
const paymentrouter=require('./routes/paymentrouter')
app.use('/payment',paymentrouter)
// const authrouter=require('./routes/oauth')
// app.use('/auth',authrouter)
const imagerouter=require('./routes/imagerouter')
app.use('/image',imagerouter)
const newrouter=require('./routes/newrouter')
app.use('/new',newrouter)


//testing api
app.get('/',(req,res)=>{
    res.send('Welcome to the home page')
})

//port
const port=process.env.PORT || 6000
app.listen(port,()=>console.log(`server is listening on port ${port}`))