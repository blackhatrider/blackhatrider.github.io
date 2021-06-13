import Vector from "../Vector.js";
import { ctx } from "../../bootstrap.js";

export default class Shard {
    constructor(a, b) {
        this.parent = b;
        this.pos = new Vector(a.x + 5 * (Math.random() - Math.random()),a.y + 5 * (Math.random() - Math.random()));
        this.old = new Vector(this.pos.x,this.pos.y);
        this.vel = new Vector(11 * (Math.random() - Math.random()),11 * (Math.random() - Math.random()));
        this.track = b.track;
        this.size = 2 + 9 * Math.random();
        this.rotation = 6.2 * Math.random();
        this.da = Math.random() - Math.random();
        this.friction = 0.05;
        this.collide = !0;
        this.shape = [1, 0.7, 0.8, 0.9, 0.5, 1, 0.7, 1];
    }
    draw() {
        let t = this.pos.toPixel();
        let e = this.size * this.track.zoom;
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(t.x + (this.shape[0] * e) * Math.cos(this.rotation), t.y + (this.shape[0] * e) * Math.sin(this.rotation));
        for (let e = 2; 8 > e; e++)
            ctx.lineTo(t.x + (this.shape[e - 1] * e / 2) * Math.cos(this.rotation + 6.283 * e / 8), t.y + (this.shape[e - 1] * e / 2) * Math.sin(this.rotation + 6.283 * e / 8));
        ctx.fill();
    }
    drive(a) {
        this.pedalSpeed = a.dot(this.vel) / this.size;
        this.pos.addToSelf(a.scale(-a.dot(this.vel) * this.friction));
        this.rotation += this.da;
        let b = a.getLength();
        if (b > 0) {
            a = new Vector(-a.y / b, a.x / b),
            this.old.addToSelf(a.scale(0.8 * a.dot(this.vel)));
        }
    }
    update() {
        this.rotation += this.da;
        this.vel.addToSelf(this.parent.gravity);
        this.vel = this.vel.scale(0.99);
        this.pos.addToSelf(this.vel);
        this.touching = !1;
        if (this.collide) {
            this.track.collide(this);
        }
        this.vel = this.pos.sub(this.old);
        this.old.copy(this.pos)
    }
}