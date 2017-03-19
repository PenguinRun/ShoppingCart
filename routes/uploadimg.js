var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');


// 前台會員資料編輯
//   目標：撰寫以下 API
//   - 新增可上傳大頭照.jpg功能
//   - 呈現圖片資料
//   條件：
//     - 檔案統一存放 DB 裡，轉成 Base64。
//     - 只能上傳 .jpg .png 格式
//     - 檔案需要重新命名，但是前台在看的時候，要呈現他當初上傳的檔名。

router.post('/', function(req, res, next){
  var db = req.con;
  // var buffer = new Buffer(sql);

  var form = new formidable.IncomingForm();
  form.keepExtensions = true; //保留後綴

  form.uploadDir = __dirname + '/uploads/';

  // form.on('fileBegin', function(name, file){
  //   file.path =__dirname + '/uploads/';
  //   console.log(file.path + "##");
  // });

    form.parse(req, function(err, fields, files) {
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      console.log(files.file.type);
      if (files.file.type === 'image/png' || files.file.type === 'image/jpg'){
        fs.readFile(files.file.path, 'base64', function(err, data){
          if(err){
            return console.log(err);
          }
          var sql = {
            img : data,
            imgName : files.file.name,
          };
            db.query('INSERT INTO Customer SET ?', sql, function(err, rows){
              // console.log(sql);
              if(err){
                return console.log(err);
              }
            });

          // console.log(data);
        });
        console.log(files.file.path + "##");


        res.json({message: 'upload success',
        files: files});
      }else{
          res.json({err:'upload unsuccess. please upload the .jpg or .png file'});
      }

      // res.end(util.inspect({fields: fields, files: files}));
    });

    return;
});

module.exports = router;
