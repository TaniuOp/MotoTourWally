// MODULES 
const Tour = require('../models/tourModel')

// CONTROLLERS (controller functions) 
exports.getAllTours = async (req, res) => {
    try {
        const getTours = await Tour.find();
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
