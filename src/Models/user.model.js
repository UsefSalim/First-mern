const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const UserSchema = Schema({
  name: { type: String},
  email: { type: String, required: true ,index:true,unique:true},
  password: { type: String, required: true },
  joined: { type: Date, default: Date.now  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
  } catch (e) {
    return next(e)
  }
})

UserSchema.methods.isPasswordMatch = function (password,hash,callback) {
  bcrypt.compare(password, hash, (error, success) => {
    if (error) return callback(error)
    callback(null,success)
  })
}
const User = mongoose.model('User', UserSchema);
module.exports = User;
