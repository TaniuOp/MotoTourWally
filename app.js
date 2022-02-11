// MODULES
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit'); // Limit IP petitions
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize'); // Secure noSQL petitions
const xss = require('xss-clean'); // Clean any malicious html post
const hpp = require('hpp'); //http parameter polution
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

// MIDDLEWARES
// Set security HTTP headers middleware (always on top)
app.use(helmet());

// Deelopment logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan());
  console.log('App running in development mode');
}

// Cors middleware
app.use(cors());

// BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Data sanitization against NoSQL query injections (put after bodyparser)
app.use(mongoSanitize());

// Data sanitization against crosside scripting (xss) Html cleaner
app.use(xss());

// Removes duplicate request that may get error in petitions (sending whitelist parameter that can be repeated multiple times in the request price=200&price=300)
app.use(
  hpp({
    whitelist: [
      'duration',
      'maxGroupSize',
      'difficulty',
      'ratingsAverage',
      'price',
      'startDates',
    ],
  })
);

//Rate limiter midleware (to limit max IP petitions - security)
const limiter = rateLimit({
  max: 100, //-> 100 petition per hour
  windowMs: 60 * 60 * 1000, //-> 1h (per hour)
  message: 'Se han excedido las peticiones permitidas',
});
app.use('/api', limiter); //--> Route when the limiter will apply

// ROUTES
// Welcome route - localhost
app.get('/', (req, res) => {
  res.status(200).send('Hello from the MotoTour server');
});

// Tour Routes
app.use('/api/v1/tours', tourRoutes);

// User Routes
app.use('/api/v1/users', userRoutes);

module.exports = app;
