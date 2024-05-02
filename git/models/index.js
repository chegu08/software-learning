const dbconfiguration = require('../config/dbconfig.js');

const { Sequelize,DataTypes }=require('sequelize');

const sequelize = new Sequelize(
    dbconfiguration.DB,
    dbconfiguration.USER,
    dbconfiguration.PASSWORD,
    {
        host: dbconfiguration.HOST,
        dialect: dbconfiguration.dialect,
        operatorsAliases: false,
        pool:{
            max :dbconfiguration.pool.max,
            min :dbconfiguration.pool.min,
            acquire :dbconfiguration.pool.acquire,
            idle: dbconfiguration.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected...')
})
.catch((err)=>{
    console.log(err)
})

const db={}

db.Sequelize=Sequelize 
db.sequelize=sequelize

//table name
db.users=require('./userModel.js')(sequelize,DataTypes)
db.designers=require('./designerModel.js')(sequelize,DataTypes)
db.products=require('./designerProduct.js')(sequelize,DataTypes)
db.carts=require('./usercart.js')(sequelize,DataTypes)
db.userorders=require('./userorder.js')(sequelize,DataTypes)
db.productreviews=require('./productreviews.js')(sequelize,DataTypes)
db.designerreviews=require('./designerreview.js')(sequelize,DataTypes)
db.sequelize.sync({force:false})
    .then(()=>{
        console.log('re-sync done!')
    })



module.exports= db