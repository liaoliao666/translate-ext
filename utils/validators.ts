export const isPhone = (value: string) => /^1[3-9]\d{9}$/.test(value)

export const isEmail = (value: string) =>
  /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
    value
  )

export const isPassword = (value: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/.test(value)

export const isChinese = (text: string) =>
  new RegExp("[\\u4E00-\\u9FFF]+", "g").test(text)

export const isEnglish = (text: string) => new RegExp("[A-Za-z]+").test(text)

export function isWord(word: string) {
  const len = word.length
  let repeatCount = 0

  for (let i = 0; i < len; i++) {
    const char = word[i]
    if (char === " ") {
      repeatCount++
      if (repeatCount >= 2) return false
    }
  }

  return true
}
