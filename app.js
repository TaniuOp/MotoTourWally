// MODULES 
const express = require('express')
const app = express()
const tourRoutes = require('./routes/tourRoutes')

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES 
app.use('/api/v1/tours', tourRoutes)

// app.get('/', (req, res) => {
//     res.status(200).send("Hello from the MotoTour server")
// })


module.exports = app 