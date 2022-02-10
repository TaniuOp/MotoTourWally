// MODULES
const express = require('express');
const app = express();
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors');
const morgan = require('morgan');
// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(process.env.NODE_ENV);

// Define conditional for dev/prod
if (process.env.NODE_ENV == 'development') {
  app.use(morgan());
  console.log('Development');
}

// Welcome - localhost
app.get('/', (req, res) => {
  res.status(200).send('Hello from the MotoTour server');
});

// ROUTES

// Tour Routes
app.use('/api/v1/tours', tourRoutes);

// User Routes
app.use('/api/v1/users', userRoutes);

app.use(cors());

module.exports = app;
