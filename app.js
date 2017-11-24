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
let prev = {"r":0,"g":244,"b":255,"a":1}
const colors = {
  default: {r:10, g: 10, b: 10, a:1},
  yellow: {r: 251, g: 255, b: 0, a: 1},
  red: {r: 255, g: 0, b: 0, a: 1},
  green: {r: 0, g: 255, b: 0, a: 1},
  orange: {r: 255, g: 112, b: 0, a: 1},
  blue: {r: 0, g: 0, b: 255, a: 1}
}


app.get('/api', (req, res) => {

  res.json(state)
})
app.post('/api', (req, res) => {
  state.color = req.body.color
  res.json(req.body.color)
})

app.post('/api/voice', (req, res) => {
  let color = req.body.color.toLowerCase()
  if(color=="on"){
    state.color = prev
  }else if (color=="off"){
    prev = Object.assign({},state.color)
    state.color = {r:0,g:0,b:0,a:1}
  }else{
    state.color = colors[color] || colors.default
    state.name = color  
  }
  
  console.log(state)
  res.json(color)
})

app.post('/api/voice/dim', (req, res) => {
  let direction = req.body.direction.toLowerCase()
  console.log(direction)
  let val = direction=="down" ? -50 : 50;
  if(req.body.value){
    let val = req.body.value
  }
  state.color.b= Math.max(0,Math.min(state.color.b+val,255))
  state.color.r= Math.max(0,Math.min(state.color.r+val,255))
  state.color.g= Math.max(0,Math.min(state.color.g+val,255))

  console.log(state)
  res.json({direction, val})
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
