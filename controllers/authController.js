// MODULES
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Auth Token function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_MY_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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

    // Create Token --> We migrate it on top so we dont repeat the function
    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_MY_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN,});
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser },
    });
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
    const token = signToken(user._id);
    // 3. If everything is ok, send the token to client
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
