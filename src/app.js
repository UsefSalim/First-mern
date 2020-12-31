const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')

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

app.post('/hello', (req, res) => {
  const name = req.body.name  
  res.send({
    message: `Welcom ${name}`
  })
})
/////// -------------------------DB Config -------------------------------///////




module.exports = app;