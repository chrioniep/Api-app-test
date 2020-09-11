const express = require("express")
const userRouter = require("./routers/user")
const articleRouter = require("./routers/articles")

require("./db/mongoose")

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(articleRouter)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log("The server is running on " + port)
})



