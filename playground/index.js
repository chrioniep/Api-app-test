const express = require("express")
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/playground-db", {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
})

const port = process.env.PORT || 3000
const app = express()

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    }

})

const User = mongoose.model("User", userSchema)

app.use(express.json())

app.post("/createuser", async (req, res) => {
    
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})



app.listen(port, () => {
    console.log("The server is run")
})