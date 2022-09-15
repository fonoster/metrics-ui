import '../styles/styles.css'

import React, { useEffect } from 'react'
import { Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { injectStyle } from 'react-toastify/dist/inject-style'

import type { AppProps } from '@/@types'
import { Layout } from '@/components/Layout'
import { Progress } from '@/components/Progress'
import { getQueryClient } from '@/libs/queryClient'
import { Meta } from '@/ui'

const Application = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const { current: queryClient } = React.useRef(getQueryClient())

  useEffect(() => {
    injectStyle()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        <Meta />
        <Progress />
        <ReactQueryDevtools initialIsOpen={false} />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default Application
