var express = require('express');
var router = express.Router();
var OrderProductDelete = require('../../controllers/order/orderProductDeleteController');

var orderProductDelete = new OrderProductDelete();

router.delete('/', orderProductDelete.deleteOrderProductDelete);

module.exports = router;
