var db = require('../connection_db');
var excelbuilder = require('msexcel-builder');

module.exports = class MonthList {
  excelBuilder(year, month) {
    var totalPrice = 0;
    var fileName = year + "年" + month + "月-月報表.xlsx";
    // var year = 2017;
    // var month = 4;
    var startDate = year + "-" + month + "-" + "01";
    var endDate = year + "-" + month + "-" + "31";
    console.log(startDate);
    console.log(endDate);
    var result = "";
    return new Promise(function(resolve, reject) {
      db.query('SELECT product.Name SaleProductName, product.Price SaleProductPrice, SUM(orderList.OrderQuantity) SaleProductQuantity, SUM(orderList.OrderPrice) SaleProductPriceTotal FROM product, orderList WHERE product.ID = orderList.ProductID AND orderList.IsComplete = 1 AND OrderDate>= ? AND OrderDate<= ? GROUP BY product.Name, product.Price', [startDate, endDate], function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        };
        if (rows[0] === undefined) {
          result = "該月份沒有資料！"
          reject(result);
          return;
        } else {
          // Create a new workbook file in current working-path
          var workbook = excelbuilder.createWorkbook('./files', fileName)

          // Create a new worksheet with 10 columns and 12 rows
          var sheet1 = workbook.createSheet('sheet1', 100, 100);

          sheet1.set(2, 2, "某某公司");
          sheet1.merge({
            col: 2,
            row: 2
          }, {
            col: 3,
            row: 2
          });
          sheet1.align(2, 2, 'center');

          sheet1.set(2, 3, year + "年" + month + "月報表");
          sheet1.merge({
            col: 2,
            row: 3
          }, {
            col: 3,
            row: 3
          });
          sheet1.align(2, 3, 'center');

          sheet1.set(1, 5, "商品名稱");
          sheet1.border(1, 5, {
            left: 'medium',
            top: 'medium',
            right: 'thin',
            bottom: 'medium'
          });

          sheet1.set(2, 5, "商品價錢");
          sheet1.border(2, 5, {
            left: 'medium',
            top: 'medium',
            right: 'thin',
            bottom: 'medium'
          });

          sheet1.set(3, 5, "銷量");
          sheet1.border(3, 5, {
            left: 'medium',
            top: 'medium',
            right: 'thin',
            bottom: 'medium'
          });

          sheet1.set(4, 5, "收入金額");
          sheet1.border(4, 5, {
            left: 'medium',
            top: 'medium',
            right: 'thin',
            bottom: 'medium'
          });


          for (var i = 0; i < rows.length; i++) {
            //商品名稱
            sheet1.set(1, 6 + i, rows[i].SaleProductName);
            sheet1.border(1, 6 + i, {
              left: 'medium',
              top: 'medium',
              right: 'thin',
              bottom: 'medium'
            });
            //商品價錢
            sheet1.set(2, 6 + i, parseInt(rows[i].SaleProductPrice));
            sheet1.border(2, 6 + i, {
              left: 'medium',
              top: 'medium',
              right: 'thin',
              bottom: 'medium'
            });
            //商品數量
            sheet1.set(3, 6 + i, parseInt(rows[i].SaleProductQuantity));
            sheet1.border(3, 6 + i, {
              left: 'medium',
              top: 'medium',
              right: 'thin',
              bottom: 'medium'
            });
            //商品總價
            sheet1.set(4, 6 + i, parseInt(rows[i].SaleProductPriceTotal));
            sheet1.border(4, 6 + i, {
              left: 'medium',
              top: 'medium',
              right: 'thin',
              bottom: 'medium'
            });
            //月總收入計算
            totalPrice = totalPrice + rows[i].SaleProductPriceTotal;
          }

          //月總收入
          var xRows = rows.length;
          sheet1.set(3, 6 + xRows, "總收入");
          sheet1.set(4, 6 + xRows, totalPrice);


          // Save it
          workbook.save(function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('congratulations, your workbook created');
            }
          });
          result = "The workbook was created!"
          resolve(result);
          return;
        }
      })
    });

  }
}
