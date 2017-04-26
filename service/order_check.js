module.exports = class CheckOrder {
  //判斷空值
  checkNull(data) {
    for (var key in data) {
      return false;
    }
    return true;
  }
  checkTypeString(value){
    if(value.constructor != String){
      return true;
    }else{
      return false;
    }
  }
  //透過正則來判斷是否為整數Int
  checkTypeInt(value) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  }

  //透過正則來判斷是否為浮點數Double
  checkTypeDobule(value) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value) || /^(\-|\+)?([0-9]+\.[0-9]+|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  }
}
