var express = require('express');
var router = express.Router();
var OrderModify = require('../../controllers/order/modify_controller');

var orderModify = new OrderModify();

router.get('/', orderModify.getOrderData);
router.post('/', orderModify.postOrderProduct);
router.put('/', orderModify.putOrderData);
router.delete('/', orderModify.deleteOrderData);

module.exports = router;
