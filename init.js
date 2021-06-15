function parseURLParameter(t){
    const e = window.location.search.substring(1).split(/\u0026/g).map(t => t.split(/\u003D/g));
    const i = e.find(e => e[0] == t);
    return i?.[1];
}

fetch("/header.html").then(async response => (document.querySelector("header").innerHTML = await response.text())).then(t => {
    const dark = document.getElementById("dark");
    if (JSON.parse(localStorage.dark)) {
        dark.checked = true;
    }

    dark.onclick = function() {
        localStorage.setItem("dark", this.checked);
        link.href = localStorage.dark == "true" ? "/dark.css" : "/light.css";
    }
    
    const auto_pause = document.getElementById("auto_pause");
    if (JSON.parse(localStorage.pauseOnEnter)) {
        auto_pause.checked = true;
    }

    auto_pause.onclick = function() {
        localStorage.setItem("pauseOnEnter", this.checked);
    }

    const link = document.createElement("link");
    link.href = localStorage.dark == "true" ? "/dark.css" : "/light.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
})

fetch("/footer.html").then(async response => (document.querySelector("footer").innerHTML = await response.text()));
