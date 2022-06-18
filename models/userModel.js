// MODULES
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user',
  },
  isAdmin: {
    type: 'String',
    default: false,
  },
  Country: 'String',
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
    // Validation only works with .save() || .crate() (does not work with findBy..)
    validate: {
      validator: function (element) {
        return element === this.password;
      },
      message: 'Las contraseñas no coinciden',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: 'boolean',
    default: true,
    select: false,
  },
});

// MONGOOSE MIDDLEWARES (to encrypt password)

// Encrypt Password:  .Pre middleware uses 2 params (the method that will execute this function "save" and the function itself)
userSchema.pre('save', async function (next) {
  // if password field is not modified, run netx() and exit the middleware
  if (!this.isModified('password')) return next();
  // if password is modified (creat or edit user) encrypt password
  this.password = await bcrypt.hash(this.password, 12);
  // delete password confirm item
  this.passwordConfirm = undefined;
  next();
});

// Update passwordChangedAt field: Only if the password ir modified, update passwordCanhgedAt field with current date
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() + 2000; // add 2 seconds to prevent error with the JWT generator
  next();
});

// Find users with "active" field set to "true" only
// 1. get user schema and filter by the word find .. that includes the active users
userSchema.pre(/^find/, function (next) {
  //--> regular expresion
  this.find({ active: true });
  next();
});

// *** MONGOOSE INSTANCE METHODS (we can call th∫ese methos from all the App) ***

// correctPassword instance: Check passwords intance method --> we can use this instance from the App with "correctPassword" method
userSchema.methods.correctPassword = async function (
  bodyPassword,
  dataBasePassword
) {
  return await bcrypt.compare(bodyPassword, dataBasePassword);
};

// changePassword instance: Check if password has changed after token`s been assigned (true: password changed or false: is OK )
userSchema.methods.changePassword = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt);
    console.log(JWTTimeStamp);
    // Chenge date format to match and comapare with JWTTimeStamp
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp; //True is an error
  }
  // False means not changed
  return false;
};

// createRandomToken instance: Generate random token for the password recovery encripted with node module crypto
userSchema.methods.createRandomResetToken = function () {
  const randomToken = crypto.randomBytes(32).toString('hex'); //Generate a random alphanumeric token
  // Set randomToken to passwordResetToken field in the DB encripted
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(randomToken)
    .digest('hex');

  // Set 'passwordResetExpires'
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return randomToken;
};

// MONGOOSE MODEL
const User = mongoose.model('User', userSchema);

// Export Model
module.exports = User;
