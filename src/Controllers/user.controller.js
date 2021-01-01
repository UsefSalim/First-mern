
const User = require('../Models/user.model')
const jwt = require('jsonwebtoken')

/**
 * 
 * @param {response} res 
 * @param {request} req 
 * @param {Function} next 
 * Controller register User
 */
exports.register = async (req, res, next) => {
  //recuperer les info envoyer par la request
  const newUser = new User({
    ...req.body
  })

  try {
    // ajouter un nouveau utilisatuer
    const user = await newUser.save()
    // affichier les info de l'utilisateur ajouter
    return res.send({ user })
  } catch (e) {
    // si le code d'erreur envoyer == mongoError avec un code 11000 c'est que l'adress mail existe deja temps que c'est unique ans le model
    if (e.code === 11000 && e.name === "MongoError") {
      const error = new Error(`l'adress mail ${newUser.email} existe deja`)
      next(error)
    }
    // renvoi d'erreur 
    next(e)
  }

  // .then(() => res.status(201).json({ message: 'Utilisateur créé avec succées !' }))
  // .catch(error => res.status(400).json({ error }));

}
exports.login = async (req, res, next) => {
  /// req login password
  const { email, password } = req.body

  try {
  // recupere l'utilisateur avec son adress mail de la base de donné
    const user = await User.findOne({ email })
    if (!user) {
      ///si on le trouve pas en revoi un erreur 401 
      const error = new Error(`l'adress mail ${email} n'existe pas esseyer une autre adress mail `)
      error.status = 401
      next(error)
    }
    ///utilisateur trouver passage a la verification du mots de passe /// isPasswordMatch crée dans le module 
    //password
    user.isPasswordMatch(password, user.password, (error, success) => {
      // si le mots de pass matsh avec celui haché en crée un json web token 
      if (success) {
        const secret = process.env.JWT_SECRET
        const expire = process.env.JWT_EXPIRATION
        //on passe id de l'utilisateur la clé secrette de creation du jwt et le temps d'expiration du jwt 
        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire }) 
        return res.send({token})
      }
      res.status(401).send({
        error: 'identifiant ou mots de passe invalide'
      })

    })
/// si l'adress mail ou mpd ne match pas renvoi erreur catché 
  } catch (e) {
    next(e)
  }
}
