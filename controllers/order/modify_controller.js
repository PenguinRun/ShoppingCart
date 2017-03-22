var OrderDataModel = require('../../models/order/data_model');
var OrderProductModel = require('../../models/order/product_model');
var OrderUpdateModel = require('../../models/order/update_model');
var OrderProductDelete = require('../../models/order/product_delete_model');

var formidable = require('formidable');
//修改訂單

module.exports = class OrderModify {
  //取得該筆訂單資料
  //須新增防止同樣的key組合輸入
  getOrderData(req, res, next) {
      var orderProductData = new OrderDataModel();
      var orderID = req.query.OrderID;
      orderProductData.orderData(orderID).then(
        function(rows) {
          res.json({
            result: rows
          })
        }
      )
    }
    //新增訂單
  postOrderProduct(req, res, next) {
      var orderProduct = new OrderProductModel();
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        var orderList = {
          OrderID: fields.OrderID,
          CustomerID: fields.CustomerID,
          ProductID: fields.ProductID,
          OrderQuantity: fields.Quantity,
          OrderEmail: fields.Email,
          OrderDate: getCurrentDateTime(),
          isComplete: 0
        };
        orderProduct.orderProductData(orderList).then(
          function(result) {
            res.json({
              result: result,
              orderList: orderList
            })
          }
        )
      })
    }
    //更新訂單
  putOrderData(req, res, next) {
      var updateData = new OrderUpdateModel();
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        var orderList = {
          OrderID: fields.OrderID,
          CustomerID: fields.CustomerID,
          ProductID: fields.ProductID,
          OrderQuantity: fields.Quantity,
          OrderEmail: fields.Email,
          OrderDate: getCurrentDateTime(),
        }
        updateData.orderUpdate(orderList).then(
          function(result) {
            res.json({
              result: result
            })
          }
        )
      })
    }
    //刪除訂單
  deleteOrderData(req, res, next) {
    var combinationID = req.body.CombinationID;
    var deleteData = new OrderProductDelete();
    deleteData.ordeDelete(combinationID).then(
      function(result) {
        res.json({
          result: result
        })
      }
    )
  }
}


function getCurrentDateTime(){
  var today = new Date();
  var currentDateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return currentDateTime;
}
