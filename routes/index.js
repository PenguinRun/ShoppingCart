var express = require('express');
var router = express.Router();

//備份資料庫
// mysqldump -u PenguinRun -p"1234" ShoppingCart > dept.sql

//新增權限
// INSERT INTO user(host, user, password VALUES('%', 'username', password('PWD'));
// GRANT ALL ON *.* TO 'username'@localhost IDENTIFIED BY 'PWD' WITH GRANT OPTION;
// FLUSH PRIVILEGES;


// home page
router.get('/', function(req, res, next) {
    var id = req.query.id;
    var db = req.con;
    var data = "";

    db.query('SELECT * FROM Customer', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
        // use index.ejs
        res.render('index', { title: 'Account Information', data: data});
        // res.json({
        //   data: data
        // })
    });

});




module.exports = router;
