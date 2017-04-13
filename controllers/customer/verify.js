var jwt = require('jsonwebtoken');
var config = require('../../config/development');
module.exports = class Verification {
  //進行token認證
  accountVerify(token) {
    var tokenResult = "";
    var time = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
      //判斷token是否正確
      if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
            tokenResult = false;
            resolve(tokenResult);
            //token過期判斷
          } else if (decoded.exp <= time) {
            // console.log(decoded.exp);
            // console.log(time);
            tokenResult = false;
            resolve(tokenResult);
            //若正確
          } else {
            tokenResult = decoded.data
            resolve(tokenResult);
          }
        })
      }
    });
  }
}
