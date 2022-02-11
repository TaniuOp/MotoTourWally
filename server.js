// MODULES
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const app = require('./app');

// DATABASE CONECTION
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB conection successfull!'));

// SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`MotoTours connected to port ${port}`);
});
