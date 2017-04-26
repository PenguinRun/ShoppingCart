var express = require('express');
var router = express.Router();

var OrderList = require('../controllers/order/order_list_controller');
var OrderModify = require('../controllers/order/modify_controller');

var orderList = new OrderList();
var orderModify = new OrderModify();

//取得全部訂單資料
router.get('/orderList', orderList.getOrderList);

//訂購商品
router.get('/orderProductList', orderList.getProductData);
router.post('/orderProductList', orderModify.postOrderProductList);

//修改訂單
router.get('/orderModify', orderList.getCustomerOrderData);
router.post('/orderModify', orderModify.postOrderProduct);
router.put('/orderModify', orderModify.putOrderData);
router.delete('/orderModify', orderModify.deleteOrderData);

//訂單完成
router.get('/orderComplete', orderList.getOrderCompleteData);
router.put('/orderComplete', orderModify.putOrderComplete);

//取得月報表
router.get('/orderMonthList', orderList.getMonthList);

module.exports = router;
