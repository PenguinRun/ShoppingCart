module.exports = class OrderListModel {
  getOrderListData(req){
    var db = req.con;
    return new Promise((resolve, reject) => {
      db.query('SELECT * from orderList', function(err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }
}
