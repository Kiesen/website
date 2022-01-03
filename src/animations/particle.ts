/**
 * Currently the particle animation is not in use, however it is
 * still not considered as dead code. The creation taught me a lot
 * about the html canvas element and how to create simple animation
 * with it.
 */
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  id: number;
  color: string;
  ctx: CanvasRenderingContext2D;

  constructor(id: number, ctx: CanvasRenderingContext2D) {
    this.x = Math.floor(Math.random() * ctx.canvas.width);
    this.y = Math.floor(Math.random() * ctx.canvas.height);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.size = Math.random() * 1 + 0.3;
    this.id = id;
    this.color = '#000';
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, 360);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    if (this.y > this.ctx.canvas.height + this.size) {
      this.y = 0;
    } else if (this.y < 0 - this.size) {
      this.y = this.ctx.canvas.height;
    } else {
      this.y += this.vy;
    }

    if (this.x > this.ctx.canvas.width + this.size) {
      this.x = 0;
    } else if (this.x < 0 - this.size) {
      this.x = this.ctx.canvas.width;
    } else {
      this.x += this.vx;
    }

    this.draw();
  }

  resetPosition() {
    this.x = Math.floor(Math.random() * this.ctx.canvas.width);
    this.y = Math.floor(Math.random() * this.ctx.canvas.height);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
  }
}

class ParticleAnimation {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  animationFrameID: number;
  particles: Map<number, Particle>;

  constructor(canvasID: string, particleNumber: number) {
    this.canvas = null;
    this.ctx = null;
    this.animationFrameID = 0;
    this.particles = new Map();

    if (canvasID) {
      const htmlElement = document.getElementById(canvasID);
      this.canvas =
        htmlElement instanceof HTMLCanvasElement ? htmlElement : null;
    } else {
      this.canvas = document.getElementsByTagName('canvas')[0];
    }

    if (this.canvas !== null) {
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;

      this.ctx = this.canvas.getContext('2d');

      if (this.ctx !== null) {
        for (let i = 0; i < particleNumber; i++) {
          this.particles.set(i, new Particle(i, this.ctx));
        }
      }
    }
  }

  start(): void {
    if (this.canvas !== null && this.ctx !== null) {
      if (
        this.canvas.height !== window.innerHeight ||
        this.canvas.width !== window.innerWidth
      ) {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.particles.forEach(function (p) {
          p.resetPosition();
        });
      } else {
        this.ctx.clearRect(
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
        this.particles.forEach(function (p) {
          p.update();
        });
      }
      this.animationFrameID = window.requestAnimationFrame(
        this.start.bind(this)
      );
    }
  }

  stop(): void {
    window.cancelAnimationFrame(this.animationFrameID);
  }

  clear(): void {
    if (this.canvas !== null && this.ctx !== null) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      window.cancelAnimationFrame(this.animationFrameID);
    }
  }
}

export default ParticleAnimation;
