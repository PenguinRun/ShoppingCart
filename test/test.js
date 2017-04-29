var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app');

chai.use(chaiHttp);

//測試month_list_model

describe('API Routes', function() {
  //成功情況
  describe('GET /orderMonthList', function() {
    it('成功', function(done) {
      chai.request(server)
        .get('/orderMonthList/?year=2017&month=4')
        .end(function(err, res){
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.have.property('result').eql('The workbook was created!');
          res.should.be.json;
          done();
        });
    });
  });
  //若是year輸入空值或非int的值
  describe('GET /orderMonthList', function() {
    it('若是year輸入空值或非int的值', function(done) {
      chai.request(server)
        .get('/orderMonthList/?year=&month=4')
        .end(function(err, res){
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.have.property('err').eql('請在query中輸入正確的year！如：year=2017');
          res.should.be.json;
          done();
        });
    });
  });
  //若是month輸入空值或非int的值
  describe('GET /orderMonthList', function() {
    it('若是month輸入空值或非int的值', function(done) {
      chai.request(server)
        .get('/orderMonthList/?year=2017&month=')
        .end(function(err, res){
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.have.property('err').eql('請在query中輸入正確的month！如：month=4');
          res.should.be.json;
          done();
        });
    });
  });
  //若是資料庫沒有該筆資料
  describe('GET /orderMonthList', function() {
    it('若是資料庫沒有該筆資料', function(done) {
      chai.request(server)
        .get('/orderMonthList/?year=2017&month=5')
        .end(function(err, res){
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.have.property('err').eql('該月份沒有資料！');
          res.should.be.json;
          done();
        });
    });
  });
});
