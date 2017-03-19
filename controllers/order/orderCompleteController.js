var OrderCompleteModel = require('../../models/order/orderCompleteModel');
var OrderDataModel = require('../../models/order/orderDataModel');


module.exports = class OrderComplete {
  getOrderComplete(req, res ,next) {
    var orderProdcut = new OrderDataModel();
    orderProdcut.orderData(req).then(
      function(rows){
        res.json({
          result: rows,
        })
      }
    )
  }
  putOrderComplete(req, res, next) {
    var orderComplete = new OrderCompleteModel();
    orderComplete.orderCompleteData(req).then(
      function(result){
        res.json({
          result: result,
        })
      }
    )
  }
}
