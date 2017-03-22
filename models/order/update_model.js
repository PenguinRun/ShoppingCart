var db = require('../connection_db');

//修改訂單資料(ProductQuantity及OrderEmail)
//試著將isComplete的判斷提取出來


module.exports = class OrderUpdate {
  orderUpdate(orderList) {
    var result= {};

    return new Promise((resolve, reject) => {

        var OrderID = orderList.OrderID;
        var CustomerID = orderList.CustomerID;
        var ProductID = orderList.ProductID;

        //update Quantity in order
        var updateOrderQuantity = {
          OrderQuantity: orderList.OrderQuantity,
        }
        db.query('UPDATE orderList SET OrderQuantity = IF(isComplete = 0, ?, OrderQuantity) WHERE OrderID = ? and CustomerID = ? and ProductID = ?', [updateOrderQuantity.OrderQuantity, OrderID, CustomerID, ProductID], function(err, rows) {
          if (err) {
            return console.log(err);
          }
        })

        //update Email for some OrderID in order
        var updateOrderEmail = {
          OrderEmail: orderList.OrderEmail
        }

        db.query('UPDATE orderList SET OrderEmail = IF(isComplete = 0, ?, OrderEmail) WHERE OrderID = ?', [updateOrderEmail.OrderEmail, OrderID, CustomerID, ProductID], function(err, rows) {
          if (err) {
            return console.log(err);
          }
        })

        //insert the updateTime in order
        var updateTime = {
          UpdateDate: orderList.OrderDate
        }

        db.query('UPDATE orderList SET UpdateDate = IF(isComplete = 0, ?, UpdateDate) WHERE OrderID = ?', [updateTime.UpdateDate, OrderID, CustomerID, ProductID], function(err, rows) {
          if (err) {
            return console.log(err);
          }
        })

        //reCompute OrderPrice
        db.query('UPDATE orderList SET OrderPrice = OrderQuantity * (select Price from Product where ? = Product.ID) WHERE OrderID = ? and CustomerID = ? and ProductID = ?', [ProductID, OrderID, CustomerID, ProductID], function(err, rows) {
          if (err) {
            console.log(err);
          }
        })



        //return the result of update
        var updateOrderList = {
          quantity: updateOrderQuantity.OrderQuantity,
          email: updateOrderEmail.OrderEmail
        }
        result.state = "update successful";
        result.updateOrderList = updateOrderList;
        resolve(result);
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
//   }else if (rows[key].OrderID === orderList.list && rows[key].isComplete === 1) {
//     console.log("the complete: " + rows[key].isComplete);
//     res.json({
//       result: "不好意思，訂單編號：" + orderList.OrderID + " 的訂單已結清，請嘗試另外個編號。"
//     })
//     return;
//   }
// }
