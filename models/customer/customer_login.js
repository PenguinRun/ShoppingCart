var db = require('../connection_db');

//取得customerLogin資訊

module.exports = class CustomerLoginData{
  getCustomerLoginData(customerData){
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM customer WHERE Email = ? and Password = ?',[customerData.Email, customerData.Password], function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
          // console.log("rows: " + JSON.stringify(rows));
          resolve(rows)
      })
    })
  }
}
