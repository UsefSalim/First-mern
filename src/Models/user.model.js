const mongoose = require('mongoose');
const { Schema } = mongoose
// const passwordHash = require("password-hash");
// const jwt = require("jwt-simple");
const bcrypt = require('bcryptjs')

const UserSchema = Schema({
  name: { type: String},
  email: { type: String, required: true ,index:true,unique:true},
  password: { type: String, required: true },
  joined: { type: Date, default: Date.now  },
});

// UserSchema.methods = {
//   authenticate: function (password) {
//     return passwordHash.verify(password, this.password);
//   },
//   getToken: function () {
//     return jwt.encode(this, config.secret);
//   }
// };
//arrow function ne fonctionne pas 
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
const User = mongoose.model('User', UserSchema);
module.exports = User;
