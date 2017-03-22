var db = require('../connection_db');

module.exports = class customerDeleteModel {
  customerDelete(customerID) {
    var result = "";
    return new Promise((resolve, reject) => {
      if (typeof customerID === "object") {
        var ids = 'DELETE FROM Customer WHERE ID IN ' + '(' + customerID.join() + ')';
        db.query(ids, function(err, rows) {
          // DELETE FROM Customer WHERE CustomerID IN (134, 135);
          if (err) {
            console.log(err);
          }
          result = "ID: " + customerID + " 已經刪除完成！"
          resolve(result);
        });
      } else if (typeof customerID === "string") {
        db.query('DELETE FROM Customer WHERE ID = ?', customerID, function(err, rows) {
          if (err) {
            console.log(err);
          }
          result = "ID: " + customerID + " 已經刪除完成！"
          resolve(result);
        })
      }
    })
  }
}
