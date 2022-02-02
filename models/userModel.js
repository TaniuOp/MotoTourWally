// MODULES
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Mongoos Schema
const userSchema = new mongoose.Schema({
  username: {
    type: 'String',
    required: [true, 'Debes completar todos los campos'],
  },
  email: {
    type: 'String',
    required: [true, 'Debes completar todos los campos'],
    unique: true,
    lowercase: true,
    validator: [
      validator.isEmail,
      'El email introducido no cumple con los requerimientos',
    ],
  },
  photo: {
    type: 'String',
    default:
      'https://cdn1.iconfinder.com/data/icons/society-profession-avatar/1024/Society_Profession_Avatar_I-16-512.png',
  },
  newsletter: {
    type: 'Boolean',
    default: false,
  },
  password: {
    type: 'String',
    required: [true, 'Debes completar todos los campos'],
    minlength: 4,
  },
  passwordConfirm: {
    type: 'String',
    required: [true, 'Debes confirmar tu contraseña'],
    validate: {
      validator: function (element) {
        return element === this.password;
      },
      message: 'Las contraseñas no coinciden',
    },
  },
});

// Mongoose Middleware (to encrypt password)
// .Pre middleware uses 2 params (the method that will execute this function "save" and the function itself)
userSchema.pre('save', async function (next) {
  // if password field is not modified, run netx() and exit the middleware
  if (!this.isModified('password')) return next();
  // if password is modified (creat or edit user) encrypt password
  this.password = await bcrypt.hash(this.password, 10);
  // delete password confirm item
  this.passwordConfirm = undefined;
  next();
});

// Mongoose Model
const User = mongoose.model('User', userSchema);

// Export Model
module.exports = User;
