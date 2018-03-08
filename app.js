var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

// Mongodb connection
mongoose.connect('mongodb://localhost:27017/capstone');
var db = mongoose.connection;
// Mongo error
db.on(
  'error',
  console.error.bind(console, 'connection error:')
);

// use sessions for tracking logins
app.use(
  session({
    secret: 'capstone project rocks',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db })
  })
);

// make user ID available in templates
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(
  express.static(__dirname + '/public')
);

// view engine set up
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler, fefine as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function() {
  console.log('Express app is running on port 3000');
});