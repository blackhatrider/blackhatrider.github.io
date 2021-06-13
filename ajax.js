async function ajax({ url, method, body = {}, headers = {} }, callback = () => {}) {
    return await new Promise(function(resolve, reject) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
                resolve(xmlhttp.responseText);
            }
        };
        xmlhttp.open(method, url, true);
        xmlhttp.send(headers["content-type"] == "x-www-form-urlencoded" ? new URLSearchParams(body) : JSON.stringify(body));
    });
}

function parseURLParameter(t){
    const e = window.location.search.substring(1).split(/\u0026/g).map(t => t.split(/\u003D/g));
    const i = e.find(e => e[0] == t);
    return i?.[1];
}
