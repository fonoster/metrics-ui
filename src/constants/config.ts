import getConfig from 'next/config'

type Config = {
  publicRuntimeConfig: {
    [key: string]: string
    APP_URL: string
    APP_BASE_PATH: string
  }
}

export const { publicRuntimeConfig: config } = getConfig() as Config
