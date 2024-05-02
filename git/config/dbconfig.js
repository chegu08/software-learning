module.exports={
    HOST:'localhost',
    USER:'root',
    DB:'crafts_and_stitch',
    PASSWORD:'',
    dialect:'mysql',
    pool:{
        max: 500,
        min:0,
        acquire:30000,
        idle:10000
    }
}