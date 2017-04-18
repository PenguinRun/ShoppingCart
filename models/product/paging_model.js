var db = require('../connection_db');

module.exports = class Paging_model {
  pagingData(page, pageSize) {
    var result="";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product ORDER BY ID ASC LIMIT ?,?', [(page - 1) * pageSize, pageSize], function(err, rows) {
        if (err) {
          console.log(err);
        }
        if (rows[0] === undefined){
          result = "已經沒有資料了！"
          resolve(result);
        }else{
          result = rows;
          resolve(result);
        }
      })
    })
  }
}
