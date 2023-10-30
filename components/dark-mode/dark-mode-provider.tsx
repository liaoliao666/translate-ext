import { type ReactNode, useMemo } from "react"

import { useStorage } from "@plasmohq/storage"

import { DarkModeContext } from "./dark-mode-context"
import type { Theme } from "./types"
import useSystemTheme from "./use-system-theme"

export const DarkModeProvider: React.FC<{
  children: ReactNode
  target: HTMLElement
}> = ({ children, target }) => {
  const [theme, setTheme] = useStorage<Theme>("theme", "auto")
  const systemTheme = useSystemTheme()
  const isDarkMode = (theme === "auto" ? systemTheme : theme) === "dark"

  const value = useMemo(() => {
    const currTheme = isDarkMode ? "dark" : "light";
    const prevTheme = currTheme === "light" ? "dark" : "light";

    target.classList.remove(prevTheme);
    target.classList.add(currTheme);

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
