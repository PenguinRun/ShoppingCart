var crypto = require('crypto');
var fs = require('fs');
var getRePassword = function(password){
  //加密
  //========================
  var pem = fs.readFileSync('./service/server.pem');
  var key = pem.toString('ascii');
  var hmac = crypto.createHmac('sha1', key);
  hmac.update(password);
  var rePassword = hmac.digest('hex');
  return rePassword;
  // console.log('rePassword: ' + rePassword);
  //========================
}

module.exports = getRePassword;
