function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
ajax_get('https://www.freeriderhd.com/t/1009?ajax=true', function(data) {
    document.getElementById("title").innerHTML = data["title"];
 
    var html = "<h2>" + data["title"] + "</h2>";
    html += "<h3>" + data["description"] + "</h3>";
    html += "<ul>";
       for (var i=0; i < data["articles"].length; i++) {
           html += '<li><a href="' + data["articles"][i]["url"] + '">' + data["articles"][i]["title"] + "</a></li>";
       }
    html += "</ul>";
    document.getElementById("text").innerHTML = html;
});
function ParseURLParameter(p){
    var m = window.location.search.substring(1);
    var c = m.split('=');
    if(c[0] == p){
        return c[1]	
    }
}

var p = ParseURLParameter('id');
if(typeof p !== 'undefined'){
    if(p == 'test'){
        alert(p);
    }
} else {
    alert('Nope')
}