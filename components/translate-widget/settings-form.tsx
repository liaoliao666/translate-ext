import type { ReactNode } from "react"
import { useForm } from "react-hook-form"

import type { Settings } from "~store/settings"

import WordSettings from "./word-settings"

const wordTranslatorOptions: {
  label: string
  value: Settings["wordTranslator"]
}[] = [
  {
    label: "必应",
    value: "bing"
  },
  {
    label: "谷歌",
    value: "google"
  }
]

const sentenceTranslatorOptions: {
  label: string
  value: Settings["sentenceTranslator"]
}[] = [
  {
    label: "谷歌",
    value: "google"
  }
]

const autoplayOptions: {
  label: string
  value: Settings["autoplay"]
}[] = [
  {
    label: "美音",
    value: "en-US"
  },
  {
    label: "英音",
    value: "en-GB"
  },
  {
    label: "关闭",
    value: "none"
  }
]

const SettingsForm: React.FC<{
  defaultValues: Settings
  onSubmit: (settings: Settings) => void
  onCancel: () => void
}> = ({ defaultValues, onSubmit, onCancel }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...defaultValues,
      definition: String(+defaultValues.definition)
    }
  })

  return (
    <form className="p-4">
      <h3 className="font-bold text-lg flex justify-between items-center">
        设置 <WordSettings />
      </h3>

      <div className="text-sm">
        <Field label="自动朗读">
          {autoplayOptions.map((item) => (
            <div key={item.value} className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  className="radio radio-sm"
                  name="autoplay"
                  value={item.value}
                  {...register("autoplay")}
                />
                <span className="label-text ml-2">{item.label}</span>
              </label>
            </div>
          ))}
        </Field>

        <Field label="英文释义">
          {[
            {
              label: "开启",
              value: "1"
            },
            {
              label: "关闭",
              value: "0"
            }
          ].map((item) => (
            <div key={+item.value} className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  className="radio radio-sm"
                  name="definition"
                  value={item.value}
                  {...register("definition")}
                />
                <span className="label-text ml-2">{item.label}</span>
              </label>
            </div>
          ))}
        </Field>

        <Field label="查词服务">
          {wordTranslatorOptions.map((item) => (
            <div key={item.value} className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  className="radio radio-sm"
                  name="wordTranslator"
                  value={item.value}
                  {...register("wordTranslator")}
                />
                <span className="label-text ml-2">{item.label}</span>
              </label>
            </div>
          ))}
        </Field>

        <Field label="查句服务">
          {sentenceTranslatorOptions.map((item) => (
            <div key={item.value} className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  className="radio radio-sm"
                  name="sentenceTranslator"
                  value={item.value}
                  {...register("sentenceTranslator")}
                />
                <span className="label-text ml-2">{item.label}</span>
              </label>
            </div>
          ))}
        </Field>

        <div className="flex justify-center gap-4 mt-4">
          <button className="btn btn-sm btn-outline" onClick={onCancel}>
            取消
          </button>
          <button
            className="btn btn-sm"
            type="submit"
            onClick={handleSubmit((values) => {
              onSubmit({
                ...values,
                definition: !!+values.definition
              })
            })}>
            确认
          </button>
        </div>
      </div>
    </form>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center">
      <label className="mr-2">{label}</label>
      <div className="flex gap-2">{children}</div>
    </div>
  )
}

export default SettingsForm
