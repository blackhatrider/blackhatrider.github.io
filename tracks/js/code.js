async function ajax({ url, method, body, headers }, callback = () => {}) {
    return await new Promise(function(resolve, reject) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
                resolve(xmlhttp.responseText);
            }
        };
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    });
}

function parseURLParameter(t) {
    const e = window.location.search.substring(1).split(/\u0026/g).map(t => t.split(/\u003D/g));
    const i = e.find(e => e[0] == t);
    return i?.[1];
}

let p = parseURLParameter('id');
if (typeof p != 'undefined') {
    ajax({
        url: "https://cors-anywhere.herokuapp.com/https://www.freeriderhd.com/shuffled?ajax"
    }).then(t => {
        for (const e of t.tracks) {
            ajax({
                url: "https://cors-anywhere.herokuapp.com/https://www.freeriderhd.com/t/" + e.slug + "?ajax"
            }).then(t => {
                document.getElementById("content").innerHTML += "<a href=\"/tracks/track?id=\"" + t.track.id + "\"><img src=\"" + e.thmb + "\"></a>";
            });
        }
    });
}
