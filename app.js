var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var userAdd = require('./routes/userAdd.js')
var uploadimg = require('./routes/uploadimg');
var userEdit = require('./routes/userEdit');
var userEdits = require('./routes/userEdits');
var userDelete = require('./routes/userDelete');
var userPaging = require('./routes/userPaging');

//order
// var orderProduct = require('./routes/order/orderProduct');
var orderProductList = require('./routes/order/orderProductList');
var orderData = require('./routes/order/orderData');
var orderList = require('./routes/order/orderList');
var orderModify = require('./routes/order/orderModify');
// var orderUpdate = require('./routes/order/orderUpdate');
// var orderProductDelete = require('./routes/order/orderProductDelete');
var orderComplete = require('./routes/order/orderComplete');

// DataBase
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "PenguinRun",
    password: "1234",
    database: "ShoppingCart"
});

console.log("hihi")


con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});
var app = express();

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

app.use(function(req, res, next) {
    req.con = con;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/userAdd', userAdd);
app.use('/upload', uploadimg);
// app.use('/userEdit', userEdit);
app.use('/userEdits', userEdits);
app.use('/userDelete', userDelete);
app.use('/userPaging', userPaging);

//order
// app.use('/orderProduct', orderProduct);
app.use('/orderProductList', orderProductList);
app.use('/orderData', orderData);
app.use('/orderList', orderList);
app.use('/orderModify', orderModify);
// app.use('/orderUpdate', orderUpdate);
// app.use('/orderProductDelete', orderProductDelete);
app.use('/orderComplete', orderComplete);

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
