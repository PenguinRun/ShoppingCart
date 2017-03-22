var express = require('express');
var router = express.Router();
var PagingData = require('../../controllers/customer/paging_controller');

var pagingData = new PagingData();

router.get('/', pagingData.getPagingData);

module.exports = router;
