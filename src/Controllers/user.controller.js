const User = require('../Models/user.model')
const userController = {}

/**
 * 
 * @param {response} res 
 * @param {request} req 
 * @param {Function} next 
 * Controller register User
 */
userController.register = async (req, res, next) => {
  const newUser = new User({
    ...req.body
  })
  try {
    const user = await newUser.save()
    return res.send({user})
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

module.exports = userController;