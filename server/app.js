var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var callback = require('./routes/callback');
var postLinkedin= require('./routes/linkedinPost');
var postLinkedinWithArticle= require('./routes/linkedinPostWithArticle')
var postLinkedinWithImage= require('./routes/linkedinPostWithImage')
var app = express();
var session = require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
}));
// app.use('/', index);
app.use(express.static(path.join(__dirname, '../client/build')));


app.use('/callback', callback);
app.use('/post/linkedin',postLinkedin);
app.use('/post/linkedin/article',postLinkedinWithArticle);
app.use('/post/linkedin/image',postLinkedinWithImage);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
