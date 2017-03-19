var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var page = req.query.page;
    console.log("page: "+page);
    pageSize = 3;

    var db = req.con;
    var data = "";

    db.query('SELECT * FROM Customer ORDER BY CustomerID ASC LIMIT ?,?', [(page -1) * pageSize, pageSize], function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
        res.render('userPaging', {data: data});
        return;
        res.json({
          data:data
        })
    });

});

module.exports = router;
