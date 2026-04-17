import { Particle, type Bounds, type Cursor } from './Particle'

export interface ParticleNetworkOptions {
  /** Particles per pixel² — tuned so density scales with area. */
  density?: number
  /** Hard cap so huge viewports stay cheap. */
  maxParticles?: number
  /** Max distance at which two particles draw a connection. */
  linkDistance?: number
  /** Radius within which the cursor repels particles. */
  cursorRadius?: number
}

type RequiredOptions = Required<ParticleNetworkOptions>

const DEFAULTS: RequiredOptions = {
  density: 0.00012,
  maxParticles: 90,
  linkDistance: 130,
  cursorRadius: 140,
}

export class ParticleNetwork {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private particles: Particle[] = []
  private rafId = 0
  private running = false
  private reducedMotion = false
  private bounds: Bounds = { width: 0, height: 0 }
  private dpr = 1
  private color = 'rgb(60, 207, 99)'
  private cursor: Cursor = { x: -9999, y: -9999, active: false }

  private resizeObserver: ResizeObserver | null = null
  private onVisibilityChange = () => {
    if (!this.canvas) return
    if (document.hidden) this.stop()
    else if (!this.reducedMotion) this.start()
  }

  private readonly opts: RequiredOptions

  constructor(opts: ParticleNetworkOptions = {}) {
    this.opts = { ...DEFAULTS, ...opts }
  }

  mount(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    if (!this.ctx) return

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)

    this.resize()

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(canvas)
    document.addEventListener('visibilitychange', this.onVisibilityChange)

    if (this.reducedMotion) {
      this.render()
    } else {
      this.start()
    }
  }

  destroy() {
    this.stop()
    this.resizeObserver?.disconnect()
    this.resizeObserver = null
    document.removeEventListener('visibilitychange', this.onVisibilityChange)
    this.particles = []
    this.canvas = null
    this.ctx = null
  }

  setCursor(x: number | null, y: number | null) {
    if (x === null || y === null) {
      this.cursor.active = false
      return
    }
    this.cursor.x = x
    this.cursor.y = y
    this.cursor.active = true
  }

  setColor(color: string) {
    this.color = color
  }

  private start() {
    if (this.running || !this.ctx) return
    this.running = true
    const loop = () => {
      if (!this.running) return
      this.tick()
      this.rafId = requestAnimationFrame(loop)
    }
    this.rafId = requestAnimationFrame(loop)
  }

  private stop() {
    this.running = false
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.rafId = 0
  }

  private resize() {
    if (!this.canvas || !this.ctx) return
    const rect = this.canvas.getBoundingClientRect()
    this.bounds = { width: rect.width, height: rect.height }
    this.canvas.width = Math.max(1, Math.round(rect.width * this.dpr))
    this.canvas.height = Math.max(1, Math.round(rect.height * this.dpr))
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.seedParticles()
    if (this.reducedMotion) this.render()
  }

  private seedParticles() {
    const target = Math.min(
      Math.round(this.bounds.width * this.bounds.height * this.opts.density),
      this.opts.maxParticles,
    )
    if (this.particles.length === target) return
    if (this.particles.length < target) {
      while (this.particles.length < target) {
        this.particles.push(new Particle(this.bounds))
      }
    } else {
      this.particles.length = target
    }
  }

  private tick() {
    for (const particle of this.particles) {
      particle.update(this.bounds, this.cursor, this.opts.cursorRadius)
    }
    this.render()
  }

  private render() {
    if (!this.ctx) return
    const ctx = this.ctx

    ctx.clearRect(0, 0, this.bounds.width, this.bounds.height)

    this.renderConnections(ctx)
    this.renderParticles(ctx)
  }

  private renderConnections(ctx: CanvasRenderingContext2D) {
    const linkDist = this.opts.linkDistance
    const linkDistSq = linkDist * linkDist
    const cursorRadius = this.opts.cursorRadius

    ctx.strokeStyle = this.color
    ctx.lineWidth = 1

    for (let i = 0; i < this.particles.length; i++) {
      const a = this.particles[i]!
      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j]!
        const dx = a.x - b.x
        const dy = a.y - b.y
        const distSq = dx * dx + dy * dy
        if (distSq >= linkDistSq) continue

        const dist = Math.sqrt(distSq)
        let alpha = 1 - dist / linkDist

        if (this.cursor.active) {
          const mx = (a.x + b.x) * 0.5
          const my = (a.y + b.y) * 0.5
          const cdist = Math.hypot(mx - this.cursor.x, my - this.cursor.y)
          const boost = Math.max(0, 1 - cdist / cursorRadius) * 0.55
          alpha = Math.min(1, alpha + boost)
        }

        ctx.globalAlpha = alpha * 0.5
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }

    ctx.globalAlpha = 1
  }

  private renderParticles(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.globalAlpha = 0.85
    for (const particle of this.particles) {
      particle.draw(ctx)
    }
    ctx.globalAlpha = 1
  }
}
