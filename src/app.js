const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')

/////// -------------------------DB Config -------------------------------///////

mongoose.connect(process.env.MONGO_DB_URL, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true
  
})
mongoose.connection.on('connected', () => {
  console.log('Connected to the DB')
})
mongoose.connection.on('error', (error) => {
  console.log(`Failed to connect DB: ${error}`)
})

/////// ------------------------- Middelwers -------------------------------///////
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))
/////// -------------------------Routs-------------------------------///////

app.post('/hello', (req,res) => {
  const name = req.body.name
  res.send({
    message : `Welcom ${name}`
  })
})
/////// -------------------------DB Config -------------------------------///////




module.exports = app