import { container } from "~utils/container"

import { FRAME_ID } from "./constants"

const audio = new Audio()

export async function playSound(src: string) {
  const frame = container.querySelector(`#${FRAME_ID}`) as HTMLIFrameElement

  if (frame) {
    frame.contentWindow.postMessage(
      {
        type: "PLAY_SOUND",
        payload: src
      },
      "*"
    )
  } else {
    audio.src = src
    audio.play()
  }
}
