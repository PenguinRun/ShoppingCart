var express = require('express');
var router = express.Router();
var OrderData = require('../../controllers/order/orderDataController');

var orderData = new OrderData();

router.get('/', orderData.getOrderData);

module.exports = router;
