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

let state = {"color":{"r":0,"g":244,"b":255,"a":1}}

const colors = {
  default: {r:10, g: 10, b: 10, a:1},
  Yellow: {r: 251, g: 255, b: 0, a: 1},
  Red: {r: 255, g: 0, b: 0, a: 1},
  Green: {r: 0, g: 255, b: 0, a: 1},
  Blue: {r: 0, g: 0, b: 255, a: 1}
}


app.get('/api', (req, res) => {

  res.json(state)
})
app.post('/api', (req, res) => {
  state.color = req.body.color
  res.json(req.body.color)
})

app.post('/api/voice', (req, res) => {
  let color = req.body.color
  state.color = colors[color] || colors.default
  state.name = color

  console.log(state)
  res.json(color)
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
