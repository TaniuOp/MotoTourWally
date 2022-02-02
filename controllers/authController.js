// MODULES
const User = require('../models/userModel');

// CONTROLLERS

// SignUp function
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
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
// exports.login = async (req, res) => {
//   try {
//     const newUser = await User.findOne(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: { user: newUser },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };
