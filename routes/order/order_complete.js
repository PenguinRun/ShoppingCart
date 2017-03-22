var express = require('express');
var router = express.Router();
var OrderComplete = require('../../controllers/order/complete_controller');

var orderComplete = new OrderComplete();

router.get('/', orderComplete.getOrderComplete);
router.put('/', orderComplete.putOrderComplete);

module.exports = router;
