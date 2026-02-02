import PhaseCircle from './PhaseCircle'
import { usePhasesStore } from '../store/phasesStore'
import { ArrowLeft, ArrowRight, CodeIcon } from 'lucide-react'
import ArtIcon from './icons/ArtIcon.jsx'
import SearchIcon from './icons/SearchIcon.jsx'

const ServicePhases = ({ phasesData, labels }) => {
  const currentPhase = usePhasesStore((state) => state.currentPhase)
  const setCurrentPhase = usePhasesStore((state) => state.setCurrentPhase)

  const phases = phasesData.map((phase) => phase.id)
  const currentIndex = phases.indexOf(currentPhase ?? '1')
  const currentPhaseData = phasesData[currentIndex] ?? phasesData[0]
  const currentPhaseId = currentPhase ?? currentPhaseData?.id ?? '1'
  const currentPhaseSummary = `${labels.phaseLabel} ${currentPhaseId}. ${currentPhaseData.title}. ${currentPhaseData.subtitle}. ${currentPhaseData.tagline}. ${labels.helpsTitle}: ${currentPhaseData.helps.join(', ')}. ${labels.deliverablesTitle}: ${currentPhaseData.deliverables.join(', ')}.`

  const setPhaseByIndex = (nextIndex) => {
    const safeIndex = (nextIndex + phases.length) % phases.length
    setCurrentPhase(phases[safeIndex])
  }

  const handleArrowKey = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setPhaseByIndex(currentIndex - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setPhaseByIndex(currentIndex + 1)
    }
  }

  return (
    <section
      className="flex flex-col-reverse md:grid md:grid-cols-2 gap-24 md:gap-16 items-center"
      aria-labelledby="service-phases-title"
      aria-describedby="service-phases-tagline"
    >
      {/* contenedor de fases flotantes */}
      <div className="relative flex items-center justify-center md:h-100">
        <div className="absolute z-10 left-0 bottom-0 hidden md:flex flex-col items-center justify-center">
          <PhaseCircle
            icon={<CodeIcon className="w-8 h-8 text-(--surface-secundary)" />}
            phase="1"
            className="relative before:content-[''] before:absolute before:z-0 before:inset-0 before:bg-(--text-primary) before:h-51 md:before:h-56 before:-top-50 before:left-32 md:before:left-38 before:w-px before:rotate-28 md:before:rotate-34"
            label={labels.phaseLabel}
            ariaLabelPrefix={labels.selectPhaseAria}
          />
        </div>
        <div className="absolute z-20 left-[34%] top-0 hidden md:flex flex-col items-center justify-center">
          <PhaseCircle
            icon={<ArtIcon className="w-8 h-8 text-(--surface-secundary)" />}
            phase="2"
            label={labels.phaseLabel}
            ariaLabelPrefix={labels.selectPhaseAria}
          />
        </div>
        <div className="absolute z-10 right-0 md:right-10 bottom-34 hidden md:flex flex-col items-center justify-center">
          <PhaseCircle
            icon={<SearchIcon className="w-8 h-8 text-(--surface-secundary)" />}
            phase="3"
            className="relative z-10 before:content-[''] before:absolute before:z-0 before:inset-0 before:bg-(--text-primary) before:h-24 md:before:h-38 before:-top-16 md:before:-top-20 before:-left-4 md:before:-left-15 before:w-px before:-rotate-48 md:before:-rotate-58"
            label={labels.phaseLabel}
            ariaLabelPrefix={labels.selectPhaseAria}
          />
        </div>
        <div
          className="absolute bottom-10 md:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6"
          role="group"
          aria-label={labels.navigationAria}
        >
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-(--text-secundary) hover:text-(--color-primary) transition-all duration-300 bg-white/1 backdrop-blur-md shadow-[inset_0_0_4px_rgba(255,255,255,0.6),0_4px_0px_rgba(0,0,0,0.05)]  border border-(--color-border) hover:bg-white/8"
            onClick={() => setPhaseByIndex(currentIndex - 1)}
            onKeyDown={handleArrowKey}
            aria-label={labels.prevAria}
            type="button"
          >
            <ArrowLeft />
          </button>

          <div className="px-4 w-20 py-2 rounded-xl text-(--color-primary) border border-(--color-border) bg-(--surface-secundary)/40 backdrop-blur-md shadow-[inset_0_0_4px_rgba(255,255,255,0.6)] text-xs text-center">
            {labels.phaseLabel} {currentPhase ?? '1'}
          </div>

          <button
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-(--text-secundary) hover:text-(--color-primary) transition-all duration-300 bg-white/1 backdrop-blur-md shadow-[inset_0_0_4px_rgba(255,255,255,0.6),0_4px_0px_rgba(0,0,0,0.05)] border border-(--color-border) hover:bg-white/8"
            onClick={() => setPhaseByIndex(currentIndex + 1)}
            onKeyDown={handleArrowKey}
            aria-label={labels.nextAria}
            type="button"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* seccion de descripcion de fase */}
      <div className="h-105 w-full relative flex flex-col justify-center items-center gap-4 md:gap-6 pb-8">
        {/* solo para lectores de pantalla */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {currentPhaseSummary}
        </p>
        <img
          src="/gfx.svg"
          alt=""
          className="gfx-sway w-full h-full absolute left-0 top-0"
          aria-hidden="true"
        />
        <h3
          id="service-phases-title"
          className="text-lg md:text-xl font-semibold text-(--color-primary) text-center flex flex-col gap-1"
        >
          {currentPhaseData.title}{' '}
          <span className="text-base md:text-lg">{currentPhaseData.subtitle}</span>
        </h3>

        <p id="service-phases-tagline" className="text-(--text-secundary) text-sm md:text-lg">
          {currentPhaseData.tagline}
        </p>

        <div className="max-w-70 md:max-w-90 w-full">
          <p className="mb-2 text-(--color-primary) font-medium">{labels.helpsTitle}</p>
          <ul className="list-disc list-inside space-y-1 text-(--text-secundary) text-sm">
            {currentPhaseData.helps.map((helpItem) => (
              <li key={helpItem}>{helpItem}</li>
            ))}
          </ul>
        </div>

        <div className="">
          <p className="mb-2 text-(--color-primary) font-medium">{labels.deliverablesTitle}</p>
          <div className="flex flex-wrap justify-center max-w-70 md:max-w-90 gap-3 text-[12px] text-(--text-secundary)">
            {currentPhaseData.deliverables.map((deliverable) => (
              <span
                key={deliverable}
                className="px-3 py-1 border border-(--color-border) rounded-full"
              >
                {deliverable}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes gfxSway {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        .gfx-sway {
          animation: gfxSway 6s ease-in-out infinite;
          transform-origin: center;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .gfx-sway {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}

export default ServicePhases
