var express = require('express');
var router = express.Router();
var CustomerList = require('../controllers/customer/customer_list_controller');
var ModifyCustomer = require('../controllers/customer/modify_controller')
var Login = require('../controllers/customer/login')

var customerList = new CustomerList();
var modifyCustomer = new ModifyCustomer();
var login = new Login();

//取得顧客資料
router.get('/customerList', customerList.getCustomerListData);

//新增顧客
router.post('/customerAdd', modifyCustomer.postCustomerAdd);

//顧客修改
router.get('/customerEdit', customerList.getCustomerData);
router.put('/customerEdit', modifyCustomer.putCustomerEdit);

//顧客刪除
router.delete('/customerDelete', modifyCustomer.deleteCustomer);

//顧客資料（分頁功能）
router.get('/customerPagingData', customerList.getPagingData);

//進行Login
router.post('/login', login.loginCheck);

module.exports = router;
