/**
 * Created by Michael on 10/27/2017.
 */





      $(document).ready(function() {






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

           var $container = $('#flightsTable'),
           $scrollTo = $('#flight15');
           $('findFlights').on('click', [],$container.scrollTop($scrollTo.offset().top - $container.offset().top + $container.scrollTop()));


              $orgString = $('#inputOrigin1');
              var region;
              var country;
              var city;

              $.get("https://ipinfo.io", function(response) {
                  region = response.region;
                  country = response.country;
                  city = response.city;

                  $orgString.setValue(city + ", " + region + ", " + country);


                }, "jsonp");

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



      $('.carousel').carousel({
        interval: 6000
      });






      });



    // process the form
    function getAirports(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        // var params = {
        //     origin : '',
        //     destination : ''
        // };

        var origin = $('#inputOrigin1').val().toString();
        var destination = $('#inputDestination1').val().toString();


        var yourObject = {
            "origin": origin,
            "destination": destination
        };

        var myString = JSON.stringify(yourObject);

        // params.origin = ('#inputOrigin1').val();
        // params.destination = ('#inputDestination1').val();

        var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/airports";


        // $.postJSON = function(url, params, callback) {
        //     return jQuery.ajax({
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     'type': 'POST',
        //     'url': url,
        //     'data': yourObject,
        //     'dataType': 'json',
        //     'success': callback
        //     });
        // };

        $.ajax({
            url: "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/airports",
            type: 'POST',
            crossDomain: true,
            data: myString,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                console.info(data);

                $.each(data.body,function(key,value) {
                    $.each(body.OriginAirports,function(i,value) {
                        $('#inputOrigin2').append('<option value=\"' + value + '\">' + i + '</option>');
                    });
                });

                $.each(data,function(key,value) {
                    $('#inputDestination2').append('<option value=\"' + value + '\">' + key + '</option>');
                });

            }
        });
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
    //             console.log(data);
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

    //    $('#flightDetailsForm').submit(function(event) {
    //
    //        var $origin =  $('#inputOrigin2').find(":selected").text(),
    //            $destination = $('#inputDestination2').find(":selected").text(),
    //            $date = $('#depdate').val(),
    //            $childCount = $('#sel2').find(":selected").text(),
    //            $adultCount = $('#sel1').find(":selected").text();
    //
    //            // get the form data
    //         // there are many ways to get this data using jQuery (you can use the class or id also)
    //         var formData = {
    //             "origin" : $origin,
    //             "destination" : $destination,
    //             "date" : $date,
    //             "childCount" : $childCount,
    //             "adultCount" : $adultCount
    //         };
    //
    //         // process the form
    //         $.ajax({
    //             type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
    //             url         : 'https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/airports', // the url where we want to POST
    //             data        : JSON.parse(formData), // our data object
    //             dataType    : 'json', // what type of data do we expect back from the server
    //                         encode          : true
    //         })
    //         // using the done promise callback
    //         .done(function(data) {
    //
    //             $.each(data.body.possibleTrips, function(key,value) {
    //                 var i = 1;
    //                 var newFlight = '<tr id=\"flight'+ i +'\" class="modal"><td><a href=\"https://www.mytriptop.com/itinBuilder.html\" id=\"flight'+i+'price\" value=\"'+value.saleTotal+'\"></a></td><td><label id=\"flight1airline\" value=\"\"></label></td><td><label id=\"flight'+i+'dates\" value=\"'+value.date+'\"></label></td><td><label id=\"flight'+i+'duration\" value=\"'+value.duration+'\"></label></td><td><label id=\"flight'+i+'stops\" value=\"'+(value.legCount-1)+'\"></label></td></tr>';
    //                 i++;
    //             });
    //
    //             // log data to the console so we can see
    //             console.log(data);
    //
    //             // here we will handle errors and validation messages
    //         });
    //
    //     // stop the form from submitting the normal way and refreshing the page
    //     event.preventDefault();
    // });

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







            // $('#triptime1').on('click', function() {
            //     document.getElementById('#scrollToFlights').scrollIntoView();
            // });


