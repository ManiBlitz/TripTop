/**
 * Created by Michael on 10/27/2017.
 */

    var flightsBool = true;
    var isFlight=false;



      $(document).ready(function() {


          $('.carousel').carousel({
            interval: 6000,
          });


          // $('#flightsModal').modal('show');

          $('.carousel-caption').css({'color':'#fff','background':'rgba(10,10,10,.5)', 'padding':'4em 2em 1em 2em'});

          $('.carousel-caption h1').css({'font-size':'4rem','padding':'2rem .5rem 1rem .5rem'});

          $('#carouselcaret').css({'margin-bottom':'1em','font-size':'3em'});

          $('.bigcaret').css({'background':'rgba(0,0,0,0)','border':'rgba(0,0,0,0)'});

          $('.btn-lg').css({'margin-bottom':'1em'});

           $('#depdate').datepicker({
              format: 'yyyy-mm-dd'
           });
           $('#retdate').datepicker({
               format: 'yyyy-mm-dd'
           });

           // var $container = $('#flightsTable'),
           // $scrollTo = $('#flight1');
           // $('#findFlights').on('click', [],$container.scrollTop($scrollTo.offset().top - $container.offset().top + $container.scrollTop()));

             $('modal-content.h4').css({
                  'font-size':'1.6em','color':'#000','font-weight':'bold'
              });


        if (matchMedia) {
          const mq1 = window.matchMedia('(min-width: 800px)');
          mq1.addListener(WidthChange);
          WidthChange(mq1);
        }

        // media query change
        function WidthChange(mq1) {
          if (mq1.matches) {
            $('.carousel-caption h1').show();
          } else {
            $('.carousel-caption h1').css({'font-size':'2rem','padding':'.1rem .05rem .1rem .05rem'});
          }

        }








      });


  function roundtripEvent(event) {
      $('#retdate').show();
      flightsBool = true;
  }

  function onewayEvent(event) {
      $('#retdate').hide();
      flightsBool = false;
  }

