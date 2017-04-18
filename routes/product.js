var express = require('express');
var router = express.Router();

var ProductList = require('../controllers/product/product_list_controller');
var ModifyProduct = require('../controllers/product/modify_controller');

var productList = new ProductList();
var modifyProduct = new ModifyProduct();

//取得商品資料
router.get('/productList', productList.getProductData);

//新增商品
router.post('/productAdd', modifyProduct.postProductAdd);

//商品修改
router.get('/productEdit', productList.getProductData);
router.put('/productEdit', modifyProduct.putProductEdit);

//商品刪除
router.delete('/productDelete', modifyProduct.deleteProduct);

//商品資料（分頁功能）
router.get('/productPagingData', productList.getPagingData);

module.exports = router;
