import { getRedisConnection } from '@fonoster/core'

import { RedisClient } from './types'

export const redis: RedisClient = getRedisConnection()
