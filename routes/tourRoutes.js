// MODULES 
const router = require('express').Router()

// Import controllers 
const tourController = require('../controllers/tourContoller')


// ROUTER METHODS 

// Get al tours and Create tour 
router.route('/').get(tourController.getAllTours).post(tourController.createTour)

// Edit , update and delete Tour 
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router; 







// Create tour 
    // router.route.post(API_URL, tourController.createTour)
// Get tour detail using Route params (los : son variables) 
    // router.route.get(`${API_URL}/:id`, tourController.getTour)
// Update tour (updating just some fields). Put updates all the document info 
    // router.route.patch(`${API_URL}/:id`, tourController.updateTour)
// Delete tour 
    // router.route.delete(`${API_URL}/:id`, tourController.deleteTour)

