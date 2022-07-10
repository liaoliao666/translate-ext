import { isFirefox } from "~utils/browser"

import { atomWithAsyncStorage } from "./helper"

export const collectedWordsAtom = atomWithAsyncStorage<string[]>(
  "collectedWords",
  [],
  {
    storageArea: isFirefox() ? "local" : "sync"
  }
)
