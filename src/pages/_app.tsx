import '../styles/styles.css'

import React, { useEffect } from 'react'
import { Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { injectStyle } from 'react-toastify/dist/inject-style'

import type { AppProps } from '@/@types'
import { Authenticated } from '@/mods/auth/components/Authenticated'
import { Layout } from '@/mods/shared/components/layouts'
import { Progress } from '@/mods/shared/components/Progress'
import { getQueryClient } from '@/mods/shared/libs/queryClient'
import { Meta } from '@/ui'

const Application = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const { current: queryClient } = React.useRef(getQueryClient())

  useEffect(() => {
    injectStyle()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <Meta />
        <Progress />

        <ReactQueryDevtools initialIsOpen={false} />

        <Authenticated>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Authenticated>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default Application
