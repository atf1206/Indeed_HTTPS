## HTTPS converter for Indeed.com
By Andrew Fritz

### Purpose

Why not just get your feed directly from indeed.com you say? This service supports HTTPS, whereas Indeed.com does not.

### Functionality

index.js runs a server (or Heroku app) using Express + Node.js that fetches Indeed.com jobs on demand. The fetch is triggered by visiting www.your address.com/indeed. Or use this for your ajax call:

```javascript
function myGetIndeed(sourceArray) 
  {
  var url = "https://indeedpassthrough.herokuapp.com/indeed";
  $.ajax({
    url: url,
    dataType: 'jsonp'
    }).done(function(result) {
      myPasteIndeed(result);      // sent here for parsing, see below
    }).fail(function(err) {
      throw err;
  });
}
```
 
The return is in JSON format with arrays. To parse the JSON returned, try this code snippet here:

```javascript
function myPasteIndeed(result) {
    $("#results").empty();
    var obj = JSON.parse(result);
    var myobj = obj["response"][0]["results"][0]["result"];
    for (var i = 0; i < 6; i++) {
      $("#results").append("<div class='job'><a target='_blank' href='" +myobj[i]["url"]+ "' class='jobtitle'>" +myobj[i]["jobtitle"]+ "</a><br><span class='company_location'><span class='company'>" +myobj[i]["company"]+ "</span> - <span class='location'>" +myobj[i]["formattedLocation"]+ "</span></span></div>");
    }
}
```

### Live Site
[http://indeedpassthrough.herokuapp.com](http://indeedpassthrough.herokuapp.com)