function scrollToFlights() {


     $('html, body').animate({
        scrollTop: $("#scrollToFlights").offset().top
     }, 2000);


  };

  function scrollToAboutUs() {


     $('html, body').animate({
        scrollTop: $("#scrollToAboutUs").offset().top
     }, 2000);


  };

  function scrollToTeam() {


     $('html, body').animate({
        scrollTop: $("#scrollToTeam").offset().top
     }, 2000);


  };



    // process the form
    function getAirports(event) {


        var origin = $('#inputOrigin1').val().toString();
        var destination = $('#inputDestination1').val().toString();


        var yourObject = {
            "origin": origin,
            "destination": destination
        };

        var myString = JSON.stringify(yourObject);

        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/airports";

        $.ajax({
            url: myEndpoint,
            type: 'POST',
            crossDomain: true,
            data: myString,
            success: function (data) {
                var results = data.body;
                $('#inputOrigin2').empty();
                $('#inputDestination2').empty();

                results = JSON.parse(results);

                //console.log(results);

                $(results).each(function(key, value) {

                        var OriginObj = value.OriginAirports;
                        var DestObj = value.DestinationAirports;
                        //console.log(OriginObj);
                        $.each(OriginObj, function(k,v) {
                            //console.log(v.Name);
                            //console.log(v.IATAcode);
                            var name = v.Name;
                            var iata = v.IATAcode;
                            $('#inputOrigin2').append('<option value=\"' + iata + '\">' + name + ' - ' + iata + '</option>');

                        });

                        $.each(DestObj, function(i,o) {
                            //console.log(o.Name);
                            //console.log(o.IATAcode);
                            var name = o.Name;
                            var iata = o.IATAcode;
                            $('#inputDestination2').append('<option value=\"' + iata + '\">' + name + ' - ' + iata + '</option>');
                        });



                });
            }
        });
    }


    function addMinutes(timeString, addMinutes) {
        if (!timeString.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/))
            return null;
        var timeSplit = timeString.split(':');
        var hours = parseInt(timeSplit[0]);
        var minutes = parseInt(timeSplit[1]) + parseInt(addMinutes);
        hours += Math.floor(minutes / 60);
        while (hours >= 24) {
            hours -= 24;
        }
        minutes = minutes % 60;
        return ('0' + hours).slice(-2) + ':' + ('0' +minutes).slice(-2);

        }




    //     $.ajax({
    //         url: myEndpoint,
    //         type: 'POST',
    //         crossDomain: true,
    //         data: JSON.stringify(yourObject),
    //         dataType: 'json',
    //         contentType: "application/json",
    //         success: function (data) {
    //             console.info(data);
    //         }
    //     });
    // });

        // process the form
    //     $.ajax({
    //         type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
    //         url         : 'https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/airports', // the url where we want to POST
    //         data        :  yourObject, // our data object
    //         dataType    : 'json', // what type of data do we expect back from the server
    //                     encode          : true
    //     })
    //         // using the done promise callback
    //         .done(function(data) {
    //
    //             $.each(data.body, function(key,value) {
    //                 var newOriginAirport = '<option value=\"'+ value +'\">' + key + '</option>';
    //                 $('#inputOrigin2').append(newOriginAirport);
    //                 var newDestinationAirport = '<option value=\"'+ value +'\">' + key + '</option>';
    //                 $('#inputDestination2').append(newDestinationAirport);
    //             });
    //
    //             // log data to the console so we can see
    //             //console.log(data);
    //
    //             // here we will handle errors and validation messages
    //         });
    //
    //     // stop the form from submitting the normal way and refreshing the page
    //     event.preventDefault();
    // });



      // $('#getAirports').click(function(event) {
      //     event.preventDefault();
      //
      //     $.post("https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/airports", $('#airportDetailsForm').serialize(), function (data) {success(function (result) {
      //             $.each(result, function (i, value) {
      //                 $('#inputOrigin2').append($('<option>').text(value).attr('value', value));
      //             });
      //             $.each(result, function (i, value) {
      //                 $('#inputDestination2').append($('<option>').text(value).attr('value', value));
      //             });
      //         }, 'json');
      //     });
      // });

          // var $form = $('#airportDetailsForm'),
          //     inputOrigin = JSON.stringify($form.find("#inputOrigin1").val()),
          //     inputDestination = JSON.stringify($form.find("#inputDestination1").val()),
          //     url = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/airports";
          //
          // var request = {param1: inputOrigin, param2: inputDestination};
          //
          // $.post(url,request).success(function(data) {
          //     $.each(data.response.body, function(index, value) {
          //         var Origin = this.OriginAirports;
          //         var Destination = this.DestinationAirports;
          //
          //         $.each(Origin, function() {
          //             $('#inputOrigin2').append("<option>" + this.text + "</option>");
          //         },'json');
          //
          //         $.each(Destination, function() {
          //             $('#inputDestination2').append("<option>" + this.text + "</option>");
          //         },'json');
          //     },'json');
          //     // var origin = $(data).find("origin");
          //     // $("#inputOrigin2").append("<option>" + origin + "</option>");
          //     // var destination = $(data).find("destination");
          //     // $("#inputDestination2").append("<option>" + destination + "</option>");
          // },'json');
      //
      //
      // });
function getNumbers(inputString){
    var regex=/\d+\.\d+|\.\d+|\d+/g,
        results = [],
        n;

    while(n = regex.exec(inputString)) {
        results.push(parseFloat(n[0]));
    }

    return results;
}

function setTime(timeInput) {
    var time = timeInput; // your input

    time = time.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    // calculate
    var TimeValue;

    if (hours > 0 && hours <= 12)
    {
      TimeValue= "" + hours;
    } else if (hours > 12)
    {
      TimeValue= "" + (hours - 12);
    }
    else if (hours == 0)
    {
      TimeValue= "12";
    }

    TimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    TimeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

    //console.log(TimeValue);
    return TimeValue;
}



