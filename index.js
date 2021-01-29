//NODE MODULES
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const flash = require('express-flash');
const passport = require('passport');
const sessionStore = new SequelizeStore({ db });

//IMPORTS/VARIABLES
const PORT = process.env.PORT || 8080;

const app = express();

//CORS!
app.use(cors());

// Middleware
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id.id);
    done(null, user);
  } catch (error) {
    done(error);
  }
})

app.use(express.json());
app.use(express.urlencoded(
  {extended: true}
));
app.use(session({
  secret: process.env.sessionSecret || "d3p4k",
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Mount on API
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

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
