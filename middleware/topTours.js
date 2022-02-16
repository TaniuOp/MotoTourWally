exports.getTopTours = (req, res, next) => {
  (req.query.limit = '2'), (req.query.sort = '-ratingsAverage');
  // req.query.ratingsAverage = '4'
  req.query.fields = 'tourname, price, ratingsAverage, difficulty, imageCover';
  next();
};
