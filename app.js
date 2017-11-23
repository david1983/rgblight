const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors)

app.get("/", (req,res)=>{
    res.json({version: 1})
})

app.listen(8080)