
var destinationInfo=new Array();

$(document).ready(function() {

    var userID = $.session.get("userID");

    if(userID == null) {
        $('#saveItin').hide();
    } else {
        $('#saveItin').show();
    }

original = document.getElementById('templateDIV');


$(document).on('focus',".timepicker", function(){
    $(this).timepicker({
                format:true,
                showinputs:false,
                minuteStep: 10
            });
});


console.log("Original "+original);


    $('#depdate').datepicker({
              format: 'yyyy-mm-dd'
           });
           $('#retdate').datepicker({
               format: 'yyyy-mm-dd'
           });


    var booleanX=$.cookie("isRoundTrip");
    var booleanY=$.cookie("isFlight");
    /*booleanY=false;*/
    console.log("roundtrip: "+booleanX);
    console.log("isflight: "+booleanY);
    if(booleanY=="true")
    {
        if(booleanX=="true"){
            var flight1= "<p><b>Destination Airport: </b>" + $.cookie("destination1") + "<br/><b>Date of Flight: </b>" + $.cookie("departuredate") + "<br/><b>Departure Time: </b>" + $.cookie("departuretime1") + "<br/><b>Arrival Time: </b>" + $.cookie("arrivaltime1") + "<br/></p>";
            var flight2= "<p><b>Return Airport: </b>" + $.cookie("destination2") + "<br/><b>Date of Flight: </b>" + $.cookie("returndate") + "<br/><b>Departure Time: </b>" + $.cookie("departuretime2") + "<br/><b>Arrival Time: </b>" + $.cookie("arrivaltime2") + "<br/></p>";
            $("#flightInfo").append(flight1);
            $("#flightInfo").append(flight2);
        }
        else { /*for single flight*/
            var flight1= "<p><b>Destination Airport: </b>" + $.cookie("destination1") + "<br/><b>Date of Flight: </b>" + $.cookie("departuredate") + "<br/><b>Arrival Time: </b>" + $.cookie("arrivaltime1") + "<br/></p>";
            $("#flightInfo").append(flight1);
        }
    }
    console.log("isflight: "+booleanY);
    if(booleanY==false || booleanY==null) {
        $("#flightinfolabel").text("Trip Information");
        var noFlight0="<label>Destination</label><input type=\"text\" name=\"destination\" id=\"destination\" placeholder=\"Where is your destination?\"/>";
        var noFlight1="<label>Start Date</label><input type=\"date\" name=\"retdate\" id=\"retdate\" placeholder=\"When Will You Return?\"/>";
        var noFlight2="<label>End Date</label><input type=\"date\" name=\"depdate\" id=\"depdate\" placeholder=\"When Will You Depart?\"/>";
        $("#flightInfo").append(noFlight0);
        $("#flightInfo").append(noFlight1);
        $("#flightInfo").append(noFlight2);
    }




    console.log("IATA is working.");



        var iata = $.cookie("destination1");

        var yourObject1 = {
            "iata": $.cookie("destination1") //ask michael about this

        };
        console.log("yourObject1:"+iata);

        var myString1 = JSON.stringify(yourObject1);

        var myEndpoint1 = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/airports/iata";
        var results1;


        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/airports/iata",
            type: 'POST',
            crossDomain: true,
//            Access-Control-Allow-Origin http://localhost:63342/beanstalk-tript/triptopfrontend/templates/itinBuilder.html?,
            data: myString1,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                results1 = data.body;
                /*var city = data.body;*/
                //results
                results1=JSON.parse(results1);
                /*city=JSON.parse(city);*/
                /*console.log("IATA: "+results1);*/
                results1=JSON.stringify(results1);
                console.log("RESULTS:" +results1);

                var i = 0;
                $.each(JSON.parse(results1), function(key, value){
                    /*console.log(value.0);*/
            console.log("cityyyy: "+key+", "+value);

            destinationInfo[i]=value;
            console.log("value" + i + ": "+destinationInfo[i]);
            i++;


            var cityX = destinationInfo[0],
            countryX = destinationInfo[1],
            elevationX = destinationInfo[2],
            iataX = destinationInfo[3],
            icaoX = destinationInfo[4],
            latX = destinationInfo[5],
            lonX = destinationInfo[6],
            nameX = destinationInfo[7],
            tzX = destinationInfo[8];

            console.log("ZZZ"+cityX, countryX, elevationX, iataX, icaoX, latX, lonX, nameX, tzX);

            $.cookie("cityX", cityX, {path:'/'});
            $.cookie("countryX", countryX, {path:'/'});


                });

            }

        });





