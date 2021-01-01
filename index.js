//utiliser dotenv pour avoir accée au variable d'environnement 
require('dotenv').config()
const app = require('./src/app')
//le port ecout sur la variable port si il la trrouve pas passe sur le port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server is ready for connect in port number : ${PORT}`)
})
 