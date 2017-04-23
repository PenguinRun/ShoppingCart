var db = require('../connection_db');

//修改訂單資料(ProductQuantity及OrderEmail)
//試著將isComplete的判斷提取出來


module.exports = class OrderUpdate {
  orderUpdate(orderList) {
    var result = {};

    return new Promise((resolve, reject) => {
      var OrderID = orderList.OrderID;
      var CustomerID = orderList.CustomerID;
      var ProductID = orderList.ProductID;

      db.query('SELECT * from orderList WHERE OrderID = ? and CustomerID = ? and ProductID =?', [OrderID, CustomerID, ProductID], function(err, rows) {

        if (rows[0] === undefined) {
          result.err = "沒有該筆資料！"
          reject(result);
          return;
        }
        //update Quantity in order
        var updateOrderQuantity = {
          OrderQuantity: orderList.OrderQuantity,
        }
        db.query('UPDATE orderList SET OrderQuantity = IF(IsComplete = 0, ?, OrderQuantity) WHERE OrderID = ? and CustomerID = ? and ProductID = ?', [updateOrderQuantity.OrderQuantity, OrderID, CustomerID, ProductID], function(err, rows) {
          if (err) {
            console.log(err);
            result.err = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }
        })

        db.query('UPDATE orderList SET OrderEmail = IF(IsComplete = 0, (SELECT Email FROM customer WHERE ID = ?), OrderEmail) WHERE OrderID = ?', [CustomerID, OrderID], function(err, rows) {
          if (err) {
            console.log(err);
            result.err = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }
        })

        //insert the updateTime in order
        var updateTime = {
          UpdateDate: orderList.UpdateDate
        }

        db.query('UPDATE orderList SET UpdateDate = IF(IsComplete = 0, ?, UpdateDate) WHERE OrderID = ?', [updateTime.UpdateDate, OrderID, CustomerID, ProductID], function(err, rows) {
          if (err) {
            console.log(err);
            result.err = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }
        })

        //reCompute OrderPrice
        db.query('UPDATE orderList SET OrderPrice = OrderQuantity * (select Price from product where ? = product.ID) WHERE OrderID = ? and CustomerID = ? and ProductID = ?', [ProductID, OrderID, CustomerID, ProductID], function(err, rows) {
          if (err) {
            console.log(err);
            result.err = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }
        })



        //return the result of update
        var updateOrderList = {
          quantity: updateOrderQuantity.OrderQuantity,
        }
        result.state = "update successful";
        result.updateOrderList = updateOrderList;
        resolve(result);
      })
    })
  }
}





//新增產品選項
// for (var key in rows){
//   if(rows[key].OrderID === orderList.OrderID && rows[key].CustomerID === orderList.CustomerID && rows[key].ProductID === orderList.ProductID){
//     res.json({
//       result: "不好意思，OrderID: " + orderList.OrderID + "及CustomerID: " + orderList.CustomerID + "及ProductID: " + orderList.ProductID + "的組合已經存在。請嘗試另外個Order組合。"
//     })
//     return;
//   }else if (rows[key].OrderID === orderList.list && rows[key].IsComplete === 1) {
//     console.log("the complete: " + rows[key].IsComplete);
//     res.json({
//       result: "不好意思，訂單編號：" + orderList.OrderID + " 的訂單已結清，請嘗試另外個編號。"
//     })
//     return;
//   }
// }
