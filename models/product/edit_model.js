var db = require('../connection_db');

module.exports = class ProductEditModel {
  editData(ID) {
    var result = "";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product WHERE ID = ?', ID, function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        resolve(rows);
      })
    })
  }
  productEdit(ID, productList) {
    var result = "";
    return new Promise((resolve, reject) => {
      var qur = db.query('UPDATE product SET ? WHERE ID = ?', [productList, ID], function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        result = productList;
        resolve(result)
      })
    })
  }
}
