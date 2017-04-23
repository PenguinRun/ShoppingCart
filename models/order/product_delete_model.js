var db = require('../connection_db');

//在刪除訂單產品資料時，可以進行單筆或多筆刪除

module.exports = class OrderProductDelete {
  ordeDelete(combinationID, customerID) {
    var result = {};
    var cID = customerID;
    return new Promise((resolve, reject) => {
      //多筆刪除
      if (typeof combinationID === "object") {
        for (var i in combinationID) {
          // console.log('the combinationID :' + combinationID[i]);
          var ids = combinationID[i].split(',');
          // console.log('the id :' + ids);
          var orderIDs = parseInt(ids[0]);
          var productIDs = parseInt(ids[1]);
          // console.log('orderIDs: ' + orderIDs);
          // console.log('productIDs: ' + productIDs);

          db.query('DELETE FROM orderList WHERE OrderID = ? and CustomerID = ? and ProductID = ? and IsComplete = 0', [orderIDs, cID, productIDs], function(err, rows) {
            if (err) {
              console.log(err);
              result.err = "伺服器錯誤，請稍後在試！"
              reject(result);
              return;
            }
            result.state = "delete the order product is successful!";
            result.ID = combinationID;
            resolve(result);
          });
        }
        //單筆刪除
      } else if (typeof combinationID === "string") {
        var id = combinationID.split(',');
        var orderID = parseInt(id[0]);
        var productID = parseInt(id[1]);
        // console.log('orderID: ' + orderID);
        // console.log('productID: ' + productID);
        db.query('DELETE FROM orderList WHERE OrderID = ? and CustomerID = ? and ProductID = ? and IsComplete = 0', [orderID, cID, productID], function(err, rows) {
          if (err) {
            console.log(err);
            result.err = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }
          // console.log("affectedRows:" + rows.affectedRows);
          if (rows.affectedRows === 0) {
            result.err = "沒有該筆資料！"
            reject(result);
            return;
          }
          result.state = "delete the order product is successful!";
          result.ID = combinationID;
          resolve(result);
        });
      }

    })
  }
}
