export interface Bounds {
  width: number
  height: number
}

export interface Cursor {
  x: number
  y: number
  active: boolean
}

export interface ParticleOptions {
  maxSpeed?: number
  radius?: number
}

const MAX_VELOCITY = 1.2

export class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number

  constructor(bounds: Bounds, opts: ParticleOptions = {}) {
    const maxSpeed = opts.maxSpeed ?? 0.25
    this.x = Math.random() * bounds.width
    this.y = Math.random() * bounds.height
    this.vx = (Math.random() - 0.5) * 2 * maxSpeed
    this.vy = (Math.random() - 0.5) * 2 * maxSpeed
    this.radius = opts.radius ?? 1.6
  }

  update(bounds: Bounds, cursor: Cursor, cursorRadius: number) {
    if (cursor.active) {
      const dx = this.x - cursor.x
      const dy = this.y - cursor.y
      const distSq = dx * dx + dy * dy
      const radiusSq = cursorRadius * cursorRadius
      if (distSq > 0 && distSq < radiusSq) {
        const dist = Math.sqrt(distSq)
        const force = (1 - dist / cursorRadius) * 0.35
        this.vx += (dx / dist) * force
        this.vy += (dy / dist) * force
      }
    }

    const speed = Math.hypot(this.vx, this.vy)
    if (speed > MAX_VELOCITY) {
      this.vx = (this.vx / speed) * MAX_VELOCITY
      this.vy = (this.vy / speed) * MAX_VELOCITY
    }

    this.x += this.vx
    this.y += this.vy

    if (this.x < 0) this.x += bounds.width
    else if (this.x > bounds.width) this.x -= bounds.width
    if (this.y < 0) this.y += bounds.height
    else if (this.y > bounds.height) this.y -= bounds.height
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}
