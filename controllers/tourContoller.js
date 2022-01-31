// MODULES 
const Tour = require('../models/tourModel')

// CONTROLLERS (Tours controller functions) 
exports.getAllTours = async (req, res) => {
    try {

        // Filtering with query params  (key=value --> page=1)

        // 1- Basic filtering: Create a req.query copy and delete query params not included in the object itself
        const queryObject = {...req.query}
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(element => delete queryObject[element])

        // 2- Advance filtering: using JS methods 
        let queryString = JSON.stringify(queryObject)

            // mongosse operation to replace words
            queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // Mongoose Regular expresion 
        
        // Database search 
        let searchTours = Tour.find(JSON.parse(queryString))

        // 3- Sort list 
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join('')
            searchTours = searchTours.sort(sortBy) //mongoose method "sort"
        } 

        // 4- Field limit (just the fields required)
        if (req.query.fields) {
            const limitFields = req.query.fields.split(',').join('')
            searchTours = searchTours.select(limitFields) //mongoose method "select"
        } 

        // 5- Pagination 
        const page = req.query.page || 1 ; 
        const limitResults = req.query.limit || 2 ;    
        const skip = (page - 1) * limitResults; 
        searchTours = searchTours.limit(limitResults).skip(skip) //mongoose method "limit"

        if (req.query.page){
            const totalTours = await Tour.countDocuments();
            if (skip >= totalTours){
                throw new Error("This page does not exist")
            }
        }

        // Execute conection and Query to filter / sort list / limit 
        const getTours = await searchTours;

        res.status(200).json({
            status: 'success',
            results: getTours.length,
            data: { tours: getTours }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getTour = async (req, res) => {
    try {
        const getToutById = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: { tour: getToutById }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: 'success',
            data: { tour: newTour }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true
        })
        // para actualizar se deben pasar 4 parametros (elemento a editar, contenido (body), new (para que actualice ultima version) y validations )
        res.status(200).json({
            status: 'success',
            data: { tour: updateTour }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}
