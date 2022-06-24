import { ComponentType, ReactNode, Suspense, SuspenseProps, lazy } from "react"
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary"
import { QueryErrorResetBoundary } from "react-query"

export type QuerySuspenseProps = ErrorBoundaryProps & {
  loading: SuspenseProps["fallback"]
  children?: ReactNode
}

export const QuerySuspense: React.FC<QuerySuspenseProps> = ({
  loading,
  children,
  ...rest
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} {...rest}>
          <Suspense fallback={loading}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export function withQuerySuspense<P>(
  Component: ComponentType<P>,
  querySuspenseProps: QuerySuspenseProps
): ComponentType<P> {
  const Wrapped: ComponentType<P> = (props) => {
    return (
      <QuerySuspense {...querySuspenseProps}>
        <Component {...props} />
      </QuerySuspense>
    )
  }

  // Format for display in DevTools
  const name = Component.displayName || Component.name || "Unknown"
  Wrapped.displayName = `withQuerySuspense(${name})`

  return Wrapped
}

export function loadable<P>(
  importFunc: () => Promise<{
    default: ComponentType<P>
  }>,
  querySuspenseProps: QuerySuspenseProps
) {
  return withQuerySuspense(lazy(importFunc), querySuspenseProps)
}
