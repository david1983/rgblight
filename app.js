const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const cors = require("cors")

const bodyParser = require('body-parser')
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

let state = {}

app.get('/api', (req, res) => {

  res.json(state)
})
app.post('/api', (req, res) => {
  state.color = req.body.color
  res.json(req.body.color)
})

app.get('/api/voice', (req, res) => {
  let color = req.body.color
  console.log(color)
  res.json(color)
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
