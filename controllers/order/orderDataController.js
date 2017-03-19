var OrderDataModel = require('../../models/order/orderDataModel');

//給予單筆訂單資料

module.exports = class OrderData {
  getOrderData(req, res, next) {
    // var db = req.con;
    // var OrderID = req.query.OrderID;
    // db.query('SELECT * from orderList where OrderID = ?', OrderID, function(err, rows) {
    //   if (err) {
    //     console.log(err);
    //   }
    var orderDataModel = new OrderDataModel();
    orderDataModel.getOrderData(req).then(
      function(rows){
        res.json({
          oerderList: rows
        })
      }
    )

    //   return;
    // })
  }
}
