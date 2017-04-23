var db = require('../connection_db');

module.exports = class ProductDeleteModel {
  productDelete(ID) {
    var result = "";
    return new Promise((resolve, reject) => {
      if (typeof ID === "object") {
        var ids = 'DELETE FROM product WHERE ID IN ' + '(' + ID.join() + ')';
        db.query(ids, function(err, rows) {
          // DELETE FROM product WHERE ID IN (1, 2);
          if (err) {
            console.log(err);
            result = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }
          result = "ID: " + ID + " 已經刪除完成！"
          resolve(result);
        });
      } else if (typeof ID === "string") {
        db.query('DELETE FROM product WHERE ID = ?', ID, function(err, rows) {
          if (err) {
            console.log(err);
            result = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }
          result = "ID: " + ID + " 已經刪除完成！"
          resolve(result);
        })
      }
    })
  }
}
