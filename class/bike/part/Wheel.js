import Mass from "./Mass.js";

export default class Wheel extends Mass {
    constructor(t, e, i = 10) {
        super(t);
        this.parent = e;
        this.size = i;
        this.friction = 0;
        this.gravity = !0;
        this.collide = !0;
        this.motor = 0;
        this.pedalSpeed = 0;
    }
    drive(t) {
        this.pos.addToSelf(t.scale(this.motor * this.parent.parent.dir));
        if (this.parent.parent.gamepad.isButtonDown("down")) {
            this.pos.addToSelf(t.scale(0.3 * -t.dot(this.vel)));
        }
        this.pedalSpeed = t.dot(this.vel) / this.size;
        this.touching = true;
    }
    update() {
        this.vel.addToSelf(this.parent.parent.gravity).scaleSelf(.99);
        this.pos.addToSelf(this.vel);
        this.touching = false;
        if (this.collide) {
            this.parent.parent.track.collide(this);
        }
        this.vel = this.pos.sub(this.old);
        this.old.copy(this.pos);
        this.real = this.pos;
        // super.update(t);
    }
    clone() {
        const wheel = new Wheel(this.pos, this.track);
        wheel.old = this.old.clone();
        wheel.vel = this.vel.clone();
        wheel.motor = this.motor;
        return wheel;
    }
}