var db = require('../connection_db');

var formidable = require('formidable');

module.exports = class OrderProductModel {
  orderProductData(orderList) {
    var result = "";

    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM orderList WHERE OrderID = ?', orderList.OrderID, function(err, rows) {
        // console.log("ROWS:" + rows[0].IsComplete);
        if (rows[0].IsComplete === 1) {

          if (err) {
            console.log(err);
            result = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }

          result = "sorry, 該筆訂單已經付款完成了！"
          resolve(result);
        } else if (rows[0].IsComplete === 0) {

          db.query('SELECT * FROM product WHERE ID = ?', orderList.ProductID, function(err, rows) {
            if (rows[0].Quantity < orderList.OrderQuantity) {
              if (err) {
                console.log(err);
                result = "伺服器錯誤，請稍後在試！"
                reject(result);
                return;
              }
              result = "不好意思，" + rows[0].Name + "的庫存不足！"
              resolve(result);
            } else {
              //insert order data.
              db.query('INSERT INTO orderList SET ?', orderList, function(err, rows) {
                if (err) {
                  console.log(err);
                  result = "伺服器錯誤，請稍後在試！"
                  reject(result);
                  return;
                }
              })

              db.query('UPDATE orderList SET OrderEmail = (SELECT Email from customer where ID = ? )', [orderList.CustomerID], function(err, rows) {
                if (err) {
                  console.log(err);
                  result = "伺服器錯誤，請稍後在試！"
                  reject(result);
                  return;
                }
                })
                // 計算出OrderPrice後在將值輸入至該orderList
                // example: update orderList SET OrderPrice = OrderQuantity * (select Price from Product  where orderList.ProductID = Product.ID) where OrderID = 3 and CustomerID = 119 and ProductID = 4;

              db.query('UPDATE orderList SET OrderPrice = OrderQuantity * (select Price from product where ? = product.ID) WHERE OrderID = ? and CustomerID = ? and ProductID = ?', [orderList.ProductID, orderList.OrderID, orderList.CustomerID, orderList.ProductID], function(err, rows) {
                if (err) {
                  console.log(err);
                  result = "伺服器錯誤，請稍後在試！"
                  reject(result);
                  return;
                }
              })
              result = "order successful!"
              resolve(result);
            }
          })

        }
      })
    })

  }
}
