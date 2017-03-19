var OrderProductListModel = require('../../models/order/orderProductListModel');

//新增整筆order資料

module.exports = class OrderProductList {
  getProductData(req, res, next){
    var productData = new OrderProductListModel();
    productData.orderProductData(req).then(
      function(rows){
        res.json({
          result: rows
        })
      }
    )
  }
  postOrderProductList(req, res, next) {
    var orderProductList = new OrderProductListModel();
    orderProductList.orderProductListData(req).then(
      function(result) {
        res.json({
          result: result
        })
      }
    )
  }
}
