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
function ParseURLParameter(p){
    var m = window.location.search.substring(1);
    var c = m.split('=');
    if(c[0] == p){
        return c[1]	
    }
}
var p = ParseURLParameter('id');
if(typeof p != 'undefined'){
    const t = new Promise(x => ajax_get(`https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${p}/track-data-v1.js`, x)).t
    (BH.game || cr).ride(`${t}`)
}