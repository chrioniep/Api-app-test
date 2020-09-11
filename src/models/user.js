const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(values){
            if(!validator.isEmail(values)){
                throw new Error("Email not correct")
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

userSchema.virtual("articles",{
    ref:"Article",
    localField:"_id",
    foreignField:"author"
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, "thisisthesecretstring")
    user.tokens = user.tokens.concat({token:token})

    await user.save()

    return token
}

userSchema.pre("save", async function(next){
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model("User", userSchema)

module.exports = User