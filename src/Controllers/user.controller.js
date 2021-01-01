
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
  const newUser = new User({
    ...req.body
  })
  try {
    const user = await newUser.save()
    return res.send({ user })
  } catch (e) {
    if (e.code === 11000 && e.name === "MongoError") {
      const error = new Error(`l'adress mail ${newUser.email} existe deja`)
      next(error)
    }
    next(e)
  }

  // .then(() => res.status(201).json({ message: 'Utilisateur créé avec succées !' }))
  // .catch(error => res.status(400).json({ error }));

}
exports.login = async (req, res, next) => {
  /// req login password
  const { email, password } = req.body

  try {
    /// check 
    /// recuperer les info  de la base de donné 
    ///email
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error(`l'adress mail ${email} n'existe pas esseyer une autre adress mail `)
      error.status = 401
      next(error)
    }
    //password
    user.isPasswordMatch(password, user.password, (error, success) => {
      if (success) {
        const secret = process.env.JWT_SECRET
        const expire = process.env.JWT_EXPIRATION
        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire }) 
        res.send({token})
      }
      res.status(401).send({
        error: 'identifiant ou mots de passe invalide'
      })

    })

  } catch (e) {
    next(e)
  }
  /// return jsonweb token 

}
