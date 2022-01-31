// MODULES 
const router = require('express').Router

// Import controllers 
const tourController = require('../controllers/tourContoller')
const API_URL = '/api/v1/tours'


// ROUTER METHOD 
// Get al tours and Create tour 
router.route.get(API_URL, tourController.getAllTours).post(API_URL, tourController.createTour)
// Edit , update and delete Tour 
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

// Create tour 
    // router.route.post(API_URL, tourController.createTour)
// Get tour detail using Route params (los : son variables) 
    // router.route.get(`${API_URL}/:id`, tourController.getTour)
// Update tour (updating just some fields). Put updates all the document info 
    // router.route.patch(`${API_URL}/:id`, tourController.updateTour)
// Delete tour 
    // router.route.delete(`${API_URL}/:id`, tourController.deleteTour)

module.exports = router; 