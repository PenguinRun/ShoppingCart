var express = require('express');
var router = express.Router();
var OrderProductList = require('../../controllers/order/orderProductListController');

var orderProductList = new OrderProductList();

router.post('/', orderProductList.postOrderProductList);

module.exports = router;
