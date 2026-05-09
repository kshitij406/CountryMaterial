'use client'

/**
 * HeroCanvas — cinematic animated canvas background for HeroSection.
 *
 * Four industrial "scenes" cycle every 20 s (5 s hold + 1.4 s crossfade each):
 *   0  Warehouse  — amber shaft from upper-left, horizontal shelf shadows
 *   1  Dusty road — warm horizon glow at lower-centre, vanishing-point lines
 *   2  Industrial yard — side glow from upper-right, vertical pillar overlays
 *   3  Port at dusk — low golden horizon, blocky skyline silhouette
 *
 * Shared atmospheric layer: dust motes, rotating light rays, cinematic vignette.
 * Ken Burns: continuous slow sinusoidal pan + subtle zoom on structural overlays.
 *
 * No dependencies beyond React — pure Canvas 2D API.
 */

import { useEffect, useRef } from 'react'

// ── Scene descriptors ───────────────────────────────────────────────────────
// lx/ly: light-source position in normalised canvas coords (0–1)
// gr/gg/gb: warm accent colour (close to brand gold #2E6FA3)
// intensity: ambient glow strength (0–1)
const SCENES = [
  { lx: 0.22, ly: 0.16, gr: 200, gg: 145, gb: 44, intensity: 0.50 },  // warehouse
  { lx: 0.55, ly: 0.86, gr: 208, gg: 118, gb: 28, intensity: 0.64 },  // dusty road
  { lx: 0.84, ly: 0.33, gr: 195, gg: 132, gb: 36, intensity: 0.44 },  // industrial
  { lx: 0.38, ly: 0.73, gr: 204, gg: 138, gb: 40, intensity: 0.58 },  // port dusk
] as const

type Scene = (typeof SCENES)[number]

const SCENE_MS   = 5000                       // ms each scene holds
const FADE_MS    = 1400                       // ms crossfade between scenes
const TOTAL_MS   = SCENE_MS * SCENES.length   // 20 000 ms full loop
const N_DUST     = 65                         // floating particle count

interface Dust {
  x: number   // normalised 0–1
  y: number
  vx: number
  vy: number
  r: number   // radius px
  ma: number  // max alpha
  ph: number  // sine phase offset
}

