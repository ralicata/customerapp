var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

/*
var logger = function(req, res, next) {
  console.log('logging...');
  next();
}
app.use(logger);
*/

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

var people = [
  {
    name: 'Roberto',
    age: 42
  },
  {
    name: 'John',
    age: 22
  },
  {
    name: 'Jane',
    age: 19
  }
];

app.get('/', function(req, res){
  res.json(people);
});

app.listen(3000, function() {
  console.log('Server started on port 3000...');
});
