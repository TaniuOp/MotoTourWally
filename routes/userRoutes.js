'use strict';
// MODULES
const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// ROUTES

// USER ROUTES
router.post('/signup', authController.signUp); // Register
router.post('/login', authController.logIn); //Login
router.post('/forgot-password', authController.forgotPassword); // Forgot password
router.patch('/reset-password/:token', authController.resetPassword); // Reset password (modify the password)
router.get(
  '/profile',
  authController.protectURL,
  authController.getUserProfile
); // Get user profile
router.patch(
  '/edit-profile-password',
  authController.protectURL,
  authController.updateCurrentUserPassword
); // Modify the password
router.patch(
  '/edit-profile',
  authController.protectURL,
  authController.updateCurrentUser
); // Modify the user data
router.patch(
  '/edit-profile-delete',
  authController.protectURL,
  authController.deleteCurrentUser
); // Delete (deactivate) user

// MAIN ROUTES
router
  .route('/')
  .get(
    authController.protectURL,
    authController.restrictTo('admin'),
    userController.getAllUsers
  )
  .post(
    authController.protectURL,
    authController.restrictTo('admin'),
    userController.addUser
  );

router
  .route('/:id')
  .get(
    authController.protectURL,
    authController.restrictTo('admin', 'lead-guide'),
    userController.getUser
  )
  .patch(authController.protectURL, userController.editUser)
  .delete(
    authController.protectURL,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;
