const audio = new Audio()

onload = () => {
  window.addEventListener("message", function (event) {
    const action = event.data

    if (action.type === "PLAY_SOUND") {
      audio.src = action.payload
      audio.play()
    }
  })

  document.querySelector("svg").addEventListener("mousedown", () => {
    window.parent.postMessage(
      {
        type: "EMIT_PLAY_SOUND"
      },
      "*"
    )
  })
}

export {}
