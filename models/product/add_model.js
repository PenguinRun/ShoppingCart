var db = require('../connection_db');

module.exports = class ProductAddModel {
  productAdd(productList) {
    var result = {};
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO product SET ?', productList, function(err, rows) {
        if (err) {
          return console.log(err);
        }
        result.addData = productList;
        resolve(result);
      })
    })
  }
}
