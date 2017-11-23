const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const cors = require("cors")

const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

let state = {}

app.get('/api', (req, res) => {

  res.json(state)
})
app.get('/post', (req, res) => {

  console.log(req.body)
  res.json({version: req.body})
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