/*function getTop5LocationsByCity(event) {*/

        console.log("getTop5LocationsByCity is working.");
        /*console.log("Getting destination: "+JSON.stringify(destinationInfo[0]));*/

        /*var city = $('#city').text();*/
        var city = $.cookie("cityX");
        var type = $('#cityType').val();

        var yourObject = {
            "city": city,
            "type": type
        };
        console.log("WHATS IN CITY: "+city);

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
                var results = data.body;
                //results
                results=JSON.parse(results);
                console.log(results);

                var i = 0;
                $.each(results, function(key, value){
                    /*console.log(value.0);*/
/*
                    var locationObj = '<tr><td class="text-center">' + '  ' + '</td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td></tr>';
*/
/*
                    var locationObj = '<tr class="db" id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
*/
                    //console.log(locationObj);
                    i++;
                    /*$('#locations').append(locationObj);*/
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });

            }
        });
    });

//works
$(document).ready(function() {
/*function locationsNearMe(event) {*/

        console.log("locationsNearMe is working.");


        var address = $('#currentAddress').val();

        var yourObject = {
            "address": "1100 South Marietta Pkwy, Marietta, GA 30060"


        };

        var myString = JSON.stringify(yourObject);

        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places";

        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places",
            type: 'POST',
            crossDomain: true,
//            Access-Control-Allow-Origin http://localhost:63342/beanstalk-tript/triptopfrontend/templates/itinBuilder.html?,
            data: myString,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                var results = data.body;
                //results
                results=JSON.parse(results);
                console.log("By Address "+results);

                var i = 0;
                $.each(results, function(key, value){


               /* console.log(value[2]);*/
                    /*console.log(value.0);*/
/*
                    var locationObj = '<tr><td class="text-center">' + '  ' + '</td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td></tr>';
*/
/*
                    var locationObj = '<tr class="db" id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value + '</td></tr>';
*/

                    //console.log(locationObj);
                    i++;
                    /*$('#locations').append(locationObj);*/
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });




            }
        });
    });

$(document).ready(function() {
/*function locationsByCity(event) {*/

        console.log("locationsByCity is working.");


        var city = $.cookie("cityX");

        console.log("WHATS IN CITY: "+city);
        var yourObject = {
            "city": city

        };

        var myString = JSON.stringify(yourObject);

        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/city";

        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/city",
            type: 'POST',
            crossDomain: true,
//            Access-Control-Allow-Origin http://localhost:63342/beanstalk-tript/triptopfrontend/templates/itinBuilder.html?,
            data: myString,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                var results = data.body;
                //results
                results=JSON.parse(results);
                console.log(results);

                var i = 0;
                $.each(results, function(key, value){
                    /*console.log(value.0);*/
/*
                    var locationObj = '<tr><td class="text-center">' + '  ' + '</td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td></tr>';
*/
/*
                    var locationObj = '<tr class="db" id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
*/
                    //console.log(locationObj);
                    i++;
                    /*$('#locations').append(locationObj);*/
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });

            }
        });
    });


$(document).ready(function() {
/*function locationsByCountry(event) {*/

        console.log("locationsByCountry is working.");

        var country = $.cookie("countryX");
        console.log("WHATS IN COUNTRY: "+country);
        var yourObject = {
            "country": country

        };

        var myString = JSON.stringify(yourObject);

        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/country";

        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/country",
            type: 'POST',
            crossDomain: true,
//            Access-Control-Allow-Origin http://localhost:63342/beanstalk-tript/triptopfrontend/templates/itinBuilder.html?,
            data: myString,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                var results = data.body;
                //results
                results=JSON.parse(results);
                console.log(results);

                var i = 0;
                $.each(results, function(key, value){
                    /*console.log(value.0);*/

/*
                    var locationObj = '<tr class="db" id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
*/
                    //console.log(locationObj);
                    i++;
                    /*$('#locations').append(locationObj);*/
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });

            }
        });
    });

