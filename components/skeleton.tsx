import clsx from "clsx"
import { Fragment } from "react"

export default function Skeleton({
  avatar,
  rows = 1,
  className
}: {
  avatar?: boolean
  rows?: number
  className?: string
}) {
  return (
    <div className={clsx("animate-pulse flex space-x-4", className)}>
      {avatar && <div className="rounded-full bg-slate-200 h-10 w-10"></div>}
      <div className="flex-1 space-y-6 py-1">
        {Array.from({ length: rows }, (_, i) => (
          <Fragment key={i}>
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
