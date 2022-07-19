import { AdjustmentsIcon, InformationCircleIcon } from "@heroicons/react/solid"
import clsx from "clsx"
import { useAtom } from "jotai"
import { find, isEmpty } from "lodash-es"
import { useEffect } from "react"
import { useState } from "react"
import type { ReactNode } from "react"
import { useQuery } from "react-query"

import { bingTranslator, googleTranslator } from "~/utils/translator"
import { isWord } from "~/utils/validators"
import SwitchDarkMode from "~components/dark-mode/switch-dark-mode"
import { settingsAtom } from "~store/settings"

import AddWord from "./add-word"
import { GitHubIcon, UKIcon, USIcon } from "./icons"
import { playSound } from "./play-sound"
import SettingsForm from "./settings-form"
import TrancateDefs from "./trancate-defs"

const translators = {
  bing: bingTranslator,
  google: googleTranslator
} as const

interface TranslatePannelProps {
  word: string
  backButton: ReactNode
}

const TranslatePannel: React.FC<TranslatePannelProps> = ({
  word,
  backButton
}) => {
  const [settings, setSettings] = useAtom(settingsAtom)

  const [isOpenSettingsForm, setIsOpenSettingsForm] = useState(false)

  const { data } = useQuery(
    [
      "translate",
      word,
      isWord(word)
        ? { wordTranslator: settings.wordTranslator }
        : { sentenceTranslator: settings.sentenceTranslator }
    ],
    async () => {
      let errorMessage: string | undefined

      if (isWord(word)) {
        try {
          return {
            ...(await translators[settings.wordTranslator].translate(word)),
            translator: settings.wordTranslator
          } as const
        } catch (error) {
          errorMessage = `${error.message}，或请在设置中改用其他查词服务`
        }
      }

      return {
        ...(await translators[settings.sentenceTranslator].translate(word)),
        translator: settings.sentenceTranslator,
        errorMessage
      } as const
    },
    {
      enabled: !!word,
      suspense: true,
      staleTime: Infinity,
      cacheTime: Infinity
    }
  )

  const [pronouncedWords, setPronouncedWords] = useState(new Set())

  useEffect(() => {
    const { autoplay } = settings

    if (autoplay !== "none" && !pronouncedWords.has(word)) {
      const play = async () => {
        try {
          const src = await find(data.phonetics, {
            type: autoplay
          })?.getAudioSrc?.()

          if (src) {
            setPronouncedWords(new Set([...pronouncedWords, word]))
            await playSound(src)
          }
        } catch (error) {
          // empty
        }
      }
      play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word])

  const phonetics = data.phonetics?.map((item, i) => (
    <span
      key={i}
      className="text-xl mr-2.5 cursor-pointer rounded overflow-hidden inline-flex items-center"
      onClick={async () => {
        try {
          playSound(await item.getAudioSrc())
        } catch (error) {
          // empty
        }
      }}>
      {item.type === "en-US" ? <USIcon /> : <UKIcon />}
      <span className="text-xs font-normal ml-1">
        {item.value || (item.type === "en-US" ? "美音" : "英音")}
      </span>
    </span>
  ))

  if (isOpenSettingsForm)
    return (
      <SettingsForm
        defaultValues={settings}
        onSubmit={(values) => {
          setSettings(values)
          setIsOpenSettingsForm(false)
        }}
        onCancel={() => setIsOpenSettingsForm(false)}
      />
    )

  return (
    <div className="text-slate-900 dark:text-white px-4 pb-4">
      {!!(data as any).errorMessage && (
        <div className="alert alert-warning rounded py-3 px-2 shadow-lg text-sm mt-3">
          <div className="flex">
            <InformationCircleIcon className="w-5 h-5" />
            <span className="flex-1">{(data as any).errorMessage}</span>
          </div>
        </div>
      )}

      <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 pt-4">
        <div className="flex items-center">
          {backButton}

          <img
            src={translators[data.translator].getLogo()}
            alt="logo"
            className="inline-block w-4 h-4 mr-1 select-none"
          />

          {!data.isSentence && (
            <span className="mr-5 text-lg truncate font-bold">{data.word}</span>
          )}

          {data.isSentence && phonetics}

          <span className="ml-auto flex gap-2 justify-end items-center text-lg text-slate-400 dark:text-slate-500">
            <GitHubIcon
              className="w-5 h-5 cursor-pointer hover:opacity-80 text-black dark:text-white"
              onClick={() => {
                window.open("https://github.com/liaoliao666/translate-ext")
              }}
            />

            {!data.isSentence && <AddWord word={word} />}

            <SwitchDarkMode />

            <AdjustmentsIcon
              className={clsx(
                "hover:opacity-80 align-middle w-6 h-6 cursor-pointer",
                isOpenSettingsForm && "!text-sky-500"
              )}
              onClick={() => {
                setIsOpenSettingsForm(!isOpenSettingsForm)
              }}
            />
          </span>
        </div>

        {!data.isSentence && <div className="mt-2">{phonetics}</div>}
      </div>

      {data.isSentence ? (
        <div className="text-sm">
          {!!backButton && <div className="mt-2">{data.word}</div>}
          <div className="mt-2">{data.sentence}</div>
        </div>
      ) : (
        <div className="text-sm flex flex-col gap-3">
          {settings.definition && !isEmpty(data.definitions) && (
            <TrancateDefs defs={data.definitions} rows={3} />
          )}
          <TrancateDefs defs={data.translations} rows={5} />
        </div>
      )}
    </div>
  )
}

export default TranslatePannel
