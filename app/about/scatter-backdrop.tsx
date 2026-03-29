/* eslint-disable @next/next/no-img-element -- many small static crops; native img keeps layout simple */
import icons from './about-icons.json'

type IconEntry = {
  src: string
  leftPct: number
  topPct: number
  widthPx: number
  natW: number
  natH: number
}

const list = icons as IconEntry[]

const SIZE_SCALE = 1.38
const MAX_VW = 22

// Remap a value from one range to another
function remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

// Find actual min/max of leftPct in the data
const leftValues = list.map(i => i.leftPct)
const leftMin = Math.min(...leftValues)
const leftMax = Math.max(...leftValues)

export function ScatterBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {list.map((icon, i) => {
        const w = Math.round(icon.widthPx * SIZE_SCALE)
        const isB2 = icon.src.includes('backdrop2')

        // Remap left to truly span 2%–98% of viewport width
        const spreadLeft = remap(icon.leftPct, leftMin, leftMax, 2, 98)

        // Expand vertical spread
        const spreadTop = isB2
          ? 55 + (icon.topPct - 50) * 2.2
          : icon.topPct * 1.1

        return (
          <img
            key={`${icon.src}-${i}`}
            src={icon.src}
            alt=""
            width={icon.natW}
            height={icon.natH}
            style={{
              position: 'absolute',
              left: `${spreadLeft}vw`,
              top: `${spreadTop}vh`,
              width: `min(${w}px, ${MAX_VW}vw)`,
              height: 'auto',
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.4))',
              opacity: 0.96,
            }}
          />
        )
      })}
    </div>
  )
}