import { usePhasesStore } from '../store/phasesStore'

const PhaseCircle = ({ icon, phase, className, label, ariaLabelPrefix }) => {
  const currentPhase = usePhasesStore((state) => state.currentPhase)
  const setCurrentPhase = usePhasesStore((state) => state.setCurrentPhase)

  const isActive = currentPhase === phase
  const handleClick = () => setCurrentPhase(phase)
  const ariaLabelBase = ariaLabelPrefix || label || ''
  const ariaLabel = ariaLabelBase ? `${ariaLabelBase} ${phase}` : String(phase)
  const phaseNumber = Number(phase)
  const floatDelay = Number.isFinite(phaseNumber) ? `${(phaseNumber - 1) * 0.6}s` : '0s'
  const floatDuration = Number.isFinite(phaseNumber) ? `${4.8 + (phaseNumber % 3) * 0.7}s` : '5.2s'
  const floatDistance = Number.isFinite(phaseNumber) ? `${6 + (phaseNumber % 3) * 2}px` : '8px'

  return (
    <div
      className="phase-float flex flex-col items-center"
      style={{
        '--float-delay': floatDelay,
        '--float-duration': floatDuration,
        '--float-distance': floatDistance,
      }}
    >
      <button
        type="button"
        className={`group w-30 md:w-32 h-30 md:h-32 relative rounded-full border border-(--text-primary) bg-(--surface-primary) flex items-center justify-center hover:scale-105 transition ${isActive ? 'scale-107' : ''} ${className}`}
        onClick={handleClick}
        aria-pressed={isActive}
        aria-label={ariaLabel}
      >
        <div
          className={`w-20 md:w-24 h-20 md:h-24 rounded-full bg-(--text-secundary) flex items-center justify-center text-(--text-secundary) shadow-[0_0_10px_var(--text-secundary)] group-hover:shadow-[0_0_15px_var(--text-secundary)] transition-transform group-hover:scale-105 
            ${isActive ? 'shadow-[0_0_20px_var(--text-secundary)] scale-105' : ''}`}
        >
          {icon}
        </div>
      </button>
      <span className="px-3 mt-3 py-1 text-xs rounded-full border border-(--color-border) bg-(--surface-secundary)/40 text-(--text-primary) tracking-wide">
        {`${label} ${phase}`}
      </span>
      <style>{`
        @keyframes phaseFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(var(--float-distance, 8px) * -1));
          }
        }

        .phase-float {
          animation: phaseFloat var(--float-duration, 5s) ease-in-out infinite;
          animation-delay: var(--float-delay, 0s);
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .phase-float {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default PhaseCircle
