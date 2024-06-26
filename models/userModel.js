module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('user',{
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        userid:{
            type:DataTypes.INTEGER
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phonenumber:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        mailID:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return User
}