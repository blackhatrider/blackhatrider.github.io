import Vector from "./Vector.js";

export default class Spring {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.leff = this.lrest = 40;
        this.dampConstant = 0.5;
        this.springConstant = 0.7
    }
    lean(a) {
        this.leff += (this.lrest - a - this.leff) / 5
    }
    rotate(a) {
        let d = this.b.pos.sub(this.a.pos);
        let p = new Vector(-d.y / this.leff, d.x / this.leff);
        this.a.pos.addToSelf(p.scale(a));
        this.b.pos.addToSelf(p.scale(-a));
    }
    swap() {
        let a = new Vector();
        a.copy(this.a.pos);
        this.a.pos.copy(this.b.pos);
        this.b.pos.copy(a);
        a.copy(this.a.old);
        this.a.old.copy(this.b.old);
        this.b.old.copy(a);
        a.copy(this.a.vel);
        this.a.vel.copy(this.b.vel);
        this.b.vel.copy(a);
        a = this.a.rotation;
        this.a.rotation = this.b.rotation;
        this.b.rotation = a
    }
    getLength() {
        return this.b.pos.sub(this.a.pos).getLength()
    }
    clone() {
        const spring = new Spring(this.a, this.b);
        spring.lrest = this.lrest;
        spring.leff = this.leff;
        spring.dampConstant= this.dampConstant;
        spring.springConstant = this.springConstant;
        return spring;
    }
    update() {
        let distance = this.b.pos.sub(this.a.pos);
        let length = distance.getLength();
        if (length < 1) return this;
        let force = distance.scale(1 / length);
        let velocity = force.scale((length - this.leff) * this.springConstant);
        velocity.addToSelf(force.scale(this.b.vel.sub(this.a.vel).dot(force) * this.dampConstant));
        this.b.vel.addToSelf(velocity.scale(-1));
        this.a.vel.addToSelf(velocity);
        return this
    }
}