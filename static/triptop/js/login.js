$(document).ready(function() {

    $('.data').hide();


    if($.session.get("userID") != null) {
        var userID = $.session.get("userID");
        var firstname = $.session.get("firstname");
        var lastname = $.session.get("lastname");
        var fullname = $.session.get("fullname");
        var email = $.session.get("email");
        var picurl = $.session.get("picurl");

        console.log("This is working.");

        $('#loginButton').hide();
        $('#userInfoNav').show();
        $('#forumDropdown').show();
        $('#profilePic').attr('src', picurl);
        $('#emailDisplay').text(email);
        $('.navbar-inverse').css({'max-height':'52px'});
        console.log("If");


    } else {
        $('#userInfoNav').hide();
        $('#forumDropdown').hide();
        $('#loginButton').show();
        console.log("Else");
        console.log($.session.get("userID"));
    }


});


function signIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    $.session.set("userID", id_token);
    var profile = googleUser.getBasicProfile(id_token);
    console.log(profile);

    var email = profile.getEmail();
    var picurl = profile.getImageUrl();
    var userID = profile.Eea;
    var firstname = profile.ofa;
    var lastname = profile.wea;
    var fullname = profile.ig;

    $.session.set("userID", userID);
    $.session.set("firstname", firstname);
    $.session.set("lastname", lastname);
    $.session.set("fullname", fullname);
    $.session.set("email", email);
    $.session.set("isLoggedIn", true);
    $.session.set("picurl", picurl);


    $('.g-signin2').css("display", "none");
    $('.data').css("display", "block");
    $('#pic').attr('src', picurl);
    $('#email').text(email);
    $('.navbar-inverse').css({'max-height': '52px'});

    $('#userInfoNav').show();
    $('#forumDropdown').show();
    $('#loginButton').hide();
    $('#profilePic').attr('src', picurl);
    $('#emailDisplay').text(email);


    var userToken = {'id_token': id_token};

    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'https://oeij9npzf6.execute-api.us-east-2.amazonaws.com/prod/auth', // the url where we want to POST
        crossDomain: true,
        dataType: 'json',
        data: JSON.stringify(userToken), // our data object
        encode: true,

        // using the done promise callback
        success: function (data) {
            console.log(data);
            var results = JSON.parse(data.body);
            results = JSON.parse(results);

            console.log(results);
        }
    });


    window.location.href = 'myProfile.html';
}


function signOut()
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){

        alert("You have been successfully signed out. Safe travels!");

        $('.g-signin2').css("display", "block");
        $('.data').css("display", "none");
        $('#loginButton').show();
        $('#userInfoNav').hide();
        $('#forumDropdown').hide();
        $.session.clear();
        $.session.set("isLoggedIn", false);

        window.location.href = 'login.html';


    });
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}


function scrollToAboutUs() {

    window.location.href = "index.html";

     $('html, body').animate({
        scrollTop: $("#scrollToAboutUs").offset().top
     }, 2000);


  };

  function scrollToTeam() {

    window.location.href = "index.html";

     $('html, body').animate({
        scrollTop: $("#scrollToTeam").offset().top
     }, 2000);


  };
