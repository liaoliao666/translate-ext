import { HeartIcon } from "@heroicons/react/solid"
import clsx from "clsx"
import { useAtom } from "jotai"

import { collectedWordsAtom } from "~store/collected-words"

export default function AddWord({ word }: { word: string }) {
  const [collectedWords, setCollectedWords] = useAtom(collectedWordsAtom)
  const hadCollected =
    collectedWords.includes(word) ||
    collectedWords.includes(word.toLocaleLowerCase())

  return (
    <HeartIcon
      className={clsx(
        hadCollected ? "text-[#fadb14]" : "text-slate-400 dark:text-slate-500",
        "w-6 h-6 hover:opacity-80 cursor-pointer"
      )}
      onClick={() => {
        setCollectedWords(
          hadCollected
            ? collectedWords.filter((w) => w !== word)
            : [...collectedWords, word]
        )
      }}
    />
  )
}
