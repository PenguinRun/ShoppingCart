var express = require('express');
var router = express.Router();
var OrderUpdate = require('../../controllers/order/orderUpdateController');

var orderUpdate = new OrderUpdate();

router.put('/', orderUpdate.putOrderUpdate);

module.exports = router;
