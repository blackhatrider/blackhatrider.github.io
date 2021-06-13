import Vector from "../Vector.js";
import Spring from "../Spring.js";
import BodyPart from "./part/BodyPart.js";
import Wheel from "./part/Wheel.js";
import { ctx } from "../../bootstrap.js";

export default class {
    constructor(t) {
        this.parent = t;
        this.createMasses();
        this.createSprings();
        this.createCosmetics();
    }
    name = "BMX";
    swapped = !0;
    pedalSpeed = 0;
    createCosmetics() {
        let t = null || this.firstPlayer && this.firstPlayer._user
            , e = {head: "hat"} || t.cosmetics;
        this.cosmetics = e
    }
    createMasses() {
        this.masses = [
            this.head = new BodyPart(new Vector(0, -1), this, 14),
            this.frontWheel = new Wheel(new Vector(21, 38), this, 11.7),
            this.rearWheel = new Wheel(new Vector(-21, 38), this, 11.7)
        ];
    }
    createSprings() {
        this.springs = [
            this.rearSpring = new Spring(this.head, this.rearWheel),
            this.chasse = new Spring(this.rearWheel, this.frontWheel),
            this.frontSpring = new Spring(this.frontWheel, this.head)
        ];
        this.rearSpring.lrest = 45,
        this.chasse.lrest = 42,
        this.frontSpring.lrest = 45,
        this.chasse.springConstant = this.rearSpring.springConstant = this.frontSpring.springConstant = .35,
        this.chasse.dampConstant = this.rearSpring.dampConstant = this.frontSpring.dampConstant = .3,
        this.rearSpring.leff = 45
        this.chasse.leff = 42,
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
        this.swapped = !this.swapped;
        this.parent.gamepad.z = !1;
        this.parent.dir *= -1;
        this.chasse.swap();
        let rearSpring = this.rearSpring.leff;
        this.rearSpring.leff = this.frontSpring.leff;
        this.frontSpring.leff = rearSpring;
        this.collide("turn");
    }
    draw() {
        let b, c, d,
            f = this.parent.dir,
            h = this.rearWheel.pos.toPixel(),
            i = this.frontWheel.pos.toPixel();
        ctx.globalAlpha = this.ghost ? .5 : 1;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3.5 * this.parent.track.zoom;
        ctx.beginPath(),
        ctx.arc(h.x, h.y, 10 * this.parent.track.zoom, 0, 2 * Math.PI, !0),
        ctx.moveTo(i.x + 10 * this.parent.track.zoom, i.y),
        ctx.arc(i.x, i.y, 10 * this.parent.track.zoom, 0, 2 * Math.PI, !0),
        ctx.stroke();
        let l = i.x - h.x
        , m = i.y - h.y;
        i = new Vector((i.y - h.y) * f,(h.x - i.x) * f);
        let a = h.x + 0.3 * l + 0.25 * i.x;
        b = h.y + 0.3 * m + 0.25 * i.y;
        let n = h.x + 0.84 * l + 0.42 * i.x
        , x = h.y + 0.84 * m + 0.42 * i.y;
        c = h.x + 0.84 * l + 0.37 * i.x;
        d = h.y + 0.84 * m + 0.37 * i.y;
        let w = h.x + 0.4 * l + 0.05 * i.x
        , y = h.y + 0.4 * m + 0.05 * i.y;
        ctx.lineWidth = 3 * this.parent.track.zoom;
        ctx.beginPath(),
        ctx.moveTo(h.x, h.y),
        ctx.lineTo(a, b),
        ctx.lineTo(n, x),
        ctx.moveTo(c, d),
        ctx.lineTo(w, y),
        ctx.lineTo(h.x, h.y);
        c = 6 * Math.cos(this.pedalSpeed) * this.parent.track.zoom;
        d = 6 * Math.sin(this.pedalSpeed) * this.parent.track.zoom;
        n = w + c;
        x = y + d;
        c = w - c;
        d = y - d;
        let C = h.x + 0.17 * l + 0.38 * i.x
        , M = h.y + 0.17 * m + 0.38 * i.y
        , X = h.x + 0.3 * l + 0.45 * i.x
        , ya = h.y + 0.3 * m + 0.45 * i.y
        , T = h.x + 0.25 * l + 0.4 * i.x
        , Y = h.y + 0.25 * m + 0.4 * i.y;
        ctx.moveTo(n, x),
        ctx.lineTo(c, d),
        ctx.moveTo(C, M),
        ctx.lineTo(X, ya),
        ctx.moveTo(w, y),
        ctx.lineTo(T, Y);
        let za = h.x + 0.82 * l + 0.65 * i.x
        , rc = h.y + 0.82 * m + 0.65 * i.y
        w = h.x + 0.78 * l + 0.67 * i.x,
        y = h.y + 0.78 * m + 0.67 * i.y;
        ctx.moveTo(h.x + l, h.y + m);
        ctx.lineTo(h.x + 0.97 * l, h.y + 0.97 * m);
        ctx.lineTo(h.x + 0.8 * l + 0.48 * i.x, h.y + 0.8 * m + 0.48 * i.y);
        ctx.lineTo(h.x + 0.86 * l + 0.5 * i.x, h.y + 0.86 * m + 0.5 * i.y);
        ctx.lineTo(za, rc);
        ctx.lineTo(w, y);
        ctx.stroke();
        if (!this.parent.dead) {
            ctx.lineCap = "round";
            let i = this.head.pos.toPixel();
            i = {
                x: i.x - h.x - 0.5 * l,
                y: i.y - h.y - 0.5 * m
            };
            ctx.lineWidth = 6 * this.parent.track.zoom;
            ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
            ctx.beginPath(),
            ctx.moveTo(c, d),
            ctx.lineTo((a - 0.1 * l + 0.3 * i.x) + 0.5 * (c - (a - 0.1 * l + 0.3 * i.x)) + 200 * (d - (b - 0.1 * m + 0.3 * i.y)) * f * this.parent.track.zoom ** 2 / ((c - (a - 0.1 * l + 0.3 * i.x)) ** 2 + (d - (b - 0.1 * m + 0.3 * i.y)) ** 2), (b - 0.1 * m + 0.3 * i.y) + 0.5 * (d - (b - 0.1 * m + 0.3 * i.y)) + 200 * -(c - (a - 0.1 * l + 0.3 * i.x)) * f * this.parent.track.zoom * this.parent.track.zoom / ((c - (a - 0.1 * l + 0.3 * i.x)) ** 2 + (d - (b - 0.1 * m + 0.3 * i.y)) ** 2)),
            ctx.lineTo(a - 0.1 * l + 0.3 * i.x, b - 0.1 * m + 0.3 * i.y),
            ctx.stroke();
            ctx.strokeStyle = "#000";
            ctx.beginPath(),
            ctx.moveTo(n, x),
            ctx.lineTo((a - 0.1 * l + 0.3 * i.x) + 0.5 * (n - (a - 0.1 * l + 0.3 * i.x)) + 200 * (x - (b - 0.1 * m + 0.3 * i.y)) * f * this.parent.track.zoom * this.parent.track.zoom / ((n - (a - 0.1 * l + 0.3 * i.x)) ** 2 + (x - (b - 0.1 * m + 0.3 * i.y)) ** 2), (b - 0.1 * m + 0.3 * i.y) + 0.5 * (x - (b - 0.1 * m + 0.3 * i.y)) + 200 * -(n - (a - 0.1 * l + 0.3 * i.x)) * f * this.parent.track.zoom * this.parent.track.zoom / ((n - (a - 0.1 * l + 0.3 * i.x)) ** 2 + (x - (b - 0.1 * m + 0.3 * i.y)) ** 2)),
            ctx.lineTo(a - 0.1 * l + 0.3 * i.x, b - 0.1 * m + 0.3 * i.y),
            ctx.stroke();
            n = a + 0.05 * l + 0.88 * i.x;
            x = b + 0.05 * m + 0.88 * i.y;
            ctx.lineWidth = 8 * this.parent.track.zoom;
            ctx.beginPath();
            ctx.moveTo(a - 0.1 * l + 0.3 * i.x, b - 0.1 * m + 0.3 * i.y);
            ctx.lineTo(n, x);
            ctx.stroke();
            ctx.lineWidth = 2 * this.parent.track.zoom;
            ctx.beginPath();
            ctx.moveTo((a + 0.15 * l + 1.05 * i.x) + 5 * this.parent.track.zoom, b + 0.15 * m + 1.05 * i.y);
            ctx.arc(a + 0.15 * l + 1.05 * i.x, b + 0.15 * m + 1.05 * i.y, 5 * this.parent.track.zoom, 0, 2 * Math.PI, !0);
            ctx.stroke();
            ctx.beginPath();
            switch (this.cosmetics.head) {
                case "cap":
                    ctx.moveTo(a + 0.05 * l + 1.05 * i.x, b + 0.05 * m + 1.05 * i.y);
                    ctx.lineTo(a + 0.4 * l + 1.1 * i.x, b + 0.4 * m + 1.1 * i.y);
                    ctx.stroke();
                break;

                case "hat":
                    ctx.fillStyle = "#000";
                    ctx.moveTo(a + 0.35 * l + 1.15 * i.x, b + 0.35 * m + 1.15 * i.y),
                    ctx.lineTo(a + 0.25 * l + 1.13 * i.x, b + 0.25 * m + 1.13 * i.y),
                    ctx.lineTo((a + 0.35 * l + 1.15 * i.x) - 0.1 * l + 0.2 * i.x, (b + 0.35 * m + 1.15 * i.y) - 0.1 * m + 0.2 * i.y),
                    ctx.lineTo((a - 0.05 * l + 1.1 * i.x) + 0.02 * l + 0.2 * i.x, (b - 0.05 * m + 1.1 * i.y) + 0.02 * m + 0.2 * i.y),
                    ctx.lineTo(a + 0.05 * l + 1.11 * i.x, b + 0.05 * m + 1.11 * i.y),
                    ctx.lineTo(a - 0.05 * l + 1.1 * i.x, b - 0.05 * m + 1.1 * i.y),
                    ctx.stroke(),
                    ctx.fill();
                break;
            }
            ctx.lineWidth = 5 * this.parent.track.zoom;
            ctx.beginPath();
            ctx.moveTo(n, x);
            ctx.lineTo(w + 0.4 * (n - w) + 130 * ((x - y) * f * this.parent.track.zoom * this.parent.track.zoom) / ((n - w) ** 2 + (x - y) ** 2), y + 0.4 * (x - y) + 130 * (-(n - w) * f * this.parent.track.zoom * this.parent.track.zoom) / ((n - w) ** 2 + (x - y) ** 2));
            ctx.lineTo(w, y);
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
        if (!this.parent.dead) {
            this.updateControls();
        }
        for (const e of this.springs)
            e.update(t);
        for (const e of this.masses)
            e.update(t);
        if (this.rearWheel.touching && this.frontWheel.touching) {
            this.parent.slow = !1;
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
        let rotate = this.parent.gamepad.left - this.parent.gamepad.right;
        this.rearSpring.lean(rotate * this.parent.dir * 5);
        this.frontSpring.lean(-rotate * this.parent.dir * 5);
        this.chasse.rotate(rotate / 6);
        if (!rotate && this.parent.gamepad.up) {
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
    }
    get vehicleName() {
        return this.name;
    }
}