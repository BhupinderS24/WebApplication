var json;
var p=0;
var responseLength;
var paginationNo=5;

document.addEventListener("DOMContentLoaded",()=>{CallAPi();})

function CallAPi(){
    let request=new XMLHttpRequest();
    request.open("GET","http://jsonplaceholder.typicode.com/posts/",true);
    request.send();
    request.onload=()=>{
        json=JSON.parse(request.responseText);
        ShowData();
        // saveData(json);
        responseLength= json.length;
        console.log(responseLength);
        // console.log(json);
        }; 
}


//  function saveData(json) {
//     console.log(json);
//      sessionStorage.setItem('Data', json);
//  }

function ShowData(){

    enableOrDisableButton();
    console.log("p"+p);
    var tableBody=document.createElement("tbody");
    var tableElement =document.getElementById("myTable");
    tableElement.appendChild(tableBody); 

    for(i=p;i<p+paginationNo;i++){
        console.log("PaginationNO"+paginationNo)
        if(i>responseLength){
            break;
        }
        var user=json[i];
        var tableRow=document.createElement("tr");
        tableBody.appendChild(tableRow);

        for(userDetail in user){
            var tableData=document.createElement("td");
            tableRow.appendChild(tableData);
            var text=document.createTextNode(user[userDetail]);
            tableData.appendChild(text);
            // console.log(user[userDetail]);
        };
    };
}

function next(){
    p+=paginationNo;
    deleteRows();
    //console.log(sessionStorage.getItem('Data'))
    ShowData();
    //ShowData(sessionStorage.getItem('Data'),p);
}
function previous(){
    p-=paginationNo;
    deleteRows();
    ShowData();
    //ShowData(sessionStorage.getItem('Data'),p);
}
function deleteRows(){
    var myTable = document.getElementById("myTable");
    var rowCount = myTable.rows.length;
    for (let x=rowCount-1; x>0; x--) {
         myTable.deleteRow(x);
    } 
}

function assignPaginationNo(){
    var dropDown = document.getElementById("DropDown");
    var selectedOption = dropDown.options[dropDown.selectedIndex].value;
    //console.log(n);
    p=0;
    paginationNo=Number(selectedOption);
    deleteRows();
    // CallAPi();
    ShowData();
}

function enableOrDisableButton(){
    if(p==0){
        document.getElementById("previous").disabled=true;
    }
    else{
        document.getElementById("previous").disabled=false;
    }
    if(p>=(responseLength-paginationNo)){          //comparing if Difference is greater than pagination No. or Not
        //console.log("PaginationNO"+paginationNo)
        document.getElementById("next").disabled=true;
    }
    else{
        document.getElementById("next").disabled=false;
    } 
}