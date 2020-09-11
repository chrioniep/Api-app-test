const express = require("express")
const Article = require("../models/article")
const store = require("../middlewares/store")
const User = require("../models/user")


const router = new express.Router()

router.post("/article/:user_id", async (req, res) => {
    const article = new Article({
        ...req.body,
        author:req.params.user_id
    })
    try{
        await article.save()
        res.send(article)

    }catch(e){
        res.status(400).send()
    }
})

router.get("/articles", async(req, res) =>{
    try{
        const article = await Article.find({})
        res.status(200).send(article)
    }catch(e){
        res.status(400).send()
    }
})

router.get("/articles/:id", async (req, res) =>{
    try{
        const article = await Article.findById(req.params.id)
        if(!article){
            return res.status(404).send()
        }
        res.send(article)

    }catch(e){
        res.status(400).send()
    }
})

router.get("/articles/:user_id", async (req, res) => {
    try{
        const user_id = req.params.user_id
        const article = await Article.findOne({
            author:user_id
        })
        if(!article){
            return res.status(404).send()
        }
        res.send(article)

    }catch(e){
        res.status(400).send()
    }
})

router.patch("/articles/:id", async (req, res) =>{
    try{
        const article = await Article.findOneAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        res.send(article)

    }catch(e){
        res.status(400).send()
    }
})

router.delete("/articles/:id", async (req, res) =>{
    try{
        const article = await Article.findOneAndDelete(req.params.id)
        res.send(article)
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router