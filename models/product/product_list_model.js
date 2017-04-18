var db = require('../connection_db');

//取得全部商品資料

module.exports = class ProductListData{
  getProductListData(){
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product', function(err, rows) {
          if (err) {
              console.log(err);
          }
          resolve(rows)
      })
    })
  }
}
