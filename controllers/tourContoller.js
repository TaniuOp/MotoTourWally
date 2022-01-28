// MODULES 


// CONTROLLERS (controller functions) 
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { tours : 'Get all tours'}
    })
}

exports.getTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { tour : 'Get tour info by ID'}
    })
}

exports.createTour = (req, res) => {
    res.status(201).json({
        status: 'success',
        data: { tour : 'Tour ceated'}
    })
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { tour : 'Tour updated'}
    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}
