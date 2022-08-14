import type { ReferenceElement } from "@floating-ui/react-dom"
import { ChevronLeftIcon } from "@heroicons/react/solid"
import { last } from "lodash-es"
import { useEffect, useRef, useState } from "react"
import { useEvent, useKey } from "react-use"

import Empty from "~components/empty"
import { QuerySuspense } from "~components/query-suspense"
import Skeleton from "~components/skeleton"
import { isFirefox } from "~utils/browser"
import { getSelection } from "~utils/get-selection"
import { sleep } from "~utils/sleep"

import FloatingBox from "./floating-box"
import FloatingButton from "./floating-button"
import TranslatePannel from "./translate-pannel"

const TranslateWidget = () => {
  const [words, setWords] = useState<string[]>([])
  const activeWord = last(words)

  const [referenceElement, setReferenceElement] = useState<ReferenceElement>()

  const poperRef = useRef<HTMLDivElement>()

  const translateButtonRef = useRef<SVGSVGElement>()

  useEvent("mouseup", async (ev) => {
    const target = isFirefox()
      ? ev.originalTarget
      : (ev.path || ev.composedPath())[0]

    if (
      !(
        poperRef.current?.contains(target) ||
        translateButtonRef.current?.contains(target)
      )
    ) {
      const selection = window.getSelection()
      await sleep(0)
      if (!selection?.toString()) {
        setWords([])
      }
    }
  })

  useKey("Escape", () => {
    setWords([])
  })

  return (
    <>
      <FloatingButton
        ref={translateButtonRef}
        onConfirm={(ev) => {
          const { text, referenceElement } = getSelection(ev)

          if (!text) return

          setWords([...words, text])
          if (!activeWord) {
            setReferenceElement(referenceElement)
          }
        }}
        activeWord={activeWord}
      />

      <FloatingBox
        open={!!activeWord}
        referenceElement={referenceElement}
        className="w-[400px]">
        <div ref={poperRef}>
          <QuerySuspense
            loading={<Skeleton className="p-4" />}
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Empty
                className="py-8 px-4"
                extra={
                  <>
                    <div>{error.message}</div>
                    <div className="mt-2 text-center">
                      {words.length > 1 ? (
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() => {
                            resetErrorBoundary()
                            const newWords = words.slice()
                            newWords.pop()
                            setWords(newWords)
                          }}>
                          返回上一个单词
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={resetErrorBoundary}>
                          再试一次
                        </button>
                      )}
                    </div>
                  </>
                }
              />
            )}>
            {activeWord && (
              <TranslatePannel
                word={activeWord}
                backButton={
                  words.length > 1 && (
                    <div
                      className="mr-2 hover:opacity-80 text-slate-400 dark:text-slate-500 text-base cursor-pointer flex items-center"
                      onClick={() => {
                        const newWords = words.slice()
                        newWords.pop()
                        setWords(newWords)
                      }}>
                      <ChevronLeftIcon className="w-6 h-6" />
                      返回
                    </div>
                  )
                }
              />
            )}
          </QuerySuspense>
        </div>
      </FloatingBox>
    </>
  )
}

export default TranslateWidget
