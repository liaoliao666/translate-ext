import { isFirefox } from "~utils/browser"
import type { Phonetic } from "~utils/translator"

import { atomWithAsyncStorage } from "./helper"

export interface Settings {
  autoplay: Phonetic | "none"
  sentenceTranslator: "google"
  wordTranslator: "google" | "bing"
  definition: boolean
}

export const settingsAtom = atomWithAsyncStorage<Settings>(
  "settings",
  {
    autoplay: "en-US",
    sentenceTranslator: "google",
    wordTranslator: "bing",
    definition: true
  },
  {
    storageArea: isFirefox() ? "local" : "sync"
  }
)
