function ajax(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log(JSON.parse(xmlhttp.responseText.slice(2,-2)).code);
            callback(JSON.parse(xmlhttp.responseText.slice(2,-2)).code);
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
async function test(){
    var p = ParseURLParameter('id');
    if(typeof p != 'undefined'){
        const t = await new Promise(x => ajax(`https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${p}/track-data-v1.js`, x))
        let inject = document.createElement('script');
        inject.innerHTML = `(BH.game || cr).ride('${t}')`
        document.head.appendChild(inject);
    }
};
test()