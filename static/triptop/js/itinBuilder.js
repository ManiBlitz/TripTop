/*var original=null;
var i = 1;
var j = i;
var k = 1;
var l = 1;*/


//to get top 5 locations
$(document).ready(function() {







/*original = document.getElementById('templateDIV');*/

$(document).on('focus',".timepicker", function(){
    $(this).timepicker({
                format:true,
                showinputs:false,
                minuteStep: 10
            });
});


/* $('#saveItin').click(function() {
 console.log("save itin works");
  var options = {
  };
  var pdf = new jsPDF();
  pdf.fromHTML($('#mainX').HTML, 15, 15, options, function() {
    pdf.save('myItinerary-file.pdf');
  });
});*/

/*var doc = new jsPDF();
var specialElementHandlers = {

};

$('#saveItin').click(function () {
    doc.fromHTML($('.main').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('myItinerary-file.pdf');
});*/



//----------------


//----------------
/*var original = document.getElementById('templateDIV');
$('#templateDIV').hide();*/




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
            console.log("this is flight1"+flight1);
            console.log("this is flight 2" +flight2);

        }
        else { /*for single flight*/
            var flight1= "<p><b>Destination Airport: </b>" + $.cookie("destination1") + "<br/><b>Date of Flight: </b>" + $.cookie("departuredate") + "<br/><b>Arrival Time: </b>" + $.cookie("arrivaltime1") + "<br/></p>";
            $("#flightInfo").append(flight1);

        }
    }
    console.log("isflight: "+booleanY);
    if(booleanY==false || booleanY==null) {
        $("#flightinfolabel").text("Trip Information");
        /*console.log("hello");*/
        var noFlight0="<label>Destination</label><input type=\"text\" name=\"destination\" id=\"destination\" placeholder=\"Where is your destination?\"/>";
        var noFlight1="<label>Start Date</label><input type=\"date\" name=\"retdate\" id=\"retdate\" placeholder=\"When Will You Return?\"/>";
        var noFlight2="<label>End Date</label><input type=\"date\" name=\"depdate\" id=\"depdate\" placeholder=\"When Will You Depart?\"/>";
        $("#flightInfo").append(noFlight0);
        $("#flightInfo").append(noFlight1);
        $("#flightInfo").append(noFlight2);

        console.log("isflight: "+booleanY);
    }





/*function getTop5LocationsByCity(event) {*/

        console.log("getTop5LocationsByCity is working.");


        var city = $('#currentCity').val();
        var type = $('#cityType').val();

        var yourObject = {
            "city": city,
            "type": type
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
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
                    //console.log(locationObj);
                    i++;
                    $('#locations').append(locationObj);
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });

            }
        });
    });

    /*function add_day() {

    var newID = "Day " + ++i;
    var newPID = "myP_" + ++j;

    var clone = original.cloneNode(true);
    $(clone).show();
    $(clone).prepend("<div style=\"border-top: .5px solid black\" class=\"input-group bootstrap-timepicker\"><label>Start of Day:</label><input id=\"startTime"+i+"\" type=\"text\" class=\"text-center form-control timepicker input-small\"><span class=\"input-group-addon\"><icon class=\"glyphicon glyphicon-time\"></icon></span></div>");
    $(clone).prepend("<label id=\'"+ newPID + "\'>"+ newID +"</label>");
    $(clone).attr("id", newID);
    $(clone).append("<div id=\"itinBuilder"+i+"\"><table class=\"Day"+i+"Table\" text-align=\'center\' cellspacing=2 cellpadding=5 id=\"data_table_template\" border=2 style=\"background-color: white;\"><tr><th>Location</th><th>Address</th><th>Link</th><th>Cost</th></tr></table>");
    $("#itinBuilder"+i).append("<tr><td><input type=\"text\" id=\"new_location_1\"></td><td><input type=\"text\" id=\"new_address_1\"></td><td><input type=\"text\" id=\"new_link_1\"></td><td><input type=\"text\" id=\"new_cost_1\"></td><td><input type=\"button\" class=\"add\" id=\"addAct1\" onClick=\"add_row();\" value=\"Add New Activity\"></td></tr></div>");

    $(clone).append("<div class=\"input-group bootstrap-timepicker\"><label>End of Day:</label><input id=\"endTime"+i+"\" type=\"text\" class=\"text-center form-control timepicker input-small\"><span class=\"input-group-addon\"><icon class=\"glyphicon glyphicon-time\"></icon></span></div>");

    original.parentNode.appendChild(clone);
    console.log("ID is "+newID);

}*/



