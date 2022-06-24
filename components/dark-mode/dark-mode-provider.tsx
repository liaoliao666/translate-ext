import { ReactNode, useLayoutEffect, useMemo } from "react"

import { useStorage } from "@plasmohq/storage"

import { DarkModeContext } from "./dark-mode-context"
import type { Theme } from "./types"
import useSystemTheme from "./use-system-theme"

export const DarkModeProvider: React.FC<{
  children: ReactNode
  target?: HTMLElement
}> = ({ children, target }) => {
  const [theme, setTheme] = useStorage<Theme>("theme", "auto")
  const systemTheme = useSystemTheme()
  const isDarkMode = (theme === "auto" ? systemTheme : theme) === "dark"

  useLayoutEffect(() => {
    const el = target || document.documentElement
    el.dataset.theme = isDarkMode ? "dark" : "light"
  }, [isDarkMode, target])

  const value = useMemo(() => {
    return {
      isDarkMode,
      theme,
      updateTheme: setTheme
    }
  }, [theme])

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeProvider
