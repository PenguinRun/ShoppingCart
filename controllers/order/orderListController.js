var OrderListModel = require('../../models/order/orderListModel');

//給予所有訂單資料

module.exports = class OrderList {
  getOrderList(req, res, next) {
    var orderListModel = new OrderListModel();

    orderListModel.getOrderListData(req).then(
      function(rows){
        res.json({
          oerderList: rows
        })
        return;
      }
    )
  }
}
