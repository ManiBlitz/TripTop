function signIn(googleUser)
{
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    var profile = googleUser.getBasicProfile();
    $('.g-signin2').css("display", "none");
    $('.data').css("display", "block");
    $('#pic').attr('src', profile.getImageUrl());
    $('#email').text(profile.getEmail());
    var email = profile.getEmail();
    var picurl = profile.getImageUrl();

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://yourbackend.example.com/tokensignin');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onload = function() {
    //   console.log('Signed in as: ' + xhr.responseText);
    // };
    // xhr.send('idtoken=' + id_token);
    // xhr.success(data);
    // results=data.body;
    //
    //
    // console.log(results);

    var userToken = {'id_token':id_token};

    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/auth', // the url where we want to POST
        crossDomain: true,
        dataType: 'json',
        data: JSON.stringify(userToken), // our data object
        encode: true,

        // using the done promise callback
        success: function (data) {
            var results = JSON.parse(data.body);

            console.log(results);
        }
    });


//     var origin = $('#inputOrigin1').val().toString();
//         var destination = $('#inputDestination1').val().toString();
//
//
//         var yourObject = {
//             "origin": origin,
//             "destination": destination
//         };
//
//         var myString = JSON.stringify(yourObject);
//
//         var myEndpoint = "https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/test/airports";
//
//         $.ajax({
//             url: myEndpoint,
//             type: 'POST',
//             crossDomain: true,
//             data: myString,
//             dataType: 'json',
//             contentType: "application/json",
//             success: function (data) {
//                 console.info(data);
//
//                 $.each(data[OriginAirports],function(key,value) {
//                     $.each(data,function(i,value) {
//                         $('#inputOrigin2').append('<option value=\"' + value + '\">' + i + '</option>');
//                     });
//                 });
//
//                 $.each(data,function(key,value) {
//                     $('#inputDestination2').append('<option value=\"' + value + '\">' + key + '</option>');
//                 });
//
//             }
//         });
}

function signOut()
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){

        alert("You have been successfully signed out");

        $('.g-signin2').css("display", "block");
        $('.data').css("display", "none");

    });
}


