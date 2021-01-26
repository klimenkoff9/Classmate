//NODE MODULES
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

//IMPORTS/VARIABLES
const PORT = process.env.PORT || 8080;
const db = require('./db');

const app = express();

//CORS!
app.use(cors());

//Mount on API
app.use('/api', require('./api'));

//START BACKEND SERVER FUNCTIOON
const serverRun = () => {
  const server = app.listen(PORT, () => {
    console.log(`Live on port : ${PORT}`);
  });
};
//DB Sync Function
//Optional parameters
// {force:true} - drops current tables and places new empty tables
//{alter:true} - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

const syncDb = () => db.sync();
// Connects to //postgres://localhost:5432/dbname

//Run server and sync DB
syncDb();
serverRun();

module.exports = app;
