import type { AppProps as NextAppProps } from 'next/app'

export interface AppProps extends Omit<NextAppProps, 'Component'> {
  Component: NextAppProps['Component']
}

export type Nullable<T> = T | null

export type Handler = () => Promise<unknown>

export type IRequestHandler = Record<string, Handler>
