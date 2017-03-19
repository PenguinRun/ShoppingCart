var express = require('express');
var router = express.Router();
var OrderList = require('../../controllers/order/orderListController');

var orderList = new OrderList();

router.get('/', orderList.getOrderList);

module.exports = router;
