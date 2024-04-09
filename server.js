const express=require('express');
const app=express()
const cors=require('cors')
var corOptions={
    origin:'*'
}

//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//router
const signuprouter=require('./routes/signuprouter')
const loginrouter=require('./routes/loginrouter')
app.use('/api/signup',signuprouter)
app.use('/api/login',loginrouter)

//testing api
app.get('/',(req,res)=>{
    res.send('Welcome to the home page')
})

//port
const port=process.env.PORT || 3000
app.listen(port,()=>console.log(`server is listening on port ${port}`))