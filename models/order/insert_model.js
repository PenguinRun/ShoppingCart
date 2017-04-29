var mysqlt = require("mysql");

var con = mysqlt.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

con.connect(function(err) {
  if (err) {
    console.log('connecting error');
  } else {
    console.log('connecting success');
  }
});
console.time('insert');

//B作法：使用bulk insert==================================
var orderData = [
  [400001, 142, 6, 1, 100, 'test@gmail.com', getCurrentDateTime(), 0],
];
for (i = 400002; i <= 500000; i++) {
  orderData.push([i, 142, 6, 1, 100, 'test@gmail.com', getCurrentDateTime(), 0])
}
// console.log(orderData);


con.query('INSERT INTO orderList (OrderID, CustomerID, ProductID, OrderQuantity, OrderPrice, OrderEmail, OrderDate, IsComplete) VALUES ?', [orderData], function(err, rows) {
    if (err) {
      console.log(err);
    }
  })
  //=======================================================

console.timeEnd('insert');


function getCurrentDateTime() {
  var today = new Date();
  var currentDateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return currentDateTime;
}

//A作法：將全部資料一同insert=================================
// for (i = 82352; i <= 100000; i++) {
// var orderData = {
//   OrderID: i,
//   CustomerID: 142,
//   ProductID: 6,
//   OrderQuantity: 1,
//   OrderPrice: 100,
//   OrderEmail: 'test@gmail.com',
//   OrderDate: getCurrentDateTime(),
//   IsComplete: 0
// };
//
//
//
// con.query('INSERT INTO orderList SET ?', orderData, function(err, rows) {
//   if (err) {
//     console.log(err);
//   }
// })


// console.log("OrderID: " + i);
// })
// }
//=======================================================
