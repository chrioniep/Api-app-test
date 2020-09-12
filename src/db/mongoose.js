const mongoose = require("mongoose")


mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/api-app-db", {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})