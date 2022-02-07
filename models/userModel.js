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
  userRole: {
    type: 'String',
    default: 'user',
  },
  isAdmin: {
    type: 'String',
    default: false,
  },
  password: {
    type: 'String',
    required: [true, 'Debes completar todos los campos'],
    minlength: 6,
    select: false, //--> Don´t send this field when ask for the user data (get * user)
  },
  passwordConfirm: {
    type: 'String',
    required: [true, 'Debes confirmar tu contraseña'],
    select: false, //--> Don´t send this field
    validate: {
      validator: function (element) {
        return element === this.password;
      },
      message: 'Las contraseñas no coinciden',
    },
  },
  passwordChangedAt: Date,
});

// MONGOOSE MIDDLEWARE (to encrypt password)
// .Pre middleware uses 2 params (the method that will execute this function "save" and the function itself)
userSchema.pre('save', async function (next) {
  // if password field is not modified, run netx() and exit the middleware
  if (!this.isModified('password')) return next();
  // if password is modified (creat or edit user) encrypt password
  this.password = await bcrypt.hash(this.password, 12);
  // delete password confirm item
  this.passwordConfirm = undefined;
  next();
});

// MONGOOSE INSTANCE METHOD (we can call this methos from all the App)
// Check passwords intance method --> we can use this instance from the App with "correctPassword" method
userSchema.methods.correctPassword = async function (
  bodyPassword,
  dataBasePassword
) {
  return await bcrypt.compare(bodyPassword, dataBasePassword);
};

// Check if password has changed after token`s been assigned (true: password changed or false: is OK )
userSchema.methods.changePassword = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt);
    console.log(JWTTimeStamp);
    // Chenge date format to match and comapare with JWTTimeStamp
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

// MONGOOSE MODEL
const User = mongoose.model('User', userSchema);

// Export Model
module.exports = User;
