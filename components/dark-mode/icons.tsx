import type { SVGProps } from "react"

export const LightInActiveIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}>
      <path
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 4v1m5.66 1.344l-.828.828m3.173 4.832h-1m-1.345 5.66l-.828-.828M12 20.01V19m-5.66-1.336l.835-.836m-3.18-4.824h1.01M6 6l.835.836"
        className="stroke-slate-400 dark:stroke-slate-500"></path>
    </svg>
  )
}

export const LightActiveIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}>
      <path
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        className="fill-sky-400/20 stroke-sky-500"></path>
      <path
        d="M12 4v1m5.66 1.344l-.828.828m3.173 4.832h-1m-1.345 5.66l-.828-.828M12 20.01V19m-5.66-1.336l.835-.836m-3.18-4.824h1.01M6 6l.835.836"
        className="stroke-sky-500"></path>
    </svg>
  )
}

export const DarkInActiveIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M17.715 15.15A6.5 6.5 0 019 6.035c-2.894.887-5 3.61-5 6.832 0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853z"
        className="fill-transparent"
        clipRule="evenodd"></path>
      <path
        d="M17.715 15.15l.95.316a1 1 0 00-1.445-1.185l.495.869zM9 6.035l.846.534a1 1 0 00-1.14-1.49L9 6.035zm8.221 8.246a5.47 5.47 0 01-2.72.718v2a7.47 7.47 0 003.71-.98l-.99-1.738zm-2.72.718A5.5 5.5 0 019 9.5H7a7.5 7.5 0 007.5 7.5v-2zM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 007 9.5h2zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99l-.586-1.91C5.397 6.094 3 9.201 3 12.867h2zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632z"
        className="fill-slate-400 dark:fill-slate-500"></path>
      <path
        d="M17 3a1 1 0 011 1 2 2 0 002 2 1 1 0 110 2 2 2 0 00-2 2 1 1 0 11-2 0 2 2 0 00-2-2 1 1 0 110-2 2 2 0 002-2 1 1 0 011-1z"
        className="fill-slate-400 dark:fill-slate-500"
        clipRule="evenodd"></path>
    </svg>
  )
}

export const DarkActiveIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M17.715 15.15A6.5 6.5 0 019 6.035c-2.894.887-5 3.61-5 6.832 0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853z"
        className="fill-sky-400/20"
        clipRule="evenodd"></path>
      <path
        d="M17.715 15.15l.95.316a1 1 0 00-1.445-1.185l.495.869zM9 6.035l.846.534a1 1 0 00-1.14-1.49L9 6.035zm8.221 8.246a5.47 5.47 0 01-2.72.718v2a7.47 7.47 0 003.71-.98l-.99-1.738zm-2.72.718A5.5 5.5 0 019 9.5H7a7.5 7.5 0 007.5 7.5v-2zM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 007 9.5h2zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99l-.586-1.91C5.397 6.094 3 9.201 3 12.867h2zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632z"
        className="fill-sky-500"></path>
      <path
        d="M17 3a1 1 0 011 1 2 2 0 002 2 1 1 0 110 2 2 2 0 00-2 2 1 1 0 11-2 0 2 2 0 00-2-2 1 1 0 110-2 2 2 0 002-2 1 1 0 011-1z"
        className="fill-sky-500"
        clipRule="evenodd"></path>
    </svg>
  )
}

export const AutoInActiveIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 15c0 3 2 5 2 5H8s2-2 2-5"
        className="stroke-slate-400 dark:stroke-slate-500"></path>
    </svg>
  )
}

export const AutoActiveIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
        className="stroke-sky-500 fill-sky-400/20"></path>
      <path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" className="stroke-sky-500"></path>
    </svg>
  )
}
