interface BaseRequestConfig extends RequestInit {
  responseType: "json" | "text" | "arrayBuffer" | "blob" | "base64"
  url: string
}

export interface RequestConfig extends BaseRequestConfig {
  adapter?: (config: BaseRequestConfig) => Promise<unknown>
}

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

const defaultConfig: Partial<RequestConfig> = {
  adapter: (config) => {
    const { url, responseType } = config
    return fetch(url, config).then((res) => {
      if (responseType === "base64") return res.blob().then(blobToBase64)
      return res[responseType]()
    })
  }
}

export async function request<T = unknown>(config: RequestConfig): Promise<T> {
  const { adapter, ...rest } = {
    ...defaultConfig,
    ...config
  }

  return adapter(rest) as Promise<T>
}

request.defaultConfig = (config: Partial<RequestConfig>) => {
  Object.assign(defaultConfig, config)
}
