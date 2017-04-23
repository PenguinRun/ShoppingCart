var CustomerAddModel = require('../../models/customer/add_model');
var CustomerEditModel = require('../../models/customer/edit_model');
var CustomerDeleteModel = require('../../models/customer/delete_model');
var CheckCustomer = require('../../service/customer_check');
var Verification = require('../../models/customer/verify');

var encryption = require('../../models/customer/encryption');
var fs = require('fs');
var crypto = require('crypto');
var formidable = require('formidable');

module.exports = class ModifyCustomer {
  //新增會員
  postCustomerAdd(req, res, next) {
      var form = new formidable.IncomingForm();
      var customerAddModel = new CustomerAddModel();
      var checkCustomer = new CheckCustomer();
      // form.keepExtensions = true; //保留後綴
      // form.uploadDir = __dirname + '/uploads/'; //暫存圖片在uploads
      form.parse(req, function(err, fields, files) {
        if (checkCustomer.checkNull(files) === true) {
          res.json({
            err: "請選擇一個檔案"
          })
          return;
        } else if (checkCustomer.checkFileSize(files.img.size) === true) {
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
            var customerList = {
                Name: fields.Name,
                Password: password,
                Email: fields.Email,
                Img: data,
                ImgName: files.img.name,
                CreateDate: getCurrentDateTime()
              }
              //判斷哪個參數沒輸入值
            for (var key in customerList) {
              if (customerList[key] === null || customerList[key] == "" || typeof customerList[key] === "undefined") {
                res.json({
                  result: "please enter the [" + key + "] value" //印出沒填的參數
                })
                return;
              }
            }
            var checkEmail = checkCustomer.checkEmail(customerList.Email);
            if (checkEmail === false) {
              res.json({
                result: "請輸入正確的Eamil格式。(如1234@email.com)"
              })
              return;
            } else if (checkEmail === true) {
              customerAddModel.customerAdd(customerList).then(
                function(result) {
                  res.json({
                    result: result
                  })
                  return;
                }
              ).catch(function(err) {
                res.json({
                  result: err
                })
              })
            }
          })
        } else {
          res.json({
            result: "請選擇正確的檔案格式。如：png, jpg, jpeg等。"
          })
          return;
        }
      })
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
                  ).catch(function(err) {
                    res.json({
                      result: err
                    })
                  })
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
                    ).catch(function(err) {
                      res.json({
                        result: err
                      })
                    })
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
    //刪除會員資料
    //需新增管理者帳號
  deleteCustomer(req, res, next) {
    //登入判斷
    var token = req.headers['x-access-token'];
    //確定token是否有輸入
    var checkOrder = new CheckOrder();
    if (checkOrder.checkNull(token) === true) {
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
          return;
        } else {
          var customerID = tokenResult;
          var customerDeleteModel = new CustomerDeleteModel();
          var checkCustomer = new CheckCustomer();
          if (checkCustomer.checkNull(customerID) === true) {
            res.json({
              err: "請輸入欲刪除的ID"
            })
          }
          customerDeleteModel.customerDelete(customerID).then(
            function(result) {
              res.json({
                result: result
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
  }
}

function getCurrentDateTime() {
  var today = new Date();
  var currentDateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return currentDateTime;
}
