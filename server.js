var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var session = require('express-session');
var passport = require('passport');
const bodyParser = require('body-parser')

require('dotenv').config()
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/api/index');
var snippetRouter = require('./routes/api/snippets');
var editRouter = require('./routes/api/edit')
var searchRouter = require('./routes/api/search')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'code',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use('/', indexRouter);
app.use('/snippets', snippetRouter);
app.use('/edit', editRouter);
app.use('/search', searchRouter)
app.use(bodyParser.json())
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = process.env.PORT || 3001;
module.exports = app;