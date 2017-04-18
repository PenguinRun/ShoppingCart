var db = require('../connection_db');

module.exports = class ProductEditModel {
  editData(ID) {
    var result = "";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product WHERE ID = ?', ID, function(err, rows) {
        if (err) {
          console.log(err);
        }
        result = rows;
        resolve(result);
      })
    })
  }
  productEdit(ID, productList) {
    var result = "";
    return new Promise((resolve, reject) => {
      var qur = db.query('UPDATE product SET ? WHERE ID = ?', [productList, ID], function(err, rows) {
        if (err) {
          console.log(err);
        }
        result = productList;
        resolve(result)
      })
    })
  }
}
