var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    var id = req.query.id;
    var db = req.con;
    var data = "";


    db.query('SELECT * FROM Customer WHERE CustomerID = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var data = rows;
        res.render('userEdit', { title: 'Edit Account', data: data });
        // res.json({
        //   data: data
        // })
    });

});

router.post('/', function(req, res) {

    var uploadedFile = req.files.uploadingFile;
        var tmpPath = uploadedFile.path;
        var targetPath = './' + uploadedFile.name;

        fs.rename(tmpPath, targetPath, function(err) {
            if (err) throw err;
               fs.unlink(tmpPath, function() {

                   console.log('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
            });
        });
    res.send('file upload is done.');
    res.end();
});

module.exports = router;
