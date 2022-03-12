function ItemDTO(itemCode,itemName,itemQTY,unitPrice) {
    var __itemCode=itemCode;
    var __itemName=itemName;
    var __itemQty=itemQTY;
    var __unitPrice=unitPrice;

    this.getItemCode=function(){
        return __itemCode;
    }
    this.setItemCode=function (code) {
        __itemCode=code;
    }
    this.getItemName=function(){
        return __itemName;
    }
    this.setItemName=function (name) {
        __itemName=name;
    }
    this.getItemQTY=function () {
        return __itemQty;
    }
    this.setItemQTY=function (qty) {
        __itemQty=qty;
    }
    this.getUnitPrice=function () {
        return __unitPrice;
    }
    this.setUnitPrice=function (price) {
        __unitPrice=price;
    }
}