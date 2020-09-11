const jwt = require("jsonwebtoken")
const UserArticle = require("../models/userarticle")
const User = require("../models/user")


const store = async (req, res, next) => {
    const user_id = req.params.user_id
    const contenue = req.body

    const userarticle = new UserArticle({
        author:user_id,
        article:contenue
    })

    req.store = userarticle
    next()


}