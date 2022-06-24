import { useEffect, useState } from "react"

import type { SystemTheme } from "./types"

const getMql = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")

const getSystemTheme = (matches: boolean): SystemTheme =>
  matches ? "dark" : "light"

const getDefaultSystemTheme = (): SystemTheme => {
  const mql = getMql()
  return mql ? getSystemTheme(mql.matches) : "light"
}

const useTheme = () => {
  const defaultTheme = getDefaultSystemTheme()
  const [systemTheme, setSystemTheme] = useState<SystemTheme>(defaultTheme)
  useEffect(() => {
    const mql = getMql()
    const mqlListener = (e: any) => setSystemTheme(getSystemTheme(e.matches))
    if (mql) {
      setSystemTheme(getSystemTheme(mql.matches))
      mql.addEventListener("change", mqlListener)
    }
    return () => mql && mql.removeEventListener("change", mqlListener)
  }, [])
  return systemTheme
}

export default useTheme
