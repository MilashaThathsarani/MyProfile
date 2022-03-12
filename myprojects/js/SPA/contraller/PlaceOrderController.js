let fullTotal;
function generateOrderID() {
    try {
        let lastOId = orderDb[orderDb.length - 1].getOrderID();
        let newOId = parseInt(lastOId.substring(1, 4)) + 1;
        if (newOId < 10) {
            $("#txtOrderID").val("O00" + newOId);
        } else if (newOId < 100) {
            $("#txtOrderID").val("O0" + newOId);
        } else {
            $("#txtOrderID").val("O" + newOId);
        }
    } catch (e) {
        $("#txtOrderID").val("O001");
    }

}
function forOrder(){
    generateOrderID();
    loadCustIDs();
    loadItemIds();
}
/*-------Customer Details---------------*/
function loadCustIDs(){
    $("#cmbCustIDs").empty();
    var customer=getCustomers();
    var ids=document.getElementById("cmbCustIDs");
    for (var i in customer){
        var opt=document.createElement("option")
        opt.value=customer[i].getCustomerID();
        opt.text=customer[i].getCustomerID();
        ids.appendChild(opt);
    }
}
$("#cmbCustIDs").click(function () {
    let cus=searchCustomerId($('#cmbCustIDs').val());
    if(cus!=null){
        $('#txtPCustName').val(cus.getCustomerName());
        $('#txtPCustAddress').val(cus.getCustomerAddress());
        $('#txtPCustSalary').val(cus.getCustomerSalary());
    }
});
function searchCustomerId(id) {
    for (var i in customerDb){
        if(customerDb[i].getCustomerID()==id) return customerDb[i];

    }
    return null;
}
function getCustomers() {
    return customerDb;
}

// --------Item Details--------------------------
function loadItemIds(){
    $("#cmbItemIDs").empty();
    var items=getItems();
    var ids=document.getElementById("cmbItemIDs");
    for (var i in items){
        var opt=document.createElement("option")
        opt.value=items[i].getItemCode();
        opt.text=items[i].getItemCode();
        ids.appendChild(opt);
    }
}
$("#cmbItemIDs").click(function () {
    let item=searchItemCode($('#cmbItemIDs').val());
    if(item!=null){
        $('#txtPItemName').val(item.getItemName());
        $('#txtPItemQty').val(item.getItemQTY());
        $('#txtPPrice').val(item.getUnitPrice());
    }
});
function searchItemCode(id) {
    for (var i in itemDb){
        if(itemDb[i].getItemCode()==id) return itemDb[i];

    }
    return null;
}
function getItems() {
    return itemDb;
}

function qtyUpdate() {
    let item;
    var itemQty=$('#txtPItemQty').val();
    var orderQty=$('#txtOrderQty').val();

    var updateQty=itemQty-orderQty;
    for (var i in itemDb){
        if($('#cmbItemIDs').val()==itemDb[i].getItemCode()){
            item=itemDb[i];
            item.setItemQTY(updateQty);
            $('#txtPItemQty').val(item.getItemQTY());
        }
    }
}


$("#btn-addToCart").click(function () {
    let qty=parseInt($('#txtPItemQty').val());
    let Oqty=parseInt($('#txtOrderQty').val());
    console.log(qty,Oqty);
    if($('#txtOrderQty').val()!=""){
        if(qty<Oqty){
            alert("Not Available This QTY");
        }else{

            qtyUpdate();
            addToCart();
            loadCart();
            getTotal();
            $("#txtPItemName,#txtPPrice,#txtPItemQty,#txtOrderQty").val("")
        }
    }else{
        alert("Please Enter Order Qty");
    }



});
function addToCart(){
    let oId=$("#txtOrderID").val();
    let cName=$("#txtPCustName").val();
    let iID=$("#cmbItemIDs").val();
    let iName=$("#txtPItemName").val();
    let iPrice=$("#txtPPrice").val();
    let orderQty=$("#txtOrderQty").val();
    let total=iPrice*orderQty;
    fullTotal=total+fullTotal;

    for (let i=0;i<cartDb.length;i++){
        if(cartDb[i].getcartICode()==iID){
            var newQty=+cartDb[i].getcartOQty() + +orderQty;
            let newTotal=iPrice*newQty;
            cartDb[i].setcartOQty(newQty);
            cartDb[i].setTotal(newTotal);
            return;
        }
    }
    cartDb.push(new CartDTO(oId,cName,iID,iName,iPrice,orderQty,total));
}
function loadCart() {
    $("#addToCartTable").empty();
    for (var i of cartDb){
        let row=`<tr><td>${i.getCartOID()}</td><td>${i.getcartCName()}</td><td>${i.getcartICode()}</td><td>${i.getcartIName()}</td><td>${i.getcartIPrice()}</td><td>${i.getcartOQty()}</td><td>${i.getTotal()}</td></tr>`;
        $("#addToCartTable").append(row);
    }
}

function getTotal() {
    let tot = 0;
    $('#addToCartTable>tr').each(function () {
        tot = tot + parseFloat($($(this).children().get(6)).text());
        $('#total>span').text(tot).append('.00');

        if($('#txtDiscount').val()==""){

            $('#subtotal>span').text(tot).append('.00');
        }
    });
    t = tot;

}
$('#txtDiscount').on('keyup', function () {
    if ($('#txtDiscount').val() == '') {
        $('#subtotal>span').text('0.00');
    } else {
        let tot = parseFloat(t);
        let dis = tot/100 * parseFloat($('#txtDiscount').val());

        $('#subtotal>span').text(tot - dis).append('.00');
    }
});

// $("#addToCartTable>tr").click(function () {
//         console.log($(this).val());
//     });


function placeOrder() {

    if(saveOrder()){
       for (var i of cartDb){
           orderDetailsDb.push(new OrderDetailsDTO(i.getCartOID(),i.getcartICode(),i.getcartIPrice(),i.getcartOQty(),i.getTotal()));

       }
       alert("Successfull")
    }

}
function saveOrder() {
    let oId=$("#txtOrderID").val();
    let cName=$("#txtPCustName").val();
    let iPrice=$("#txtPPrice").val();
    let orderQty=$("#txtOrderQty").val();
    let fullTotal=$("#total").text();
    let  date=$("#date").val();
    console.log(oId,cName,fullTotal,date);

    return orderDb.push(new OrderDTO(oId,cName,fullTotal,date));
}
$("#btn-purchase-order").click(function () {
    placeOrder();
    generateOrderID();
    cartDb.splice(0,cartDb.length);
    $('#addToCartTable').empty();
    $("#txtPItemName,#txtPPrice,#txtPItemQty,#txtOrderQty,#txtPCustSalary,#txtPCustName,#txtPCustAddress").val("")
});
$("#txtCash").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        let cash=parseFloat($('#txtCash').val());
        let total=$('#subtotal>span').text();
        console.log(cash,total)
        let balance=cash - total;

        $('#txtBalance').val(balance);
    }
});
