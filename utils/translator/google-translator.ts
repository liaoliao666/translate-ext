import googleIco from "data-base64:~assets/google.ico"

import { paramsSerializer } from "~utils/params-serializer"
import { request } from "~utils/request"

import { Phonetic, Translation, Translator } from "./types"

type Region = "cn" | "com"

export interface GoggleTranslation {
  sentences: {
    trans: string
    orig: string
    backend: number
    model_specification: {
      label: string
    }[]
    translation_engine_debug_info: {
      model_tracking: {
        checkpoint_md5: string
        launch_doc: string
      }
    }[]
    translit: string
    src_translit: string
  }[]
  src: string
  alternative_translations: {
    src_phrase: string
    alternative: {
      word_postproc: string
      score: number
      has_preceding_space: boolean
      attach_to_next_token: boolean
      backends: number[]
      backend_infos: {
        backend: number
      }[]
    }[]
    srcunicodeoffsets: {
      begin: number
      end: number
    }[]
    raw_src_segment: string
    start_pos: number
    end_pos: number
  }[]
  dict: {
    pos: string
    terms: string[]
    base_form: string
    pos_enum: number
  }[]
  examples: {
    example: { definition_id: string; source_type: number; text: string }[]
  }
  confidence: number
  spell: Record<string, unknown>
  ld_result: {
    srclangs: string[]
    srclangs_confidences: number[]
    extended_srclangs: string[]
  }
}

class GoogleTranslator extends Translator {
  private region: Region
  private token?: string

  constructor() {
    super()
    this.region = "com"
  }

  getTitle(): string {
    return "谷歌翻译"
  }

  getLogo() {
    return googleIco
  }

  async getTTS(text: string, phonetic: Phonetic): Promise<string> {
    return request<string>({
      url: `https://translate.googleapis.com/translate_tts?client=gtx&tl=${phonetic}&ie=UTF-8&q=${encodeURIComponent(
        text
      )}`,
      responseType: "base64"
    }).catch(() => Promise.reject(`${this.getTitle()}：发音异常`))
  }

  async translate(text: string): Promise<Translation> {
    return this.quickTranslate(text)
  }

  private async quickTranslate(text: string): Promise<Translation> {
    try {
      const res = await request<GoggleTranslation>({
        url: `https://translate.googleapis.com/translate_a/single?${paramsSerializer(
          {
            client: "webapp",
            sl: this.getFrom(),
            tl: this.getTo(),
            dj: "1",
            ie: "UTF-8",
            oe: "UTF-8",
            source: "icon",
            dt: ["t", "bd", "qc", "rm", "ex", "at", "ss", "rw", "ld"],
            q: text,
            tk: n(text, this.token || (await this.getToken()))
          }
        )}`,
        responseType: "json"
      })

      const isSentence = !res.dict
      const sentences = res.sentences?.slice() || []
      const phonetic = sentences.pop()?.src_translit
      const word = sentences.map((item) => item.orig).join(" ")

      return {
        phonetics: [
          {
            type: "en-US",
            value: phonetic,
            getAudioSrc: () => this.getTTS(word, "en-US")
          },
          {
            type: "en-GB",
            value: phonetic,
            getAudioSrc: () => this.getTTS(word, "en-GB")
          }
        ],
        translations: res.dict?.map((item) => ({
          pos: `${item.pos}.`,
          def: item.terms?.join(", ")
        })),
        word,
        sentence: sentences.map((item) => item.trans).join(" "),
        isSentence
      }
    } catch (error) {
      this.token = undefined
      throw error
    }
  }

  private async getToken() {
    const t = await request({
      url: `https://translate.google.${this.region}/translate_a/element.js`,
      responseType: "text"
    }).then((data: string) => data.match(/_ctkk='(\d+\.\d+)'/))
    if (t) return t[1]
    throw new Error(`${this.getTitle()}：无法获取token`)
  }
}

function n(e, t) {
  let r,
    s = "",
    n = function (e, t) {
      for (let r, s = 0; s < t.length - 2; s += 3)
        (r = "a" <= (r = t.charAt(s + 2)) ? r.charCodeAt(0) - 87 : Number(r)),
          (r = "+" === t.charAt(s + 1) ? e >>> r : e << r),
          (e = "+" === t.charAt(s) ? (e + r) & 4294967295 : e ^ r)
      return e
    },
    a = (r = "" !== s ? s : (s = t || "") || "").split(".")
  r = Number(a[0]) || 0
  let o = [],
    i = 0,
    c = 0
  for (; c < e.length; c++) {
    let t = e.charCodeAt(c)
    128 > t
      ? (o[i++] = t)
      : (2048 > t
          ? (o[i++] = (t >> 6) | 192)
          : (55296 == (64512 & t) &&
            c + 1 < e.length &&
            56320 == (64512 & e.charCodeAt(c + 1))
              ? ((t = 65536 + ((1023 & t) << 10) + (1023 & e.charCodeAt(++c))),
                (o[i++] = (t >> 18) | 240),
                (o[i++] = ((t >> 12) & 63) | 128))
              : (o[i++] = (t >> 12) | 224),
            (o[i++] = ((t >> 6) & 63) | 128)),
        (o[i++] = (63 & t) | 128))
  }
  for (e = r, i = 0; i < o.length; i++) e = n((e += o[i]), "+-a^+6")
  return (
    (e = n(e, "+-3^+b+-f")),
    0 > (e ^= Number(a[1]) || 0) && (e = 2147483648 + (2147483647 & e)),
    (e %= 1e6).toString() + "." + (e ^ r)
  )
}

export const googleTranslator = new GoogleTranslator()
