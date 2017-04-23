var db = require('../connection_db');

module.exports = class CustomerAddModel {
  customerAdd(customerList) {
    var result = {};
    return new Promise((resolve, reject) => {
      db.query('SELECT Email FROM customer WHERE Email = ?', customerList.Email, function(err, rows) {
        // console.log(rows.length);
        if (err) {
          console.log(err);
          result.err = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        if (rows.length >= 1){
          result.err = "已有重複的Email。";
          reject(result);
        }else{
          db.query('INSERT INTO customer SET ?', customerList, function(err, rows) {
            if (err) {
              console.log(err);
              result.err = "伺服器錯誤，請稍後在試！"
              reject(result);
              return;
            }
            result.addData = customerList;
            resolve(result);
          })
        }
      })
    })
  }
}