// ── Helper: ambient warm light for one scene ────────────────────────────────
function paintLight(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  s: Scene,
  alpha: number,
) {
  if (alpha <= 0) return
  ctx.save()
  ctx.globalAlpha = alpha

  const lx = s.lx * W
  const ly = s.ly * H

  // Broad ambient glow radiating from the light source
  {
    const spread = Math.hypot(W, H) * 0.82
    const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, spread)
    g.addColorStop(0,    `rgba(${s.gr},${s.gg},${s.gb},${s.intensity})`)
    g.addColorStop(0.22, `rgba(${Math.round(s.gr * 0.72)},${Math.round(s.gg * 0.50)},${Math.round(s.gb * 0.32)},${(s.intensity * 0.42).toFixed(2)})`)
    g.addColorStop(0.60, 'rgba(14,36,72,0.10)')
    g.addColorStop(1,    'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  // Tight bright core — the "lamp" or "sun"
  {
    const r = Math.min(W, H) * 0.17
    const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, r)
    g.addColorStop(0,   `rgba(255,218,120,${(s.intensity * 0.55).toFixed(2)})`)
    g.addColorStop(0.4, `rgba(${s.gr},${s.gg},${s.gb},${(s.intensity * 0.18).toFixed(2)})`)
    g.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  ctx.restore()
}

// ── Helper: scene-specific structural dark overlays ──────────────────────────
// Called inside the Ken Burns canvas transform so overlays pan + zoom.
// EW/EH are the expanded draw dimensions (larger than canvas) to avoid
// visible edges during Ken Burns movement.
function paintStructure(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  sceneIdx: number,
) {
  const PAD = 0.15
  const X  = -W * PAD
  const Y  = -H * PAD
  const EW =  W * (1 + PAD * 2)
  const EH =  H * (1 + PAD * 2)

  ctx.save()

  switch (sceneIdx) {
    case 0: {
      // Warehouse — horizontal shelf-shadow bands
      for (let i = 0; i < 7; i++) {
        const cy = Y + EH * (0.12 + i * 0.13)
        const g  = ctx.createLinearGradient(0, cy - 5, 0, cy + 5)
        g.addColorStop(0,   'rgba(3,9,20,0)')
        g.addColorStop(0.5, 'rgba(3,9,20,0.55)')
        g.addColorStop(1,   'rgba(3,9,20,0)')
        ctx.fillStyle = g
        ctx.fillRect(X, cy - 5, EW, 10)
      }
      break
    }

    case 1: {
      // Dusty road — dark ground plane + perspective vanishing lines
      {
        const g = ctx.createLinearGradient(0, H * 0.58, 0, H * 1.05)
        g.addColorStop(0, 'rgba(3,9,20,0)')
        g.addColorStop(1, 'rgba(3,9,20,0.74)')
        ctx.fillStyle = g
        ctx.fillRect(X, H * 0.58, EW, EH * 0.55)
      }
      ctx.save()
      ctx.globalAlpha = 0.14
      ctx.strokeStyle = 'rgb(3,9,20)'
      ctx.lineWidth   = 1.5
      const vx = W * 0.55
      const vy = H * 0.85
      for (let i = -6; i <= 6; i++) {
        ctx.beginPath()
        ctx.moveTo(vx, vy)
        ctx.lineTo(vx + i * W * 0.58, Y)
        ctx.stroke()
      }
      ctx.restore()
      break
    }

    case 2: {
      // Industrial yard — vertical pillar / column shapes
      for (let i = 0; i < 8; i++) {
        const px = X + EW * (0.03 + i * 0.13)
        const pw = EW * (0.022 + Math.abs(Math.sin(i * 1.73)) * 0.014)
        const g  = ctx.createLinearGradient(px, 0, px + pw, 0)
        g.addColorStop(0,    'rgba(3,9,20,0)')
        g.addColorStop(0.45, 'rgba(3,9,20,0.52)')
        g.addColorStop(1,    'rgba(3,9,20,0)')
        ctx.fillStyle = g
        ctx.fillRect(px, Y, pw, EH)
      }
      break
    }

    case 3: {
      // Port at dusk — dark horizon fill + blocky crane/building silhouettes
      {
        const g = ctx.createLinearGradient(0, H * 0.52, 0, H * 1.05)
        g.addColorStop(0, 'rgba(3,9,20,0)')
        g.addColorStop(1, 'rgba(4,11,25,0.72)')
        ctx.fillStyle = g
        ctx.fillRect(X, H * 0.52, EW, EH * 0.60)
      }
      // Industrial skyline as stacked rectangles (cranes, storage tanks, warehouses)
      const blocks = [
        { rx: 0.00, ry: 0.72, rw: 0.07, rh: 0.30 },
        { rx: 0.07, ry: 0.62, rw: 0.04, rh: 0.40 },
        { rx: 0.11, ry: 0.68, rw: 0.09, rh: 0.34 },
        { rx: 0.21, ry: 0.55, rw: 0.06, rh: 0.47 },
        { rx: 0.28, ry: 0.62, rw: 0.10, rh: 0.40 },
        { rx: 0.39, ry: 0.50, rw: 0.05, rh: 0.52 },
        { rx: 0.45, ry: 0.58, rw: 0.11, rh: 0.44 },
        { rx: 0.57, ry: 0.53, rw: 0.06, rh: 0.49 },
        { rx: 0.64, ry: 0.60, rw: 0.08, rh: 0.42 },
        { rx: 0.73, ry: 0.56, rw: 0.10, rh: 0.46 },
        { rx: 0.84, ry: 0.62, rw: 0.07, rh: 0.40 },
        { rx: 0.92, ry: 0.68, rw: 0.10, rh: 0.34 },
      ]
      ctx.fillStyle = 'rgba(4,11,25,0.86)'
      for (const b of blocks) {
        ctx.fillRect(
          X + b.rx * EW,
          Y + b.ry * EH,
          b.rw * EW,
          EH,                    // fill to bottom edge
        )
      }
      break
    }
  }

  ctx.restore()
}

// ── Helper: slow-rotating atmospheric light rays ────────────────────────────
function paintRays(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  s: Scene,
  elapsed: number,
  alpha: number,
) {
  if (alpha < 0.02) return
  ctx.save()
  ctx.globalAlpha = alpha * 0.28

  const lx   = s.lx * W
  const ly   = s.ly * H
  const len  = Math.hypot(W, H) * 1.15
  const time = elapsed * 0.00022

  for (let i = 0; i < 5; i++) {
    const ang    = time + (i / 5) * Math.PI * 2
    const spread = 0.014 + Math.sin(time * 0.7 + i) * 0.006
    const a1     = ang - spread
    const a2     = ang + spread

    ctx.beginPath()
    ctx.moveTo(lx, ly)
    ctx.lineTo(lx + Math.cos(a1) * len, ly + Math.sin(a1) * len)
    ctx.lineTo(lx + Math.cos(a2) * len, ly + Math.sin(a2) * len)
    ctx.closePath()

    const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, len)
    g.addColorStop(0,    `rgba(${s.gr},${s.gg},${s.gb},0.10)`)
    g.addColorStop(0.45, `rgba(${s.gr},${s.gg},${s.gb},0.03)`)
    g.addColorStop(1,    'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fill()
  }

  ctx.restore()
}

// ── Component ───────────────────────────────────────────────────────────────
export default function HeroCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Fit canvas to its CSS dimensions
    const fit = () => {
      canvas.width  = canvas.offsetWidth  || 1920
      canvas.height = canvas.offsetHeight || 1080
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(canvas)

    // Initialise dust particles
    const dust: Dust[] = Array.from({ length: N_DUST }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      vx: (Math.random() - 0.5) * 0.00007,
      vy: -(Math.random() * 0.00012 + 0.00003),
      r:  Math.random() * 1.5 + 0.3,
      ma: Math.random() * 0.28 + 0.05,
      ph: Math.random() * Math.PI * 2,
    }))

    const t0 = performance.now()
    let raf: number

    const render = (now: number) => {
      const W = canvas.width
      const H = canvas.height

      // Looped elapsed time (for scene cycling)
      const tLoop = (now - t0) % TOTAL_MS
      // Unbounded time (for Ken Burns — avoids discontinuity at loop reset)
      const tFree  = now - t0

      // ── Scene selection + crossfade ──────────────────────────────────
      const sceneF  = tLoop / SCENE_MS
      const si      = Math.floor(sceneF) % SCENES.length
      const ni      = (si + 1) % SCENES.length
      const phi     = sceneF % 1                        // 0→1 within current scene
      const fadeAt  = 1 - FADE_MS / SCENE_MS           // phase at which fade begins
      const fa      = phi > fadeAt                      // crossfade alpha 0→1
        ? (phi - fadeAt) / (1 - fadeAt)
        : 0

      // ── Ken Burns ─────────────────────────────────────────────────────
      // Continuous sinusoidal pan + subtle scale — no jump at scene boundary
      const kbOx = W  * 0.022 * Math.sin(tFree * 0.0000360)
      const kbOy = H  * 0.015 * Math.cos(tFree * 0.0000295)
      const kbS  = 1.018 + 0.016 * Math.sin(tFree * 0.0000235)

      // ── Base fill (navy) ──────────────────────────────────────────────
      ctx.fillStyle = 'rgb(11,29,58)'
      ctx.fillRect(0, 0, W, H)

      // ── Depth radial gradient — lighter mid, darker edges ─────────────
      {
        const g = ctx.createRadialGradient(W * 0.50, H * 0.42, 0, W * 0.50, H * 0.42, Math.hypot(W, H) * 0.70)
        g.addColorStop(0,    'rgba(20,48,90,0.88)')
        g.addColorStop(0.45, 'rgba(11,29,58,0.55)')
        g.addColorStop(1,    'rgba(3,9,20,0.95)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }

      // ── Scene warm lights (screen space — do NOT pan/zoom with KB) ────
      paintLight(ctx, W, H, SCENES[si],  1 - fa)
      if (fa > 0) paintLight(ctx, W, H, SCENES[ni], fa)

      // ── Structural overlays (Ken Burns transform space) ───────────────
      ctx.save()
      ctx.translate(W / 2, H / 2)
      ctx.scale(kbS, kbS)
      ctx.translate(-W / 2 + kbOx, -H / 2 + kbOy)
      paintStructure(ctx, W, H, si)
      ctx.restore()

      // ── Atmospheric light rays ────────────────────────────────────────
      paintRays(ctx, W, H, SCENES[si],  tFree, 1 - fa)
      if (fa > 0) paintRays(ctx, W, H, SCENES[ni], tFree, fa)

      // ── Dust particles ────────────────────────────────────────────────
      for (const p of dust) {
        p.x = (p.x + p.vx + 1) % 1
        p.y = (p.y + p.vy + 1) % 1
        const a = p.ma * (0.5 + 0.5 * Math.sin(tFree * 0.00078 + p.ph))
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,148,46,${a.toFixed(3)})`
        ctx.fill()
      }

      // ── Cinematic vignette (always last) ──────────────────────────────
      {
        const g = ctx.createRadialGradient(
          W * 0.5, H * 0.5, H * 0.22,
          W * 0.5, H * 0.5, Math.hypot(W, H) * 0.68,
        )
        g.addColorStop(0,    'rgba(0,0,0,0)')
        g.addColorStop(0.60, 'rgba(0,0,0,0.28)')
        g.addColorStop(1,    'rgba(0,0,0,0.82)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`.trim()}
      aria-hidden
    />
  )
}
