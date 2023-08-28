import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Radio,
  RadioGroup
} from "@nextui-org/react"
import type { ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"

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
  const { control, handleSubmit } = useForm({
    defaultValues
  })

  return (
    <div>
      <CardHeader className="flex justify-between">
        设置 <WordSettings />
      </CardHeader>

      <CardBody className="gap-y-2">
        <Controller
          control={control}
          name="autoplay"
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value}
              onValueChange={onChange}
              label="自动朗读"
              orientation="horizontal"
              size="sm">
              {autoplayOptions.map((item) => (
                <Radio key={item.value} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />

        <Controller
          control={control}
          name="definition"
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value ? "1" : "0"}
              onValueChange={(v) => onChange(v === "1")}
              label="英文释义"
              orientation="horizontal"
              size="sm">
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
                <Radio key={item.value} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />

        <Controller
          control={control}
          name="wordTranslator"
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value}
              onValueChange={onChange}
              label="查词服务"
              orientation="horizontal"
              size="sm">
              {wordTranslatorOptions.map((item) => (
                <Radio key={item.value} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />

        <Controller
          control={control}
          name="sentenceTranslator"
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value}
              onValueChange={onChange}
              label="查词服务"
              orientation="horizontal"
              size="sm">
              {sentenceTranslatorOptions.map((item) => (
                <Radio key={item.value} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />
      </CardBody>

      <CardFooter className="justify-center gap-4">
        <Button color="default" size="sm" onClick={onCancel}>
          取消
        </Button>
        <Button color="primary" size="sm" onClick={handleSubmit(onSubmit)}>
          确认
        </Button>
      </CardFooter>
    </div>
  )
}

export default SettingsForm
