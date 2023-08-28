import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid"
import { Button } from "@nextui-org/react"
import clsx from "clsx"
import { useState } from "react"

import { invoke } from "~utils/invoke"

const TrancateDefs: React.FC<{
  defs: { pos: string; def: string }[]
  rows?: number
  className?: string
}> = ({ defs = [], rows = 3, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const computedDefs = invoke(() => {
    const len = defs.length
    if (isOpen || len <= rows) return defs

    const _defs: typeof defs = []
    const posMap: Record<string, number> = {}

    for (let i = 0; i < len; i++) {
      const item = defs[i]

      if (typeof posMap[item.pos] === "undefined") {
        posMap[item.pos] = 0
      }

      if (posMap[item.pos] <= 1) {
        posMap[item.pos]++
        _defs.push(item)
      }

      if (_defs.length >= rows) break
    }

    return _defs
  })

  return (
    <div className={clsx("relative", className)}>
      {computedDefs.map((item, i) => {
        return (
          <div key={i} className="mt-1">
            <span>{!!item.pos && `${item.pos} `}</span>
            <span>{item.def}</span>
          </div>
        )
      })}

      {defs.length > rows && (
        <div className="text-right">
          <Button
            color="primary"
            size="sm"
            variant="light"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            startContent={
              isOpen ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )
            }>
            {isOpen ? "收起更多" : "查看更多"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default TrancateDefs
