var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

    var id = req.body.deleteID;
    var db = req.con;
    console.log("id join: "+id.join());
    // res.redirect('/');
    var ids = 'DELETE FROM Customer WHERE CustomerID IN '+ '('+ id.join() +')';
    var qur = db.query(ids, function(err, rows) {
      // DELETE FROM Customer WHERE CustomerID IN (134, 135);
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

 // <input type="checkbox" name="userDelete" value="Delete" onclick="Delete('<%= data[i].CustomerID %>');" />


module.exports = router;
