import clsx from "clsx"
import { type ReactNode, useMemo } from "react"

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

  const value = useMemo(() => {
    return {
      isDarkMode,
      theme,
      updateTheme: setTheme
    }
  }, [theme])

  return (
    <DarkModeContext.Provider value={value}>
      <div className={clsx(isDarkMode && "dark")}>{children}</div>
    </DarkModeContext.Provider>
  )
}

export default DarkModeProvider
