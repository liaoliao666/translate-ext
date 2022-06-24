import { useFloating } from "@floating-ui/react-dom"
import { Transition } from "@headlessui/react"
import clsx from "clsx"
import { forwardRef, useEffect, useRef, useState } from "react"
import { useEvent, useLatest } from "react-use"

import { sleep } from "~utils/sleep"
import { isEnglish } from "~utils/validators"

import { AUDIO_FRAME_URL, FRAME_ID } from "./play-sound/constants"

export interface FloatingButtonProps {
  onConfirm: (ev?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  activeWord?: string
}

export default forwardRef<HTMLDivElement, FloatingButtonProps>(
  function FloatingButton({ onConfirm, activeWord = "" }, floatingButtonRef) {
    const [clickedFrame, setClickedFrame] = useState(false)

    const [open, setOpen] = useState(false)

    const { reference, floating, x, y, strategy } = useFloating()

    useEffect(() => {
      if (!open) return

      const timer = setTimeout(() => {
        setOpen(false)
      }, 1.5 * 1000)

      return () => {
        clearTimeout(timer)
      }
    }, [open])

    const clickTime = useRef(0)

    useEvent("mouseup", async (ev: MouseEvent) => {
      // 防止 button 的 onMouseDown 和 document 的 onMouseUp 同时触发
      if (Date.now() - clickTime.current < 300) return

      await sleep(0)

      const text = window.getSelection()?.toString().trim() ?? ""

      if (
        !text ||
        text.toLowerCase() === activeWord.toLowerCase() ||
        !isEnglish(text)
      ) {
        setOpen(false)
        return
      }

      const width = 60
      const height = 10

      reference({
        getBoundingClientRect: () =>
          ({
            top: ev.clientY,
            left: ev.clientX,
            bottom: window.innerHeight - ev.clientY + height,
            right: window.innerWidth - ev.clientX + width,
            width,
            height
          } as DOMRect)
      })
      setOpen(true)
    })

    const onConfirmRef = useLatest(
      async (ev?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        clickTime.current = Date.now()
        onConfirm(ev)
        await sleep(300)
        setOpen(false)
      }
    )

    useEffect(() => {
      if (clickedFrame) return

      const listener = async (ev: MessageEvent) => {
        const action = ev.data

        if (action instanceof Object) {
          if (action.type === "EMIT_PLAY_SOUND") {
            setClickedFrame(true)
            onConfirmRef.current()
          }
        }
      }
      window.addEventListener("message", listener, false)

      return () => {
        window.removeEventListener("message", listener)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickedFrame])

    return (
      <Transition
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          zIndex: 1050
        }}
        show={open}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div
          ref={floatingButtonRef}
          onMouseDown={(ev) => {
            ev.preventDefault()
            onConfirmRef.current(ev)
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: 24,
              height: 24,
              cursor: "pointer",
              color: "#0969da"
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
          {/* {clickedFrame && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: 24,
                height: 24,
                cursor: "pointer",
                color: "#0969da"
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          )}

          <iframe
            className={clsx("border-0", clickedFrame && "hidden")}
            id={FRAME_ID}
            width="24px"
            height="24px"
            src={AUDIO_FRAME_URL}></iframe> */}
        </div>
      </Transition>
    )
  }
)