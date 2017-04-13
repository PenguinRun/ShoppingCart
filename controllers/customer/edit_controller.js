var CustomerEditModel = require('../../models/customer/edit_model');
var CheckCustomer = require('../../service/customer_check');
var Verification = require('../../models/customer/verify');
var formidable = require('formidable');
var fs = require('fs');

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
  updateCustomerEdit(req, res, next) {
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
            if (files.img.type === 'image/png' || files.img.type === 'image/jpg' || files.img.type === 'image/jpeg') {
              fs.readFile(files.img.path, 'base64', function(err, data) {
                if (err) {
                  return console.log(err);
                }
                // var ID = fields.CustomerID; //取field的作法
                var ID = tokenResult;
                //加密
                //========================
                var pem = fs.readFileSync('./service/server.pem');
                var key = pem.toString('ascii');
                var hmac = crypto.createHmac('sha1', key);
                hmac.update(fields.Password);
                var password = hmac.digest('hex');
                // console.log('password: ' + password);
                //========================
                var customerEditData = {
                  Name: fields.CustomerName,
                  Password: password,
                  Email: fields.Email,
                  Img: data,
                  ImgName: files.img.name,
                };
                customerEditModel.customerEdit(ID, customerEditData).then(
                  function(result) {
                    res.json({
                      status: "ID: " + ID + " 修改成功",
                      result: result
                    })
                  }
                )
              })
            }else{
              res.json({
                err: "請將圖片格式轉為png/jpg/jpeg"
              })
            }
          })
        }
      }
    )
  }
}
