const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const V1Route = require('./Routes/v1Routes')

/////// -------------------------DB Config -------------------------------///////
mongoose.connect(process.env.MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réusVsie !'))
  .catch((err) => console.error(`Connexion à MongoDB échouée ! : ${err}`));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/////// ------------------------- Middelwers -------------------------------///////
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
/////// -------------------------Routs-------------------------------///////
app.use('/api/V1Route',V1Route)

/////// -------------------------ERRORS -------------------------------///////

// app.use((req, res, next) => res.status(404).send({  message : 'Url not found'}))
// utiliser cette method de generation pour plus de fluidité et tretement avec try catsh au lieu de .then .catsh 
app.use((req, res, next) => {
  var err = new Error('Page Not Found')
  err.status = 404
  next(err)
})
app.use((err,req, res, next) => {
  const status = err.status || 500
  const error = err.message || ' Server Error 500'
  res.status(status).send({
    error
  })
})



module.exports = app;