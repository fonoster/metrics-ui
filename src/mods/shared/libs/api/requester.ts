import axios from 'axios'

import { Notifier } from '@/mods/shared/components/Notification'

import { getBaseAPI } from '../../helpers/getPath'

const API = axios.create({
  baseURL: getBaseAPI(),
})

API.interceptors.response.use(
  res => res,
  async err => {
    const message = err.response?.data?.message

    /**
     * @todo Create an error handler based on the messages or codes thrown by the sdk
     */
    if (message) Notifier.error(message)

    return Promise.reject(err)
  }
)

export { API }
