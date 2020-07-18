function ajax(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText.slice(2,-2)));
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function ajaxId(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
async function Inject(){
    const data = await new Promise(x => ajaxId(`https://cors-anywhere.herokuapp.com/https://www.freeriderhd.com/shuffled?ajax`, x))
    for (i = 0; i < data.tracks.length; i++) {
        const dat = await new Promise(x => ajaxId(`https://cors-anywhere.herokuapp.com/https://www.freeriderhd.com/t/${data.tracks[i].slug}?ajax`, x))
        document.getElementById("content").innerHTML += `<a href="/tracks/track?id=${dat.track.id}"><img src="${data.tracks[i].thmb}"></a>`
    }
    // data.tracks.forEach((data)=>{
    //     document.getElementById("content").innerHTML += `<a href="/tracks/track?id=${data.slug.substring(0,-1)}"><img src="${data.thmb}"></a>`
    //     //console.log(dat)
    // });
    // const code = await new Promise(x => ajax(`https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${data.track.id}/track-data-v1.js`, x))
    // document.getElementsByTagName("title")[0].innerHTML = `${code.title} | Black Hat Rider 2`
    // document.getElementById("title").innerHTML = code.title
    // let inject = document.createElement('script');
    // inject.innerHTML = `(BH.game || cr).ride('${code.code}')`
    // document.head.appendChild(inject);
};
Inject()