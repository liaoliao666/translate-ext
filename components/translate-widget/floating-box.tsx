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
import { Transition } from "@headlessui/react"
import clsx from "clsx"
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

  return (
    <Transition
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        zIndex: 1049
      }}
      ref={floating}
      show={open}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="flex flex-col">
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
    </Transition>
  )
}
