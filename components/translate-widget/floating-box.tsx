import {
  ReferenceElement,
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
import React, { useLayoutEffect } from "react"

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
  const { reference, floating, x, y, strategy } = useFloating({
    strategy: "fixed",
    whileElementsMounted: open ? autoUpdate : undefined,
    middleware: [
      offset(10),
      shift(),
      flip(),
      size({
        apply({ availableHeight, elements }) {
          // Do things with the data, e.g.
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`
          })
        }
      })
    ]
  })

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2
        }}
        ref={floating}>
        {
          <Card className={clsx("overflow-y-auto flex-1", className)}>
            {children}
          </Card>
        }
      </motion.div>
    )
  )
}
