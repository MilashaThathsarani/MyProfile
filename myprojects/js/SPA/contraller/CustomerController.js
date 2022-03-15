

function saveCustomer() {
    let customerID = $('#txtCusID').val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerSalary = $("#txtCusSalary").val();
    var customer=new CustomerDTO(customerID, customerName, customerAddress, customerSalary);

    customerDb.push(customer);

}
function updateCustomer() {
    let customerID = $('#txtCusID').val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerSalary = $("#txtCusSalary").val();
    for (var i=0;i<customerDb.length;i++){
        if(customerDb[i].getCustomerID()==$("#txtCusID").val()){
            var customer=customerDb[i];
            customer.setCustomerName(customerName);
            customer.setCustomerAddress(customerAddress);
            customer.setCustomeSalary(customerSalary)
        }
    }
}

function deleteCustomer(id){
    let customer;
    if(id!=null){
        for (var i=0;i<customerDb.length;i++){
            if(id==customerDb[i].getCustomerID()){
                customer=customerDb[i];
            }
        }
        let indexNumber=customerDb.indexOf(customer);
        customerDb.splice(indexNumber,1);
        return true;
    }else{
        return false;
    }
}

function searchCustomer() {
    console.log("Searc")
    for (var i=0;i<customerDb.length;i++){
        if($('#txtCustomerSearch').val()==customerDb[i].getCustomerID()){
            $("#txtCusID").val(customerDb[i].getCustomerID())
            $("#txtCusName").val(customerDb[i].getCustomerName());
            $("#txtCusAddress").val(customerDb[i].getCustomerAddress());
            $("#txtCusSalary").val(customerDb[i].getCustomerSalary());
        }
    }

}

function loadAllCustomers() {

    $("#customerTable").empty();
    // if (isAdded > 0) {

        for (var i of customerDb) {

            let row = `<tr><td>${i.getCustomerID()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerSalary()}</td></tr>`;
            $("#customerTable").append(row);
            $("#customerTable>tr").click(function () {

                clearAll();
                $("#txtCusID").val($(this).children(":eq(0)").text());
                $("#txtCusName").val($(this).children(":eq(1)").text());
                $("#txtCusAddress").val($(this).children(":eq(2)").text());
                $("#txtCusSalary").val($(this).children(":eq(3)").text());


            });

        }
    // }

}

$("#btn-save-customer").click(function () {
    saveCustomer();
    loadAllCustomers();
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
    generateCustomerID();


});


$("#btn-customer-search").click(function () {
    clearAll();
    searchCustomer();
});
$("#btn-delete-customer").click(function () {
    let id=$('#txtCusID').val();
    let option=confirm(`Do you want to delete ID:${id}`);
    if(option){
        let erase=deleteCustomer(id);
        if(erase){
            alert("Customer Deleted");
            $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
            generateCustomerID();
        }else {
            alert("Delete Failed , Try again");
        }
    }

    loadAllCustomers();
});

$("#btn-update-customer").click(function () {
 updateCustomer();
 loadAllCustomers();
 $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
 generateCustomerID();
});

$("#btn-customer-clear-feild").click(function () {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
   clearAll();
   generateCustomerID();

});


function generateCustomerID() {
    try {
        let lastCustId = customerDb[customerDb.length - 1].getCustomerID();
        let newCustId = parseInt(lastCustId.substring(1, 4)) + 1;
        if (newCustId < 10) {
            $("#txtCusID").val("C00" + newCustId);
        } else if (newCustId < 100) {
            $("#txtCusID").val("C0" + newCustId);
        } else {
            $("#txtCusrID").val("C" + newCustId);
        }
    } catch (e) {
        $("#txtCusID").val("C001");
    }

}
function OpenLoadFuntion(){
    generateCustomerID();

}


// ---------------Validation Start-----------
//validation started
// customer regular expressions
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{2,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCusID").on('keyup', function (eventOb) {
    setButton();

    // if (eventOb.key == "Enter") {
    //     checkIfValid();
    // }

    // if (eventOb.key == "Control") {
    //     var typedCustomerID = $("#txtCusID").val();
    //     var srcCustomer = searchCustomerFromID(typedCustomerID);
    //     $("#txtCusID").val(srcCustomer.getCustomerID());
    //     $("#txtCusName").val(srcCustomer.getCustomerName());
    //     $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
    //     $("#txtCusSalary").val(srcCustomer.getCustomerSalary());
    // }


});

$("#txtCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCusSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
// focusing events end
$("#btn-save-customer").attr('disabled', true);

function clearAll() {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').css('border', '2px solid #ced4da');
    $('#txtCusName').focus();
    $("#btn-save-customer").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
    generateCustomerID();
}

function formValid() {
    var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtCusSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtCusAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtCusSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#txtCusSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Customer Address is a required field : Mimum 5");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }

}

function checkIfCustValid() {
    $("#txtCusName").focus();
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusAddress").focus();
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtCusSalary").focus();
                var cusSalary = $("#txtCusSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtCusSalary").focus();
                }
            } else {
                $("#txtCusAddress").focus();
            }
        } else {
            $("#txtCusName").focus();
        }

}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btn-save-customer").attr('disabled', false);
    } else {
        $("#btn-save-customer").attr('disabled', true);
    }
}

$('#btn-save-customer').click(function () {
    checkIfCustValid();
});
//validation ended




