function OrderDTO(oId,custName,total,date) {
    var __oID=oId;
    var __custName=custName;
    var __total=total;
    var __orderDate=date;

    this.getOrderID=function () {
        return __oID;
    }
    this.setOrderID=function (oID) {
        __oID=oID;
    }
    this.getCusName=function () {
        return __custName;
    }
    this.setCusName=function (cusID) {
        __custName=cusID;
    }
    this.getOrderTotal=function () {
        return __total;
    }
    this.setOrderTotal=function (total) {
        __total=total;
    }
    this.getOrderDate=function () {
        return __orderDate;
    }
    this.setOrderDate=function (date) {
        __orderDate=date;
    }
}