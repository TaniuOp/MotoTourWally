// MODULES 
const express = require('express')
const app = express()


// ROUTES 
app.get('/', (req, res) => {
    res.status(200).send("Hello from the MotoTour server")
})


module.exports = app 