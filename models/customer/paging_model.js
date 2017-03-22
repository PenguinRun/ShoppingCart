var db = require('../connection_db');

module.exports = class Paging_model {
  pagingData(page, pageSize) {
    var result="";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Customer ORDER BY ID ASC LIMIT ?,?', [(page - 1) * pageSize, pageSize], function(err, rows) {
        if (err) {
          console.log(err);
        }
        result = rows;
        resolve(result);
      })
    })
  }
}
