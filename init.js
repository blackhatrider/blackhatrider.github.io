import users from "../users.js";

for (const t of users) {
    if (localStorage.getItem("username") && localStorage.getItem("password") && t.user != localStorage.getItem("username") && t.key == localStorage.getItem("password")) continue;
    if (t.user == localStorage.getItem("username") && t.key == localStorage.getItem("password")) break;
    if (location.pathname != "/default.html") location.href = "/default.html";
}
//if (!localStorage.getItem("username") || !localStorage.getItem("password")) return location.href = "/default.html";

function parseURLParameter(t){
    const e = window.location.search.substring(1).split(/\u0026/g).map(t => t.split(/\u003D/g));
    const i = e.find(e => e[0] == t);
    return i?.[1];
}

fetch("/header.html").then(async response => (document.querySelector("header").innerHTML = await response.text()));

fetch("/footer.html").then(async response => (document.querySelector("footer").innerHTML = await response.text())).then(t => {
    if (!localStorage.getItem("dark")) localStorage.setItem("dark", false);
    if (!localStorage.getItem("pauseOnEnter")) localStorage.setItem("pauseOnEnter", false);
    
    const link = document.createElement("link");
    link.href = JSON.parse(localStorage.dark) ? "/styles/dark.css" : "/styles/light.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    const dark = document.getElementById("dark");
    if (JSON.parse(localStorage.dark)) {
        dark.checked = true;
    }

    dark.onclick = function() {
        localStorage.setItem("dark", this.checked);
        link.href = localStorage.dark == "true" ? "/styles/dark.css" : "/styles/light.css";
    }
    
    const auto_pause = document.getElementById("auto_pause");
    if (JSON.parse(localStorage.pauseOnEnter)) {
        auto_pause.checked = true;
    }

    auto_pause.onclick = function() {
        localStorage.setItem("pauseOnEnter", this.checked);
    }
});
