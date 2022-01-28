// MODULES 
const express = require('express')
const app = express()

// Import controllers 
const tourController = require('./controllers/tourContoller')

// ROUTES 
app.get('/', (req, res) => {
    res.status(200).send("Hello from the MotoTour server")
})

// Get al tours 
app.get('/api/v1/tours', tourController.getAllTours)


// Get tour detail using Route params (los : son variables) 
app.get('/api/v1/tours/:id', tourController.getTour)

// Create tour 
app.post('/api/v1/tours', tourController.createTour)

// Update tour (updating just some fields). Put updates all the document info 
app.patch('/api/v1/tours/:id', tourController.updateTour)

// Delete tour 
app.delete('/api/v1/tours/:id', tourController.deleteTour)


module.exports = app 