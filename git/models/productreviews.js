


module.exports = (sequelize,DataTypes)=>{
    const review =sequelize.define("productreview",{
        review:{
            type:DataTypes.STRING,
            allowNull:true
        },
        rating:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        userid:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        productid:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        designerid:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return review
}
//userid,productid,desid