exports.getTopTours = (req, res, next) => {
    req.query.limit = '3',
    req.query.sort = '-ratingsAverage' 
    // req.query.ratingsAverage = '4'
    req.query.fields = 'tourname, price, ratingsAverage, difficulty'
    next()
}