$(document).ready(function() {
/*function getTop5LocationsByCountry(event) {*/

        console.log("getTop5LocationsByCountry is working.");


        var country = $.cookie("countryX");
        var type = $('#countryType').val();
        console.log("WHATS IN COUNTRY: "+country);
        var yourObject = {
            "country": country,
            "type": "Restaurant"
        };

        var myString = JSON.stringify(yourObject);

        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/country/type";

        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/country/type",
            type: 'POST',
            crossDomain: true,
//            Access-Control-Allow-Origin http://localhost:63342/beanstalk-tript/triptopfrontend/templates/itinBuilder.html?,
            data: myString,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                var results = data.body;
                //results
                results=JSON.parse(results);
                console.log(results);

                var i = 0;
                $.each(results, function(key, value){
                    /*console.log(value.0);*/

/*
                    var locationObj = '<tr class="db" id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
*/
                    //console.log(locationObj);
                    i++;
                    /*$('#locations').append(locationObj);*/
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });


            }
        });
    });




//fix
function getTop5Locations(event) {

        console.log("getTop5Locations is working.");


        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/location";

        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/location",
            type: 'POST',
            crossDomain: true,

            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                var results = data.body;
                //results
                results=JSON.parse(results);
                console.log(results);


                /*$('.db').empty();*/
                $('.db').hide();
                var i = 0;
                $.each(results, function(key, value){
                    /*console.log(value.0);*/

/*
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
*/

                    var locationObj = '<tr class="db" id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center" style="display:none">' + value[0] + '</td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td>><td class="text-center" style="display:none">' + value[6] + '</td>><td class="text-center" style="display:none">' + value[7] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + value[9] + '</td>><td class="text-center" style="display:none">' + value[10] + '</td>><td class="text-center" style="display:none">' + value[11] + '</td>><td class="text-center" style="display:none">' + value[12] + '</td>><td class="text-center" style="display:none">' + value[13] + '</td>><td class="text-center" style="display:none">' + value[14] + '</td>><td class="text-center" style="display:none">' + value[15] + '</td>><td class="text-center" style="display:none">' + value[16] + '</td><td class="text-center">' + value[17] + '</td></tr>';

                    /*console.log(locationObj);*/
                    i++;
                    $('#locations').append(locationObj);
                    //var adddd=locations.rows[i].cells[10].innerHTML;


                    //console.log("Type is " +adddd);

                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });
                /*var asdf=locations.rows.length;
                    console.log("length is "+asdf);*/


/*<input type='button' id='' value='Add' class='' onclick=''>*/
/*<input onClick="getTop5Locations(event); return false;" type="button" value="test"/>*/

            }
        });
    }


function add_event_loc(x){

        console.log("add_event is working.");

        var location = document.getElementById(x).cells[2].innerHTML;
        console.log("this is location "+location);
        var address = document.getElementById(x).cells[3].innerHTML;
        var link = document.getElementById(x).cells[6].innerHTML;
        var cost = document.getElementById(x).cells[7].innerHTML;
        /*var x = $("#new_location").val(locations[1]);*/
        /*console.log(name);*/
        $("#new_location").val(location);
        $("#new_address").val(address);
        $("#new_link").val(link);
        $("#new_cost").val(cost);
        /*need to change these id's so it will be able to go to template too*/
        console.log()
}

/*<--------------------------------------------------------------------------------------------------------------->*/

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

