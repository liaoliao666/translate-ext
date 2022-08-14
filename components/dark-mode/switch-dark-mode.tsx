import { autoUpdate, offset, shift, useFloating } from "@floating-ui/react-dom"
import { useContext, useState } from "react"
import { createPortal } from "react-dom"
import { useEvent } from "react-use"

import { floatingContainer } from "~/utils/container"

import { DarkModeContext } from "./dark-mode-context"
import {
  AutoActiveIcon,
  AutoInActiveIcon,
  DarkActiveIcon,
  DarkInActiveIcon,
  LightActiveIcon,
  LightInActiveIcon
} from "./icons"
import type { Theme } from "./types"

const options: {
  aciveIcon: React.ReactElement
  inactiveIcon: React.ReactElement
  label: string
  value: Theme
}[] = [
  {
    aciveIcon: <LightActiveIcon />,
    inactiveIcon: <LightInActiveIcon />,
    label: "浅色",
    value: "light"
  },
  {
    aciveIcon: <DarkActiveIcon />,
    inactiveIcon: <DarkInActiveIcon />,
    label: "深色",
    value: "dark"
  },
  {
    aciveIcon: <AutoActiveIcon />,
    inactiveIcon: <AutoInActiveIcon />,
    label: "自动",
    value: "auto"
  }
]

const SwitchDarkMode = () => {
  const { updateTheme, theme, isDarkMode } = useContext(DarkModeContext)

  const SwitchIcon = isDarkMode ? DarkActiveIcon : LightActiveIcon

  const [isOpen, setIsOpen] = useState(false)

  const { x, y, reference, floating, strategy, refs } = useFloating({
    whileElementsMounted: isOpen ? autoUpdate : undefined,
    middleware: [offset(8), shift()]
  })

  useEvent("mouseup", async (ev) => {
    setIsOpen(false)
  })

  return (
    <>
      <span
        ref={reference}
        className="text-2xl inline-block align-middle cursor-pointer hover:opacity-80">
        <SwitchIcon
          onClick={() => {
            setIsOpen(true)
          }}
        />
      </span>

      {createPortal(
        isOpen && (
          <div
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 10051
            }}
            onMouseUp={(ev) => ev.stopPropagation()}
            className="bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300">
            {options.map((item) => (
              <div
                key={item.value}
                className="py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600/30"
                onClick={() => {
                  updateTheme(item.value)
                  setIsOpen(false)
                }}>
                <span className="text-2xl mr-2">
                  {item.value === theme ? item.aciveIcon : item.inactiveIcon}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        ),
        floatingContainer
      )}
    </>
  )
}

export default SwitchDarkMode
