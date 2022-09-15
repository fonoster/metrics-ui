import { config } from '../constants/config'

export const getPath = (path: string) =>
  path.startsWith('/')
    ? `${config.APP_BASE_PATH}${path}`
    : `${config.APP_BASE_PATH}/${path}`

export const getBaseAPI = () => `${config.APP_URL}${config.APP_BASE_PATH}/api`