function getFlights(event) {

    //console.log(flightsBool);
    $('#flights').empty();

    if (flightsBool == false) {

        onewayFlights(event);
        return false;

    } else if (flightsBool == true) {

        roundTripFlights(event);
        return false;

    }

    event.preventDefault();
}

        function onewayFlights(event) {


            var $origin = $('#inputOrigin2').find(":selected").val(),
                $destination = $('#inputDestination2').find(":selected").val(),
                $date = $('#depdate').val(),
                $childCount = $('#sel2').find(":selected").text(),
                $adultCount = $('#sel1').find(":selected").text();

            var formData = {
                "origin": $origin,
                "destination": $destination,
                "date": $date,
                "childCount": parseInt($childCount),
                "adultCount": parseInt($adultCount)
            };

            // process the form
            $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: 'https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/flights', // the url where we want to POST
                crossDomain: true,
                dataType: 'json',
                data: JSON.stringify(formData), // our data object
                encode: true,

                // using the done promise callback
                success: function (data) {
                    results = data.body;
                    results = JSON.parse(results);
                    results = JSON.parse(results);

                    //console.log(results);

                    var i = 1;



                    $.each(results, function (key, value) {
                        $.each(value, function(k,v) {

                        //console.log(v.FlightInfo);
                        //console.log(v.StartEnd);
                        //console.log(v.date);
                        //console.log(v.departureTime);
                        //console.log(v.duration);
                        //console.log(v.saleTotal);

                        var startend =  v.StartEnd;
                        var date =  v.date;
                        var departuretime =  v.departureTime;
                        var duration =  v.duration;
                        var saletotal =  v.saleTotal;





                        var durationhours = duration/60;
                        var durationmin = duration%60;

                        durationhours = parseInt(durationhours);

                        var durationFloat = durationhours + " Hours, " + durationmin + " Minutes";

                        departuretime.toString();

                        var dateplusT = date + "T";
                        departuretime = departuretime.replace(dateplusT, '');
                        var deptimestring = departuretime;

                        deptimestring = deptimestring.replace('-01:00', '');
                        deptimestring = deptimestring.replace('-02:00', '');
                        deptimestring = deptimestring.replace('-03:00', '');
                        deptimestring = deptimestring.replace('-04:00', '');
                        deptimestring = deptimestring.replace('-05:00', '');
                        deptimestring = deptimestring.replace('-06:00', '');
                        deptimestring = deptimestring.replace('-07:00', '');
                        deptimestring = deptimestring.replace('-08:00', '');
                        deptimestring = deptimestring.replace('-09:00', '');
                        deptimestring = deptimestring.replace('-10:00', '');
                        deptimestring = deptimestring.replace('-11:00', '');
                        deptimestring = deptimestring.replace('-12:00', '');
                        deptimestring = deptimestring.replace('+00:00', '');
                        deptimestring = deptimestring.replace('+01:00', '');
                        deptimestring = deptimestring.replace('+02:00', '');
                        deptimestring = deptimestring.replace('+03:00', '');
                        deptimestring = deptimestring.replace('+04:00', '');
                        deptimestring = deptimestring.replace('+05:00', '');
                        deptimestring = deptimestring.replace('+06:00', '');
                        deptimestring = deptimestring.replace('+07:00', '');
                        deptimestring = deptimestring.replace('+08:00', '');
                        deptimestring = deptimestring.replace('+09:00', '');
                        deptimestring = deptimestring.replace('+10:00', '');
                        deptimestring = deptimestring.replace('+11:00', '');
                        deptimestring = deptimestring.replace('+12:00', '');

                        departuretime = departuretime.replace('-01:00', ' GMT(-01:00)');
                        departuretime = departuretime.replace('-02:00', ' GMT(-02:00)');
                        departuretime = departuretime.replace('-03:00', ' GMT(-03:00)');
                        departuretime = departuretime.replace('-04:00', ' GMT(-04:00)');
                        departuretime = departuretime.replace('-05:00', ' GMT(-05:00)');
                        departuretime = departuretime.replace('-06:00', ' GMT(-06:00)');
                        departuretime = departuretime.replace('-07:00', ' GMT(-07:00)');
                        departuretime = departuretime.replace('-08:00', ' GMT(-08:00)');
                        departuretime = departuretime.replace('-09:00', ' GMT(-09:00)');
                        departuretime = departuretime.replace('-10:00', ' GMT(-10:00)');
                        departuretime = departuretime.replace('-11:00', ' GMT(-11:00)');
                        departuretime = departuretime.replace('-12:00', ' GMT(-12:00)');
                        departuretime = departuretime.replace('+00:00', ' GMT(+00:00)');
                        departuretime = departuretime.replace('+01:00', ' GMT(+01:00)');
                        departuretime = departuretime.replace('+02:00', ' GMT(+02:00)');
                        departuretime = departuretime.replace('+03:00', ' GMT(+03:00)');
                        departuretime = departuretime.replace('+04:00', ' GMT(+04:00)');
                        departuretime = departuretime.replace('+05:00', ' GMT(+05:00)');
                        departuretime = departuretime.replace('+06:00', ' GMT(+06:00)');
                        departuretime = departuretime.replace('+07:00', ' GMT(+07:00)');
                        departuretime = departuretime.replace('+08:00', ' GMT(+08:00)');
                        departuretime = departuretime.replace('+09:00', ' GMT(+09:00)');
                        departuretime = departuretime.replace('+10:00', ' GMT(+10:00)');
                        departuretime = departuretime.replace('+11:00', ' GMT(+11:00)');
                        departuretime = departuretime.replace('+12:00', ' GMT(+12:00)');

                        //console.log(deptimestring);

                        var GMTstamp = departuretime.replace(deptimestring, '');

                        var arrivaltime = addMinutes(deptimestring, duration);

                        var deptimeoutput = setTime(deptimestring);
                        var arrtimeoutput = setTime(arrivaltime);


                        //console.log(arrtimeoutput);

                        //console.log(deptimeoutput);

                        //console.log(GMTstamp);

                        arrivaltime = arrtimeoutput += GMTstamp;
                        departuretime = deptimeoutput += GMTstamp;

                        //console.log(arrivaltime + " " + departuretime);

                        var saletotalnum = getNumbers(saletotal);
                        saletotalnum = parseFloat(saletotalnum);
                        saletotalnum = saletotalnum.toFixed(2);
                        saletotalnum.toString();
                        saletotal = "$" + saletotalnum;

                        var newFlight = '<tr id=\"flight' + i + '\"><td id=\"addflight'+i+'\"><a href=\"itinBuilder.html\" onClick="goToItinPage(startend, date, departuretime, arrivaltime, duration, saletotal);"><button class=\"btn btn-info btn-sm\" type=\"button\">Add To Itinerary</button></a></td><td id=\"flight' + i + 'price\">' + saletotal + '</td><td><label id=\"flight'+i+'startend\">' + startend + '</label></label></td><td><label id=\"flight'+i+'departureTime\">' + departuretime + '</label></td><td><label id=\"flight'+i+'arrivalTime\">' + arrivaltime + '</label></label></td><td><label id=\"flight' + i + 'dates\">' + date + '</label></td><td><label id=\"flight' + i + 'duration\">' + durationFloat + '</label></td></tr>';

                        $('#flights').append(newFlight);



                        i++;
                    });
                    });

                    // log data to the console so we can see


                    // here we will handle errors and validation messages
                }
            });

            // stop the form from submitting the normal way and refreshing the page
            event.preventDefault();
        }





        function roundTripFlights(event) {




            var $origin = $('#inputOrigin2').find(":selected").val(),
                $destination = $('#inputDestination2').find(":selected").val(),
                $date = $('#depdate').val(),
                $retdate = $('#retdate').val(),
                $childCount = $('#sel2').find(":selected").text(),
                $adultCount = $('#sel1').find(":selected").text();

            var formData = {
                "origin": $origin,
                "destination": $destination,
                "date": $date,
                "returnDate": $retdate,
                "childCount": parseInt($childCount),
                "adultCount": parseInt($adultCount)
            };

            // process the form
            $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: 'https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/flights/roundtrip', // the url where we want to POST
                crossDomain: true,
                dataType: 'json',
                data: JSON.stringify(formData), // our data object
                encode: true,

                // using the done promise callback
                success: function (data) {
                    results = data.body;
                    results = JSON.parse(results);
                    results = JSON.parse(results);

                    //console.log(data);
                    //console.log(results);

                    var i = 1;



                    $.each(results, function (key, value) {
                        $.each(value, function (k, v) {

                            //console.log(v.StartEnd);
                            //console.log(v.date);
                            //console.log(v.departureTime);
                            //console.log(v.duration);
                            //console.log(v.saleTotal);

                            var airline = v.FlightInfo;
                            var startend = v.StartEnd;
                            var date = v.date;
                            var departuretime = v.departureTime;
                            var duration = v.duration;
                            var saletotal = v.saleTotal;
                            var returnFlight = v.returnTrip;

                            var airline2 = returnFlight.FlightInfo;
                            var startend2 = returnFlight.StartEnd;
                            var date2 = $('#retdate').val().toString();
                            var departuretime2 = returnFlight.departureTime;
                            var duration2 = returnFlight.duration;

                            //console.log(date2);
                            //console.log(airline2);
                            //console.log(startend2);
                            //console.log(departuretime2);
                            //console.log(duration2);



                            var durationhours = duration / 60;
                            var durationmin = duration % 60;
                            var duration2hours = duration2 / 60;
                            var duration2min = duration2 % 60;

                            durationhours = parseInt(durationhours);
                            duration2hours = parseInt(duration2hours);


                            var durationFloat = durationhours + " Hours, " + durationmin + " Minutes";
                            var duration2Float = duration2hours + " Hours, " + duration2min + " Minutes";


                            departuretime = departuretime.toString();
                            departuretime2 = departuretime2.toString();


                            var dateplusT = date + "T";
                            var dateplusT2 = date2 + "T";

                            departuretime = departuretime.replace(dateplusT, '');
                            var deptimestring = departuretime;
                            departuretime2 = departuretime2.replace(dateplusT2, '');
                            var deptimestring2 = departuretime2;

                            deptimestring = deptimestring.replace('-01:00', '');
                            deptimestring = deptimestring.replace('-02:00', '');
                            deptimestring = deptimestring.replace('-03:00', '');
                            deptimestring = deptimestring.replace('-04:00', '');
                            deptimestring = deptimestring.replace('-05:00', '');
                            deptimestring = deptimestring.replace('-06:00', '');
                            deptimestring = deptimestring.replace('-07:00', '');
                            deptimestring = deptimestring.replace('-08:00', '');
                            deptimestring = deptimestring.replace('-09:00', '');
                            deptimestring = deptimestring.replace('-10:00', '');
                            deptimestring = deptimestring.replace('-11:00', '');
                            deptimestring = deptimestring.replace('-12:00', '');
                            deptimestring = deptimestring.replace('+00:00', '');
                            deptimestring = deptimestring.replace('+01:00', '');
                            deptimestring = deptimestring.replace('+02:00', '');
                            deptimestring = deptimestring.replace('+03:00', '');
                            deptimestring = deptimestring.replace('+04:00', '');
                            deptimestring = deptimestring.replace('+05:00', '');
                            deptimestring = deptimestring.replace('+06:00', '');
                            deptimestring = deptimestring.replace('+07:00', '');
                            deptimestring = deptimestring.replace('+08:00', '');
                            deptimestring = deptimestring.replace('+09:00', '');
                            deptimestring = deptimestring.replace('+10:00', '');
                            deptimestring = deptimestring.replace('+11:00', '');
                            deptimestring = deptimestring.replace('+12:00', '');

                            departuretime = departuretime.replace('-01:00', ' GMT(-01:00)');
                            departuretime = departuretime.replace('-02:00', ' GMT(-02:00)');
                            departuretime = departuretime.replace('-03:00', ' GMT(-03:00)');
                            departuretime = departuretime.replace('-04:00', ' GMT(-04:00)');
                            departuretime = departuretime.replace('-05:00', ' GMT(-05:00)');
                            departuretime = departuretime.replace('-06:00', ' GMT(-06:00)');
                            departuretime = departuretime.replace('-07:00', ' GMT(-07:00)');
                            departuretime = departuretime.replace('-08:00', ' GMT(-08:00)');
                            departuretime = departuretime.replace('-09:00', ' GMT(-09:00)');
                            departuretime = departuretime.replace('-10:00', ' GMT(-10:00)');
                            departuretime = departuretime.replace('-11:00', ' GMT(-11:00)');
                            departuretime = departuretime.replace('-12:00', ' GMT(-12:00)');
                            departuretime = departuretime.replace('+00:00', ' GMT(+00:00)');
                            departuretime = departuretime.replace('+01:00', ' GMT(+01:00)');
                            departuretime = departuretime.replace('+02:00', ' GMT(+02:00)');
                            departuretime = departuretime.replace('+03:00', ' GMT(+03:00)');
                            departuretime = departuretime.replace('+04:00', ' GMT(+04:00)');
                            departuretime = departuretime.replace('+05:00', ' GMT(+05:00)');
                            departuretime = departuretime.replace('+06:00', ' GMT(+06:00)');
                            departuretime = departuretime.replace('+07:00', ' GMT(+07:00)');
                            departuretime = departuretime.replace('+08:00', ' GMT(+08:00)');
                            departuretime = departuretime.replace('+09:00', ' GMT(+09:00)');
                            departuretime = departuretime.replace('+10:00', ' GMT(+10:00)');
                            departuretime = departuretime.replace('+11:00', ' GMT(+11:00)');
                            departuretime = departuretime.replace('+12:00', ' GMT(+12:00)');

                            deptimestring2 = deptimestring2.replace('-01:00', '');
                            deptimestring2 = deptimestring2.replace('-02:00', '');
                            deptimestring2 = deptimestring2.replace('-03:00', '');
                            deptimestring2 = deptimestring2.replace('-04:00', '');
                            deptimestring2 = deptimestring2.replace('-05:00', '');
                            deptimestring2 = deptimestring2.replace('-06:00', '');
                            deptimestring2 = deptimestring2.replace('-07:00', '');
                            deptimestring2 = deptimestring2.replace('-08:00', '');
                            deptimestring2 = deptimestring2.replace('-09:00', '');
                            deptimestring2 = deptimestring2.replace('-10:00', '');
                            deptimestring2 = deptimestring2.replace('-11:00', '');
                            deptimestring2 = deptimestring2.replace('-12:00', '');
                            deptimestring2 = deptimestring2.replace('+00:00', '');
                            deptimestring2 = deptimestring2.replace('+01:00', '');
                            deptimestring2 = deptimestring2.replace('+02:00', '');
                            deptimestring2 = deptimestring2.replace('+03:00', '');
                            deptimestring2 = deptimestring2.replace('+04:00', '');
                            deptimestring2 = deptimestring2.replace('+05:00', '');
                            deptimestring2 = deptimestring2.replace('+06:00', '');
                            deptimestring2 = deptimestring2.replace('+07:00', '');
                            deptimestring2 = deptimestring2.replace('+08:00', '');
                            deptimestring2 = deptimestring2.replace('+09:00', '');
                            deptimestring2 = deptimestring2.replace('+10:00', '');
                            deptimestring2 = deptimestring2.replace('+11:00', '');
                            deptimestring2 = deptimestring2.replace('+12:00', '');

                            departuretime2 = departuretime2.replace('-01:00', ' GMT(-01:00)');
                            departuretime2 = departuretime2.replace('-02:00', ' GMT(-02:00)');
                            departuretime2 = departuretime2.replace('-03:00', ' GMT(-03:00)');
                            departuretime2 = departuretime2.replace('-04:00', ' GMT(-04:00)');
                            departuretime2 = departuretime2.replace('-05:00', ' GMT(-05:00)');
                            departuretime2 = departuretime2.replace('-06:00', ' GMT(-06:00)');
                            departuretime2 = departuretime2.replace('-07:00', ' GMT(-07:00)');
                            departuretime2 = departuretime2.replace('-08:00', ' GMT(-08:00)');
                            departuretime2 = departuretime2.replace('-09:00', ' GMT(-09:00)');
                            departuretime2 = departuretime2.replace('-10:00', ' GMT(-10:00)');
                            departuretime2 = departuretime2.replace('-11:00', ' GMT(-11:00)');
                            departuretime2 = departuretime2.replace('-12:00', ' GMT(-12:00)');
                            departuretime2 = departuretime2.replace('+00:00', ' GMT(+00:00)');
                            departuretime2 = departuretime2.replace('+01:00', ' GMT(+01:00)');
                            departuretime2 = departuretime2.replace('+02:00', ' GMT(+02:00)');
                            departuretime2 = departuretime2.replace('+03:00', ' GMT(+03:00)');
                            departuretime2 = departuretime2.replace('+04:00', ' GMT(+04:00)');
                            departuretime2 = departuretime2.replace('+05:00', ' GMT(+05:00)');
                            departuretime2 = departuretime2.replace('+06:00', ' GMT(+06:00)');
                            departuretime2 = departuretime2.replace('+07:00', ' GMT(+07:00)');
                            departuretime2 = departuretime2.replace('+08:00', ' GMT(+08:00)');
                            departuretime2 = departuretime2.replace('+09:00', ' GMT(+09:00)');
                            departuretime2 = departuretime2.replace('+10:00', ' GMT(+10:00)');
                            departuretime2 = departuretime2.replace('+11:00', ' GMT(+11:00)');
                            departuretime2 = departuretime2.replace('+12:00', ' GMT(+12:00)');

                            //console.log(deptimestring);
                            //console.log(deptimestring2);
                            //console.log(departuretime2);
                            //console.log(deptimestring2);

                            var GMTstamp = departuretime.replace(deptimestring, '');
                            var GMTstamp2 = departuretime2.replace(deptimestring2, '');

                            //console.log(deptimestring2 + "" + "" + duration2);

                            var arrivaltime = addMinutes(deptimestring, duration);
                            var arrivaltime2 = addMinutes(deptimestring2, duration2);

                            //console.log(arrivaltime2);


                            var deptimeoutput = setTime(deptimestring);
                            var arrtimeoutput = setTime(arrivaltime);
                            var deptimeoutput2 = setTime(deptimestring2);
                            var arrtimeoutput2 = setTime(arrivaltime2);


                            //console.log("1."+arrtimeoutput);
                            //console.log("1."+deptimeoutput);
                            //console.log("1."+GMTstamp);

                            //console.log("2."+arrtimeoutput2);
                            //console.log("2."+deptimeoutput2);
                            //console.log("2."+GMTstamp2);


                            arrivaltime = arrtimeoutput += GMTstamp;
                            departuretime = deptimeoutput += GMTstamp;
                            arrivaltime2 = arrtimeoutput2 += GMTstamp2;
                            departuretime2 = deptimeoutput2 += GMTstamp2;

                            //console.log(arrivaltime + " " + departuretime);
                            //console.log(arrivaltime2 + " " + departuretime2);


                            var saletotalnum = getNumbers(saletotal);
                            saletotalnum = parseFloat(saletotalnum);
                            saletotalnum = saletotalnum.toFixed(2);
                            saletotalnum.toString();
                            saletotal = "$" + saletotalnum;

                            var newFlightAway = '<tr id=\"flight' + i + '\"><td id=\"addflight' + i + '\"><a id=\"flightchoice'+i+'\" onClick="var flightchoice = this.id; goToItinPage(flightchoice);"><button class=\"btn btn-info btn-sm\" type=\"button\">Add To Itinerary</button></a></td><td id=\"flight' + i + 'price\">' + saletotal + '</td><td><label id=\"flight' + i + 'airline\">' + airline + '</label></td><td><label id=\"flight' + i + 'startend\">' + startend + '</label></label></td><td><label id=\"flight' + i + 'departureTime\">' + departuretime + '</label></td><td><label id=\"flight' + i + 'arrivalTime\">' + arrivaltime + '</label></label></td><td><label id=\"flight' + i + 'dates\">' + date + '</label></td><td><label id=\"flight' + i + 'duration\">' + durationFloat + '</label></td></tr>';
                            var newFlightBack = '<tr id=\"flight' + i + 'returnflight\"><td id=\"addflight' + i + '\"><label class=\"text-center\">Return Flight:</label></td><td id=\"flight' + i + 'pricereturn\">Total</td><td><label id=\"flight' + i + 'airline2\">' + airline2 + '</label></td><td><label id=\"flight' + i + 'startendreturn\">' + startend2 + '</label></label></td><td><label id=\"flight' + i + 'departureTimereturn\">' + departuretime2 + '</label></td><td><label id=\"flight' + i + 'arrivalTimereturn\">' + arrivaltime2 + '</label></label></td><td><label id=\"flight' + i + 'datesreturn\">' + date2 + '</label></td><td><label id=\"flight' + i + 'duration\">' + duration2Float + '</label></td></tr>';

                            $('#flights').append(newFlightAway, newFlightBack);

                            i++;
                        });
                    });

                    // log data to the console so we can see


                    // here we will handle errors and validation messages
                }
            });

            // stop the form from submitting the normal way and refreshing the page
            event.preventDefault();
        }



      //
      // });






            // $('#findFlights').on('click', function() {
            //        var adultCount = $('#sel1').val();
            //        var childCount = $('#sel2').val();
            //        var org = 'ATL';  // Fill in from above choices
            //        var des = 'JFK';
            //        var depDate = $('#depdate').val();
            //        var retDate = $('#retdate').val();
            //        var url = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/flights";
            //
            //        $.ajax({
            //            type: 'POST',
            //            url: url,
            //            data: input,
            //            success: function(results){
            //                var price = results.Status;
            //                var airline = results.Name;
            //                $('#flight1').append("<tr>" +  + "</tr");
            //            }
            //        });
            //   });