function add_row(i)
{


 var new_location=document.getElementById("new_location").value;
 var new_address=document.getElementById("new_address").value;
 var new_link=document.getElementById("new_link").value;
 var new_cost=document.getElementById("new_cost").value;

 tID = "data_table_"+i;

 var table=document.getElementById(tID);

 var table_len=(table.rows.length)-1;
 var row=table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='location_row"+table_len+"'>"+new_location+"</td><td id='address_row"+table_len+"'>"+new_address+"</td><td id='link_row"+table_len+"'>"+new_link+"</td><td class='costT' id='cost_row"+table_len+"'>"+new_cost+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'><input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'><input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

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
    var input, filter, div, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    b = div.getElementsByClassName("choice");
    for (i = 0; i < a.length; i++) {
        if (a[i].outerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            b[i].style.display="";
        } else {
            a[i].style.display="none";
            b[i].style.display="none";

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

function saveToPDF() {

    var b = $.session.get('lastname');

    var d = new Date();
    var e = d.getTime();

    // var pdf = new jsPDF('p', 'pt', 'a3');
    //
    // // Enable auto page wrap (there are still margin-top issues...)
    // pdf.context2d.pageWrapY = pdf.internal.pageSize.height-20;
    //
    // // create a long table
    // // var table = document.createElement('table');
    // // for (var i=1; i<1000; i++){
    // //     var tr=document.createElement('tr');
    // //     var td=document.createElement('td');
    // //     td.innerHTML = "Item " + i;
    // //     tr.appendChild(td);
    // //     table.appendChild(tr);
    // // }
    // // document.body.appendChild(table);
    //
    // // render body to pdf
    // html2pdf($('#mainX'), pdf, function(){
    //     pdf.save('Test.pdf');
    //
    // });


        console.log("this");
    // var useWidth = document.getElementById('mainX').getWidth();
    var useHeight = $('#elementIQ')[0].scrollHeight;
    var element = document.getElementById('elementIQ');


    html2canvas(element, {
        width: 800,
        height: useHeight,
        onrendered: function(canvas) {
            console.log("works");
            theCanvas = canvas;

            canvas.toBlob(function (blob) {
                console.log("fine.");
                var c = b + "Itinerary" + e +".png";
                saveAs(blob, c);

                 var reader = new window.FileReader();
                 reader.readAsDataURL(blob);
                 reader.onloadend = function() {
                var base64data = reader.result;
                console.log(base64data);

                var a = "data:image/png;base64,";

                base64data = base64data.replace(a, '');

                var fd = {'fname': c,'data': base64data};

                console.log(fd);

                $.ajax({
                    type: 'POST',
                    url: 'https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/upload',
                    data: fd,
                    processData: false,
                    contentType: false
                }).done(function(data) {
                       console.log(data);
                });

                };


                });



    }
});


}


function openRightMenu() {
    /*document.getElementById("rightMenu").style.display = "block";*/
    document.getElementById("rightMenu").classList.toggle("show");
}


function filterSelection(c)
    {
        var i;
        for(i=1; i<locations.rows.length; i++)
        {
            if(c=="all")
            {
                for(var m=1; m<locations.rows.length; m++)
                {
                    locations.rows[i].style.display="";
                }
            }
            else if(locations.rows[i].cells[10].innerHTML!=c )
            /*else if(locations.rows[i].cells[10].outerHTML!=c )*/
            {
                locations.rows[i].style.display="none";
            }
            else
            {
                locations.rows[i].style.display="";
            }
        }
    }



    function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";

    }
    booleanY=false;
}

$(window).bind('beforeunload', function(){
    deleteAllCookies();
    return "Are you sure you want to leave without saving? All itinerary information will be deleted.";
    console.log("This method works")


    });

/*
function getTotal() {
    var sum=0;
    var tableL = document.getElementById("day1T");

    for(var i=1, row; row=tableL.rows[i]; i++)
    {
        sum=+sum + +tableL.rows[i].cells[3];
    }
    console.log(sum);

}*/

/*
function getTotal() {
    console.log("getTotal works");
    var $dataRows=$("#sum_table tr:not('.titlerow')");

    $dataRows.each(function() {
        $(this).find('.costT').each(function(i){
            totals[i]+=parseInt( $(this).html());
        });
    });
    $(".showCost").each(function(i){
        $(this).html("total:"+totals[i]);
    });

}*/
        $('#totalRow').click(function(){
            totalRow();
        });

$(document).ready(function(){
        totalRow();

    });

function totalRow()
        {
            var rowId = $('#data_table_1 tr').length;
            var val = 0;
             $("#data_table_1 [id^=new_cost]").each(function() {
    			val += parseFloat($(this).val());
			 });
			/*$('#myTable > tbody:last-child').append(
    			'<tr><th>T</th>' +
    			'<td><input type="text" id="totalRow" value="TOTAL" /></td>' +
                '<td><input type="text" id="totalCost" value="' + val +'" /></td></tr>'
			);*/
			document.getElementById("showCost").outerHTML="$"+val;
			console.log("Total cost is "+val);
		}