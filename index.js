var express = require('express');
var app = express();
var http = require('http');
var parser = require('xml2json');

var port = process.env.PORT || 8000;

app.get('/indeed', function (req, res) {

    var myQuery = "junior+javascript";
    
    http.get("http://api.indeed.com/ads/apisearch?publisher=3112958365234487&q=" +myQuery+ "&l=new+york%2C+ny&sort=&radius=&st=&jt=&start=&limit=6&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&v=2", function (response) {
        var completeResponse = '';
        response.on('data', function (chunk) {
            completeResponse += chunk;
        });
        response.on('end', function() {
            var myJSON = parser.toJson(completeResponse, {arrayNotation: true});
			//res.writeHead(200, { 'Content-Type': 'text/xml' });
			res.jsonp(myJSON);
        });
    });
    
  //res.send('Hello World!');
  //console.log("we got action");
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
