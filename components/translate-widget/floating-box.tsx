import {
  type ReferenceElement,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating
} from "@floating-ui/react-dom"
import { Card } from "@nextui-org/react"
import clsx from "clsx"
import { motion } from "framer-motion"
import React, { useLayoutEffect, useRef } from "react"

export default function FloatingBox({
  open,
  referenceElement,
  children,
  className
}: {
  open: boolean
  referenceElement: ReferenceElement
  children?: React.ReactNode
  className?: string
}) {
  const arrowRef = useRef<HTMLDivElement>(null)

  const { reference, floating, x, y, strategy, placement, middlewareData } =
    useFloating({
      strategy: "fixed",
      whileElementsMounted: open ? autoUpdate : undefined,
      middleware: [
        offset(10),
        shift(),
        flip(),
        arrow({ element: arrowRef }),
        size({
          apply({ availableWidth, availableHeight, elements }) {
            // Do things with the data, e.g.
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`,
            })
          }
        })
      ]
    })

  const themeCls = `bg-white dark:bg-slate-900`

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement.split("-")[0]]

  useLayoutEffect(() => {
    reference(referenceElement)
  }, [referenceElement])

  return (
    open && (
      <motion.div
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          zIndex: 10049
        }}
        className="flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2
        }}
        ref={floating}>
        <Card className={clsx("overflow-y-auto flex-1", className)}>
          {children}
        </Card>

        <div
          ref={arrowRef}
          style={{
            left:
              middlewareData.arrow?.x != null
                ? `${middlewareData.arrow.x}px`
                : undefined,
            top:
              middlewareData.arrow?.y != null
                ? `${middlewareData.arrow.y}px`
                : undefined,
            [staticSide]: "-5px"
          }}
          className={clsx(
            "absolute transform rotate-45 w-2.5 h-2.5 border-solid border-gray-300 dark:border-transparent",
            placement === "top" ? "border-r border-b" : "border-l border-t",
            themeCls
          )}
        />
      </motion.div>
    )
  )
}
