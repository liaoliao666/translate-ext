import bingIco from "data-base64:~assets/bing.ico"
import { isEmpty } from "lodash-es"

import { request } from "~utils/request"

import { Phonetic, Translation, Translator } from "./types"

class BingTranslator extends Translator {
  constructor() {
    super()
  }

  getTitle(): string {
    return "必应词典"
  }

  getLogo() {
    return bingIco
  }

  async translate(text: string, isRetry: boolean = false) {
    const doc = await request<string>({
      url: `https://cn.bing.com/dict/search?q=${text}`,
      responseType: "text"
    }).then((text) => new DOMParser().parseFromString(text, "text/html"))

    const qdef = doc.querySelector(".qdef")

    if (!qdef) {
      if (!isRetry) {
        await request<string>({
          url: "https://cn.bing.com/dict/?mkt=zh-cn",
          responseType: "text"
        }).then((text) => new DOMParser().parseFromString(text, "text/html"))
        return this.translate(text, true)
      } else {
        throw new Error(
          `${this.getTitle()}：无翻译结果。\n如果你使用了代理软件，请关闭代理或将必应词典加入直连名单后重试`
        )
      }
    }

    const translation: Translation = {
      word: qdef.querySelector(`.hd_area strong`)?.textContent,
      isSentence: false,
      phonetics: [],
      translations: [],
      definitions: []
    }

    // phonetics
    const hd_p1_1 = qdef.querySelector(`.hd_p1_1`)
    if (hd_p1_1) {
      function extractPhonetic(e: Element | undefined, type: Phonetic) {
        if (!e) return

        const value = e.textContent.match(/\[(.+)\]/)?.[1]
        const audio = e.nextElementSibling
          ?.querySelector("a")
          ?.getAttribute("onclick")
          .match(/'(http[^']+)'/)?.[1]

        if (!value && !audio) return

        translation.phonetics.push({
          value,
          getAudioSrc: () => Promise.resolve(audio),
          type
        })
      }

      extractPhonetic(hd_p1_1.querySelector(`.hd_prUS`), "en-US")
      extractPhonetic(hd_p1_1.querySelector(`.hd_pr`), "en-GB")
    }

    // translations
    qdef.querySelectorAll(`ul li`).forEach((li) => {
      translation.translations.push({
        pos: li.querySelector(".pos")?.textContent,
        def: li.querySelector(".b_regtxt span")?.textContent
      })
    })

    if (isEmpty(translation.translations))
      throw new Error(`${this.getTitle()}：无翻译结果`)

    // definitions
    const homotabid = qdef.querySelector("#homotabid")
    if (homotabid) homotabid.dispatchEvent(new Event("mousedown"))

    const homoid = qdef.querySelector("#homoid")
    if (homoid) {
      homoid.querySelectorAll("table tbody tr").forEach((tr) => {
        const pos = tr.querySelector(`.pos`)?.textContent

        tr.querySelectorAll(".df_cr_w").forEach((df_cr_w) => {
          let def = ""
          df_cr_w.childNodes.forEach((child) => {
            def += child.textContent
          })

          translation.definitions.push({
            pos,
            def
          })
        })
      })
    }

    return translation
  }
}

export const bingTranslator = new BingTranslator()
