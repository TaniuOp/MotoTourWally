// MODULES
const router = require('express').Router();
// Import controllers
const authController = require('../controllers/authController');
const tourController = require('../controllers/tourContoller');

// Import middleware
const topTours = require('../middleware/topTours');

// ROUTER METHODS

// Get top tours (first apply top tours filter and then get all tours with that filter)
router.route('/toptours').get(topTours.getTopTours, tourController.getAllTours);

// Get al tours and Create tour
router
  .route('/')
  .get(authController.protectURL, tourController.getAllTours) //--> Exececute the auth middleware (created in the controller file) to confirm user sesion
  .post(tourController.createTour);

// Edit , update and delete Tour
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

// Create tour
// router.route.post(API_URL, tourController.createTour)
// Get tour detail using Route params (los : son variables)
// router.route.get(`${API_URL}/:id`, tourController.getTour)
// Update tour (updating just some fields). Put updates all the document info
// router.route.patch(`${API_URL}/:id`, tourController.updateTour)
// Delete tour
// router.route.delete(`${API_URL}/:id`, tourController.deleteTour)
