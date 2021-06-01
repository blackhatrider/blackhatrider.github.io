function ajax(url, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText.slice(2,-2)));
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function ajaxId(url, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function parseURLParameter(t){
    const e = window.location.search.substring(1).split(/\u0026/g).map(t => t.split(/\u003D/g));
    const i = e.find(e => e[0] == t);
    return i?.[1];
}
async function Inject(){
    let p = parseURLParameter('id');
    if(typeof p != 'undefined'){
        if(p != 'random'){
            const data = await new Promise(x => ajax(`https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${p}/track-data-v1.js`, x))
            document.getElementsByTagName("title")[0].innerHTML = `${data.title} | Black Hat Rider 2`
            document.getElementById("title").innerHTML = data.title
            let inject = document.createElement('script');
            inject.innerHTML = `(BH.game || cr).ride('${data.code}')`
            document.head.appendChild(inject);
        }
        if(p == 'random'){
            const dat = await new Promise(x => ajaxId(`https://cors-anywhere.herokuapp.com/https://www.freeriderhd.com/random/track?ajax`, x))
            const code = await new Promise(x => ajax(`https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${dat.track.id}/track-data-v1.js`, x))
            document.getElementsByTagName("title")[0].innerHTML = `${code.title} | Black Hat Rider 2`
            document.getElementById("title").innerHTML = code.title
            let inject = document.createElement('script');
            inject.innerHTML = `(BH.game || cr).ride('${code.code}')`
            document.head.appendChild(inject);
        }
    }
};
Inject()
