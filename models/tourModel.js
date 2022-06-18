// MODULES
const mongoose = require('mongoose');

// SCHEMA
const tourSchema = new mongoose.Schema({
  tourname: {
    type: String,
  },
  duration: {
    type: Number,
  },
  maxGroupSize: {
    type: Number,
  },
  difficulty: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// MODEL
const Tour = mongoose.model('Tour', tourSchema);

// Export model
module.exports = Tour;