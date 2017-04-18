module.exports = class CheckProduct {
  //判斷空值
  checkNull(data) {
      for (var key in data) {
          return false;
      }
      return true;
    }
  //判斷檔案大小
  checkFileSize(fileSize) {
    var maxSize = 1 * 1024 * 1024; //1MB
    if (fileSize > maxSize) {
      return true;
    }
    return false;
  }
  //判斷型態是否符合jpg, jpeg, png
  checkFileType(fileType){
    if (fileType === 'image/png' || fileType === 'image/jpg' || fileType === 'image/jpeg') {
      return true;
    }
    return false;
  }
}
