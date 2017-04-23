//解決
var OrderDataModel = require('../../models/order/data_model');
var OrderProductListModel = require('../../models/order/product_list_model');
var OrderProductModel = require('../../models/order/product_model');
var OrderUpdateModel = require('../../models/order/update_model');
var OrderProductDelete = require('../../models/order/product_delete_model');
var OrderCompleteModel = require('../../models/order/complete_model');
var Verification = require('../../models/customer/verify');
var CheckOrder = require('../../service/order_check');

var encryption = require('../../models/customer/encryption');
var fs = require('fs');
var crypto = require('crypto');
var formidable = require('formidable');
//修改訂單

module.exports = class OrderModify {
  //新增整筆訂單
  postOrderProductList(req, res, next) {
      //登入判斷
      var token = req.headers['x-access-token'];
      //確定token是否有輸入
      var checkOrder = new CheckOrder();
      if (checkOrder.checkNull(token) === true) {
        res.json({
          err: "請輸入token！"
        })
      }
      //認證token
      var verification = new Verification();
      verification.accountVerify(token).then(
        (tokenResult) => {
          if (tokenResult === false) {
            res.json({
              err: "token錯誤！"
            })
            return;
          } else {
            var orderProductList = new OrderProductListModel();
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
              var ID = tokenResult;
              var orderList = {
                  CustomerID: ID,
                  ProductID: fields.ProductID,
                  Quantity: fields.Quantity,
                  OrderDate: getCurrentDateTime(),
                }
                //判斷哪個參數沒輸入值
              for (var key in orderList) {
                if (orderList[key] === null || orderList[key] == "" || typeof orderList[key] === "undefined") {
                  res.json({
                    result: "please enter the [" + key + "] value" //印出沒填的參數
                  })
                  return;
                }
              }
              orderProductList.orderProductListData(orderList).then(
                function(result) {
                  res.json({
                    result: result
                  })
                  return;
                }
              ).catch(function(err) {
                res.json({
                  result: err
                })
              })
            })
          }
        }
      )
    }
    //新增單筆訂單
    //嘗試將輸入欄位做成另一個function
  postOrderProduct(req, res, next) {
      //登入判斷
      var token = req.headers['x-access-token'];
      //確定token是否有輸入
      var checkOrder = new CheckOrder();
      if (checkOrder.checkNull(token) === true) {
        res.json({
          err: "請輸入token！"
        })
        return;
      }
      //認證token
      var verification = new Verification();
      verification.accountVerify(token).then(
        (tokenResult) => {
          if (tokenResult === false) {
            res.json({
              err: "token錯誤！"
            })
            return;
          } else {
            var orderProduct = new OrderProductModel();
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
              var ID = tokenResult;
              var isComplete = "0";
              var orderList = {
                OrderID: fields.OrderID,
                CustomerID: ID,
                ProductID: fields.ProductID,
                OrderQuantity: fields.OrderQuantity,
                isComplete: isComplete
              };
              // console.log(orderList);
              //判斷哪個參數沒輸入值
              for (var key in orderList) {
                if (orderList[key] === null || orderList[key] == "" || typeof orderList[key] === "undefined") {
                  res.json({
                    result: "please enter the [" + key + "] value" //印出沒填的參數
                  })
                  return;
                }
              }
              orderProduct.orderProductData(orderList).then(
                function(result) {
                  res.json({
                    result: result,
                    orderList: orderList
                  })
                }
              ).catch(function(err) {
                res.json({
                  result: err
                })
              })
            })
          }
        }
      )
    }
    //更新訂單
  putOrderData(req, res, next) {
      //登入判斷
      var token = req.headers['x-access-token'];
      //確定token是否有輸入
      var checkOrder = new CheckOrder();
      if (checkOrder.checkNull(token) === true) {
        res.json({
          err: "請輸入token！"
        })
        return;
      }
      //認證token
      var verification = new Verification();
      verification.accountVerify(token).then(
        (tokenResult) => {
          if (tokenResult === false) {
            res.json({
              err: "token錯誤！"
            })
            return;
          } else {
            var updateData = new OrderUpdateModel();
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
              var ID = tokenResult;
              var orderList = {
                OrderID: fields.OrderID,
                CustomerID: ID,
                ProductID: fields.ProductID,
                OrderQuantity: fields.Quantity,
                UpdateDate: getCurrentDateTime(),
              }
              //判斷哪個參數沒輸入值
              for (var key in orderList) {
                if (orderList[key] === null || orderList[key] == "" || typeof orderList[key] === "undefined") {
                  res.json({
                    result: "please enter the [" + key + "] value" //印出沒填的參數
                  })
                  return;
                }
              }
              updateData.orderUpdate(orderList).then(
                function(result) {
                  res.json({
                    result: result
                  })
                }
              ).catch(function(err) {
                res.json({
                  result: err
                })
              })
            })
          }
        }
      )
    }
    //訂單付款完成
  putOrderComplete(req, res, next) {
      //登入判斷
      var token = req.headers['x-access-token'];
      //確定token是否有輸入
      var checkOrder = new CheckOrder();
      if (checkOrder.checkNull(token) === true) {
        res.json({
          err: "請輸入token！"
        })
        return;
      }
      //認證token
      var verification = new Verification();
      verification.accountVerify(token).then(
        (tokenResult) => {
          if (tokenResult === false) {
            res.json({
              err: "token錯誤！"
            })
            return;
          } else {
            var orderComplete = new OrderCompleteModel();
            var ID = tokenResult;
            orderComplete.orderCompleteData(ID).then(
              function(result) {
                res.json({
                  result: result,
                })
              }
            ).catch(function(err) {
              res.json({
                result: err
              })
            })
          }
        }
      )
    }
    //刪除訂單
  deleteOrderData(req, res, next) {
    //登入判斷
    var token = req.headers['x-access-token'];
    //確定token是否有輸入
    var checkOrder = new CheckOrder();
    if (checkOrder.checkNull(token) === true) {
      res.json({
        err: "請輸入token！"
      })
      return;
    }
    //認證token
    var verification = new Verification();
    verification.accountVerify(token).then(
      (tokenResult) => {
        if (tokenResult === false) {
          res.json({
            err: "token錯誤！"
          })
          return;
        } else {
          var combinationID = req.body.CombinationID;
          var customerID = tokenResult;
          // console.log("token: "+ customerID);
          //因有多筆刪除可能用迴圈判斷
          for (var key in combinationID){
            if (checkOrder.checkNull(combinationID[key]) === true) {
              res.json({
                err: "請輸入CombinationID！"
              })
              return;
            }
          }
          var deleteData = new OrderProductDelete();
          deleteData.ordeDelete(combinationID, customerID).then(
            function(result) {
              res.json({
                result: result
              })
            }
          ).catch(function(err) {
            res.json({
              result: err
            })
          })
        }
      }
    )
  }
}


function getCurrentDateTime() {
  var today = new Date();
  var currentDateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return currentDateTime;
}
