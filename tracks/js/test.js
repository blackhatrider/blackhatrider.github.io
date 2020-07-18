function ajaxCode(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText.slice(2,-2)).code);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function ajaxTitle(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText.slice(2,-2)).title);
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
async function Inject(){
    var p = ParseURLParameter('id');
    if(typeof p != 'undefined'){
        const code = await new Promise(x => ajaxCode(`https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${p}/track-data-v1.js`, x))
        let inject = document.createElement('script');
        inject.innerHTML = `(BH.game || cr).ride('${code}')`
        document.head.appendChild(inject);
        const title = await new Promise(x => ajaxTitle(`https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${p}/track-data-v1.js`, x))
        document.getElementsByTagName("title")[0].innerHTML = `${title} | Black Hat Rider 2`
        console.log(title)
    }
};
Inject()