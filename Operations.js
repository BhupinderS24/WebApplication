var json;
var newjson;
var tableStart=0;
var responseLength;
var paginationNo=5;

document.addEventListener("DOMContentLoaded",()=>{CallAPi();})

function CallAPi(){
    let request=new XMLHttpRequest();
    request.open("GET","https://jsonplaceholder.typicode.com/posts/",true);
    request.send();
    request.onload=()=>{
        json=JSON.parse(request.responseText);
        newjson=json;
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
   // console.log("JSON"+json);
    enableOrDisableButton();
    console.log("TableStart"+tableStart);
    let tableBody=document.createElement("tbody");
    let tableElement =document.getElementById("myTable");
    tableElement.appendChild(tableBody); 

    for(let i=tableStart;i<tableStart+paginationNo;i++){
        console.log("PaginationNO"+paginationNo)
        if(i>newjson.length){
            break;
        }
        let user=newjson[i];
        console.log(user);
        let tableRow=document.createElement("tr");
        tableBody.appendChild(tableRow);

        for(userDetail in user){
            let tableData=document.createElement("td");
            tableRow.appendChild(tableData);
            let text=document.createTextNode(user[userDetail]);
            tableData.appendChild(text);
            // console.log(user[userDetail]);
        };
    };
}

function next(){
    tableStart+=paginationNo;
    deleteRows();
    //console.log(sessionStorage.getItem('Data'))
    ShowData();
    //ShowData(sessionStorage.getItem('Data'),p);
}
function previous(){
    tableStart-=paginationNo;
    deleteRows();
    ShowData();
    //ShowData(sessionStorage.getItem('Data'),p);
}
function deleteRows(){
    let myTable = document.getElementById("myTable");
    let rowCount = myTable.rows.length;
    for (let x=rowCount-1; x>0; x--) {
         myTable.deleteRow(x);
    } 
}

function assignPaginationNo(){
    tableStart=0;
    let dropDown = document.getElementById("DropDown");
    let selectedOption = dropDown.options[dropDown.selectedIndex].value;
    paginationNo=Number(selectedOption);
    deleteRows();
    ShowData();
}

function enableOrDisableButton(){
    if(tableStart==0){
        document.getElementById("previous").disabled=true;
    }
    else{
        document.getElementById("previous").disabled=false;
    }
    if(tableStart>=(newjson.length-paginationNo)){          //comparing if Difference is greater than pagination No. or Not
        //console.log("PaginationNO"+paginationNo)
        document.getElementById("next").disabled=true;
    }
    else{
        document.getElementById("next").disabled=false;
    } 
}

function Search(){
    tableStart=0;
    deleteRows();
    var input, searchText;

    let dropDown = document.getElementById("SearchDropDown");
    let selectedOption = dropDown.options[dropDown.selectedIndex].value;

    input= document.getElementById("SearchInput");
    compareWith= input.value.toUpperCase();

    let SearchJson=[];
    for(let i=0;i<responseLength;i++){
        let user=json[i];
        let keys = Object.keys(user);
        if (user[keys[Number(selectedOption)]].toString().toUpperCase().indexOf(compareWith)>-1){
            SearchJson.push(user);
           //console.log("SEARCHJSONNNN"+SearchJson);
        }        
    };
    newjson=SearchJson;
    ShowData();
}

function allData(){
    newjson=json;
    deleteRows();
    tableStart=0;
    ShowData();
}