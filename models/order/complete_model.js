var db = require('../connection_db');
var nodemailer = require('nodemailer');
var config = require('../../config/development');

module.exports = class OrderCompleteModel {
  //取得訂單資料
  orderProcutData(orderID) {
      return new Promise((resolve, rejsct) => {
        db.query('SELECT * FROM orderList WHERE OrderID = ?', orderID, function(err, rows) {
          if (err) {
            reject(err);
          }
          resolve(rows);
        })
      })
  }
  //完成訂單時，鎖定訂單後寄送email
  orderCompleteData(orderID) {
    var result = "";
    var changeIsComplete = {
      IsComplete: 1 //change IsComplete status
    }

    //mail 宣告
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.senderMail.user, //gmail account
        pass: config.senderMail.pass //gmail password
      }
    });

    return new Promise((resolve, reject) => {

      db.query('SELECT * FROM orderList WHERE OrderID = ?', orderID, function(err, rows) {
        if (err) {
          return console.log(err);
        }
        var ProductID = rows[0].ProductID;
        var OrderQuantity = rows[0].OrderQuantity;
        var Email = rows[0].OrderEmail;
        //若訂單還未完成
        if (rows[0].IsComplete === 0) {

          //判斷是否有庫存
          db.query('SELECT * FROM product WHERE ID = ?', ProductID, function(err, rows) {
            if (rows[0].Quantity < OrderQuantity) {
              //return result
              if (err) {
                reject(err);
              }
              result = "不好意思，" + rows[0].Name + "的庫存不足！";
              resolve(result);

            } else {
              //若有庫存將進行該項產品庫存刪減
              db.query(' UPDATE product, orderList SET product.Quantity = product.Quantity - orderList.OrderQuantity WHERE orderList.ProductID = product.ID and orderList.OrderID = ?;', orderID, function(err, rows) {
                if (err) {
                  console.log(err);
                }
              });

              db.query('UPDATE orderList SET ? WHERE OrderID = ?', [changeIsComplete, orderID], function(err, rows) {
                if (err) {
                  return console.log(err);
                }
              })

              var mailOptions = {
                from: '"Jusin Testin" <1234@gmail.com@mgail.com>',
                to: Email, //recived
                subject: 'hihi',
                text: 'Hello, somebody there?',
                html: '<p>hihi</p>'
              }

              //send mail
              transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    return console.log(err);
                  }
                  console.log('Message %s sent: %s', info.messageID, info.response);
                })
                //return result
              if (err) {
                reject(err);
              }

              result = "訂單編號：" + orderID + " 付款已完成，謝謝您使用該服務！詳細的訂單資訊已寄送至" + Email;

              resolve(result);

            }
          })

          //若訂單已經完成
        }
        else if (rows[0].IsComplete === 1) {
          //return result
          if (err) {
            reject(err);
          }

          result = "sorry, 該筆訂單已經付款完成了！";
          resolve(result);

        }

      })
    })
  }
}
