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
  /** Resting depth in [0.35, 0.9]; 0 = far, 1 = close. */
  baseZ: number
  /** Current depth, eased toward baseZ + cursor bulge. */
  z: number

  constructor(bounds: Bounds, opts: ParticleOptions = {}) {
    const maxSpeed = opts.maxSpeed ?? 0.25
    this.x = Math.random() * bounds.width
    this.y = Math.random() * bounds.height
    this.vx = (Math.random() - 0.5) * 2 * maxSpeed
    this.vy = (Math.random() - 0.5) * 2 * maxSpeed
    this.radius = opts.radius ?? 1.6
    this.baseZ = 0.35 + Math.random() * 0.55
    this.z = this.baseZ
  }

  update(bounds: Bounds, cursor: Cursor, cursorRadius: number) {
    let zTarget = this.baseZ
    if (cursor.active) {
      const dx = this.x - cursor.x
      const dy = this.y - cursor.y
      const distSq = dx * dx + dy * dy
      const radiusSq = cursorRadius * cursorRadius
      if (distSq > 0 && distSq < radiusSq) {
        const dist = Math.sqrt(distSq)
        const t = 1 - dist / cursorRadius
        zTarget = Math.min(1, this.baseZ + t * 0.55)
        const force = t * 0.35
        this.vx += (dx / dist) * force
        this.vy += (dy / dist) * force
      }
    }
    this.z += (zTarget - this.z) * 0.12

    const speed = Math.hypot(this.vx, this.vy)
    if (speed > MAX_VELOCITY) {
      this.vx = (this.vx / speed) * MAX_VELOCITY
      this.vy = (this.vy / speed) * MAX_VELOCITY
    }

    // Motion parallax: near particles drift faster than far ones.
    const parallax = 0.35 + this.z * 1.1
    this.x += this.vx * parallax
    this.y += this.vy * parallax

    if (this.x < 0) this.x += bounds.width
    else if (this.x > bounds.width) this.x -= bounds.width
    if (this.y < 0) this.y += bounds.height
    else if (this.y > bounds.height) this.y -= bounds.height
  }

  draw(ctx: CanvasRenderingContext2D) {
    const scale = 0.2 + this.z * 1.6
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * scale, 0, Math.PI * 2)
    ctx.fill()
  }
}
