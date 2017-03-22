var db = require('../connection_db');

module.exports = class CustomerEditModel {
  editData(id) {
    var result = "";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Customer WHERE ID = ?', id, function(err, rows) {
        if (err) {
          console.log(err);
        }
        result = rows;
        resolve(result);
      })
    })
  }
  customerEdit(ID, customerEditData) {
    var result = "";
    return new Promise((resolve, reject) => {
      var qur = db.query('UPDATE Customer SET ? WHERE ID = ?', [customerEditData, ID], function(err, rows) {
        if (err) {
          console.log(err);
        }
        result = customerEditData;
        resolve(result)
      })
    })
  }
}
