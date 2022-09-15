import axios from 'axios'

import { getBaseAPI } from '../../helpers/getPath'

const API = axios.create({
  baseURL: getBaseAPI(),
})

export { API }
