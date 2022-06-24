import { atomWithStorage, createJSONStorage } from "jotai/utils"

import { Storage } from "@plasmohq/storage"

export const atomWithAsyncStorage = <T>(
  key,
  initialValue: T,
  {
    storageArea = "local",
    secretKeyList
  }: {
    storageArea?: "sync" | "local" | "managed" | "session"
    secretKeyList?: string[]
  } = {}
) => {
  const asyncStorage: any = new Storage(storageArea, secretKeyList)
  const storage: any = createJSONStorage(() => ({
    setItem: asyncStorage.set,
    getItem: asyncStorage.get,
    removeItem: asyncStorage.remove
  }))

  return atomWithStorage<T>(key, initialValue, storage)
}
