import { NextUIProvider } from "@nextui-org/react"
import cssText from "data-text:~/style.css"
import type { PlasmoCSConfig } from "plasmo"
import { QueryClient, QueryClientProvider } from "react-query"
import "webextension-polyfill"

import DarkModeProvider from "~components/dark-mode/dark-mode-provider"
import TranslateWidget from "~components/translate-widget"
import { sendRequest } from "~messages"
import { container, floatingContainer } from "~utils/container"
import { request } from "~utils/request"

request.defaultConfig({ adapter: sendRequest })

const shadowBody = document.createElement("div")

export const getRootContainer = () => {
  const shadowHost = document.createElement("div")
  const shadowRoot = shadowHost.attachShadow({ mode: "open" })
  const style = document.createElement("style")
  style.textContent = cssText
  shadowRoot.appendChild(style)
  shadowBody.appendChild(container)
  shadowBody.appendChild(floatingContainer)
  shadowRoot.appendChild(shadowBody)
  document.body.appendChild(shadowHost)
  return container
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <DarkModeProvider target={shadowBody}>
          <TranslateWidget />
        </DarkModeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  // matches: ["https://nextui.org/*", "https://github.com/*"],
  all_frames: true
}

export default App
