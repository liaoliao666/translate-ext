import clsx from "clsx"
import { useAtom } from "jotai"
import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { createPortal } from "react-dom"

import { collectedWordsAtom } from "~store/collected-words"
import { floatingContainer } from "~utils/container"

export default function WordSettings() {
  const [collectedWords, setCollectedWords] = useAtom(collectedWordsAtom)
  const [copied, setCopied] = useState(false)
  const [cleared, setCleared] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <span
        className="text-sm text-primary hover:opacity-80 cursor-pointer"
        onClick={() => {
          setIsOpen(true)
        }}>
        已记单词({collectedWords.length})
      </span>

      {createPortal(
        <div
          onMouseUp={(ev) => ev.stopPropagation()}
          style={{ zIndex: 10051 }}
          className={clsx("modal", isOpen && "modal-open")}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              已记单词({collectedWords.length})
            </h3>
            <div className="py-4">
              <div className="flex gap-2">
                <CopyToClipboard text={collectedWords.join(",")}>
                  <span
                    className="btn btn-xs"
                    onClick={() => {
                      setCopied(true)
                    }}>
                    {copied ? "已复制" : "复制单词"}
                  </span>
                </CopyToClipboard>

                <span
                  className="btn btn-xs"
                  onClick={() => {
                    if (window.confirm("是否确认清空单词？")) {
                      setCollectedWords([])
                      setCleared(true)
                    }
                  }}>
                  {cleared ? "已清空" : "清空单词"}
                </span>
              </div>

              <div className="max-h-96 overflow-y-auto mt-4 text-primary break-all">
                {collectedWords.join(",")}
              </div>

              <div className="modal-action">
                <label
                  className="btn"
                  onClick={() => {
                    setIsOpen(false)
                  }}>
                  确定
                </label>
              </div>
            </div>
          </div>
        </div>,
        floatingContainer
      )}
    </>
  )
}
