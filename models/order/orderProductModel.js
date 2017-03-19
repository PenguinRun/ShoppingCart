var formidable = require('formidable');

module.exports = class OrderProductModel {
  orderProductData(req) {
    var db = req.con;
    var form = new formidable.IncomingForm();
    var today = new Date();
    var currentDateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var result = "";

    return new Promise((resolve, reject) => {

      form.parse(req, function(err, fields, files) {
        var orderList = {
          OrderID: fields.OrderID,
          CustomerID: fields.CustomerID,
          ProductID: fields.ProductID,
          OrderQuantity: fields.Quantity,
          OrderEmail: fields.Email,
          Order_Date: currentDateTime,
          isComplete: 0
        };

        db.query('SELECT * FROM orderList WHERE OrderID = ?', orderList.OrderID, function(err, rows) {

          if (rows[0].isComplete === 1) {

            if (err) {
              reject(err);
            }

            result = "sorry, 該筆訂單已經完成了！"
            resolve(result);
          } else if (rows[0].isComplete === 0) {

            db.query('SELECT * FROM Product WHERE ID = ?', orderList.ProductID, function(err, rows) {
              if (rows[0].Quantity < orderList.OrderQuantity) {

                if (err) {
                  reject(err);
                }

                result = "不好意思，" + rows[0].Name + "的庫存不足！"
                resolve(result);
              } else {
                //insert order data.
                db.query('INSERT INTO orderList SET ?', orderList, function(err, rows) {
                    if (err) {
                      return console.log(err);
                    }
                  })
                  // 計算出OrderPrice後在將值輸入至該orderList
                  // example: update orderList SET OrderPrice = OrderQuantity * (select Price from Product  where orderList.ProductID = Product.ID) where OrderID = 3 and CustomerID = 119 and ProductID = 4;

                db.query('UPDATE orderList SET OrderPrice = OrderQuantity * (select Price from Product where ? = Product.ID) WHERE OrderID = ? and CustomerID = ? and ProductID = ?', [orderList.ProductID, orderList.OrderID, orderList.CustomerID, orderList.ProductID], function(err, rows) {
                  if (err) {
                    console.log(err);
                  }
                })

                if (err) {
                  reject(err);
                }

                result = "order successful!"
                resolve(result);
              }
            })

          }
        })

      })
    })

  }
}
