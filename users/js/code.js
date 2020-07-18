function ajax(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
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
        const data = await new Promise(x => ajax(`https://cors-anywhere.herokuapp.com/https://www.freeriderhd.com/u/${p}?ajax`, x))
        document.getElementsByTagName("title")[0].innerHTML = `${data.user.d_name} | Black Hat Rider 2`
        document.getElementById("content").innerHTML = `
        <a href="?id=${data.user.d_name}&created=true">${data.user.d_name}
        <br>
        ${data.user_info.about}`
        console.log(data)
    }
};
Inject()