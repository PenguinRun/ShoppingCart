var ProductListData = require('../../models/product/product_list_model');
var ProductEditModel = require('../../models/product/edit_model');
var PagingModel = require('../../models/product/paging_model');
var CheckProduct = require('../../service/product_check');

module.exports = class ProductList {
  //取得全部商品資料
  getProductData(req, res, next) {
      var productListData = new ProductListData();
      productListData.getProductListData().then(
        function(rows) {
          res.json({
            result: rows
          })
        }
      ).catch(function(err) {
        res.json({
          result: err
        })
      })
    }
    //取得欲修改商品ID資料
  getProductData(req, res, next) {
      // 取queryID的作法
      var ID = req.query.ID;
      var productEditModel = new ProductEditModel();
      var checkProduct = new CheckProduct();
      if (checkProduct.checkNull(ID) === true){
        res.json({
          err: "請輸入ID"
        })
        return;
      }
      productEditModel.editData(ID).then(
        function(rows) {
          res.json({
            result: rows
          })
        }
      ).catch(function(err) {
        res.json({
          result: err
        })
      })
    }
    //取得分頁資料
  getPagingData(req, res, next) {
    var page = req.query.page;
    var pageSize = 3;
    var pagingModel = new PagingModel();
    pagingModel.pagingData(page, pageSize).then(
      function(rows) {
        res.json({
          result: rows
        })
        return;
      }
    ).catch(function(err) {
      res.json({
        result: err
      })
    })
  }
}
