import Shard from "../../effect/Shard.js";
import Ragdoll from "./Ragdoll.js";
import Mass from "./Mass.js";

export default class BodyPart extends Mass {
    constructor(t, e, i = 10) {
        super(t);
        this.parent = e;
        this.size = i;
        this.friction = 0;
        this.collide = !0;
    }
    drive(t) {
        this.parent.parent.dead = !0;
        this.parent.rearWheel.motor = 0;
        this.parent.rearWheel.brake = !1;
        this.parent.frontWheel.brake = !1;
        this.parent.head.collide = !1;
        for (const t of this.parent.parent.track.players) {
            if (t.dead) {
                //this.parent.track.players[t] = new DeadBike(this, this.getStickMan(), this.parent.track, this.parent.checkpoints);
                t.rider = new Ragdoll(this.parent.getStickMan(), this.parent.parent.track, this.parent.parent.ghost, this.parent);
                t.rider.setVelocity(this.vel, this.parent.rearWheel.vel);
                t.rider.dir = this.parent.parent.dir;
                t.rider.gravity = this.parent.parent.gravity;
                t.hat = new Shard(this.pos.clone(), this.parent.parent);
                t.hat.vel = this.vel.clone();
                t.hat.size = 10;
                t.hat.da = .1;
            }
        }
    }
    update(t) {
        this.vel.addToSelf(this.parent.parent.gravity).scaleSelf(.99);
        this.pos.addToSelf(this.vel);
        this.touching = !1;
        if (this.collide) {
            this.parent.parent.track.collide(this);
        }
        this.vel = this.pos.sub(this.old);
        this.old.copy(this.pos);
        // super.update(t);
    }
    clone() {
        var t = new BodyPart(this.pos, this.parent);
        t.old = this.old.clone();
        t.vel = this.vel.clone();
        t.size = this.size;
        t.friction = this.friction;
        return t;
    }
}