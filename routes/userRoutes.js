'use strict';
// MODULES
const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// ROUTES

// USER ROUTES
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);

// MAIN ROUTES
router.route('/').get(userController.getAllUsers).post(userController.addUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.editUser)
  .delete(userController.deleteUser);

module.exports = router;
