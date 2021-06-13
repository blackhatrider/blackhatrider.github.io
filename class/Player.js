import Game from "./Game.js";
import Vector from "./Vector.js";
import Gamepad from "./Gamepad.js";
import MTB from "./bike/MTB.js";
import BMX from "./bike/BMX.js";

const bike = { MTB, BMX };

export default class {
    constructor(vehicle, track, ghost = !1) {
        this.track = track;
        this.ghost = !!ghost;
        this.ghost_data = ghost || "";
        this.rider = null;
        this.hat = null;
        this.checkpoints = 0;
        this.checkpointsCache = 0;
        this.states = new Map();
        this.statesCache = new Map();
        this.gamepad = new Gamepad();
        this.records = [{}, {}, {}, {}, {}];
        this.slow = !1;
        this.dead = !1;
        this.targetsCollected = 0;
        this.powerupsConsumed = 0;

        this.dir = 1;
        this.ticks = 0;
        this.explosion = !1;
        this.powerupsEnabled = !0;
        this.pastCheckpoint = !1;
        this.gravity = new Vector(0,.3);

        this.createVehicle(vehicle);
    }
    construct(t) {
        return Object.assign(this, t);
    }
    createVehicle(t) {
        return this.vehicle = new bike[t](this);
    }
    switchBike() {
        this.construct(new this.constructor(this.vehicle.name === "BMX" ? "MTB" : "BMX", this.track, this.ghost_data));
    }
    reset() {
        this.construct(new this.constructor(this.vehicle.name, this.track, this.ghost_data));
    }
    trackComplete() {
        this.collide("hitTarget");
        if (this.pastCheckpoint & 2) {
            if (this.collide("hitGoal"), this.track.targets && this.targetsCollected === this.track.targets && this.track.currentTime > 0 && (!this.track.time || this.time < this.track.time) && this.track.id !== void 0) {
                for (const t of this.records) {
                    for (const e in t) {
                        isNaN(e) || (this.ghost_data += e + " ");
                    }
                    this.ghost_data += ",";
                }
                Game.request({
                    path: "/tracks/ghost_save",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    body: {
                        id: window.location.pathname.split("/")[2],
                        vehicle: this.vehicle,
                        time: this.track.currentTime,
                        code: b + this.track.currentTime + "," + this.vehicle
                    },
                    method: "post"
                }).then(r => r.startsWith("Ghost") && alert(r));
                this.gamepad.left = this.gamepad.right = this.gamepad.up = this.gamepad.down = 0
            }
        } else if (this.pastCheckpoint & 1) {
            this.collide("hitCheckpoint");
            for (const t of this.track.players) {
                t.states.set(++t.checkpoints, {...t.clone});
            }
        }
        this.pastCheckpoint = 0;
    }
    gotoCheckpoint() {
        if (localStorage.pauseOnEnter) {
            this.track.paused = JSON.parse(localStorage.pauseOnEnter) ? true : false;
        }
        if (this.checkpoints > 0) {
            this.track.currentTime = this.construct(this.states.get(this.checkpoints)).ticks;
        } else {
            this.track.removeCollectedItems();
            this.construct(new this.constructor(this.vehicle.name, this.track, this.ghost_data));
            this.track.currentTime = 0;
        }
        this.cameraFocus = this.vehicle.head;
        this.camera = this.vehicle.head.pos.clone();
        if (this.track.players.length > 1) {
            for (const t of this.track.players) {
                t.construct(new this.constructor(t.vehicle.name, t.track, this.ghost_data));
                if (!this.track.firstPlayer || this.currentTime == 0) {
                    this.cameraFocus = t.head;
                }
            }
        }
    }
    removeCheckpoint() {
        for (const t of this.track.players) {
            if (t.checkpoints > 0) {
                t.statesCache.set(t.checkpointsCache++, t.states.get(t.checkpoints));
                t.states.delete(t.checkpoints--);
            }
        }
    }
    removeCheckpointUndo() {
        for (const t of this.track.players) {
            if (t.checkpointsCache > 0) {
                t.states.set(t.checkpoints++, t.statesCache.get(t.checkpointsCache));
                t.statesCache.delete(t.checkpointsCache--);
            }
        }
    }
    draw() {
        this.vehicle.draw();
    }
    update(t) {
        this.ticks += 1000 / 25;
        if (this.pastCheckpoint) {
            this.trackComplete()
        }
        if (!!this.ghost_data) {
            if (this.ghost_data[0][this.track.currentTime]) {
                this.gamepad.left = this.gamepad.left ? 0 : 1;
            }
            if (this.ghost_data[1][this.track.currentTime]) {
                this.gamepad.right = this.gamepad.right ? 0 : 1;
            }
            if (this.ghost_data[2][this.track.currentTime]) {
                this.gamepad.up = this.gamepad.up ? 0 : 1;
            }
            if (this.ghost_data[3][this.track.currentTime]) {
                this.gamepad.down = this.gamepad.down ? 0 : 1;
            }
            if (this.ghost_data[4][this.track.currentTime]) {
                this.vehicle.swap();
            }
        } else {
            if (this.gamepad.left !== this.gamepad.old.left) {
                this.records[0][this.track.currentTime] = 1;
                this.gamepad.old.left = this.gamepad.left;
            }
            if (this.gamepad.right !== this.gamepad.old.right) {
                this.records[1][this.track.currentTime] = 1;
                this.gamepad.old.right = this.gamepad.right;
            }
            if (this.gamepad.up !== this.gamepad.old.up) {
                this.records[2][this.track.currentTime] = 1;
                this.gamepad.old.up = this.gamepad.up;
            }
            if (this.gamepad.down !== this.gamepad.old.down) {
                this.records[3][this.track.currentTime] = 1;
                this.gamepad.old.down = this.gamepad.down;
            }
            if (this.gamepad.isButtonDown("z")) {
                this.vehicle.swap();
                this.records[4][this.track.currentTime] = 1;
            }
        }
        this.vehicle.update(t);
    }
    collide(a) {
        if (this.states.get(a)) {
            for (const t of this.states) {
                t.apply(this, _slice.call(arguments, 1))
            }
        }
    }
    get clone() {
        return this;
    }
    get vehicleName() {
        return this.vehicle.name;
    }
}