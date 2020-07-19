(function() {
    var $ID$ = 0;
    function __ID(obj) {
        if (!obj.$ID$) {
            Object.defineProperty(obj, '$ID$', {
                value: ++$ID$,
                writable: false,
                configurable: false,
                enumerable: false
            })
        }
        return obj.$ID$
    }
    var k = void 0
      , l = !0
      , p = null
      , q = !1;
    function ba() {
        return function() {}
    }
    function ca(a) {
        return function() {
            return a
        }
    }
    var s = 2 * Math.PI
      , t = Math.random
      , v = Math.cos
      , w = Math.sin
      , y = Math.round
      , da = Math.ceil
      , C = Math.floor
      , ea = Math.pow
      , fa = Math.sqrt
      , D = parseInt
      , F = document
      , ga = F.body
      , ha = "fx"
      , ia = "camera;eraser;line;scenery line;brush;scenery brush;gravity;boost;checkpoint;slow-mo;goal;bomb".split(";")
      , ja = "#a70 #777 #bd7f32 #0a0 #f70 #07a #00a #a0a #70a #a00".split(" ")
      , ka = 0;
    function la(a, b) {
        var c = F.createElementNS(b, a.match(/^\w+/)[0]), e, d;
        if (e = a.match(/#([\w-]+)/))
            c.id = e[1];
        (d = a.match(/\.[\w-]+/g)) && c.setAttribute("class", d.join(" ").replace(/\./g, ""));
        return c
    }
    function G(a, b, c) {
        var e = document, d, g;
        if (a && a.big)
            return e.getElementById(a);
        c = c || {};
        b = b || "http://www.w3.org/1999/xhtml";
        a[0].big && (a[0] = la(a[0], b));
        for (d = 1; d < a.length; d++)
            if (a[d].big)
                a[0].appendChild(e.createTextNode(a[d]));
            else if (a[d].pop)
                a[d][0].big && (a[d][0] = la(a[d][0], b)),
                a[0].appendChild(a[d][0]),
                G(a[d], b, c);
            else if (a[d].call)
                a[d](a[0]);
            else
                for (g in a[d])
                    a[0].setAttribute(g, a[d][g]);
        c[0] = a[0];
        return c[0]
    }
    function H(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }
    function ma(a, b) {
        for (var c = 0, e = b.length; c < e; c++) {
            var d = a
              , g = b[c];
            ~d.indexOf(g) || d.push(g)
        }
    }
    function na() {
        this.Ca = {}
    }
    var oa = na.prototype;
    oa.on = function(a, b) {
        (this.Ca[a] = this.Ca[a] || []).push(b);
        return this
    }
    ;
    oa.Lc = function(a, b) {
        var c = this;
        return c.on(a, function() {
            b.apply(this, args);
            c.off(a, b)
        })
    }
    ;
    oa.off = function(a, b) {
        if (this.Ca[a]) {
            var c = this.Ca[a]
              , e = b;
            ~(e = c.indexOf(e)) && c.splice(e, 1)
        }
        return this
    }
    ;
    oa.emit = function(a) {
        var b = this.Ca && this.Ca[a];
        if (b)
            for (var c = [].slice.call(arguments, 1), e = 0, d = b.length; e < d; e++)
                b[e].apply(this, c);
        return this
    }
    ;
    function I(a, b) {
        this.x = a;
        this.y = b
    }
    var J = I.prototype;
    J.v = function(a) {
        return new I((this.x - a.W.x) * a.e + a.wa.width / 2,(this.y - a.W.y) * a.e + a.wa.height / 2)
    }
    ;
    J.Gb = function(a) {
        return new I((this.x - a.wa.width / 2) / a.e + a.W.x,(this.y - a.wa.height / 2) / a.e + a.W.y)
    }
    ;
    J.M = function(a) {
        this.x = a.x;
        this.y = a.y;
        return this
    }
    ;
    J.I = function(a) {
        this.x += a.x;
        this.y += a.y;
        return this
    }
    ;
    J.Qc = function(a) {
        this.x -= a.x;
        this.y -= a.y;
        return this
    }
    ;
    J.Za = function(a) {
        this.x *= a;
        this.y *= a;
        return this
    }
    ;
    J.clone = function() {
        return new I(this.x,this.y)
    }
    ;
    J.c = function(a) {
        return new I(this.x + a.x,this.y + a.y)
    }
    ;
    J.k = function(a) {
        return new I(this.x - a.x,this.y - a.y)
    }
    ;
    J.b = function(a) {
        return new I(this.x * a,this.y * a)
    }
    ;
    J.Qb = function(a) {
        return new I(this.x / a,this.y / a)
    }
    ;
    J.Fa = function(a) {
        return this.x * a.x + this.y * a.y
    }
    ;
    J.Ha = function() {
        return fa(this.x * this.x + this.y * this.y)
    }
    ;
    J.Z = function() {
        return this.x * this.x + this.y * this.y
    }
    ;
    J.vb = function(a) {
        var b = this.x - a.x
          , a = this.y - a.y;
        return fa(b * b + a * a)
    }
    ;
    J.wb = function(a) {
        var b = this.x - a.x
          , a = this.y - a.y;
        return b * b + a * a
    }
    ;
    J.toString = function() {
        return y(this.x).toString(32) + " " + y(this.y).toString(32)
    }
    ;
    J.toJSON = function() {
        return [this.x, this.y]
    }
    ;
    function K(a, b) {
        this.d = a.clone();
        this.q = a.clone();
        this.n = new I(0,0);
        this.h = b;
        this.size = 10;
        this.Da = 0;
        this.T = l
    }
    var pa = K.prototype;
    pa.za = function(a) {
        this.d.I(a.b(-a.Fa(this.n) * this.Da));
        this.La = l
    }
    ;
    pa.K = function() {
        var a = this.d.I(this.n.I(this.h.Q).Za(0.99));
        this.La = q;
        this.T && O.T(this);
        this.n = a.k(this.q);
        this.q.M(a)
    }
    ;
    pa.clone = function() {
        var a = new K(this.d,this.h);
        a.q = this.q.clone();
        a.n = this.n.clone();
        a.size = this.size;
        a.Da = this.Da;
        return a
    }
    ;
    pa.toJSON = function() {
        return {
            kb: "BodyPart",
            d: this.d,
            q: this.q,
            n: this.n,
            size: this.size
        }
    }
    ;
    function P(a, b) {
        this.d = a.clone();
        this.q = a.clone();
        this.n = new I(0,0);
        this.h = b;
        this.size = 10;
        this.Da = 0;
        this.Q = this.T = l;
        this.z = this.ua = 0
    }
    var qa = P.prototype;
    qa.za = function(a) {
        this.d.I(a.b(this.z * this.h.direction));
        this.L && this.d.I(a.b(0.3 * -a.Fa(this.n)));
        this.ua = a.Fa(this.n) / this.size;
        this.La = l
    }
    ;
    qa.K = function() {
        this.n.I(this.h.Q).Za(0.99);
        this.d.I(this.n);
        this.La = q;
        this.T && O.T(this);
        this.n = this.d.k(this.q);
        this.q.M(this.d)
    }
    ;
    qa.clone = function() {
        var a = new P(this.d,this.h);
        a.q = this.q.clone();
        a.n = this.n.clone();
        a.z = this.z;
        return a
    }
    ;
    qa.toJSON = function() {
        return {
            kb: "Wheel",
            d: this.d,
            q: this.q,
            n: this.n,
            z: this.z,
            Pc: this.ua,
            size: this.size,
            Da: this.Da
        }
    }
    ;
    function ra(a, b) {
        this.d = new I(a.x + 5 * (t() - t()),a.y + 5 * (t() - t()));
        this.q = new I(this.d.x,this.d.y);
        this.n = new I(11 * (t() - t()),11 * (t() - t()));
        this.h = b;
        this.qb = b.h;
        this.size = 2 + 9 * t();
        this.ea = 6.2 * t();
        this.ua = t() - t();
        this.Da = 0.05;
        this.T = l;
        this.Zb = [1, 0.7, 0.8, 0.9, 0.5, 1, 0.7, 1]
    }
    var sa = ra.prototype;
    sa.J = function() {
        var a = this.d.v(this.qb)
          , b = this.size * this.qb.e
          , c = this.Zb[0] * b
          , e = a.x + c * v(this.ea)
          , c = a.y + c * w(this.ea)
          , d = 2;
        for (Q.ba().m(e, c).fillStyle = "#000"; 8 > d; d++)
            c = this.Zb[d - 1] * b / 2,
            e = a.x + c * v(this.ea + 6.283 * d / 8),
            c = a.y + c * w(this.ea + 6.283 * d / 8),
            Q.l(e, c);
        Q.f()
    }
    ;
    sa.za = function(a) {
        this.ua = a.Fa(this.n) / this.size;
        this.d.I(a.b(-a.Fa(this.n) * this.Da));
        this.ea += this.ua;
        var b = a.Ha();
        0 < b && (a = new I(-a.y / b,a.x / b),
        this.q.I(a.b(0.8 * a.Fa(this.n))))
    }
    ;
    sa.K = function() {
        this.ea += this.ua;
        this.n.I(this.h.Q);
        this.n = this.n.b(0.99);
        this.d.I(this.n);
        this.La = q;
        this.T && O.T(this);
        this.n = this.d.k(this.q);
        this.q.M(this.d)
    }
    ;
    function R(a, b, c) {
        this.r = a;
        this.w = b;
        this.h = c;
        this.p = this.R = 40;
        this.V = 0.5;
        this.U = 0.7
    }
    var ta = R.prototype;
    ta.Y = function(a) {
        this.p += (this.R - a - this.p) / 5
    }
    ;
    ta.rotate = function(a) {
        var b = this.w.d.k(this.r.d)
          , b = new I(-b.y / this.p,b.x / this.p);
        this.r.d.I(b.b(a));
        this.w.d.I(b.b(-a))
    }
    ;
    ta.K = function() {
        var a = this.w.d.k(this.r.d)
          , b = a.Ha();
        if (1 > b)
            return this;
        a = a.b(1 / b);
        b = a.b((b - this.p) * this.U);
        b.I(a.b(this.w.n.k(this.r.n).Fa(a) * this.V));
        this.w.n.I(b.b(-1));
        this.r.n.I(b);
        return this
    }
    ;
    ta.Oa = function() {
        var a = new I;
        a.M(this.r.d);
        this.r.d.M(this.w.d);
        this.w.d.M(a);
        a.M(this.r.q);
        this.r.q.M(this.w.q);
        this.w.q.M(a);
        a.M(this.r.n);
        this.r.n.M(this.w.n);
        this.w.n.M(a);
        a = this.r.ea;
        this.r.ea = this.w.ea;
        this.w.ea = a
    }
    ;
    ta.Ha = function() {
        return this.w.d.k(this.r.d).Ha()
    }
    ;
    ta.clone = function() {
        var a = new R(this.r,this.w,this.h);
        a.R = this.R;
        a.p = this.p;
        a.V = this.V;
        a.U = this.U;
        return a
    }
    ;
    ta.toJSON = function() {
        return {
            kb: "Joint",
            r: this.r,
            w: this.w,
            R: this.R,
            p: this.p,
            V: this.V,
            U: this.U
        }
    }
    ;
    function ua(a) {
        this.h = a;
        this.Sa = "hat";
        this.Ea = this.na = q;
        this.N = this.ka = this.ma = this.ca = this.L = 0
    }
    var va = ua.prototype;
    H(va, na.prototype);
    va.Oa = function() {
        wa = q;
        this.direction *= -1;
        this.F.Oa();
        var a = this.A.p;
        this.A.p = this.B.p;
        this.B.p = a;
        this.emit("turn")
    }
    ;
    va.sc = function() {
        var a = this.h;
        this.emit("hitTarget");
        if (this.Ea & 2) {
            if (this.emit("hitGoal"),
            a.Ba && a.pa === a.Ba && 0 < a.currentTime && (!a.time || this.time < a.time) && a.id !== k) {
                if (confirm("You just set a new Track record!\nYour run will be saved for others to enjoy.")) {
                    for (var b = "", c, e = 0, d = S.length; e < d; e++) {
                        for (c in S[e])
                            isNaN(c) || (b += c + " ");
                        b += ","
                    }
                    c = new XMLHttpRequest;
                    c.open("POST", "/ghost/save", q);
                    c.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    c.send("tid=" + a.id + "&v=" + this.toString() + "&t=" + a.currentTime + "&c=" + b);
                    "ok" !== c.responseText && alert("Server responded: " + c.responseText)
                }
                xa = ya = T = za = 0
            }
        } else
            this.Ea & 1 && (this.emit("hitCheckpoint"),
            a.save());
        this.Ea = 0
    }
    ;
    va.Eb = function() {
        this.na = l;
        this.j.za = ba();
        this.g.z = 0;
        this.g.L = q;
        this.o.L = q;
        this.j.T = q;
        var a = this.h.ha = new Aa(this,this.Fb(),this.h);
        a.Wa = new ra(this.j.d.clone(),this);
        a.Wa.n = this.j.n.clone();
        a.Wa.size = 10;
        a.Wa.ua = 0.1
    }
    ;
    va.K = function() {
        this.Ea && this.sc();
        var a = this.h.currentTime;
        xa !== this.ka && (S[0][a] = 1,
        this.ka = xa);
        ya !== this.ma && (S[1][a] = 1,
        this.ma = ya);
        T !== this.ca && (S[2][a] = 1,
        this.ca = T);
        za !== this.L && (S[3][a] = 1,
        this.L = za);
        wa && (S[4][a] = 1);
        this.na || this.Ma();
        for (a = this.G.P - 1; 0 <= a; a--)
            this.G[a].K();
        for (a = this.i.P - 1; 0 <= a; a--)
            this.i[a].K();
        this.g.La && this.o.La && (this.fa = q);
        if (!this.fa && !this.na) {
            this.Ma();
            for (a = this.G.P - 1; 0 <= a; a--)
                this.G[a].K();
            for (a = this.i.P - 1; 0 <= a; a--)
                this.i[a].K()
        }
    }
    ;
    va.clone = function() {
        var a = this.g.clone()
          , b = this.o.clone()
          , c = this.j.clone()
          , e = this.A.clone()
          , d = this.F.clone()
          , g = this.B.clone();
        return {
            g: a,
            o: b,
            head: c,
            i: [c, a, b],
            G: [e, d, g],
            direction: this.direction,
            Q: this.Q.clone(),
            fa: this.fa,
            time: this.time
        }
    }
    ;
    va.toJSON = function() {
        return {
            kb: this.toString(),
            keys: S.map(Object.keys),
            g: this.g,
            o: this.o,
            head: this.j,
            A: this.A,
            F: this.F,
            Jc: this.B,
            direction: this.direction,
            Q: this.Q,
            fa: this.fa,
            time: this.time
        }
    }
    ;
    va.toString = ca("BikeGeneric");
    function Ba(a, b, c) {
        this.fb = a;
        this.name = a[7] || "Ghost";
        this.h = c;
        this.pa = b[31] || 0;
        this.Sa = "hat";
        this.Ub = l;
        this.currentTime = this.N = 0;
        this.sa = {}
    }
    var Ca = Ba.prototype;
    Ca.Oa = function() {
        this.direction *= -1;
        this.F.Oa();
        var a = this.G[0].p;
        this.A.p = this.G[2].p;
        this.B.p = a
    }
    ;
    Ca.K = function() {
        var a = this.h.currentTime
          , b = 0;
        a > this.time && (this.K = ba());
        this.fb[0][a] && (this.ka = this.ka ? 0 : 1);
        this.fb[1][a] && (this.ma = this.ma ? 0 : 1);
        this.fb[2][a] && (this.ca = this.ca ? 0 : 1);
        this.fb[3][a] && (this.L = this.L ? 0 : 1);
        this.fb[4][a] && this.Oa();
        this.Ma();
        for (b = this.G.P - 1; 0 <= b; b--)
            this.G[b].K();
        for (b = this.i.P - 1; 0 <= b; b--)
            this.i[b].K();
        this.g.La && this.o.La && (this.fa = q);
        if (!this.fa) {
            this.Ma();
            for (b = this.G.P - 1; 0 <= b; b--)
                this.G[b].K();
            for (b = this.i.P - 1; 0 <= b; b--)
                this.i[b].K()
        }
        this.currentTime += 40
    }
    ;
    function Da(a, b) {
        ua.call(this, a);
        var b = b || Ea[Ea.length - 1]
          , c = this;
        c.Cb = Ea;
        c.i = {
            "0": c.j = new K(new I(b[0],b[1]),c),
            1: c.g = new P(new I(b[6],b[7]),c),
            2: c.o = new P(new I(b[13],b[14]),c),
            P: 3
        };
        c.j.q = new I(b[2],b[3]);
        c.j.n = new I(b[4],b[5]);
        c.g.q = new I(b[8],b[9]);
        c.g.n = new I(b[10],b[11]);
        c.g.z = b[12];
        c.o.q = new I(b[15],b[16]);
        c.o.n = new I(b[17],b[18]);
        c.o.z = b[19];
        c.j.size = 14;
        c.j.za = function() {
            c.Eb()
        }
        ;
        c.g.size = 11.7;
        c.o.size = 11.7;
        c.G = {
            "0": c.A = new R(c.j,c.g,c),
            1: c.F = new R(c.g,c.o,c),
            2: c.B = new R(c.o,c.j,c),
            P: 3
        };
        c.A.R = 45;
        c.A.p = b[20];
        c.A.U = 0.35;
        c.A.V = 0.3;
        c.F.R = 42;
        c.F.p = b[21];
        c.F.U = 0.35;
        c.F.V = 0.3;
        c.B.R = 45;
        c.B.p = b[22];
        c.B.U = 0.35;
        c.B.V = 0.3;
        c.direction = b[23];
        c.Q = new I(b[24],b[25]);
        c.fa = b[26];
        a.pa = b[27];
        for (var e = 0, d = a.u.length; e < d; e++)
            a.u[e].sa = b[28][e];
        c.time = b[29];
        if (c.time) {
            c.ka = b[30];
            c.ma = b[31];
            c.ca = b[32];
            c.L = b[33];
            e = 0;
            for (d = S.length; e < d; e++)
                for (var g in S[e])
                    g >= c.time && delete S[e][g]
        } else
            S = [{}, {}, {}, {}, {}]
    }
    var Fa = Da.prototype;
    H(Fa, ua.prototype);
    Fa.Ma = function() {
        wa && this.Oa();
        this.g.z += (T - this.i[1].z) / 10;
        T && (this.N += this.g.ua / 5);
        this.g.L = this.o.L = za;
        var a = xa - ya;
        this.A.Y(5 * a * this.direction);
        this.B.Y(5 * -a * this.direction);
        this.F.rotate(a / 6);
        !a && T && (this.A.Y(-7),
        this.B.Y(7))
    }
    ;
    Fa.J = function() {
        var a, b, c, e, d = this.h, g = d.ia, f = d.e, h = this.direction, i = this.g.d.v(d), j = this.o.d.v(d);
        g.fillStyle = "#fff";
        g.strokeStyle = "#000";
        g.lineWidth = 3.5 * f;
        g.ba().a(i.x, i.y, 10 * f, 0, s, l).m(j.x + 10 * f, j.y).a(j.x, j.y, 10 * f, 0, s, l).s();
        var m = j.x - i.x
          , n = j.y - i.y
          , j = new I((j.y - i.y) * h,(i.x - j.x) * h);
        a = i.x + 0.3 * m + 0.25 * j.x;
        b = i.y + 0.3 * n + 0.25 * j.y;
        var L = i.x + 0.84 * m + 0.42 * j.x
          , r = i.y + 0.84 * n + 0.42 * j.y;
        c = i.x + 0.84 * m + 0.37 * j.x;
        e = i.y + 0.84 * n + 0.37 * j.y;
        var B = i.x + 0.4 * m + 0.05 * j.x
          , x = i.y + 0.4 * n + 0.05 * j.y;
        g.lineWidth = 3 * f;
        g.ba().m(i.x, i.y).l(a, b).l(L, r).m(c, e).l(B, x).l(i.x, i.y);
        c = 6 * v(this.N) * f;
        e = 6 * w(this.N) * f;
        L = B + c;
        r = x + e;
        c = B - c;
        e = x - e;
        var A = i.x + 0.17 * m + 0.38 * j.x
          , M = i.y + 0.17 * n + 0.38 * j.y
          , z = i.x + 0.3 * m + 0.45 * j.x
          , u = i.y + 0.3 * n + 0.45 * j.y
          , E = i.x + 0.25 * m + 0.4 * j.x
          , Y = i.y + 0.25 * n + 0.4 * j.y;
        g.m(L, r).l(c, e).m(A, M).l(z, u).m(B, x).l(E, Y);
        var A = i.x + 0.97 * m
          , M = i.y + 0.97 * n
          , z = i.x + 0.8 * m + 0.48 * j.x
          , u = i.y + 0.8 * n + 0.48 * j.y
          , E = i.x + 0.86 * m + 0.5 * j.x
          , Y = i.y + 0.86 * n + 0.5 * j.y
          , Z = i.x + 0.82 * m + 0.65 * j.x
          , N = i.y + 0.82 * n + 0.65 * j.y
          , B = i.x + 0.78 * m + 0.67 * j.x
          , x = i.y + 0.78 * n + 0.67 * j.y;
        g.m(i.x + m, i.y + n).l(A, M).l(z, u).l(E, Y).l(Z, N).l(B, x).s();
        if (!this.na) {
            g.lineCap = "round";
            j = this.j.d.v(d);
            j = {
                x: j.x - i.x - 0.5 * m,
                y: j.y - i.y - 0.5 * n
            };
            i = a - 0.1 * m + 0.3 * j.x;
            d = b - 0.1 * n + 0.3 * j.y;
            u = L - i;
            E = r - d;
            Y = u * u + E * E;
            A = i + 0.5 * u + 200 * E * h * f * f / Y;
            M = d + 0.5 * E + 200 * -u * h * f * f / Y;
            u = c - i;
            E = e - d;
            Y = u * u + E * E;
            z = i + 0.5 * u + 200 * E * h * f * f / Y;
            u = d + 0.5 * E + 200 * -u * h * f * f / Y;
            g.lineWidth = 6 * f;
            g.strokeStyle = "rgba(0, 0, 0, 0.5)";
            g.ba().m(c, e).l(z, u).l(i, d).s();
            g.strokeStyle = "#000";
            g.ba().m(L, r).l(A, M).l(i, d).s();
            L = a + 0.05 * m + 0.88 * j.x;
            r = b + 0.05 * n + 0.88 * j.y;
            g.lineWidth = 8 * f;
            g.ba().m(i, d).l(L, r).s();
            c = a + 0.15 * m + 1.05 * j.x;
            e = b + 0.15 * n + 1.05 * j.y;
            g.lineWidth = 2 * f;
            g.ba().m(c + 5 * f, e).a(c, e, 5 * f, 0, s, l).f().s().ba();
            switch (this.Sa) {
            case "cap":
                c = a + 0.4 * m + 1.1 * j.x;
                e = b + 0.4 * n + 1.1 * j.y;
                a = a + 0.05 * m + 1.05 * j.x;
                b = b + 0.05 * n + 1.05 * j.y;
                g.m(a, b).l(c, e).s();
                break;
            case "hat":
                c = a + 0.35 * m + 1.15 * j.x;
                e = b + 0.35 * n + 1.15 * j.y;
                i = a - 0.05 * m + 1.1 * j.x;
                d = b - 0.05 * n + 1.1 * j.y;
                A = a + 0.25 * m + 1.13 * j.x;
                M = b + 0.25 * n + 1.13 * j.y;
                a = a + 0.05 * m + 1.11 * j.x;
                b = b + 0.05 * n + 1.11 * j.y;
                z = c - 0.1 * m + 0.2 * j.x;
                u = e - 0.1 * n + 0.2 * j.y;
                m = i + 0.02 * m + 0.2 * j.x;
                n = d + 0.02 * n + 0.2 * j.y;
                g.fillStyle = "#000";
                g.m(c, e).l(A, M).l(z, u).l(m, n).l(a, b).l(i, d).s().f();
                break;
            case "party":
                c = a + 0.28 * m + 1.15 * j.x;
                e = b + 0.28 * n + 1.15 * j.y;
                a = a + 0 * m + 1.1 * j.x;
                b = b + 0 * n + 1.1 * j.y;
                i = a + 0.07 * m + 0.33 * j.x;
                d = b + 0.07 * n + 0.33 * j.y;
                g.fillStyle = "#3960ad";
                g.m(c, e).l(i, d).l(a, b).f().strokeStyle = "#70d135";
                g.lineWidth = 4 * f;
                g.ba().m(c, e).l(a, b).s().fillStyle = "#ffd600";
                g.lineWidth = 2 * f;
                g.ba().m(i, d).a(i - 0.01 * m - 0.03 * j.x, d - 0.01 * n - 0.03 * j.y, 3 * f, 0, s).f().fillStyle = g.strokeStyle = "#000";
                break;
            case "ninja":
                c = a + 0.26 * m + 1.1 * j.x,
                e = b + 0.26 * n + 1.1 * j.y,
                a = a + 0.05 * m + 1.05 * j.x,
                b = b + 0.05 * n + 1.05 * j.y,
                g.lineWidth = 5 * f,
                g.m(c, e).l(a, b).s().lineWidth = 2 * f,
                g.l(a - (8 + t()) * f * h, b - (4 + t()) * f * h).m(a, b).l(a - (8 + t()) * f * h, b + (4 + t()) * f * h).s()
            }
            m = L - B;
            n = r - x;
            j = {
                x: n * h * f * f,
                y: -m * h * f * f
            };
            h = m * m + n * n;
            m = B + 0.4 * m + 130 * j.x / h;
            n = x + 0.4 * n + 130 * j.y / h;
            g.lineWidth = 5 * f;
            g.ba().m(L, r).l(m, n).l(B, x).s()
        }
    }
    ;
    Fa.Fb = function() {
        var a = {}
          , b = this.o.d.k(this.g.d)
          , c = new I(b.y * this.direction,-b.x * this.direction);
        a.j = this.g.d.c(b.b(0.35)).c(this.j.d.k(this.o.d.c(this.g.d).b(0.5)).b(1.2));
        a.ra = a.hb = this.g.d.c(b.b(0.8)).c(c.b(0.68));
        var e = a.j.k(a.ra)
          , e = new I(e.y * this.direction,-e.x * this.direction);
        a.Va = a.$a = a.j.c(a.ra).b(0.5).c(e.b(130 / e.Z()));
        a.X = this.g.d.c(b.b(0.2)).c(c.b(0.5));
        var d = new I(6 * v(this.N),6 * w(this.N));
        a.qa = this.g.d.c(b.b(0.4)).c(c.b(0.05)).c(d);
        e = a.X.k(a.qa);
        e = new I(-e.y * this.direction,e.x * this.direction);
        a.Xa = a.X.c(a.qa).b(0.5).c(e.b(160 / e.Z()));
        a.va = this.g.d.c(b.b(0.4)).c(c.b(0.05)).k(d);
        e = a.X.k(a.va);
        e = new I(-e.y * this.direction,e.x * this.direction);
        a.ab = a.X.c(a.va).b(0.5).c(e.b(160 / e.Z()));
        return a
    }
    ;
    Fa.toString = ca("BMX");
    function Ga(a, b, c) {
        c = c || ((function() {}
        )("fallback", c),
        Ha([Ea[0]])[0]);
        Ba.call(this, b, c, a);
        this.i = {
            "0": new K(new I(c[0],c[1]),this),
            1: new P(new I(c[6],c[7]),this),
            2: new P(new I(c[13],c[14]),this),
            P: 3
        };
        this.i[0].q = new I(c[2],c[3]);
        this.i[0].n = new I(c[4],c[5]);
        this.i[1].q = new I(c[8],c[9]);
        this.i[1].n = new I(c[10],c[11]);
        this.i[1].z = c[12];
        this.i[2].q = new I(c[15],c[16]);
        this.i[2].n = new I(c[17],c[18]);
        this.i[2].z = c[19];
        this.j = this.i[0];
        this.j.size = 14;
        this.j.za = ba();
        this.g = this.i[1];
        this.g.size = 11.7;
        this.o = this.i[2];
        this.o.size = 11.7;
        this.G = {
            "0": this.A = new R(this.i[0],this.i[1],this),
            1: this.F = new R(this.i[1],this.i[2],this),
            2: this.B = new R(this.i[2],this.i[0],this),
            P: 3
        };
        this.A.R = 45;
        this.A.p = c[20];
        this.A.U = 0.35;
        this.A.V = 0.3;
        this.F.R = 42;
        this.F.p = c[21];
        this.F.U = 0.35;
        this.F.V = 0.3;
        this.B.R = 45;
        this.B.p = c[22];
        this.B.U = 0.35;
        this.B.V = 0.3;
        this.direction = c[23];
        this.Q = new I(c[24],c[25]);
        this.fa = c[26];
        this.ka = c[27];
        this.ma = c[28];
        this.ca = c[29];
        this.L = c[30];
        this.time = this.fb[5];
        this.color = c[32]
    }
    var Ia = Ga.prototype;
    H(Ia, Ba.prototype);
    Ia.Ma = function() {
        this.g.z += (this.ca - this.i[1].z) / 10;
        this.ca && (this.N += this.g.ua / 5);
        this.g.L = this.o.L = this.L;
        var a = this.ka - this.ma;
        this.A.Y(5 * a * this.direction);
        this.B.Y(5 * -a * this.direction);
        this.F.rotate(a / 6);
        !a && this.ca && (this.A.Y(-7),
        this.B.Y(7))
    }
    ;
    Ia.J = function() {
        var a = this.h
          , b = this.color
          , c = this.g.d.v(a)
          , e = this.o.d.v(a)
          , d = a.e
          , g = a.Rb;
        Q.ba().strokeStyle = b;
        Q.globalAlpha = g;
        Q.lineWidth = 3.5 * d;
        Q.a(c.x, c.y, 10 * d, 0, s, l).m(e.x + 10 * d, e.y).a(e.x, e.y, 10 * d, 0, s, l).s().ba().lineWidth = 3 * d;
        var f = e.k(c)
          , h = new I((e.y - c.y) * this.direction,(c.x - e.x) * this.direction)
          , i = c.c(f.b(0.3)).c(h.b(0.25))
          , j = c.c(f.b(0.84)).c(h.b(0.42))
          , m = c.c(f.b(0.84)).c(h.b(0.37))
          , n = c.c(f.b(0.4)).c(h.b(0.05))
          , e = new I(6 * d * v(this.N),6 * d * w(this.N))
          , L = n.c(e)
          , r = n.k(e)
          , B = c.c(f.b(0.17)).c(h.b(0.38))
          , x = c.c(f.b(0.3)).c(h.b(0.45))
          , A = c.c(f.b(0.25)).c(h.b(0.4))
          , M = c.c(f.b(1)).c(h.b(0))
          , z = c.c(f.b(0.97)).c(h.b(0))
          , u = c.c(f.b(0.8)).c(h.b(0.48))
          , E = c.c(f.b(0.86)).c(h.b(0.5))
          , Y = c.c(f.b(0.82)).c(h.b(0.65))
          , e = c.c(f.b(0.78)).c(h.b(0.67))
          , h = this.j.d.v(a).k(c.c(f.b(0.5)))
          , Z = i.k(f.b(0.1)).c(h.b(0.3))
          , N = L.k(Z)
          , aa = new I(N.y * this.direction,-N.x * this.direction)
          , aa = aa.b(d * d)
          , Fb = Z.c(N.b(0.5)).c(aa.b(200 / N.Z()))
          , N = r.k(Z)
          , aa = new I(N.y * this.direction,-N.x * this.direction)
          , aa = aa.b(d * d)
          , aa = Z.c(N.b(0.5)).c(aa.b(200 / N.Z()))
          , N = i.c(f.b(0.05)).c(h.b(0.9));
        Q.m(c.x, c.y).l(i.x, i.y).l(j.x, j.y).m(m.x, m.y).l(n.x, n.y).l(c.x, c.y).m(L.x, L.y).l(r.x, r.y).m(B.x, B.y).l(x.x, x.y).m(n.x, n.y).l(A.x, A.y).m(M.x, M.y).l(z.x, z.y).l(u.x, u.y).l(E.x, E.y).l(Y.x, Y.y).l(e.x, e.y).s().ba().lineWidth = 6 * d;
        Q.globalAlpha = 0.6 * g;
        Q.m(r.x, r.y).l(aa.x, aa.y).l(Z.x, Z.y).s().ba().globalAlpha = g;
        Q.lineWidth = 6 * d;
        Q.m(L.x, L.y).l(Fb.x, Fb.y).l(Z.x, Z.y).s().ba().lineWidth = 8 * d;
        Q.m(Z.x, Z.y).l(N.x, N.y).s().ba().lineWidth = 2 * d;
        switch (this.Sa) {
        case "cap":
            b = i.c(f.b(0.4)).c(h.b(1.1));
            f = i.c(f.b(0.05)).c(h.b(1.05));
            Q.m(b.x, b.y);
            Q.l(f.x, f.y);
            Q.s();
            break;
        case "hat":
            c = i.c(f.b(0.35)).c(h.b(1.15));
            g = i.k(f.b(0.05)).c(h.b(1.1));
            j = i.c(f.b(0.25)).c(h.b(1.13));
            i = i.c(f.b(0.05)).c(h.b(1.11));
            m = c.k(f.b(0.1)).I(h.b(0.2));
            n = g.x + 0.02 * f.x + 0.2 * h.x;
            f = g.y + 0.02 * f.y + 0.2 * h.y;
            Q.m(c.x, c.y).l(j.x, j.y).l(m.x, m.y).l(n, f).l(i.x, i.y).l(g.x, g.y).fillStyle = b;
            Q.s().f();
            break;
        case "party":
            c = i.x + 0.28 * f.x + 1.15 * h.x,
            g = i.y + 0.28 * f.y + 1.15 * h.y,
            j = i.x + 0 * f.x + 1.1 * h.x,
            i = i.y + 0 * f.y + 1.1 * h.y,
            m = j + 0.07 * f.x + 0.33 * h.x,
            n = i + 0.07 * f.y + 0.33 * h.y,
            Q.fillStyle = "#3960ad",
            Q.m(c, g).l(m, n).l(j, i).f().strokeStyle = "#70d135",
            Q.lineWidth = 4 * d,
            Q.ba().m(c, g).l(j, i).s().fillStyle = "#ffd600",
            Q.lineWidth = 2 * d,
            Q.ba().m(m, n).a(m - 0.01 * f.x - 0.03 * h.x, n - 0.01 * f.y - 0.03 * h.y, 3 * d, 0, s).f().fillStyle = Q.strokeStyle = b
        }
        f = N.k(e);
        h = {
            x: f.y * this.direction,
            y: -f.x * this.direction
        };
        h = {
            x: h.x * d * d,
            y: h.y * d * d
        };
        b = 130 / (f.x * f.x + f.y * f.y);
        d = e.x + 0.4 * f.x + h.x * b;
        f = e.y + 0.4 * f.y + h.y * b;
        Q.ba();
        Q.lineWidth = 5 * a.e;
        Q.m(N.x, N.y);
        Q.l(d, f);
        Q.l(e.x, e.y);
        Q.s();
        Q.strokeStyle = "#000";
        Q.globalAlpha = 1
    }
    ;
    Ia.toString = ca("BMX");
    function Ja(a, b) {
        ua.call(this, a);
        var b = b || Ka[Ka.length - 1]
          , c = this;
        c.Cb = Ka;
        this.i = {
            "0": this.j = new K(new I(b[0],b[1]),this),
            1: this.g = new P(new I(b[6],b[7]),this),
            2: this.o = new P(new I(b[13],b[14]),this),
            P: 3
        };
        this.i[0].q = new I(b[2],b[3]);
        this.i[0].n = new I(b[4],b[5]);
        this.i[1].q = new I(b[8],b[9]);
        this.i[1].n = new I(b[10],b[11]);
        this.i[1].z = b[12];
        this.i[2].q = new I(b[15],b[16]);
        this.i[2].n = new I(b[17],b[18]);
        this.i[2].z = b[19];
        this.j.size = 14;
        this.j.za = function() {
            c.Eb()
        }
        ;
        this.g.size = 14;
        this.o.size = 14;
        this.G = {
            "0": this.A = new R(this.i[0],this.i[1],this),
            1: this.F = new R(this.i[1],this.i[2],this),
            2: this.B = new R(this.i[2],this.i[0],this),
            P: 3
        };
        this.A.R = 47;
        this.A.p = b[20];
        this.A.U = 0.2;
        this.A.V = 0.3;
        this.F.R = 45;
        this.F.p = b[21];
        this.F.U = 0.2;
        this.F.V = 0.3;
        this.B.R = 45;
        this.B.p = b[22];
        this.B.U = 0.2;
        this.B.V = 0.3;
        this.direction = b[23];
        this.Q = new I(b[24],b[25]);
        this.fa = b[26];
        a.pa = b[27];
        for (var e = 0; e < a.u.length; e++)
            a.u[e].sa = b[28][e];
        if (this.time = b[29]) {
            this.ka = b[30];
            this.ma = b[31];
            this.ca = b[32];
            this.L = b[33];
            for (e = 0; e < S.length; e++)
                for (var d in S[e])
                    d >= this.time && delete S[e][d]
        } else
            S = [{}, {}, {}, {}, {}]
    }
    var La = Ja.prototype;
    H(La, ua.prototype);
    La.Ma = function() {
        wa && this.Oa();
        this.g.z += (T - this.g.z) / 10;
        T && (this.N += this.g.ua / 5);
        this.g.L = this.o.L = za;
        var a = xa - ya;
        this.A.Y(5 * a * this.direction);
        this.B.Y(5 * -a * this.direction);
        this.F.rotate(a / 8);
        !a && T && (this.A.Y(-7),
        this.B.Y(7))
    }
    ;
    La.J = function() {
        var a = this.h
          , b = a.ia
          , c = this.g.d.v(a)
          , e = this.o.d.v(a)
          , d = this.j.d.v(a)
          , g = e.k(c)
          , f = new I((e.y - c.y) * this.direction,(c.x - e.x) * this.direction)
          , h = d.k(c.c(g.b(0.5)));
        b.strokeStyle = "#000";
        b.lineWidth = 3.5 * a.e;
        b.ba().a(c.x, c.y, 12.5 * a.e, 0, s, l).m(e.x + 12.5 * a.e, e.y).a(e.x, e.y, 12.5 * a.e, 0, s, l).s().ba().fillStyle = "grey";
        b.m(c.x + 5 * a.e, c.y).a(c.x, c.y, 5 * a.e, 0, s, l).m(e.x + 4 * a.e, e.y).a(e.x, e.y, 4 * a.e, 0, s, l).f().ba().lineWidth = 5 * a.e;
        b.m(c.x, c.y).l(c.x + 0.4 * g.x + 0.05 * f.x, c.y + 0.4 * g.y + 0.05 * f.y).m(c.x + 0.72 * g.x + 0.64 * h.x, c.y + 0.72 * g.y + 0.64 * h.y).l(c.x + 0.46 * g.x + 0.4 * h.x, c.y + 0.46 * g.y + 0.4 * h.y).l(c.x + 0.4 * g.x + 0.05 * f.x, c.y + 0.4 * g.y + 0.05 * f.y).s().ba().lineWidth = 2 * a.e;
        b.fillStyle = "#fff";
        var i = new I(6 * v(this.N) * a.e,6 * w(this.N) * a.e);
        b.m(c.x + 0.72 * g.x + 0.64 * h.x, c.y + 0.72 * g.y + 0.64 * h.y).l(c.x + 0.43 * g.x + 0.05 * f.x, c.y + 0.43 * g.y + 0.05 * f.y).m(c.x + 0.45 * g.x + 0.3 * h.x, c.y + 0.45 * g.y + 0.3 * h.y).l(c.x + 0.3 * g.x + 0.4 * h.x, c.y + 0.3 * g.y + 0.4 * h.y).l(c.x + 0.25 * g.x + 0.6 * h.x, c.y + 0.25 * g.y + 0.6 * h.y).m(c.x + 0.17 * g.x + 0.6 * h.x, c.y + 0.17 * g.y + 0.6 * h.y).l(c.x + 0.3 * g.x + 0.6 * h.x, c.y + 0.3 * g.y + 0.6 * h.y).m(c.x + 0.43 * g.x + 0.05 * f.x + i.x, c.y + 0.43 * g.y + 0.05 * f.y + i.y).l(c.x + 0.43 * g.x + 0.05 * f.x - i.x, c.y + 0.43 * g.y + 0.05 * f.y - i.y).s().ba().lineWidth = a.e;
        b.m(c.x + 0.46 * g.x + 0.4 * h.x, c.y + 0.46 * g.y + 0.4 * h.y).l(c.x + 0.28 * g.x + 0.5 * h.x, c.y + 0.28 * g.y + 0.5 * h.y).s().ba().lineWidth = 3 * a.e;
        b.m(e.x, e.y).l(c.x + 0.71 * g.x + 0.73 * h.x, c.y + 0.71 * g.y + 0.73 * h.y).l(c.x + 0.73 * g.x + 0.77 * h.x, c.y + 0.73 * g.y + 0.77 * h.y).l(c.x + 0.7 * g.x + 0.8 * h.x, c.y + 0.7 * g.y + 0.8 * h.y).s();
        if (!this.na) {
            b.lineCap = "round";
            var f = d.k(c.c(g.b(0.5)))
              , e = c.c(g.b(0.3)).c(f.b(0.25))
              , h = c.c(g.b(0.4)).c(f.b(0.05))
              , d = h.c(i)
              , j = h.k(i)
              , c = c.c(g.b(0.67)).c(f.b(0.8))
              , i = e.c(g.b(-0.05)).c(f.b(0.42))
              , m = d.k(i)
              , h = (new I(m.y * this.direction,-m.x * this.direction)).Za(a.e * a.e)
              , n = i.c(m.b(0.5)).c(h.b(200 / m.Z()))
              , m = j.k(i)
              , h = (new I(m.y * this.direction,-m.x * this.direction)).Za(a.e * a.e)
              , h = i.c(m.b(0.5)).c(h.b(200 / m.Z()));
            b.ba().lineWidth = 6 * a.e;
            b.strokeStyle = "rgba(0, 0, 0, 0.5)";
            b.m(j.x, j.y).l(h.x, h.y).l(i.x, i.y).s().ba().strokeStyle = "#000";
            b.m(d.x, d.y).l(n.x, n.y).l(i.x, i.y).s().lineWidth = 8 * a.e;
            h = e.c(g.b(0.1)).c(f.b(0.93));
            d = e.c(g.b(0.2)).c(f.b(1.09));
            b.ba().m(i.x, i.y).l(h.x, h.y).s().ba().lineWidth = 2 * a.e;
            b.m(d.x + 5 * a.e, d.y).a(d.x, d.y, 5 * a.e, 0, s, l).f().s().ba();
            switch (this.Sa) {
            case "cap":
                d = e.c(g.b(0.4)).c(f.b(1.15));
                g = e.c(g.b(0.1)).c(f.b(1.05));
                b.m(d.x, d.y).l(g.x, g.y).s();
                break;
            case "hat":
                d = e.c(g.b(0.37)).c(f.b(1.19)),
                i = e.k(g.b(0.02)).c(f.b(1.14)),
                j = e.c(g.b(0.28)).c(f.b(1.17)),
                e = e.c(g.b(0.09)).c(f.b(1.15)),
                n = d.k(g.b(0.1)).I(f.b(0.2)),
                g = i.c(g.b(0.02)).I(f.b(0.2)),
                b.fillStyle = "#000",
                b.m(d.x, d.y).l(j.x, j.y).l(n.x, n.y).l(g.x, g.y).l(e.x, e.y).l(i.x, i.y).s().f()
            }
            g = h.k(c);
            f = new I(g.y * this.direction,-g.x * this.direction);
            f = f.b(a.e * a.e);
            g = c.c(g.b(0.3)).c(f.b(80 / g.Z()));
            b.lineWidth = 5 * a.e;
            b.ba().m(h.x, h.y).l(g.x, g.y).l(c.x, c.y).s()
        }
    }
    ;
    La.Fb = function() {
        var a = {}
          , b = this.o.d.k(this.g.d)
          , c = new I(b.y * this.direction,-b.x * this.direction);
        a.j = this.g.d.c(b.b(0.35)).c(this.j.d.k(this.o.d.c(this.g.d).b(0.5)).b(1.2));
        a.ra = a.hb = this.g.d.c(b.b(0.8)).c(c.b(0.68));
        var e = a.j.k(a.ra)
          , e = new I(e.y * this.direction,-e.x * this.direction);
        a.Va = a.$a = a.j.c(a.ra).b(0.5).c(e.b(130 / e.Z()));
        a.X = this.g.d.c(b.b(0.2)).c(c.b(0.5));
        var d = new I(6 * v(this.N),6 * w(this.N));
        a.qa = this.g.d.c(b.b(0.4)).c(c.b(0.05)).c(d);
        e = a.X.k(a.qa);
        e = new I(-e.y * this.direction,e.x * this.direction);
        a.Xa = a.X.c(a.qa).b(0.5).c(e.b(160 / e.Z()));
        a.va = this.g.d.c(b.b(0.4)).c(c.b(0.05)).k(d);
        e = a.X.k(a.va);
        e = new I(-e.y * this.direction,e.x * this.direction);
        a.ab = a.X.c(a.va).b(0.5).c(e.b(160 / e.Z()));
        return a
    }
    ;
    La.toString = ca("MTB");
    function Ma(a, b, c) {
        c = c || ((function() {}
        )("fallback", c),
        Ha([Ka[0]])[0]);
        Ba.call(this, b, c, a);
        this.i = {
            "0": this.j = new K(new I(c[0],c[1]),this),
            1: this.g = new P(new I(c[6],c[7]),this),
            2: this.o = new P(new I(c[13],c[14]),this),
            P: 3
        };
        this.j.q = new I(c[2],c[3]);
        this.j.n = new I(c[4],c[5]);
        this.g.q = new I(c[8],c[9]);
        this.g.n = new I(c[10],c[11]);
        this.g.z = c[12];
        this.o.q = new I(c[15],c[16]);
        this.o.n = new I(c[17],c[18]);
        this.o.z = c[19];
        this.j.size = 14;
        this.j.za = ba();
        this.g.size = 14;
        this.o.size = 14;
        this.G = {
            "0": this.A = new R(this.j,this.g,this),
            1: this.F = new R(this.g,this.o,this),
            2: this.B = new R(this.o,this.j,this),
            P: 3
        };
        this.A.R = 47;
        this.A.p = c[20];
        this.A.U = 0.2;
        this.A.V = 0.3;
        this.F.R = 45;
        this.F.p = c[21];
        this.F.U = 0.2;
        this.F.V = 0.3;
        this.B.R = 45;
        this.B.p = c[22];
        this.B.U = 0.2;
        this.B.V = 0.3;
        this.direction = c[23];
        this.Q = new I(c[24],c[25]);
        this.fa = c[26];
        this.ka = c[27];
        this.ma = c[28];
        this.ca = c[29];
        this.L = c[30];
        this.time = b[5];
        this.color = c[32]
    }
    var Na = Ma.prototype;
    H(Na, Ba.prototype);
    Na.Ma = function() {
        this.g.z += (this.ca - this.i[1].z) / 10;
        this.ca && (this.N += this.g.ua / 5);
        this.g.L = this.o.L = this.L;
        var a = this.ka - this.ma;
        this.A.Y(5 * a * this.direction);
        this.B.Y(5 * -a * this.direction);
        this.F.rotate(a / 8);
        !a && this.ca && (this.A.Y(-7),
        this.B.Y(7))
    }
    ;
    Na.J = function() {
        var a = this.h
          , b = this.color
          , c = this.g.d.v(a)
          , e = a.Rb
          , d = this.o.d.v(a)
          , g = this.j.d.v(a)
          , f = d.k(c)
          , h = new I((d.y - c.y) * this.direction,(c.x - d.x) * this.direction)
          , i = g.k(c.c(f.b(0.5)));
        Q.strokeStyle = b;
        Q.globalAlpha = e;
        Q.lineWidth = 3.5 * a.e;
        Q.ba().a(c.x, c.y, 12.5 * a.e, 0, s, l).m(d.x + 12.5 * a.e, d.y).a(d.x, d.y, 12.5 * a.e, 0, s, l).s().ba().fillStyle = b;
        Q.globalAlpha = 0.6 * e;
        Q.m(c.x + 5 * a.e, c.y).a(c.x, c.y, 5 * a.e, 0, s, l).m(d.x + 4 * a.e, d.y).a(d.x, d.y, 4 * a.e, 0, s, l).f().ba().lineWidth = 5 * a.e;
        Q.m(c.x, c.y).l(c.x + 0.4 * f.x + 0.05 * h.x, c.y + 0.4 * f.y + 0.05 * h.y).m(c.x + 0.72 * f.x + 0.64 * i.x, c.y + 0.72 * f.y + 0.64 * i.y).l(c.x + 0.46 * f.x + 0.4 * i.x, c.y + 0.46 * f.y + 0.4 * i.y).l(c.x + 0.4 * f.x + 0.05 * h.x, c.y + 0.4 * f.y + 0.05 * h.y).s().ba().lineWidth = 2 * a.e;
        b = new I(6 * v(this.N) * a.e,6 * w(this.N) * a.e);
        Q.m(c.x + 0.72 * f.x + 0.64 * i.x, c.y + 0.72 * f.y + 0.64 * i.y).l(c.x + 0.43 * f.x + 0.05 * h.x, c.y + 0.43 * f.y + 0.05 * h.y).m(c.x + 0.45 * f.x + 0.3 * i.x, c.y + 0.45 * f.y + 0.3 * i.y).l(c.x + 0.3 * f.x + 0.4 * i.x, c.y + 0.3 * f.y + 0.4 * i.y).l(c.x + 0.25 * f.x + 0.6 * i.x, c.y + 0.25 * f.y + 0.6 * i.y).m(c.x + 0.17 * f.x + 0.6 * i.x, c.y + 0.17 * f.y + 0.6 * i.y).l(c.x + 0.3 * f.x + 0.6 * i.x, c.y + 0.3 * f.y + 0.6 * i.y).m(c.x + 0.43 * f.x + 0.05 * h.x + b.x, c.y + 0.43 * f.y + 0.05 * h.y + b.y).l(c.x + 0.43 * f.x + 0.05 * h.x - b.x, c.y + 0.43 * f.y + 0.05 * h.y - b.y).s().ba().lineWidth = a.e;
        Q.m(c.x + 0.46 * f.x + 0.4 * i.x, c.y + 0.46 * f.y + 0.4 * i.y).l(c.x + 0.28 * f.x + 0.5 * i.x, c.y + 0.28 * f.y + 0.5 * i.y).s().ba().lineWidth = 3 * a.e;
        Q.m(d.x, d.y).l(c.x + 0.71 * f.x + 0.73 * i.x, c.y + 0.71 * f.y + 0.73 * i.y).l(c.x + 0.73 * f.x + 0.77 * i.x, c.y + 0.73 * f.y + 0.77 * i.y).l(c.x + 0.7 * f.x + 0.8 * i.x, c.y + 0.7 * f.y + 0.8 * i.y).s().lineWidth = 6 * a.e;
        var h = g.k(c.c(f.b(0.5)))
          , d = c.c(f.b(0.3)).c(h.b(0.25))
          , i = c.c(f.b(0.4)).c(h.b(0.05))
          , g = i.c(b)
          , b = i.k(b)
          , c = c.c(f.b(0.67)).c(h.b(0.8))
          , j = d.c(f.b(-0.05)).c(h.b(0.42))
          , m = g.k(j)
          , i = new I(m.y * this.direction,-m.x * this.direction)
          , i = i.b(a.e * a.e)
          , n = j.c(m.b(0.5)).c(i.b(200 / m.Z()))
          , m = b.k(j)
          , i = new I(m.y * this.direction,-m.x * this.direction)
          , i = i.b(a.e * a.e)
          , i = j.c(m.b(0.5)).c(i.b(200 / m.Z()));
        Q.globalAlpha = 0.6 * e;
        Q.ba().m(b.x, b.y).l(i.x, i.y).l(j.x, j.y).s().ba();
        Q.globalAlpha = e;
        Q.m(g.x, g.y).l(n.x, n.y).l(j.x, j.y).s().ba().lineWidth = 8 * a.e;
        i = d.c(f.b(0.1)).c(h.b(0.95));
        Q.m(j.x, j.y).l(i.x, i.y).s().ba().lineWidth = 2 * a.e;
        switch (this.Sa) {
        case "cap":
            e = d.c(f.b(0.4)).c(h.b(1.15));
            f = d.c(f.b(0.1)).c(h.b(1.05));
            Q.m(e.x, e.y).l(f.x, f.y).s();
            break;
        case "hat":
            g = d.c(f.b(0.37)).c(h.b(1.19)),
            b = d.k(f.b(0.02)).c(h.b(1.14)),
            j = d.c(f.b(0.28)).c(h.b(1.17)),
            d = d.c(f.b(0.09)).c(h.b(1.15)),
            n = g.k(f.b(0.1)).I(h.b(0.2)),
            f = b.c(f.b(0.02)).I(h.b(0.2)),
            Q.m(g.x, g.y).l(j.x, j.y).l(n.x, n.y).l(f.x, f.y).l(d.x, d.y).l(b.x, b.y),
            Q.globalAlpha = e,
            Q.s().f()
        }
        f = i.k(c);
        h = new I(f.y * this.direction,-f.x * this.direction);
        h = h.b(a.e * a.e);
        e = c.c(f.b(0.3)).c(h.b(80 / f.Z()));
        Q.ba().lineWidth = 5 * a.e;
        Q.m(i.x, i.y).l(e.x, e.y).l(c.x, c.y).s().strokeStyle = "#000";
        Q.globalAlpha = 1
    }
    ;
    Na.toString = ca("MTB");
    function Oa() {}
    var Oa = function(a) {
        ua.call(this, a);
        var b = Pa[Pa.length - 1]
          , c = this;
        c.Cb = Pa;
        this.Sa = "hat";
        this.h = a;
        this.i = [this.j = new K(new I(b[0],b[1]),this), this.g = new P(new I(b[6],b[7]),this), this.o = new P(new I(b[13],b[14]),this)];
        this.i[0].q = new I(b[2],b[3]);
        this.i[0].n = new I(b[4],b[5]);
        this.i[1].q = new I(b[8],b[9]);
        this.i[1].n = new I(b[10],b[11]);
        this.i[1].z = b[12];
        this.i[2].q = new I(b[15],b[16]);
        this.i[2].n = new I(b[17],b[18]);
        this.i[2].z = b[19];
        this.j.size = 14;
        this.j.za = function() {
            c.Eb()
        }
        ;
        this.g.size = 13;
        this.o.size = 13;
        this.G = [this.A = new R(this.i[0],this.i[1],this), this.F = new R(this.i[1],this.i[2],this), this.B = new R(this.i[2],this.i[0],this)];
        this.A.R = 35;
        this.A.p = b[20];
        this.A.U = 0.5;
        this.A.V = 0.7;
        this.F.R = 45;
        this.F.p = b[21];
        this.F.U = 0.2;
        this.F.V = 0.3;
        this.B.R = 45;
        this.B.p = b[22];
        this.B.U = 0.2;
        this.B.V = 0.3;
        this.na = this.Ea = q;
        this.N = 0;
        this.direction = b[23];
        this.Q = new I(b[24],b[25]);
        this.fa = b[26];
        O.pa = b[27];
        for (a = 0; a < O.u.length; a++)
            O.u[a].sa = b[28][a];
        this.L = this.ca = this.ma = this.ka = 0;
        if (this.time = b[29]) {
            this.ka = b[30];
            this.ma = b[31];
            this.ca = b[32];
            this.L = b[33];
            for (b = 0; b < S.length; b++)
                for (var e in S[b])
                    e >= this.time && delete S[b][e]
        } else
            S = [{}, {}, {}, {}, {}]
    }
      , Qa = Oa.prototype;
    H(Qa, ua.prototype);
    Qa.Ma = function() {
        wa && this.Oa();
        this.g.z += (T - this.g.z) / 10;
        T && (this.N += this.g.ua / 5);
        this.g.L = this.o.L = za;
        var a = xa - ya;
        this.A.Y(5 * a * this.direction);
        this.B.Y(5 * -a * this.direction);
        this.F.rotate(a / 10);
        !a && T && (this.A.Y(-7),
        this.B.Y(7))
    }
    ;
    Qa.J = function() {
        var a = this.h
          , b = this.g.d.v(a)
          , c = this.o.d.v(a)
          , e = this.j.d.v(a)
          , d = c.k(b)
          , g = new I((c.y - b.y) * this.direction,(b.x - c.x) * this.direction)
          , f = e.k(b.c(d.b(0.5)));
        Q.ba();
        Q.strokeStyle = "#000";
        Q.lineWidth = 3.5 * a.e;
        Q.a(b.x, b.y, 12.5 * a.e, 0, s, l).m(c.x + 12.5 * a.e, c.y).a(c.x, c.y, 12.5 * a.e, 0, s, l).s().ba().fillStyle = "grey";
        Q.m(b.x + 5 * a.e, b.y).a(b.x, b.y, 5 * a.e, 0, s, l).m(c.x + 4 * a.e, c.y).a(c.x, c.y, 4 * a.e, 0, s, l).f().ba().lineWidth = 5 * a.e;
        Q.m(b.x, b.y).l(b.x + 0.4 * d.x + 0.05 * g.x, b.y + 0.4 * d.y + 0.05 * g.y).m(b.x + 0.57 * d.x + 0.64 * f.x, b.y + 0.57 * d.y + 0.64 * f.y).l(b.x + 0.46 * d.x + 0.4 * f.x, b.y + 0.46 * d.y + 0.4 * f.y).l(b.x + 0.4 * d.x + 0.05 * g.x, b.y + 0.4 * d.y + 0.05 * g.y).s().ba().lineWidth = 2 * a.e;
        Q.m(b.x + 0.57 * d.x + 0.64 * f.x, b.y + 0.57 * d.y + 0.64 * f.y).l(b.x + 0.43 * d.x + 0.05 * g.x, b.y + 0.43 * d.y + 0.05 * g.y).m(b.x + 0.45 * d.x + 0.3 * f.x, b.y + 0.45 * d.y + 0.3 * f.y).l(b.x + 0.3 * d.x + 0.4 * f.x, b.y + 0.3 * d.y + 0.4 * f.y).l(b.x + 0.25 * d.x + 0.6 * f.x, b.y + 0.25 * d.y + 0.6 * f.y).m(b.x + 0.17 * d.x + 0.6 * f.x, b.y + 0.17 * d.y + 0.6 * f.y).l(b.x + 0.3 * d.x + 0.6 * f.x, b.y + 0.3 * d.y + 0.6 * f.y).m(b.x + 0.57 * d.x + 0.64 * f.x, b.y + 0.57 * d.y + 0.64 * f.y).l(b.x + 0.8 * d.x + 0.2 * f.x, b.y + 0.8 * d.y + 0.2 * f.y).l(b.x + 0.3 * d.x + 0.05 * g.x, b.y + 0.3 * d.y + 0.05 * g.y).l(b.x + 0.5 * d.x + 0.05 * g.x, b.y + 0.5 * d.y + 0.05 * g.y).s().ba().lineWidth = a.e;
        Q.m(b.x + 0.46 * d.x + 0.4 * f.x, b.y + 0.46 * d.y + 0.4 * f.y);
        Q.l(b.x + 0.28 * d.x + 0.5 * f.x, b.y + 0.28 * d.y + 0.5 * f.y);
        Q.s();
        Q.ba();
        Q.lineWidth = 3 * a.e;
        Q.m(c.x, c.y);
        Q.l(b.x + 0.56 * d.x + 0.73 * f.x, b.y + 0.56 * d.y + 0.73 * f.y);
        Q.l(b.x + 0.58 * d.x + 0.77 * f.x, b.y + 0.58 * d.y + 0.77 * f.y);
        Q.l(b.x + 0.55 * d.x + 0.8 * f.x, b.y + 0.55 * d.y + 0.8 * f.y);
        Q.s();
        if (!this.na) {
            var g = e.k(b.c(d.b(0.5)))
              , c = b.c(d.b(0.3)).c(g.b(0.25))
              , f = b.c(d.b(0.4)).c(g.b(0.05))
              , e = f.c(Ap)
              , h = f.k(Ap)
              , b = b.c(d.b(0.67)).c(g.b(0.8))
              , i = c.c(d.b(-0.05)).c(g.b(0.42))
              , j = e.k(i)
              , f = new I(j.y * this.direction,-j.x * this.direction)
              , f = f.b(a.e * a.e)
              , m = i.c(j.b(0.5)).c(f.b(200 / j.Z()))
              , j = h.k(i)
              , f = new I(j.y * this.direction,-j.x * this.direction)
              , f = f.b(a.e * a.e)
              , f = i.c(j.b(0.5)).c(f.b(200 / j.Z()));
            Q.ba();
            Q.lineWidth = 6 * a.e;
            Q.strokeStyle = "rgba(0, 0, 0, 0.5)";
            Q.m(h.x, h.y);
            Q.l(f.x, f.y);
            Q.l(i.x, i.y);
            Q.s();
            Q.ba();
            Q.strokeStyle = "#000";
            Q.m(e.x, e.y);
            Q.l(m.x, m.y);
            Q.l(i.x, i.y);
            Q.s();
            f = c.c(d.b(0.1)).c(g.b(0.95));
            Q.ba();
            Q.lineWidth = 8 * a.e;
            Q.m(i.x, i.y);
            Q.l(f.x, f.y);
            Q.s();
            e = c.c(d.b(0.2)).c(g.b(1.09));
            Q.ba();
            Q.lineWidth = 2 * a.e;
            Q.m(e.x + 5 * a.e, e.y);
            Q.a(e.x, e.y, 5 * a.e, 0, s, l);
            Q.s();
            Q.ba();
            switch (this.Sa) {
            case "cap":
                e = c.c(d.b(0.4)).c(g.b(1.15));
                d = c.c(d.b(0.1)).c(g.b(1.05));
                Q.m(e.x, e.y);
                Q.l(d.x, d.y);
                Q.s();
                break;
            case "hat":
                e = c.c(d.b(0.37)).c(g.b(1.19)),
                h = c.k(d.b(0.02)).c(g.b(1.14)),
                i = c.c(d.b(0.28)).c(g.b(1.17)),
                c = c.c(d.b(0.09)).c(g.b(1.15)),
                m = e.k(d.b(0.1)).I(g.b(0.2)),
                d = h.c(d.b(0.02)).I(g.b(0.2)),
                Q.m(e.x, e.y),
                Q.l(i.x, i.y),
                Q.l(m.x, m.y),
                Q.l(d.x, d.y),
                Q.l(c.x, c.y),
                Q.l(h.x, h.y),
                Q.fillStyle = "#000",
                Q.s(),
                Q.f()
            }
            d = f.k(b);
            g = new I(d.y * this.direction,-d.x * this.direction);
            g = g.b(a.e * a.e);
            d = b.c(d.b(0.3)).c(g.b(80 / d.Z()));
            Q.ba();
            Q.lineWidth = 5 * a.e;
            Q.m(f.x, f.y);
            Q.l(d.x, d.y);
            Q.l(b.x, b.y);
            Q.s()
        }
    }
    ;
    Qa.Fb = function() {
        var a = {}
          , b = this.o.d.k(this.g.d)
          , c = new I(b.y * this.direction,-b.x * this.direction);
        a.j = this.g.d.c(b.b(0.35)).c(this.j.d.k(this.o.d.c(this.g.d).b(0.5)).b(1.2));
        a.ra = a.hb = this.g.d.c(b.b(0.8)).c(c.b(0.68));
        var e = a.j.k(a.ra)
          , e = new I(e.y * this.direction,-e.x * this.direction);
        a.Va = a.$a = a.j.c(a.ra).b(0.5).c(e.b(130 / e.Z()));
        a.X = this.g.d.c(b.b(0.2)).c(c.b(0.5));
        var d = new I(6 * v(this.N),6 * w(this.N));
        a.qa = this.g.d.c(b.b(0.4)).c(c.b(0.05)).c(d);
        e = a.X.k(a.qa);
        e = new I(-e.y * this.direction,e.x * this.direction);
        a.Xa = a.X.c(a.qa).b(0.5).c(e.b(160 / e.Z()));
        a.va = this.g.d.c(b.b(0.4)).c(c.b(0.05)).k(d);
        e = a.X.k(a.va);
        e = new I(-e.y * this.direction,e.x * this.direction);
        a.ab = a.X.c(a.va).b(0.5).c(e.b(160 / e.Z()));
        return a
    }
    ;
    Qa.toString = ca("HAR");
    function Ra(a, b) {
        this.na = l;
        var c = new I(0,0)
          , e = 0
          , d = 0;
        this.direction = 1;
        this.h = b;
        this.qb = b.h;
        this.i = {
            "0": this.j = new K(c,this),
            1: this.X = new K(c,this),
            2: this.Va = new K(c,this),
            3: this.$a = new K(c,this),
            4: this.ra = new K(c,this),
            5: this.hb = new K(c,this),
            6: this.Xa = new K(c,this),
            7: this.ab = new K(c,this),
            8: this.qa = new K(c,this),
            9: this.va = new K(c,this),
            P: 10
        };
        this.G = {
            "0": new R(this.j,this.X,this),
            1: new R(this.j,this.Va,this),
            2: new R(this.Va,this.ra,this),
            3: new R(this.j,this.$a,this),
            4: new R(this.$a,this.hb,this),
            5: new R(this.X,this.Xa,this),
            6: new R(this.Xa,this.qa,this),
            7: new R(this.X,this.ab,this),
            8: new R(this.ab,this.va,this),
            P: 9
        };
        e = 0;
        for (d = this.i.P; e < d; e++)
            this.i[e].size = 3,
            this.i[e].Da = 0.05;
        this.j.size = this.X.size = 8;
        e = 0;
        for (d = this.G.P; e < d; e++)
            this.G[e].U = 0.4,
            this.G[e].V = 0.7;
        for (e in a)
            a.hasOwnProperty(e) && this[e].d.M(a[e])
    }
    var Sa = Ra.prototype;
    Sa.J = function() {
        var a = this.qb
          , b = this.j.d.v(a)
          , c = this.Va.d.v(a)
          , e = this.ra.d.v(a)
          , d = this.$a.d.v(a)
          , g = this.hb.d.v(a)
          , f = this.Xa.d.v(a)
          , h = this.qa.d.v(a)
          , i = this.ab.d.v(a)
          , j = this.va.d.v(a)
          , m = this.X.d.v(a);
        Q.lineWidth = 5 * a.e;
        Q.strokeStyle = "rgba(0,0,0,0.5)";
        Q.ba().m(b.x, b.y).l(d.x, d.y).l(g.x, g.y).m(m.x, m.y).l(i.x, i.y).l(j.x, j.y).s();
        Q.strokeStyle = "#000";
        Q.ba().m(b.x, b.y).l(c.x, c.y).l(e.x, e.y).m(m.x, m.y).l(f.x, f.y).l(h.x, h.y).s();
        Q.lineWidth = 8 * a.e;
        Q.ba().m(m.x, m.y).l(b.x, b.y).s();
        b.I(b.k(m).b(0.25));
        Q.lineWidth = 2 * a.e;
        Q.ba().m(b.x + 5 * a.e, b.y).a(b.x, b.y, 5 * a.e, 0, s, l).s()
    }
    ;
    Sa.K = function() {
        for (var a = this.G.P - 1; 0 <= a; a--)
            this.G[a].K();
        for (a = this.i.P - 1; 0 <= a; a--)
            this.i[a].K()
    }
    ;
    Sa.zc = function(a, b) {
        a.Za(0.7);
        b.Za(0.7);
        var c, e, d, g;
        c = 0;
        for (e = this.G.P; c < e; c++)
            d = this.G[c].Ha(),
            20 < d && (d = 20),
            this.G[c].R = this.G[c].p = d;
        for (c = 1; 5 > c; c++)
            this.G[c].R = 13,
            this.G[c].p = 13;
        d = [this.j, this.Va, this.$a, this.ra, this.hb];
        g = [this.X, this.Xa, this.ab, this.qa, this.va];
        c = 0;
        for (e = d.length; c < e; c++)
            d[c].q = d[c].d.k(a);
        c = 0;
        for (e = g.length; c < e; c++)
            g[c].q = g[c].d.k(b);
        for (c = this.i.P - 1; 0 <= c; c--)
            this.i[c].n.M(this.i[c].d.k(this.i[c].q)),
            this.i[c].n.x += t() - t(),
            this.i[c].n.y += t() - t()
    }
    ;
    function Aa(a, b, c) {
        this.na = l;
        this.h = c;
        this.gb = new Ra(b,this);
        this.gb.zc(a.j.n, a.g.n);
        this.gb.direction = a.direction;
        this.Q = this.gb.Q = a.Q;
        this.time = a.time;
        this.j = this.gb.j;
        this.ha = a;
        this.Gc = a.clone()
    }
    var Ta = Aa.prototype;
    Ta.J = function() {
        this.ha.J();
        this.gb.J();
        this.Wa && this.Wa.J()
    }
    ;
    Ta.K = function() {
        this.ha.K();
        this.gb.K();
        this.Wa && this.Wa.K()
    }
    ;
    function Ua(a, b, c, e) {
        this.na = l;
        this.h = e;
        this.z = 30 + 20 * t();
        this.Nc = 0;
        this.yb = [new ra(a,this), new ra(a,this), new ra(a,this), new ra(a,this), new ra(a,this)];
        this.d = a.clone();
        this.Q = b;
        this.time = c;
        this.j = new K(a,this);
        this.j.n.x = 20
    }
    var Va = Ua.prototype;
    Va.J = function() {
        var a, b;
        a = this.h.ia;
        if (0 < this.z) {
            this.z -= 10;
            b = this.d.v(this.h);
            var c = t() * s
              , e = this.z / 2
              , d = b.x + e * v(c)
              , e = b.y + e * w(c);
            a.fillStyle = "#ff0";
            a.ba().m(d, e);
            for (a = 1; 16 > a; a++)
                e = (this.z + 30 * t()) / 2 * this.h.e,
                d = b.x + e * v(c + s * a / 16),
                e = b.y + e * w(c + s * a / 16),
                Q.l(d, e);
            Q.f()
        }
        a = 0;
        for (b = this.yb.length; a < b; a++)
            this.yb[a].J()
    }
    ;
    Va.K = function() {
        for (var a = this.yb.length - 1; 0 <= a; a--)
            this.yb[a].K()
    }
    ;
    function Wa(a, b, c) {
        this.d = new I(a,b);
        this.h = c;
        this.Lb = ka++
    }
    var Xa = Wa.prototype;
    Xa.J = function() {
        var a = this.h
          , b = this.d.v(a);
        Q.fillStyle = this.Ka;
        Q.lineWidth = Math.max(0.5, 2 * a.e);
        Q.ba().m(b.x + 7 * a.e, b.y).a(b.x, b.y, 7 * a.e, 0, s, l).f().s()
    }
    ;
    Xa.T = function(a) {
        500 > a.d.wb(this.d) && !a.h.Ub && this.Ya(a)
    }
    ;
    Xa.nb = function(a) {
        return a.vb(this.d) < Ya + 7 ? (this.remove(),
        this) : q
    }
    ;
    Xa.remove = function() {
        this.xa = l;
        this.h.remove(this.d);
        this.Wb();
        return this
    }
    ;
    Xa.toString = function() {
        return this.Pa + " " + this.d.toString()
    }
    ;
    Xa.Ya = Xa.Wb = ba();
    function Za(a, b, c) {
        Wa.call(this, a, b, c);
        this.sa = q
    }
    var $a = Za.prototype;
    H($a, Wa.prototype);
    $a.J = function() {
        var a = this.h
          , b = this.d.v(a);
        Q.fillStyle = this.sa ? this.Mb : this.Ka;
        Q.lineWidth = Math.max(0.5, 2 * a.e);
        Q.ba().m(b.x + 7 * a.e, b.y).a(b.x, b.y, 7 * a.e, 0, s, l).f().s()
    }
    ;
    $a.T = function(a) {
        500 > a.d.wb(this.d) && this.Ya(a)
    }
    ;
    $a.Ya = function(a) {
        a.h.Ub ? this.Xb(a) : this.sa || (this.sa = l,
        this.Hb(a))
    }
    ;
    $a.Hb = $a.Xb = ba();
    function ab(a, b, c, e) {
        Wa.call(this, a, b, e);
        a = c * Math.PI / 180;
        this.ea = c;
        this.direction = new I(-w(a),v(a))
    }
    var bb = ab.prototype;
    H(bb, Wa.prototype);
    bb.J = function() {
        var a = this.h
          , b = this.d.v(a);
        Q.fillStyle = this.Ka;
        Q.lineWidth = Math.max(0.5, 2 * a.e);
        Q.ba().save();
        Q.ta(b.x, b.y).rotate(this.ea * Math.PI / 180);
        Q.m(-7 * a.e, -10 * a.e).l(0, 10 * a.e).l(7 * a.e, -10 * a.e).l(-7 * a.e, -10 * a.e).f().s().re()
    }
    ;
    bb.T = function(a) {
        1E3 > a.d.wb(this.d) && this.Ya(a)
    }
    ;
    bb.toString = function() {
        return this.Pa + " " + this.d.toString() + " " + (this.ea - 180).toString(32)
    }
    ;
    function cb(a, b, c) {
        Za.call(this, a, b, c);
        this.Ka = "#ff0";
        this.Mb = "#ffa";
        this.Pa = "T"
    }
    var db = cb.prototype;
    H(db, Za.prototype);
    db.Hb = function(a) {
        var b = this.h;
        b.pa++;
        b.Ba && b.pa === b.Ba && (a.h.Ea |= 2)
    }
    ;
    db.Xb = function(a) {
        a.h.sa[this.Lb] || (a.h.sa[this.Lb] = ++a.h.pa)
    }
    ;
    db.Wb = function() {
        this.h.Ba--
    }
    ;
    function eb(a, b, c) {
        Za.call(this, a, b, c);
        this.Ka = "#00f";
        this.Mb = "#aaf";
        this.Pa = "C"
    }
    var fb = eb.prototype;
    H(fb, Za.prototype);
    fb.Hb = function(a) {
        a.h.Ea |= 1;
        (function() {}
        )("cp", a.h.time, JSON.stringify(a.h))
    }
    ;
    function gb(a, b, c, e) {
        ab.call(this, a, b, c, e);
        this.Ka = "#ff0";
        this.Pa = "B"
    }
    var hb = gb.prototype;
    H(hb, ab.prototype);
    hb.Ya = function(a) {
        for (var a = a.h.i, b = 0, c = a.P; b < c; b++)
            a[b].d.I(this.direction)
    }
    ;
    function ib(a, b, c, e) {
        ab.call(this, a, b, c, e);
        this.direction.Za(0.3);
        this.Ka = "#0f0";
        this.Pa = "G"
    }
    var jb = ib.prototype;
    H(jb, ab.prototype);
    jb.Ya = function(a) {
        a.h.Q.M(this.direction)
    }
    ;
    function kb(a, b, c) {
        Wa.call(this, a, b, c);
        this.Ka = "#eee";
        this.Pa = "S";
        this.ec = "s"
    }
    var lb = kb.prototype;
    H(lb, Wa.prototype);
    lb.T = function(a) {
        500 > a.d.wb(this.d) && (a.h.fa = l)
    }
    ;
    function mb(a, b, c) {
        Wa.call(this, a, b, c);
        this.Ka = "#f00";
        this.Pa = "O";
        this.ec = "e"
    }
    var nb = mb.prototype;
    H(nb, Wa.prototype);
    nb.Ya = function(a) {
        this.h.ha = new Ua(this.d,a.h.Q,a.h.time,this.h)
    }
    ;
    function ob(a, b, c, e, d) {
        this.r = a instanceof I ? a : new I(a,b);
        this.w = b instanceof I ? b : new I(c,e);
        this.Ja = this.w.k(this.r);
        this.p = this.Ja.Ha();
        this.xa = q;
        this.h = d
    }
    var pb = ob.prototype;
    pb.J = function(a, b, c) {
        a.beginPath();
        a.moveTo(this.r.x * this.h.e - b, this.r.y * this.h.e - c);
        a.lineTo(this.w.x * this.h.e - b, this.w.y * this.h.e - c);
        a.stroke()
    }
    ;
    pb.nb = function(a) {
        var b = a.k(this.r).Fa(this.Ja.Qb(this.p))
          , c = new I(0,0);
        0 >= b ? c.M(this.r) : b >= this.p ? c.M(this.w) : c.M(this.r.c(this.Ja.Qb(this.p).b(b)));
        return a.k(c).Ha() <= Ya ? (this.remove(),
        this) : q
    }
    ;
    pb.remove = function() {
        this.xa = l;
        this.h.remove(this.r, this.w);
        return this
    }
    ;
    pb.Ib = function() {
        this.h.Db(this);
        return this
    }
    ;
    pb.toString = function() {
        return this.r + this.Ga()
    }
    ;
    pb.toJSON = function(a) {
        return {
            kb: a,
            r: this.r.toJSON(),
            w: this.w.toJSON()
        }
    }
    ;
    function qb(a, b, c, e, d) {
        ob.call(this, a, b, c, e, d)
    }
    var rb = qb.prototype;
    H(rb, ob.prototype);
    rb.T = function(a) {
        if (this.dc)
            return this;
        this.dc = l;
        var b = a.d
          , c = a.n
          , e = a.size
          , d = new I(0,0)
          , g = 0
          , d = b.k(this.r)
          , f = d.Fa(this.Ja) / this.p / this.p;
        if (0 <= f && 1 >= f && (c = 0 > (d.x * this.Ja.y - d.y * this.Ja.x) * ((d.x - c.x) * this.Ja.y - (d.y - c.y) * this.Ja.x) ? -1 : 1,
        d = d.k(this.Ja.b(f)),
        g = d.Ha(),
        (g < e || 0 > c) && (0 !== g || 514 === this.h.id)))
            return b.I(d.b((e * c - g) / g)),
            a.za(new I(-d.y / g,d.x / g)),
            this;
        if (f * this.p < -e || f * this.p > this.p + e)
            return this;
        d = b.k(0 < f ? this.w : this.r);
        g = d.Ha();
        if (g < e && 0 !== g)
            return b.I(d.b((e - g) / g)),
            a.za(new I(-d.y / g,d.x / g)),
            this
    }
    ;
    rb.Ga = function() {
        this.Na = l;
        var a = " " + this.w.toString()
          , b = this.h.t[C(this.w.x / this.h.H)][C(this.w.y / this.h.H)].search(this.w, 2);
        b !== k && (a += b.Ga());
        return a
    }
    ;
    rb.toString = function() {
        return this.r + this.Ga()
    }
    ;
    rb.toJSON = function() {
        return ob.prototype.toJSON.call(this, "SolidLine")
    }
    ;
    function sb(a, b, c, e, d) {
        ob.call(this, a, b, c, e, d);
        this.Vb = l
    }
    var tb = sb.prototype;
    H(tb, ob.prototype);
    tb.Ga = function() {
        this.Na = l;
        var a = " " + this.w.toString()
          , b = this.h.t[C(this.w.x / this.h.H)][C(this.w.y / this.h.H)].search(this.w, 3);
        b !== k && (a += b.Ga());
        return a
    }
    ;
    tb.toString = function() {
        return this.r + this.Ga()
    }
    ;
    tb.toJSON = function() {
        return ob.prototype.toJSON.call(this, "SceneryLine")
    }
    ;
    function ub(a, b, c) {
        this.la = a;
        this.xb = b;
        this.xa = q;
        this.h = c
    }
    var vb = ub.prototype;
    vb.J = function(a, b, c, e) {
        var d = this.la
          , g = d.length
          , f = 1
          , h = d[0];
        a.beginPath();
        for (a.moveTo(h.x * this.h.e - b, h.y * this.h.e - c); f < g; f++)
            a.lineTo(d[f].x * this.h.e - b, d[f].y * this.h.e - c);
        a[this.xb ? "fillStyle" : "strokeStyle"] = e ? "#ccf" : "#fff";
        a[this.xb ? "fill" : "stroke"]()
    }
    ;
    vb.nb = ca(q);
    vb.remove = function() {
        this.xa = l;
        this.h.remove(this.r, this.w);
        return this
    }
    ;
    vb.Ib = function() {
        return this
    }
    ;
    vb.toString = function() {
        return this.la.join("/")
    }
    ;
    vb.toJSON = function() {
        return {
            kb: "ForegroundWhite",
            la: this.la,
            fill: this.xb
        }
    }
    ;
    function wb(a) {
        this.C = [];
        this.zb = [];
        this.D = [];
        this.u = [];
        a || (this.Aa = new wb(l))
    }
    var xb = wb.prototype;
    xb.T = function(a) {
        for (var b = this.D.length - 1; 0 <= b; b--)
            this.D[b].T(a);
        if (!a.h.na)
            for (b = this.u.length - 1; 0 <= b; b--)
                this.u[b].T(a);
        return this
    }
    ;
    xb.Bb = function() {
        for (var a = 0, b = this.D.length; a < b; a++)
            this.D[a].dc = q
    }
    ;
    xb.remove = function() {
        for (var a = [], b = 0, c = this.D.length; b < c; b++)
            this.D[b] && this.D[b].xa && a.push(this.D.splice(b--, 1)[0]);
        b = 0;
        for (c = this.C.length; b < c; b++)
            this.C[b] && this.C[b].xa && a.push(this.C.splice(b--, 1)[0]);
        b = 0;
        for (c = this.u.length; b < c; b++)
            this.u[b] && this.u[b].xa && a.push(this.u.splice(b--, 1)[0]);
        return this.Aa ? a.concat(this.Aa.remove()) : a
    }
    ;
    xb.search = function(a, b) {
        var c = 0, e, d;
        e = b & 4 ? this.Aa : this;
        var g = b & 1 ? e.C : e.D;
        for (e = g.length; c < e; c++)
            if ((d = g[c]) && d.r.x === a.x && d.r.y === a.y && !d.Na)
                return d
    }
    ;
    var yb = {};
    function zb(a, b, c) {
        var e = c + " " + a + " " + b;
        if (yb[e])
            return yb[e];
        var e = yb[e] = []
          , d = new I(a.x,a.y)
          , g = (b.y - a.y) / (b.x - a.x)
          , f = new I(a.x < b.x ? 1 : -1,a.y < b.y ? 1 : -1)
          , h = 0;
        for (e.push(a); 5E3 > h++ && !(C(d.x / c) === C(b.x / c) && C(d.y / c) === C(b.y / c)); ) {
            var i = new I(0 > f.x ? y(da((d.x + 1) / c + f.x) * c) - 1 : y(C(d.x / c + f.x) * c),0);
            i.y = y(a.y + (i.x - a.x) * g);
            var j = new I(0,0 > f.y ? y(da((d.y + 1) / c + f.y) * c) - 1 : y(C(d.y / c + f.y) * c));
            j.x = y(a.x + (j.y - a.y) / g);
            ea(i.x - a.x, 2) + ea(i.y - a.y, 2) < ea(j.x - a.x, 2) + ea(j.y - a.y, 2) ? (d = i,
            e.push(i)) : (d = j,
            e.push(j))
        }
        return e
    }
    function Ha(a) {
        return a.map(function(a) {
            a = a.concat();
            a[28] = a[29] = a[30] = 0;
            return a
        })
    }
    function Ab(a) {
        var b = C(a / 6E4)
          , c = C(a % 6E4 / 1E3)
          , a = C((a - 6E4 * b - 1E3 * c) / 100);
        10 > b && (b = "0" + b);
        10 > c && (c = "0" + c);
        return b + ":" + c + "." + a
    }
    function Bb() {
        this.Ca = {};
        this.jb = [];
        this.ib = 0
    }
    var Cb = Bb.prototype;
    H(Cb, na.prototype);
    Cb.push = function(a) {
        this.jb.length = Math.min(this.jb.length, this.ib + 1);
        this.ib = this.jb.push(a) - 1;
        return this
    }
    ;
    Cb.rb = function() {
        if (0 < this.ib) {
            var a = this.jb[this.ib--].rb;
            "function" === typeof a && (a(this),
            this.emit("undo"))
        }
        return this
    }
    ;
    Cb.pb = function() {
        if (this.ib < this.jb.length - 1) {
            var a = this.jb[++this.ib].pb;
            "function" === typeof a && (a(this),
            this.emit("redo"))
        }
        return this
    }
    ;
    function Db(a, b, c) {
        this.qb = a;
        this.lc = b;
        this.qc = c;
        this.currentTime = a.currentTime
    }
    function Eb(a, b, c) {
        var e = c[5]
          , d = c[6]
          , g = c[7] || "Ghost"
          , f = c[8];
        this.h = a;
        this.id = b;
        this.kc = c;
        this.time = e;
        this.type = d;
        this.name = g;
        this.color = f;
        this.Kb = Ha([("BMX" === d ? Ea : Ka)[0]])[0];
        this.Kb[32] = f;
        (function() {}
        )(this.Kb)
    }
    var Gb = Eb.prototype;
    Gb.cc = function(a) {
        this.Ia = new ("BMX" === this.type ? Ga : Ma)(this.h,this.kc,a || this.Kb)
    }
    ;
    Gb.reset = function() {
        this.cc()
    }
    ;
    Gb.K = function() {
        this.Ia.K()
    }
    ;
    Gb.J = function() {
        this.Ia.J()
    }
    ;
    Gb.save = ba();
    function Hb(a, b) {
        var c, e, d, g, f, b = b || U;
        this.Ca = {};
        this.t = {};
        this.H = 100;
        this.$ = [];
        this.ob = [];
        this.wa = b;
        c = b.getContext("2d");
        for (d in c)
            "function" === typeof c[d] && (c[d.charAt(0) + (d.charAt(6) || "")] = Ib(c[d], c));
        c = this.ia = c;
        this.eb = {};
        this.e = this.Rb = 0.6;
        this.currentTime = 0;
        this.id = a;
        this.nc = a == k;
        this.Ta = "BMX";
        this.Cc = 1;
        this.sb = new Bb;
        this.paused = q;
        this.W = new I(0,0);
        this.pa = this.Ba = 0;
        this.u = [];
        this.mc = 20;
        this.Hc = 15;
        this.S = 2;
        this.O = new I(0,0);
        this.aa = new I(0,0);
        this.canvas = U;
        this.context = this.ia;
        this.watchGhost = this.ic;
        c[ha]("Loading track... Please wait.", 36, 16);
        this.id ? 7 < this.id.length ? (c = this.id,
        this.id = k,
        this.oa(Jb, 2)) : (Ub.getElement().empty().hide().destroy(),
        c = new XMLHttpRequest,
        c.open("POST", "/tracks/load", q),
        c.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        c.send("id=" + this.id),
        c = c.responseText,
        "v1," !== c.substr(0, 3) && (this.Cc = 0)) : (c = "-18 1i 18 1i##",
        this.oa(Jb, 2));
        this.origCode = c;
        var h = c.split("#")
          , i = h[0] ? h[0].split(",") : [];
        c = 0;
        for (d = i.length; c < d; c++)
            if (f = i[c].split(/\s+/g),
            3 < f.length) {
                e = 0;
                for (g = f.length - 2; e < g; e += 2)
                    this.Qa({
                        x: D(f[e], 32),
                        y: D(f[e + 1], 32)
                    }, {
                        x: D(f[e + 2], 32),
                        y: D(f[e + 3], 32)
                    }, 2)
            }
        if (1 < h.length) {
            var j = h[1].split(",");
            c = 0;
            for (d = j.length; c < d; c++)
                if (f = j[c].split(/\s+/g),
                3 < f.length) {
                    i = 1 | (94 === f[0].charCodeAt(0) ? (f[0] = f[0].substr(1),
                    4) : 2);
                    e = 0;
                    for (g = f.length - 2; e < g; e += 2)
                        this.Qa({
                            x: D(f[e], 32),
                            y: D(f[e + 1], 32)
                        }, {
                            x: D(f[e + 2], 32),
                            y: D(f[e + 3], 32)
                        }, i)
                }
        }
        f = h[2] ? h[2].split(",") : [];
        var m;
        c = 0;
        for (d = f.length; c < d; c++)
            if (i = f[c].split(/\s+/g),
            2 < i.length) {
                e = D(i[1], 32);
                g = D(i[2], 32);
                switch (i[0]) {
                case "T":
                    m = new cb(e,g,this);
                    this.Ba++;
                    this.u.push(m);
                    break;
                case "C":
                    m = new eb(e,g,this);
                    this.u.push(m);
                    break;
                case "B":
                    m = new gb(e,g,D(i[3], 32) + 180,this);
                    break;
                case "G":
                    m = new ib(e,g,D(i[3], 32) + 180,this);
                    break;
                case "O":
                    m = new mb(e,g,this);
                    break;
                case "S":
                    m = new kb(e,g,this)
                }
                m && (e = C(e / this.H),
                g = C(g / this.H),
                this.t[e] === k && (this.t[e] = {}),
                this.t[e][g] === k && (this.t[e][g] = new wb(e)),
                this.t[e][g].u.push(m))
            }
        "BMX" === h[3] || "MTB" === h[3] || "HAR" === h[3] ? (this.Ta = h[3],
        this.time = "" !== h[4] ? h[4] : q) : this.time = "" !== h[3] ? h[3] : q;
        this.Ra()
    }
    var V = Hb.prototype;
    function Kb(a) {
        return function(b) {
            "left" === b.key ? xa = a.shiftLeft = 0 : "right" === b.key ? ya = a.ac = 0 : "up" === b.key ? T = a.bc = 0 : "down" === b.key ? za = a.$b = 0 : "shift" === b.key && (a.shiftLeft = a.bc = a.ac = a.$b = 0)
        }
    }
    H(V, na.prototype);
    V.save = function() {
        var a = this.ha, b = this.$, c = 0, e = this.u.length, d;
        d = {
            length: e
        };
        var g = {
            length: b.length
        };
        if (a.na)
            return this;
        for (a = {
            "0": a.j.d.x,
            1: a.j.d.y,
            2: a.j.q.x,
            3: a.j.q.y,
            4: a.j.n.x,
            5: a.j.n.y,
            6: a.g.d.x,
            7: a.g.d.y,
            8: a.g.q.x,
            9: a.g.q.y,
            10: a.g.n.x,
            11: a.g.n.y,
            12: a.g.z,
            13: a.o.d.x,
            14: a.o.d.y,
            15: a.o.q.x,
            16: a.o.q.y,
            17: a.o.n.x,
            18: a.o.n.y,
            19: a.o.z,
            20: a.G[0].p,
            21: a.G[1].p,
            22: a.G[2].p,
            23: a.direction,
            24: a.Q.x,
            25: a.Q.y,
            26: a.fa,
            27: this.pa,
            28: d,
            29: this.currentTime,
            30: a.ka,
            31: a.ma,
            32: a.ca,
            33: a.L,
            length: 34
        }; c < e; c++)
            d[c] = this.u[c].sa;
        c = 0;
        for (e = b.length; c < e; c++)
            d = b[c].Ia,
            g[c] = {
                "0": d.j.d.x,
                1: d.j.d.y,
                2: d.j.q.x,
                3: d.j.q.y,
                4: d.j.n.x,
                5: d.j.n.y,
                6: d.g.d.x,
                7: d.g.d.y,
                8: d.g.q.x,
                9: d.g.q.y,
                10: d.g.n.x,
                11: d.g.n.y,
                12: d.g.z,
                13: d.o.d.x,
                14: d.o.d.y,
                15: d.o.q.x,
                16: d.o.q.y,
                17: d.o.n.x,
                18: d.o.n.y,
                19: d.o.z,
                20: d.G[0].p,
                21: d.G[1].p,
                22: d.G[2].p,
                23: d.direction,
                24: d.Q.x,
                25: d.Q.y,
                26: d.fa,
                27: d.ka,
                28: d.ma,
                29: d.ca,
                30: d.L,
                31: d.pa,
                32: d.color,
                length: 33
            };
        this.ob.push(new Db(this,a,g));
        this.emit("saveCheckpoint")
    }
    ;
    V.Jb = function(a) {
        this.Dc();
        this.paused = q;
        var b = this.ob[this.ob.length - 1], c = this.ha = new ("MTB" === this.Ta && Ja || Da)(this,b && b.lc), e = this.$.length, d;
        c && (this.nc || (this.da = c.j),
        this.currentTime = b ? b.currentTime : 0,
        this.W = c.j.d.clone());
        for (d = 0; d < e; d++)
            if (this.$[d].cc(b && b.qc[d]),
            a && (!c || 1 === c.Cb.length && !T))
                this.da = this.$[d].Ia.j;
        this.emit("restart")
    }
    ;
    V.reset = function() {
        Ea = [[0, -1, 0, -1, 0, 0, -21, 38, -21, 38, 0, 0, 0, 21, 38, 21, 38, 0, 0, 0, 45, 42, 45, 1, 0, 0.3, q, 0, [], 0]];
        Ka = [[2, -3, 2, -3, 0, 0, -23, 35, -23, 35, 0, 0, 0, 23, 35, 23, 35, 0, 0, 0, 47, 45, 45, 1, 0, 0.3, q, 0, [], 0]];
        var a = 0
          , b = this.$.length;
        if (b) {
            for (; a < b; a++)
                this.$[a].reset();
            this.$.sort(function(a, b) {
                return a.time - b.time
            })
        }
        this.ob = [];
        this.emit("reset");
        this.Jb(l)
    }
    ;
    V.Dc = function() {
        var a, b, c, e, d;
        for (a in this.t)
            if (this.t.hasOwnProperty(a))
                for (b in this.t[a])
                    if (this.t[a].hasOwnProperty(b)) {
                        d = this.t[a][b];
                        c = 0;
                        for (e = d.u.length; c < e; c++)
                            d.u[c].sa !== k && (d.u[c].sa = q)
                    }
    }
    ;
    V.ic = function(a) {
        var b;
        "string" === typeof a && "g" === a.charAt(0) ? b = this.Sb.indexOf(a = D(a.substr(1), 10)) : (b = D(a, 10) - 1,
        "number" === typeof b && b === b && (a = this.Sb[b]));
        a && Lb(a, this, 0 > b ? p : b);
        return this
    }
    ;
    V.T = function(a) {
        var b = C(a.d.x / this.H - 0.5)
          , c = C(a.d.y / this.H - 0.5)
          , e = this.t;
        e[b] !== k && (e[b][c] !== k && e[b][c].Bb(),
        e[b][c + 1] !== k && e[b][c + 1].Bb());
        e[b + 1] !== k && (e[b + 1][c] !== k && e[b + 1][c].Bb(),
        e[b + 1][c + 1] !== k && e[b + 1][c + 1].Bb());
        e[b] !== k && e[b][c] !== k && e[b][c].T(a);
        e[b + 1] !== k && (e[b + 1][c] !== k && e[b + 1][c].T(a),
        e[b + 1][c + 1] !== k && e[b + 1][c + 1].T(a));
        e[b] !== k && e[b][c + 1] !== k && e[b][c + 1].T(a);
        return this
    }
    ;
    V.K = function() {
        var a, b;
        if (!this.paused) {
            this.ha && this.ha.K();
            a = 0;
            for (b = this.$.length; a < b; a++)
                this.$[a].K();
            this.currentTime += 40
        }
        this.J();
        return this.emit("step")
    }
    ;
    V.J = function() {
        var a = this.ha
          , b = this.currentTime
          , c = this.e
          , e = this.H
          , d = this.O.v(this)
          , g = this.t
          , f = this.canvas
          , h = this.ia
          , i = f.width
          , j = f.height
          , m = this.ja;
        this.da && this.W.I(this.da.d.k(this.W).b(0.2));
        h.clearRect(0, 0, f.width, f.height);
        var f = (new I(0,0)).Gb(this)
          , n = (new I(i,j)).Gb(this)
          , L = C(n.x / e)
          , n = C(n.y / e);
        f.x = C(f.x / e);
        f.y = C(f.y / e);
        var r, B, x, A, M, z, u, E;
        if (!(E = this.eb[c]))
            E = this.eb[c] = {};
        for (x = f.x; x <= L; x++)
            for (A = f.y; A <= n; A++)
                if (g[x] !== k && (z = g[x][A]) !== k) {
                    if (0 < z.D.length || 0 < z.C.length) {
                        if (E[M = x + "_" + A] === k) {
                            (function() {}
                            )("drawing", x, A);
                            r = E[M] = F.createElement("canvas");
                            r.width = r.height = e * c;
                            u = r.getContext("2d");
                            u.lineCap = "round";
                            u.lineWidth = Math.max(2 * c, 0.5);
                            u.strokeStyle = "#aaa";
                            r = 0;
                            for (B = z.C.length; r < B; r++)
                                z.C[r].J(u, x * e * c, A * e * c);
                            u.strokeStyle = "#000";
                            r = 0;
                            for (B = z.D.length; r < B; r++)
                                z.D[r].J(u, x * e * c, A * e * c)
                        }
                        h.drawImage(E[M], C(i / 2 - this.W.x * c + x * e * c), C(j / 2 - this.W.y * c + A * e * c))
                    }
                    h.strokeStyle = "#000";
                    r = 0;
                    for (B = z.u.length; r < B; r++)
                        z.u[r].J()
                }
        r = 0;
        for (B = this.$.length; r < B; r++)
            this.$[r].J();
        a && a.J();
        for (x = f.x; x <= L; x++)
            for (A = f.y; A <= n; A++)
                if (g[x] !== k && (z = g[x][A]) !== k && (z = z.Aa))
                    if (0 < z.C.length || 0 < z.zb.length) {
                        M = "^" + x + "_" + A;
                        if (E[M] === k) {
                            r = E[M] = F.createElement("canvas");
                            r.width = e * c;
                            r.height = e * c;
                            u = r.getContext("2d");
                            u.lineCap = "round";
                            u.lineWidth = Math.max(2 * c, 0.5);
                            r = 0;
                            for (B = z.zb.length; r < B; r++)
                                z.zb[r].J(u, x * e * c, A * e * c, O.Tb);
                            u.strokeStyle = "#aaa";
                            r = 0;
                            for (B = z.C.length; r < B; r++)
                                z.C[r].J(u, x * e * c, A * e * c)
                        }
                        h.drawImage(E[M], C(i / 2 - this.W.x * c + x * e * c), C(j / 2 - this.W.y * c + A * e * c))
                    }
        this.ya && this.ya.emit("draw", this);
        this.emit("draw");
        Mb && (h.fillStyle = "#ffb6c1",
        h.ba().a(d.x, d.y, (Ya - 1) * c, 0, s, l).f());
        h.ba();
        h.fillStyle = "#ff0";
        h.lineWidth = 1;
        h.a(40, 12, 3.5, 0, s, l).f().s().ba();
        h.lineWidth = 10;
        h.strokeStyle = "#fff";
        h.fillStyle = "#000";
        text = Ab(b);
        if (this.paused)
            text += " - Game paused";
        else if (a && a.na)
            text = "Press ENTER to restart" + (1 < Ea.length + Ka.length ? " or BACKSPACE to cancel Checkpoint" : "");
        else if (this.id === k && (10 === Nb && (2 <= m && 5 >= m) && (text += " - Grid "),
        text += " - " + ia[m],
        4 === m || 5 === m))
            text += " ( size " + Ob + " )";
        W && (!W[0] && !W[1]) && (text += " - " + (this.paused ? "Unp" : "P") + "ause ( SPACE )");
        h.strokeText(text = ": " + this.pa + " / " + this.Ba + "  -  " + text, 50, 16);
        h.fillText(text, 50, 16);
        h.textAlign = "right";
        r = 0;
        for (B = this.$.length; r < B; r++)
            a = this.$[r],
            h.fillStyle = "#000" !== a.color && a.color || "#777",
            text = (this.da === a.Ia.j ? ">> " : "") + (a.name || "Ghost") + (a.Ia.pa === this.Ba ? " finished!" : ": " + a.Ia.pa + " / " + this.Ba + " - " + Ab(a.time - this.currentTime)),
            h.strokeText(text, i - 7, 16 + 17 * r),
            h.fillText(text, i - 7, 16 + 17 * r);
        h.textAlign = "left";
        h.fillStyle = "#000";
        W && (W[0] ? (h.textAlign = "right",
        F.documentElement.offsetHeight <= window.innerHeight ? (h.strokeText(W[2], i - 36, 15 + 25 * W[1]),
        h.fillText(W[2], i - 36, 15 + 25 * W[1])) : (h.strokeText(W[2], i - 51, 15 + 25 * W[1]),
        h.fillText(W[2], i - 51, 15 + 25 * W[1])),
        h.textAlign = "left") : (h.strokeText(W[2], 36, 15 + 25 * W[1]),
        h.fillText(W[2], 36, 15 + 25 * W[1])));
        this.Ob && (a = (i - 250) / 2,
        j = (j - 150) / 2,
        h.lineWidth = 1,
        h.strokeStyle = "#fff",
        h.fillStyle = "rgba(0, 0, 0, 0.4)",
        h.fc(0, 0, i, j).fc(0, j + 150, i, j).fc(0, j, a, 150).fc(a + 250, j, a, 150).sR(a, j, 250, 150));
        return this
    }
    ;
    V.nb = function(a) {
        function b(b) {
            (b = b.nb(a)) && i.push(b)
        }
        var c = C(a.x / this.H - 0.5), e = C(a.y / this.H - 0.5), d = this.t[c], c = this.t[c + 1], g, f, h, i = [];
        if (d !== k) {
            g = d[e];
            f = d[e + 1];
            if (g !== k) {
                d = 0;
                for (h = g.D.length; d < h; d++)
                    g.D[d] && b(g.D[d]);
                d = 0;
                for (h = g.C.length; d < h; d++)
                    g.C[d] && b(g.C[d]);
                d = 0;
                for (h = g.u.length; d < h; d++)
                    g.u[d] && b(g.u[d])
            }
            if (f !== k) {
                d = 0;
                for (h = f.D.length; d < h; d++)
                    f.D[d] && b(f.D[d]);
                d = 0;
                for (h = f.C.length; d < h; d++)
                    f.C[d] && b(f.C[d]);
                d = 0;
                for (h = f.u.length; d < h; d++)
                    f.u[d] && b(f.u[d])
            }
        }
        if (c !== k) {
            g = c[e];
            e = c[e + 1];
            if (g !== k) {
                d = 0;
                for (h = g.D.length; d < h; d++)
                    g.D[d] && b(g.D[d]);
                d = 0;
                for (h = g.C.length; d < h; d++)
                    g.C[d] && b(g.C[d]);
                d = 0;
                for (h = g.u.length; d < h; d++)
                    g.u[d] && b(g.u[d])
            }
            if (e !== k) {
                d = 0;
                for (h = e.D.length; d < h; d++)
                    e.D[d] && b(e.D[d]);
                d = 0;
                for (h = e.C.length; d < h; d++)
                    e.C[d] && b(e.C[d]);
                d = 0;
                for (h = e.u.length; d < h; d++)
                    e.u[d] && b(e.u[d])
            }
        }
        d = 0;
        for (h = this.u.length; d < h; d++)
            this.u[d] && this.u[d].xa !== k && i.push(this.u.splice(d--, 1)[0]);
        this.emit("delete", i);
        return i
    }
    ;
    V.jc = function(a) {
        for (var b = a.la[0], c, e, d = 1, g = a.la.length, f = Infinity, h = -f, i = f, j = -f; d < g; d++)
            c = b,
            e = a.la[d],
            f = Math.min(f, c.x, e.x),
            h = Math.max(h, c.x, e.x),
            i = Math.min(i, c.y, e.y),
            j = Math.max(j, c.y, e.y);
        f = C(f / this.H);
        i = C(i / this.H);
        h = C(h / this.H) + 1;
        j = C(j / this.H) + 1;
        for (b = f; b <= h; b++)
            for (c = i; c <= j; c++)
                this.t[b] || (this.t[b] = {}),
                this.t[b][c] || (this.t[b][c] = new wb),
                this.t[b][c].Aa.zb.push(a),
                this.ub(b, c);
        this.emit("addPoly", a)
    }
    ;
    V.Pb = function(a) {
        for (var b = a.la[0], c, e, d = 1, g = a.la.length, f = Infinity, h = -f, i = f, j = -f; d < g; d++)
            c = b,
            e = a.la[d],
            f = Math.min(f, c.x, e.x),
            h = Math.max(h, c.x, e.x),
            i = Math.min(i, c.y, e.y),
            j = Math.max(j, c.y, e.y);
        f = C(f / this.H);
        i = C(i / this.H);
        h = C(h / this.H) + 1;
        j = C(j / this.H) + 1;
        for (b = f; b <= h; b++)
            for (c = i; c <= j; c++)
                this.ub(b, c);
        this.emit("addPoly", a)
    }
    ;
    V.Qa = function(a, b, c) {
        a = new (c & 1 ? sb : qb)(a.x,a.y,b.x,b.y,this);
        b = this.ja;
        2 <= a.p && 1E5 > a.p && (this.Db(a, c),
        2 <= b && 5 >= b && (4 === b || 2 === b ? Pb.M(Qb) : Rb.M(Qb),
        Sb.M(Qb)));
        return a
    }
    ;
    V.Db = function(a, b) {
        var c = zb(a.r, a.w, this.H), e, d, g, f, h;
        g = 0;
        for (f = c.length; g < f; g++)
            e = C(c[g].x / this.H),
            d = C(c[g].y / this.H),
            this.t[e] === k && (this.t[e] = {}),
            h = this.t[e][d] || (this.t[e][d] = new wb),
            b & 4 && (h = h.Aa),
            (a.Vb ? h.C : h.D).push(a),
            this.ub(e, d);
        this.emit("addLine", a)
    }
    ;
    V.ub = function(a, b) {
        for (var c in this.eb)
            this.eb.hasOwnProperty(c) && (delete this.eb[c][a + "_" + b],
            delete this.eb[c]["^" + a + "_" + b]);
        this.emit("clearCache", a, b)
    }
    ;
    V.cb = function(a, b, c) {
        this.Nb(2 < arguments.length ? new a(b.x,b.y,c,this) : new a(b.x,b.y,this))
    }
    ;
    V.Nb = function(a) {
        var b = C(a.d.x / this.H)
          , c = C(a.d.y / this.H);
        this.t[b] === k && (this.t[b] = {});
        this.t[b][c] === k && (this.t[b][c] = new wb);
        this.t[b][c].u.push(a);
        this.emit("addObject", a)
    }
    ;
    V.I = function(a, b) {
        for (var c = 0, e = a.length; c < e; c++)
            a[c].type && (a[c] = new a[c].type(a[c].x,a[c].y,this)),
            a[c].Kc ? this.Nb(a[c]) : b ? this.Db(a[c]) : this.Qa(a[c].r, a[c].w, a[c].Vb)
    }
    ;
    V.remove = function(a, b) {
        b === k && (b = a);
        var c = zb(a, b, this.H), e = [], d, g, f, h;
        f = 0;
        for (h = c.length; f < h; f++)
            d = C(c[f].x / this.H),
            g = C(c[f].y / this.H),
            e.append(this.t[d][g].remove()),
            this.ub(d, g);
        f = 0;
        for (h = e.length; f < h; f++)
            e[f].xa = q
    }
    ;
    V.oa = function(a, b) {
        this.ja !== b && this.ya && this.ya.emit("deactivate", O);
        this.ya = a;
        this.ja = b;
        this.emit("tool", a, b)
    }
    ;
    V.Rc = function() {
        var a = this.ja, b;
        3 === a || 5 === a ? (a = C(Rb.x / this.H),
        b = C(Rb.y / this.H),
        (a = this.t[a][b].C[this.t[a][b].C.length - 1]) && a.w.x === y(Rb.x) && a.w.y === y(Rb.y) ? (a.xa = l,
        Rb.M(a.r),
        this.remove(a.r, a.w)) : alert("No more scenery line to erase!")) : (a = C(Pb.x / this.H),
        b = C(Pb.y / this.H),
        a = this.t[a][b].D[this.t[a][b].D.length - 1],
        a !== k && a.w.x === y(Pb.x) && a.w.y === y(Pb.y) ? (a.xa = l,
        Pb.M(a.r),
        this.remove(a.r, a.w)) : alert("No more line to erase!"))
    }
    ;
    V.all = function() {
        var a = {
            D: [],
            C: [],
            u: [],
            ha: this.Ta
        }, b, c, e;
        for (c in this.t)
            for (e in this.t[c])
                b = this.t[c][e],
                ma(a.D, b.D),
                ma(a.C, b.C),
                ma(a.u, b.u);
        return a
    }
    ;
    V.toString = function() {
        var a = "", b = "", c = "", e, d, g, f, h, i;
        for (e in this.t)
            for (d in this.t[e])
                if ((h = this.t[e][d]).D) {
                    g = 0;
                    for (f = h.D.length; g < f; g++)
                        i = h.D[g],
                        i.Na || (a += i.r + i.Ga() + ",");
                    g = 0;
                    for (f = h.C.length; g < f; g++)
                        i = h.C[g],
                        i.Na || (b += i.r + i.Ga() + ",");
                    g = 0;
                    for (f = h.Aa.C.length; g < f; g++)
                        i = h.Aa.C[g],
                        i.Na || (b += "^" + i.r + i.Ga() + ",");
                    c += h.u.join(",")
                }
        for (e in this.t)
            for (d in this.t[e])
                if ((h = this.t[e][d]).D) {
                    g = 0;
                    for (f = h.D.length; g < f; g++)
                        h.D[g].Na = q;
                    g = 0;
                    for (f = h.C.length; g < f; g++)
                        h.C[g].Na = q;
                    g = 0;
                    for (f = h.Aa.C.length; g < f; g++)
                        h.Aa.C[g].Na = q
                }
        return a.substr(0, a.length - 1) + "#" + b.substr(0, b.length - 1) + "#" + c.substr(0, c.length - 1) + "#" + this.ha
    }
    ;
    V.tc = Function.from(l);
    V.Ra = function() {
        var a = this
          , b = a.wa;
        Tb.Ra(a);
        if (this.id) {
            Ub.detach(a);
            Ub.getElement().destroy()
        } else
            Ub.Ra(a);
        b.onmouseover = function() {
            ga.style.cursor = 0 === a.ja ? "default" : "default"
        }
        ;
        b.onmousemove = function(c) {
            a.O.M((new I(c.clientX - b.offsetLeft + window.pageXOffset,c.clientY - b.offsetTop + window.pageYOffset)).Gb(a));
            a.ya && (a.ya.emit("default", a, c),
            a.Ua && a.ya.emit("drag", a, c))
        }
        ;
        b.onmouseout = function() {
            ga.style.cursor = "default"
        }
        ;
        b.onmousedown = function(b) {
            b.preventDefault();
            a.Ua = l;
            a.aa.M(a.O);
            return a.ya && a.ya.emit("down", a, b)
        }
        ;
        b.oncontextmenu = function(a) {
            a.preventDefault()
        }
        ;
        b.onmouseup = function(b) {
            b.preventDefault();
            a.Ua = q;
            return a.ya && a.ya.emit("up", a, b)
        }
        ;
        var c = this;
        window.addEvent("keydown", a.gc = function(a) {
            if (c.tc() && !a.Fc) {
                var b = a.preventDefault;
                if (a.shift) {
                    var g = (c.da ? c.da.d : c.W).clone();
                    c.da = {
                        d: g
                    };
                    "left" === a.key && (c.shiftLeft = l,
                    b());
                    "right" === a.key && (c.ac = l,
                    b());
                    "up" === a.key && (c.bc = l,
                    b());
                    "down" === a.key && (c.$b = l,
                    b())
                } else
                    109 === a.code || 189 === a.code ? Vb(-1) : 107 === a.code || 187 === a.code ? Vb(1) : "left" === a.key ? (xa = 1,
                    b()) : "right" === a.key ? (ya = 1,
                    b()) : "up" === a.key ? (T = 1,
                    b()) : "down" === a.key ? (za = 1,
                    b()) : "z" === a.key && (wa = 1,
                    b())
            }
        }
        ).addEvent("keyup", a.hc = Kb(this))
    }
    ;
    V.detach = function() {
        var a = this.wa;
        Tb.detach(this);
        Ub.detach(this);
        a.onmouseover = a.onmousemove = a.onmouseout = a.onmousedown = a.oncontextmenu = a.onmouseup = p;
        window.removeEvent("keydown", this.gc).removeEvent("keyup", this.hc)
    }
    ;
    V.pc = function() {
        var a = F.createElement("canvas")
          , b = this.wa;
        a.width = 500;
        a.height = 300;
        this.e *= 2;
        this.Ob = q;
        this.J();
        a.getContext("2d").drawImage(b, (b.width - 500) / 2, (b.height - 300) / 2, 500, 300, 0, 0, 500, 300);
        this.e /= 2;
        this.emit("thumbnail", a);
        return a.toDataURL("image/png")
    }
    ;
    function X(a) {
        this.Ca = {};
        var a = a || {
            name: ""
        }, b;
        for (b in a)
            if (a.hasOwnProperty(b))
                switch (typeof a[b]) {
                case "function":
                    this.on(b, a[b]);
                    break;
                default:
                    if ("element" === b)
                        this.on(b, function(a) {
                            return function(b) {
                                b.addClass(a)
                            }
                        }(a[b]));
                    else
                        this[b] = a[b]
                }
        this.bb = this.bb.bind(this);
        this.lb = this.lb.bind(this);
        this.mb = this.mb.bind(this);
        this.tb = {};
        this.ga = String.uniqueID()
    }
    var Wb = X.prototype;
    H(Wb, na.prototype);
    Wb.bb = function(a, b) {
        b.preventDefault();
        this.emit("activate", a, b)
    }
    ;
    Wb.lb = function(a, b) {
        this.emit("enter", a, b)
    }
    ;
    Wb.mb = function(a, b) {
        this.emit("leave", a, b)
    }
    ;
    Wb.Ra = function(a) {
        var b = __ID(a)
          , c = this;
        if (!c.tb[b]) {
            c.tb[b] = l;
            var e = c.bb[b] = function(b) {
                return c.bb(a, b)
            }
              , d = c.lb[b] = function(b) {
                return c.lb(a, b)
            }
              , b = c.mb[b] = function(b) {
                return c.mb(a, b)
            }
            ;
            c.getElement().addEvents({
                click: e,
                xc: d,
                yc: b
            });
            c.key && document.addEvent("keydown:keys(" + c.key.toLowerCase() + ")", e)
        }
        return c
    }
    ;
    Wb.detach = function(a) {
        a = BH.ID(a);
        this.tb[a] && (this.tb[a] = q,
        this.getElement().removeEvents({
            click: this.bb[a],
            xc: this.lb[a],
            yc: this.mb[a]
        }),
        this.key && document.removeEvent("keydown:keys(" + this.key.toLowerCase() + ")", this.bb[a]));
        return this
    }
    ;
    Wb.oc = function() {
        return this.name + (this.key ? " (" + this.key + ")" : "")
    }
    ;
    Wb.getElement = function() {
        var a = this.oc()
          , b = G(["div.tool"]);
        a ? b.grab(G(["span", a])) : b.addClass("empty");
        this.image && b.setStyle("background-image", "url(/img/edit/" + this.image + ".png)");
        this.icon && b.grab(G(["i.icon-" + this.icon]));
        this.emit("element", b);
        this.getElement = function() {
            return b
        }
        ;
        return b
    }
    ;
    function Xb(a) {
        this.Ab = [].map.call(arguments, function(a) {
            return a instanceof X ? a : new X(a)
        })
    }
    var Yb = Xb.prototype;
    Yb.getElement = function() {
        var a = G(["div.toolbar"]).setStyle("height", 24 * this.Ab.length).adopt(this.Ab.map(function(a) {
            return a.getElement()
        }));
        this.getElement = function() {
            return a
        }
        ;
        return a
    }
    ;
    Yb.Ra = function(a) {
        this.Ab.each(function(b) {
            b.Ra(a)
        })
    }
    ;
    Yb.detach = function(a) {
        this.Ab.each(function(b) {
            b.detach(a)
        })
    }
    ;
    var U = $("canvas_rider")
      , Q = U.getContext("2d");
    Q.lineCap = "round";
    Q.lineJoin = "round";
    Q.font = "8px eiven";
    function Ib(a, b) {
        function c() {
            a.apply(b, arguments);
            return b
        }
        c.Ec = a;
        return c
    }
    var O, Ea = [[0, -1, 0, -1, 0, 0, -21, 38, -21, 38, 0, 0, 0, 21, 38, 21, 38, 0, 0, 0, 45, 42, 45, 1, 0, 0.3, q, 0, [], 0]], Ka = [[2, -3, 2, -3, 0, 0, -23, 35, -23, 35, 0, 0, 0, 23, 35, 23, 35, 0, 0, 0, 47, 45, 45, 1, 0, 0.3, q, 0, [], 0]], Pa = [[-5, 4.5, -5, 4.5, 0, 0, -23, 35, -23, 35, 0, 0, 0, 23, 35, 23, 35, 0, 0, 0, 35, 45, 45, 1, 0, 0.3, q, 0, [], 0]], S = [{}, {}, {}, {}, {}], xa = 0, ya = 0, T = 0, za = 0, wa = 0, Sb = new I(40,50), Qb = new I(0,0), Ob = 20, Ya = 15, Zb = q, Mb = q, W = q, Nb = 1, $b = [], Pb = new I(40,50), Rb = new I(-40,50);
    function ac(a, b, c) {
        var e = c.v(a)
          , d = a.ia
          , b = a.e;
        d.lineWidth = Math.max(2 * b, 0.5);
        50 > e.x ? (a.W.x -= 10 / b,
        c.x -= 10 / b) : e.x > U.width - 50 && (a.W.x += 10 / b,
        c.x += 10 / b);
        50 > e.y ? (a.W.y -= 10 / b,
        c.y -= 10 / b) : e.y > U.height - 50 && (a.W.y += 10 / b,
        c.y += 10 / b);
        d.strokeStyle = a.S & 1 ? "#00f" : "#f00";
        e = c.v(a);
        b = a.aa.v(a);
        d.ba().m(b.x, b.y).l(e.x, e.y).s()
    }
    function bc(a, b, c) {
        a.strokeStyle = c & 1 ? "#777" : "#000";
        a.lineWidth = 1;
        a.ba().m(b.x - 10, b.y).l(b.x + 10, b.y).m(b.x, b.y - 10).l(b.x, b.y + 10).s()
    }
    var cc = new X({
        name: "Pause",
        key: "space",
        icon: "pause",
        activate: function(a, b) {
            (function() {}
            )("pausing", b);
            b.preventDefault();
            a.paused = !a.paused;
            this.getElement().getElement("i").set("class", a.paused ? "icon-play" : "icon-pause")
        }
    })
      , dc = new X({
        name: "Restart",
        key: "enter",
        icon: "step-backward",
        activate: function(a) {
            a.Jb()
        }
    })
      , ec = new X({
        name: "Cancel Checkpoint",
        key: "backspace",
        icon: "fast-backward",
        activate: function(a) {
            a.ob.pop();
            a.Jb()
        }
    })
      , fc = new X({
        name: "Switch Bike",
        key: "B",
        image: "bike",
        activate: function(a) {
            a = a || O;
            a.Ta = "BMX" === a.Ta ? "MTB" : "BMX";
            a.reset()
        }
    })
      , hc = new X({
        name: "Toggle Fullscreen",
        key: "F",
        icon: "fullscreen",
        activate: gc
    })
      , ic = new X({
        name: "Highlight White Lines",
        key: "H",
        icon: "eye-close",
        activate: function(a) {
            a.Tb = !a.Tb
        }
    })
      , jc = new X({
        name: "Eraser",
        key: "E",
        image: "erase",
        activate: function(a) {
            a.oa(this, 1)
        },
        down: function(a, b) {
            var c = a
              , c = c || O
              , e = c.nb(b ? new I(b.clientX - c.wa.offsetLeft + window.pageXOffset,b.clientY - c.wa.offsetTop + window.pageYOffset) : Qb);
            e.length && c.sb.push({
                rb: function() {
                    c.I(e, l)
                },
                pb: function() {
                    for (var a = 0, b = e.length; a < b; a++)
                        e[a].remove()
                }
            })
        }
    })
      , kc = new X({
        name: "Camera",
        key: "R",
        icon: "move",
        activate: function(a) {
            a.oa(this, 0);
            a.wa.setStyle("cursor", "default")
        },
        deactivate: function(a) {
            a.wa.setStyle("cursor", "default")
        },
        drag: function(a) {
            a.da = q;
            a.W.I(a.aa.k(a.O));
            a.O.M(a.aa)
        }
    })
      , lc = new X({
        name: "Toggle Grid Snapping",
        key: "G",
        image: "grid",
        activate: function(a) {
            a.rc = 11 - a.rc
        }
    })
      , mc = new X({
        name: "Undo",
        key: "control+Z",
        icon: "undo",
        activate: function(a) {
            (function() {}
            )("undo");
            a.sb.rb()
        }
    })
      , nc = new X({
        name: "Redo",
        key: "control+Y",
        icon: "repeat",
        activate: function(a) {
            a.sb.pb()
        }
    })
      , Tb = new Xb(cc,dc,ec,p,fc,p,hc,ic,p,jc,kc,lc,mc,nc)
      , oc = new X({
        name: "Brush",
        key: "A",
        image: "brush",
        activate: function(a) {
            a.oa(this, a.S & 1 ? 5 : 4)
        },
        down: function(a) {
            a.shift && a.Qa(a.aa, a.O, a.S);
            a.Ac = l;
            a[this.ga] = a.aa.clone()
        },
        move: function(a) {
            a.da = q;
            if (a.Ua && a[this.ga].vb(a.O) >= a.mc) {
                var b = a.Qa(a[this.ga].clone(), a[this.ga].M(a.O), a.S);
                a.sb.push({
                    rb: b.remove.bind(b),
                    pb: b.Ib.bind(b)
                })
            }
        },
        draw: function(a) {
            a.Ua && ac(a, a[this.ga], a.O);
            bc(a.ia, a.O.v(a), a.S)
        }
    })
      , Jb = new X({
        name: "Line",
        key: "Q",
        image: "line",
        activate: function(a) {
            a.oa(this, a.S & 1 ? 3 : 2)
        },
        move: function(a) {
            a.da = q
        },
        down: function(a) {
            a.shift && (a[this.ga] ? a[this.ga].la.push(a.O.clone()) : a.Qa(a.aa, a.O, a.S));
            a.Ac = l
        },
        up: function(a) {
            var b;
            if (b = a[this.ga])
                a.S & 1 ? a[this.ga] = p : 7 > b.la[0].vb(a.O) ? (b.xb = l,
                a.Pb(b),
                a[this.ga] = p) : 3 > b.la.getLast().vb(a.aa) ? (b.la.push(a.O.clone()),
                a.Pb(b)) : a[this.ga] = p;
            a[this.ga] || (a.S & 4 && !(a.S & 1) ? (b = a[this.ga] = new ub([a.aa.clone(), a.O.clone()],q,a),
            a.jc(b)) : (a[this.ga] = p,
            b = a.Qa(a.aa, a.O, a.S)));
            a.sb.push({
                rb: b.remove.bind(b),
                pb: b.Ib.bind(b)
            })
        },
        draw: function(a) {
            a.Ua && ac(a, a.aa, a.O);
            bc(a.ia, a.O.v(a), a.S)
        }
    })
      , pc = new X({
        name: "Toggle Scenery Lines",
        key: "S",
        image: "scenery",
        activate: function(a) {
            a.S & 1 ? a.S ^= 1 : a.S |= 1;
            3 === a.ja ? a.ja = 2 : 2 === a.ja ? a.ja = 3 : 4 === a.ja ? a.ja = 5 : 5 === a.ja && (a.ja = 4)
        }
    })
      , qc = new X({
        name: "Switch Layers",
        icon: "copy",
        activate: function(a) {
            a.S = a.S & 4 ? a.S ^ 4 | 2 : a.S = a.S ^ 2 | 4
        }
    })
      , rc = new X({
        name: "Target",
        key: "shift+T",
        image: "target",
        activate: function(a) {
            a.oa(this, 10)
        },
        draw: function(a) {
            var b = a.ia
              , c = a.O.v(a);
            b.fillStyle = "#ff0";
            b.strokeStyle = "#000";
            b.lineWidth = Math.max(0.5, 2 * a.e);
            b.ba().m(c.x + 7 * a.e, c.y).a(c.x, c.y, 7 * a.e, 0, s, l).f().s()
        },
        down: function(a) {
            a.cb(cb, a.aa);
            a.Ba++
        }
    })
      , sc = new X({
        name: "Checkpoint",
        key: "shift+C",
        image: "checkpoint",
        activate: function(a) {
            a.oa(this, 8)
        },
        draw: function(a) {
            var b = a.ia
              , c = a.O.v(a);
            b.fillStyle = "#00f";
            b.strokeStyle = "#000";
            b.lineWidth = Math.max(0.5, 2 * a.e);
            b.ba().m(c.x + 7 * a.e, c.y).a(c.x, c.y, 7 * a.e, 0, s, l).f().s()
        },
        down: function(a) {
            a.cb(eb, a.aa)
        }
    })
      , tc = new X({
        name: "Boost",
        key: "shift+B",
        image: "boost",
        activate: function(a) {
            a.oa(this, 7)
        },
        move: function(a) {
            a.da = q
        },
        draw: function(a) {
            if (!a.da) {
                var b = a.ia
                  , c = a.e
                  , e = a.aa
                  , d = a.O
                  , g = e.v(a);
                b.ba().fillStyle = "#ff0";
                b.strokeStyle = "#000";
                b.lineWidth = Math.max(0.5, 2 * c);
                b.save();
                a.Ua ? (b.ta(g.x, g.y),
                b.rotate(Math.atan2(-(d.x - e.x), d.y - e.y))) : (a = d.v(a),
                b.ta(a.x, a.y));
                b.m(-7 * c, -10 * c).l(0, 10 * c).l(7 * c, -10 * c).l(-7 * c, -10 * c).f().s().re()
            }
        },
        down: function() {
            ga.style.cursor = "default"
        },
        up: function(a) {
            ga.style.cursor = "default";
            var b = a.O
              , c = a.aa;
            a.cb(gb, c, y(180 * Math.atan2(-(b.x - c.x), b.y - c.y) / Math.PI))
        }
    })
      , uc = new X({
        name: "Gravity",
        key: "shift+G",
        image: "gravity",
        activate: function(a) {
            a.oa(this, 6)
        },
        move: function(a) {
            a.da = q
        },
        draw: function(a) {
            if (!a.da) {
                var b = a.ia
                  , c = a.e
                  , e = a.aa
                  , d = a.O
                  , g = e.v(a);
                b.ba().fillStyle = "#0f0";
                b.strokeStyle = "#000";
                b.lineWidth = Math.max(0.5, 2 * c);
                b.save();
                a.Ua ? (b.ta(g.x, g.y),
                b.rotate(Math.atan2(-(d.x - e.x), d.y - e.y))) : (a = d.v(a),
                b.ta(a.x, a.y));
                b.m(-7 * c, -10 * c).l(0, 10 * c).l(7 * c, -10 * c).l(-7 * c, -10 * c).f().s().re()
            }
        },
        down: function() {
            ga.style.cursor = "default"
        },
        up: function(a) {
            ga.style.cursor = "default";
            var b = a.O
              , c = a.aa;
            a.cb(ib, c, y(180 * Math.atan2(-(b.x - c.x), b.y - c.y) / Math.PI))
        }
    })
      , vc = new X({
        name: "Bomb",
        key: "shift+O",
        image: "bomb",
        activate: function(a) {
            a.oa(this, 11)
        },
        draw: function(a) {
            var b = a.ia
              , c = a.O.v(a);
            b.fillStyle = "#f00";
            b.strokeStyle = "#000";
            b.lineWidth = Math.max(0.5, 2 * a.e);
            b.ba().m(c.x + 7 * a.e, c.y).a(c.x, c.y, 7 * a.e, 0, s, l).f().s()
        },
        down: function(a) {
            a.cb(mb, a.aa)
        }
    })
      , wc = new X({
        name: "Slow-Mo",
        key: "shift+S",
        image: "slowmo",
        activate: function(a) {
            a.oa(this, 9)
        },
        draw: function(a) {
            var b = a.ia
              , c = a.O.v(a);
            b.fillStyle = "#eee";
            b.strokeStyle = "#000";
            b.lineWidth = Math.max(0.5, 2 * a.e);
            b.ba().m(c.x + 7 * a.e, c.y).a(c.x, c.y, 7 * a.e, 0, s, l).f().s()
        },
        down: function(a) {
            a.cb(kb, a.aa)
        }
    })
      , Ub = new Xb(oc,Jb,pc,qc,p,rc,sc,tc,uc,vc,wc)
      , xc = $("trackcode")
      , yc = $("charcount")
      , zc = $("new")
      , Ac = $("load")
      , Bc = $("save")
      , Cc = $("upload");
    function Dc(a, b) {
        Ec();
        var c = new Hb(a);
        c.Sb = b;
        c.ha = "BMX" === c.Ta ? new Da(c) : "HAR" === c.Ta ? new Oa(c) : new Ja(c);
        c.da = c.ha.j;
        $b.push(function() {
            c.K()
        });
        return O = c
    }
    setInterval(function() {
        for (var a = $b.length; a--; )
            $b[a]()
    }, 40);
    var Fc = {
        parse: function(a) {
            var a = a.split(",")
              , b = [{}, {}, {}, {}, {}];
            5 < a.length && (b = b.concat(a.slice(5)));
            for (var c = 0, e, d, g; 5 > c; c++) {
                g = a[c].split(" ");
                e = 0;
                for (d = g.length - 1; e < d; e++)
                    b[c][g[e]] = 1
            }
            return b
        },
        Ic: function(a) {
            for (var b = "", c, e = 0, d = a.length; e < d; e++) {
                for (c in a[e])
                    isNaN(c) || (b += c + " ");
                b += ","
            }
            return b
        }
    };
    function Lb(a, b, c) {
        function e(a) {
            j = l;
            i = a;
            for (var b = 0, c = m.length; b < c; b++)
                m[b](a)
        }
        var b = b || O, c = c || 0, d = b.$.map(function(a) {
            return a.id
        }).indexOf(a), g;
        if (-1 < d)
            return b.da === b.$[d].Ia.j && (g = b.$[d - 1] || b.$[d + 1],
            b.da = (g && g.Ia || b.ha).j),
            b.$.splice(d, 1),
            q;
        var d = "id=" + a, f = new XMLHttpRequest, h, i, j, m = [], n = {
            Bc: function(a) {
                m.push(a);
                j && (i = a(i));
                return n
            }
        };
        h = H({
            Yb: e,
            Mc: n,
            Oc: {
                Yb: e
            }
        }, n);
        f.onload = function() {
            h.Yb(f.responseText)
        }
        ;
        f.open("POST", "/ghost/load", l);
        f.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        f.send(d);
        h.Bc(function(d) {
            d = Fc.parse(d);
            d[8] = ja[c % ja.length];
            b.$.push(new Eb(O,a,d));
            b.reset()
        });
        return l
    }
    function Gc() {
        var a = Tb.getElement()
          , b = Ub.getElement();
        U.width = window.innerWidth;
        U.height = window.innerHeight;
        U.style.position = "fixed";
        U.style.top = U.style.left = 0;
        U.style.border = "none";
        b.style.left = U.width - (F.documentElement.offsetHeight <= window.innerHeight ? 24 : 39) + "px";
        window.scrollTo(0, 0);
        U.style.zIndex = 2E3;
        a.style.zIndex = b.style.zIndex = 2001;
        document.body.style.overflowY = "hidden"
    }
    function Ec() {
        var a = Tb.getElement()
          , b = Ub.getElement();
        U.width = 700;
        U.height = 400;
        U.style.position = "static";
        U.style.border = "1px solid black";
        b.style.left = U.offsetLeft + U.width - 23 + "px";
        U.style.zIndex = a.style.zIndex = b.style.zIndex = 2;
        document.body.style.overflowY = "scroll"
    }
    function Hc() {
        Q.lineCap = "round";
        Q.lineJoin = "round";
        Q.font = "8px eiven";
        var a = Tb.getElement()
          , b = Ub.getElement();
        a.style.top = b.style.top = U.offsetTop + 1 + "px";
        a.style.left = U.offsetLeft - 1 + "px"
    }
    window.onresize = function() {
        (700 === U.width ? Ec : Gc)();
        Hc()
    }
    ;
    function gc() {
        (700 === U.width ? Gc : Ec)();
        Hc()
    }
    function Ic(a) {
        a.addEventListener("focus", Jc);
        a.addEventListener("blur", Kc)
    }
    zc && (zc.onclick = function() {
        confirm("Do you really want to start a new track?") && ($b.pop(),
        O = Dc("-18 1i 18 1i##", []),
        yc.innerHTML = "Trackcode",
        xc.value = p,
        O.reset())
    }
    );
    Ac && (Ac.onclick = function() {
        10 < xc.value.length ? ($b.pop(),
        O = Dc(xc.value, []),
        yc.innerHTML = "Trackcode",
        xc.value = p,
        O.reset()) : alert("No trackcode to load!")
    }
    );
    Bc && (Bc.onclick = function() {
        O.id === k && (xc.value = O + "",
        xc.select(),
        yc.innerHTML = "Trackcode - " + y(xc.value.length / 1E3) + "k - CTRL + C to copy")
    }
    );
    Cc && (Cc.onclick = function() {
        var a = O + "";
        if (0 < a.length) {
            O.paused = l;
            O.oa(kc, 0);
            Lc(l);
            leftToolbar.getElement().hide();
            rightToolbar.getElement().hide();
            $("track_menu").hide();
            Q.lineCap = Q.lineJoin = "round";
            var b = G(["input#name.input-block-level", {
                type: "text",
                size: 18,
                maxlength: 20,
                placeholder: "Name..."
            }])
              , c = G(["textarea.input-block-level", {
                rows: 4,
                placeholder: "Description..."
            }])
              , e = G(["input.btn.btn-primary.btn-block.btn-large", {
                type: "submit",
                value: "Save track"
            }])
              , d = G(["div.span3", "Visibility:"])
              , g = G(["div.btn-group.span9", {
                "data-toggle": "buttons-radio"
            }, ["button.btn#optPublic.active", ["i.icon-globe"], " Public"], ["button.btn#optHidden", ["i.icon-eye-close"], " Hidden"], ["button.btn#optPrivate", ["i.icon-lock"], " Private"]])
              , f = G(["input.span12", {
                placeholder: "Partners...",
                type: "text"
            }])
              , h = G(["div.span5"])
              , i = G(["label.hide.row-fluid", ["div.span3", "Collaboration with: "], ["div.span4", [f]], [h]])
              , j = G(["div.row-fluid"])
              , m = G(["div"])
              , n = G(["div.well.row-fluid#track_menu"]);
            m.style.color = U.style.borderColor = "#f00";
            m.innerHTML = "Use your mouse to drag & fit an interesting part of your track in the thumbnail";
            i.style.lineHeight = d.style.lineHeight = "30px";
            n.adopt([b, c, j.adopt([d, g]), i, e]);
            n.inject(U, "after");
            m.inject(U, "before");
            require(["/js/lib/mootagify.js?" + String.uniqueID()], function(a) {
                new a(i.removeClass("hide"),p,{
                    tagEls: "b.tagif-tag",
                    closeEls: "span.remove-tag",
                    minItemLength: 1,
                    maxItemLength: Infinity,
                    target: h
                })
            });
            Ic(b);
            b.on("keypress", function(a) {
                a.stopPropagation()
            }).focus();
            Ic(f);
            Ic(c);
            e.addEvent("click", function() {
                var d, f, h, i;
                f = O.pc();
                d = b.value;
                if (4 > d.length)
                    return alert("The track name is too short!");
                h = c.value;
                e.disabled = l;
                i = new XMLHttpRequest;
                i.open("POST", "/tracks/save", q);
                i.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                i.send("n=" + encodeURIComponent(d) + "&c=" + encodeURIComponent(a) + "&d=" + encodeURIComponent(h) + "&p=" + encodeURIComponent($(g).getElement(".active").get("id")));
                d = JSON.parse(i.responseText);
                if ("string" === typeof d)
                    return alert("Your track was refused: " + d),
                    q;
                i = new XMLHttpRequest;
                i.open("POST", "/tracks/thumbnail/" + d, q);
                i.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                i.send(f.replace("data:image/png;base64,", "i="));
                location.href = "/tracks/" + d
            })
        } else
            return alert("Sorry, but your track must be bigger or more detailed."),
            q
    }
    );
    function Vb(a) {
        if (0 > a && 0.2 < O.e || 0 < a && 4 > O.e)
            O.e = y(10 * O.e + 2 * a) / 10
    }
    function Mc(a) {
        a.preventDefault();
        var b = O.ja
          , c = 0 > a.detail || 0 < a.wheelDelta
          , a = 0 < a.detail || 0 > a.wheelDelta;
        if (Zb)
            if (1 === b)
                a && 5 < Ya ? Ya -= 5 : c && 40 > Ya && (Ya += 5);
            else {
                if (4 === b || 5 === b)
                    a && 4 < Ob ? Ob -= 8 : c && 200 > Ob && (Ob += 8)
            }
        else
            a ? Vb(-1) : c && Vb(1)
    }
    U.addEventListener("DOMMouseScroll", Mc, q);
    U.addEventListener("mousewheel", Mc, q);
    var Nc;
    function Jc() {
        Nc = {
            uc: F.onkeydown,
            vc: F.onkeypress,
            wc: F.onkeyup
        };
        F.onkeydown = F.onkeypress = F.onkeyup = ba();
        O.detach()
    }
    function Kc() {
        Nc && (F.onkeydown = Nc.uc,
        F.onkeypress = Nc.vc,
        F.onkeyup = Nc.wc,
        Nc = q,
        O.Ra())
    }
    function Lc(a) {
        O.Ob = a !== q
    }
    function Oc() {
        return O
    }
    $("toolbar1") && $("toolbar1").dispose();
    $("toolbar2") && $("toolbar2").dispose();
    Ub.getElement().addClass("right").inject(U, "after");
    Tb.getElement().addClass("left").inject(U, "after");
    Hc();
    var Pc = window.BH || (window.BH = {});
    Pc.game = {
        ride: Dc,
        watchGhost: Lb,
        detach: Jc,
        attach: Kc,
        changeThumb: Lc
    };
    Pc.set ? Pc.set("crtrack", Oc) : Pc.crtrack = Oc;
    Pc.GhostString = Fc;
    Pc.TRACK_MIN_SIZE = 0;
}())