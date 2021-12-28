var myTableI = document.querySelector("#tableI"); 
function agregarFilaI(){ 
    var row = myTableI.insertRow(myTableI.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = '<textarea placeholder="Contenidos" ></textarea>';
    cell2.innerHTML = '';
    cell3.innerHTML = '<input placeholder="Tiempo">';
    cell4.innerHTML = '';
}

function eliminarFilaI(){
    var rowCount = myTableI.rows.length;
    if(rowCount <= 1) {
        alert('No se puede eliminar el encabezado');
    } else {
        myTableI.deleteRow(rowCount -1);
    }
    
}
var myTableII = document.querySelector("#tableII"); 
function agregarFilaII(){ 
    var row = myTableII.insertRow(myTableII.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = '<textarea placeholder="Contenidos" ></textarea>';
    cell2.innerHTML = '';
    cell3.innerHTML = '<input placeholder="Tiempo">';
    cell4.innerHTML = '';
}

function eliminarFilaII(){
    var rowCount = myTableII.rows.length;
    if(rowCount <= 1) {
        alert('No se puede eliminar el encabezado');
    } else {
        myTableII.deleteRow(rowCount -1);
    }
    
}
var myTableIII = document.querySelector("#tableIII"); 
function agregarFilaIII(){ 
    var row = myTableIII.insertRow(myTableIII.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = '<textarea placeholder="Contenidos" ></textarea>';
    cell2.innerHTML = '';
    cell3.innerHTML = '<input placeholder="Tiempo">';
    cell4.innerHTML = '';
}

function eliminarFilaIII(){
    var rowCount = myTableIII.rows.length;
    if(rowCount <= 1) {
        alert('No se puede eliminar el encabezado');
    } else {
        myTableII.deleteRow(rowCount -1);
    }
    
}