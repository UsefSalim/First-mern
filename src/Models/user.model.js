const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcryptjs')
// creation du shema utilisateur 
const UserSchema = Schema({
  name: { type: String},
  email: { type: String, required: true ,index:true,unique:true},
  password: { type: String, required: true },
  joined: { type: Date, default: Date.now  },
});

/// avant d'enregistrer l'utulisateur on hach le mots de pass 
UserSchema.pre('save', async function (next) {
  // si ce n'est qu'une simple modifiacation continuer 
  if (!this.isModified('password')) {
    return next()
  }
  /// envoyer le mots de passe haché 
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
    //si le mots de passe ne ce hach pas catché l'erreur 
  } catch (e) {
    return next(e)
  }
})
/// methode de verification de match du mots pass envoyé par l'utilisateur et le mots de pass haché
UserSchema.methods.isPasswordMatch = function (password, hash, callback) {
  // methode compare 
  bcrypt.compare(password, hash, (error, success) => {
    if (error) return callback(error)
    callback(null,success)
  })
}
const User = mongoose.model('User', UserSchema);
module.exports = User;
