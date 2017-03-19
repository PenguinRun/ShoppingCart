var OrderProductListModel = require('../../models/order/orderProductListModel');

//新增整筆order資料

module.exports = class OrderProductList {
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
