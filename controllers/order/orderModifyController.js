var OrderDataModel = require('../../models/order/orderDataModel');
var OrderProductModel = require('../../models/order/orderProductModel');
var OrderUpdateModel = require('../../models/order/orderUpdateModel');
var OrderProductDelete = require('../../models/order/orderProductDeleteModel');

//修改訂單

module.exports = class OrderModify {
  //取得該筆訂單資料
  getOrderData(req, res, next) {
    var orderProductData = new OrderDataModel();
    orderProductData.orderData(req).then(
      function(rows){
        res.json({
          result: rows
        })
      }
    )
  }
  //新增訂單
  postOrderProduct(req, res, next) {
      var orderProduct = new OrderProductModel();
      orderProduct.orderProductData(req).then(
        function(result) {
          res.json({
            result: result
          })
        }
      )
  }
  //更新訂單
  putOrderData(req, res, next){
    var updateData = new OrderUpdateModel();
    updateData.orderUpdate(req).then(
      function(result){
        res.json({
          result: result
        })
      }
    )
  }
  //刪除訂單
  deleteOrderData(req, res, next){
    var deleteData = new OrderProductDelete();
    deleteData.ordeDelete(req).then(
      function(result){
        res.json({
          result: result
        })
      }
    )
  }
}
