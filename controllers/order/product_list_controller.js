var OrderProductListModel = require('../../models/order/product_list_model');

var formidable = require('formidable');

//新增整筆order資料
//請嘗試在將整個資料重整後，將getProductData的來源擷取由modes/order轉至models/product裡面

module.exports = class OrderProductList {
  getProductData(req, res, next) {
    var productData = new OrderProductListModel();
    productData.orderProductData().then(
      function(rows) {
        res.json({
          result: rows
        })
      }
    )
  }
  postOrderProductList(req, res, next) {
    var orderProductList = new OrderProductListModel();
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var orderList = {
        CustomerID: fields.CustomerID,
        ProductID: fields.ProductID,
        Quantity: fields.Quantity,
        OrderEmail: fields.Email,
        Order_Date: getCurrentDateTime(),
      }
        orderProductList.orderProductListData(orderList).then(
          function(result) {
            res.json({
              result: result
            })
          }
        )
    })
  }
}

function getCurrentDateTime(){
  var today = new Date();
  var currentDateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return currentDateTime;
}
