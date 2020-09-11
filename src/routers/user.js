const express = require("express")
const User = require("../models/user")


const router = new express.Router()



router.get("/userall", async (req, res)=>{
    try{
        const user = await User.find({
        })
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }
})
router.post("/createuser", async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})  

router.get("/user/:id", async (req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})

router.patch("/user/:id", async(req, res) =>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/user/:id", async (req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)

    }catch(e){
        res.status(500).send()
    }
})

module.exports = router