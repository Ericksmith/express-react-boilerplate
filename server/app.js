const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const usersRouter = require('./routes/users');

const app = express();

//=============================================
// Set the identifier to set the file path directory
const filePath = path.resolve(__dirname, 'dist/');

//=============================================
// Standard tools to be used for the webpack
// middleware server
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');
const webpack = require('webpack');
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  filePath: '/',
  contentBase: filePath,
  hot: true
}));

app.use(require('webpack-hot-middleware')(compiler));

//Sets the file path directory to load up scripts and styles from the HTML file.
app.use(express.static(filePath));


app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);



//Send the HTML file on root index GET request
app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./client/views/index.html'));
});

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
