// MODULES
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { promisify } = require('util'); //--> To do a promisify (force a Promise to a not async function)
const sendEmail = require('../utils/email');
const crypto = require('crypto');

// SIGN Auth TOKEN FUNCTION
// Create Token --> We migrate it on top so we dont repeat the function

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_MY_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// CREATE AND SEND TOKEN TO CLIENT FUNCTION (to be use in various controllers functions instead of repeating code in all)
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Define cookies options
  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //--> allows only read fron the browser
  };
  // Conditional for secure protocol
  if (process.env.NODE_ENV !== 'production') {
    cookiesOptions.secure = true; //--> the cookie saves if the protocol is https
    console.log('Send production Cookies in secure mode');
  }

  // Send cookie to client (name, options)
  res.cookie('jwt', token, cookiesOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

// CONTROLLERS

// SignUp function
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    }); //--> no le pasamos el req.body completo por seguridad (evitamos que se pueda pasar isAdmin: true)

    // If everything is ok, send the token to client
    // We use the global function to generate and send Token sending this controller arguments
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Login function
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if fields are not empty
    if (!email || !password)
      throw new Error('Debes completar todos los campos');

    // 2. Verify if email exists and password is correct

    const user = await User.findOne({ email }).select('+password'); //We use "select" because this field is hidden from the user schema

    // Use the correctPAssword instance / function with 2 parameters (body password send in the form and the user password returned from DB)
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('¿Estas seguro que tus datos son correctos?');
    }
    // 3. If everything is ok, send the token to client
    // We use the global function to generate and send Token sending this controller arguments
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Protect routes URL MIDDLEWARE function

exports.protectURL = async (req, res, next) => {
  try {
    // 1. Get user token with Bearer copy
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer') //--> Get headers
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      throw new Error('debes iniciar sesion para tener acceso');
    }
    // 2. Verify if token is valid (with a jwt.verify method) and obtain decoded user ID
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_MY_SECRET
    ); //--> Returns a promise so we use a Node util promisify to change it to a async/await

    // 3. Check if user still exists in DB (not deleted)
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error('Este usuario ya no existe o debe actualizar el Token');
    }

    // 4. Check if user changed password with Mongoose instance
    if (currentUser.changePassword(decoded.iat)) {
      throw new Error(
        'Se ha modificado la contraseña recientemente. Debes iniciar sesión'
      );
    }

    // 5. Save user to be used globally
    req.user = currentUser;

    next();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Middleware to restrict rutes for users Roles
exports.restrictTo = (...roles) => {
  //  (...roles)-> rest opearator as parameter. Is this case is ['admin', 'lead-guide', 'guide'] received from the tourRoute
  return (req, res, next) => {
    console.log(req.user);
    console.log(roles);
    try {
      // if Roles array does not includes req.user.role , throw erros
      if (!roles.includes(req.user.userRole)) {
        //--> we compare actual user rol with defined keys roles in routes
        throw new Error('Debes tener permisos para realizar esta acción');
      }
      next(); //--> Will return the middleware function with params
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message,
      });
    }
  };
};

// Forgot password function
exports.forgotPassword = async (req, res) => {
  try {
    // 1. Verify if user exists in the DB based on POST email sent
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      throw new Error('No se ha encontrado un usuario con estos datos');

    // 2. Generate reset random token with the instance method from the user Model
    const resetToken = user.createRandomResetToken();
    await user.save({ validateBeforeSave: false }); //-> Save the user data and dont validate the rest of the data

    // 3. Send random token to the user email
    // req.protocol;--> Obtain the url protocol (http / https)
    // req.get('host');--> Obtain the url
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/reset-password/${resetToken}`;

    const subject = `Reestablece tu contraseña`;

    const text = `Reestablece tu contraseña haciendo click en el siguiente enlace: /n ${resetURL} /n El enlace caducará en 10min /n Si no has solicitado reestablecer tu contraseña, por favor ignora este mensaje.`;
    try {
      // Call sendEmail with user and email arguments
      await sendEmail({
        email: user.email,
        subject,
        text,
      });
      // Send response to client
      res.status(200).json({
        status: 'success',
        message: 'Se ha enviado el correo para reestablecer la contraseña',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error(
        'Hubo un error al enviar el correo de reestablecimiento de contraseña'
      );
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    // 1. Obtain user based on the recovery password token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    // 2. If token has not expired, the user exists and new password match, set new password if not, throw error
    if (!user) throw new Error('El token es inválido o ha expirado');

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // 3. Save user document on DB (with password validations) and update passwordChangedAt value
    await user.save();

    // 4. If everything is ok, generate the token, Log the user in, and update & send JWT to Client
    // We use the global function to generate and send Token sending this controller arguments
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update loged user password
exports.updateCurrentUserPassword = async (req, res) => {
  try {
    // 1. Get user from DB
    const user = await User.findByIdAndUpdate(req.user.id).select('+password');

    // 2. Verify if POST "current" password is ok
    const passwordMatch = await user.correctPassword(
      req.body.currentPassword,
      user.password
    );
    if (!passwordMatch) throw new Error('Invalid password');

    // 3. if current password is ok, uptade with new password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    // 4. Update and save user
    await user.save();

    // We use the global function to generate and send Token sending this controller arguments
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update user data
exports.updateCurrentUser = async (req, res) => {
  try {
    // findByIdAndUpdate with id and fields to change. If one of these fields is not updated, it mantains previous value
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        newsletter: req.body.newsletter,
        country: req.body.country,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete currrent user account (inactive)
exports.deleteCurrentUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