//fix
function saveItinerary(event) {
        console.log("saveItinerary is working.");
        var user_id = $('#user_id').val();
        var name = $('#user_name').val();
        var description = $('#user_description').val();


        var yourObject = { /*edit*/
            "user_id": "jkim",
            "name": "Jason Kim",
            "description": "blah",
        };

        var myString = JSON.stringify(yourObject);

        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/itineraries/save";

        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/itineraries/save",
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
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
                    console.log(locationObj);
                    i++;
                    $('#locations').append(locationObj);
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });

            }
        });
    }

//works
$(document).ready(function() {
/*function locationsNearMe(event) {*/

        console.log("locationsNearMe is working.");


        var address = $('#currentAddress').val();

        var yourObject = {
            "address": "560 Stedford Ln, Johns Creek, GA 30097"


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
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value + '</td></tr>';
/*
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
*/
                    //console.log(locationObj);
                    i++;
                    $('#locations').append(locationObj);
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });




            }
        });
    });

$(document).ready(function() {
/*function locationsByCity(event) {*/

        console.log("locationsByCity is working.");


        var city = $('#currentCity').val();


        var yourObject = {
            "city": "Johns Creek"

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
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
                    //console.log(locationObj);
                    i++;
                    $('#locations').append(locationObj);
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });

            }
        });
    });


$(document).ready(function() {
/*function locationsByCountry(event) {*/

        console.log("locationsByCountry is working.");

        var country = $('#currentCountry').val();

        var yourObject = {
            "country": "Italy"

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
                    var locationObj = '<tr><td class="text-center">' + '  ' + '</td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td></tr>';
*/
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
                    console.log(locationObj);
                    i++;
                    $('#locations').append(locationObj);
                    /*add 'add' button to add the event to the schedule*/
                    /*need to be able to filter choices*/
                });

            }
        });
    });

