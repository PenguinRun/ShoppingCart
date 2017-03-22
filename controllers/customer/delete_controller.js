var CustomerDeleteModel = require('../../models/customer/delete_model');

module.exports = class CustomerDelete{
  deleteCustomer(req, res ,next){
    var customerID = req.body.CustomerID;
    var customerDeleteModel = new CustomerDeleteModel();
    customerDeleteModel.customerDelete(customerID).then(
      function(result){
        res.json({
          result: result
        })
      }
    )

  }
}
