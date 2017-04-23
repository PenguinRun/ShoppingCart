var db = require('../connection_db');

module.exports = class CustomerEditModel {
  editData(ID) {
    var result = "";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM customer WHERE ID = ?', ID, function(err, rows) {
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
  customerEdit(ID, customerEditData) {
    var result = "";
    return new Promise((resolve, reject) => {
      var qur = db.query('UPDATE customer SET ? WHERE ID = ?', [customerEditData, ID], function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        result = customerEditData;
        resolve(result)
      })
    })
  }
}
