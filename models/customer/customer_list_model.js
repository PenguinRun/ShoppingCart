var db = require('../connection_db');

//取得全部顧客資料

module.exports = class CustomerListData{
  getCustomerListData(){
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM customer', function(err, rows) {
          if (err) {
              console.log(err);
          }
          resolve(rows)
      })
    })
  }
}
