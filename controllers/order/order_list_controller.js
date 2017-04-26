var OrderListModel = require('../../models/order/list_model');
var OrderDataModel = require('../../models/order/data_model');
var ProductListModel = require('../../models/product/product_list_model');
var OrderCompleteModel = require('../../models/order/complete_model');
var MonthList = require('../../models/order/month_list_model')
var CheckOrder = require('../../service/order_check');
var Verification = require('../../models/customer/verify');

module.exports = class OrderList {
  //給予所有訂單的資料
  getOrderList(req, res, next) {
      var orderListModel = new OrderListModel();

      orderListModel.getOrderListData().then(
        function(rows) {
          res.json({
            result: rows
          })
          return;
        }
      ).catch(function(err) {
        res.json({
          result: err
        })
      })
    }
    //取得單一顧客的訂單資料
  getCustomerOrderData(req, res, next) {
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
            var orderProdcut = new OrderDataModel();
            var ID = tokenResult;
            orderProdcut.orderData(ID).then(
              function(rows) {
                res.json({
                  result: rows,
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
    //取得單一顧客未完成付款的訂單資料
  getOrderCompleteData(req, res, next) {
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
            var orderComplete = new OrderCompleteModel();
            var ID = tokenResult;
            orderComplete.completeData(ID).then(
              function(rows) {
                res.json({
                  result: rows,
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
    //取得全部產品資料
  getProductData(req, res, next) {
      var productListModel = new ProductListModel();
      productListModel.getProductListData().then(
        function(rows) {
          res.json({
            result: rows
          })
        }
      ).catch(function(err) {
        res.json({
          result: err
        })
      })
    }
    //取得月報表
  getMonthList(req, res, next) {
    var monthList = new MonthList();
    var year = req.query.year;
    var month = req.query.month;
    var checkOrder = new CheckOrder();
    if (checkOrder.checkNull(year) === true || isNaN(checkOrder.checkTypeInt(year))) {
      res.json({
        err: "請在query中輸入正確的year！如：year=2017"
      })
      return;
    }
    var checkOrder = new CheckOrder();
    if (checkOrder.checkNull(month) === true || isNaN(checkOrder.checkTypeInt(month))) {
      res.json({
        err: "請在query中輸入正確的month！如：month=4"
      })
      return;
    }
    monthList.excelBuilder(year, month).then(
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
      return;
    })
  }
}
