export default class {
    constructor() {
        this.t = 0;
        this.e = 0;
        this.i = 0;
        this.s = 0;
        this.n = 0;
        this.old = {
            t: 0,
            e: 0,
            i: 0,
            s: 0,
            n: 0,
            get up() {
                return this.t;
            },
            get down() {
                return this.e;
            },
            get left() {
                return this.i;
            },
            get right() {
                return this.s;
            },
            get z() {
                return this.n;
            },
            set up(t) {
                return this.t = t;
            },
            set down(t) {
                return this.e = t;
            },
            set left(t) {
                return this.i = t;
            },
            set right(t) {
                return this.s = t;
            },
            set z(t) {
                return this.n = t;
            }
        }
    }
    isButtonDown(t) {
        switch(t) {
            case "up":
                return this.t;
            case "down":
                return this.e;
            case "left":
                return this.i;
            case "right":
                return this.s;
            case "z":
                return this.n;
        }
    }
    setButtonDown(t) {
        switch(t) {
            case "up":
                return this.t = 1;
            case "down":
                return this.e = 1;
            case "left":
                return this.i = 1;
            case "right":
                return this.s = 1;
            case "z":
                return this.n = 1;
        }
    }
    setButtonUp(t) {
        switch(t) {
            case "up":
                return this.t = 0;
            case "down":
                return this.e = 0;
            case "left":
                return this.i = 0;
            case "right":
                return this.s = 0;
            case "z":
                return this.n = 0;
        }
    }
    reset() {
        this.t = 0;
        this.e = 0;
        this.i = 0;
        this.s = 0;
        this.n = 0;
        this.old.t = 0;
        this.old.e = 0;
        this.old.i = 0;
        this.old.s = 0;
        this.old.n = 0;
    }
    get up() {
        return this.t;
    }
    get down() {
        return this.e;
    }
    get left() {
        return this.i;
    }
    get right() {
        return this.s;
    }
    get z() {
        return this.n;
    }
    set z(t) {
        this.n = t;
    }
}