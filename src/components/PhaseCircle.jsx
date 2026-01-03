import { usePhasesStore } from '../store/phasesStore'

const PhaseCircle = ({ icon, phase, className }) => {
  const currentPhase = usePhasesStore((state) => state.currentPhase)
  const setCurrentPhase = usePhasesStore((state) => state.setCurrentPhase)

  const isActive = currentPhase === phase
  const handleClick = () => setCurrentPhase(phase)

  return (
    <>
      <button
        type="button"
        className={`group w-30 md:w-32 h-30 md:h-32 relative rounded-full border border-(--text-color) bg-(--surface-primary) flex items-center justify-center hover:scale-105 transition ${isActive ? 'scale-107' : ''} ${className}`}
        onClick={handleClick}
        aria-pressed={isActive}
        aria-label={`Seleccionar fase ${phase}`}
      >
        <div
          className={`w-20 md:w-24 h-20 md:h-24 rounded-full bg-(--text-secundary) flex items-center justify-center text-(--text-secundary) group-hover:shadow-[0_0_15px_var(--text-secundary)] transition-transform group-hover:scale-105 ${isActive ? 'shadow-[0_0_20px_var(--text-secundary)] scale-105' : ''}`}
        >
          <img src={icon} alt={`Fase ${phase}`} className="w-8 h-8" />
        </div>
      </button>
      <span className="px-3 mt-3 py-1 text-xs rounded-full border border-(--color-border) bg-(--surface-secundary)/40 text-(--color-primary) tracking-wide">
        {`Fase ${phase}`}
      </span>
    </>
  )
}

export default PhaseCircle
