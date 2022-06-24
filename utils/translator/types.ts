export type Lang = "zh-CN" | "en"
export type Phonetic = "en-GB" | "en-US"

export interface Translation {
  word?: string
  phonetics?: {
    type: Phonetic
    value: string
    getAudioSrc?: () => Promise<string>
  }[]
  definitions?: { pos: string; def: string }[]
  translations?: { pos: string; def: string }[]
  sentence?: string
  isSentence?: boolean
}

export abstract class Translator {
  private phonetic: Phonetic
  private from: Lang
  private to: Lang
  isDenied?: boolean

  constructor() {
    this.phonetic = "en-GB"
    this.from = "en"
    this.to = "zh-CN"
  }

  getPhonetic() {
    return this.phonetic
  }

  setPhonetic(phonetic: Phonetic) {
    this.phonetic = phonetic
  }

  getFrom() {
    return this.from
  }

  setFrom(from: Lang) {
    this.from = from
  }

  getTo() {
    return this.to
  }

  setTo(to: Lang) {
    this.to = to
  }

  abstract getTitle(): string

  abstract getLogo(): string

  abstract translate(text: string): Promise<Translation>
}
