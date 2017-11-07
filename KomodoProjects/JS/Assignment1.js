
function MenuChoice(selection)
{
    document.getElementById("Area1").style.display="none";
    document.getElementById("Area2").style.display="none";
    document.getElementById("Area3").style.display="none";
    
    switch(selection)
    {
        case "Area1":
            document.getElementById("Area1").style.display="initial";
            break;
        case "Area2":
            document.getElementById("Area2").style.display="initial";
            break;
        case "Area3":
            document.getElementById("Area3").style.display="initial";
            break;
        case "None":
            break;
        default:
            alert("Please select a menu option");
    }
}

function ListCustomers()
{
    var xmlhttp= new XMLHttpRequest();
    var url ="https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    xmlhttp.onreadystatechange=function() {
        if(xmlhttp.readyState== 4 && xmlhttp.status==200){
            var output=JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    

function GenerateOutput(result)
{
    var display="<table><tr><th>Company Name</th><th>Customer ID</th><th>City</th></tr>";
    var count=0;
    var companyname="";
    var customerid="";
    var city="";
    for(count =0; count<result.GetAllCustomersResult.length; count++)
    {
        customerid =result.GetAllCustomersResult[count].CustomerID;
        companyname ='<a href="javascript:Orders('+"'"+customerid+"');"+'">';
        companyname+=result.GetAllCustomersResult[count].CompanyName;
        companyname+='</a>';
        city=result.GetAllCustomersResult[count].City;
        display+="<tr><td>"+customerid+"</td><td>"+companyname+"</td><td>"+city+"</td></tr>";
        
    }
    display+="</table>";
    document.getElementById("listcustomers").innerHTML=display;
}
}
 function Orders(customerid)
 {
    var xmlhttp= new XMLHttpRequest();
    var url=
    "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += customerid;
    
    xmlhttp.onreadystatechange=function() {
        if(xmlhttp.readyState== 4 && xmlhttp.status==200){
            var output=JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
        var display="<table><tr><th>Product Name</th><th>Total</th></tr>";
        var count=0;
        for(count=0; count<result.length; count++)
        {
            display+="<tr><td>"+ result[count].ProductName + "</td><td>"+ result[count].Total +"</td></tr>";
        }
        display+="</table>";
        document.getElementById("listcustomers").innerHTML=display;
         MenuChoice("Area1");
    }
 }


function GetOrderHistory ()
{//Create URL and Query string
    var objRequest = new XMLHttpRequest();
    var url= "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url +=document.getElementById("CustID").value;

    
    //Checks that the object has returned data
    objRequest.onreadystatechange=function()
    {
        if(objRequest.readyState==4 && objRequest.status==200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    };
    
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GenerateOutput(result)
{
    var count=0;
    var displaytext= "<table><tr><th>Product Name </th><th>Quantity</th></tr>";
    
    for(count=0; count < result.length; count++)
    {
        displaytext += "<tr><td>" + result[count].ProductName +"</td><td>" + result[count].Total+"</td></tr>";
    }
    displaytext += "</table>";
    
    document.getElementById("orderdisplay").innerHTML=displaytext;
}

