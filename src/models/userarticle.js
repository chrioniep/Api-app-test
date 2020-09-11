const mongoose = require("mongoose")


const userarticleSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    articles:[{
        article:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Article"
        }
    }]
})

const UserArticle = mongoose.model("UserArticle", userarticleSchema)


module.exports = UserArticle