import Vector from "../Vector.js";
import Spring from "../Spring.js";
import BodyPart from "./part/BodyPart.js";
import Wheel from "./part/Wheel.js";
import { ctx } from "../../bootstrap.js";

export default class {
    constructor(t) {
        console.log(t)
        this.parent = t;
        this.createMasses();
        this.createSprings();
        this.createCosmetics();
    }
    name = "MTB";
    swapped = !0;
    pedalSpeed = 0;
    createCosmetics() {
        let t = null || this.firstPlayer && this.firstPlayer._user
            , e = {head: "hat"} || t.cosmetics;
        this.cosmetics = e
    }
    createMasses() {
        this.masses = [
            this.head = new BodyPart(new Vector(2, -3), this, 14),
            this.frontWheel = new Wheel(new Vector(23, 35),this, 14),
            this.rearWheel = new Wheel(new Vector(-23,35),this, 14)
        ];
    }
    createSprings() {
        this.springs = [
            this.rearSpring = new Spring(this.head, this.rearWheel),
            this.chasse = new Spring(this.rearWheel, this.frontWheel),
            this.frontSpring = new Spring(this.frontWheel, this.head)
        ];
        this.rearSpring.lrest = 47,
        this.chasse.lrest = 45,
        this.frontSpring.lrest = 45,
        this.chasse.springConstant = this.rearSpring.springConstant = this.frontSpring.springConstant = .2,
        this.chasse.dampConstant = this.rearSpring.dampConstant = this.frontSpring.dampConstant = .3,
        this.rearSpring.leff = 47
        this.chasse.leff = 45,
        this.frontSpring.leff = 45
    }
    getStickMan() {
        let a = {}
        , b = this.frontWheel.pos.sub(this.rearWheel.pos)
        , c = new Vector(b.y * this.parent.dir,-b.x * this.parent.dir);
        a.head = this.rearWheel.pos.add(b.scale(0.35)).add(this.head.pos.sub(this.frontWheel.pos.add(this.rearWheel.pos).scale(0.5)).scale(1.2));
        a.hand = a.shadowHand = this.rearWheel.pos.add(b.scale(0.8)).add(c.scale(0.68));
        let d = a.head.sub(a.hand);
        d = new Vector(d.y * this.parent.dir,-d.x * this.parent.dir);
        a.elbow = a.shadowElbow = a.head.add(a.hand).scale(0.5).add(d.scale(130 / d.lengthSquared()));
        a.hip = this.rearWheel.pos.add(b.scale(0.2)).add(c.scale(0.5));
        let e = new Vector(6 * Math.cos(this.pedalSpeed),6 * Math.sin(this.pedalSpeed));
        a.foot = this.rearWheel.pos.add(b.scale(0.4)).add(c.scale(0.05)).add(e);
        d = a.hip.sub(a.foot);
        d = new Vector(-d.y * this.parent.dir,d.x * this.parent.dir);
        a.knee = a.hip.add(a.foot).scale(0.5).add(d.scale(160 / d.lengthSquared()));
        a.shadowFoot = this.rearWheel.pos.add(b.scale(0.4)).add(c.scale(0.05)).sub(e);
        d = a.hip.sub(a.shadowFoot);
        d = new Vector(-d.y * this.parent.dir,d.x * this.parent.dir);
        a.shadowKnee = a.hip.add(a.shadowFoot).scale(0.5).add(d.scale(160 / d.lengthSquared()));
        return a
    }
    swap() {
        this.parent.gamepad.z = !1;
        this.parent.dir *= -1;
        this.chasse.swap();
        let a = this.rearSpring.leff;
        this.rearSpring.leff = this.frontSpring.leff;
        this.frontSpring.leff = a;
        this.swapped = !this.swapped;
        this.collide("turn");
    }
    draw() {
        let b = this.rearWheel.pos.toPixel()
        , c = this.frontWheel.pos.toPixel()
        , d = this.head.pos.toPixel()
        , e = c.sub(b)
        , f = new Vector((c.y - b.y) * this.parent.dir,(b.x - c.x) * this.parent.dir)
        , h = d.sub(b.add(e.scale(0.5)));
        ctx.globalAlpha = this.ghost ? .5 : 1;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3.5 * this.parent.track.zoom;
        ctx.beginPath(),ctx.arc(b.x, b.y, 12.5 * this.parent.track.zoom, 0, 2 * Math.PI, !0),ctx.moveTo(c.x + 12.5 * this.parent.track.zoom, c.y),ctx.arc(c.x, c.y, 12.5 * this.parent.track.zoom, 0, 2 * Math.PI, !0),ctx.stroke(),ctx.beginPath(),ctx.fillStyle = "grey";
        ctx.moveTo(b.x + 5 * this.parent.track.zoom, b.y),ctx.arc(b.x, b.y, 5 * this.parent.track.zoom, 0, 2 * Math.PI, !0),ctx.moveTo(c.x + 4 * this.parent.track.zoom, c.y),ctx.arc(c.x, c.y, 4 * this.parent.track.zoom, 0, 2 * Math.PI, !0),ctx.fill(),ctx.beginPath(),ctx.lineWidth = 5 * this.parent.track.zoom;
        ctx.moveTo(b.x, b.y),ctx.lineTo(b.x + 0.4 * e.x + 0.05 * f.x, b.y + 0.4 * e.y + 0.05 * f.y),ctx.moveTo(b.x + 0.72 * e.x + 0.64 * h.x, b.y + 0.72 * e.y + 0.64 * h.y),ctx.lineTo(b.x + 0.46 * e.x + 0.4 * h.x, b.y + 0.46 * e.y + 0.4 * h.y),ctx.lineTo(b.x + 0.4 * e.x + 0.05 * f.x, b.y + 0.4 * e.y + 0.05 * f.y),ctx.stroke(),ctx.beginPath(),ctx.lineWidth = 2 * this.parent.track.zoom;
        let i = new Vector(6 * Math.cos(this.pedalSpeed) * this.parent.track.zoom,6 * Math.sin(this.pedalSpeed) * this.parent.track.zoom);
        ctx.moveTo(b.x + 0.72 * e.x + 0.64 * h.x, b.y + 0.72 * e.y + 0.64 * h.y),ctx.lineTo(b.x + 0.43 * e.x + 0.05 * f.x, b.y + 0.43 * e.y + 0.05 * f.y),ctx.moveTo(b.x + 0.45 * e.x + 0.3 * h.x, b.y + 0.45 * e.y + 0.3 * h.y),ctx.lineTo(b.x + 0.3 * e.x + 0.4 * h.x, b.y + 0.3 * e.y + 0.4 * h.y),ctx.lineTo(b.x + 0.25 * e.x + 0.6 * h.x, b.y + 0.25 * e.y + 0.6 * h.y),ctx.moveTo(b.x + 0.17 * e.x + 0.6 * h.x, b.y + 0.17 * e.y + 0.6 * h.y),
        ctx.lineTo(b.x + 0.3 * e.x + 0.6 * h.x, b.y + 0.3 * e.y + 0.6 * h.y),ctx.moveTo(b.x + 0.43 * e.x + 0.05 * f.x + i.x, b.y + 0.43 * e.y + 0.05 * f.y + i.y),ctx.lineTo(b.x + 0.43 * e.x + 0.05 * f.x - i.x, b.y + 0.43 * e.y + 0.05 * f.y - i.y),ctx.stroke(),ctx.beginPath(),ctx.lineWidth = this.parent.track.zoom;
        ctx.moveTo(b.x + 0.46 * e.x + 0.4 * h.x, b.y + 0.46 * e.y + 0.4 * h.y),ctx.lineTo(b.x + 0.28 * e.x + 0.5 * h.x, b.y + 0.28 * e.y + 0.5 * h.y),ctx.stroke(),ctx.beginPath(),ctx.lineWidth = 3 * this.parent.track.zoom;
        ctx.moveTo(c.x, c.y),ctx.lineTo(b.x + 0.71 * e.x + 0.73 * h.x, b.y + 0.71 * e.y + 0.73 * h.y),ctx.lineTo(b.x + 0.73 * e.x + 0.77 * h.x, b.y + 0.73 * e.y + 0.77 * h.y),ctx.lineTo(b.x + 0.7 * e.x + 0.8 * h.x, b.y + 0.7 * e.y + 0.8 * h.y),ctx.stroke();
        if (!this.dead) {
            ctx.lineCap = "round";
            let f = d.sub(b.add(e.scale(0.5)))
            , c = b.add(e.scale(0.3)).add(f.scale(0.25))
            , h = b.add(e.scale(0.4)).add(f.scale(0.05));
            d = h.add(i)
            let l = h.sub(i);
            b = b.add(e.scale(0.67)).add(f.scale(0.8))
            i = c.add(e.scale(-0.05)).add(f.scale(0.42))
            let m = d.sub(i);
            h = (new Vector(m.y * this.parent.dir,-m.x * this.parent.dir)).scaleSelf(this.parent.track.zoom * this.parent.track.zoom);
            let n = i.add(m.scale(0.5)).add(h.scale(200 / m.lengthSquared()));
            m = l.sub(i);
            h = (new Vector(m.y * this.parent.dir,-m.x * this.parent.dir)).scaleSelf(this.parent.track.zoom * this.parent.track.zoom);
            h = i.add(m.scale(0.5)).add(h.scale(200 / m.lengthSquared()));
            ctx.beginPath(),ctx.lineWidth = 6 * this.parent.track.zoom;
            ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
            ctx.moveTo(l.x, l.y),ctx.lineTo(h.x, h.y),ctx.lineTo(i.x, i.y),ctx.stroke(),ctx.beginPath(),ctx.strokeStyle = "#000";
            ctx.moveTo(d.x, d.y),ctx.lineTo(n.x, n.y),ctx.lineTo(i.x, i.y),ctx.stroke(),ctx.lineWidth = 8 * this.parent.track.zoom;
            h = c.add(e.scale(0.1)).add(f.scale(0.93));
            d = c.add(e.scale(0.2)).add(f.scale(1.09));
            ctx.beginPath(),ctx.moveTo(i.x, i.y),ctx.lineTo(h.x, h.y),ctx.stroke(),ctx.beginPath(),ctx.lineWidth = 2 * this.parent.track.zoom;
            ctx.moveTo(d.x + 5 * this.parent.track.zoom, d.y),ctx.arc(d.x, d.y, 5 * this.parent.track.zoom, 0, 2 * Math.PI, !0),ctx.stroke(),ctx.beginPath();
            switch (this.cosmetics.head) {
                case "cap":
                    d = c.add(e.scale(0.4)).add(f.scale(1.15));
                    e = c.add(e.scale(0.1)).add(f.scale(1.05));
                    ctx.moveTo(d.x, d.y);
                    ctx.lineTo(e.x, e.y);
                    ctx.stroke();
                break;

                case "hat":
                    d = c.add(e.scale(0.37)).add(f.scale(1.19));
                    i = c.sub(e.scale(0.02)).add(f.scale(1.14));
                    l = c.add(e.scale(0.28)).add(f.scale(1.17));
                    c = c.add(e.scale(0.09)).add(f.scale(1.15));
                    n = d.sub(e.scale(0.1)).addToSelf(f.scale(0.2));
                    e = i.add(e.scale(0.02)).addToSelf(f.scale(0.2));
                    ctx.fillStyle = "#000";
                    ctx.moveTo(d.x, d.y);
                    ctx.lineTo(l.x, l.y);
                    ctx.lineTo(n.x, n.y);
                    ctx.lineTo(e.x, e.y);
                    ctx.lineTo(c.x, c.y);
                    ctx.lineTo(i.x, i.y);
                    ctx.stroke();
                    ctx.fill();
            }
            e = h.sub(b);
            f = new Vector(e.y * this.parent.dir,-e.x * this.parent.dir);
            f = f.scale(this.parent.track.zoom * this.parent.track.zoom);
            e = b.add(e.scale(0.3)).add(f.scale(80 / e.lengthSquared()));
            ctx.lineWidth = 5 * this.parent.track.zoom;
            ctx.beginPath();
            ctx.moveTo(h.x, h.y);
            ctx.lineTo(e.x, e.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
        if (this.parent.dead) {
            this.parent.rider.draw();
            if (this.parent.hat) {
                this.parent.hat.draw()
            }
        }
    }
    update(t) {
        if (!this.dead) {
            this.updateControls()
        }
        for (const e of this.springs)
            e.update(t);
        for (const e of this.masses)
            e.update(t);
        if (this.rearWheel.touching && this.frontWheel.touching) {
            this.slow = !1
        }
        if (!this.parent.slow && !this.parent.dead) {
            this.updateControls();
            for (const e of this.springs)
                e.update(t);
            for (const e of this.masses)
                e.update(t);
        } else {
            this.parent.rider.update();
            if (this.parent.hat) {
                this.parent.hat.update();
            }
        }
    }
    updateControls() {
        if (this.parent.gamepad.swap) {
            this.swap();
        }
        if (this.parent.gamepad.up) {
            this.pedalSpeed += this.rearWheel.pedalSpeed / 5;
        }
        this.rearWheel.motor += (this.parent.gamepad.up - this.rearWheel.motor) / 10;
        this.rearWheel.brake = this.frontWheel.brake = this.parent.gamepad.down;
        let a = this.parent.gamepad.left - this.parent.gamepad.right;
        this.rearSpring.lean(5 * a * this.parent.dir);
        this.frontSpring.lean(5 * -a * this.parent.dir);
        this.chasse.rotate(a / 8);
        if (!a && this.parent.gamepad.up) {
            this.rearSpring.lean(-7);
            this.frontSpring.lean(7);
        }
    }
    collide(a) {
        if (this.parent.checkpoints) {
            if (this.parent.checkpoints[a]) {
                for (let i in b) {
                    this.parent.checkpoints[i].apply(this, _slice.call(arguments, 1))
                }
            }
        }
    }
    moveVehicle(a, b) {
        for (const t of this.masses) {
            t.pos.x = t.pos.x + a;
            t.pos.y = t.pos.y + b;
            t.old.x = t.old.x + a;
            t.old.y = t.old.y + b;
        }
        return this;
    }
    get vehicleName() {
        return this.name;
    }
}