$(document).ready(function() {
/*function getTop5LocationsByCountry(event) {*/

        console.log("getTop5LocationsByCountry is working.");


        var country = $('#currentCountry').val();
        var type = $('#countryType').val();

        var yourObject = {
            "country": "Italy",
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
                    var locationObj = '<tr><td class="text-center">' + '  ' + '</td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td></tr>';
*/
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
                    //console.log(locationObj);
                    i++;
                    $('#locations').append(locationObj);
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



                var i = 0;
                $.each(results, function(key, value){
                    /*console.log(value.0);*/

/*
                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
*/

                    var locationObj = '<tr id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center" style="display:none">' + value[0] + '</td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td>><td class="text-center" style="display:none">' + value[6] + '</td>><td class="text-center" style="display:none">' + value[7] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td>><td class="text-center" style="display:none">' + value[10] + '</td>><td class="text-center" style="display:none">' + value[11] + '</td>><td class="text-center" style="display:none">' + value[12] + '</td>><td class="text-center" style="display:none">' + value[13] + '</td>><td class="text-center" style="display:none">' + value[14] + '</td>><td class="text-center" style="display:none">' + value[15] + '</td>><td class="text-center" style="display:none">' + value[16] + '</td><td class="text-center">' + value[17] + '</td></tr>';

                   // console.log(locationObj);
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

    /*function getTop5Locations(event) {

        console.log("getTop5Locations is working.");

*//* //there are no params so is this part needed?
        var country = $('#currentCountry').val();
        var type = $('#countryType').val();

        var yourObject = {
            "country": "Italy",
            "type": "Restaurant"
        };
*//*
        *//*var myString = JSON.stringify(yourObject);*//*

        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/location";

        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/places/location",
            type: 'POST',
            crossDomain: true,
            //Access-Control-Allow-Origin http://localhost:63342/beanstalk-tript/triptopfrontend/templates/itinBuilder.html?,
            *//*data: myString,*//*
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                var results = data.body;
                //results
                results=JSON.parse(results);
                console.log(results);

                *//*$.each(function(k,v)

                )
                $(results).each(function(key, value) {
                    var locationObj = value.0;
                    console.log(locationObj);
                });*//*

                var i = 0;
                $.each(results, function(key, value){
                    *//*console.log(value.0);*//*
*//*
                    var locationObj = '<tr><td class="text-center">' + '  ' + '</td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td></tr>';
*//*
                    var locationObj = '<tr class="content '+value[12]+'" id='+i+'><td class="text-center"><input class="add_eventL" onClick="add_event_loc('+i+');" type="button" value="Add"/></td><td class="text-center">' + value[1] + '</td><td class="text-center">' + value[2] +', ' + value[3] + ', ' + value[4] +' ' + value[5] + '</td><td class="text-center">' + value[8] + '</td><td class="text-center">' + '$' + value[9] + '</td><td class="text-center">' + value[17] + '</td></tr>';
                    console.log(locationObj);

                    i++;
                    $('#locations').append(locationObj);
                    *//*add 'add' button to add the event to the schedule*//*
                    *//*need to be able to filter choices*//*
                });

            }
        });
    }*/


function add_event_loc(x){

        console.log("add_event is working.");
        var location = document.getElementById(x).cells[1].innerHTML;
        var address = document.getElementById(x).cells[2].innerHTML;
        var link = document.getElementById(x).cells[3].innerHTML;
        var cost = document.getElementById(x).cells[4].innerHTML;
        /*var x = $("#new_location").val(locations[1]);*/
        /*console.log(name);*/
        $("#new_location").val(location);
        $("#new_address").val(address);
        $("#new_link").val(link);
        $("#new_cost").val(cost);
        /*need to change these id's so it will be able to go to template too*/

}




/*<--------------------------------------------------------------------------------------------------------------->*/
/*populate top 5 database*/



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

function add_row(m)
{
console.log("m value: "+m);

 var new_location=document.getElementById("new_location").value;
 var new_address=document.getElementById("new_address").value;
 var new_link=document.getElementById("new_link").value;
 var new_cost=document.getElementById("new_cost").value;


 var table=document.getElementById("data_table_template");

/*
 var table=document.getElementByClass("DayTable"+i);
*/
 var table_len=(table.rows.length)-1;
 var row=table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='location_row"+table_len+"'>"+new_location+"</td><td id='address_row"+table_len+"'>"+new_address+"</td><td id='link_row"+table_len+"'>"+new_link+"</td><td id='cost_row"+table_len+"'>"+new_cost+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'><input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'><input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

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



/*function deleteCookies(){
        $.removeCookie("departuretime1", departuretime1);
        $.removeCookie("arrivaltime1", arrivaltime1);
        $.removeCookie("departuretime2", departuretime2);
        $.removeCookie("arrivaltime2", arrivaltime2);
        $.removeCookie("departuredate", departuredate);
        $.removeCookie("returndate", returndate);
        $.removeCookie("origin1", origin1);
        $.removeCookie("origin2", origin2);
        $.removeCookie("destination1", destination1);
        $.removeCookie("destination2", destination2);
        $.removeCookie("isRoundTrip", isRoundTrip);
        $.removeCookie("isFlight", isFlight);
        $.removeCookie("adultCount", adultCount);
        $.removeCookie("childCount", childCount);
}*/






$(window).bind('beforeunload', function(){
    deleteAllCookies();
    return "Are you sure you want to leave without saving? All itinerary information will be deleted.";
    console.log("This method works")


    });


/*
$(function () {

    var specialElementHandlers = {
        '#editor': function (element,renderer) {
            return true;
        }
    };
 $('#saveItin').click(function () {
        var doc = new jsPDF();
        doc.fromHTML(
            $('.main').html(), 15, 15,
            { 'width': 170, 'elementHandlers': specialElementHandlers },
            function(){ doc.save('myItinerary-file.pdf'); }
        );

    });
});*/



