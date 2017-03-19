var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

router.get('/', function(req, res, next) {

  var id = req.query.id;
  var db = req.con;
  var data = "";

  console.log("id: " + id);

  db.query('SELECT * FROM Customer WHERE CustomerID = ?', id, function(err, rows) {
    if (err) {
      console.log(err);
    }

    var data = rows;
    res.render('userEdit', {
      title: 'Edit Account',
      data: data
    });
    // res.json({
    //   data: data
    // })
  });

});



router.post('/', function(req, res, next) {
  var db = req.con;
  var id = req.query.id;
  console.log('id: ' + id);

  console.log('db:' + db);

  var reqquery = req.query;

  // console.log('req: ' + req.body);


  var form = new formidable.IncomingForm();
  form.keepExtensions = true; //保留後綴

  form.uploadDir = __dirname + '/uploads/';

  form.parse(req, function(err, fields, files) {
    console.log(files.img.type + "###");
    if (files.img.type === 'image/png' || files.img.type === 'image/jpg' || files.img.type === 'image/jpeg') {
      fs.readFile(files.img.path, 'base64', function(err, data) {
        if (err) {
          return console.log(err);
        }

        var CustomerID = fields.CustomerID;
        var sql = {
          CustomerName: fields.CustomerName,
          password: fields.Password,
          Email: fields.Email,
          img: data,
          imgName: files.img.name,
        };
        // console.log("CustomerName:" + sql.CustomerName);
        // console.log("password:" + sql.password);
        // console.log("Email:" + sql.Email);
        // console.log("imgName:" + sql.imgName);
        
        var qur = db.query('UPDATE Customer SET ? WHERE CustomerID = ?', [sql, CustomerID], function(err, rows) {
          if (err) {
            console.log(err);
          }
          // res.setHeader('Content-Type', 'application/json');

        });
      });
      res.json({
        result:"修改成功"
      })
      return;
      res.redirect('/');
      return;
    }
    else(
      res.json({
        err:"請將圖片格式轉為png/jpg/jpeg"
      })

    )
  });
  return;

});


module.exports = router;
