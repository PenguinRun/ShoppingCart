var CustomerLoginData = require('../../models/customer/customer_login');
var CheckCustomer = require('../../service/customer_check');
var config = require('../../config/development');
var fs = require('fs');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = class Login {
  loginCheck(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    //加密
    //========================
    var pem = fs.readFileSync('./service/server.pem');
    var key = pem.toString('ascii');
    var hmac = crypto.createHmac('sha1', key);
    hmac.update(password);
    var rePassword = hmac.digest('hex');
    // console.log('rePassword: ' + repassword);
    //========================
    var customerData = {
      Email: userName,
      Password: rePassword
    }
    var customerLoginData = new CustomerLoginData();
    var checkCustomer = new CheckCustomer();
    customerLoginData.getCustomerLoginData(customerData).then(
      function(rows) {
        if (checkCustomer.checkNull(rows) === true) {
          res.json({
            err: "請輸入正確的帳號密碼"
          })
        } else if (checkCustomer.checkNull(rows) === false) {
          //token產生
          //====================
          var token = jwt.sign({
            algorithm: 'HS256',
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: rows[0].ID
          }, config.secret);
          var decode = jwt.decode(token,{complete:true});
          // console.log("decode.header: " + decode.header);
          // console.log("decoded.payload: " + decode.payload.data);
          //====================
          res.json({
            result: "Hi, " + rows[0].Name + " 歡迎登入！",
            token: token
          })
        }
      }
    )
  }
}
