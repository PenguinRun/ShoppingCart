var db = require('../connection_db');
var formidable = require('formidable');

module.exports = class OrderProductListModel {
  //訂購整筆商品
  orderProductListData(orderList) {
    var result = {};
    var today = new Date();

    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM orderList', function(err, rows) {
        if (err) {
          console.log(err);
          result.err = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        var maxValue = 0;
        for (var key in rows) {
          var value = [];
          value = rows[key].OrderID;
          if (value > maxValue) {
            maxValue = value;
          }
        }
        // console.log("the MAX:" + maxValue);
        var OrderID = maxValue + 1;

        var products = orderList.ProductID;
        var productArray = products.split(',');
        // console.log("productArray: " + productArray);
        var quantitys = orderList.Quantity;
        var quantityArray = quantitys.split(',');
        // console.log("quantityArray: " + quantityArray);

        //productID與quantity合併成新object
        //array1 [3, 2, 1]
        //array2 [1, 2, 3]
        //merge為object:{
        //  3: 1,
        //  2: 2,
        //  1, 3
        //}

        var productQuantity = {};
        for (var i in productArray) {
          // console.log('productArray i: ' + productArray[i]);
          var index = productArray.indexOf(productArray[i]);
          // console.log('the index: ' + index);
          for (var j in quantityArray) {
            // console.log('quantityArray j: ' + quantityArray[j]);
            productQuantity[productArray[i]] = quantityArray[index];
            // console.log('new quantityArray j: ' + quantityArray[index]);
          }
        }

        for (var key in productQuantity) {
          var orderData = {
            OrderID: OrderID,
            CustomerID: orderList.CustomerID,
            ProductID: parseInt(key),
            OrderQuantity: parseInt(productQuantity[key]),
            OrderDate: orderList.OrderDate,
            IsComplete: 0
          };
          // console.log(JSON.stringify({
          //   orderData
          // }));
          //insert order data.
          db.query('INSERT INTO orderList SET ?', orderData, function(err, rows) {
            if (err) {
              console.log(err);
              result.err = "伺服器錯誤，請稍後在試！"
              reject(result);
              return;
            }
            })
            // 計算出OrderPrice後在將值輸入至該orderList
            // example: update orderList SET OrderPrice = OrderQuantity * (select Price from product  where orderList.ProductID = Product.ID) where OrderID = 3 and CustomerID = 119 and ProductID = 4;
          db.query('UPDATE orderList SET OrderEmail = (SELECT Email from customer where ID = ? )', [orderList.CustomerID], function(err, rows){
            if (err) {
              console.log(err);
              result.err = "伺服器錯誤，請稍後在試！"
              reject(result);
              return;
            }
          })

          db.query('UPDATE orderList SET OrderPrice = OrderQuantity * (select Price from product where ? = product.ID) WHERE OrderID = ? and CustomerID = ? and ProductID = ?', [key, orderData.OrderID, orderData.CustomerID, key], function(err, rows) {
            if (err) {
              console.log(err);
              result.err = "伺服器錯誤，請稍後在試！"
              reject(result);
              return;
            }
          })
        }

        result.state = "order successful!";
        result.orderData = orderData
        resolve(result);
      })
    })
  }
}


//*************判斷庫存不足
//判斷庫存是否足夠
//**********************
// db.query('SELECT * FROM Product WHERE ID = ?', key, function(err, rows){
//   console.log("the DB Quantity: " + rows[0].Quantity);
//   console.log(JSON.stringify({orderData}));
//
//   console.log("###############");
//   if (rows[0].Quantity < productQuantity[key]){
//
//     console.log('orderID: ' + OrderID);
//     console.log('CustomerID: ' + orderData.CustomerID);
//     console.log('ProductID: ' + key);
//
//     // db.query('DELETE FROM orderList WHERE OrderID = ?', orderID, function(err, rows) {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     // });
//
//     res.json({
//       result: "不好意思，" + rows[0].Name + "的庫存不足！"
//     })
//     // return;
//   }
//
// })
//**********************