function goToItinPage(flightchoice) {

        var flightchoicestring = "flightchoice";
        var i = flightchoice.replace(flightchoicestring,'');

        // console.log(i);

        var departuretime1 = $("#flight"+i+"departureTime").text(),
            arrivaltime1 = $("#flight"+i+"arrivalTime").text(),
            departuretime2 = $("#flight"+i+"departureTimereturn").text(),
            arrivaltime2 = $("#flight"+i+"arrivalTimereturn").text(),
            departuredate = $("#flight"+i+"dates").text(),
            returndate = $("#flight"+i+"datesreturn").text(),
            origin1 = $('#inputOrigin2').find(":selected").val(),
            destination1 = $('#inputDestination2').find(":selected").val(),
            origin2 = destination1,
            destination2 = origin1,
            childCount = $("#sel2").find(":selected").val(),
            adultCount = $("#sel1").find(":selected").val(),
            isRoundTrip = flightsBool,
            isFlight=true;


        console.log(departuretime1, arrivaltime1, departuretime2, arrivaltime2, departuredate, returndate, origin1, destination1, origin2, destination2, isRoundTrip, childCount, adultCount);

        $.cookie("departuretime1", departuretime1);
        $.cookie("arrivaltime1", arrivaltime1);
        $.cookie("departuretime2", departuretime2);
        $.cookie("arrivaltime2", arrivaltime2);
        $.cookie("departuredate", departuredate);
        $.cookie("returndate", returndate);
        $.cookie("origin1", origin1);
        $.cookie("origin2", origin2);
        $.cookie("destination1", destination1);
        $.cookie("destination2", destination2);
        $.cookie("isRoundTrip", isRoundTrip);
        $.cookie("isFlight", isFlight);
        $.cookie("adultCount", adultCount);
        $.cookie("childCount", childCount);


        window.location.href = "itinBuilder.html";











}


