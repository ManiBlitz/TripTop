
function getTop5Locations(event) {

        console.log("this is working.");


        var city = $('#currentCity').val();
        var type = $('#cityType').val();



        var yourObject = {
            "city": "Marietta",
            "type": "Restaurant"
        };

        var myString = JSON.stringify(yourObject);



        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/city/type";




        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/city/type",
            type: 'POST',
            crossDomain: true,
//            Access-Control-Allow-Origin http://localhost:63342/beanstalk-tript/triptopfrontend/templates/itinBuilder.html?,
            data: myString,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                console.info(data);



            }
        });
    }


    /* schedule maker */
function edit_row(no) {
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";

 var location=document.getElementById("location_row"+no);
 var address=document.getElementById("address_row"+no);
 var link=document.getElementById("link_row"+no);
 var cost=document.getElementById("cost_row"+no);

 var location_data=location.innerHTML;
 var address_data=address.innerHTML;
 var link_data=link.innerHTML;
 var cost_data=cost.innerHTML;

 location.innerHTML="<input type='text' id='location_text"+no+"' value='"+location_data+"'>";
 address.innerHTML="<input type='text' id='address_text"+no+"' value='"+address_data+"'>";
 link.innerHTML="<input type='text' id='link_text"+no+"' value='"+link_data+"'>";
 cost.innerHTML="<input type='text' id='cost_text"+no+"' value='"+cost_data+"'>";
}

function save_row(no)
{
 var location_val=document.getElementById("location_text"+no).value;
 var address_val=document.getElementById("address_text"+no).value;
 var link_val=document.getElementById("link_text"+no).value;
 var cost_val=document.getElementById("cost_text"+no).value;

 document.getElementById("location_row"+no).innerHTML=location_val;
 document.getElementById("address_row"+no).innerHTML=address_val;
 document.getElementById("link_row"+no).innerHTML=link_val;
 document.getElementById("cost_row"+no).innerHTML=cost_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
 var new_location=document.getElementById("new_location").value;
 var new_address=document.getElementById("new_address").value;
 var new_link=document.getElementById("new_link").value;
 var new_cost=document.getElementById("new_cost").value;

 var table=document.getElementById("data_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='location_row"+table_len+"'>"+new_location+"</td><td id='address_row"+table_len+"'>"+new_address+"</td><td id='link_row"+table_len+"'>"+new_link+"</td><td id='cost_row"+table_len+"'>"+new_cost+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

 document.getElementById("new_location").value="";
 document.getElementById("new_address").value="";
 document.getElementById("new_link").value="";
 document.getElementById("new_cost").value="";
}

/* Drop down menu in top 5 database side nav */
function typeSearch() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

     /* adding day to schedule */
/*document.getElementById('button').onclick = add_day;


var i = 0;
var original = document.getElementById('myDIV');

function add_day() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "new_day" + ++i; // there can only be one element with an ID
    original.parentNode.appendChild(clone);
}*/
