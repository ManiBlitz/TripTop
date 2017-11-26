
//Get and Set Location of Client

    $.get('https://ipinfo.io', function(response)
    {
        console.log(response.city);
        console.log(response.country);
        console.log(response.region);

        var city = response.city;
        var country = response.country;
        var region = response.region;

        $('#inputOrigin1').val(city + ", " + region + ", " + country);

        
    }, "jsonp")

