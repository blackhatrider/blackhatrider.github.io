!function(){
    var ia = 0;
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
    function createItem(a, b){
        for(var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c])
    }
    function la(a, b){
        for(var c = 0, d = b.length; c < d; c++){
            var e = a
              , f = b[c];
            ~e.indexOf(f) || e.push(f)
        }
    }
    class Vector {
        constructor(a, b){
            this.x = a;
            this.y = b
        }
        toPixel(){
            return new Vector((this.x - track.camera.x) * track.zoom + canvas.width / 2,(this.y - track.camera.y) * track.zoom + canvas.height / 2)
        }
        adjustToCanvas(){
            return new Vector((this.x - canvas.width / 2) / track.zoom + track.camera.x,(this.y - canvas.height / 2) / track.zoom + track.camera.y)
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
            return new Vector(this.x,this.y)
        }
        add(a){
            return new Vector(this.x + a.x,this.y + a.y)
        }
        sub(a){
            return new Vector(this.x - a.x,this.y - a.y)
        }
        scale(a){
            return new Vector(this.x * a,this.y * a)
        }
        oppositeScale(a){
            return new Vector(this.x / a,this.y / a)
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
    class Mass {
        constructor(a, b){
            this.pos = a.clone();
            this.oldPos = a.clone();
            this.velocity = new Vector(0,0);
            this.track = b;
        }
        update(){
            this.velocity.addToSelf(this.track.gravity).scaleSelf(0.99);
            this.pos.addToSelf(this.velocity);
            this.wa = !1;
            this.collide && track.collide(this);
            this.velocity = this.pos.sub(this.oldPos);
            this.oldPos.copy(this.pos)
        }
    }
    class BodyPart extends Mass {
        constructor(a, b){
            super(a, b);
            this.size = 10;
            this.friction = 0;
            this.collide = !0
        }
        drive(a){
            this.pos.addToSelf(a.scale(-a.dot(this.velocity) * this.friction));
            this.wa = !0
        }
        clone(){
            var a = new BodyPart(this.pos,this.track);
            a.oldPos = this.oldPos.clone();
            a.velocity = this.velocity.clone();
            a.size = this.size;
            a.friction = this.friction;
            return a
        }
        toJSON(){
            return {
                type: "BodyPart",
                pos: this.pos,
                oldPos: this.oldPos,
                velocity: this.velocity,
                size: this.size
            }
        }
    }
    class Wheel extends Mass {
        constructor(a, b){
            super(a, b);
            this.size = 10;
            this.friction = 0;
            this.gravity = this.collide = !0;
            this.speed = this.da = 0
        }
        drive(a){
            this.pos.addToSelf(a.scale(this.speed * this.track.direction));
            this.K && this.pos.addToSelf(a.scale(0.3 * -a.dot(this.velocity)));
            this.da = a.dot(this.velocity) / this.size;
            this.wa = !0
        }
        clone(){
            var a = new Wheel(this.pos,this.track);
            a.oldPos = this.oldPos.clone();
            a.velocity = this.velocity.clone();
            a.speed = this.speed;
            return a
        }
        toJSON(){
            return {
                type: "Wheel",
                pos: this.pos,
                oldPos: this.oldPos,
                velocity: this.velocity,
                speed: this.speed,
                da: this.da,
                size: this.size,
                friction: this.friction
            }
        }
    }
    class Shard {
        constructor(a, b){
            this.pos = new Vector(a.x + 5 * (Math.random() - Math.random()),a.y + 5 * (Math.random() - Math.random()));
            this.oldPos = new Vector(this.pos.x,this.pos.y);
            this.velocity = new Vector(11 * (Math.random() - Math.random()),11 * (Math.random() - Math.random()));
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
                b = this.size * this.mb.d,
                c = this.shape[0] * b,
                d = a.x + c * Math.cos(this.rotation),
                c = a.y + c * Math.sin(this.rotation),
                e = 2;
            for(K["ba"]().m(d, c).fillStyle = "#000"; 8 > e; e++)
                c = this.shape[e - 1] * b / 2,
                d = a.x + c * Math.cos(this.rotation + 6.283 * e / 8),
                c = a.y + c * Math.sin(this.rotation + 6.283 * e / 8),
                K.l(d, c);
            K["f"]()
        }
        drive(a){
            this.da = a.dot(this.velocity) / this.size;
            this.pos.addToSelf(a.scale(-a.dot(this.velocity) * this.friction));
            this.rotation += this.da;
            var b = a.getLength();
            0 < b && (a = new Vector(-a.y / b,a.x / b),
            this.oldPos.addToSelf(a.scale(0.8 * a.dot(this.velocity))))
        }
        update(){
            this.rotation += this.da;
            this.velocity.addToSelf(this.track.gravity);
            this.velocity = this.velocity.scale(0.99);
            this.pos.addToSelf(this.velocity);
            this.wa = !1;
            this.collide && track.collide(this);
            this.velocity = this.pos.sub(this.oldPos);
            this.oldPos.copy(this.pos)
        }
    }
    class Joint {
        constructor(a, b, c){
            this.a = a;
            this.b = b;
            this.track = c;
            this.p = this.distanceBetween = 40;
            this.damp = 0.5;
            this.spring = 0.7
        }
        lean(a){
            this.p += (this.distanceBetween - a - this.p) / 5
        }
        rotate(a){
            var b = this.b.pos.sub(this.a.pos),
                b = new Vector(-b.y / this.p,b.x / this.p);
            this.a.pos.addToSelf(b.scale(a));
            this.b.pos.addToSelf(b.scale(-a))
        }
        update(){
            var a = this.b.pos.sub(this.a.pos),
                b = a.getLength();
            if(1 > b)
                return this;
            a = a.scale(1 / b);
            b = a.scale((b - this.p) * this.spring);
            b.addToSelf(a.scale(this.b.velocity.sub(this.a.velocity).dot(a) * this.damp));
            this.b.velocity.addToSelf(b.scale(-1));
            this.a.velocity.addToSelf(b);
            return this
        }
        turn(){
            var a = new Vector;
            a.copy(this.a.pos);
            this.a.pos.copy(this.b.pos);
            this.b.pos.copy(a);
            a.copy(this.a.oldPos);
            this.a.oldPos.copy(this.b.oldPos);
            this.b.oldPos.copy(a);
            a.copy(this.a.velocity);
            this.a.velocity.copy(this.b.velocity);
            this.b.velocity.copy(a);
            a = this.a.rotation;
            this.a.rotation = this.b.rotation;
            this.b.rotation = a
        }
        getLength(){
            return this.b.pos.sub(this.a.pos).getLength()
        }
        clone(){
            var a = new Joint(this.a,this.b,this.track);
            a.distanceBetween = this.distanceBetween;
            a.p = this.p;
            a.damp = this.damp;
            a.spring = this.spring;
            return a
        }
        toJSON(){
            return {
                type: "Joint",
                a: this.a,
                b: this.b,
                distanceBetween: this.distanceBetween,
                p: this.p,
                damp: this.damp,
                spring: this.spring
            }
        }
    }
    class Bike {
        constructor(a, b, c){
            this.track = a;
            this.vehicle = c ? "BMX" : "MTB";
            this.cosmetics = {
                head: "hat"
            };
            this.pastCheckpoint = this.dead = !1;
            this.M = this.ba = this.ca = this.W = this.K = 0
        }
        turn(){
            wa = xa = !1;
            this.direction *= -1;
            this.D.turn();
            var a = this.z.p;
            this.z.p = this.A.p;
            this.A.p = a;
            this.collide("turn")
        }
        complete(){
            var a = this.track
            , b = this.na;
            this.collide("hitTarget");
            if(this.pastCheckpoint & 2){
                if(this.collide("hitGoal"),
                a.targets && a.collected === a.targets && 0 < a.currentTime && (!a.time || this.time < a.time) && a.id !== void 0){
                    for(var b = "", c, d = 0, e = N.length; d < e; d++){
                        for(c in N[d])
                            isNaN(c) || (b += c + " ");
                        b += ","
                    }
                    c = new XMLHttpRequest;
                    c.open("POST", window.location.href.split("/")[window.location.href.split("/").length - 1] + "/ghost_save", true);
                    c.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    c.send("id=" + window.location.href.split("/")[window.location.href.split("/").length - 1] + "&vehicle=" + this.vehicle + "&time=" + a.currentTime + "&code=" + b);
                    alert("Ghost saved!");
                    Aa = Ba = cameraLock = Ca = 0
                }
            } else if(this.pastCheckpoint & 1){
                this.collide("hitCheckpoint");
                c = [];
                b.push([this.head.pos.x, this.head.pos.y, this.head.oldPos.x, this.head.oldPos.y, this.head.velocity.x, this.head.velocity.y, this.rearWheel.pos.x, this.rearWheel.pos.y, this.rearWheel.oldPos.x, this.rearWheel.oldPos.y, this.rearWheel.velocity.x, this.rearWheel.velocity.y, this.rearWheel.speed , this.frontWheel.pos.x, this.frontWheel.pos.y, this.frontWheel.oldPos.x, this.frontWheel.oldPos.y, this.frontWheel.velocity.x, this.frontWheel.velocity.y, this.frontWheel.speed , this.F[0].p, this.F[1].p, this.F[2].p, this.direction, this.gravity.x, this.gravity.y, this.slow, a.collected, c, a.currentTime, this.ba, this.ca, this.W, this.K]);
                for(b = 0; b < a.powerups.length; b++)
                    c.push(a.powerups[b].used);
                a.ghost && (a = a.ghost,
                Da.push([a.bike[0].pos.x, a.bike[0].pos.y, a.bike[0].oldPos.x, a.bike[0].oldPos.y, a.bike[0].velocity.x, a.bike[0].velocity.y, a.bike[1].pos.x, a.bike[1].pos.y, a.bike[1].oldPos.x, a.bike[1].oldPos.y, a.bike[1].velocity.x, a.bike[1].velocity.y, a.bike[1].speed, a.bike[2].pos.x, a.bike[2].pos.y, a.bike[2].oldPos.x, a.bike[2].oldPos.y, a.bike[2].velocity.x, a.bike[2].velocity.y, a.bike[2].speed, a.F[0].p, a.F[1].p, a.F[2].p, a.direction, a.gravity.x, a.gravity.y, a.slow, a.ba, a.ca, a.W, a.K, a.collected]))
            }
            this.pastCheckpoint = 0
        }
        die(){
            this.dead = !0;
            this.head.drive = () => {};
            this.rearWheel.speed = 0;
            this.rearWheel.K = !1;
            this.frontWheel.K = !1;
            this.head.collide = !1;
            var bike = this.track.player = new DeadBike(this,this.getRider(),this.track);
            bike.hat = new Shard(this.head.pos.clone(),this);
            bike.hat.velocity = this.head.velocity.clone();
            bike.hat.size = 10;
            bike.hat.da = 0.1
        }
        getRider(){
            var a = {}
            , b = this.frontWheel.pos.sub(this.rearWheel.pos)
            , c = new Vector(b.y * this.direction,-b.x * this.direction);
            a.head = this.rearWheel.pos.add(b.scale(0.35)).add(this.head.pos.sub(this.frontWheel.pos.add(this.rearWheel.pos).scale(0.5)).scale(1.2));
            a.hand = a.shadowHand = this.rearWheel.pos.add(b.scale(0.8)).add(c.scale(0.68));
            var d = a.head.sub(a.hand)
            , d = new Vector(d.y * this.direction,-d.x * this.direction);
            a.elbow = a.shadowElbow = a.head.add(a.hand).scale(0.5).add(d.scale(130 / d.lengthSquared()));
            a.hip = this.rearWheel.pos.add(b.scale(0.2)).add(c.scale(0.5));
            var e = new Vector(6 * Math.cos(this.M),6 * Math.sin(this.M));
            a.foot = this.rearWheel.pos.add(b.scale(0.4)).add(c.scale(0.05)).add(e);
            d = a.hip.sub(a.foot);
            d = new Vector(-d.y * this.direction,d.x * this.direction);
            a.knee = a.hip.add(a.foot).scale(0.5).add(d.scale(160 / d.lengthSquared()));
            a.shadowFoot = this.rearWheel.pos.add(b.scale(0.4)).add(c.scale(0.05)).sub(e);
            d = a.hip.sub(a.shadowFoot);
            d = new Vector(-d.y * this.direction,d.x * this.direction);
            a.shadowKnee = a.hip.add(a.shadowFoot).scale(0.5).add(d.scale(160 / d.lengthSquared()));
            return a
        }
        update(){
            this.pastCheckpoint && this.complete();
            var a = this.track.currentTime;
            Aa !== this.ba && (N[0][a] = 1,
            this.ba = Aa);
            Ba !== this.ca && (N[1][a] = 1,
            this.ca = Ba);
            cameraLock !== this.W && (N[2][a] = 1,
            this.W = cameraLock);
            Ca !== this.K && (N[3][a] = 1,
            this.K = Ca);
            xa && (N[4][a] = 1);
            this.dead || this.setProperties();
            for(a = this.F.length - 1; 0 <= a; a--)
                this.F[a].update();
            for(a = this.bike.length - 1; 0 <= a; a--)
                this.bike[a].update();
            this.rearWheel.wa && this.frontWheel.wa && (this.slow = !1);
            if(!this.slow && !this.dead){
                this.setProperties();
                for(a = this.F.length - 1; 0 <= a; a--)
                    this.F[a].update();
                for(a = this.bike.length - 1; 0 <= a; a--)
                    this.bike[a].update()
            }
        }
        collide(a){
            var b = this.BMX_DEFAULT && this.BMX_DEFAULT[a];
            if(b)
                for(var c = _slice.call(arguments, 1), d = 0, e = b.length; d < e; d++)
                    b[d].apply(this, c)
        }
        clone(){
            var a = this.rearWheel.clone()
            , b = this.frontWheel.clone()
            , c = this.head.clone()
            , d = this.z.clone()
            , e = this.D.clone()
            , f = this.A.clone();
            return {
                rearWheel: a,
                frontWheel: b,
                head: c,
                bike: [c, a, b],
                F: [d, e, f],
                direction: this.direction,
                P: this.gravity.clone(),
                slow: this.slow,
                time: this.time
            }
        }
        toJSON(){
            return {
                type: this.toString(),
                keys: N.map(Object.keys),
                rearWheel: this.rearWheel,
                frontWheel: this.frontWheel,
                head: this.head,
                z: this.z,
                D: this.D,
                A: this.A,
                direction: this.direction,
                P: this.gravity,
                slow: this.slow,
                time: this.time
            }
        }
        toString(){
            "BikeGeneric"
        }
    }
    class Rider extends Bike{
        constructor(a, b, c){
            super(a, b, c);
            var c = this;
            this.head.drive = () => {
                c.die();
            }
        }
    }
    class BMX extends Bike {
        constructor(a){
            super();
            this.track = a;
            this.vehicle = "BMX";
            var b = BMX_DEFAULT[BMX_DEFAULT.length - 1],
            c = this;
            c.na = BMX_DEFAULT;
            c.bike = [c.head = new BodyPart(new Vector(b[0],b[1]),c), c.rearWheel = new Wheel(new Vector(b[6],b[7]),c), c.frontWheel = new Wheel(new Vector(b[13],b[14]),c)];
            c.head.oldPos = new Vector(b[2],b[3]);
            c.head.velocity = new Vector(b[4],b[5]);
            c.rearWheel.oldPos = new Vector(b[8],b[9]);
            c.rearWheel.velocity = new Vector(b[10],b[11]);
            c.rearWheel.speed = b[12];
            c.frontWheel.oldPos = new Vector(b[15],b[16]);
            c.frontWheel.velocity = new Vector(b[17],b[18]);
            c.frontWheel.speed = b[19];
            c.head.size = 14;
            c.head.drive = function(){
                c.die()
            };
            c.rearWheel.size = 11.7;
            c.frontWheel.size = 11.7;
            c.F = [c.z = new Joint(c.head,c.rearWheel,c), c.D = new Joint(c.rearWheel,c.frontWheel,c), c.A = new Joint(c.frontWheel,c.head,c)];
            c.z.distanceBetween = 45;
            c.z.p = b[20];
            c.z.spring = 0.35;
            c.z.damp = 0.3;
            c.D.distanceBetween = 42;
            c.D.p = b[21];
            c.D.spring = 0.35;
            c.D.damp = 0.3;
            c.A.distanceBetween = 45;
            c.A.p = b[22];
            c.A.spring = 0.35;
            c.A.damp = 0.3;
            c.direction = b[23];
            c.gravity = new Vector(b[24],b[25]);
            c.slow = b[26];
            a.collected = b[27];
            for(var d = 0; d < a.powerups.length; d++)
                a.powerups[d].used = b[28][d];
            if(c.time = b[29]){
                c.ba = b[30];
                c.ca = b[31];
                c.W = b[32];
                c.K = b[33];
                for(a = 0; a < N.length; a++)
                    for(var e in N[a])
                        e >= c.time && delete N[a][e]
            } else {
                N = [{}, {}, {}, {}, {}]
            }
        }
        setProperties(){
            xa && this.turn();
            this.rearWheel.speed += (cameraLock - this.rearWheel.speed) / 10;
            cameraLock && (this.M += this.rearWheel.da / 5);
            this.rearWheel.K = this.frontWheel.K = Ca;
            var a = Aa - Ba;
            this.z.lean(5 * a * this.direction);
            this.A.lean(5 * -a * this.direction);
            this.D.rotate(a / 6);
            !a && cameraLock && (this.z.lean(-7),
            this.A.lean(7))
        }
        draw(){
            var a, b, c, d, e = this.track.zoom, f = this.direction, h = this.rearWheel.pos.toPixel(), i = this.frontWheel.pos.toPixel();
            K.strokeStyle = "#000";
            K.lineWidth = 3.5 * e;
            K["ba"]()["a"](h.x, h.y, 10 * e, 0, 2 * Math.PI, !0).m(i.x + 10 * e, i.y)["a"](i.x, i.y, 10 * e, 0, 2 * Math.PI, !0).s();
            var l = i.x - h.x
            , m = i.y - h.y
            , i = new Vector((i.y - h.y) * f,(h.x - i.x) * f);
            a = h.x + 0.3 * l + 0.25 * i.x;
            b = h.y + 0.3 * m + 0.25 * i.y;
            var n = h.x + 0.84 * l + 0.42 * i.x
            , x = h.y + 0.84 * m + 0.42 * i.y;
            c = h.x + 0.84 * l + 0.37 * i.x;
            d = h.y + 0.84 * m + 0.37 * i.y;
            var w = h.x + 0.4 * l + 0.05 * i.x
            , y = h.y + 0.4 * m + 0.05 * i.y;
            K.lineWidth = 3 * e;
            K["ba"]().m(h.x, h.y).l(a, b).l(n, x).m(c, d).l(w, y).l(h.x, h.y);
            c = 6 * Math.cos(this.M) * e;
            d = 6 * Math.sin(this.M) * e;
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
            K.m(n, x).l(c, d).m(C, M).l(X, ya).m(w, y).l(T, Y);
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
            K.m(h.x + l, h.y + m).l(C, M).l(X, ya).l(T, Y).l(za, rc).l(w, y).s();
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
                K["ba"]().m(c, d).l(ya, T).l(h, C).s();
                K.strokeStyle = "#000";
                K["ba"]().m(n, x).l(M, X).l(h, C).s();
                n = a + 0.05 * l + 0.88 * i.x;
                x = b + 0.05 * m + 0.88 * i.y;
                K.lineWidth = 8 * e;
                K["ba"]().m(h, C).l(n, x).s();
                c = a + 0.15 * l + 1.05 * i.x;
                d = b + 0.15 * m + 1.05 * i.y;
                K.lineWidth = 2 * e;
                K["ba"]().m(c + 5 * e, d)["a"](c, d, 5 * e, 0, 2 * Math.PI, !0).s()["ba"]();
                switch (this.cosmetics.head){
                case "cap":
                    c = a + 0.4 * l + 1.1 * i.x;
                    d = b + 0.4 * m + 1.1 * i.y;
                    a = a + 0.05 * l + 1.05 * i.x;
                    b = b + 0.05 * m + 1.05 * i.y;
                    K.m(a, b).l(c, d).s();
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
                    K.m(c, d).l(M, X).l(ya, T).l(l, m).l(a, b).l(h, C).s()["f"]();
                    break;
                case "ninja":
                    c = a + 0.26 * l + 1.1 * i.x,
                    d = b + 0.26 * m + 1.1 * i.y,
                    a = a + 0.05 * l + 1.05 * i.x,
                    b = b + 0.05 * m + 1.05 * i.y,
                    K.lineWidth = 5 * e,
                    K.m(c, d).l(a, b).s().lineWidth = 2 * e,
                    K.l(a - (8 + Math.random()) * e * f, b - (4 + Math.random()) * e * f).m(a, b).l(a - (8 + Math.random()) * e * f, b + (4 + Math.random()) * e * f).s()
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
                K["ba"]().m(n, x).l(l, m).l(w, y).s()
            }
        }
    }
    class MTB extends Bike {
        constructor(a){
            super(a, MTB_DEFAULT[MTB_DEFAULT.length - 1], !1);
            this.track = a;
            this.vehicle = "MTB";
            var b = MTB_DEFAULT[MTB_DEFAULT.length - 1],
            c = this;
            c.na = MTB_DEFAULT;
            c.bike = [c.head = new BodyPart(new Vector(b[0],b[1]),c), c.rearWheel = new Wheel(new Vector(b[6],b[7]),c), c.frontWheel = new Wheel(new Vector(b[13],b[14]),c)];
            c.bike[0].oldPos = new Vector(b[2],b[3]);
            c.bike[0].velocity = new Vector(b[4],b[5]);
            c.bike[1].oldPos = new Vector(b[8],b[9]);
            c.bike[1].velocity = new Vector(b[10],b[11]);
            c.bike[1].speed = b[12];
            c.bike[2].oldPos = new Vector(b[15],b[16]);
            c.bike[2].velocity = new Vector(b[17],b[18]);
            c.bike[2].speed = b[19];
            c.head.size = 14;
            c.head.drive = function(){
                c.die()
            };
            c.rearWheel.size = 14;
            c.frontWheel.size = 14;
            c.F = [c.z = new Joint(c.bike[0],c.bike[1],c), c.D = new Joint(c.bike[1],c.bike[2],c), c.A = new Joint(c.bike[2],c.bike[0],c)];
            c.z.distanceBetween = 47;
            c.z.p = b[20];
            c.z.spring = 0.2;
            c.z.damp = 0.3;
            c.D.distanceBetween = 45;
            c.D.p = b[21];
            c.D.spring = 0.2;
            c.D.damp = 0.3;
            c.A.distanceBetween = 45;
            c.A.p = b[22];
            c.A.spring = 0.2;
            c.A.damp = 0.3;
            c.direction = b[23];
            c.gravity = new Vector(b[24],b[25]);
            c.slow = b[26];
            a.collected = b[27];
            for(var d = 0; d < a.powerups.length; d++)
                a.powerups[d].used = b[28][d];
            if(c.time = b[29]){
                c.ba = b[30];
                c.ca = b[31];
                c.W = b[32];
                c.K = b[33];
                for(a = 0; a < N.length; a++)
                    for(var e in N[a])
                        e >= c.time && delete N[a][e]
            } else {
                N = [{}, {}, {}, {}, {}]
            }
        }
        setProperties(){
            xa && this.turn();
            this.rearWheel.speed += (cameraLock - this.rearWheel.speed) / 10;
            cameraLock && (this.M += this.rearWheel.da / 5);
            this.rearWheel.K = this.frontWheel.K = Ca;
            var a = Aa - Ba;
            this.z.lean(5 * a * this.direction);
            this.A.lean(5 * -a * this.direction);
            this.D.rotate(a / 8);
            !a && cameraLock && (this.z.lean(-7),
            this.A.lean(7))
        }
        draw(){
            var a = this.track
            , b = this.rearWheel.pos.toPixel()
            , c = this.frontWheel.pos.toPixel()
            , d = this.head.pos.toPixel()
            , e = c.sub(b)
            , f = new Vector((c.y - b.y) * this.direction,(b.x - c.x) * this.direction)
            , h = d.sub(b.add(e.scale(0.5)));
            K.strokeStyle = "#000";
            K.lineWidth = 3.5 * a.zoom;
            K["ba"]()["a"](b.x, b.y, 12.5 * a.zoom, 0, 2 * Math.PI, !0).m(c.x + 12.5 * a.zoom, c.y)["a"](c.x, c.y, 12.5 * a.zoom, 0, 2 * Math.PI, !0).s()["ba"]().fillStyle = "grey";
            K.m(b.x + 5 * a.zoom, b.y)["a"](b.x, b.y, 5 * a.zoom, 0, 2 * Math.PI, !0).m(c.x + 4 * a.zoom, c.y)["a"](c.x, c.y, 4 * a.zoom, 0, 2 * Math.PI, !0)["f"]()["ba"]().lineWidth = 5 * a.zoom;
            K.m(b.x, b.y).l(b.x + 0.4 * e.x + 0.05 * f.x, b.y + 0.4 * e.y + 0.05 * f.y).m(b.x + 0.72 * e.x + 0.64 * h.x, b.y + 0.72 * e.y + 0.64 * h.y).l(b.x + 0.46 * e.x + 0.4 * h.x, b.y + 0.46 * e.y + 0.4 * h.y).l(b.x + 0.4 * e.x + 0.05 * f.x, b.y + 0.4 * e.y + 0.05 * f.y).s()["ba"]().lineWidth = 2 * a.zoom;
            var i = new Vector(6 * Math.cos(this.M) * a.zoom,6 * Math.sin(this.M) * a.zoom);
            K.m(b.x + 0.72 * e.x + 0.64 * h.x, b.y + 0.72 * e.y + 0.64 * h.y).l(b.x + 0.43 * e.x + 0.05 * f.x, b.y + 0.43 * e.y + 0.05 * f.y).m(b.x + 0.45 * e.x + 0.3 * h.x, b.y + 0.45 * e.y + 0.3 * h.y).l(b.x + 0.3 * e.x + 0.4 * h.x, b.y + 0.3 * e.y + 0.4 * h.y).l(b.x + 0.25 * e.x + 0.6 * h.x, b.y + 0.25 * e.y + 0.6 * h.y).m(b.x + 0.17 * e.x + 0.6 * h.x, b.y + 0.17 * e.y + 0.6 * h.y).l(b.x + 0.3 * e.x + 0.6 * h.x, b.y + 0.3 * e.y + 0.6 * h.y).m(b.x + 0.43 * e.x + 0.05 * f.x + i.x, b.y + 0.43 * e.y + 0.05 * f.y + i.y).l(b.x + 0.43 * e.x + 0.05 * f.x - i.x, b.y + 0.43 * e.y + 0.05 * f.y - i.y).s()["ba"]().lineWidth = a.zoom;
            K.m(b.x + 0.46 * e.x + 0.4 * h.x, b.y + 0.46 * e.y + 0.4 * h.y).l(b.x + 0.28 * e.x + 0.5 * h.x, b.y + 0.28 * e.y + 0.5 * h.y).s()["ba"]().lineWidth = 3 * a.zoom;
            K.m(c.x, c.y).l(b.x + 0.71 * e.x + 0.73 * h.x, b.y + 0.71 * e.y + 0.73 * h.y).l(b.x + 0.73 * e.x + 0.77 * h.x, b.y + 0.73 * e.y + 0.77 * h.y).l(b.x + 0.7 * e.x + 0.8 * h.x, b.y + 0.7 * e.y + 0.8 * h.y).s();
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
                , h = (new Vector(m.y * this.direction,-m.x * this.direction)).scaleSelf(a.zoom * a.zoom)
                , n = i.add(m.scale(0.5)).add(h.scale(200 / m.lengthSquared()))
                , m = l.sub(i)
                , h = (new Vector(m.y * this.direction,-m.x * this.direction)).scaleSelf(a.zoom * a.zoom)
                , h = i.add(m.scale(0.5)).add(h.scale(200 / m.lengthSquared()));
                K["ba"]().lineWidth = 6 * a.zoom;
                K.strokeStyle = "rgba(0, 0, 0, 0.5)";
                K.m(l.x, l.y).l(h.x, h.y).l(i.x, i.y).s()["ba"]().strokeStyle = "#000";
                K.m(d.x, d.y).l(n.x, n.y).l(i.x, i.y).s().lineWidth = 8 * a.zoom;
                h = c.add(e.scale(0.1)).add(f.scale(0.93));
                d = c.add(e.scale(0.2)).add(f.scale(1.09));
                K["ba"]().m(i.x, i.y).l(h.x, h.y).s()["ba"]().lineWidth = 2 * a.zoom;
                K.m(d.x + 5 * a.zoom, d.y)["a"](d.x, d.y, 5 * a.zoom, 0, 2 * Math.PI, !0).s()["ba"]();
                switch (this.cosmetics.head){
                case "cap":
                    d = c.add(e.scale(0.4)).add(f.scale(1.15));
                    e = c.add(e.scale(0.1)).add(f.scale(1.05));
                    K.m(d.x, d.y).l(e.x, e.y).s();
                    break;
                case "hat":
                    d = c.add(e.scale(0.37)).add(f.scale(1.19)),
                    i = c.sub(e.scale(0.02)).add(f.scale(1.14)),
                    l = c.add(e.scale(0.28)).add(f.scale(1.17)),
                    c = c.add(e.scale(0.09)).add(f.scale(1.15)),
                    n = d.sub(e.scale(0.1)).addToSelf(f.scale(0.2)),
                    e = i.add(e.scale(0.02)).addToSelf(f.scale(0.2)),
                    K.fillStyle = "#000",
                    K.m(d.x, d.y).l(l.x, l.y).l(n.x, n.y).l(e.x, e.y).l(c.x, c.y).l(i.x, i.y).s()["f"]()
                }
                e = h.sub(b);
                f = new Vector(e.y * this.direction,-e.x * this.direction);
                f = f.scale(a.zoom * a.zoom);
                e = b.add(e.scale(0.3)).add(f.scale(80 / e.lengthSquared()));
                K.lineWidth = 5 * a.zoom;
                K["ba"]().m(h.x, h.y).l(e.x, e.y).l(b.x, b.y).s()
            }
        }
    }
    class Ghost extends Bike {
        constructor(a, b, c){
            var d = Da[Da.length - 1];
            super(b, d, c);
            this.isGhost = true;
            this.ghost_data = a;
            this.name = a[7] || "Ghost";
            this.collected = b[31] || 0;
            this.bike = [this.head = new BodyPart(new Vector(d[0],d[1]),this), this.rearWheel = new Wheel(new Vector(d[6],d[7]),this), this.frontWheel = new Wheel(new Vector(d[13],d[14]),this)];
            this.head.oldPos = new Vector(d[2],d[3]);
            this.head.velocity = new Vector(d[4],d[5]);
            this.rearWheel.oldPos = new Vector(d[8],d[9]);
            this.rearWheel.velocity = new Vector(d[10],d[11]);
            this.rearWheel.speed = d[12];
            this.frontWheel.oldPos = new Vector(d[15],d[16]);
            this.frontWheel.velocity = new Vector(d[17],d[18]);
            this.frontWheel.speed = d[19];
            this.head.size = 14;
            this.rearWheel.size = c ? 11.7 : 14;
            this.frontWheel.size = c ? 11.7 : 14;
            this.F = [this.z = new Joint(this.head,this.rearWheel,this), this.D = new Joint(this.rearWheel,this.frontWheel,this), this.A = new Joint(this.frontWheel,this.head,this)];
            this.z.distanceBetween = c ? 45 : 47;
            this.z.p = d[20];
            this.z.spring = c ? 0.35 : 0.2;
            this.z.damp = 0.3;
            this.D.distanceBetween = c ? 42 : 45;
            this.D.p = d[21];
            this.D.spring = c ? 0.35 : 0.2;
            this.D.damp = 0.3;
            this.A.distanceBetween = 45;
            this.A.p = d[22];
            this.A.spring = c ? 0.35 : 0.2;
            this.A.damp = 0.3;
            this.direction = d[23];
            this.gravity = new Vector(d[24],d[25]);
            this.slow = d[26];
            this.ba = d[27];
            this.ca = d[28];
            this.W = d[29];
            this.K = d[30];
            this.time = this.ghost_data[5];
            this.physics = !0;
            this.ha = {}
        }
        turn(){
            this.direction *= -1;
            this.D.turn();
            var a = this.F[0].p;
            this.z.p = this.F[2].p;
            this.A.p = a
        }
        setProperties(){
            this.rearWheel.speed += (this.W - this.rearWheel.speed ) / 10;
            this.W && (this.M += this.rearWheel.da / 5);
            this.rearWheel.K = this.frontWheel.K = this.K;
            var a = this.ba - this.ca;
            this.z.lean(5 * a * this.direction);
            this.A.lean(5 * -a * this.direction);
            if(this.vehicle == "BMX"){
                this.D.rotate(a / 6);
            } else {
                this.D.rotate(a / 8);
            }
            !a && this.W && (this.z.lean(-7),
            this.A.lean(7))
        }
        draw(){
            if(this.vehicle == "BMX"){
                var a, b, c, d, e = this.track.zoom, f = this.direction, h = this.rearWheel.pos.toPixel(), i = this.frontWheel.pos.toPixel();
                K.strokeStyle = "rgba(0, 0, 0, 0.5)";
                K.lineWidth = 3.5 * e;
                K["ba"]()["a"](h.x, h.y, 10 * e, 0, 2 * Math.PI, !0).m(i.x + 10 * e, i.y)["a"](i.x, i.y, 10 * e, 0, 2 * Math.PI, !0).s();
                var l = i.x - h.x
                , m = i.y - h.y
                , i = new Vector((i.y - h.y) * f,(h.x - i.x) * f);
                a = h.x + 0.3 * l + 0.25 * i.x;
                b = h.y + 0.3 * m + 0.25 * i.y;
                var n = h.x + 0.84 * l + 0.42 * i.x
                , x = h.y + 0.84 * m + 0.42 * i.y;
                c = h.x + 0.84 * l + 0.37 * i.x;
                d = h.y + 0.84 * m + 0.37 * i.y;
                var w = h.x + 0.4 * l + 0.05 * i.x
                , y = h.y + 0.4 * m + 0.05 * i.y;
                K.lineWidth = 3 * e;
                K["ba"]().m(h.x, h.y).l(a, b).l(n, x).m(c, d).l(w, y).l(h.x, h.y);
                c = 6 * Math.cos(this.M) * e;
                d = 6 * Math.sin(this.M) * e;
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
                K.m(n, x).l(c, d).m(C, M).l(X, ya).m(w, y).l(T, Y);
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
                K.m(h.x + l, h.y + m).l(C, M).l(X, ya).l(T, Y).l(za, rc).l(w, y).s();
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
                    K.strokeStyle = "rgba(0, 0, 0, 0.25)";
                    K["ba"]().m(c, d).l(ya, T).l(h, C).s();
                    K.strokeStyle = "rgba(0, 0, 0, 0.5)";
                    K["ba"]().m(n, x).l(M, X).l(h, C).s();
                    n = a + 0.05 * l + 0.88 * i.x;
                    x = b + 0.05 * m + 0.88 * i.y;
                    K.lineWidth = 8 * e;
                    K["ba"]().m(h, C).l(n, x).s();
                    c = a + 0.15 * l + 1.05 * i.x;
                    d = b + 0.15 * m + 1.05 * i.y;
                    K.lineWidth = 2 * e;
                    K["ba"]().m(c + 5 * e, d)["a"](c, d, 5 * e, 0, 2 * Math.PI, !0).s()["ba"]();
                    switch (this.cosmetics.head){
                        case "cap":
                            c = a + 0.4 * l + 1.1 * i.x;
                            d = b + 0.4 * m + 1.1 * i.y;
                            a = a + 0.05 * l + 1.05 * i.x;
                            b = b + 0.05 * m + 1.05 * i.y;
                            K.m(a, b).l(c, d).s();
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
                            K.fillStyle = "rgba(0, 0, 0, 0.5)";
                            K.m(c, d).l(M, X).l(ya, T).l(l, m).l(a, b).l(h, C).s()["f"]();
                            break;
                        case "ninja":
                            c = a + 0.26 * l + 1.1 * i.x,
                            d = b + 0.26 * m + 1.1 * i.y,
                            a = a + 0.05 * l + 1.05 * i.x,
                            b = b + 0.05 * m + 1.05 * i.y,
                            K.lineWidth = 5 * e,
                            K.m(c, d).l(a, b).s().lineWidth = 2 * e,
                            K.l(a - (8 + Math.random()) * e * f, b - (4 + Math.random()) * e * f).m(a, b).l(a - (8 + Math.random()) * e * f, b + (4 + Math.random()) * e * f).s()
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
                    K["ba"]().m(n, x).l(l, m).l(w, y).s()
                }
            } else {
                var a = this.track
                , b = this.rearWheel.pos.toPixel()
                , c = this.frontWheel.pos.toPixel()
                , d = this.head.pos.toPixel()
                , e = c.sub(b)
                , f = new Vector((c.y - b.y) * this.direction,(b.x - c.x) * this.direction)
                , h = d.sub(b.add(e.scale(0.5)));
                K.strokeStyle = "rgba(0, 0, 0, 0.5)";
                K.lineWidth = 3.5 * a.zoom;
                K["ba"]()["a"](b.x, b.y, 12.5 * a.zoom, 0, 2 * Math.PI, !0).m(c.x + 12.5 * a.zoom, c.y)["a"](c.x, c.y, 12.5 * a.zoom, 0, 2 * Math.PI, !0).s()["ba"]().fillStyle = "grey";
                K.m(b.x + 5 * a.zoom, b.y)["a"](b.x, b.y, 5 * a.zoom, 0, 2 * Math.PI, !0).m(c.x + 4 * a.zoom, c.y)["a"](c.x, c.y, 4 * a.zoom, 0, 2 * Math.PI, !0)["f"]()["ba"]().lineWidth = 5 * a.zoom;
                K.m(b.x, b.y).l(b.x + 0.4 * e.x + 0.05 * f.x, b.y + 0.4 * e.y + 0.05 * f.y).m(b.x + 0.72 * e.x + 0.64 * h.x, b.y + 0.72 * e.y + 0.64 * h.y).l(b.x + 0.46 * e.x + 0.4 * h.x, b.y + 0.46 * e.y + 0.4 * h.y).l(b.x + 0.4 * e.x + 0.05 * f.x, b.y + 0.4 * e.y + 0.05 * f.y).s()["ba"]().lineWidth = 2 * a.zoom;
                var i = new Vector(6 * Math.cos(this.M) * a.zoom,6 * Math.sin(this.M) * a.zoom);
                K.m(b.x + 0.72 * e.x + 0.64 * h.x, b.y + 0.72 * e.y + 0.64 * h.y).l(b.x + 0.43 * e.x + 0.05 * f.x, b.y + 0.43 * e.y + 0.05 * f.y).m(b.x + 0.45 * e.x + 0.3 * h.x, b.y + 0.45 * e.y + 0.3 * h.y).l(b.x + 0.3 * e.x + 0.4 * h.x, b.y + 0.3 * e.y + 0.4 * h.y).l(b.x + 0.25 * e.x + 0.6 * h.x, b.y + 0.25 * e.y + 0.6 * h.y).m(b.x + 0.17 * e.x + 0.6 * h.x, b.y + 0.17 * e.y + 0.6 * h.y).l(b.x + 0.3 * e.x + 0.6 * h.x, b.y + 0.3 * e.y + 0.6 * h.y).m(b.x + 0.43 * e.x + 0.05 * f.x + i.x, b.y + 0.43 * e.y + 0.05 * f.y + i.y).l(b.x + 0.43 * e.x + 0.05 * f.x - i.x, b.y + 0.43 * e.y + 0.05 * f.y - i.y).s()["ba"]().lineWidth = a.zoom;
                K.m(b.x + 0.46 * e.x + 0.4 * h.x, b.y + 0.46 * e.y + 0.4 * h.y).l(b.x + 0.28 * e.x + 0.5 * h.x, b.y + 0.28 * e.y + 0.5 * h.y).s()["ba"]().lineWidth = 3 * a.zoom;
                K.m(c.x, c.y).l(b.x + 0.71 * e.x + 0.73 * h.x, b.y + 0.71 * e.y + 0.73 * h.y).l(b.x + 0.73 * e.x + 0.77 * h.x, b.y + 0.73 * e.y + 0.77 * h.y).l(b.x + 0.7 * e.x + 0.8 * h.x, b.y + 0.7 * e.y + 0.8 * h.y).s();
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
                    , h = (new Vector(m.y * this.direction,-m.x * this.direction)).scaleSelf(a.zoom * a.zoom)
                    , n = i.add(m.scale(0.5)).add(h.scale(200 / m.lengthSquared()))
                    , m = l.sub(i)
                    , h = (new Vector(m.y * this.direction,-m.x * this.direction)).scaleSelf(a.zoom * a.zoom)
                    , h = i.add(m.scale(0.5)).add(h.scale(200 / m.lengthSquared()));
                    K["ba"]().lineWidth = 6 * a.zoom;
                    K.strokeStyle = "rgba(0, 0, 0, 0.25)";
                    K.m(l.x, l.y).l(h.x, h.y).l(i.x, i.y).s()["ba"]().strokeStyle = "rgba(0, 0, 0, 0.5)";
                    K.m(d.x, d.y).l(n.x, n.y).l(i.x, i.y).s().lineWidth = 8 * a.zoom;
                    h = c.add(e.scale(0.1)).add(f.scale(0.93));
                    d = c.add(e.scale(0.2)).add(f.scale(1.09));
                    K["ba"]().m(i.x, i.y).l(h.x, h.y).s()["ba"]().lineWidth = 2 * a.zoom;
                    K.m(d.x + 5 * a.zoom, d.y)["a"](d.x, d.y, 5 * a.zoom, 0, 2 * Math.PI, !0).s()["ba"]();
                    switch (this.cosmetics.head){
                    case "cap":
                        d = c.add(e.scale(0.4)).add(f.scale(1.15));
                        e = c.add(e.scale(0.1)).add(f.scale(1.05));
                        K.m(d.x, d.y).l(e.x, e.y).s();
                        break;
                    case "hat":
                        d = c.add(e.scale(0.37)).add(f.scale(1.19)),
                        i = c.sub(e.scale(0.02)).add(f.scale(1.14)),
                        l = c.add(e.scale(0.28)).add(f.scale(1.17)),
                        c = c.add(e.scale(0.09)).add(f.scale(1.15)),
                        n = d.sub(e.scale(0.1)).addToSelf(f.scale(0.2)),
                        e = i.add(e.scale(0.02)).addToSelf(f.scale(0.2)),
                        K.fillStyle = "rgba(0, 0, 0, 0.5)",
                        K.m(d.x, d.y).l(l.x, l.y).l(n.x, n.y).l(e.x, e.y).l(c.x, c.y).l(i.x, i.y).s()["f"]()
                    }
                    e = h.sub(b);
                    f = new Vector(e.y * this.direction,-e.x * this.direction);
                    f = f.scale(a.zoom * a.zoom);
                    e = b.add(e.scale(0.3)).add(f.scale(80 / e.lengthSquared()));
                    K.lineWidth = 5 * a.zoom;
                    K["ba"]().m(h.x, h.y).l(e.x, e.y).l(b.x, b.y).s()
                }
            }
        }
        update(){
            var a = this.track.currentTime
            , b = 0;
            a > this.time && (this.update = () => {});
            this.ghost_data[0][a] && (this.ba = this.ba ? 0 : 1);
            this.ghost_data[1][a] && (this.ca = this.ca ? 0 : 1);
            this.ghost_data[2][a] && (this.W = this.W ? 0 : 1);
            this.ghost_data[3][a] && (this.K = this.K ? 0 : 1);
            this.ghost_data[4][a] && this.turn();
            this.setProperties();
            for(b = this.F.length - 1; 0 <= b; b--)
                this.F[b].update();
            for(b = this.bike.length - 1; 0 <= b; b--)
                this.bike[b].update();
            this.rearWheel.wa && this.frontWheel.wa && (this.slow = !1);
            if(!this.slow){
                this.setProperties();
                for(b = this.F.length - 1; 0 <= b; b--)
                    this.F[b].update();
                for(b = this.bike.length - 1; 0 <= b; b--)
                    this.bike[b].update()
            }
        }
        toString(){
            this.vehicle
        }
    }
    class DeadRider {
        constructor(a, b){
            this.dead = !0;
            var vector = new Vector(0,0);
            this.direction = 1;
            this.bike = b;
            this.track = b.track;
            this.points = [
                this.head = new BodyPart(vector,this),
                this.hip = new BodyPart(vector,this),
                this.elbow = new BodyPart(vector,this),
                this.shadowElbow = new BodyPart(vector,this),
                this.hand = new BodyPart(vector,this),
                this.shadowHand = new BodyPart(vector,this),
                this.knee = new BodyPart(vector,this),
                this.shadowKnee = new BodyPart(vector,this),
                this.foot = new BodyPart(vector,this),
                this.shadowFoot = new BodyPart(vector,this)
            ];
            this.joints = [
                new Joint(this.head,this.hip,this),
                new Joint(this.head,this.elbow,this),
                new Joint(this.elbow,this.hand,this),
                new Joint(this.head,this.shadowElbow,this),
                new Joint(this.shadowElbow,this.shadowHand,this),
                new Joint(this.hip,this.knee,this),
                new Joint(this.knee,this.foot,this),
                new Joint(this.hip,this.shadowKnee,this),
                new Joint(this.shadowKnee,this.shadowFoot,this)
            ];
            for(var point in this.points){
                this.points[point].size = 3,
                this.points[point].friction = 0.05;
            }
            this.head.size = this.hip.size = 8;
            for(var joint in this.joints){
                this.joints[joint].spring = 0.4,
                this.joints[joint].damp = 0.7;
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
            K["ba"]().m(head.x, head.y).l(shadowElbow.x, shadowElbow.y).l(shadowHand.x, shadowHand.y).m(hip.x, hip.y).l(shadowKnee.x, shadowKnee.y).l(shadowFoot.x, shadowFoot.y).s();
            K.strokeStyle = "#000";
            K["ba"]().m(head.x, head.y).l(elbow.x, elbow.y).l(hand.x, hand.y).m(hip.x, hip.y).l(knee.x, knee.y).l(foot.x, foot.y).s();
            K.lineWidth = 8 * a.zoom;
            K["ba"]().m(hip.x, hip.y).l(head.x, head.y).s();
            head.addToSelf(head.sub(hip).scale(0.25));
            K.lineWidth = 2 * a.zoom;
            K["ba"]().m(head.x + 5 * a.zoom, head.y)["a"](head.x, head.y, 5 * a.zoom, 0, 2 * Math.PI, !0).s()
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
                this.joints[c].distanceBetween = this.joints[c].p = e;
            for(c = 1; 5 > c; c++)
                this.joints[c].distanceBetween = 13,
                this.joints[c].p = 13;
            e = [this.head, this.elbow, this.shadowElbow, this.hand, this.shadowHand];
            f = [this.hip, this.knee, this.shadowKnee, this.foot, this.shadowFoot];
            c = 0;
            for(d = e.length; c < d; c++)
                e[c].oldPos = e[c].pos.sub(a);
            c = 0;
            for(d = f.length; c < d; c++)
                f[c].oldPos = f[c].pos.sub(b);
            for(c = this.points.length - 1; 0 <= c; c--)
                this.points[c].velocity.copy(this.points[c].pos.sub(this.points[c].oldPos)),
                this.points[c].velocity.x += Math.random() - Math.random(),
                this.points[c].velocity.y += Math.random() - Math.random()
        }
    }
    class DeadBike extends Bike {
        constructor(a, b, c){
            super(c);
            this.dead = !0;
            this.rider = new DeadRider(b,this);
            this.rider.setVelocity(a.head.velocity, a.rearWheel.velocity);
            this.rider.direction = a.direction;
            this.rider.gravity = this.gravity = a.gravity;
            this.time = a.time;
            this.head = this.rider.head;
            this.bike = a;
            this.deathPoint = a.clone()
        }
        draw(){
            this.bike.draw();
            this.rider.draw();
            if(this.hat) {
                this.hat.draw()
            }
        }
        update(){
            this.bike.update();
            this.rider.update();
            if(this.hat) {
                this.hat.update()
            }
        }
    }
    class Player {
        constructor(a, b, c, d){
            this.dead = !0;
            this.track = d;
            this.speed = 30 + 20 * Math.random();
            this.Vb = 0;
            this.$a = [
                new Shard(a,this),
                new Shard(a,this),
                new Shard(a,this),
                new Shard(a,this),
                new Shard(a,this)
            ];
            this.pos = a.clone();
            this.gravity = b;
            this.time = c;
            this.head = new BodyPart(a,this);
            this.head.velocity.x = 20
        }
        draw(){
            var a, b;
            if(0 < this.speed){
                this.speed -= 10;
                b = this.pos.toPixel();
                var e = b.x + this.speed / 2 * Math.cos(Math.random() * 2 * Math.PI)
                  , d = b.y + this.speed / 2 * Math.sin(Math.random() * 2 * Math.PI);
                K.fillStyle = "#ff0";
                K["ba"]().m(b.x + this.speed / 2 * Math.cos(Math.random() * 2 * Math.PI), d);
                for(a = 1; 16 > a; a++)
                    d = (this.speed + 30 * Math.random()) / 2,
                    e = b.x + d * Math.cos(Math.random() * 2 * Math.PI + 2 * Math.PI * a / 16),
                    d = b.y + d * Math.sin(Math.random() * 2 * Math.PI + 2 * Math.PI * a / 16),
                    K.l(e, d);
                K["f"]()
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
    class Item {
        constructor(a, b, c){
            this.pos = new Vector(a, b);
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
    class SingleUseItem extends Item {
        constructor(a, b, c){
            super(a, b, c);
            this.used = !1
        }
        draw(){
            var a = this.track,
                b = this.pos.toPixel();
            K.fillStyle = this.used ? this.newColor : this.color;
            K.lineWidth = 2 * a.zoom;
            K["ba"]().m(b.x + 7 * a.zoom, b.y)["a"](b.x, b.y, 7 * a.zoom, 0, 2 * Math.PI, !0)["f"]().s();
            this.d ? K["ba"]().m(this.d.toPixel().x + 7 * a.zoom, this.d.toPixel().y)["a"](this.d.toPixel().x, this.d.toPixel().y, 7 * a.zoom, 0, 2 * Math.PI, !0)["f"]().s() : null
        }
        collide(a){
            500 > a.pos.distanceToSquared(this.pos) && this.Ea(a);
            this.d ? 500 > a.pos.distanceToSquared(this.d) && this.Ea(a) : null
        }
        Ea(a){
            a.track.tb ? this.vb(a) : this.used || (this.used = !0,
            this.ib(a))
        }
        ib(){}
        vb(){}
    }
    class Triangle extends Item {
        constructor(a, b, c, d){
            super(a, b, d);
            this.rotation = c;
            this.direction = new Vector(-Math.sin(c * Math.PI / 180),Math.cos(c * Math.PI / 180))
        }
        draw(){
            var a = this.track,
                b = this.pos.toPixel();
            K.fillStyle = this.color;
            K["ba"]().save();
            K.translate(b.x, b.y);
            K.rotate(this.rotation * Math.PI / 180);
            K.m(-7 * a.zoom, -10 * a.zoom).l(0, 10 * a.zoom).l(7 * a.zoom, -10 * a.zoom).l(-7 * a.zoom, -10 * a.zoom)["f"]().s().restore()
        }
        collide(a){
            1E3 > a.pos.distanceToSquared(this.pos) && this.Ea(a)
        }
        toString(){
            return this.type + " " + this.pos.toString() + " " + (this.rotation - 180).toString(32)
        }
    }
    class Target extends SingleUseItem {
        constructor(a, b, c){
            super(a, b, c);
            this.color = "#ff0";
            this.newColor = "#ffa";
            this.type = "T"
        }
        ib(a){
            this.track.collected++;
            this.track.targets && this.track.collected === this.track.targets && (a.track.pastCheckpoint |= 2)
        }
        vb(){
            a.track.ha.hasOwnProperty(this.id) || (a.track.ha[this.id] = ++a.track.collected)
        }
        ub(){
            this.track.targets--
        }
    }
    class Checkpoint extends SingleUseItem {
        constructor(a, b, c){
            super(a, b, c);
            this.color = "#00f";
            this.newColor = "#aaf";
            this.type = "C"
        }
        ib(a){
            a.track.pastCheckpoint |= 1;
            //console.log("Checkpoint", a.track.time, JSON.stringify(a.track))
        }
    }
    class Boost extends Triangle {
        constructor(a, b, c, d){
            super(a, b, c, d);
            this.color = "#ff0";
            this.type = "B"
        }
        Ea(a){
            for(var a = a.track.bike, b = 0, c = a.length; b < c; b++)
                a[b].pos.addToSelf(this.direction)
        }
    }
    class Gravity extends Triangle {
        constructor(a, b, c, d){
            super(a, b, c, d);
            this.direction.scaleSelf(0.3);
            this.color = "#0f0";
            this.type = "G"
        }
        Ea(a){
            a.track.gravity.copy(this.direction)
        }
    }
    class Slowmo extends Item {
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
    class Antigravity extends Item {
        constructor(a, b, c){
            super(a, b, c);
            this.color = "#00ffff";
            this.type = "A"
        }
        Ea(a){
            a.track.gravity.x = a.track.gravity.y = 0
        }
    }
    class Teleporter extends SingleUseItem {
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
            this.d = new Vector(a,b);
            this.x = a;
            this.y = b;
        }
        ib(a){
            a.track.rearWheel.pos.x = a.track.rearWheel.oldPos.x = this.x + a.track.rearWheel.pos.x - a.track.head.pos.x;
            a.track.rearWheel.pos.y = a.track.rearWheel.oldPos.y = this.y + a.track. rearWheel.pos.y - a.track.head.pos.y;

            a.track.frontWheel.pos.x = a.track.frontWheel.oldPos.x = this.x + a.track.frontWheel.pos.x - a.track.head.pos.x;
            a.track.frontWheel.pos.y = a.track.frontWheel.oldPos.y = this.y + a.track.frontWheel.pos.y - a.track.head.pos.y;

            a.track.head.pos.x = a.track.head.oldPos.x = a.track.track.camera.x = this.x;
            a.track.head.pos.y = a.track.head.oldPos.y = a.track.track.camera.y = this.y - 1;

            return this.track
        }
    }
    class Bomb extends Item {
        constructor(a, b, c){
            super(a, b, c);
            this.color = "#f00";
            this.type = "O";
            this.zb = "e"
        }
        Ea(a){
            this.track.player = new Player(this.pos,a.track.gravity,a.track.time,this.track)
        }
    }
    class Line {
        constructor(a, b, c, d, e){
            this.a = a instanceof Vector ? a : new Vector(a, b);
            this.b = b instanceof Vector ? b : new Vector(c, d);
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
                c = new Vector(0,0);
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
    class Physics extends Line {
        constructor(a, b, c, d, e){
            super(a, b, c, d, e);
        }
        collide(a){
            if(this.yb)
            return this;
            this.yb = !0;
            var b = a.pos,
                c = a.velocity,
                d = a.size,
                e = new Vector(0,0),
                f = 0,
                e = b.sub(this.a),
                h = e.dot(this.vector) / this.len / this.len;
            if(0 <= h && 1 >= h && (c = 0 > (e.x * this.vector.y - e.y * this.vector.x) * ((e.x - c.x) * this.vector.y - (e.y - c.y) * this.vector.x) ? -1 : 1,
            e = e.sub(this.vector.scale(h)),
            f = e.getLength(),
            (f < d || 0 > c) && (0 !== f || 514 === this.track.id)))
                return b.addToSelf(e.scale((d * c - f) / f)),
                a.drive(new Vector(-e.y / f,e.x / f)),
                this;
            if(h * this.len < -d || h * this.len > this.len + d)
                return this;
            e = b.sub(0 < h ? this.b : this.a);
            f = e.getLength();
            if(f < d && 0 !== f)
                return b.addToSelf(e.scale((d - f) / f)),
                a.drive(new Vector(-e.y / f,e.x / f)),
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
    class Scenery extends Line {
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
    class xb {
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
    var zb = {};
    function Ab(a, b, c){
        zb[c] || (zb[c] = {});
        var d = a + ";" + b;
        if(zb[c][d])
            return zb[c][d];
        var d = zb[c][d] = []
          , e = new Vector(a.x,a.y)
          , f = (b.y - a.y) / (b.x - a.x)
          , h = new Vector(a.x < b.x ? 1 : -1,a.y < b.y ? 1 : -1)
          , i = 0;
        for(d.push(a); 5E3 > i && !(Math.floor(e.x / c) === Math.floor(b.x / c) && Math.floor(e.y / c) === Math.floor(b.y / c)); ){
            var l = new Vector(0 > h.x ? Math.round(Math.ceil((e.x + 1) / c + h.x) * c) - 1 : Math.round(Math.floor(e.x / c + h.x) * c),0);
            l.y = Math.round(a.y + (l.x - a.x) * f);
            var m = new Vector(0,0 > h.y ? Math.round(Math.ceil((e.y + 1) / c + h.y) * c) - 1 : Math.round(Math.floor(e.y / c + h.y) * c));
            m.x = Math.round(a.x + (m.y - a.y) / f);
            Math.pow(l.x - a.x, 2) + Math.pow(l.y - a.y, 2) < Math.pow(m.x - a.x, 2) + Math.pow(m.y - a.y, 2) ? (e = l,
            d.push(l)) : (e = m,
            d.push(m));
            i++
        }
        return d
    }
    function Bb(a){
        return a.map(function(a){
            a = a.concat();
            a[28] = a[29] = a[30] = 0;
            return a
        })
    }
    class UndoManager {
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
    class Track {
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
            this.Kb = 1;
            this.undoManager = new UndoManager();
            this.paused = !1;
            K["fx"]("Loading track... Please wait.", 36, 16);
            this.camera = new Vector(0,0);
            this.id ? 7 < this.id.length ? (Fb.style.display ? (a = this.id,
            this.id = void 0,
            Fb.style.display = "block",
            tool = "line") : ("v1," !== a.substr(0, 3) && (this.Kb = 0))) : ("v1," !== a.substr(0, 3) && (this.Kb = 0)) : (a = "-18 1i 18 1i##",
            Fb.style.display = "block",
            tool = "line");
            this.code = a;
            var f = a.split("#")
              , h = f[0] ? f[0].split(",") : []
              , a = 0;
            for(c = h.length; a < c; a++)
                if(e = h[a].split(/\s+/g),
                3 < e.length){
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
            if(1 < f.length){
                h = f[1].split(",");
                a = 0;
                for(c = h.length; a < c; a++)
                    if(e = h[a].split(/\s+/g),
                    3 < e.length){
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
            this.collected = this.targets = 0;
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
                        i = new Target(b,d,this);
                        this.targets++;
                        this.powerups.push(i);
                        break;
                    case "C":
                        i = new Checkpoint(b,d,this);
                        this.powerups.push(i);
                        break;
                    case "B":
                        i = new Boost(b,d,parseInt(h[3], 32) + 180,this);
                        break;
                    case "G":
                        i = new Gravity(b,d,parseInt(h[3], 32) + 180,this);
                        break;
                    case "O":
                        i = new Bomb(b,d,this);
                        break;
                    case "S":
                        i = new Slowmo(b,d,this);
                        break;
                    case "A":
                        i = new Antigravity(b,d,this);
                        break;
                    case "W":
                        i = new Teleporter(b,d,this,parseInt(h[3], 32),parseInt(h[4], 32))
                    }
                    i && (b = Math.floor(b / this.scale),
                    d = Math.floor(d / this.scale),
                    this.grid[b] === void 0 && (this.grid[b] = {}),
                    this.grid[b][d] === void 0 && (this.grid[b][d] = new xb),
                    this.grid[b][d].powerups.push(i))
                }
            "MTB" === f[3] || "BMX" === f[3] ? (this.vehicle = f[3],
            this.time = "" !== f[4] ? f[4] : !1) : this.time = "" !== f[3] ? f[3] : !1;
        }
        play(){
            if(this.delta < 4){
                this.delta ++;
            } else {
                for(var a = Sb.length; a--;){
                    Sb[a]()
                }
                this.delta = 0;
            }
            requestAnimationFrame(() => this.play());
        }
        jb(){
            1 < BMX_DEFAULT.length && BMX_DEFAULT.pop();
            1 < MTB_DEFAULT.length && MTB_DEFAULT.pop();
            this.ghost && 1 < Da.length && Da.pop()
        }
        cp(){
            this.removeCollectedItems();
            this.paused = JSON.parse(localStorage.pauseOnEnter) ? true : !1;
            JSON.parse(localStorage.pauseOnEnter) ? window.autoPause = true : null;
            var a = this.player = this.vehicle ? "BMX" === this.vehicle ? new BMX(this, BMX_DEFAULT[BMX_DEFAULT.length - 1], !0) : new MTB(this, MTB_DEFAULT[MTB_DEFAULT.length - 1], !1) : !1;
            a && (this.cameraLock = a.head,
            this.currentTime = a.na[a.na.length - 1][29],
            this.camera = a.head.pos.clone());
            if(this.ghost){
                var b = this.ghost = "BMX" === this.ghost_data[6] ? new Ghost(this.ghost_data, this, !0) : new Ghost(this.ghost_data, this, !1);
                if(!a || 1 === a.na.length && !cameraLock)
                    this.cameraLock = b.head
            }
        }
        reset(){
            BMX_DEFAULT = [[0, -1, 0, -1, 0, 0, -21, 38, -21, 38, 0, 0, 0, 21, 38, 21, 38, 0, 0, 0, 45, 42, 45, 1, 0, 0.3, !1, 0, [], 0]];
            MTB_DEFAULT = [[2, -3, 2, -3, 0, 0, -23, 35, -23, 35, 0, 0, 0, 23, 35, 23, 35, 0, 0, 0, 47, 45, 45, 1, 0, 0.3, !1, 0, [], 0]];
            this.ghost && (Da = Bb("BMX" === this.ghost_data[6] ? BMX_DEFAULT : MTB_DEFAULT));
            this.cp()
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
        watchGhost(a){
            watchGhost(a, this);
            return this
        }
        collide(a){
            var b = Math.floor(a.pos.x / this.scale - 0.5),
                c = Math.floor(a.pos.y / this.scale - 0.5),
                d = this.grid;
            if(d[b] !== void 0) {
                if(d[b][c] !== void 0) {
                    d[b][c].za()
                }
                if(d[b][c + 1] !== void 0) {
                    d[b][c + 1].za()
                }
            }
            if(d[b + 1] !== void 0) {
                if(d[b + 1][c] !== void 0) {
                    d[b + 1][c].za()
                }
                if(d[b + 1][c + 1] !== void 0) {
                    d[b + 1][c + 1].za()
                }
            }
            if(d[b] !== void 0) {
                if(d[b][c] !== void 0) {
                    d[b][c].collide(a)
                }
            }
            if(d[b + 1] !== void 0) {
                if(d[b + 1][c] !== void 0) {
                    d[b + 1][c].collide(a)
                }
                if(d[b + 1][c + 1] !== void 0) {
                    d[b + 1][c + 1].collide(a)
                }
                if(d[b] !== void 0) {
                    if(d[b][c + 1] !== void 0) {
                        d[b][c + 1].collide(a)
                    }
                }
            }
            return this
        }
        update(){
            this.paused || (this.player && this.player.update(),
            this.ghost && this.ghost.update(),
            this.currentTime += 1000 / 25);
            this.draw();
            this.player && this.player.draw();
            this.ghost && this.ghost.draw();
            return this
        }
        draw(){
            function a(){
                K.fillStyle = "#ffb6c1";
                K["ba"]()["a"](f.x, f.y, (ab - 1) * d, 0, 2 * Math.PI, !0)["f"]()
            }
            var b = this.player
              , c = this.currentTime
              , d = this.zoom
              , e = this.scale
              , f = R.toPixel()
              , h = this.grid;
            this.cameraLock && this.camera.addToSelf(this.cameraLock.pos.sub(this.camera).scale(0.2));
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
                K["ba"]().m(U.toPixel().x, U.toPixel().y).l(f.x, f.y).s();
            var i = (new Vector(0,0)).adjustToCanvas()
              , l = (new Vector(canvas.width,canvas.height)).adjustToCanvas();
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
                        K["ba"]().m(w - 10, y).l(w + 10, y).m(w, y + 10).l(w, y - 10).s();
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
                        K["ba"]()["a"](f.x, f.y, 7 * d, 0, 2 * Math.PI, !0)["f"]().s();
                        break;
                    case "boost":
                    case "gravity":
                        K["ba"]().fillStyle = "boost" === tool ? "#ff0" : "#0f0",
                        K.save(),
                        S ? (K.translate(U.toPixel().x, U.toPixel().y),
                        K.rotate(Math.atan2(-(R.x - U.x), R.y - U.y))) : K.translate(f.x, f.y),
                        K.m(-7 * d, -10 * d).l(0, 10 * d).l(7 * d, -10 * d).l(-7 * d, -10 * d)["f"]().s().restore()
                    }
                K["ba"]();
                K.fillStyle = "#ff0";
                K.lineWidth = 1;
                K["a"](40, 12, 3.5, 0, 2 * Math.PI, !0)["f"]().s()["ba"]();
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
                    i = "Press ENTER to restart" + (1 < BMX_DEFAULT.length + MTB_DEFAULT.length ? " or BACKSPACE to cancel Checkpoint" : "");
                else if(this.id === void 0){
                    if(10 === Jb && ("line" === tool || "scenery line" === tool || "brush" === tool || "scenery brush" === tool))
                        i += " - Grid ";
                    i += " - " + tool;
                    if("brush" === tool || "scenery brush" === tool)
                        i += " ( size " + Kb + " )"
                }
                V && (!V[0] && !V[1]) && (i += " - " + (this.paused ? "Unp" : "P") + "ause ( SPACE )");
                K.strokeText(i = ": " + this.collected + " / " + this.targets + "  -  " + i, 50, 16);
                K.fillText(i, 50, 16);
                this.ghost && (K.fillStyle = "#aaa",
                K.textAlign = "right",
                K.strokeText(i = (this.ghost.name || "Ghost") + (this.ghost.collected === this.targets ? " finished!" : ": " + this.ghost.collected + " / " + this.targets), canvas.width - 7, 16),
                K.fillText(i, canvas.width - 7, 16),
                K.textAlign = "left",
                K.fillStyle = "#000");
                V && (V[0] ? (K.textAlign = "right",
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
                K.fc(0, 0, canvas.width, c).fc(0, c + 150, canvas.width, c).fc(0, c, b, 150).fc(b + 250, c, b, 150).sR(b, c, 250, 150));
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
            a = new (c ? Scenery : Physics)(a.x,a.y,b.x,b.y,this);
            if(2 <= a.len && 1E5 > a.len && (this.addLineInternal(a),
            "brush" === tool || "line" === tool || "scenery brush" === tool || "scenery line" === tool))
                "brush" === tool || "line" === tool ? Lb.copy(R) : Mb.copy(R),
                U.copy(R);
            return a
        }
        addLineInternal(a){
            var b = Ab(a.a, a.b, this.scale), c, d, e, f;
            e = 0;
            for(f = b.length; e < f; e++)
                c = Math.floor(b[e].x / this.scale),
                d = Math.floor(b[e].y / this.scale),
                this.grid[c] === void 0 && (this.grid[c] = {}),
                this.grid[c][d] === void 0 && (this.grid[c][d] = new xb),
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
                this.grid[b][c] = new xb
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
            for(var c = Ab(a, b, this.scale), d = [], e = 0, f = c.length; e < f; e++){
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
    document.createElement("canvas").getContext;
    var canvas = document.getElementById("canvas_rider")
      , K = canvas.getContext("2d");
    K.lineCap = "round";
    K.lineJoin = "round";
    K.font = "8px eiven";
    function Ob(){
        var a = K[Pb]
          , b = K;
        return function(){
            a.apply(b, arguments);
            return b
        }
    }
    for(var Pb in K)
        "function" === typeof K[Pb] && (K[Pb.charAt(0) + (Pb.charAt(6) || "")] = Ob());
    K.s = function(){
        K.stroke();
        return K
    };
    var BMX_DEFAULT = [[0, -1, 0, -1, 0, 0, -21, 38, -21, 38, 0, 0, 0, 21, 38, 21, 38, 0, 0, 0, 45, 42, 45, 1, 0, 0.3, !1, 0, [], 0]],
        MTB_DEFAULT = [[2, -3, 2, -3, 0, 0, -23, 35, -23, 35, 0, 0, 0, 23, 35, 23, 35, 0, 0, 0, 47, 45, 45, 1, 0, 0.3, !1, 0, [], 0]],
        Da, N = [{}, {}, {}, {}, {}],
        Aa = 0, Ba = 0, cameraLock = 0,
        Ca = 0, xa = 0, wa = !0, S = !1,
        U = new Vector(40,50),
        R = new Vector(0,0),
        Kb = 20, ab = 15, Z = !1, tool = "camera", Qb = "camera",
        Rb = !1, Hb = !1, V = !1, Jb = 1, Sb = [], Ib = !1,
        Tb = [
            ";Restart ( ENTER );Cancel Checkpoint ( BACKSPACE );;Switch bike ( ctrl+B - Arrows to control, Z to turn );;Enable line shading;Enable fullscreen ( F )".split(";"),
            "Brush ( A - Hold to snap, hold & scroll to adjust size );Scenery brush ( S - Hold to snap, hold & scroll to adjust size );Lines ( backWheel - Hold to snap );Scenery lines ( W - Hold to snap );Eraser ( E - Hold & scroll to adjust size );Camera ( R - Release or press again to switch back, scroll to zoom );Enable grid snapping ( G );;Goal;Checkpoint;Boost;Gravity modifier;Bomb;Slow-Mo;Antigravity;Teleporter;;Shorten last line ( Z )".split(";")
        ],
        Lb = new Vector(40,50),
        Mb = new Vector(-40,50),
        code =createElement("trackcode"),
        Vb =createElement("charcount"),
        Wb =createElement("content"),
        newButton =createElement("new"),
        loadButton =createElement("load"),
        saveButton =createElement("save"),
        uploadButton =createElement("upload"),
        ac =createElement("toolbar1"),
        Fb =createElement("toolbar2");
    createItem(ac.style, {
        top: canvas.offsetTop + "px",
        left: canvas.offsetLeft + "px",
        display: "block"
    });
    createItem(Fb.style, {
        top: canvas.offsetTop + "px",
        left: canvas.offsetLeft + canvas.width - 22 + "px"
    });
    function ride(a, b){
        resizeCanvas();
        var t = new Track(a);
        t.play();
        t.sb = b;
        t.player = t.vehicle === "BMX" ? new BMX(t, BMX_DEFAULT[BMX_DEFAULT.length - 1], !0) : new MTB(t, MTB_DEFAULT[MTB_DEFAULT.length - 1], !1);
        t.cameraLock = t.player.head;
        Sb.push(function(){
            t.update()
        });
        return track = t
    }
    var dc = {
        parse: function(a){
            var code = a.split("#"), c, d, e, a = {
                physics: [],
                scenery: [],
                powerups: [],
                vehicle: code[3] || "BMX"
            };
            0 < code.length && dc.wb(code[0], a.physics);
            1 < code.length && dc.wb(code[1], a.scenery);
            if(2 < code.length){
                var f = code[2] ? code[2].split(",") : [], h, b = 0;
                for(c = f.length; b < c; b++)
                    if(h = f[b].split(" "),
                    2 < h.length)
                        switch (d = parseInt(h[1], 32),
                        e = parseInt(h[2], 32),
                        h[0]){
                        case "T":
                            a.powerups.push({
                                type: Target,
                                x: d,
                                y: e
                            });
                            break;
                        case "C":
                            a.powerups.push({
                                type: Checkpoint,
                                x: d,
                                y: e
                            });
                            break;
                        case "B":
                            a.powerups.push({
                                type: Boost,
                                x: d,
                                y: e,
                                dir: parseInt(h[3], 32) + 180
                            });
                            break;
                        case "G":
                            a.powerups.push({
                                type: Gravity,
                                x: d,
                                y: e,
                                dir: parseInt(h[3], 32) + 180
                            });
                            break;
                        case "O":
                            a.powerups.push({
                                type: Bomb,
                                x: d,
                                y: e
                            });
                            break;
                        case "S":
                            a.powerups.push({
                                type: Slowmo,
                                x: d,
                                y: e
                            });
                            break;
                        case "A":
                            a.powerups.push({
                                type: Antigravity,
                                x: d,
                                y: e
                            });
                            break;
                        case "W":
                            a.powerups.push({
                                type: Teleporter,
                                x: d,
                                y: e,
                                ex: parseInt(h[3], 32),
                                ey: parseInt(h[4], 32)
                            })
                        }
            }
            return a
        },
        wb: function(a, b){
            var c = a.split(","), d, e, f, h, i;
            e = 0;
            for(f = c.length; e < f; e++)
                if(d = c[e].split(" "),
                3 < d.length){
                    h = 0;
                    for(i = d.length - 2; h < i; h += 2)
                        b.push({
                            u: {
                                x: parseInt(d[h], 32),
                                y: parseInt(d[h + 1], 32)
                            },
                            r: {
                                x: parseInt(d[h + 2], 32),
                                y: parseInt(d[h + 3], 32)
                            }
                        })
                }
        },
        stringify: function(a){
            var physics = [], scenery = [], powerups = [], vehicle = a.player || "BMX", f, h;
            f = 0;
            for(h = a.physics.length; f < h; f++)
                a.physics[f].ma || physics.push(a.physics[f].toString());
            f = 0;
            for(h = a.scenery.length; f < h; f++)
                a.scenery[f].ma || scenery.push(a.scenery[f].toString());
            f = 0;
            for(h = a.powerups.length; f < h; f++)
                powerups.push(a.powerups[f].toString());
            f = 0;
            for(h = Math.max(a.physics.length, a.scenery.length); f < h; f++)
                a.physics[f] && (a.physics[f].ma = !1),
                a.scenery[f] && (a.scenery[f].ma = !1);
            return physics + "#" + scenery + "#" + powerups + "#" + vehicle
        }
    };
    function watchGhost(a, b){
        var b = b || track
          , e = ja();
        e.ab(function(a){
            var c = [{}, {}, {}, {}, {}];
            5 < a.split(",").length && (c = c.concat(a.split(",").slice(5)));
            for(var d = 0, e, m, n; 5 > d; d++){
                n = a.split(",")[d].split(" ");
                e = 0;
                for(m = n.length - 1; e < m; e++)
                    c[d][n[e]] = 1
            }
            b.ghost = (b.ghost_data = c)[5];
            b.reset()
        })
        e.Va(a);
        track.paused = false;
    }
    function switchBike(){
        track.vehicle = "BMX" === track.vehicle ? "MTB" : "BMX";
        track.reset()
    }
    function fc(){
        var a = track.erase(R);
        a.length && track.pushUndo(function(){
            track.addToSelf(a, !0)
        }, function(){
            for(var b = 0, c = a.length; b < c; b++)
                a[b].remove()
        })
    }
    function fullscreen(){
        800 === canvas.width ? (canvas.width = window.innerWidth,
        canvas.height = window.innerHeight,
        canvas.style.position = "fixed",
        canvas.style.background = "#ffffff",
        canvas.style.top = canvas.style.left = 0,
        canvas.style.border = "none",
        Fb.style.left = canvas.width - (document.documentElement.offsetHeight <= window.innerHeight ? 41 : 39) + "px",
        V[2] = Tb[0][7] = "Disable fullscreen ( ESC or F )",
        canvas.style.zIndex = 2E3,
        ac.style.zIndex = Fb.style.zIndex = 2000) : resizeCanvas()
        adjust()
    }
    function resizeCanvas(){
        document.body.style.overflowX = 'auto';
        document.body.style.overflowY = 'scroll';
        canvas.width = 800;
        canvas.height = 450;
        canvas.style.position = "static";
        canvas.style.border = "1px solid black";
        Fb.style.left = canvas.offsetLeft + canvas.width - 22 + "px";
        V[2] = Tb[0][7] = "Enable fullscreen ( F )";
        canvas.style.zIndex = ac.style.zIndex = Fb.style.zIndex = 2
    }
    function adjust(){
        K.lineCap = "round";
        K.lineJoin = "round";
        K.font = "8px eiven";
        ac.style.top = Fb.style.top = canvas.offsetTop + "px";
        ac.style.left = canvas.offsetLeft + "px"
    }
    window.onresize = function(){
        (800 === canvas.width ? resizeCanvas : fullscreen)();
        adjust()
    };
    function jc(a){
        a.addEventListener("focus", detach);
        a.addEventListener("blur", attach)
    }
    document.onkeydown = function(a){
        switch (a.keyCode){
        case 8:
            250 !== canvas.width && a.preventDefault();
            track.jb();
            track.cp();
            break;
        case 13:
            a.preventDefault();
            track.cp();
            break;
        case 37:
            track.player && (a.preventDefault(),
            track.cameraLock = track.player.head,
            Aa = 1,
            window.autoPause ? (track.paused = false, window.autoPause = false) : null);
            break;
        case 39:
            track.player && (a.preventDefault(),
            track.cameraLock = track.player.head,
            Ba = 1,
            window.autoPause ? (track.paused = false, window.autoPause = false) : null);
            break;
        case 38:
            track.player && (a.preventDefault(),
            track.cameraLock = track.player.head,
            cameraLock = 1,
            window.autoPause ? (track.paused = false, window.autoPause = false) : null);
            break;
        case 40:
            track.player && (a.preventDefault(),
            track.cameraLock = track.player.head,
            Ca = 1,
            window.autoPause ? (track.paused = false, window.autoPause = false) : null);
            break;
        case 109:
        case 189:
            zoom(-1);
            break;
        case 107:
        case 187:
            zoom(1);
            break;
        case 90:
        case 222:
            !track.cameraLock && track.id === void 0 ? track.undo() : wa && (xa = 1);
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
                track.player && (a.preventDefault(),
                track.cameraLock = track.player.head,
                Aa = 1);
                break;
            case 68:
                track.player && (a.preventDefault(),
                track.cameraLock = track.player.head,
                Ba = 1);
                break;
            case 87:
                track.player && (a.preventDefault(),
                track.cameraLock = track.player.head,
                cameraLock = 1);
                break;
            case 83:
                track.player && (a.preventDefault(),
                track.cameraLock = track.player.head,
                Ca = 1);
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
            track.player.pastCheckpoint = !1
        }
    };
    document.onkeyup = function(a){
        switch (a.keyCode){
        case 70:
        case 27:
            fullscreen();
            break;
        case 66:
            a.ctrlKey && switchBike();
            break;
        case 37:
            Aa = 0;
            break;
        case 39:
            Ba = 0;
            break;
        case 38:
            cameraLock = 0;
            break;
        case 40:
            Ca = 0;
            break;
        case 90:
        case 222:
            wa = !0;
            break;
        case 71:
            track.ghost ? track.cameraLock = track.ghost.head === track.cameraLock && track.player ? track.player.head : track.ghost.head : (Jb = 11 - Jb,
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
            track.ghost && (track.cameraLock === track.ghost.head && (track.cameraLock = track.player.head),
            track.ghost = !1);
        case 65:
            Z && (S = Z = !1)
        }
        if(location.pathname.slice(0, 7) == '/tracks')
            switch (a.keyCode){
            case 65:
                Aa = 0;
                break;
            case 68:
                Ba = 0;
                break;
            case 87:
                cameraLock = 0;
                break;
            case 83:
                Ca = 0;
                break;
            }
    };
    ac.onmousemove = function(a){
        a = Math.floor((a.clientY - ac.offsetTop + window.pageYOffset) / 25);
        V = [0, a, Tb[0][a]]
    };
    Fb.onmousemove = function(a){
        a = Math.floor((a.clientY - Fb.offsetTop + window.pageYOffset) / 25);
        V = [1, a, Tb[1][a]];
        if(14 === a && ("scenery line" === tool || "scenery brush" === tool))
            V[2] = "Shorten last set of scenery lines ( Z )"
    };
    ac.onmousedown = function(a){
        track.cameraLock = !1;
        switch (Math.floor((a.clientY - ac.offsetTop + window.pageYOffset) / 25) + 1){
        case 1:
            track.paused = !track.paused;
            break;
        case 3:
            track.jb();
        case 2:
            track.Na();
            break;
        case 5:
            switchBike();
            break;
        case 7:
            Ib ? (Ib = !1,
            V[2] = Tb[0][6] = "Enable line shading") : (Ib = !0,
            V[2] = Tb[0][6] = "Disable line shading");
            track.U = [];
            break;
        case 8:
            fullscreen()
        }
    };
    Fb.onmousedown = function(a){
        if(track.id !== void 0)
            return !1;
        track.cameraLock = !1;
        switch (Math.floor((a.clientY - ac.offsetTop + window.pageYOffset) / 25) + 1){
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
    };
    canvas.onmouseover = function(){
        V = !1;
        document.body.style.cursor = "camera" === tool ? "move" : "none"
    };
    canvas.onmousedown = function(a){
        a.preventDefault();
        S = !0;
        track.cameraLock = !1;
        if(window.BHR_RCE_ENABLED && 2 === a.button && "camera" !== tool)
            fc(),
            Hb = !0;
        else {
            var b;
            Z || U.copy(R);
            switch (tool){
            case "boost":
            case "gravity":
                document.body.style.cursor = "crosshair";
                break;
            case "eraser":
                fc();
                break;
            case "goal":
                track.powerups.push(b = new Target(U.x,U.y,track));
                track.targets++;
                break;
            case "checkpoint":
                track.powerups.push(b = new Checkpoint(U.x,U.y,track));
                break;
            case "bomb":
                b = new Bomb(U.x,U.y,track);
                break;
            case "slow-mo":
                b = new Slowmo(U.x,U.y,track);
                break;
            case "antigravity":
                b = new Antigravity(U.x,U.y,track);
                break;
            case "teleporter":
                b = new Teleporter(U.x,U.y,track);
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
                track.grid[c][d] === void 0 && (track.grid[c][d] = new xb);
                track.grid[c][d].powerups.push(b);
                track.pushUndo(function(){
                    b.remove()
                }, function(){
                    b instanceof Target && ++track.targets;
                    track.grid[c][d].powerups.push(b)
                })
            }
        }
    };
    canvas.oncontextmenu = function(a){
        a.preventDefault()
    };
    document.onmousemove = function(a){
        "camera" !== tool && (track.cameraLock = !1);
        R = (new Vector(a.clientX - canvas.offsetLeft,a.clientY - canvas.offsetTop + window.pageYOffset)).adjustToCanvas();
        "eraser" !== tool && 2 !== a.button && (R.x = Math.round(R.x / Jb) * Jb,
        R.y = Math.round(R.y / Jb) * Jb);
        if(S)
            if("camera" === tool)
                track.camera.addToSelf(U.sub(R)),
                R.copy(U);
            else if("eraser" === tool || window.BHR_RCE_ENABLED && 2 === a.button)
                fc();
            else if(!Z && ("brush" === tool || "scenery brush" === tool) && U.distanceTo(R) >= Kb){
                var b = track.addLine(U, R, "brush" !== tool);
                track.pushUndo(function(){
                    b.remove()
                }, function(){
                    b.xb()
                })
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
                c = "boost" === tool ? new Boost(U.x,U.y,d,track) : new Gravity(U.x,U.y,d,track),
                a = Math.floor(c.pos.x / track.scale),
                b = Math.floor(c.pos.y / track.scale),
                track.grid[a] === void 0 && (track.grid[a] = []),
                track.grid[a][b] === void 0 && (track.grid[a][b] = new xb),
                track.grid[a][b].powerups.push(c),
                track.pushUndo(function(){
                    c.remove()
                }, function(){
                    track.grid[a][b].powerups.push(c)
                })
    };
    document.onmouseup = function(){
        Z || (S = !1)
    };
    canvas.onmouseout = function(){
        document.body.style.cursor = "default"
    };
    if(newButton) {
        newButton.onclick = function(){
            if(confirm("Do you really want to start a new track?")) {
                Sb.pop();
                H = ride();
                Vb.innerHTML = "trackcode";
                code.value = null;
                track.reset()
            }
        }
    }
    if(loadButton) {
        loadButton.onclick = function(){
            if(10 < code.value.length) {
                Sb.pop();
                H = ride(code.value, []);
                Vb.innerHTML = "Trackcode";
                code.value = null;
                track.reset()
            } else {
                alert("No trackcode to load!")
            }
        }
    }
    if(saveButton) {
        saveButton.onclick = function(){
            if(track.id === void 0) {
                code.value = track.toString();
                code.select();
                Vb.innerHTML = "Trackcode - " + Math.round(code.value.length / 1E3) + "k - CTRL + C to copy"
            }
        }
    }
    if(uploadButton) {
        uploadButton.onclick = function(){
            var a = track.toString();
            if(0 < a.length && track.targets > 0){
                track.paused = !0;
                tool = "camera";
                changeThumb(!0);
                ac.style.display = "none";
                Fb.style.display = "none";
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
                    changeThumb(!1);
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
            } else
                if(track.targets < 1){
                    return alert("Sorry, but your track must have at least 1 target!"),
                    !1
                } else
                    return alert("Sorry, but your track must be bigger or more detailed."),
                    !1
        }
    }
    function zoom(a){
        if(0 > a && 0.2 < track.zoom || 0 < a && 4 > track.zoom)
            track.zoom = Math.round(10 * track.zoom + 2 * a) / 10,
            track.U = {}
    }
    function oc(a){
        a.preventDefault();
        if(Z)
            if("eraser" === tool)
                if((0 < a.detail || 0 > a.wheelDelta) && 5 < ab)
                    ab -= 5;
                else {
                    if((0 > a.detail || 0 < a.wheelDelta) && 40 > ab)
                        ab += 5
                }
            else {
                if("brush" === tool || "scenery brush" === tool)
                    if((0 < a.detail || 0 > a.wheelDelta) && 4 < Kb)
                        Kb -= 8;
                    else if((0 > a.detail || 0 < a.wheelDelta) && 200 > Kb)
                        Kb += 8
            }
        else
            0 < a.detail || 0 > a.wheelDelta ? zoom(-1) : (0 > a.detail || 0 < a.wheelDelta) && zoom(1);
        a = (new Vector(a.clientX - canvas.offsetLeft,a.clientY - canvas.offsetTop + window.pageYOffset)).adjustToCanvas();
        track.cameraLock || track.camera.addToSelf(R.sub(a))
    }
    canvas.addEventListener("DOMMouseScroll", oc, !1);
    canvas.addEventListener("mousewheel", oc, !1);
    var pc;
    function detach(){
        pc = {
            Fb: document.onkeydown,
            Gb: document.onkeypress,
            Hb: document.onkeyup
        };
        document.onkeydown = document.onkeypress = document.onkeyup = () => {}
    }
    function attach(){
        if(pc) {
            document.onkeydown = pc.Fb,
            document.onkeypress = pc.Gb,
            document.onkeyup = pc.Hb,
            pc = !1
        }
    }
    function changeThumb(a){
        track.Ab = a !== !1
    }
    function getTrack(){
        return track
    }
    window.BHR = {};
    window.BHR.game = {
        ride: ride,
        watchGhost: watchGhost,
        detach: detach,
        attach: attach,
        changeThumb: changeThumb
    };
    window.BHR.TrackString = dc;
    window.BHR.set ? window.BHR.set("track", getTrack) : window.BHR.track = getTrack;
    window.BHR.TRACK_MIN_SIZE = 0;
}()
