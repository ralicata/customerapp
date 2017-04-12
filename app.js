var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

/*
var logger = function(req, res, next) {
  console.log('logging...');
  next();
}
app.use(logger);
*/

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'jdoe@gmail.com'
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jsmith@gmail.com'
  },
  {
    first_name: 'Rob',
    last_name: 'Rock',
    email: 'rrock@gmail.com'
  },
];

app.get('/', function(req, res){
  res.render('index', {
    title: 'Customers',
    users: users
  });
});

app.post('/users/add', function(req, res){
  var newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  console.log(newUser);
});

app.listen(3000, function() {
  console.log('Server started on port 3000...');
});
