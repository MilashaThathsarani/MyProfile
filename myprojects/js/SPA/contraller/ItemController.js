function saveItem() {
    let itemCode=$('#txtItemCode').val();
    let itemName=$('#txtItemName').val();
    let itemQty=$('#txtQty').val();
    let UnitPrice=$('#txtPrice').val();

    let item=new ItemDTO(itemCode,itemName,itemQty,UnitPrice);
    itemDb.push(item);

}
function updateItem() {
    let itemCode=$("#txtItemCode").val();
    let item;
    for(var i=0;i<itemDb.length;i++){
        if(itemCode==itemDb[i].getItemCode()){
            item=itemDb[i];
            item.setItemName($('#txtItemName').val());
            item.setItemQTY($('#txtQty').val());
            item.setUnitPrice($('#txtPrice').val());
        }
    }
}
$("#btn-item-delete").click(function () {
    let id=$('#txtItemCode').val();
    let option=confirm(`Do you want to delete ID:${id}`);
    if(option){
        let erase=deleteItem();
        if(erase){
            alert("Item Deleted");
        }else{
            alert("Failed Item Delete");
        }
    }
    $('#txtItemCode,#txtItemName,#txtQty,#txtPrice').val("");
    generateItemID();
    loadAllItems();
});
$("#btn-item-feild-Clear").click(function () {
    $('#txtItemCode,#txtItemName,#txtQty,#txtPrice').val("");
    generateItemID();
});
function deleteItem() {
    let itemCode=$("#txtItemCode").val();
    let item;
    if(itemCode!=null){
        for(var i=0;i<itemDb.length;i++) {
            if (itemCode == itemDb[i].getItemCode()) {
                item = itemDb[i];
            }
        }
        let index=itemDb.indexOf(item);
        itemDb.splice(index,1);
        return true;
    }else{
        return false;
    }


}
function searchItem() {
    for (var i=0;i<itemDb.length;i++){
        if($('#txtItemSearch').val()==itemDb[i].getItemCode()){
            $("#txtItemCode").val(itemDb[i].getItemCode());
            $("#txtItemName").val(itemDb[i].getItemName());
            $("#txtQty").val(itemDb[i].getItemQTY());
            $("#txtPrice").val(itemDb[i].getUnitPrice());
        }
    }

}
$("#btn-item-search").click(function () {

    clearAllItemFeild();
    searchItem();
});
function loadAllItems() {

    $("#itemTable").empty();
    // if (isAdded > 0) {

    for (var i of itemDb) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQTY()}</td><td>${i.getUnitPrice()}</td></tr>`;
        $("#itemTable").append(row);
        $("#itemTable>tr").click(function () {


            $("#txtItemCode").val($(this).children(":eq(0)").text());
            $("#txtItemName").val($(this).children(":eq(1)").text());
            $("#txtQty").val($(this).children(":eq(2)").text());
            $("#txtPrice").val($(this).children(":eq(3)").text());
            clearItemField()
        });
    }
}
$('#btn-item-save').click(function () {
    saveItem();
    loadAllItems();
    $('#txtItemCode,#txtItemName,#txtQty,#txtPrice').val("");
    generateItemID();
});
$('#btn-item-update').click(function () {
    console.log("Hureeeeeee");
    updateItem();
    loadAllItems();
    $('#txtItemCode,#txtItemName,#txtQty,#txtPrice').val("");
    generateItemID();

});

function generateItemID() {
    try {
        let lastItemId = itemDb[itemDb.length - 1].getItemCode();
        let newItemCode = parseInt(lastItemId.substring(1, 4)) + 1;
        if (newItemCode < 10) {
            $("#txtItemCode").val("I00" + newItemCode);
        } else if (newItemCode < 100) {
            $("#txtItemCode").val("I0" + newItemCode);
        } else {
            $("#txtItemCode").val("I" + newItemCode);
        }
    } catch (e) {
        $("#txtItemCode").val("I001");
    }

}
function loadingMehtord() {

   generateItemID();

}
// function validation(regExPara, nextReg, thisField, nextField,errorMsg,errorMsgNext) {
//     var regEx = regExPara;
//     if (regEx.test($(thisField).val())) {
//         $(thisField).css("border", "2px solid green");
//         $(errorMsg).text("");
//         if (nextField != 0) {
//             checkNext(nextReg, nextField,errorMsg);
//             $(errorMsgNext).text("Invalid Input");
//         }
//
//     } else {
//         $(thisField).css("border", "2px solid red");
//         $(errorMsg).text("Invalid Input");
//     }
// }






// ---------------Validation Start-----------
//validation started
// customer regular expressions

const itemNameRegEx = /^[A-z ]{2,20}$/;
const qtyRegEx = /^[0-9]{1,}$/;
const priceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtItemCode,#txtItemName,#txtQty,#txtPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtItemCode,#txtItemName,#txtQty,#txtPrice').on('blur', function () {
    formValidItem();
});

//focusing events
$("#txtItemCode").on('keyup', function (eventOb) {
    setButtonItem();
});

$("#txtItemName").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#txtQty").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#txtPrice").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});
// focusing events end
$("#btn-item-save").attr('disabled', true);

function clearAllItemFeild() {
    $('#txtItemCode,#txtItemName,#txtQty,#txtPrice').val("");
    $('#txtItemCode,#txtItemName,#txtQty,#txtPrice').css('border', '2px solid #ced4da');
    $('#txtItemName').focus();
    $("#btn-item-save").attr('disabled', true);
    loadAllItems();
    $("#ItemCodeError,#ItemNameError,#ItemQTYError,#ItemPriceError").text("");
    generateItemID();
}

function formValidItem() {
    var Name = $("#txtItemName").val();
    if (itemNameRegEx.test(Name)) {
        $("#txtItemName").css('border', '2px solid green');
        $("#ItemNameError").text("");
        var Qty = $("#txtQty").val();
        if (qtyRegEx.test(Qty)) {
            var price = $("#txtPrice").val();
            var priceReg = priceRegEx.test(price);
            $("#txtQty").css('border', '2px solid green');
            $("#ItemQTYError").text("");
            if (priceReg ) {
                $("#txtPrice").css('border', '2px solid green');
                $("#ItemPriceError").text("");
                return true;
            } else {
                $("#txtPrice").css('border', '2px solid red');
                $("#ItemPriceError").text("Item Price is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#txtQty").css('border', '2px solid red');
            $("#ItemQTYError").text("Item Qty is a required field : Only Number");
            return false;
        }
    } else {
        $("#txtItemName").css('border', '2px solid red');
        $("#ItemNameError").text("Item Name is a required field : Mimimum 2, Max 20, Spaces Allowed");
        return false;
    }

}

function checkIfItemValid() {
    $("#txtItemName").focus();
    var Name = $("#txtItemName").val();
    if (itemNameRegEx.test(Name)) {
        $("#txtQty").focus();
        var qty = $("#txtQty").val();
        if (qtyRegEx.test(qty)) {
            $("#txtPrice").focus();
            var price = $("#txtPrice").val();
            var r = priceRegEx.test(price);
            if (r) {
                let res = confirm("Do you really need to add this Item..?");
                if (res) {
                    saveItem();
                    clearAllItemFeild();
                }
            } else {
                $("#txtPrice").focus();
            }
        } else {
            $("#txtQty").focus();
        }
    } else {
        $("#txtItemName").focus();
    }

}

function setButtonItem() {
    let b = formValidItem();
    if (b) {
        $("#btn-item-save").attr('disabled', false);
    } else {
        $("#btn-item-save").attr('disabled', true);
    }
}

$('#btn-item-save').click(function () {
    checkIfItemValid();
});
//validation ended
