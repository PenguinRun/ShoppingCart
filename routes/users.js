var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


// select Product.ID ProductID, Customer.CustomerID CustomerID, orderList.OrderID OrderID From Product, Customer, orderList where Product.ID = orderList.ProductID and Customer.CustomerID = orderList.CustomerID;
