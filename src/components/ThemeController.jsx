import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ThemeController = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode'
  }, [isDarkMode])

  return (
    <>
      <button
        className={`cursor-pointer theme-toggle ${isDarkMode ? 'is-dark' : 'is-light'}`}
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle theme"
      >
        <span className="theme-icon theme-icon--moon">
          <Moon />
        </span>
        <span className="theme-icon theme-icon--sun">
          <Sun />
        </span>
      </button>

      <style>{`
        .theme-toggle {
          position: relative;
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .theme-icon {
          position: absolute;
          opacity: 0;
          transition: opacity 200ms ease, transform 200ms ease;
        }

        .theme-icon--moon {
          transform: translateX(-10px);
        }

        .theme-icon--sun {
          transform: translateX(10px);
        }

        .theme-toggle.is-dark .theme-icon--moon,
        .theme-toggle.is-light .theme-icon--sun {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </>
  )
}

export default ThemeController
