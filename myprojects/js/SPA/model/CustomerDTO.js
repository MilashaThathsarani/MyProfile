function CustomerDTO(id,name,address,salary) {
    var __id=id;
    var __name=name;
    var __address=address;
    var __salary=salary;

    this.getCustomerID=function () {
        return __id;
    }
    this.setCustomerID=function (idPara) {
        __id=idPara;
    }
    this.getCustomerName=function () {
        return __name;
    }
    this.setCustomerName=function (namePara) {
        __name=namePara;
    }
    this.getCustomerAddress=function () {
        return __address;
    }
    this.setCustomerAddress=function (addressPara) {
        __address=addressPara;
    }
    this.getCustomerSalary=function () {
        return __salary;
    }
    this.setCustomeSalary=function (salaryPara) {
        __salary=salaryPara;
    }
}



