var express = require('express');
var router = express.Router();
var OrderProductList = require('../../controllers/order/product_list_controller');

var orderProductList = new OrderProductList();

router.get('/', orderProductList.getProductData);
router.post('/', orderProductList.postOrderProductList);

module.exports = router;
