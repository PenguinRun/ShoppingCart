var CustomerListData = require('../../models/customer/customer_list_model');
var CustomerEditModel = require('../../models/customer/edit_model');
var PagingModel = require('../../models/customer/paging_model');
var CheckCustomer = require('../../service/customer_check');
var Verification = require('../../models/customer/verify');


//備份資料庫
// mysqldump -u PenguinRun -p"1234" ShoppingCart > dept.sql

//新增權限
// INSERT INTO user(host, user, password VALUES('%', 'username', password('PWD'));
// GRANT ALL ON *.* TO 'username'@localhost IDENTIFIED BY 'PWD' WITH GRANT OPTION;
// FLUSH PRIVILEGES;

module.exports = class CustomerList{
  //取得全部顧客資料
  getCustomerListData(req, res ,next){
    var customerListData = new CustomerListData();
    customerListData.getCustomerListData().then(
      function(rows){
        res.json({
          result: rows
        })
      }
    ).catch(function(err) {
      res.json({
        result: err
      })
    })
  }
  //取得欲修改顧客ID資料
  getCustomerData(req, res, next) {
      //登入判斷
      var token = req.headers['x-access-token'];
      //確定token是否有輸入
      var checkCustomer = new CheckCustomer();
      if (checkCustomer.checkNull(token) === true) {
        res.json({
          err: "請輸入token！"
        })
      }
      //認證token
      var verification = new Verification();
      verification.accountVerify(token).then(
          (tokenResult) => {
            if (tokenResult === false) {
              res.json({
                err: "token錯誤！"
              })
            } else {
              //取值
              var customerEditModel = new CustomerEditModel();
              customerEditModel.editData(tokenResult).then(
                (rows) => {
                  res.json({
                    result: rows
                  })
                }
              ).catch(function(err) {
                res.json({
                  result: err
                })
              })
            }
          }
        )
        //取queryID的作法
        // var id = req.query.id;
        // var customerEditModel = new CustomerEditModel();
        // customerEditModel.editData(id).then(
        //   function(result) {
        //     res.json({
        //       result: result
        //     })
        //   }
        // )
    }
  //取得分頁資料
  getPagingData(req, res, next){
    var page = req.query.page;
    var pageSize = 3;
    var pagingModel = new PagingModel();
    pagingModel.pagingData(page, pageSize).then(
      function(rows){
        res.json({
          result: rows
        })
      }
    ).catch(function(err) {
      res.json({
        result: err
      })
    })
  }
}
