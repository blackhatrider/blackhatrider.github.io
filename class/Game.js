import Track from "./track/Track.js";

export default class {
    constructor(t) {
        this.track = new Track(t);

        this.fps = 25;
        this.ms = 1000 / this.fps;
        this.lastTime = -1;
        this.frame = null;
    }
    static async request({ method, path, headers, body }, callback = () => {}) {
        return await new Promise((resolve, reject) => {
            const res = new XMLHttpRequest();
            res.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    callback(JSON.parse(this.responseText));
                    resolve(JSON.parse(this.responseText));
                }
            }
            res.open(method, path, true);
            headers && Object.entries(headers).map(([t, e]) => res.setRequestHeader(t, e));
            res.send([headers["Content-Type"], headers["content-type"]].includes("application/json") ? JSON.stringify(body) : new URLSearchParams(body));
        });
    }
    startTicker(time) {
        this.frame = requestAnimationFrame(this.startTicker.bind(this));
        this.delta = time - this.lastTime;
        if (this.delta < (1000 / this.fps)) {
            this.track.render();
            return;
        }
        this.lastTime = time;
        this.track.update(this.delta);
        this.track.render();
    }
    close() {
        cancelAnimationFrame(this.frame);
    }
}