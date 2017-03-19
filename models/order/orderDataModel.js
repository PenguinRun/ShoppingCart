module.exports = class OrderDataModel{
  orderData(req){
    return new Promise((resolve, reject) => {
      var db = req.con;
      var OrderID = req.query.OrderID;
      db.query('SELECT * from orderList where OrderID = ?', OrderID, function(err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }
}
