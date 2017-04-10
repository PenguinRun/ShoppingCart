var CustomerEditModel = require('../../models/customer/edit_model');

var formidable = require('formidable');
var fs = require('fs');

module.exports = class CustomerEdit {
  //取得單筆會員資料
  getCustomerData(req, res, next) {
    var id = req.query.id;
    var customerEditModel = new CustomerEditModel();
    customerEditModel.editData(id).then(
      function(result) {
        res.json({
          result: result
        })
      }
    )
  }
  //修改會員資料
  updateCustomerEdit(req, res, next) {
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
          var ID = fields.CustomerID;
          var customerEditData = {
            Name: fields.CustomerName,
            password: fields.Password,
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
