var express = require('express');
var router = express.Router();

var OrderList = require('../controllers/order/order_list_controller');
var OrderProductList = require('../controllers/order/product_list_controller');
var OrderModify = require('../controllers/order/modify_controller');
var OrderComplete = require('../controllers/order/complete_controller');

var orderList = new OrderList();
var orderProductList = new OrderProductList();
var orderModify = new OrderModify();
var orderComplete = new OrderComplete();

//取得全部訂單資料
router.get('/orderList', orderList.getOrderList);

//訂購商品
router.get('/orderProductList', orderProductList.getProductData);
router.post('/orderProductList', orderProductList.postOrderProductList);

//修改訂單
router.get('/orderModify', orderModify.getOrderData);
router.post('/orderModify', orderModify.postOrderProduct);
router.put('/orderModify', orderModify.putOrderData);
router.delete('/orderModify', orderModify.deleteOrderData);

//訂單完成
router.get('/orderComplete', orderComplete.getOrderComplete);
router.put('/orderComplete', orderComplete.putOrderComplete);


module.exports = router;
