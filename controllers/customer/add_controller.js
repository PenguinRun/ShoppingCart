var CustomerAddModel = require('../../models/customer/add_model');

var fs = require('fs');
var formidable = require('formidable');
module.exports = class CustomerAdd {
  postCustomerAdd(req, res, next) {
    var form = new formidable.IncomingForm();
    var customerAddModel = new CustomerAddModel();
    form.keepExtensions = true; //保留後綴
    // form.uploadDir = __dirname + '/uploads/'; //暫存圖片在uploads
    form.parse(req, function(err, fields, files) {
      if (files.img.type === 'image/png' || files.img.type === 'image/jpg' || files.img.type === 'image/jpeg') {
        fs.readFile(files.img.path, 'base64', function(err, data) {
          if (err) {
            return console.log(err);
          }
          var customerList = {
            Name: fields.CustomerName,
            password: fields.Password,
            Email: fields.Email,
            img: data,
            imgName: files.img.name,
          }
          customerAddModel.customerAdd(customerList).then(
            function(result) {
              res.json({
                result: result
              })
            }
          )
        })
      }
    })
  }
}
