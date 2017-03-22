var express = require('express');
var router = express.Router();
var CustomerEdit = require('../../controllers/customer/edit_controller');

var customerEdit = new CustomerEdit();

router.get('/', customerEdit.getCustomerData);
router.put('/', customerEdit.updateCustomerEdit);

module.exports = router;
