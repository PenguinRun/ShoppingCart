module.exports = class CheckCustomer {
  //判斷email格式
  checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = re.test(email);
    return result;
  }
  //判斷空值
  checkNull(data) {
      for (var key in data) {
          return false;
      }
      return true;
    }
  //判斷檔案大小
  checkFileSize(fileSize) {
    var maxSize = 3 * 1024 * 1024; //3MB
    if (fileSize > maxSize) {
      return true;
    }
    return false;
  }
}
