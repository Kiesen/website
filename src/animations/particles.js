function Particle(id, ctx) {
  this.x = Math.floor(Math.random() * ctx.canvas.width)
  this.y = Math.floor(Math.random() * ctx.canvas.height)
  this.vx = Math.random() * 1 - 0.5
  this.vy = Math.random() * 1 - 0.5
  this.color = '#000'
  this.size = Math.random() * 1 + 0.3
  this.id = id
  this.ctx = ctx
}

Particle.prototype.draw = function() {
  this.ctx.beginPath()
  this.ctx.arc(this.x, this.y, this.size, 0, 360)
  this.ctx.fillStyle = this.color
  this.ctx.fill()
  this.ctx.closePath()
}

Particle.prototype.update = function() {
  if (this.y > this.ctx.canvas.height + this.size) {
    this.y = 0
  } else if (this.y < 0 - this.size) {
    this.y = this.ctx.canvas.height
  } else {
    this.y += this.vy
  }

  if (this.x > this.ctx.canvas.width + this.size) {
    this.x = 0
  } else if (this.x < 0 - this.size) {
    this.x = this.ctx.canvas.width
  } else {
    this.x += this.vx
  }

  this.draw()
}

Particle.prototype.resetPosition = function() {
  this.x = Math.floor(Math.random() * this.ctx.canvas.width)
  this.y = Math.floor(Math.random() * this.ctx.canvas.height)
  this.vx = Math.random() * 1 - 0.5
  this.vy = Math.random() * 1 - 0.5
}

function ParticleAnimation(canvasID = null, num = 500) {
  try {
    if (canvasID) {
      this.canvas = document.getElementById(canvasID)
    } else {
      this.canvas = document.getElementsByTagName('canvas')[0]
    }

    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth

    this.ctx = this.canvas.getContext('2d')
    this.animationFrameID = null
    this.particles = new Map()

    for (let i = 0; i < num; i++) {
      this.particles.set(i, new Particle(i, this.ctx))
    }
  } catch (error) {
    console.error(error)
  }
}

ParticleAnimation.prototype.start = function() {
  try {
    if (
      this.canvas.height !== window.innerHeight ||
      this.canvas.width !== window.innerWidth
    ) {
      this.canvas.height = window.innerHeight
      this.canvas.width = window.innerWidth
      this.particles.forEach(function(p) {
        p.resetPosition()
      })
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.particles.forEach(function(p) {
        p.update()
      })
    }
    this.animationFrameID = window.requestAnimationFrame(this.start.bind(this))
  } catch (error) {
    console.error(error)
  }
}

ParticleAnimation.prototype.stop = function() {
  window.cancelAnimationFrame(this.animationFrameID)
}

ParticleAnimation.prototype.clear = function() {
  try {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    window.cancelAnimationFrame(this.animationFrameID)
  } catch (error) {
    console.error(error)
  }
}

export default ParticleAnimation
