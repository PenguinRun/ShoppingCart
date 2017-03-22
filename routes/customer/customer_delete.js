var express = require('express');
var router = express.Router();
var CustomerDelete = require('../../controllers/customer/delete_controller');

var customerDelete = new CustomerDelete();

router.delete('/', customerDelete.deleteCustomer);

module.exports = router;
