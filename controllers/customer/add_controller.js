var CustomerAddModel = require('../../models/customer/add_model');
var CheckCustomer = require('../../service/customer_check');
var encryption = require('../../models/customer/encryption');
var fs = require('fs');
var crypto = require('crypto');
var formidable = require('formidable');

module.exports = class CustomerAdd {
  postCustomerAdd(req, res, next) {
    var form = new formidable.IncomingForm();
    var customerAddModel = new CustomerAddModel();
    var checkCustomer = new CheckCustomer();
    form.keepExtensions = true; //保留後綴
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
            )
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
}
