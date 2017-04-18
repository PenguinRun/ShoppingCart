var CustomerEditModel = require('../../models/customer/edit_model');
var CheckCustomer = require('../../service/customer_check');
var Verification = require('../../models/customer/verify');
var encryption = require('../../models/customer/encryption');
var formidable = require('formidable');
var fs = require('fs');
var crypto = require('crypto');

module.exports = class CustomerEdit {
  //取得單筆會員資料
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
                (result) => {
                  res.json({
                    result: result
                  })
                }
              )
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
    //修改會員資料
  putCustomerEdit(req, res, next) {
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
          var customerEditModel = new CustomerEditModel();
          var form = new formidable.IncomingForm();
          form.keepExtensions = true; //保留後綴

          // form.uploadDir = __dirname + '/uploads/'; //暫存圖片在uploads
          form.parse(req, function(err, fields, files) {
            // var ID = fields.CustomerID; //取field的作法
            var ID = tokenResult;
            //如果沒有圖片
            if (checkCustomer.checkNull(files.img) === true) {
              //加密
              var password = encryption(fields.Password);
              var customerEditData = {
                Name: fields.CustomerName,
                Password: password,
                UpdateDate: getCurrentDateTime(),
              };
              customerEditModel.customerEdit(ID, customerEditData).then(
                  function(result) {
                    res.json({
                      status: "ID: " + ID + " 修改成功",
                      result: result
                    })
                    return;
                  }
                )
                //如果有圖片
            } else if (checkCustomer.checkNull(files.img) === false) {
              if (checkCustomer.checkFileSize(files.img.size) === true) {
                res.json({
                  err: "請上傳小於1MB的檔案" //印出警示
                })
                return;
              }
              //確定型態是否符合png, jpg, jpeg
              if (checkCustomer.checkFileType(files.img.type) === true) {
                fs.readFile(files.img.path, 'base64', function(err, data) {
                  if (err) {
                    return console.log(err);
                  }
                  //加密
                  var password = encryption(fields.Password);
                  var customerEditData = {
                    Name: fields.CustomerName,
                    Password: password,
                    Img: data,
                    ImgName: files.img.name,
                    UpdateDate: getCurrentDateTime(),
                  };
                  customerEditModel.customerEdit(ID, customerEditData).then(
                    function(result) {
                      res.json({
                        status: "ID: " + ID + " 修改成功",
                        result: result
                      })
                      return;
                    }
                  )
                })
              } else {
                res.json({
                  err: "請選擇正確的檔案格式。如：png, jpg, jpeg等。"
                })
                return;
              }
            }
          })
        }
      }
    )
  }
}

function getCurrentDateTime(){
  var today = new Date();
  var currentDateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return currentDateTime;
}
