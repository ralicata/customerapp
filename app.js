var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;

var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
          root    = namespace.shift() ,
          formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// GET /
app.get('/', function(req, res){
  db.users.find(function (err, docs) {
    res.render('index', {
      title: 'Customers',
      users: docs
    });
  });
});

// DELETE /users/delete/:id
app.delete('/users/delete/:id', function(req, res){

  db.users.remove({_id: ObjectId(req.params.id)}, function(err, response){
    console.log("removing " + req.params.id);
    console.log(response);
    if (err) {
      console.log(err);
    }
  });
});

// POST /users/add
app.post('/users/add', function(req, res){

  req.checkBody('first_name', 'First Name is required').notEmpty();
  req.checkBody('last_name', 'Last Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render('index', {
        title: 'Customers',
        user: users,
        errors: errors
    });
  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    };
    db.users.insert(newUser, function(err, result){
      if (err) {
        console.log(err);
      }else {
        res.redirect('/');
      }
    });
  }

});

app.listen(3000, function() {
  console.log('Server started on port 3000...');
});
