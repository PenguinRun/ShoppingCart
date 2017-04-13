var db = require('../connection_db');

//取得customerLogin資訊

module.exports = class CustomerLoginData{
  getCustomerLoginData(customerData){
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM customer WHERE Email = ? and Password = ?',[customerData.Email, customerData.Password], function(err, rows) {
          if (err) {
              console.log(err);
          }
          // console.log("rows: " + JSON.stringify(rows));
          resolve(rows)
      })
    })
  }
}
