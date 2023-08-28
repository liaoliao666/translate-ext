import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from "@nextui-org/react"
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

  console.log("isOpen", isOpen)

  return (
    <>
      <Button
        variant="light"
        size="sm"
        color="primary"
        onClick={() => {
          setIsOpen(true)
        }}>
        已记单词({collectedWords.length})
      </Button>

      <Modal
        portalContainer={floatingContainer}
        onMouseUp={(ev) => ev.stopPropagation()}
        classNames={{
          wrapper: "z-[10051]"
        }}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        scrollBehavior="inside"
        title={`已记单词(${collectedWords.length})`}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="py-4">
                  <div className="flex gap-2">
                    <CopyToClipboard text={collectedWords.join(",")}>
                      <Button
                        size="sm"
                        onClick={() => {
                          setCopied(true)
                        }}>
                        {copied ? "已复制" : "复制单词"}
                      </Button>
                    </CopyToClipboard>

                    <Button
                      size="sm"
                      onClick={() => {
                        if (window.confirm("是否确认清空单词？")) {
                          setCollectedWords([])
                          setCleared(true)
                        }
                      }}>
                      {cleared ? "已清空" : "清空单词"}
                    </Button>
                  </div>

                  <div className="mt-4 text-primary break-all">
                    {collectedWords.join(",")}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  确定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
