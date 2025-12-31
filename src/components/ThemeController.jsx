import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ThemeController = () => {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('ekou-theme')
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme)

  useEffect(() => {
    const themeClass = isDarkMode ? 'dark-mode' : 'light-mode'
    document.body.classList.remove('dark-mode', 'light-mode')
    document.documentElement.classList.remove('dark-mode', 'light-mode')
    document.body.classList.add(themeClass)
    document.documentElement.classList.add(themeClass)
    localStorage.setItem('ekou-theme', isDarkMode ? 'dark' : 'light')
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
