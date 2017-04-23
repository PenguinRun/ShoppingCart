// //新增商品(欄位: 商品名稱、數量、單價、照片、簡介)
// 修改商品
// 刪除商品(一次可以勾選多筆作刪除)
var ProductAddModel = require('../../models/product/add_model');
var ProductEditModel = require('../../models/product/edit_model');
var ProductDeleteModel = require('../../models/product/delete_model');

var CheckProduct = require('../../service/product_check');

var fs = require('fs');
var formidable = require('formidable');

module.exports = class ModifyProduct {
  //新增商品
  postProductAdd(req, res, next) {
    var form = new formidable.IncomingForm();
    var checkProduct = new CheckProduct();
    form.keepExtensions = true; //保留後綴
    // form.uploadDir = __dirname + '/uploads/'; //暫存圖片在uploads
    form.parse(req, function(err, fields, files) {
      if (checkProduct.checkNull(files) === true) {
        res.json({
          err: "請選擇一個檔案"
        })
        return;
      } else if (checkProduct.checkFileSize(files.Img.size) === true) {
        res.json({
          err: "請上傳小於1MB的檔案" //印出警示
        })
        return;
      }
      //確定型態是否符合png, jpg, jpeg
      if (checkProduct.checkFileType(files.Img.type) === true) {
        fs.readFile(files.Img.path, 'base64', function(err, data) {
          if (err) {
            return console.log(err);
          }
          var productList = {
              Name: fields.Name,
              Price: fields.Price,
              Quantity: fields.Quantity,
              Remark: fields.Remark,
              Img: data,
              ImgName: files.Img.name,
              CreateDate: getCurrentDateTime()
            }
            //判斷哪個參數沒輸入值
          for (var key in productList) {
            if (productList[key] === null || productList[key] == "" || typeof productList[key] === "undefined") {
              res.json({
                result: "please enter the [" + key + "] value" //印出沒填的參數
              })
              return;
            }
          }
          var productAddModel = new ProductAddModel();
          productAddModel.productAdd(productList).then(
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
        })
      } else {
        res.json({
          result: "請選擇正確的檔案格式。如：png, jpg, jpeg等。"
        })
        return;
      }
    })
  }
  putProductEdit(req, res, next) {
    var productEditModel = new ProductEditModel();
    var checkProduct = new CheckProduct();
    var form = new formidable.IncomingForm();
    form.keepExtensions = true; //保留後綴
    // form.uploadDir = __dirname + '/uploads/'; //暫存圖片在uploads
    form.parse(req, function(err, fields, files) {
      var ID = fields.ID;
      //如果沒有圖片
      if (checkProduct.checkNull(files.Img) === true) {
        var productList = {
          Name: fields.Name,
          Price: fields.Price,
          Quantity: fields.Quantity,
          Remark: fields.Remark,
          UpdateDate: getCurrentDateTime(),
        }
        productEditModel.productEdit(ID, productList).then(
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
      } else if (checkProduct.checkNull(files.Img) === false) {
        if (checkProduct.checkFileSize(files.Img.size) === true) {
          res.json({
            err: "請上傳小於1MB的檔案" //印出警示
          })
          return;
        }
        //確定型態是否符合png, jpg, jpeg
        if (checkProduct.checkFileType(files.Img.type) === true) {
          fs.readFile(files.Img.path, 'base64', function(err, data) {
            if (err) {
              return console.log(err);
            }
            var productList = {
              Name: fields.Name,
              Price: fields.Price,
              Quantity: fields.Quantity,
              Remark: fields.Remark,
              Img: data,
              ImgName: files.Img.name,
              UpdateDate: getCurrentDateTime(),
            }
            productEditModel.productEdit(ID, productList).then(
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
  deleteProduct(req, res ,next){
    var ID = req.body.ID;
    var productDeleteModel = new ProductDeleteModel();
    productDeleteModel.productDelete(ID).then(
      function(result){
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

function getCurrentDateTime(){
  var today = new Date();
  var currentDateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return currentDateTime;
}
