var OrderCompleteModel = require('../../models/order/complete_model');
var OrderDataModel = require('../../models/order/data_model');


module.exports = class OrderComplete {
  getOrderComplete(req, res ,next) {
    var orderProdcut = new OrderDataModel();
    var orderID = req.query.OrderID;
    orderProdcut.orderData(orderID).then(
      function(rows){
        res.json({
          result: rows,
        })
      }
    )
  }
  putOrderComplete(req, res, next) {
    var orderComplete = new OrderCompleteModel();
    var orderID = req.body.OrderID;
    orderComplete.orderCompleteData(orderID).then(
      function(result){
        res.json({
          result: result,
        })
      }
    )
  }
}
