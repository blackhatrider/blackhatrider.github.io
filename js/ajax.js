async function ajax(options, callback = () => {}) {
    return await new Promise(function(resolve, reject) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(JSON.parse(xmlhttp.responseText.slice(2,-2)));
                resolve(JSON.parse(xmlhttp.responseText.slice(2,-2)));
            }
        };
        xmlhttp.open(options.method, options.url, true);
        xmlhttp.send();
    });
}

async function ajaxID(options, callback = () => {}) {
    return await new Promise(function(resolve, reject) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(JSON.parse(xmlhttp.responseText));
                resolve(JSON.parse(xmlhttp.responseText));
            }
        };
        xmlhttp.open(options.method, options.url, true);
        xmlhttp.send();
    });
}

function parseURLParameter(t){
    const e = window.location.search.substring(1).split(/\u0026/g).map(t => t.split(/\u003D/g));
    const i = e.find(e => e[0] == t);
    return i?.[1];
}

let p = parseURLParameter('id');
if (typeof p != 'undefined') {
    if (p != 'random') {
        ajax({
            method: "GET",
            url: `https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${p}/track-data-v1.js`
        }).then(data => {
            document.getElementsByTagName("title")[0].innerHTML = `${data.title} | Black Hat Rider 2`;
            document.getElementById("title").innerHTML = data.title;
            let inject = document.createElement('script');
            inject.innerHTML = `(BH.game || cr).ride('${data.code}')`;
            document.head.appendChild(inject);
        });
    }
    if (p == 'random') {

        ajaxID({
            method: "GET",
            url: `https://cors-anywhere.herokuapp.com/https://www.freeriderhd.com/random/track?ajax`
        }).then(data => {
            ajax({
                method: "GET",
                url: `https://cors-anywhere.herokuapp.com/https://cdn.freeriderhd.com/free_rider_hd/tracks/prd/${data.track.id}/track-data-v1.js`
            }).then(code => {
                document.getElementsByTagName("title")[0].innerHTML = `${code.title} | Black Hat Rider 2`;
                document.getElementById("title").innerHTML = code.title;
                let inject = document.createElement('script');
                inject.innerHTML = `(BH.game || cr).ride('${code.code}')`;
                document.head.appendChild(inject);
            });
        });
    }
}
