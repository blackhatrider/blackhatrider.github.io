import Vector from "../../Vector.js";

export default class Mass {
    constructor(t = new Vector(), e = new Vector(), i = 10) {
        this.pos = t.clone();
        this.old = t.clone();
        this.real = t.add(e);
        this.vel = e.clone();
        this.size = i;
    }
    update(t) {
        this.real = this.pos.add(this.vel.scale(t));
    }
}