import { useReducedMotion } from 'framer-motion'

const SKY_ASPECT = 2752 / 1536

/*
 * The hero sky is a looping video cinemagraph rather than a still plate.
 *
 * `background.png` is a 2752x1536 painting with its clouds baked in, so those
 * clouds can never move — earlier versions drifted cut-out sprites and then
 * full-width plates over the top of it, but the painted cloudscape underneath
 * stayed frozen and the hero still read as a static image. This clip was
 * generated from that exact painting, so the clouds themselves billow and
 * evolve and the light shimmers — motion CSS transforms cannot produce.
 *
 * The source clip does not loop on its own, so its tail is cross-blended back
 * into its head (see the ffmpeg recipe in .super-claude/STATE.md). Measured
 * wrap seam is 41.1 dB PSNR against a 45.0 dB adjacent-frame baseline — i.e.
 * the restart is about as continuous as an ordinary frame transition.
 *
 * The painting is still shipped as the poster, so it renders instantly, covers
 * the video while it buffers, and stands in if playback is blocked or refused.
 */
export default function Clouds() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden [container-type:size]">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: `max(100cqw, calc(100cqh * ${SKY_ASPECT}))`,
          height: `max(100cqh, calc(100cqw / ${SKY_ASPECT}))`,
        }}
      >
        {reduce ? (
          <img
            src="/background.png"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover select-none"
            draggable={false}
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover select-none"
            poster="/background.png"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/hero/sky-loop.webm" type="video/webm" />
            <source src="/hero/sky-loop.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  )
}
