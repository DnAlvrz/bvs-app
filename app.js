const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const colors = require('colors');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const connectDatabase = require('./config/db')
const customerRouter = require('./routes/customer');
const videoRouter = require('./routes/videos');
const rentalRouter = require('./routes/rentals');
const reportRouter = require('./routes/reports');
require('dotenv').config();

connectDatabase();

app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'super secret',
  cookie: {maxAge: 9000000},
  resave: false,
  saveUninitialized: false
}));

const flash = require('express-flash')
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use('/css', express.static(path.resolve(__dirname, 'public/stylesheets')));
app.use('/js', express.static(path.resolve(__dirname, 'public/javascripts')));
app.use('/img', express.static(path.resolve(__dirname, 'public/images')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/videos', videoRouter);
app.use('/customers', customerRouter);
app.use('/reports', reportRouter);
app.use('/rentals', rentalRouter);


app.use((req, res,next) => {
  res.locals.currentUser = req.user;
  next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
