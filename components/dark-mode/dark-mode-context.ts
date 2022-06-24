import { createContext } from "react"

import type { Theme } from "./types"

export const DarkModeContext = createContext<{
  isDarkMode: boolean
  theme: Theme
  updateTheme: (theme: Theme) => void
}>(null)
