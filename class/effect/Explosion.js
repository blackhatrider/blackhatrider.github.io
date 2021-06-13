export default class Explosion {
    constructor(a, b, c, d) {
        this.dead = !0;
        this.track = d;
        this.motor = 30 + 20 * Math.random();
        this.Vb = 0;
        this.$a = [
            new Shard(a, this),
            new Shard(a, this),
            new Shard(a, this),
            new Shard(a, this),
            new Shard(a, this)
        ];
        this.pos = a.clone();
        this.gravity = b;
        this.time = c;
        this.head = new BodyPart(a, this);
        this.head.vel.x = 20
    }
    draw() {
        if (this.motor > 0) {
            this.motor -= 10;
            let t = this.pos.toPixel();
            ctx.fillStyle = "#ff0";
            ctx.beginPath();
            ctx.moveTo(t.x + this.motor / 2 * Math.cos(Math.random() * 2 * Math.PI), t.y + this.motor / 2 * Math.sin(Math.random() * 2 * Math.PI));
            for (let a = 1; a < 16; a++) {
                ctx.lineTo(t.x + ((this.motor + 30 * Math.random()) / 2) * Math.cos(Math.random() * 2 * Math.PI + 2 * Math.PI * a / 16), t.y + ((this.motor + 30 * Math.random()) / 2) * Math.sin(Math.random() * 2 * Math.PI + 2 * Math.PI * a / 16));
            }
            ctx.fill()
        }
        for (const t of this.$a)
            t.draw();
    }
    update() {
        for (const t of this.$a)
            t.update();
    }
}