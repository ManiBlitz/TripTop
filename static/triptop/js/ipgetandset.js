
//Get and Set Location of Client

    $.get('https://ipinfo.io', function(response)
    {
        console.log(response.loc);
        var latlongString = response.loc;
        
    }, "jsonp")
