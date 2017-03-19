//在刪除訂單產品資料時，可以進行單筆或多筆刪除

module.exports = class OrderProductDelete {
  ordeDelete(req, res, next) {
    var db = req.con;
    var combinationID = req.body.CombinationID;
    var result = {};

    return new Promise((resolve, reject) => {

      // console.log(typeof combinationID);
      //多筆刪除
      if (typeof combinationID === "object") {
        for (var i in combinationID) {
          // console.log('the combinationID :' + combinationID[i]);
          var ids = combinationID[i].split(',');
          // console.log('the id :' + ids);
          var orderIDs = parseInt(ids[0]);
          var customerIDs = parseInt(ids[1]);
          var productIDs = parseInt(ids[2]);
          // console.log('orderIDs: ' + orderIDs);
          // console.log('customerIDs: ' + customerIDs);
          // console.log('productIDs: ' + productIDs);

          db.query('DELETE FROM orderList WHERE OrderID = ? and CustomerID = ? and ProductID = ? and isComplete = 0', [orderIDs, customerIDs, productIDs], function(err, rows) {
            if (err) {
              console.log(err);
            }
          });
        }
        //單筆刪除
      } else if (typeof combinationID === "string") {
        var id = combinationID.split(',');
        var orderID = parseInt(id[0]);
        var customerID = parseInt(id[1]);
        var productID = parseInt(id[2]);
        // console.log('orderID: ' + orderID);
        // console.log('customerID: ' + customerID);
        // console.log('productID: ' + productID);
        db.query('DELETE FROM orderList WHERE OrderID = ? and CustomerID = ? and ProductID = ? and isComplete = 0', [orderID, customerID, productID], function(err, rows) {
          if (err) {
            console.log(err);
          }
        });
      }

      result.state = "delete the order product is successful!";
      result.ID = combinationID;

      resolve(result);
    })
  }
}
