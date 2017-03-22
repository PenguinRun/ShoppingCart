var express = require('express');
var router = express.Router();
var CustomerList = require('../../controllers/customer/customer_list_controller');

var customerList = new CustomerList();

router.get('/', customerList.getCustomerData);

module.exports = router;
