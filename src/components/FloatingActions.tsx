import type { Dictionary } from '@/i18n'

interface FloatingActionsProps {
  whatsapp?: string
  video?: {
    videoUrl?: string
    label?: string
  }
  t: Dictionary['floating']
}

export default function FloatingActions({ whatsapp, video, t }: FloatingActionsProps) {
  const whatsappNumber = (whatsapp ?? '255768500555').replace(/[^0-9]/g, '')
  const videoLabel = video?.label || t.watchVideo

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {video?.videoUrl && (
        <a
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={videoLabel}
          title={videoLabel}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-navy text-gold shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-navy-light"
        >
          <PlayIcon />
        </a>
      )}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp}
        title={t.whatsapp}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105"
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.15-1.35a9.96 9.96 0 0 0 4.89 1.25h.01c5.52 0 10-4.48 10-10s-4.48-9.9-10.01-9.9zm5.86 14.24c-.25.7-1.45 1.34-2 1.43-.51.08-1.16.11-1.87-.12-.43-.13-.98-.32-1.69-.62-2.97-1.28-4.9-4.28-5.05-4.48-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.17 1.04-2.47.27-.3.6-.37.8-.37s.4 0 .57.01c.19.01.43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.54-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.08.13.08.72-.17 1.42z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
