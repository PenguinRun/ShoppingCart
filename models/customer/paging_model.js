var db = require('../connection_db');

module.exports = class Paging_model {
  pagingData(page, pageSize) {
    var result="";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM customer ORDER BY ID ASC LIMIT ?,?', [(page - 1) * pageSize, pageSize], function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        if (rows[0] === undefined){
          result = "已經沒有資料了！"
          reject(result);
        }else{
          resolve(rows);
        }
      })
    })
  }
}
