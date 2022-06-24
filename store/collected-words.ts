import { atomWithAsyncStorage } from "./helper"

export const collectedWordsAtom = atomWithAsyncStorage<string[]>(
  "collectedWords",
  [],
  {
    storageArea: "sync"
  }
)
