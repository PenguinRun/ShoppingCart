var express = require('express');
var router = express.Router();
var CustomerAdd = require('../../controllers/customer/add_controller');

var customerAdd = new CustomerAdd();

router.post('/', customerAdd.postCustomerAdd);

module.exports = router;
