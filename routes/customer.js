var express = require('express');
var router = express.Router();
var CustomerList = require('../controllers/customer/customer_list_controller');
var CustomerAdd = require('../controllers/customer/add_controller');
var CustomerEdit = require('../controllers/customer/edit_controller');
var CustomerDelete = require('../controllers/customer/delete_controller');
var PagingData = require('../controllers/customer/paging_controller');
var Login = require('../controllers/customer/login')

var customerList = new CustomerList();
var customerAdd = new CustomerAdd();
var customerEdit = new CustomerEdit();
var customerDelete = new CustomerDelete();
var pagingData = new PagingData();
var login = new Login();

//取得顧客資料
router.get('/customerList', customerList.getCustomerData);

//新增顧客
router.post('/customerAdd', customerAdd.postCustomerAdd);

//顧客修改
router.get('/customerEdit', customerEdit.getCustomerData);
router.put('/customerEdit', customerEdit.updateCustomerEdit);

//顧客刪除
router.delete('/customerDelete', customerDelete.deleteCustomer);

//顧客資料（分頁功能）
router.get('/pagingData', pagingData.getPagingData);

//進行Login
router.post('/login', login.loginCheck);

module.exports = router;
