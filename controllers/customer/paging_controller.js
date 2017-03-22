var PagingModel = require('../../models/customer/paging_model');

module.exports = class PagingData{
  //分頁功能
  getPagingData(req, res, next){
    var page = req.query.page;
    var pageSize = 3;
    var pagingModel = new PagingModel();
    pagingModel.pagingData(page, pageSize).then(
      function(result){
        res.json({
          result: result
        })
      }
    )
  }
}
