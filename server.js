// MODULES 
const mongoose = require('mongoose')
const app = require('./app')

const dotenv = require('dotenv')
dotenv.config({ path: './.env' });


// SERVER 
const port = process.env.PORT || 5000 
app.listen(port,()=> {
    console.log(`Server connected to port ${port}`);
})