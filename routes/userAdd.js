var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');


router.get('/', function(req, res, next){
  res.render('userAdd', {title: 'Add Customer'});
});

// router.post('/', function(req, res) {
//   var displayImage = '';
//   console.log("req body: "+req.body);
//   fs.readFile(req.files.displayImage.path, function (err, data) {
//
//   var newPath = __dirname + "/uploads/uploadedFileName";
//   fs.writeFile(newPath, data, function (err) {
//     res.redirect("back");
//   });
// });
// });


// //================
//
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
      console.log(files.img.type);
      if (files.img.type === 'image/png' || files.img.type === 'image/jpg' || files.img.type === 'image/jpeg'){
        fs.readFile(files.img.path, 'base64', function(err, data){
          if(err){
            return console.log(err);
          }
          var sql = {
            CustomerName: fields.CustomerName,
            password: fields.Password,
            Email: fields.Email,
            img: data,
            imgName: files.img.name,
          };
            db.query('INSERT INTO Customer SET ?', sql, function(err, rows){
              // console.log(sql);
              if(err){
                return console.log(err);
              }
            });

          // console.log(data);
        });
        console.log(files.img.path + "##");

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');

        // res.json({
        //   result: "新增成功"
        // })
      }
      // else(
        // res.json({
        //   err: "請將圖片格式轉為png/jpg/jpeg"
        // })
      // )

      // res.end(util.inspect({fields: fields, files: files}));
    });

    return;
});
// //=========

//
//
// router.post('/', function(req, res, next){
//   var db = req.con;
//
//  //image-type
//
//     var sql = {
//       CustomerName: req.body.CustomerName,
//       password: req.body.Password,
//       Email: req.body.Email,
//     };
//         db.query('INSERT INTO Customer SET ?', sql, function(err, rows){
//           if (err){
//             console.log(err);
//           }
//
//           res.setHeader('Content-Type', 'application/json');
//           res.redirect('/');
//           // res.json({message:"註冊成功"});
//         });
//       // }
//       // console.log(data[i].CustomerName + "111")
//     // }
//   // })
//
// });
//



module.exports = router;
