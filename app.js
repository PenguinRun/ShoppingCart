var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//customer
var customerList = require('./routes/customer/customer_list');
var customerAdd = require('./routes/customer/customer_add');
var customerDelete = require('./routes/customer/customer_delete');
var customerEdit = require('./routes/customer/customer_edit');
var pagingData = require('./routes/customer/customer_paging');

//order
var orderProductList = require('./routes/order/product_list');
var orderList = require('./routes/order/order_list');
var orderModify = require('./routes/order/order_modify');
var orderComplete = require('./routes/order/order_complete');

console.log("hihi")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//customer
app.use('/customerList', customerList);
app.use('/customerAdd', customerAdd);
app.use('/customerDelete', customerDelete);
app.use('/customerEdit', customerEdit);
app.use('/pagingData', pagingData);

//order
app.use('/orderProductList', orderProductList);
app.use('/orderList', orderList);
app.use('/orderModify', orderModify);
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
