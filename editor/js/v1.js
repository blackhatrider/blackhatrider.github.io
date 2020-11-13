var track, ia = 0;
const GAME = {
    loop: null,
    toolbar: {
        drawLeft: function() {
            K.lineWidth = 1;
            K.lineCap = "round";
            K.globalAlpha = 1;
            for(var i = 0; i < 200; i += 25) {
                if(i == 75 || i == 125) continue;
                K.beginPath();
                K.moveTo(25, i);
                K.lineTo(25, i + 25);
                K.lineTo(0, i + 25);
                K.stroke();
                K.fillStyle = "#fff";
                K.fillRect(0, i, 25, 25);
                K.strokeStyle = K.fillStyle = "#000";
                switch(i / 25) {
                    case 0:
                        K.fillRect(7, 5, 4, 14);
                        K.fillRect(14, 5, 4, 14);
                        break;
                    case 1:
                        K.beginPath();
                        K.fillRect(7, i + 5, 2, 16);
                        K.moveTo(9, i + 12.5);
                        K.lineTo(18, i + 20);
                        K.lineTo(18, i + 5);
                        K.fill();
                        break;
                    case 2:
                        K.beginPath();
                        K.fillRect(3, i + 5, 2, 16);
                        K.moveTo(5, i + 12.5);
                        K.lineTo(13, i + 20);
                        K.lineTo(13, i + 5);
                        K.moveTo(13, i + 12.5);
                        K.lineTo(21, i + 20);
                        K.lineTo(21, i + 5);
                        K.fill();
                        break;
                    case 4:
                        K.beginPath();
                        K.moveTo(0, i);
                        K.lineTo(25, i);
                        K.stroke();
                        K.fillStyle = "#fff";
                        K.fillRect(0, i, 25, 24);
                        K.fillStyle = "#000";
                        K.strokeStyle = "#777";
                        K.beginPath();
                        for(var s = 0; s < 360; s+=30) {
                            K.moveTo(12.5, i + 12.5);
                            K.lineTo(12.5 + 8 * Math.cos(s * Math.PI / 180), i + 12.5 + 8 * Math.sin(s * Math.PI / 180));
                        }
                        K.stroke();
                        K.strokeStyle = "#000";
                        K.lineWidth = 2.5;
                        K.beginPath();
                        K.arc(12.5, i + 12.5, 8, 0, 2 * Math.PI);
                        K.stroke();
                        K.lineWidth = 1;
                        break;
                    case 6:
                        K.beginPath();
                        K.moveTo(0, i);
                        K.lineTo(25, i);
                        K.stroke();
                        K.fillStyle = "#fff";
                        K.fillRect(0, i, 25, 24);
                        K.fillStyle = "#000";
                        K.lineWidth = 2;
                        K.shadowColor = "#000";
                        K.shadowOffsetX = 1;
                        K.shadowOffsetY = 1;
                        K.shadowBlur = 3;
                        K.beginPath();
                        K.moveTo(6, i + 19);
                        K.lineTo(19, i + 6);
                        K.stroke();
                        K.shadowColor = "#ffffff00";
                        break;
                    case 7:
                        K.lineWidth = 2;
                        K.beginPath();
                        K.moveTo(6, i + 14.5);
                        K.lineTo(6, i + 19);
                        K.lineTo(9.5, i + 19);
                        K.moveTo(19, i + 14.5);
                        K.lineTo(19, i + 19);
                        K.lineTo(14.5, i + 19);
                        K.moveTo(19, i + 9.5);
                        K.lineTo(19, i + 6);
                        K.lineTo(14.5, i + 6);
                        K.moveTo(9.5, i + 6);
                        K.lineTo(6, i + 6);
                        K.lineTo(6, i + 9.5);
                        K.stroke();
                }
            }
        },
        drawRight: function() {
            K.lineWidth = 1;
            K.globalAlpha = 1;
            for(var i = 0; i < 450; i += 25) {
                if(i == 175 || i == 400) continue;
                K.beginPath();
                K.moveTo(canvas.width - 25, i);
                K.lineTo(canvas.width - 25, i + 25);
                K.lineTo(canvas.width, i + 25);
                K.stroke();
                K.fillStyle = "#fff";
                K.fillRect(canvas.width - 25, i, 25, 25);
                K.strokeStyle = K.fillStyle = "#000";
                switch(i / 25) {
                    case 0:
                        K.fillStyle = "#fff";
                        K.fillRect(canvas.width, i + 1, 25, 24);
                        K.strokeStyle = K.fillStyle = "#000";
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 2, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 1:
                        K.fillStyle = "#fff";
                        K.fillRect(canvas.width, i + 1, 25, 24);
                        K.fillStyle = K.strokeStyle = "#CCC"
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 2, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 2:
                        K.fillStyle = "#fff";
                        K.fillRect(canvas.width, i + 1, 25, 24);
                        K.strokeStyle = K.fillStyle = "#000";
                        K.lineWidth = 2;
                        K.beginPath();
                        K.moveTo(canvas.width - 7, i + 8);
                        K.lineTo(canvas.width - 16, i + 17);
                        K.stroke();
                        K.fill();
                        break;
                    case 3:
                        K.lineWidth = 2;
                        K.fillStyle = K.strokeStyle = "#CCC";
                        K.beginPath();
                        K.moveTo(canvas.width - 7, i + 8);
                        K.lineTo(canvas.width - 16, i + 17);
                        K.stroke();
                        K.fill();
                        break;
                    case 4:
                        K.strokeStyle = K.fillStyle = "#FFB6C1";
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 6, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 5:
                        K.fillRect(canvas.width - 13, i + 8, 2, 10);
                        K.fillRect(canvas.width - 17, i + 12, 10, 2);
                        K.beginPath();
                        K.moveTo(canvas.width - 16, i + 8);
                        K.lineTo(canvas.width - 8, i + 8);
                        K.lineTo(canvas.width - 12, i + 14 - 12 * Math.cos(Math.PI / 6));
                        K.moveTo(canvas.width - 16, i + 18);
                        K.lineTo(canvas.width - 8, i + 18);
                        K.lineTo(canvas.width - 12, i + 12 + 12 * Math.cos(Math.PI / 6));
                        K.moveTo(canvas.width - 17, i + 9);
                        K.lineTo(canvas.width - 17, i + 17);
                        K.lineTo(canvas.width - 11 - 12 * Math.cos(Math.PI / 6), i + 13);
                        K.moveTo(canvas.width - 7, i + 9);
                        K.lineTo(canvas.width - 7, i + 17);
                        K.lineTo(canvas.width - 13 + 12 * Math.cos(Math.PI / 6), i + 13);
                        K.fill();
                        break;
                    case 6:
                        K.strokeStyle = "#CCC";
                        K.beginPath();
                        K.moveTo(canvas.width - 17, i + 5);
                        K.lineTo(canvas.width - 17, i + 19);
                        K.moveTo(canvas.width - 12, i + 5);
                        K.lineTo(canvas.width - 12, i + 19);
                        K.moveTo(canvas.width - 7, i + 5);
                        K.lineTo(canvas.width - 7, i + 19);
                        K.moveTo(canvas.width - 4, i + 16);
                        K.lineTo(canvas.width - 20, i + 16);
                        K.moveTo(canvas.width - 4, i + 12);
                        K.lineTo(canvas.width - 20, i + 12);
                        K.moveTo(canvas.width - 4, i + 8);
                        K.lineTo(canvas.width - 20, i + 8);
                        K.stroke();
                        break;
                    case 8:
                        K.beginPath();
                        K.moveTo(canvas.width, i);
                        K.lineTo(canvas.width - 25, i);
                        K.stroke();
                        K.fillStyle = "#fff";
                        K.fillRect(canvas.width - 25, i, 25, 25);
                        K.lineWidth = 2;
                        K.fillStyle = "#ff0";
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 3, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 9:
                        K.lineWidth = 2;
                        K.fillStyle = "#00f";
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 3, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 10:
                        K.lineWidth = 2;
                        K.fillStyle = "#ff0";
                        K.beginPath();
                        K.moveTo(canvas.width - 17, i + 10);
                        K.lineTo(canvas.width - 17, i + 16);
                        K.lineTo(canvas.width - 17 + 12 * Math.cos(Math.PI / 6), i + 13);
                        K.closePath();
                        K.stroke();
                        K.fill();
                        break;
                    case 11:
                        K.lineWidth = 2;
                        K.fillStyle = "#0f0";
                        K.beginPath();
                        K.moveTo(canvas.width - 9, i + 8);
                        K.lineTo(canvas.width - 15, i + 8);
                        K.lineTo(canvas.width - 12, i + 17 + 1 * Math.cos(Math.PI / 6));
                        K.closePath();
                        K.stroke();
                        K.fill();
                        break;
                    case 12:
                        K.lineWidth = 2;
                        K.fillStyle = "#f00";
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 3, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 13:
                        K.lineWidth = 2;
                        K.fillStyle = "#eee";
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 3, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 14:
                        K.lineWidth = 2;
                        K.fillStyle = "#0ff";
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 3, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 15:
                        K.lineWidth = 2;
                        K.fillStyle = "#f0f";
                        K.beginPath();
                        K.arc(canvas.width - 12.5, i + 12.5, 3, 0, 2 * Math.PI);
                        K.stroke();
                        K.fill();
                        break;
                    case 17:
                        K.beginPath();
                        K.moveTo(canvas.width, i);
                        K.lineTo(canvas.width - 25, i);
                        K.stroke();
                        K.fillStyle = "#fff";
                        K.fillRect(canvas.width - 25, i, 25, 25);
                        K.lineWidth = 4;
                        K.strokeStyle = "#f90000";
                        K.beginPath();
                        K.moveTo(canvas.width - 8, i + 8);
                        K.lineTo(canvas.width - 18, i + 18);
                        K.moveTo(canvas.width - 18, i + 8);
                        K.lineTo(canvas.width - 8, i + 18);
                        K.stroke();
                        break;
                }
                K.fillStyle = K.strokeStyle = "#000";
                K.lineWidth = 1;
            }
        }
    },
    resizeCanvas: {
        get fullscreen() {
            800 == canvas.width ? (canvas.width = window.innerWidth,
            canvas.height = window.innerHeight,
            canvas.style.position = "fixed",
            canvas.style.background = "#ffffff",
            canvas.style.top = canvas.style.left = 0,
            canvas.style.border = "none",
            V[2] = Tb[0][7] = "Disable fullscreen ( ESC or F )",
            canvas.style.zIndex = 2E3) : this.smallscreen
            this.adjust
        },
        get smallscreen() {
            document.body.style.overflowX = 'auto';
            document.body.style.overflowY = 'scroll';
            canvas.width = 800;
            canvas.height = 450;
            canvas.style.position = "static";
            canvas.style.border = "1px solid black";
            this.adjust
        },
        get adjust() {
            K.lineCap = "round";
            K.lineJoin = "round";
            K.font = "8px eiven";
        }
    },
    update: [],
    render: [],
    get ctx() {
        return canvas.getContext("2d");
    },
    get Vector() {
        return class {
            constructor(a, b) {
                this.x = a;
                this.y = b
            }
            toPixel(){
                return new GAME.Vector((this.x - track.camera.x) * track.zoom + canvas.width / 2,(this.y - track.camera.y) * track.zoom + canvas.height / 2)
            }
            adjustToCanvas(){
                return new GAME.Vector((this.x - canvas.width / 2) / track.zoom + track.camera.x,(this.y - canvas.height / 2) / track.zoom + track.camera.y)
            }
            copy(a){
                this.x = a.x;
                this.y = a.y;
                return this
            }
            addToSelf(a){
                this.x += a.x;
                this.y += a.y;
                return this
            }
            subtractFromSelf(a){
                this.x -= a.x;
                this.y -= a.y;
                return this 
            }
            scaleSelf(a){
                this.x *= a;
                this.y *= a;
                return this
            }
            clone(){
                return new GAME.Vector(this.x,this.y)
            }
            add(a){
                return new GAME.Vector(this.x + a.x,this.y + a.y)
            }
            sub(a){
                return new GAME.Vector(this.x - a.x,this.y - a.y)
            }
            scale(a){
                return new GAME.Vector(this.x * a,this.y * a)
            }
            oppositeScale(a){
                return new GAME.Vector(this.x / a,this.y / a)
            }
            dot(a){
                return this.x * a.x + this.y * a.y
            }
            getLength(){
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }
            lengthSquared(){
                return this.x * this.x + this.y * this.y
            }
            distanceTo(a){
                var b = this.x - a.x,
                    a = this.y - a.y;
                return Math.sqrt(b * b + a * a)
            }
            distanceToSquared(a){
                var b = this.x - a.x,
                    a = this.y - a.y;
                return b * b + a * a
            }
            toString(){
                return Math.round(this.x).toString(32) + " " + Math.round(this.y).toString(32)
            }
            toJSON(){
                return [this.x, this.y]
            }
        }
    },
    get Mass() {
        return class {
            constructor(a, b){
                this.pos = a.clone();
                this.old = a.clone();
                this.vel = new GAME.Vector(0,0);
                this.track = b;
            }
            update(){
                this.vel.addToSelf(this.track.gravity).scaleSelf(0.99);
                this.pos.addToSelf(this.vel);
                this.touching = !1;
                this.collide && track.collide(this);
                this.vel = this.pos.sub(this.old);
                this.old.copy(this.pos)
            }
        }
    },
    get BodyPart() {
        return class extends this.Mass {
            constructor(a, b){
                super(a, b);
                this.size = 10;
                this.friction = 0;
                this.collide = !0
            }
            drive(a){
                this.pos.addToSelf(a.scale(-a.dot(this.vel) * this.friction));
                this.touching = !0
            }
            clone(){
                var a = new GAME.BodyPart(this.pos,this.track);
                a.old = this.old.clone();
                a.vel = this.vel.clone();
                a.size = this.size;
                a.friction = this.friction;
                return a
            }
            toJSON(){
                return {
                    type: "BodyPart",
                    pos: this.pos,
                    old: this.old,
                    vel: this.vel,
                    size: this.size
                }
            }
        }
    },
    get Wheel() {
        return class extends GAME.Mass {
            constructor(a, b){
                super(a, b);
                this.size = 10;
                this.friction = 0;
                this.gravity = this.collide = !0;
                this.motor = this.pedalSpeed = 0
            }
            drive(a){
                this.pos.addToSelf(a.scale(this.motor * this.track.dir));
                this.brake && this.pos.addToSelf(a.scale(0.3 * -a.dot(this.vel)));
                this.pedalSpeed = a.dot(this.vel) / this.size;
                this.touching = !0
            }
            clone(){
                var a = new GAME.Wheel(this.pos,this.track);
                a.old = this.old.clone();
                a.vel = this.vel.clone();
                a.motor = this.motor;
                return a
            }
            toJSON(){
                return {
                    type: "Wheel",
                    pos: this.pos,
                    old: this.old,
                    vel: this.vel,
                    motor: this.motor,
                    pedalSpeed: this.pedalSpeed,
                    size: this.size,
                    friction: this.friction
                }
            }
        }
    },
    get Shard() {
        return class {
            constructor(a, b){
                this.pos = new GAME.Vector(a.x + 5 * (Math.random() - Math.random()),a.y + 5 * (Math.random() - Math.random()));
                this.old = new GAME.Vector(this.pos.x,this.pos.y);
                this.vel = new GAME.Vector(11 * (Math.random() - Math.random()),11 * (Math.random() - Math.random()));
                this.track = b;
                this.mb = b.track;
                this.size = 2 + 9 * Math.random();
                this.rotation = 6.2 * Math.random();
                this.da = Math.random() - Math.random();
                this.friction = 0.05;
                this.collide = !0;
                this.shape = [1, 0.7, 0.8, 0.9, 0.5, 1, 0.7, 1]
            }
            draw(){
                var a = this.pos.toPixel(),
                    b = this.size * this.mb.zoom,
                    c = this.shape[0] * b,
                    d = a.x + c * Math.cos(this.rotation),
                    c = a.y + c * Math.sin(this.rotation),
                    e = 2;
                for(K.beginPath(),K.moveTo(d, c),K.fillStyle = "#000"; 8 > e; e++)
                    c = this.shape[e - 1] * b / 2,
                    d = a.x + c * Math.cos(this.rotation + 6.283 * e / 8),
                    c = a.y + c * Math.sin(this.rotation + 6.283 * e / 8),
                    K.lineTo(d, c);
                K.fill()
            }
            drive(a){
                this.pedalSpeed = a.dot(this.vel) / this.size;
                this.pos.addToSelf(a.scale(-a.dot(this.vel) * this.friction));
                this.rotation += this.da;
                var b = a.getLength();
                0 < b && (a = new GAME.Vector(-a.y / b,a.x / b),
                this.old.addToSelf(a.scale(0.8 * a.dot(this.vel))))
            }
            update(){
                this.rotation += this.da;
                this.vel.addToSelf(this.track.gravity);
                this.vel = this.vel.scale(0.99);
                this.pos.addToSelf(this.vel);
                this.touching = !1;
                this.collide && track.collide(this);
                this.vel = this.pos.sub(this.old);
                this.old.copy(this.pos)
            }
        }
    },
    get Spring() {
        return class {
            constructor(a, b, c){
                this.a = a;
                this.b = b;
                this.track = c;
                this.leff = this.lrest = 40;
                this.dampConstant= 0.5;
                this.springConstant = 0.7
            }
            lean(a){
                this.leff += (this.lrest - a - this.leff) / 5
            }
            rotate(a){
                var b = this.b.pos.sub(this.a.pos),
                    b = new GAME.Vector(-b.y / this.leff,b.x / this.leff);
                this.a.pos.addToSelf(b.scale(a));
                this.b.pos.addToSelf(b.scale(-a))
            }
            update(){
                var a = this.b.pos.sub(this.a.pos),
                    b = a.getLength();
                if(1 > b)
                    return this;
                a = a.scale(1 / b);
                b = a.scale((b - this.leff) * this.springConstant);
                b.addToSelf(a.scale(this.b.vel.sub(this.a.vel).dot(a) * this.dampConstant));
                this.b.vel.addToSelf(b.scale(-1));
                this.a.vel.addToSelf(b);
                return this
            }
            swap(){
                var a = new GAME.Vector;
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
            getLength(){
                return this.b.pos.sub(this.a.pos).getLength()
            }
            clone(){
                var a = new GAME.Spring(this.a,this.b,this.track);
                a.lrest = this.lrest;
                a.leff = this.leff;
                a.dampConstant= this.dampConstant;
                a.springConstant = this.springConstant;
                return a
            }
            toJSON(){
                return {
                    type: "Spring",
                    a: this.a,
                    b: this.b,
                    lrest: this.lrest,
                    leff: this.leff,
                    dampConstant: this.dampConstant,
                    springConstant: this.springConstant
                }
            } 
        }
    },
    get Vehicle() {
        return class {
            init(a) {
                this.track = a,
                this.gravity = new GAME.Vector(0,.3),
                this.complete = !1,
                this.alive = !0,
                this.crashed = !1,
                this.dir = 1,
                this.ghost = !1,
                this.ragdoll = !1,
                this.explosion = !1,
                this.motor = 0,
                this.powerupsEnabled = !0,
                this.createCosmetics()
            }
            createCosmetics() {
                var t = null || this.firstPlayer && this.firstPlayer._user
                  , e = {head: "hat"} || t.cosmetics;
                this.cosmetics = e
            }
            trackComplete(){
                var a = this.track;
                this.collide("hitTarget");
                if(this.pastCheckpoint & 2){
                    if(this.collide("hitGoal"),
                    a.targets && a.firstPlayer.targetsCollected === a.targets && 0 < a.currentTime && (!a.time || this.time < a.time) && a.id !== void 0){
                        for(var b = "", c, d = 0, e = records.length; d < e; d++){
                            for(c in records[d])
                                isNaN(c) || (b += c + " ");
                            b += ","
                        }
                        c = new XMLHttpRequest;
                        c.open("POST", "/tracks/ghost_save", true);
                        c.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        c.onload = function () {
                            if(c.readyState === c.DONE) {
                                if(c.status === 200) {
                                    if(c.response.startsWith("Ghost")) {
                                        alert(c.response)
                                    }
                                }
                            }
                        };
                        c.send("id=" + window.location.pathname.split("/")[2] + "&vehicle=" + this.vehicle + "&time=" + a.currentTime + "&code=" + b + a.currentTime + "," + this.vehicle);
                        a.firstPlayer.gamepad.left = a.firstPlayer.gamepad.right = a.firstPlayer.gamepad.up = a.firstPlayer.gamepad.brake = 0
                    }
                } else if(this.pastCheckpoint & 1){
                    this.collide("hitCheckpoint");
                    for(var i in a.players) {
                        a.players[i].checkpoints.push(a.players[i].snapshot())
                    }
                }
                this.pastCheckpoint = 0
            }
            die = () => {
                this.dead = !0;
                this.head.drive = () => {};
                this.rearWheel.motor = 0;
                this.rearWheel.brake = !1;
                this.frontWheel.brake = !1;
                this.head.collide = !1;
                var bike = this.track.firstPlayer = this.track.players[0] = new GAME.DeadBike(this,this.getStickMan(),this.track,this.checkpoints);
                bike.hat = new GAME.Shard(this.head.pos.clone(),this);
                bike.hat.vel = this.head.vel.clone();
                bike.hat.size = 10;
                bike.hat.da = 0.1
            }
            getStickMan(){
                var a = {}
                , b = this.frontWheel.pos.sub(this.rearWheel.pos)
                , c = new GAME.Vector(b.y * this.dir,-b.x * this.dir);
                a.head = this.rearWheel.pos.add(b.scale(0.35)).add(this.head.pos.sub(this.frontWheel.pos.add(this.rearWheel.pos).scale(0.5)).scale(1.2));
                a.hand = a.shadowHand = this.rearWheel.pos.add(b.scale(0.8)).add(c.scale(0.68));
                var d = a.head.sub(a.hand)
                , d = new GAME.Vector(d.y * this.dir,-d.x * this.dir);
                a.elbow = a.shadowElbow = a.head.add(a.hand).scale(0.5).add(d.scale(130 / d.lengthSquared()));
                a.hip = this.rearWheel.pos.add(b.scale(0.2)).add(c.scale(0.5));
                var e = new GAME.Vector(6 * Math.cos(this.pedalSpeed),6 * Math.sin(this.pedalSpeed));
                a.foot = this.rearWheel.pos.add(b.scale(0.4)).add(c.scale(0.05)).add(e);
                d = a.hip.sub(a.foot);
                d = new GAME.Vector(-d.y * this.dir,d.x * this.dir);
                a.knee = a.hip.add(a.foot).scale(0.5).add(d.scale(160 / d.lengthSquared()));
                a.shadowFoot = this.rearWheel.pos.add(b.scale(0.4)).add(c.scale(0.05)).sub(e);
                d = a.hip.sub(a.shadowFoot);
                d = new GAME.Vector(-d.y * this.dir,d.x * this.dir);
                a.shadowKnee = a.hip.add(a.shadowFoot).scale(0.5).add(d.scale(160 / d.lengthSquared()));
                return a
            }
            setButtonDown(a) {
                this.gamepad[a] = 1
            }
            setButtonUp(a) {
                this.gamepad[a] = 0
            }
            isButtonDown(a) {
                return this.gamepad[a] == 1
            }
            update(){
                var a = this.track.currentTime;
                if(this.pastCheckpoint) {
                    this.trackComplete()
                }
                if(!!this.ghost_data) {
                    this.ghost_data[0][a] && (this.gamepad.left = this.gamepad.left ? 0 : 1);
                    this.ghost_data[1][a] && (this.gamepad.right = this.gamepad.right ? 0 : 1);
                    this.ghost_data[2][a] && (this.gamepad.up = this.gamepad.up ? 0 : 1);
                    this.ghost_data[3][a] && (this.gamepad.brake = this.gamepad.brake ? 0 : 1);
                    this.ghost_data[4][a] && this.swap();
                } else {
                    if(this.gamepad.left !== this.oldGamepad.left)
                        records[0][a] = 1,
                        this.oldGamepad.left = this.gamepad.left;
                    if(this.gamepad.right !== this.oldGamepad.right)
                        records[1][a] = 1,
                        this.oldGamepad.right = this.gamepad.right;
                    if(this.gamepad.up !== this.oldGamepad.up)
                        records[2][a] = 1,
                        this.oldGamepad.up = this.gamepad.up;
                    if(this.gamepad.brake !== this.oldGamepad.brake)
                        records[3][a] = 1,
                        this.oldGamepad.brake = this.gamepad.brake;
                    if(this.isButtonDown("swap")) {
                        this.swap();
                        records[4][a] = 1
                    }
                }
                if(!this.dead) {
                    this.setProperties()
                }
                for(a = this.springs.length - 1; 0 <= a; a--)
                    this.springs[a].update();
                for(a = this.masses.length - 1; 0 <= a; a--)
                    this.masses[a].update();
                if(this.rearWheel.touching && this.frontWheel.touching) {
                    this.slow = !1
                }
                if(!this.slow && !this.dead){
                    this.setProperties();
                    for(a = this.springs.length - 1; 0 <= a; a--)
                        this.springs[a].update();
                    for(a = this.masses.length - 1; 0 <= a; a--)
                        this.masses[a].update()
                }
            }
            collide(a){
                if(this.checkpoints) {
                    if(this.checkpoints[a]) {
                        for(var i in b) {
                            this.checkpoints[i].apply(this, _slice.call(arguments, 1))
                        }
                    }
                }
            }
            clone(){
                var a = this.rearWheel.clone()
                , b = this.frontWheel.clone()
                , c = this.head.clone()
                , d = this.rearSpring.clone()
                , e = this.chasse.clone()
                , f = this.frontSpring.clone();
                return {
                    rearWheel: a,
                    frontWheel: b,
                    head: c,
                    bike: [c, a, b],
                    springs: [d, e, f],
                    dir: this.dir,
                    gravity: this.gravity.clone(),
                    slow: this.slow,
                    time: this.time
                }
            }
            moveVehicle(a, b) {
                for (var i = this.masses, s = i.length, n = s - 1; n >= 0; n--)
                    i[n].pos.x = i[n].pos.x + a,
                    i[n].pos.y = i[n].pos.y + b,
                    i[n].old.x = i[n].old.x + a,
                    i[n].old.y = i[n].old.y + b
            }
            moveVehicleAbsolute(a, b, c) {
                this.masses[0].pos.copy(a.pos),
                this.masses[0].old.copy(a.old),
                this.masses[0].vel.copy(a.vel),
                this.masses[1].pos.copy(b.pos),
                this.masses[1].old.copy(b.old),
                this.masses[1].vel.copy(b.vel),
                this.masses[2].pos.copy(c.pos),
                this.masses[2].old.copy(c.old),
                this.masses[2].vel.copy(c.vel)
            }
            toJSON(){
                return {
                    type: this.toString(),
                    keys: records.map(Object.keys),
                    rearWheel: this.rearWheel,
                    frontWheel: this.frontWheel,
                    head: this.head,
                    z: this.z,
                    D: this.D,
                    A: this.A,
                    direction: this.dir,
                    gravity: this.gravity,
                    slow: this.slow,
                    time: this.time
                }
            }
            toString(){
                "BikeGeneric"
            }
        }
    },
    get BMXBike() {
        return class extends GAME.Vehicle {
            constructor(a, b, c = [], d = !1) {
                super();
                this.init(a);
                this.ghost = !!d;
                d && (this.ghost_data = d);
                this.checkpoints = c;
                this.createMasses(),
                this.createSprings(),
                -1 === b && this.swap(),
                this.pastCheckpoint = !1;
                if(this.checkpoints.length > 0) {
                    var cp = this.checkpoints[this.checkpoints.length - 1];
                    this.dir = cp.dir;
                    this.gravity = new GAME.Vector(cp.gravity.x, cp.gravity.y);
                    this.slow = cp.slow;
                    this.targetsCollected = cp.targetsCollected;
                    this.time = cp.time;
                    this.oldGamepad = cp.oldGamepad;
                    for(var i in this.track.powerups) {
                        this.track.powerups[i].used = cp.powerups[i];
                    }
                    for(var i in records) {
                        for(var x in records[i]) {
                            if(x >= this.time) {
                                delete records[i][x];
                            }
                        }
                    }
                } else {
                    this.slow = !1,
                    this.time = 0,
                    this.targetsCollected = 0;
                    this.oldGamepad = { up: 0, brake: 0, left: 0, right: 0, swap: 0 };
                    for(var i in this.track.powerups)
                        this.track.powerups[i].used = 0
                }
            }
            vehicle = "BMX";
            vehicleName = "BMX";
            vehicleInit = this.init;
            vehicleUpdate = this.update;
            masses = null;
            springs = null;
            cosmetics = null;
            dead = !1;
            pedalSpeed = 0;
            powerupsConsumed = 0;
            cosmeticHead = null;
            cosmeticRearWheel = null;
            cosmeticFrontWheel = null;
            swapped = !1;
            ragdoll = null;
            checkpointsCache = [];
            gamepad = { up: 0, brake: 0, left: 0, right: 0, swap: 0 };
            createMasses() {
                var a = 0, b = -1,
                    c = 21, d = 38,
                    e = -21, f = 38,
                    g = new GAME.Vector(0,0),
                    h = new GAME.Vector(0,0),
                    i = new GAME.Vector(0,0),
                    j = 0,
                    k = 0;
                if(this.checkpoints.length > 0) {
                    var cp = this.checkpoints[this.checkpoints.length - 1];
                    a = cp.masses[0].pos.x, b = cp.masses[0].pos.y,
                    c = cp.masses[1].pos.x, d = cp.masses[1].pos.y,
                    e = cp.masses[2].pos.x, f = cp.masses[2].pos.y,
                    g = new GAME.Vector(cp.masses[0].vel.x,cp.masses[0].vel.y),
                    h = new GAME.Vector(cp.masses[1].vel.x,cp.masses[1].vel.y),
                    i = new GAME.Vector(cp.masses[2].vel.x,cp.masses[2].vel.y),
                    j = cp.masses[1].motor,
                    k = cp.masses[2].motor;
                }
                this.masses = [this.head = new GAME.BodyPart(new GAME.Vector(a,b),this), this.frontWheel = new GAME.Wheel(new GAME.Vector(c,d),this), this.rearWheel = new GAME.Wheel(new GAME.Vector(e,f),this)];
                this.head.drive = this.die,
                this.head.size = 14,
                this.frontWheel.size = this.rearWheel.size = 11.7,
                this.head.vel = g,
                this.frontWheel.vel = h,
                this.rearWheel.vel = i,
                this.frontWheel.motor = j,
                this.rearWheel.motor = k;
                if(this.checkpoints.length > 0)
                    this.head.old = new GAME.Vector(cp.masses[0].old.x,cp.masses[0].old.y),
                    this.frontWheel.old = new GAME.Vector(cp.masses[1].old.x,cp.masses[1].old.y),
                    this.rearWheel.old = new GAME.Vector(cp.masses[2].old.x,cp.masses[2].old.y)
            }
            createSprings() {
                var a = 45,
                    b = 42,
                    c = 45;
                if(this.checkpoints.length > 0) {
                    var cp = this.checkpoints[this.checkpoints.length - 1];
                    a = cp.springs[0].leff,
                    b = cp.springs[1].leff,
                    c = cp.springs[2].leff;
                }
                this.springs = [
                    this.rearSpring = new GAME.Spring(this.head,this.rearWheel,this),
                    this.chasse = new GAME.Spring(this.rearWheel,this.frontWheel,this),
                    this.frontSpring = new GAME.Spring(this.frontWheel,this.head,this)
                ];
                this.rearSpring.lrest = 45,
                this.chasse.lrest = 42,
                this.frontSpring.lrest = 45,
                this.chasse.springConstant = this.rearSpring.springConstant = this.frontSpring.springConstant = .35,
                this.chasse.dampConstant = this.rearSpring.dampConstant = this.frontSpring.dampConstant = .3,
                this.rearSpring.leff = a
                this.chasse.leff = b,
                this.frontSpring.leff = c
            }
            createRagdoll() {
                this.ragdoll = new Ragdoll(this.getStickMan(),this),
                this.ragdoll.zero(this.head.vel, this.rearWheel.vel),
                this.ragdoll.dir = this.dir,
                this.rearWheel.motor = 0,
                this.rearWheel.brake = !1,
                this.frontWheel.brake = !1,
                this.head.collide = !1,
                this.updateCameraFocalPoint(),
                this.firstPlayer.isInFocus() && this.playBailSound(),
                this.dead()
            }
            swap(){
                wa = this.gamepad.swap = !1;
                this.dir *= -1;
                this.chasse.swap();
                var a = this.rearSpring.leff;
                this.rearSpring.leff = this.frontSpring.leff;
                this.frontSpring.leff = a;
                this.swapped = this.swapped && !1 || !0;
                this.collide("turn")
            }
            setProperties(){
                this.gamepad.swap && this.swap();
                this.rearWheel.motor += (this.gamepad.up - this.rearWheel.motor) / 10;
                this.gamepad.up && (this.pedalSpeed += this.rearWheel.pedalSpeed / 5);
                this.rearWheel.brake = this.frontWheel.brake = this.gamepad.brake;
                var a = this.gamepad.left - this.gamepad.right;
                this.rearSpring.lean(5 * a * this.dir);
                this.frontSpring.lean(5 * -a * this.dir);
                this.chasse.rotate(a / 6);
                !a && this.gamepad.up && (this.rearSpring.lean(-7),
                this.frontSpring.lean(7))
            }
            draw(){
                var a, b, c, d, e = this.track.zoom, f = this.dir, h = this.rearWheel.pos.toPixel(), i = this.frontWheel.pos.toPixel();
                K.globalAlpha = this.ghost ? .5 : 1;
                K.strokeStyle = "#000";
                K.lineWidth = 3.5 * e;
                K.beginPath(),K.arc(h.x, h.y, 10 * e, 0, 2 * Math.PI, !0),K.moveTo(i.x + 10 * e, i.y),K.arc(i.x, i.y, 10 * e, 0, 2 * Math.PI, !0),K.stroke();
                var l = i.x - h.x
                , m = i.y - h.y
                , i = new GAME.Vector((i.y - h.y) * f,(h.x - i.x) * f);
                a = h.x + 0.3 * l + 0.25 * i.x;
                b = h.y + 0.3 * m + 0.25 * i.y;
                var n = h.x + 0.84 * l + 0.42 * i.x
                , x = h.y + 0.84 * m + 0.42 * i.y;
                c = h.x + 0.84 * l + 0.37 * i.x;
                d = h.y + 0.84 * m + 0.37 * i.y;
                var w = h.x + 0.4 * l + 0.05 * i.x
                , y = h.y + 0.4 * m + 0.05 * i.y;
                K.lineWidth = 3 * e;
                K.beginPath(),K.moveTo(h.x, h.y),K.lineTo(a, b),K.lineTo(n, x),K.moveTo(c, d),K.lineTo(w, y),K.lineTo(h.x, h.y);
                c = 6 * Math.cos(this.pedalSpeed) * e;
                d = 6 * Math.sin(this.pedalSpeed) * e;
                n = w + c;
                x = y + d;
                c = w - c;
                d = y - d;
                var C = h.x + 0.17 * l + 0.38 * i.x
                , M = h.y + 0.17 * m + 0.38 * i.y
                , X = h.x + 0.3 * l + 0.45 * i.x
                , ya = h.y + 0.3 * m + 0.45 * i.y
                , T = h.x + 0.25 * l + 0.4 * i.x
                , Y = h.y + 0.25 * m + 0.4 * i.y;
                K.moveTo(n, x),K.lineTo(c, d),K.moveTo(C, M),K.lineTo(X, ya),K.moveTo(w, y),K.lineTo(T, Y);
                var C = h.x + 0.97 * l
                , M = h.y + 0.97 * m
                , X = h.x + 0.8 * l + 0.48 * i.x
                , ya = h.y + 0.8 * m + 0.48 * i.y
                , T = h.x + 0.86 * l + 0.5 * i.x
                , Y = h.y + 0.86 * m + 0.5 * i.y
                , za = h.x + 0.82 * l + 0.65 * i.x
                , rc = h.y + 0.82 * m + 0.65 * i.y
                , w = h.x + 0.78 * l + 0.67 * i.x
                , y = h.y + 0.78 * m + 0.67 * i.y;
                K.moveTo(h.x + l, h.y + m),K.lineTo(C, M),K.lineTo(X, ya),K.lineTo(T, Y),K.lineTo(za, rc),K.lineTo(w, y),K.stroke();
                if(!this.dead){
                    K.lineCap = "round";
                    i = this.head.pos.toPixel();
                    i = {
                        x: i.x - h.x - 0.5 * l,
                        y: i.y - h.y - 0.5 * m
                    };
                    h = a - 0.1 * l + 0.3 * i.x;
                    C = b - 0.1 * m + 0.3 * i.y;
                    T = n - h;
                    Y = x - C;
                    za = T * T + Y * Y;
                    M = h + 0.5 * T + 200 * Y * f * e * e / za;
                    X = C + 0.5 * Y + 200 * -T * f * e * e / za;
                    T = c - h;
                    Y = d - C;
                    za = T * T + Y * Y;
                    ya = h + 0.5 * T + 200 * Y * f * e * e / za;
                    T = C + 0.5 * Y + 200 * -T * f * e * e / za;
                    K.lineWidth = 6 * e;
                    K.strokeStyle = "rgba(0, 0, 0, 0.5)";
                    K.beginPath(),K.moveTo(c, d),K.lineTo(ya, T),K.lineTo(h, C),K.stroke();
                    K.strokeStyle = "#000";
                    K.beginPath(),K.moveTo(n, x),K.lineTo(M, X),K.lineTo(h, C),K.stroke();
                    n = a + 0.05 * l + 0.88 * i.x;
                    x = b + 0.05 * m + 0.88 * i.y;
                    K.lineWidth = 8 * e;
                    K.beginPath(),K.moveTo(h, C),K.lineTo(n, x),K.stroke();
                    c = a + 0.15 * l + 1.05 * i.x;
                    d = b + 0.15 * m + 1.05 * i.y;
                    K.lineWidth = 2 * e;
                    K.beginPath(),K.moveTo(c + 5 * e, d),K.arc(c, d, 5 * e, 0, 2 * Math.PI, !0),K.stroke(),K.beginPath();
                    switch (this.cosmetics.head){
                    case "cap":
                        c = a + 0.4 * l + 1.1 * i.x;
                        d = b + 0.4 * m + 1.1 * i.y;
                        a = a + 0.05 * l + 1.05 * i.x;
                        b = b + 0.05 * m + 1.05 * i.y;
                        K.moveTo(a, b),K.lineTo(c, d),K.stroke();
                        break;
                    case "hat":
                        c = a + 0.35 * l + 1.15 * i.x;
                        d = b + 0.35 * m + 1.15 * i.y;
                        h = a - 0.05 * l + 1.1 * i.x;
                        C = b - 0.05 * m + 1.1 * i.y;
                        M = a + 0.25 * l + 1.13 * i.x;
                        X = b + 0.25 * m + 1.13 * i.y;
                        a = a + 0.05 * l + 1.11 * i.x;
                        b = b + 0.05 * m + 1.11 * i.y;
                        ya = c - 0.1 * l + 0.2 * i.x;
                        T = d - 0.1 * m + 0.2 * i.y;
                        l = h + 0.02 * l + 0.2 * i.x;
                        m = C + 0.02 * m + 0.2 * i.y;
                        K.fillStyle = "#000";
                        K.moveTo(c, d),K.lineTo(M, X),K.lineTo(ya, T),K.lineTo(l, m),K.lineTo(a, b),K.lineTo(h, C),K.stroke(),K.fill();
                        break;
                    case "ninja":
                        c = a + 0.26 * l + 1.1 * i.x,
                        d = b + 0.26 * m + 1.1 * i.y,
                        a = a + 0.05 * l + 1.05 * i.x,
                        b = b + 0.05 * m + 1.05 * i.y,
                        K.lineWidth = 5 * e,
                        K.moveTo(c, d),K.lineTo(a, b),K.stroke(),K.lineWidth = 2 * e,
                        K.lineTo(a - (8 + Math.random()) * e * f, b - (4 + Math.random()) * e * f),K.moveTo(a, b),K.lineTo(a - (8 + Math.random()) * e * f, b + (4 + Math.random()) * e * f),K.stroke()
                    }
                    l = n - w;
                    m = x - y;
                    i = {
                        x: m * f * e * e,
                        y: -l * f * e * e
                    };
                    f = l * l + m * m;
                    l = w + 0.4 * l + 130 * i.x / f;
                    m = y + 0.4 * m + 130 * i.y / f;
                    K.lineWidth = 5 * e;
                    K.beginPath(),K.moveTo(n, x),K.lineTo(l, m),K.lineTo(w, y),K.stroke()
                }
                K.globalAlpha = 1;
            }
            snapshot() {
                var oldGamepad = {}, powerups = [];
                for(var i in this.oldGamepad)
                    oldGamepad[i] = this.oldGamepad[i];
                for(var i in this.track.powerups)
                    powerups.push(this.track.powerups[i].used);
                return {
                    records: records,
                    oldGamepad: oldGamepad,
                    masses: [
                        this.head.clone(),
                        this.frontWheel.clone(),
                        this.rearWheel.clone()
                    ],
                    springs: [
                        this.rearSpring.clone(),
                        this.chasse.clone(),
                        this.frontSpring.clone()
                    ],
                    dir: this.dir,
                    gravity: new GAME.Vector(this.gravity.x, this.gravity.y),
                    slow: this.slow,
                    targetsCollected: this.targetsCollected,
                    powerups: powerups,
                    time: this.track.currentTime
                }
            }
        }
    },
    get MountainBike() {
        return class  extends GAME.Vehicle {
            constructor(a, b, c = [], d) {
                super();
                this.init(a);
                this.ghost = !!d;
                d && (this.ghost_data = d);
                this.checkpoints = c;
                this.createMasses(),
                this.createSprings(),
                -1 === b && this.swap()
                this.pastCheckpoint = !1;
                if(this.checkpoints.length > 0) {
                    var cp = this.checkpoints[this.checkpoints.length - 1];
                    this.dir = cp.dir;
                    this.gravity = new GAME.Vector(cp.gravity.x, cp.gravity.y);
                    this.slow = cp.slow;
                    this.targetsCollected = cp.targetsCollected;
                    this.time = cp.time;
                    this.oldGamepad = cp.oldGamepad;
                    for(var i in this.track.powerups) {
                        this.track.powerups[i].used = cp.powerups[i];
                    }
                    for(var i in records) {
                        for(var x in records[i]) {
                            if(x > this.time) {
                                delete records[i][x];
                            }
                        }
                    }
                } else {
                    this.slow = !1,
                    this.time = 0,
                    this.targetsCollected = 0;
                    this.oldGamepad = { up: 0, brake: 0, left: 0, right: 0, swap: 0 };
                    for(var i in this.track.powerups)
                        this.track.powerups[i].used = 0
                }
            }
            vehicle = "MTB";
            vehicleName = "MTB";
            vehicleUpdate = this.update;
            masses = null;
            springs = null;
            cosmetics = null;
            slow = !1;
            dead = !1;
            pedalSpeed = 0;
            targetsCollected = 0;
            cosmeticHead = null;
            cosmeticRearWheel = null;
            cosmeticFrontWheel = null;
            swapped = !1;
            ragdoll = null;
            checkpointsCache = [];
            gamepad = {
                up: 0,
                brake: 0,
                left: 0,
                right: 0,
                swap: 0
            }
            createMasses() {
                var a = 2, b = -3,
                    c = 23, d = 35,
                    e = -23, f = 35,
                    g = new GAME.Vector(0,0),
                    h = new GAME.Vector(0,0),
                    i = new GAME.Vector(0,0),
                    j = 0,
                    k = 0;
                if(this.checkpoints.length > 0) {
                    var cp = this.checkpoints[this.checkpoints.length - 1];
                    a = cp.masses[0].pos.x, b = cp.masses[0].pos.y,
                    c = cp.masses[1].pos.x, d = cp.masses[1].pos.y,
                    e = cp.masses[2].pos.x, f = cp.masses[2].pos.y,
                    g = new GAME.Vector(cp.masses[0].vel.x,cp.masses[0].vel.y),
                    h = new GAME.Vector(cp.masses[1].vel.x,cp.masses[1].vel.y),
                    i = new GAME.Vector(cp.masses[2].vel.x,cp.masses[2].vel.y),
                    j = cp.masses[1].motor,
                    k = cp.masses[2].motor;
                }
                this.masses = [this.head = new GAME.BodyPart(new GAME.Vector(a,b),this), this.frontWheel = new GAME.Wheel(new GAME.Vector(c,d),this), this.rearWheel = new GAME.Wheel(new GAME.Vector(e,f),this)];
                this.head.drive = this.die,
                this.head.size = this.rearWheel.size = this.frontWheel.size = 14,
                this.head.vel = g,
                this.frontWheel.vel = h,
                this.rearWheel.vel = i,
                this.frontWheel.motor = j,
                this.rearWheel.motor = k;
                if(this.checkpoints.length > 0)
                    this.head.old = new GAME.Vector(cp.masses[0].old.x,cp.masses[0].old.y),
                    this.frontWheel.old = new GAME.Vector(cp.masses[1].old.x,cp.masses[1].old.y),
                    this.rearWheel.old = new GAME.Vector(cp.masses[2].old.x,cp.masses[2].old.y)
            }
            createSprings() {
                var a = 47,
                    b = 45,
                    c = 45;
                if(this.checkpoints.length > 0) {
                    var cp = this.checkpoints[this.checkpoints.length - 1];
                    a = cp.springs[0].leff,
                    b = cp.springs[1].leff,
                    c = cp.springs[2].leff;
                }
                this.springs = [
                    this.rearSpring = new GAME.Spring(this.head,this.rearWheel,this),
                    this.chasse = new GAME.Spring(this.rearWheel,this.frontWheel,this),
                    this.frontSpring = new GAME.Spring(this.frontWheel,this.head,this)
                ];
                this.rearSpring.lrest = 47,
                this.chasse.lrest = 45,
                this.frontSpring.lrest = 45,
                this.chasse.springConstant = this.rearSpring.springConstant = this.frontSpring.springConstant = .2,
                this.chasse.dampConstant = this.rearSpring.dampConstant = this.frontSpring.dampConstant = .3,
                this.rearSpring.leff = a
                this.chasse.leff = b,
                this.frontSpring.leff = c
            }
            swap(){
                wa = this.gamepad.swap = !1;
                this.dir *= -1;
                this.chasse.swap();
                var a = this.rearSpring.leff;
                this.rearSpring.leff = this.frontSpring.leff;
                this.frontSpring.leff = a;
                this.swapped = this.swapped && !1 || !0;
                this.collide("turn")
            }
            setProperties() {
                this.gamepad.swap && this.swap();
                this.rearWheel.motor += (this.gamepad.up - this.rearWheel.motor) / 10;
                this.gamepad.up && (this.pedalSpeed += this.rearWheel.pedalSpeed / 5);
                this.rearWheel.brake = this.frontWheel.brake = this.gamepad.brake;
                var a = this.gamepad.left - this.gamepad.right;
                this.rearSpring.lean(5 * a * this.dir);
                this.frontSpring.lean(5 * -a * this.dir);
                this.chasse.rotate(a / 8);
                !a && this.gamepad.up && (this.rearSpring.lean(-7),
                this.frontSpring.lean(7))
            }
            getStickMan() {
                var a = {}
                , b = this.frontWheel.pos.sub(this.rearWheel.pos)
                , c = new GAME.Vector(b.y * this.dir,-b.x * this.dir);
                a.head = this.rearWheel.pos.add(b.scale(0.35)).add(this.head.pos.sub(this.frontWheel.pos.add(this.rearWheel.pos).scale(0.5)).scale(1.2));
                a.hand = a.shadowHand = this.rearWheel.pos.add(b.scale(0.8)).add(c.scale(0.68));
                var d = a.head.sub(a.hand)
                , d = new GAME.Vector(d.y * this.dir,-d.x * this.dir);
                a.elbow = a.shadowElbow = a.head.add(a.hand).scale(0.5).add(d.scale(130 / d.lengthSquared()));
                a.hip = this.rearWheel.pos.add(b.scale(0.2)).add(c.scale(0.5));
                var e = new GAME.Vector(6 * Math.cos(this.pedalSpeed),6 * Math.sin(this.pedalSpeed));
                a.foot = this.rearWheel.pos.add(b.scale(0.4)).add(c.scale(0.05)).add(e);
                d = a.hip.sub(a.foot);
                d = new GAME.Vector(-d.y * this.dir,d.x * this.dir);
                a.knee = a.hip.add(a.foot).scale(0.5).add(d.scale(160 / d.lengthSquared()));
                a.shadowFoot = this.rearWheel.pos.add(b.scale(0.4)).add(c.scale(0.05)).sub(e);
                d = a.hip.sub(a.shadowFoot);
                d = new GAME.Vector(-d.y * this.dir,d.x * this.dir);
                a.shadowKnee = a.hip.add(a.shadowFoot).scale(0.5).add(d.scale(160 / d.lengthSquared()));
                return a
            }
            draw(){
                var a = this.track
                , b = this.rearWheel.pos.toPixel()
                , c = this.frontWheel.pos.toPixel()
                , d = this.head.pos.toPixel()
                , e = c.sub(b)
                , f = new GAME.Vector((c.y - b.y) * this.dir,(b.x - c.x) * this.dir)
                , h = d.sub(b.add(e.scale(0.5)));
                K.strokeStyle = "#000";
                K.lineWidth = 3.5 * a.zoom;
                K.beginPath(),K.arc(b.x, b.y, 12.5 * a.zoom, 0, 2 * Math.PI, !0),K.moveTo(c.x + 12.5 * a.zoom, c.y),K.arc(c.x, c.y, 12.5 * a.zoom, 0, 2 * Math.PI, !0),K.stroke(),K.beginPath(),K.fillStyle = "grey";
                K.moveTo(b.x + 5 * a.zoom, b.y),K.arc(b.x, b.y, 5 * a.zoom, 0, 2 * Math.PI, !0),K.moveTo(c.x + 4 * a.zoom, c.y),K.arc(c.x, c.y, 4 * a.zoom, 0, 2 * Math.PI, !0),K.fill(),K.beginPath(),K.lineWidth = 5 * a.zoom;
                K.moveTo(b.x, b.y),K.lineTo(b.x + 0.4 * e.x + 0.05 * f.x, b.y + 0.4 * e.y + 0.05 * f.y),K.moveTo(b.x + 0.72 * e.x + 0.64 * h.x, b.y + 0.72 * e.y + 0.64 * h.y),K.lineTo(b.x + 0.46 * e.x + 0.4 * h.x, b.y + 0.46 * e.y + 0.4 * h.y),K.lineTo(b.x + 0.4 * e.x + 0.05 * f.x, b.y + 0.4 * e.y + 0.05 * f.y),K.stroke(),K.beginPath(),K.lineWidth = 2 * a.zoom;
                var i = new GAME.Vector(6 * Math.cos(this.pedalSpeed) * a.zoom,6 * Math.sin(this.pedalSpeed) * a.zoom);
                K.moveTo(b.x + 0.72 * e.x + 0.64 * h.x, b.y + 0.72 * e.y + 0.64 * h.y),K.lineTo(b.x + 0.43 * e.x + 0.05 * f.x, b.y + 0.43 * e.y + 0.05 * f.y),K.moveTo(b.x + 0.45 * e.x + 0.3 * h.x, b.y + 0.45 * e.y + 0.3 * h.y),K.lineTo(b.x + 0.3 * e.x + 0.4 * h.x, b.y + 0.3 * e.y + 0.4 * h.y),K.lineTo(b.x + 0.25 * e.x + 0.6 * h.x, b.y + 0.25 * e.y + 0.6 * h.y),K.moveTo(b.x + 0.17 * e.x + 0.6 * h.x, b.y + 0.17 * e.y + 0.6 * h.y),K.lineTo(b.x + 0.3 * e.x + 0.6 * h.x, b.y + 0.3 * e.y + 0.6 * h.y),K.moveTo(b.x + 0.43 * e.x + 0.05 * f.x + i.x, b.y + 0.43 * e.y + 0.05 * f.y + i.y),K.lineTo(b.x + 0.43 * e.x + 0.05 * f.x - i.x, b.y + 0.43 * e.y + 0.05 * f.y - i.y),K.stroke(),K.beginPath(),K.lineWidth = a.zoom;
                K.moveTo(b.x + 0.46 * e.x + 0.4 * h.x, b.y + 0.46 * e.y + 0.4 * h.y),K.lineTo(b.x + 0.28 * e.x + 0.5 * h.x, b.y + 0.28 * e.y + 0.5 * h.y),K.stroke(),K.beginPath(),K.lineWidth = 3 * a.zoom;
                K.moveTo(c.x, c.y),K.lineTo(b.x + 0.71 * e.x + 0.73 * h.x, b.y + 0.71 * e.y + 0.73 * h.y),K.lineTo(b.x + 0.73 * e.x + 0.77 * h.x, b.y + 0.73 * e.y + 0.77 * h.y),K.lineTo(b.x + 0.7 * e.x + 0.8 * h.x, b.y + 0.7 * e.y + 0.8 * h.y),K.stroke();
                if(!this.dead){
                    K.lineCap = "round";
                    var f = d.sub(b.add(e.scale(0.5)))
                    , c = b.add(e.scale(0.3)).add(f.scale(0.25))
                    , h = b.add(e.scale(0.4)).add(f.scale(0.05))
                    , d = h.add(i)
                    , l = h.sub(i)
                    , b = b.add(e.scale(0.67)).add(f.scale(0.8))
                    , i = c.add(e.scale(-0.05)).add(f.scale(0.42))
                    , m = d.sub(i)
                    , h = (new GAME.Vector(m.y * this.dir,-m.x * this.dir)).scaleSelf(a.zoom * a.zoom)
                    , n = i.add(m.scale(0.5)).add(h.scale(200 / m.lengthSquared()))
                    , m = l.sub(i)
                    , h = (new GAME.Vector(m.y * this.dir,-m.x * this.dir)).scaleSelf(a.zoom * a.zoom)
                    , h = i.add(m.scale(0.5)).add(h.scale(200 / m.lengthSquared()));
                    K.beginPath(),K.lineWidth = 6 * a.zoom;
                    K.strokeStyle = "rgba(0, 0, 0, 0.5)";
                    K.moveTo(l.x, l.y),K.lineTo(h.x, h.y),K.lineTo(i.x, i.y),K.stroke(),K.beginPath(),K.strokeStyle = "#000";
                    K.moveTo(d.x, d.y),K.lineTo(n.x, n.y),K.lineTo(i.x, i.y),K.stroke(),K.lineWidth = 8 * a.zoom;
                    h = c.add(e.scale(0.1)).add(f.scale(0.93));
                    d = c.add(e.scale(0.2)).add(f.scale(1.09));
                    K.beginPath(),K.moveTo(i.x, i.y),K.lineTo(h.x, h.y),K.stroke(),K.beginPath(),K.lineWidth = 2 * a.zoom;
                    K.moveTo(d.x + 5 * a.zoom, d.y),K.arc(d.x, d.y, 5 * a.zoom, 0, 2 * Math.PI, !0),K.stroke(),K.beginPath();
                    switch (this.cosmetics.head){
                    case "cap":
                        d = c.add(e.scale(0.4)).add(f.scale(1.15));
                        e = c.add(e.scale(0.1)).add(f.scale(1.05));
                        K.moveTo(d.x, d.y),K.lineTo(e.x, e.y),K.stroke();
                        break;
                    case "hat":
                        d = c.add(e.scale(0.37)).add(f.scale(1.19)),
                        i = c.sub(e.scale(0.02)).add(f.scale(1.14)),
                        l = c.add(e.scale(0.28)).add(f.scale(1.17)),
                        c = c.add(e.scale(0.09)).add(f.scale(1.15)),
                        n = d.sub(e.scale(0.1)).addToSelf(f.scale(0.2)),
                        e = i.add(e.scale(0.02)).addToSelf(f.scale(0.2)),
                        K.fillStyle = "#000",
                        K.moveTo(d.x, d.y),K.lineTo(l.x, l.y),K.lineTo(n.x, n.y),K.lineTo(e.x, e.y),K.lineTo(c.x, c.y),K.lineTo(i.x, i.y),K.stroke(),K.fill()
                    }
                    e = h.sub(b);
                    f = new GAME.Vector(e.y * this.dir,-e.x * this.dir);
                    f = f.scale(a.zoom * a.zoom);
                    e = b.add(e.scale(0.3)).add(f.scale(80 / e.lengthSquared()));
                    K.lineWidth = 5 * a.zoom;
                    K.beginPath(),K.moveTo(h.x, h.y),K.lineTo(e.x, e.y),K.lineTo(b.x, b.y),K.stroke()
                }
            }
            snapshot() {
                var gamepad = {}, oldGamepad = {}, powerups = [];
                for(var i in records)
                    for(var x in records[i])
                        records[i][x] = records[i][x];
                for(var i in this.gamepad)
                    gamepad[i] = this.gamepad[i];
                for(var i in this.oldGamepad)
                    oldGamepad[i] = this.oldGamepad[i];
                for(var i in this.track.powerups)
                    powerups.push(this.track.powerups[i].used);
                return {
                    records: records,
                    gamepad: gamepad,
                    oldGamepad: oldGamepad,
                    masses: [
                        this.head.clone(),
                        this.frontWheel.clone(),
                        this.rearWheel.clone()
                    ],
                    springs: [
                        this.rearSpring.clone(),
                        this.chasse.clone(),
                        this.frontSpring.clone()
                    ],
                    dir: this.dir,
                    gravity: new GAME.Vector(this.gravity.x, this.gravity.y),
                    slow: this.slow,
                    targetsCollected: this.targetsCollected,
                    powerups: powerups,
                    time: this.track.currentTime
                }
            }
        }
    },
    get DeadRider() {
        return class {
            constructor(a, b){
                this.dead = !0;
                var vector = new GAME.Vector(0,0);
                this.dir = 1;
                this.masses = b;
                this.track = b;
                this.points = [
                    this.head = new GAME.BodyPart(vector,this),
                    this.hip = new GAME.BodyPart(vector,this),
                    this.elbow = new GAME.BodyPart(vector,this),
                    this.shadowElbow = new GAME.BodyPart(vector,this),
                    this.hand = new GAME.BodyPart(vector,this),
                    this.shadowHand = new GAME.BodyPart(vector,this),
                    this.knee = new GAME.BodyPart(vector,this),
                    this.shadowKnee = new GAME.BodyPart(vector,this),
                    this.foot = new GAME.BodyPart(vector,this),
                    this.shadowFoot = new GAME.BodyPart(vector,this)
                ];
                this.joints = [
                    new GAME.Spring(this.head,this.hip,this),
                    new GAME.Spring(this.head,this.elbow,this),
                    new GAME.Spring(this.elbow,this.hand,this),
                    new GAME.Spring(this.head,this.shadowElbow,this),
                    new GAME.Spring(this.shadowElbow,this.shadowHand,this),
                    new GAME.Spring(this.hip,this.knee,this),
                    new GAME.Spring(this.knee,this.foot,this),
                    new GAME.Spring(this.hip,this.shadowKnee,this),
                    new GAME.Spring(this.shadowKnee,this.shadowFoot,this)
                ];
                for(var point in this.points){
                    this.points[point].size = 3,
                    this.points[point].friction = 0.05;
                }
                this.head.size = this.hip.size = 8;
                for(var joint in this.joints){
                    this.joints[joint].springConstant = 0.4,
                    this.joints[joint].dampConstant= 0.7;
                }
                for(var part in a) {
                    if(a.hasOwnProperty(part)) {
                        this[part].pos.copy(a[part])
                    }
                }
            }
            draw(){
                var a = this.track,
                    head = this.head.pos.toPixel(),
                    elbow = this.elbow.pos.toPixel(), 
                    hand = this.hand.pos.toPixel(), 
                    shadowElbow = this.shadowElbow.pos.toPixel(),
                    shadowHand = this.shadowHand.pos.toPixel(),
                    knee = this.knee.pos.toPixel(),
                    foot = this.foot.pos.toPixel(),
                    shadowKnee = this.shadowKnee.pos.toPixel(),
                    shadowFoot = this.shadowFoot.pos.toPixel(),
                    hip = this.hip.pos.toPixel();
                K.lineWidth = 5 * a.zoom;
                K.strokeStyle = "rgba(0,0,0,0.5)";
                K.beginPath(),K.moveTo(head.x, head.y),K.lineTo(shadowElbow.x, shadowElbow.y),K.lineTo(shadowHand.x, shadowHand.y),K.moveTo(hip.x, hip.y),K.lineTo(shadowKnee.x, shadowKnee.y),K.lineTo(shadowFoot.x, shadowFoot.y),K.stroke();
                K.strokeStyle = "#000";
                K.beginPath(),K.moveTo(head.x, head.y),K.lineTo(elbow.x, elbow.y),K.lineTo(hand.x, hand.y),K.moveTo(hip.x, hip.y),K.lineTo(knee.x, knee.y),K.lineTo(foot.x, foot.y),K.stroke();
                K.lineWidth = 8 * a.zoom;
                K.beginPath(),K.moveTo(hip.x, hip.y),K.lineTo(head.x, head.y),K.stroke();
                head.addToSelf(head.sub(hip).scale(0.25));
                K.lineWidth = 2 * a.zoom;
                K.beginPath(),K.moveTo(head.x + 5 * a.zoom, head.y),K.arc(head.x, head.y, 5 * a.zoom, 0, 2 * Math.PI, !0),K.stroke()
            }
            update(){
                for(var a = this.joints.length - 1; 0 <= a; a--)
                    this.joints[a].update();
                for(a = this.points.length - 1; 0 <= a; a--)
                    this.points[a].update()
            }
            setVelocity(a, b){
                a.scaleSelf(0.7);
                b.scaleSelf(0.7);
                var c, d, e, f;
                c = 0;
                for(d = this.joints.length; c < d; c++)
                    e = this.joints[c].getLength(),
                    20 < e && (e = 20),
                    this.joints[c].lrest = this.joints[c].leff = e;
                for(c = 1; 5 > c; c++)
                    this.joints[c].lrest = 13,
                    this.joints[c].leff = 13;
                e = [this.head, this.elbow, this.shadowElbow, this.hand, this.shadowHand];
                f = [this.hip, this.knee, this.shadowKnee, this.foot, this.shadowFoot];
                c = 0;
                for(d = e.length; c < d; c++)
                    e[c].old = e[c].pos.sub(a);
                c = 0;
                for(d = f.length; c < d; c++)
                    f[c].old = f[c].pos.sub(b);
                for(c = this.points.length - 1; 0 <= c; c--)
                    this.points[c].vel.copy(this.points[c].pos.sub(this.points[c].old)),
                    this.points[c].vel.x += Math.random() - Math.random(),
                    this.points[c].vel.y += Math.random() - Math.random()
            }
        }
    },
    get DeadBike() {
        return class extends GAME.Vehicle {
            constructor(a, b, c, d = []){
                super();
                this.init(c);
                this.checkpoints = d;
                this.dead = !0;
                this.rider = new GAME.DeadRider(b,c);
                this.rider.setVelocity(a.head.vel, a.rearWheel.vel);
                this.rider.dir = a.dir;
                this.rider.gravity = this.gravity = a.gravity;
                this.time = a.time;
                this.head = this.rider.head;
                this.masses = a;
                this.deathPoint = a.clone()
            }
            draw(){
                this.masses.draw();
                this.rider.draw();
                if(this.hat) {
                    this.hat.draw()
                }
            }
            update(){
                this.masses.update();
                this.rider.update();
                if(this.hat) {
                    this.hat.update()
                }
            }
        }
    },
    get Explosion() {
        return class {
            constructor(a, b, c, d){
                this.dead = !0;
                this.track = d;
                this.motor = 30 + 20 * Math.random();
                this.Vb = 0;
                this.$a = [
                    new GAME.Shard(a,this),
                    new GAME.Shard(a,this),
                    new GAME.Shard(a,this),
                    new GAME.Shard(a,this),
                    new GAME.Shard(a,this)
                ];
                this.pos = a.clone();
                this.gravity = b;
                this.time = c;
                this.head = new GAME.BodyPart(a,this);
                this.head.vel.x = 20
            }
            draw(){
                var a, b;
                if(0 < this.motor){
                    this.motor -= 10;
                    b = this.pos.toPixel();
                    var e = b.x + this.motor / 2 * Math.cos(Math.random() * 2 * Math.PI)
                      , d = b.y + this.motor / 2 * Math.sin(Math.random() * 2 * Math.PI);
                    K.fillStyle = "#ff0";
                    K.beginPath(),K.moveTo(b.x + this.motor / 2 * Math.cos(Math.random() * 2 * Math.PI), d);
                    for(a = 1; 16 > a; a++)
                        d = (this.motor + 30 * Math.random()) / 2,
                        e = b.x + d * Math.cos(Math.random() * 2 * Math.PI + 2 * Math.PI * a / 16),
                        d = b.y + d * Math.sin(Math.random() * 2 * Math.PI + 2 * Math.PI * a / 16),
                        K.lineTo(e, d);
                    K,K.fill()
                }
                a = 0;
                for(b = this.$a.length; a < b; a++)
                    this.$a[a].draw()
            }
            update(){
                for(var a = this.$a.length - 1; 0 <= a; a--)
                    this.$a[a].update()
            }
        }
    },
    get Item() {
        return class {
            constructor(a, b, c){
                this.pos = new GAME.Vector(a, b);
                this.track = c;
                this.id = ia++
            }
            draw(){
                var a = this.track,
                    b = this.pos.toPixel();
                K.fillStyle = this.color;
                K.beginPath();
                K.moveTo(b.x + 7 * a.zoom, b.y);
                K.arc(b.x, b.y, 7 * a.zoom, 0, 2 * Math.PI, !0);
                K.fill();
                K.stroke();
            }
            collide(a){
                500 > a.pos.distanceToSquared(this.pos) && !a.track.tb && this.Ea(a)
            }
            erase(a){
                if(a.distanceTo(this.pos) < ab + 7) {
                    this.remove();
                    return this
                }
                return false;
            }
            remove(){
                this.Remove = !0;
                this.track.remove(this.pos);
                this.ub();
                return this
            }
            toString(){
                return this.d ? this.type + " " + this.pos.toString() + " " + this.d.toString() : this.type + " " + this.pos.toString()
            }
            Ea(){}
            ub(){}
        }
    },
    get SingleUseItem() {
        return class extends GAME.Item {
            constructor(a, b, c){
                super(a, b, c);
                this.used = !1
            }
            draw(){
                var a = this.track,
                    b = this.pos.toPixel();
                K.fillStyle = this.used ? this.newColor : this.color;
                K.lineWidth = 2 * a.zoom;
                K.beginPath(),K.moveTo(b.x + 7 * a.zoom, b.y),K.arc(b.x, b.y, 7 * a.zoom, 0, 2 * Math.PI, !0),K.fill(),K.stroke();
                this.d ? (K.beginPath(),K.moveTo(this.d.toPixel().x + 7 * a.zoom, this.d.toPixel().y),K.arc(this.d.toPixel().x, this.d.toPixel().y, 7 * a.zoom, 0, 2 * Math.PI, !0),K.fill(),K.stroke()) : null
            }
            collide(a){
                500 > a.pos.distanceToSquared(this.pos) && this.Ea(a);
                this.d ? 500 > a.pos.distanceToSquared(this.d) && this.Ea(a) : null
            }
            Ea(a){
                if(a.track.tb) {
                    this.vb(a)
                } else {
                    if(!this.used) {
                        if(a.track.isGhost) {
                            if(!a.track.powerupsConsumed[this.id]) {
                                a.track.powerupsConsumed[this.id] = this;
                                this.ib(a)
                            }
                        } else {
                            this.used = !0;
                            this.ib(a)
                        }
                    }
                }
            }
            ib(){}
            vb(){}
        }
    },
    get Triangle() {
        return class extends GAME.Item {
            constructor(a, b, c, d){
                super(a, b, d);
                this.rotation = c;
                this.dir = new GAME.Vector(-Math.sin(c * Math.PI / 180),Math.cos(c * Math.PI / 180))
            }
            draw(){
                var a = this.track,
                    b = this.pos.toPixel();
                K.fillStyle = this.color;
                K.beginPath(),K.save();
                K.translate(b.x, b.y);
                K.rotate(this.rotation * Math.PI / 180);
                K.moveTo(-7 * a.zoom, -10 * a.zoom),K.lineTo(0, 10 * a.zoom),K.lineTo(7 * a.zoom, -10 * a.zoom),K.lineTo(-7 * a.zoom, -10 * a.zoom),K.fill(),K.stroke(),K.restore()
            }
            collide(a){
                1E3 > a.pos.distanceToSquared(this.pos) && this.Ea(a)
            }
            toString(){
                return this.type + " " + this.pos.toString() + " " + (this.rotation - 180).toString(32)
            }
        }
    },
    get Target() {
        return class extends this.SingleUseItem {
            constructor(a, b, c){
                super(a, b, c);
                this.color = "#ff0";
                this.newColor = "#ffa";
                this.type = "T"
            }
            ib(a){
                if(this.track.players.length > 1) {
                    this.track.players[1].targetsCollected++
                } else {
                    this.track.firstPlayer.targetsCollected++;
                    if(this.track.firstPlayer.targetsCollected === this.track.targets) {
                        a.track.pastCheckpoint = 2
                    }
                }
            }
            vb(){
                a.track.ha.hasOwnProperty(this.id) || (a.track.ha[this.id] = ++a.track.firstPlayer.targetsCollected)
            }
            ub(){
                this.track.targets--
            }
        }
    },
    get Checkpoint() {
        return class extends this.SingleUseItem {
            constructor(a, b, c){
                super(a, b, c);
                this.color = "#00f";
                this.newColor = "#aaf";
                this.type = "C"
            }
            ib(a){
                if(this.track.players.length > 1) {
                    this.track.players[1].pastCheckpoint |= 1;
                } else
                    this.track.firstPlayer.pastCheckpoint |= 1;
                //console.log("Checkpoint", a.track.time, JSON.stringify(a.track))
            }
        }
    },
    get Boost() {
        return class extends this.Triangle {
            constructor(a, b, c, d){
                super(a, b, c, d);
                this.color = "#ff0";
                this.type = "B"
            }
            Ea(a){
                for(var a = a.track.masses, b = 0, c = a.length; b < c; b++)
                    a[b].pos.addToSelf(this.dir)
            }
        }
    },
    get Gravity() {
        return class extends this.Triangle {
            constructor(a, b, c, d){
                super(a, b, c, d);
                this.dir.scaleSelf(0.3);
                this.color = "#0f0";
                this.type = "G"
            }
            Ea(a){
                a.track.gravity.copy(this.dir)
            }
        }
    },
    get Slowmo() {
        return class extends this.Item {
            constructor(a, b, c){
                super(a, b, c);
                this.color = "#eee";
                this.type = "S";
                this.zb = "s"
            }
            collide(a){
                500 > a.pos.distanceToSquared(this.pos) && (a.track.slow = !0)
            }
        }
    },
    get Antigravity() {
        return class extends this.Item {
            constructor(a, b, c){
                super(a, b, c);
                this.color = "#00ffff";
                this.type = "A"
            }
            Ea(a){
                a.track.gravity.x = a.track.gravity.y = 0
            }
        }
    },
    get Teleporter() {
        return class extends this.SingleUseItem {
            constructor(a, b, c, d = null, e = null){
                super(a, b, c);
                this.color = "#ff00ff";
                this.newColor = "#ffaaff";
                this.type = "W";
                if(d != null && e != null){
                    this.tpb(d, e)
                }
                this.a = a;
                this.b = b
            }
            tpb(a, b){
                this.d = new GAME.Vector(a,b);
                this.x = a;
                this.y = b;
            }
            ib(a){
                a.track.moveVehicle(this.x - this.a, this.y - this.b)
            }
        }
    },
    get Bomb() {
        return class extends this.Item {
            constructor(a, b, c){
                super(a, b, c);
                this.color = "#f00";
                this.type = "O";
                this.zb = "e"
            }
            Ea(a){
                this.track.firstPlayer = new Explosion(this.pos,a.track.gravity,a.track.time,this.track)
            }
        }
    },
    get Line() {
        return class {
            constructor(a, b, c, d, e){
                this.a = a instanceof GAME.Vector ? a : new GAME.Vector(a, b);
                this.b = b instanceof GAME.Vector ? b : new GAME.Vector(c, d);
                this.vector = this.b.sub(this.a);
                this.len = this.vector.getLength();
                this.Remove = false;
                this.track = e;
            }
            draw(a, b, c){
                a.beginPath();
                a.moveTo(this.a.x * this.track.zoom - b, this.a.y * this.track.zoom - c);
                a.lineTo(this.b.x * this.track.zoom - b, this.b.y * this.track.zoom - c);
                a.stroke()
            }
            erase(a){
                var b = a.sub(this.a).dot(this.vector.oppositeScale(this.len)),
                    c = new GAME.Vector(0,0);
                if(b <= 0) {
                    c.copy(this.a)
                } else if(b >= this.len) {
                    c.copy(this.b)
                } else {
                    c.copy(this.a.add(this.vector.oppositeScale(this.len).scale(b)));
                }
                return a.sub(c).getLength() <= ab ? (this.remove(),
                this) : !1
            }
            remove(){
                this.Remove = !0;
                this.track.remove(this.a, this.b);
                return this
            }
            xb(){
                this.track.addLineInternal(this)
            }
            toString(){
                return this.a + this.getEnd()
            }
            toJSON(a){
                return {
                    type: a,
                    a: this.a.toJSON(),
                    b: this.b.toJSON()
                }
            } 
        }
    },
    get PhysicsLine() {
        return class extends this.Line {
            constructor(a, b, c, d, e){
                super(a, b, c, d, e);
            }
            collide(a){
                if(this.yb)
                return this;
                this.yb = !0;
                var b = a.pos,
                    c = a.vel,
                    d = a.size,
                    e = new GAME.Vector(0,0),
                    f = 0,
                    e = b.sub(this.a),
                    h = e.dot(this.vector) / this.len / this.len;
                if(0 <= h && 1 >= h && (c = 0 > (e.x * this.vector.y - e.y * this.vector.x) * ((e.x - c.x) * this.vector.y - (e.y - c.y) * this.vector.x) ? -1 : 1,
                e = e.sub(this.vector.scale(h)),
                f = e.getLength(),
                (f < d || 0 > c) && (0 !== f || 514 === this.track.id)))
                    return b.addToSelf(e.scale((d * c - f) / f)),
                    a.drive(new GAME.Vector(-e.y / f,e.x / f)),
                    this;
                if(h * this.len < -d || h * this.len > this.len + d)
                    return this;
                e = b.sub(0 < h ? this.b : this.a);
                f = e.getLength();
                if(f < d && 0 !== f)
                    return b.addToSelf(e.scale((d - f) / f)),
                    a.drive(new GAME.Vector(-e.y / f,e.x / f)),
                    this
            }
            getEnd(){
                this.ma = !0;
                var a = " " + this.b.toString(),
                    b = this.track.grid[Math.floor(this.b.x / this.track.scale)][Math.floor(this.b.y / this.track.scale)].search(this.b, "line");
                b !== void 0 && (a += b.getEnd());
                return a
            }
            toString(){
                return this.a + this.getEnd()
            }
            toJSON(){
                return this.toJSON.call(this, "SolidLine")
            }
        }
    },
    get SceneryLine() {
        return class extends this.Line {
            constructor(a, b, c, d, e){
                super(a, b, c, d, e);
                this.hb = !0
            }
            getEnd(){
                this.ma = !0;
                var a = " " + this.b.toString(),
                b = this.track.grid[Math.floor(this.b.x / this.track.scale)][Math.floor(this.b.y / this.track.scale)].search(this.b, "sline");
                b !== void 0 && (a += b.getEnd());
                return a
            }
            toString(){
                return this.a + this.getEnd()
            }
            toJSON(){
                return this.toJSON.call(this, "SceneryLine")
            }
        }
    },
    get Sector() {
        return class {
            constructor(){
                this.physics = [];
                this.scenery= [];
                this.powerups = []
            }
            collide(a){
                for(var b = this.physics.length - 1; 0 <= b; b--)
                    this.physics[b].collide(a);
                if(!a.track.dead)
                    for(b = this.powerups.length - 1; 0 <= b; b--)
                        this.powerups[b].collide(a);
                return this
            }
            za(){
                for(var a = 0, b = this.physics.length; a < b; a++)
                    this.physics[a].yb = !1
            }
            remove(){
                for(var a = [], b = 0, c = this.physics.length; b < c; b++)
                    this.physics[b] && this.physics[b].Remove && a.push(this.physics.splice(b--, 1)[0]);
                b = 0;
                for(c = this.scenery.length; b < c; b++)
                    this.scenery[b] && this.scenery[b].Remove && a.push(this.scenery.splice(b--, 1)[0]);
                b = 0;
                for(c = this.powerups.length; b < c; b++)
                    this.powerups[b] && this.powerups[b].Remove && a.push(this.powerups.splice(b--, 1)[0]);
                return a
            }
            search(a, b){
                var c = 0, d, e, f = "sline" === b ? this.scenery: this.physics;
                for(d = f.length; c < d; c++)
                    if((e = f[c]) && e.a.x === a.x && e.a.y === a.y && !e.ma)
                        return e
            } 
        }
    },
    get UndoManager() {
        return class {
            constructor(){
                this.undoStack = [];
                this.undoPosition = 0
            }
            push(a){
                this.undoStack.length = Math.min(this.undoStack.length, this.undoPosition + 1);
                this.undoPosition = this.undoStack.push(a) - 1;
                return this
            }
            undo(){
                if(this.undoPosition >= 0){
                    var a = this.undoStack[this.undoPosition--].undo;
                    if(typeof a === "function") {
                        a(this)
                    }
                }
                return this
            }
            redo(){
                if(this.undoPosition < this.undoStack.length - 1){
                    var a = this.undoStack[++this.undoPosition].redo;
                    "function" === typeof a && a(this)
                }
                return this
            }
        }
    },
    get Track() {
        return class {
            constructor(a){
                var b, c, d, e;
                this.grid = {};
                this.scale = 100;
                this.canvas = canvas;
                this.U = {};
                this.zoom = 0.6;
                this.currentTime = 0;
                this.id = a;
                this.vehicle = "BMX";
                this.players = [];
                this.editor = 1;
                this.undoManager = new GAME.UndoManager();
                this.paused = !1;
                K.fillText("Loading track... Please wait.", 36, 16);
                this.camera = new GAME.Vector(0,0);
                this.id ? 7 < this.id.length ? ("v1," !== a.substr(0, 3) && (this.editor = 0)) : ("v1," !== a.substr(0, 3) && (this.editor = 0)) : (a = "-18 1i 18 1i##",
                tool = "line");
                this.code = a;
                var f = a.split("#")
                  , h = f[0] ? f[0].split(",") : []
                  , a = 0;
                for(c = h.length; a < c; a++) {
                    if(e = h[a].split(/\s+/g), 3 < e.length) {
                        b = 0;
                        for(d = e.length - 2; b < d; b += 2)
                            this.addLine({
                                x: parseInt(e[b], 32),
                                y: parseInt(e[b + 1], 32)
                            }, {
                                x: parseInt(e[b + 2], 32),
                                y: parseInt(e[b + 3], 32)
                            })
                    }
                }
                if(1 < f.length) {
                    h = f[1].split(",");
                    a = 0;
                    for(c = h.length; a < c; a++) {
                        if(e = h[a].split(/\s+/g), 3 < e.length) {
                            b = 0;
                            for(d = e.length - 2; b < d; b += 2)
                                this.addLine({
                                    x: parseInt(e[b], 32),
                                    y: parseInt(e[b + 1], 32)
                                }, {
                                    x: parseInt(e[b + 2], 32),
                                    y: parseInt(e[b + 3], 32)
                                }, !0)
                        }
                    }
                }
                this.targets = 0;
                this.powerups = [];
                e = f[2] ? f[2].split(",") : [];
                var i, a = 0;
                for(c = e.length; a < c; a++)
                    if(h = e[a].split(/\s+/g),
                    2 < h.length){
                        b = parseInt(h[1], 32);
                        d = parseInt(h[2], 32);
                        switch (h[0]){
                        case "T":
                            i = new GAME.Target(b,d,this);
                            this.targets++;
                            this.powerups.push(i);
                            break;
                        case "C":
                            i = new GAME.Checkpoint(b,d,this);
                            this.powerups.push(i);
                            break;
                        case "B":
                            i = new GAME.Boost(b,d,parseInt(h[3], 32) + 180,this);
                            break;
                        case "G":
                            i = new GAME.Gravity(b,d,parseInt(h[3], 32) + 180,this);
                            break;
                        case "O":
                            i = new GAME.Bomb(b,d,this);
                            break;
                        case "S":
                            i = new GAME.Slowmo(b,d,this);
                            break;
                        case "A":
                            i = new GAME.Antigravity(b,d,this);
                            break;
                        case "W":
                            i = new GAME.Teleporter(b,d,this,parseInt(h[3], 32),parseInt(h[4], 32));
                            this.powerups.push(i)
                        }
                        i && (b = Math.floor(b / this.scale),
                        d = Math.floor(d / this.scale),
                        this.grid[b] === void 0 && (this.grid[b] = {}),
                        this.grid[b][d] === void 0 && (this.grid[b][d] = new GAME.Sector),
                        this.grid[b][d].powerups.push(i))
                    }
                "MTB" === f[3] || "BMX" === f[3] ? (this.vehicle = f[3],
                this.time = "" !== f[4] ? f[4] : !1) : this.time = "" !== f[3] ? f[3] : !1;
                window.Game.watchGhost = this.watchGhost
            }
            zoomIn() {
                if(4 > this.zoom) {
                    this.zoom = Math.round(10 * this.zoom + 2) / 10;
                    this.U = {}
                }
            }
            zoomOut() {
                if(0.2 < this.zoom) {
                    this.zoom = Math.round(10 * this.zoom + 2 * -1) / 10;
                    this.U = {}
                }
            }
            switchBike(){
                this.vehicle = "BMX" === this.vehicle ? "MTB" : "BMX";
                this.reset()
            }
            gotoCheckpoint(){
                this.removeCollectedItems();
                this.paused = JSON.parse(localStorage.pauseOnEnter) ? true : !1;
                JSON.parse(localStorage.pauseOnEnter) ? window.autoPause = true : null;
                var checkpoints = this.firstPlayer.checkpoints,
                    checkpointsCache = this.firstPlayer.checkpointsCache;
                this.firstPlayer = this.players[0] = this.vehicle === "BMX" ? new GAME.BMXBike(this, 1, this.firstPlayer.checkpoints) : new GAME.MountainBike(this, 1, this.firstPlayer.checkpoints);
                if(this.firstPlayer) {
                    if(checkpoints.length > 0) {
                        var cp = checkpoints[checkpoints.length - 1];
                        this.firstPlayer.checkpointsCache = checkpointsCache;
                        this.currentTime = cp.time;
                    } else
                        this.currentTime = 0;
                    this.cameraLock = this.firstPlayer.head,
                    this.camera = this.firstPlayer.head.pos.clone();
                }
                if(this.players.length > 1) {
                    for(var i = 1; i < this.players.length; i++) {
                        checkpoints = this.players[i].checkpoints,
                        checkpointsCache = this.players[i].checkpointsCache;
                        this.players[i] = this.ghost_data[6] === "BMX" ? new GAME.BMXBike(this, 1, this.players[i].checkpoints, this.ghost_data) : new GAME.MountainBike(this, 1, this.players[i].checkpoints, this.ghost_data);
                        this.players[i].checkpoints = checkpoints;
                        this.players[i].checkpointsCache = checkpointsCache;
                        if(!this.firstPlayer || this.currentTime == 0) {
                            this.cameraLock = this.players[i].head
                        }
                    }
                }
            }
            removeCheckpoint(){
                for(var i in this.players) {
                    if(this.players[i].checkpoints.length > 0) {
                        if(this.players[i].checkpointsCache !== void 0) {
                            this.players[i].checkpointsCache.push(this.players[i].checkpoints[this.players[i].checkpoints.length - 1]);
                        }
                        this.players[i].checkpoints.pop()
                    }
                }
            }
            removeCheckpointUndo(){
                for(var i in this.players) {
                    if(this.players[i].checkpointsCache.length > 0) {
                        if(this.players[i].checkpoints !== void 0) {
                            this.players[i].checkpoints.push(this.players[i].checkpointsCache[this.players[i].checkpointsCache.length - 1]);
                        }
                        this.players[i].checkpointsCache.pop()
                    }
                }
            }
            reset(){
                this.firstPlayer.checkpoints = [];
                this.firstPlayer.checkpointsCache = [];
                if(this.players.length > 1) {
                    for(var i = 1; i < this.players.length; i++) {
                        this.players[i].checkpoints = [];
                        this.players[i].checkpointsCache = [];
                    }
                }
                this.gotoCheckpoint()
            }
            removeCollectedItems(){
                var a, b, c, d, e;
                for(a in this.grid)
                    if(this.grid.hasOwnProperty(a))
                        for(b in this.grid[a])
                            if(this.grid[a].hasOwnProperty(b)){
                                e = this.grid[a][b];
                                c = 0;
                                for(d = e.powerups.length; c < d; c++)
                                    e.powerups[c].used !== void 0 && (e.powerups[c].used = !1)
                            }
            }
            watchGhost(a, b){
                var b = b || track
                  , e = [], c, d;
                !function(a) {
                    e.push(a);
                    d && (c = a(c));
                    return {
                        ab
                    }
                }(function(a){
                    var c = [{}, {}, {}, {}, {}];
                    5 < a.split(",").length && (c = c.concat(a.split(",").slice(5)));
                    for(var d = 0, e, m, n; 5 > d; d++){
                        n = a.split(",")[d].split(" ");
                        e = 0;
                        for(m = n.length - 1; e < m; e++)
                            c[d][n[e]] = 1
                    }
                    b.ghost_data = c
                    b.players.push(b.ghost_data[6] === "BMX" ? new GAME.BMXBike(this, 1, [], b.ghost_data) : new GAME.MountainBike(this, 1, [], b.ghost_data))
                    b.reset()
                });
                !function(a) {
                    d = !0;
                    c = a;
                    for (var b = 0, f = e.length; b < f; b++)
                        e[b](a)
                }(a);
                track.paused = !1;
            }
            collide(a){
                var x = Math.floor(a.pos.x / this.scale - 0.5),
                    y = Math.floor(a.pos.y / this.scale - 0.5),
                    grid = this.grid;
                if(grid[x] !== void 0) {
                    if(grid[x][y] !== void 0) {
                        grid[x][y].za()
                    }
                    if(grid[x][y + 1] !== void 0) {
                        grid[x][y + 1].za()
                    }
                }
                if(grid[x + 1] !== void 0) {
                    if(grid[x + 1][y] !== void 0) {
                        grid[x + 1][y].za()
                    }
                    if(grid[x + 1][y + 1] !== void 0) {
                        grid[x + 1][y + 1].za()
                    }
                }
                if(grid[x] !== void 0 && grid[x][y] !== void 0) {
                    grid[x][y].collide(a)
                }
                if(grid[x + 1] !== void 0) {
                    if(grid[x + 1][y] !== void 0) {
                        grid[x + 1][y].collide(a)
                    }
                    if(grid[x + 1][y + 1] !== void 0) {
                        grid[x + 1][y + 1].collide(a)
                    }
                }
                if(grid[x] !== void 0 && grid[x][y + 1] !== void 0) {
                    grid[x][y + 1].collide(a)
                }
                return this
            }
            update(t){
                if(!this.paused) {
                    for(var i in this.players) {
                        this.players[i].update(t);
                    }
                    this.currentTime += 1000 / 25
                }
                if(this.cameraLock) {
                    this.camera.addToSelf(this.cameraLock.pos.sub(this.camera).scale(0.3))
                }
                return this
            }
            render() {
                this.draw();
                for(var i in this.players) {
                    this.players[i].draw();
                }
                GAME.toolbar.drawLeft();
                this.editor && GAME.toolbar.drawRight();
            }
            draw(){
                function a(){
                    K.fillStyle = "#ffb6c1";
                    K.beginPath(),K.arc(f.x, f.y, (ab - 1) * d, 0, 2 * Math.PI, !0),K.fill()
                }
                var b = this.firstPlayer
                  , c = this.currentTime
                  , d = this.zoom
                  , e = this.scale
                  , f = R.toPixel()
                  , h = this.grid;
                K.clearRect(0, 0, canvas.width, canvas.height);
                K.lineWidth = Math.max(2 * d, 0.5);
                if(S && !Hb && ("line" === tool || "scenery line" === tool || "brush" === tool || "scenery brush" === tool || "teleporter" === tool))
                    50 > f.x ? (this.camera.x -= 10 / d,
                    R.x -= 10 / d) : f.x > canvas.width - 50 && (this.camera.x += 10 / d,
                    R.x += 10 / d),
                    50 > f.y ? (this.camera.y -= 10 / d,
                    R.y -= 10 / d) : f.y > canvas.height - 50 && (this.camera.y += 10 / d,
                    R.y += 10 / d),
                    K.strokeStyle = "#f00",
                    f = R.toPixel(),
                    K.beginPath(),K.moveTo(U.toPixel().x, U.toPixel().y),K.lineTo(f.x, f.y),K.stroke();
                var i = (new GAME.Vector(0,0)).adjustToCanvas()
                  , l = (new GAME.Vector(canvas.width,canvas.height)).adjustToCanvas();
                i.x = Math.floor(i.x / e);
                i.y = Math.floor(i.y / e);
                l.x = Math.floor(l.x / e);
                l.y = Math.floor(l.y / e);
                var m = [], n, x, w, y, C;
                for(w = i.x; w <= l.x; w++)
                    for(y = i.y; y <= l.y; y++)
                        if(h[w] !== void 0 && h[w][y] !== void 0){
                            if(0 < h[w][y].physics.length || 0 < h[w][y].scenery.length){
                                m[C = w + "_" + y] = 1;
                                if(this.U[C] === void 0){
                                    n = this.U[C] = document.createElement("canvas");
                                    n.width = e * d;
                                    n.height = e * d;
                                    var M = n.getContext("2d");
                                    M.lineCap = "round";
                                    M.lineWidth = Math.max(2 * d, 0.5);
                                    M.strokeStyle = "#aaa";
                                    n = 0;
                                    for(x = h[w][y].scenery.length; n < x; n++)
                                        h[w][y].scenery[n].draw(M, w * e * d, y * e * d);
                                    M.strokeStyle = "#000";
                                    Ib && (M.shadowOffsetX = M.shadowOffsetY = 2,
                                    M.shadowBlur = Math.max(2, 10 * d),
                                    M.shadowColor = "#000");
                                    n = 0;
                                    for(x = h[w][y].physics.length; n < x; n++)
                                        h[w][y].physics[n].draw(M, w * e * d, y * e * d)
                                }
                                K.drawImage(this.U[C], Math.floor(canvas.width / 2 - this.camera.x * d + w * e * d), Math.floor(canvas.height / 2 - this.camera.y * d + y * e * d))
                            }
                            K.strokeStyle = "#000";
                            n = 0;
                            for(x = h[w][y].powerups.length; n < x; n++)
                                h[w][y].powerups[n].draw()
                        }
                for(var X in this.U)
                    m[X] === void 0 && delete this.U[X];
                if(250 !== canvas.width){
                    if(Hb)
                        a();
                    else if("camera" !== tool && !this.cameraLock)
                        switch (tool){
                        case "line":
                        case "scenery line":
                        case "brush":
                        case "scenery brush":
                            K.lineWidth = 1;
                            K.strokeStyle = "#000";
                            w = f.x;
                            y = f.y;
                            K.beginPath(),K.moveTo(w - 10, y),K.lineTo(w + 10, y),K.moveTo(w, y + 10),K.lineTo(w, y - 10),K.stroke();
                            break;
                        case "eraser":
                            a();
                            break;
                        case "goal":
                        case "checkpoint":
                        case "bomb":
                        case "slow-mo":
                        case "antigravity":
                        case "teleporter":
                            K.fillStyle = "goal" === tool ? "#ff0" : "checkpoint" === tool ? "#00f" : "bomb" === tool ? "#f00" : "#eee" ? "slow-mo" === tool : "antigravity" === tool ? "00ffff" : "ff00ff";
                            K.beginPath(),K.arc(f.x, f.y, 7 * d, 0, 2 * Math.PI, !0),K.fill(),K.stroke();
                            break;
                        case "boost":
                        case "gravity":
                            K.beginPath(),K.fillStyle = "boost" === tool ? "#ff0" : "#0f0",
                            K.save(),
                            S ? (K.translate(U.toPixel().x, U.toPixel().y),
                            K.rotate(Math.atan2(-(R.x - U.x), R.y - U.y))) : K.translate(f.x, f.y),
                            K.moveTo(-7 * d, -10 * d),K.lineTo(0, 10 * d),K.lineTo(7 * d, -10 * d),K.lineTo(-7 * d, -10 * d),K.fill(),K.stroke(),K.restore()
                        }
                    K.beginPath();
                    K.fillStyle = "#ff0";
                    K.lineWidth = 1;
                    K,K.arc(40, 12, 3.5, 0, 2 * Math.PI, !0),K.fill(),K.stroke(),K.beginPath();
                    K.lineWidth = 10;
                    K.strokeStyle = "#fff";
                    K.fillStyle = "#000";
                    e = Math.floor(c / 6E4);
                    h = Math.floor(c % 6E4 / 1E3);
                    c = Math.floor((c - 6E4 * e - 1E3 * h) / 100);
                    i = "";
                    10 > e && (e = "0" + e);
                    10 > h && (h = "0" + h);
                    i = e + ":" + h + "." + c;
                    if(this.paused && !window.autoPause)
                        i += " - Game paused";
                    else if(b && b.dead)
                        i = "Press ENTER to restart" + (this.firstPlayer.checkpoints.length > 1 ? " or BACKSPACE to cancel Checkpoint" : "");
                    else if(this.id === void 0){
                        if(10 === Jb && ("line" === tool || "scenery line" === tool || "brush" === tool || "scenery brush" === tool))
                            i += " - Grid ";
                        i += " - " + tool;
                        if("brush" === tool || "scenery brush" === tool)
                            i += " ( size " + Kb + " )"
                    }
                    V && V[2] != void 0 && (!V[0] && !V[1]) && (i += " - " + (this.paused ? "Unp" : "P") + "ause ( SPACE )");
                    K.strokeText(i = ": " + this.firstPlayer.targetsCollected + " / " + this.targets + "  -  " + i, 50, 16);
                    K.fillText(i, 50, 16);
                    if(this.players.length > 1) {
                        for(var i = 1; i < this.players.length; i++) {
                            K.fillStyle = "#aaa",
                            K.textAlign = "right",
                            K.strokeText(i = (this.players[i].name || "Ghost") + (this.players[i].targetsCollected === this.targets ? " finished!" : ": " + this.players[i].targetsCollected + " / " + this.targets), canvas.width - 7, 16),
                            K.fillText(i, canvas.width - 7, 16),
                            K.textAlign = "left",
                            K.fillStyle = "#000"
                        }
                    }
                    V && V[2] != void 0 && (V[0] ? (K.textAlign = "right",
                    document.documentElement.offsetHeight <= window.innerHeight ? (K.strokeText(V[2], canvas.width - 36, 15 + 25 * V[1]),
                    K.fillText(V[2], canvas.width - 36, 15 + 25 * V[1])) : (K.strokeText(V[2], canvas.width - 51, 15 + 25 * V[1]),
                    K.fillText(V[2], canvas.width - 51, 15 + 25 * V[1])),
                    K.textAlign = "left") : (K.strokeText(V[2], 36, 15 + 25 * V[1]),
                    K.fillText(V[2], 36, 15 + 25 * V[1])));
                    this.Ab && (b = (canvas.width - 250) / 2,
                    c = (canvas.height - 150) / 2,
                    K.lineWidth = 1,
                    K.strokeStyle = "#fff",
                    K.fillStyle = "rgba(0, 0, 0, 0.4)",
                    K.fillRect(0, 0, canvas.width, c),K.fillRect(0, c + 150, canvas.width, c),K.fillRect(0, c, b, 150),K.fillRect(b + 250, c, b, 150),K.strokeRect(b, c, 250, 150));
                    return this
                }
            }
            erase(a){
                function b(b){
                    (b = b.erase(a)) && l.push(b)
                }
                var c = Math.floor(a.x / this.scale - 0.5), d = Math.floor(a.y / this.scale - 0.5), e = this.grid[c], c = this.grid[c + 1], f, h, i, l = [];
                if(e !== void 0){
                    f = e[d];
                    h = e[d + 1];
                    if(f !== void 0){
                        e = 0;
                        for(i = f.physics.length; e < i; e++)
                            f.physics[e] && b(f.physics[e]);
                        e = 0;
                        for(i = f.scenery.length; e < i; e++)
                            f.scenery[e] && b(f.scenery[e]);
                        e = 0;
                        for(i = f.powerups.length; e < i; e++)
                            f.powerups[e] && b(f.powerups[e])
                    }
                    if(h !== void 0){
                        e = 0;
                        for(i = h.physics.length; e < i; e++)
                            h.physics[e] && b(h.physics[e]);
                        e = 0;
                        for(i = h.scenery.length; e < i; e++)
                            h.scenery[e] && b(h.scenery[e]);
                        e = 0;
                        for(i = h.powerups.length; e < i; e++)
                            h.powerups[e] && b(h.powerups[e])
                    }
                }
                if(c !== void 0){
                    f = c[d];
                    d = c[d + 1];
                    if(f !== void 0){
                        e = 0;
                        for(i = f.physics.length; e < i; e++)
                            f.physics[e] && b(f.physics[e]);
                        e = 0;
                        for(i = f.scenery.length; e < i; e++)
                            f.scenery[e] && b(f.scenery[e]);
                        e = 0;
                        for(i = f.powerups.length; e < i; e++)
                            f.powerups[e] && b(f.powerups[e])
                    }
                    if(d !== void 0){
                        e = 0;
                        for(i = d.physics.length; e < i; e++)
                            d.physics[e] && b(d.physics[e]);
                        e = 0;
                        for(i = d.scenery.length; e < i; e++)
                            d.scenery[e] && b(d.scenery[e]);
                        e = 0;
                        for(i = d.powerups.length; e < i; e++)
                            d.powerups[e] && b(d.powerups[e])
                    }
                }
                e = 0;
                for(i = this.powerups.length; e < i; e++)
                    this.powerups[e] && this.powerups[e].Remove !== void 0 && l.push(this.powerups.splice(e--, 1)[0]);
                return l
            }
            addLine(a, b, c){
                a = new (c ? GAME.SceneryLine : GAME.PhysicsLine)(a.x,a.y,b.x,b.y,this);
                if(2 <= a.len && 1E5 > a.len && (this.addLineInternal(a),
                "brush" === tool || "line" === tool || "scenery brush" === tool || "scenery line" === tool))
                    "brush" === tool || "line" === tool ? Lb.copy(R) : Mb.copy(R),
                    U.copy(R);
                return a
            }
            addLineInternal(a){
                var b = function(a, b, c) {
                    var zb = {};
                    zb[c] || (zb[c] = {});
                    var d = a + ";" + b;
                    if(zb[c][d])
                        return zb[c][d];
                    var d = zb[c][d] = []
                      , e = new GAME.Vector(a.x,a.y)
                      , f = (b.y - a.y) / (b.x - a.x)
                      , h = new GAME.Vector(a.x < b.x ? 1 : -1,a.y < b.y ? 1 : -1)
                      , i = 0;
                    for(d.push(a); 5E3 > i && !(Math.floor(e.x / c) === Math.floor(b.x / c) && Math.floor(e.y / c) === Math.floor(b.y / c)); ){
                        var l = new GAME.Vector(0 > h.x ? Math.round(Math.ceil((e.x + 1) / c + h.x) * c) - 1 : Math.round(Math.floor(e.x / c + h.x) * c),0);
                        l.y = Math.round(a.y + (l.x - a.x) * f);
                        var m = new GAME.Vector(0,0 > h.y ? Math.round(Math.ceil((e.y + 1) / c + h.y) * c) - 1 : Math.round(Math.floor(e.y / c + h.y) * c));
                        m.x = Math.round(a.x + (m.y - a.y) / f);
                        Math.pow(l.x - a.x, 2) + Math.pow(l.y - a.y, 2) < Math.pow(m.x - a.x, 2) + Math.pow(m.y - a.y, 2) ? (e = l,
                        d.push(l)) : (e = m,
                        d.push(m));
                        i++
                    }
                    return d
                }(a.a, a.b, this.scale), c, d, e, f;
                e = 0;
                for(f = b.length; e < f; e++)
                    c = Math.floor(b[e].x / this.scale),
                    d = Math.floor(b[e].y / this.scale),
                    this.grid[c] === void 0 && (this.grid[c] = {}),
                    this.grid[c][d] === void 0 && (this.grid[c][d] = new GAME.Sector),
                    a.hb ? this.grid[c][d].scenery.push(a) : this.grid[c][d].physics.push(a),
                    delete this.U[c + "_" + d]
            }
            addObject(a){
                var b = Math.floor(a.pos.x / this.scale),
                    c = Math.floor(a.pos.y / this.scale);
                if(this.grid[b] === void 0) {
                    this.grid[b] = {}
                }
                if(this.grid[b][c] === void 0) {
                    this.grid[b][c] = new GAME.Sector
                }
                this.grid[b][c].powerups.push(a)
            }
            addToSelf(a, b){
                for(var i = 0, d = a.length; i < d; i++){
                    if(a[i].type) {
                        a[i] = new a[i].type(a[i].x,a[i].y,this)
                    }
                    if(a[i].Eb) {
                        this.addObject(a[i])
                    } else if(b) {
                        this.addLineInternal(a[i])
                    } else {
                        this.addLine(a[i].a, a[i].b, a[i].hb)
                    }
                }
            }
            remove(a, b){
                b === void 0 && (b = a);
                for(var c = function(a, b, c) {
                    var zb = {};
                    zb[c] || (zb[c] = {});
                    var d = a + ";" + b;
                    if(zb[c][d])
                        return zb[c][d];
                    var d = zb[c][d] = []
                      , e = new GAME.Vector(a.x,a.y)
                      , f = (b.y - a.y) / (b.x - a.x)
                      , h = new GAME.Vector(a.x < b.x ? 1 : -1,a.y < b.y ? 1 : -1)
                      , i = 0;
                    for(d.push(a); 5E3 > i && !(Math.floor(e.x / c) === Math.floor(b.x / c) && Math.floor(e.y / c) === Math.floor(b.y / c)); ){
                        var l = new GAME.Vector(0 > h.x ? Math.round(Math.ceil((e.x + 1) / c + h.x) * c) - 1 : Math.round(Math.floor(e.x / c + h.x) * c),0);
                        l.y = Math.round(a.y + (l.x - a.x) * f);
                        var m = new GAME.Vector(0,0 > h.y ? Math.round(Math.ceil((e.y + 1) / c + h.y) * c) - 1 : Math.round(Math.floor(e.y / c + h.y) * c));
                        m.x = Math.round(a.x + (m.y - a.y) / f);
                        Math.pow(l.x - a.x, 2) + Math.pow(l.y - a.y, 2) < Math.pow(m.x - a.x, 2) + Math.pow(m.y - a.y, 2) ? (e = l,
                        d.push(l)) : (e = m,
                        d.push(m));
                        i++
                    }
                    return d
                }(a, b, this.scale), d = [], e = 0, f = c.length; e < f; e++){
                    var h = Math.floor(c[e].x / this.scale),
                        i = Math.floor(c[e].y / this.scale),
                        d = d.concat(this.grid[h][i].remove());
                    delete this.U[h + "_" + i]
                }
                e = 0;
                for(f = d.length; e < f; e++)
                    d[e].Remove = !1
            }
            pushUndo(a, b){
                this.undoManager.push({
                    undo: a,
                    redo: b
                });
                return this
            }
            undo(){
                if("scenery line" === tool || "scenery brush" === tool){
                    var a = Math.floor(Mb.x / this.scale)
                      , b = Math.floor(Mb.y / this.scale);
                    (a = this.grid[a][b].scenery[this.grid[a][b].scenery.length - 1]) && a.b.x === Math.round(Mb.x) && a.b.y === Math.round(Mb.y) ? (a.Remove = !0,
                    Mb.copy(a.a),
                    this.remove(a.a, a.b)) : alert("No more scenery line to erase!")
                } else
                    a = Math.floor(Lb.x / this.scale),
                    b = Math.floor(Lb.y / this.scale),
                    a = this.grid[a][b].physics[this.grid[a][b].physics.length - 1],
                    a !== void 0 && a.b.x === Math.round(Lb.x) && a.b.y === Math.round(Lb.y) ? (a.Remove = !0,
                    Lb.copy(a.a),
                    this.remove(a.a, a.b)) : alert("No more line to erase!")
            }
            all(){
                var a = {
                    physics: [],
                    scenery: [],
                    powerups: [],
                    vehicle: this.vehicle
                }, b, c, d;
                for(c in this.grid)
                    for(d in this.grid[c])
                        b = this.grid[c][d],
                        la(a.physics, b.physics),
                        la(a.scenery, b.scenery),
                        la(a.powerups, b.powerups);
                return a
            }
            toString(){
                var a = "", b = "", c = "", d;
                for(d in this.grid)
                    for(var e in this.grid[d])
                        if(this.grid[d][e].physics){
                            for(var f = 0; f < this.grid[d][e].physics.length; f++)
                                this.grid[d][e].physics[f].ma || (a += this.grid[d][e].physics[f].a + this.grid[d][e].physics[f].getEnd() + ",");
                            for(f = 0; f < this.grid[d][e].scenery.length; f++)
                                this.grid[d][e].scenery[f].ma || (b += this.grid[d][e].scenery[f].a + this.grid[d][e].scenery[f].getEnd() + ",");
                            for(f = 0; f < this.grid[d][e].powerups.length; f++)
                                c += this.grid[d][e].powerups[f] + ","
                        }
                for(d in this.grid)
                    for(e in this.grid[d])
                        if(this.grid[d][e].physics){
                            for(f = 0; f < this.grid[d][e].physics.length; f++)
                                this.grid[d][e].physics[f].ma = !1;
                            for(f = 0; f < this.grid[d][e].scenery.length; f++)
                                this.grid[d][e].scenery[f].ma = !1
                        }
                return a.substr(0, a.length - 1) + "#" + b.substr(0, b.length - 1) + "#" + c.substr(0, c.length - 1) + "#" + this.vehicle
            } 
        }
    },
    get SurvivalTrack() {
        return class extends this.Track {
            constructor() {
                super("SURVIVAL");
                K.fillText("Building track... Please wait.", 36, 16);
                this.physics = [];
                this.Xa = 0.5
            }
            update() {
                if(!this.paused) {
                    // if(this.firstPlayer) {
                    //     this.firstPlayer.update()
                    // }
                    for(var i in this.players) {
                        this.players[i].update();
                    }
                    this.currentTime += 1000 / 25
                }
                var a;
                a = (a = this.physics[this.physics.length - 1]) ? a.b : new GAME.Vector(-50,50);
                !this.firstPlayer.dead && 2E3 > a.distanceTo(this.firstPlayer.frontWheel.pos) && (this.pa(a, Vector.prototype.add.call(a, {
                    x: Math.floor(100 * Math.random() / this.Xa),
                    y: Math.floor(20 * (Math.random() - 0.5) * this.Xa)
                })),
                this.Xa += 0.001);
                return this
            }
            draw() {
                var a = this.firstPlayer;
                K.clearRect(0, 0, canvas.width, canvas.height);
                var b = (new GAME.Vector(0,0)).adjustToCanvas()
                , c = (new GAME.Vector(canvas.width,canvas.height)).adjustToCanvas();
                b.x = Math.floor(b.x / this.scale);
                b.y = Math.floor(b.y / this.scale);
                c.x = Math.floor(c.x / this.scale);
                c.y = Math.floor(c.y / this.scale);
                var d = [], e, f, h, i;
                for(h = b.x; h <= c.x; h++)
                    for(i = b.y; i <= c.y; i++)
                        if(this.grid[h] !== void 0 && this.grid[h][i] !== void 0){
                            if(0 < this.grid[h][i].physics.length){
                                d[h + "_" + i] = 1;
                                if(this.U[h + "_" + i] === void 0){
                                    e = this.U[h + "_" + i] = document.createElement("canvas");
                                    e.width = this.scale * this.zoom;
                                    e.height = this.scale * this.zoom;
                                    e = e.getContext("2d");
                                    e.lineCap = "round";
                                    e.lineWidth = Math.max(2 * this.zoom, 0.5);
                                    e.strokeStyle = "#000";
                                    e = 0;
                                    for(f = this.grid[h][i].physics.length; e < f; e++)
                                        this.grid[h][i].physics[e].draw(this.U[h + "_" + i].getContext("2d"), h * this.scale * this.zoom, i * this.scale * this.zoom)
                                }
                                K.drawImage(this.U[h + "_" + i], Math.floor(canvas.width / 2 - this.camera.x * this.zoom + h * this.scale * this.zoom), Math.floor(canvas.height / 2 - this.camera.y * this.zoom + i * this.scale * this.zoom))
                            }
                            K.strokeStyle = "#000"
                        }
                for(var l in this.U)
                    d[l] === void 0 && delete this.U[l];
                createItem(K.beginPath(), {
                    lineWidth: 10,
                    strokeStyle: "#fff",
                    fillStyle: "#000"
                });
                !this.firstPlayer.dead && this.firstPlayer.frontWheel.pos.x > this.Cb && (this.Cb = this.firstPlayer.frontWheel.pos.x);
                b = Math.floor((this.firstPlayer.dead ? this.firstPlayer.Bb : this.firstPlayer).frontWheel.pos.x / 10) / 10;
                c = Math.max(0, Math.floor(9 * (this.firstPlayer.dead ? this.firstPlayer.firstPlayer : this.firstPlayer).frontWheel.vel.x) / 10);
                0 === b % 1 && (b += ".0");
                0 === c % 1 && (c += ".0");
                K.strokeText(a = "Distance: " + b + " meters; Speed: " + c + " km/h" + (a.dead ? " - Press ENTER to retry" : ""), 28, 16);
                K.fillText(a, 28, 16);
                this.ghost && (K.fillStyle = "#aaa",
                K.textAlign = "right",
                K.strokeText(a = (this.ghost.name || "Ghost") + Math.floor(this.ghost.frontWheel.pos.x / 10) / 10, canvas.width - 7, 16),
                K.fillText(a, canvas.width - 7, 16),
                K.textAlign = "left",
                K.fillStyle = "#000");
                this.firstPlayer.draw();
                return this
            }
            pa(a, b, c) {
                a = new (c ? GAME.SceneryLine : GAME.PhysicsLine)(a.x,a.y,b.x,b.y,this);
                this.Ta(a);
                return a
            }
            Ta(a) {
                var b = function(a, b, c) {
                    var zb = {};
                    zb[c] || (zb[c] = {});
                    var d = a + ";" + b;
                    if(zb[c][d])
                        return zb[c][d];
                    var d = zb[c][d] = []
                      , e = new GAME.Vector(a.x,a.y)
                      , f = (b.y - a.y) / (b.x - a.x)
                      , h = new GAME.Vector(a.x < b.x ? 1 : -1,a.y < b.y ? 1 : -1)
                      , i = 0;
                    for(d.push(a); 5E3 > i && !(Math.floor(e.x / c) === Math.floor(b.x / c) && Math.floor(e.y / c) === Math.floor(b.y / c)); ){
                        var l = new GAME.Vector(0 > h.x ? Math.round(Math.ceil((e.x + 1) / c + h.x) * c) - 1 : Math.round(Math.floor(e.x / c + h.x) * c),0);
                        l.y = Math.round(a.y + (l.x - a.x) * f);
                        var m = new GAME.Vector(0,0 > h.y ? Math.round(Math.ceil((e.y + 1) / c + h.y) * c) - 1 : Math.round(Math.floor(e.y / c + h.y) * c));
                        m.x = Math.round(a.x + (m.y - a.y) / f);
                        Math.pow(l.x - a.x, 2) + Math.pow(l.y - a.y, 2) < Math.pow(m.x - a.x, 2) + Math.pow(m.y - a.y, 2) ? (e = l,
                        d.push(l)) : (e = m,
                        d.push(m));
                        i++
                    }
                    return d
                }(a.a, a.b, this.scale), c, d, e, f;
                e = 0;
                for(f = b.length; e < f; e++)
                    c = Math.floor(b[e].x / this.scale),
                    d = Math.floor(b[e].y / this.scale),
                    this.grid[c] === void 0 && (this.grid[c] = {}),
                    this.grid[c][d] === void 0 && (this.grid[c][d] = new GAME.Sector),
                    this.grid[c][d].physics.push(a),
                    this.physics.push(a),
                    delete this.U[c + "_" + d]
            }
            G() {
                for(var b = 0, c = a.length; b < c; b++)
                    a[b].Eb ? this.cb(a[b]) : this.pa(a[b].a, a[b].b, a[b].hb)
            }
            toString() {
                return "v1,SURVIVAL#" + this.vehicle
            }
        }
    },
    get Run() {
        return class {
            constructor(a, b) {
                GAME.resizeCanvas.smallscreen;
                this.track = a == "SURVIVAL" ? new GAME.SurvivalTrack(a) : new GAME.Track(a);
                this.track.sb = b || [];
                this.track.players.push(this.track.firstPlayer = this.track.vehicle === "BMX" && new GAME.BMXBike(this.track, 1, []) || new GAME.MountainBike(this.track, 1, []));
                this.track.cameraLock = this.track.firstPlayer.head;
                GAME.update.push((a) => this.track.update(a));
                GAME.render.push((a) => this.track.render(a));
                this.lastFrameTime = -1;
                track = this.track;
                window.Game.track = () => track;
                this.animationFrame = null;
                requestAnimationFrame(this.startTicker.bind(this))
            }
            startTicker(time) {
                //this.delta = this.lastFrameTime === -1 ? 0 : (time - this.lastFrameTime) / 1000;
                if(time - this.lastFrameTime < 1000 / 25){
                    for(var a = GAME.render.length; a--;){
                        GAME.render[a]()
                    }
                    this.animationFrame = requestAnimationFrame(this.startTicker.bind(this));
                    return
                }
                for(var a = GAME.update.length; a--;){
                    GAME.update[a](this.delta)
                }
                for(var a = GAME.render.length; a--;){
                    GAME.render[a]()
                }
                this.lastFrameTime = time;
                this.animationFrame = requestAnimationFrame(this.startTicker.bind(this));
            }
            close() {
                cancelAnimationFrame(this.animationFrame);
            }
        }
    }
}


var canvas = document.getElementById("canvas_rider")
  , K = canvas.getContext("2d");
K.lineCap = "round";
K.lineJoin = "round";
K.font = "8px eiven";
var BMX_DEFAULT = [[0, -1, 0, -1, 0, 0, 21, 38, 21, 38, 0, 0, 0, -21, 38, -21, 38, 0, 0, 0, 42, 45, 45, 1, 0, 0.3, !1, 0, [], 0]],
    MTB_DEFAULT = [[2, -3, 2, -3, 0, 0, 23, 35, 23, 35, 0, 0, 0, -23, 35, -23, 35, 0, 0, 0, 45, 45, 47, 1, 0, 0.3, !1, 0, [], 0]],
    records = [{}, {}, {}, {}, {}],
    ghostCheckpoints = [], wa = !0, S = !1,
    U = new GAME.Vector(40,50),
    R = new GAME.Vector(0,0),
    Kb = 20, ab = 15, Z = !1, tool = "camera", Qb = "camera",
    Rb = !1, Hb = !1, V = !1, Jb = 1, Ib = !1,
    Tb = [
        ";Restart ( ENTER );Cancel Checkpoint ( BACKSPACE );;Switch bike ( ctrl+B - Arrows to control, Z to turn );;Enable line shading;Enable fullscreen ( F )".split(";"),
        "Brush ( A - Hold to snap, hold & scroll to adjust size );Scenery brush ( S - Hold to snap, hold & scroll to adjust size );Lines ( backWheel - Hold to snap );Scenery lines ( W - Hold to snap );Eraser ( E - Hold & scroll to adjust size );Camera ( R - Release or press again to switch back, scroll to zoom );Enable grid snapping ( G );;Goal;Checkpoint;Boost;Gravity modifier;Bomb;Slow-Mo;Antigravity;Teleporter;;Shorten last line ( Z )".split(";")
    ],
    Lb = new GAME.Vector(40,50),
    Mb = new GAME.Vector(-40,50),
    Wb = document.getElementById("content"),
    charCount = document.getElementById("charcount"),
    code = document.getElementById("trackcode"),
    button = {
        new: document.getElementById("new"),
        load: document.getElementById("load"),
        save: document.getElementById("save"),
        upload: document.getElementById("upload")
    };
!!button.new && (button.new.onclick = () => Game.newRide("-18 1i 18 1i"));
!!button.load && (button.load.onclick = () => Game.loadRide());
!!button.save && (button.save.onclick = () => Game.saveRide());
!!button.upload && (button.upload.onclick = () => {
    function ja(){
        function a(a){
            e.push(a);
            d && (c = a(c));
            return f.Ib
        }
        function b(a){
            d = !0;
            c = a;
            for(var b = 0, f = e.length; b < f; b++)
                e[b](a)
        }
        var c, d, e = [], f = {
            ab: a,
            Va: b,
            Ib: {
                ab: a
            },
            Wb: {
                Va: b
            }
        };
        return f
    }
    function ka(a, b){
        var c = document.createElementNS(b, a.match(/^\w+/)[0]), d, e;
        if(d = a.match(/#([\w-]+)/))
            c.id = d[1];
        (e = a.match(/\.[\w-]+/g)) && c.setAttribute("class", e.join(" ").replace(/\./g, ""));
        return c
    }
    function createElement(a, b, c){
        var d = document, e, f;
        if(a && a.big)
            return d.getElementById(a);
        c = c || {};
        b = b || "http://www.w3.org/1999/xhtml";
        a[0].big && (a[0] = ka(a[0], b));
        for(e = 1; e < a.length; e++)
            if(a[e].big)
                a[0].appendChild(d.createTextNode(a[e]));
            else if(a[e].pop)
                a[e][0].big && (a[e][0] = ka(a[e][0], b)),
                a[0].appendChild(a[e][0]),
                createElement(a[e], b, c);
            else if(a[e].call)
                a[e](a[0]);
            else
                for(f in a[e])
                    a[0].setAttribute(f, a[e][f]);
        c[0] = a[0];
        return c[0]
    }
    var a = track.toString();
    if(0 < a.length && track.targets > 0){
        track.paused = !0;
        tool = "camera";
        track.Ab = !0;
        K.lineCap = "round";
        K.lineJoin = "round";
        document.getElementById("track_menu").style.display = "none";
        var b =createElement(["input#name.input-block-level", {
            type: "text",
            size: 18,
            Qb: 20,
            placeholder: "Name..."
        }])
            , c =createElement(["textarea.input-block-level", {
            rows: 4,
            placeholder: "Description..."
        }])
            , d =createElement(["input.btn.btn-primary.btn-block.btn-large", {
            type: "submit",
            value: "Save track"
        }])
            , e =createElement(["div.span3", "Visibility:"])
            , f =createElement(["div.btn-group.span9", {
            "data-toggle": "buttons-radio"
        }, ["button.btn#optPublic.active", ["i.icon-world"], " Public"], ["button.btn#optPrivate", ["i.icon-lock"], " Private"]])
            , h =createElement(["input.span12", {
            placeholder: "Partners...",
            type: "text"
        }])
            , i =createElement(["div.span5"])
            , l =createElement(["label.hide.row-fluid", ["div.span3", "Collaboration with: "], ["div.span4", [h]], [i]])
            , m =createElement(["div.row-fluid"])
            , n =createElement(["div"])
            , x =createElement(["div.well.row-fluid#track_menu"]);
        n.style.color = canvas.style.borderColor = "#f00";
        n.innerHTML = "Use your mouse to drag & fit an interesting part of your track in the thumbnail";
        l.style.lineHeight = e.style.lineHeight = "30px";
        var w = function(a){
            for(var b = [].slice.call(arguments, 1), c = 0, d = b.length; c < d; c++)
                a.appendChild(b[c]);
            return a
        };
        w(x, b, c, w(m, e, f), d);
        Wb.insertBefore(x, canvas.nextSibling);
        Wb.insertBefore(n, canvas);
        for(var e = ja(), m = ja(), n = [e, m], x = function(a){
            return function(b){
                X[a] = b;
                0 < --M || y.Va(X);
                return b
            }
        }, y = ja(), w = 0, C = n.length, M = C, X = Array(C); w < C; w++)
            n[w].ab(x(w));
        n = y;
        function jc(a){
            a.addEventListener("blur", Game.attach)
        }
        jc(b);
        b.addEventListener("keypress", function(a){
            a.stopPropagation()
        }, !1);
        b.focus();
        jc(h);
        jc(c);
        for(var fc in f.children)
            f.children[fc].onclick = c => {
                c.target.className = 'active';
                c.target.nextSibling != null ? c.target.nextSibling.className = 'inactive' : c.target.previousSibling.className = 'inactive';
            };
        d.addEventListener("click", function(){
            var e = document.createElement("canvas"), h, l;
            e.width = 500;
            e.height = 300;
            track.zoom *= 2;
            l = track.U;
            track.U = {};
            track.Ab = !1;
            track.draw();
            e.getContext("2d").drawImage(canvas, (canvas.width - 500) / 2, (canvas.height - 300) / 2, 500, 300, 0, 0, 500, 300);
            track.zoom /= 2;
            track.U = l;
            e = e.toDataURL("image/png");
            if("asdf" === e)
                return alert("The thumbnail is blank!\nDrag & fit an interesting part of your track inside."),
                !1;
            if(4 > b.value.length)
                return alert("The track name is too short!"),
                !1;
            d.disabled = !0;
            for(var fc in f.children){
                if(f.children[fc].className == 'active')
                    h = f.children[fc].innerText.slice(1)
            }
            l = new XMLHttpRequest;
            l.open("POST", "/draw/upload", !1);
            l.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            l.send("n=" + encodeURIComponent(b.value) + "&c=" + encodeURIComponent(a) + "&d=" + encodeURIComponent(c.value) + "&f=" + encodeURIComponent(h) + "&t=" + encodeURIComponent(e) + "&s=" + encodeURIComponent(track.targets));
            location.href = "/"
        })
    } else {
        if(track.targets < 1){
            return alert("Sorry, but your track must have at least 1 target!")
        } else {
            return alert("Sorry, but your track must be bigger or more detailed.")
        }
    }
})
window.onresize = () => 800 == canvas.width ? GAME.resizeCanvas.smallscreen : GAME.resizeCanvas.fullscreen;
document.onkeydown = function(a){
    switch (a.keyCode){
    case 8:
        250 !== canvas.width && a.preventDefault();
        track.removeCheckpoint();
        track.gotoCheckpoint();
        break;
    case 13:
        a.preventDefault();
        track.gotoCheckpoint();
        break;
    case 190:
        a.preventDefault();
        track.removeCheckpointUndo();
        track.gotoCheckpoint();
        break;
    case 37:
        track.firstPlayer && (a.preventDefault(),
        track.cameraLock = track.firstPlayer.head,
        track.firstPlayer.alive && track.firstPlayer.setButtonDown("left"),
        window.autoPause ? (track.paused = false, window.autoPause = false) : null,
        track.firstPlayer.checkpointsCache = []);
        break;
    case 39:
        track.firstPlayer && (a.preventDefault(),
        track.cameraLock = track.firstPlayer.head,
        track.firstPlayer.alive && track.firstPlayer.setButtonDown("right"),
        window.autoPause ? (track.paused = false, window.autoPause = false) : null,
        track.firstPlayer.checkpointsCache = []);
        break;
    case 38:
        track.firstPlayer && (a.preventDefault(),
        track.cameraLock = track.firstPlayer.head,
        track.firstPlayer.alive && track.firstPlayer.setButtonDown("up"),
        window.autoPause ? (track.paused = false, window.autoPause = false) : null,
        track.firstPlayer.checkpointsCache = []);
        break;
    case 40:
        track.firstPlayer && (a.preventDefault(),
        track.cameraLock = track.firstPlayer.head,
        track.firstPlayer.alive && track.firstPlayer.setButtonDown("brake"),
        window.autoPause ? (track.paused = false, window.autoPause = false) : null,
        track.firstPlayer.checkpointsCache = []);
        break;
    case 109:
    case 189:
        track.zoomOut();
        break;
    case 107:
    case 187:
        track.zoomIn();
        break;
    case 90:
    case 222:
        !track.cameraLock && track.id === void 0 ? track.undo() : wa && (track.firstPlayer.setButtonDown("swap"));
        window.autoPause ? (track.paused = false, window.autoPause = false) : null;
        break;
    case 32:
        250 !== canvas.width && a.preventDefault(),
        track.paused = window.autoPause ? true : !track.paused,
        window.autoPause = false
    }
    if(location.pathname.slice(0, 7) == '/tracks')
        switch (a.keyCode){
        case 65:
            track.firstPlayer && (a.preventDefault(),
            track.cameraLock = track.firstPlayer.head,
            track.firstPlayer.alive && track.firstPlayer.setButtonDown("left"),
            track.firstPlayer.checkpointsCache = []);
            break;
        case 68:
            track.firstPlayer && (a.preventDefault(),
            track.cameraLock = track.firstPlayer.head,
            track.firstPlayer.alive && track.firstPlayer.setButtonDown("right"),
            track.firstPlayer.checkpointsCache = []);
            break;
        case 87:
            track.firstPlayer && (a.preventDefault(),
            track.cameraLock = track.firstPlayer.head,
            track.firstPlayer.alive && track.firstPlayer.setButtonDown("up"),
            track.firstPlayer.checkpointsCache = []);
            break;
        case 83:
            track.firstPlayer && (a.preventDefault(),
            track.cameraLock = track.firstPlayer.head,
            track.firstPlayer.alive && track.firstPlayer.setButtonDown("brake"),
            track.firstPlayer.checkpointsCache = []);
            break;
        }
    if(track.id === void 0)
        switch (a.keyCode){
        case 65:
            "brush" !== tool ? (tool = "brush",
            document.body.style.cursor = "none",
            Z = !0) : S || (S = !0,
            U.copy(Lb),
            Z = !0);
            break;
        case 83:
            "scenery brush" !== tool ? (tool = "scenery brush",
            document.body.style.cursor = "none",
            Z = !0) : S || (S = !0,
            U.copy(Mb),
            Z = !0);
            break;
        case 81:
            "line" !== tool ? (tool = "line",
            document.body.style.cursor = "none") : S || (S = !0,
            U.copy(Lb),
            Z = !0);
            break;
        case 87:
            "scenery line" !== tool ? (tool = "scenery line",
            document.body.style.cursor = "none") : S || (S = !0,
            U.copy(Mb),
            Z = !0);
            break;
        case 69:
            tool = "eraser";
            document.body.style.cursor = "none";
            Z = !0;
            break;
        case 82:
            "camera" !== tool ? (Qb = tool,
            tool = "camera",
            document.body.style.cursor = "move") : Rb = !0;
            break;
        case 77:
            track.undoManager.undo();
            break;
        case 78:
            track.undoManager.redo()
        }
};
document.onkeypress = function(a){
    switch (a.keyCode){
    case 13:
    case 37:
    case 39:
    case 38:
    case 40:
        a.preventDefault();
        break;
    case 8:
    case 32:
        250 !== canvas.width && a.preventDefault();
        break;
    case 113:
        track.firstPlayer.pastCheckpoint = !1
    }
};
document.onkeyup = function(a){
    switch (a.keyCode){
    case 70:
    case 27:
        GAME.resizeCanvas.fullscreen;
        break;
    case 66:
        a.ctrlKey && track.switchBike();
        break;
    case 37:
        track.firstPlayer.alive && track.firstPlayer.setButtonUp("left")
        break;
    case 39:
        track.firstPlayer.alive && track.firstPlayer.setButtonUp("right")
        break;
    case 38:
        track.firstPlayer.alive && track.firstPlayer.setButtonUp("up")
        break;
    case 40:
        track.firstPlayer.alive && track.firstPlayer.setButtonUp("brake")
        break;
    case 90:
    case 222:
        wa = !0;
        break;
    case 71:
        track.players.length > 1 ? track.cameraLock = track.players[1].head === track.cameraLock && track.firstPlayer ? track.firstPlayer.head : track.players[1].head : (Jb = 11 - Jb,
        Tb[1][6] = (1 === Jb ? "En" : "Dis") + "able grid snapping ( G )");
        break;
    case 82:
        Rb && (tool = Qb,
        document.body.style.cursor = "none",
        Rb = !1);
        break;
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
        track.id !== void 0 && track.watchGhost(a.keyCode - 48);
        break;
    case 81:
    case 87:
    case 69:
    case 83:
        track.players.length > 1 && (track.cameraLock === track.players[1].head && (track.cameraLock = track.firstPlayer.head),
        track.players[1] = !1);
    case 65:
        Z && (S = Z = !1)
    }
    if(location.pathname.slice(0, 7) == '/tracks')
        switch (a.keyCode){
        case 65:
            track.firstPlayer.gamepad.left = 0;
            break;
        case 68:
            track.firstPlayer.gamepad.right = 0;
            break;
        case 87:
            track.firstPlayer.gamepad.up = 0;
            break;
        case 83:
            track.firstPlayer.gamepad.brake = 0;
            break;
        }
};
canvas.onmousemove = (a, b) => {
    b = Math.floor((a.clientX - canvas.offsetLeft + window.pageXOffset) / 25);
    a = Math.floor((a.clientY - canvas.offsetTop + window.pageYOffset) / 25);
    if(b < 1) {
        V = [0, a, Tb[0][a]];
        document.body.style.cursor = "default";
    } else if(track.editor && b > 30) {
        V = [1, a, Tb[1][a]];
        if(14 === a && ("scenery line" === tool || "scenery brush" === tool)) {
            V[2] = "Shorten last set of scenery lines ( Z )";
        }
        document.body.style.cursor = "default";
    } else {
        V = !1;
        document.body.style.cursor = tool == "camera" ? "move" : "none";
    }
};
canvas.onmouseover = canvas.onmouseenter = function(){
    V = !1;
    document.body.style.cursor = "camera" === tool ? "move" : "none"
};
canvas.onmousedown = function(a){
    a.preventDefault();
    S = !0;
    track.cameraLock = !1;
    if(Math.floor((a.clientX - canvas.offsetLeft + window.pageXOffset) / 25) < 1) {
        S = !1;
        switch(Math.floor((a.clientY - canvas.offsetTop + window.pageYOffset) / 25) + 1) {
            case 1:
                track.paused = !track.paused;
                break;
            case 2:
                track.gotoCheckpoint();
                break;
            case 3:
                track.removeCheckpoint();
                break;
            case 5:
                track.switchBike();
                break;
            case 7:
                Ib ? (Ib = !1,
                V[2] = Tb[0][6] = "Enable line shading") : (Ib = !0,
                V[2] = Tb[0][6] = "Disable line shading");
                track.U = [];
                break;
            case 8:
                GAME.resizeCanvas.fullscreen;
                break;
        }
    } else if(track.editor && Math.floor((a.clientX - canvas.offsetLeft + window.pageXOffset) / 25) > 30) {
        S = !1;
        switch(Math.floor((a.clientY - canvas.offsetTop + window.pageYOffset) / 25) + 1) {
            case 1:
                tool = "brush";
                break;
            case 2:
                tool = "scenery brush";
                break;
            case 3:
                tool = "line";
                break;
            case 4:
                tool = "scenery line";
                break;
            case 5:
                tool = "eraser";
                break;
            case 6:
                tool = "camera";
                break;
            case 7:
                1 === Jb ? (Jb = 10,
                V[2] = Tb[1][6] = "Disable grid snapping ( G )") : (Jb = 1,
                V[2] = Tb[1][6] = "Enable grid snapping ( G )");
                break;
            case 9:
                tool = "goal";
                break;
            case 10:
                tool = "checkpoint";
                break;
            case 11:
                tool = "boost";
                break;
            case 12:
                tool = "gravity";
                break;
            case 13:
                tool = "bomb";
                break;
            case 14:
                tool = "slow-mo";
                break;
            case 15:
                tool = "antigravity";
                break;
            case 16:
                tool = "teleporter";
                break;
            case 18:
                track.undo()
            }
    } else if(window.BHR_RCE_ENABLED && 2 === a.button && "camera" !== tool) {
        var a = track.erase(R);
        a.length && track.pushUndo(() => {
            track.addToSelf(a, !0);
        }, () => {
            for(var b = 0, c = a.length; b < c; b++) {
                a[b].remove();
            }
        });
        Hb = !0;
    } else {
        var b;
        Z || U.copy(R);
        switch (tool){
        case "boost":
        case "gravity":
            document.body.style.cursor = "crosshair";
            break;
        case "eraser":
            var a = track.erase(R);
            a.length && track.pushUndo(() => {
                track.addToSelf(a, !0);
            }, () => {
                for(var b = 0, c = a.length; b < c; b++) {
                    a[b].remove();
                }
            });
            break;
        case "goal":
            track.powerups.push(b = new GAME.Target(U.x,U.y,track));
            track.targets++;
            break;
        case "checkpoint":
            track.powerups.push(b = new GAME.Checkpoint(U.x,U.y,track));
            break;
        case "bomb":
            b = new GAME.Bomb(U.x,U.y,track);
            break;
        case "slow-mo":
            b = new GAME.Slowmo(U.x,U.y,track);
            break;
        case "antigravity":
            b = new GAME.Antigravity(U.x,U.y,track);
            break;
        case "teleporter":
            b = new GAME.Teleporter(U.x,U.y,track);
            track.teleporter = b;
            break;
        case "brush":
        case "scenery brush":
            Z && track.addLine(U, R, "brush" !== tool),
            Z = !1,
            S = !0
        }
        if(b !== void 0){
            var c = Math.floor(b.pos.x / track.scale)
              , d = Math.floor(b.pos.y / track.scale);
            track.grid[c] === void 0 && (track.grid[c] = []);
            track.grid[c][d] === void 0 && (track.grid[c][d] = new GAME.Sector);
            track.grid[c][d].powerups.push(b);
            track.pushUndo(function(){
                b.remove()
            }, function(){
                b instanceof GAME.Target && ++track.targets;
                track.grid[c][d].powerups.push(b)
            })
        }
    }
};
document.onmousemove = function(a){
    "camera" !== tool && (track.cameraLock = !1);
    R = (new GAME.Vector(a.clientX - canvas.offsetLeft,a.clientY - canvas.offsetTop + window.pageYOffset)).adjustToCanvas();
    "eraser" !== tool && 2 !== a.button && (R.x = Math.round(R.x / Jb) * Jb,
    R.y = Math.round(R.y / Jb) * Jb);
    if(S) {
        if("camera" === tool) {
            track.camera.addToSelf(U.sub(R)),
            R.copy(U);
        } else if("eraser" === tool || window.BHR_RCE_ENABLED && 2 === a.button) {
            var a = track.erase(R);
            a.length && track.pushUndo(() => {
                track.addToSelf(a, !0);
            }, () => {
                for(var b = 0, c = a.length; b < c; b++) {
                    a[b].remove();
                }
            });
        } else if(!Z && ("brush" === tool || "scenery brush" === tool) && U.distanceTo(R) >= Kb) {
            var b = track.addLine(U, R, "brush" !== tool);
            track.pushUndo(function(){
                b.remove()
            }, function(){
                b.xb()
            })
        }
    }
};
canvas.onmouseup = function(){
    var a, b, c, d;
    if(Hb)
        return Hb = !1;
    if(S)
        if("line" === tool || "scenery line" === tool || "brush" === tool || "scenery brush" === tool){
            var e = track.addLine(U, R, "line" !== tool && "brush" !== tool);
            track.pushUndo(function(){
                e.remove()
            }, function(){
                e.xb()
            })
        } else if("teleporter" === tool){
            U.copy(R);
            track.teleporter.tpb(U.x,U.y);
            track.teleporter = undefined;
        } else if("boost" === tool || "gravity" === tool)
            document.body.style.cursor = "none",
            d = Math.round(180 * Math.atan2(-(R.x - U.x), R.y - U.y) / Math.PI),
            c = "boost" === tool ? new GAME.Boost(U.x,U.y,d,track) : new GAME.Gravity(U.x,U.y,d,track),
            a = Math.floor(c.pos.x / track.scale),
            b = Math.floor(c.pos.y / track.scale),
            track.grid[a] === void 0 && (track.grid[a] = []),
            track.grid[a][b] === void 0 && (track.grid[a][b] = new GAME.Sector),
            track.grid[a][b].powerups.push(c),
            track.pushUndo(function(){
                c.remove()
            }, function(){
                track.grid[a][b].powerups.push(c)
            })
};
document.onmouseup = () => Z || (S = !1);
canvas.oncontextmenu = (a) => a.preventDefault();
canvas.onmouseout = canvas.onmouseleave = () => document.body.style.cursor = "default";
canvas.ondommousescroll = canvas.onmousewheel = (a) => {
    a.preventDefault();
    if(Z) {
        if("eraser" === tool) {
            if((0 < a.detail || 0 > a.wheelDelta) && 5 < ab) {
                ab -= 5;
            } else {
                if((0 > a.detail || 0 < a.wheelDelta) && 40 > ab) {
                    ab += 5
                }
            }
        } else {
            if("brush" === tool || "scenery brush" === tool) {
                if((0 < a.detail || 0 > a.wheelDelta) && 4 < Kb) {
                    Kb -= 8;
                } else if((0 > a.detail || 0 < a.wheelDelta) && 200 > Kb) {
                    Kb += 8;
                }
            }
        }
    } else {
        if(0 < a.detail || 0 > a.wheelDelta) {
            track.zoomOut()
        } else if(0 > a.detail || 0 < a.wheelDelta) {
            track.zoomIn()
        };
    }
    a = (new GAME.Vector(a.clientX - canvas.offsetLeft,a.clientY - canvas.offsetTop + window.pageYOffset)).adjustToCanvas();
    track.cameraLock || track.camera.addToSelf(R.sub(a))
};
window.Game = {
    defaults: {
        keydown: document.onkeydown,
        keypress: document.onkeypress,
        keyup: document.onkeyup
    },
    ride: function(a, b) {
        GAME.loop = new GAME.Run(a, b);
    },
    newRide: function() {
        if(confirm("Do you really want to start a new track?")) {
            GAME.loop.close();
            GAME.update.pop();
            GAME.render.pop();
            this.ride();
            charCount.innerHTML = "Trackcode";
            code.value = null;
            track.reset()
        }
    },
    loadRide: function() {
        if(10 < code.value.length) {
            GAME.loop.close();
            GAME.update.pop();
            GAME.render.pop();
            this.ride(code.value);
            charCount.innerHTML = "Trackcode";
            code.value = null;
            track.reset()
        } else {
            alert("No trackcode to load!")
        }
    },
    saveRide: function() {
        if(track.id === void 0) {
            code.value = track.toString();
            code.select();
            charCount.innerHTML = "Trackcode - " + Math.round(code.value.length / 1E3) + "k - CTRL + C to copy"
        }
    },
    attach: function() {
        if(this.defaults) {
            document.onkeydown = this.defaults.keydown,
            document.onkeypress = this.defaults.keypress,
            document.onkeyup = this.defaults.keyup,
            this.defaults = !1
        }
    }
};
