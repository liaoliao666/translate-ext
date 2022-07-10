interface MessageAction<T> {
  type: string
  payload?: T
}

interface MessageResponse<T> {
  response?: T
  error?: unknown
}

function getSendMessageFn<Req, Res>(key: string) {
  return async function <IRes extends Res>(req?: Req) {
    const action: MessageAction<Req> = {
      type: key,
      payload: req
    }

    const result = (await chrome.runtime.sendMessage(
      action
    )) as MessageResponse<IRes>

    if (Object.hasOwn(result, "error")) {
      throw result.error
    }

    return result.response
  }
}

function getSubscribeMessageFn<Req, Res>(key: string) {
  return (
    cb: (...args: [Req, chrome.runtime.MessageSender]) => Res | Promise<Res>
  ) => {
    chrome.runtime.onMessage.addListener(
      (action: MessageAction<Req>, sender, sendResponse) => {
        const handleMeesage = async () => {
          try {
            sendResponse({
              response: await cb(action.payload, sender)
            })
          } catch (error) {
            sendResponse({
              error:
                typeof action === "object" && action !== null
                  ? JSON.parse(
                      JSON.stringify(error, Object.getOwnPropertyNames(error))
                    )
                  : error
            })
          }
        }

        if (action.type === key) {
          handleMeesage()
        }

        return true
      }
    )
  }
}

export function getMessage<Req extends any = any, Res extends any = any>(
  key: string
) {
  return [
    getSendMessageFn<Req, Res>(key),
    getSubscribeMessageFn<Req, Res>(key)
  ] as const
}
