import {
  ReferenceElement,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating
} from "@floating-ui/react-dom"
import clsx from "clsx"
import React, { useLayoutEffect, useRef } from "react"
import { animated, useTransition } from "react-spring"

import { isFirefox } from "~utils/browser"

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

  const themeCls = `bg-white dark:bg-slate-900`

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement.split("-")[0]]

  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 200
  })

  const child = (
    <>
      <div
        className={clsx(
          "overflow-y-auto flex-1 rounded-lg shadow-lg ring-1 ring-slate-900/5",
          themeCls,
          className
        )}>
        {children}
      </div>
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
    </>
  )

  if (isFirefox())
    return (
      open && (
        <div
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 10049
          }}
          ref={floating}>
          {child}
        </div>
      )
    )

  return transitions(
    (animation, item) =>
      item && (
        <animated.div
          style={{
            ...animation,
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 10049
          }}
          ref={floating}>
          {child}
        </animated.div>
      )
  )
}
