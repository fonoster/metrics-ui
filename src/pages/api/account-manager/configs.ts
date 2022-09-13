import { AccountManager } from '@fonoster/metrics'
import { NextApiRequest, NextApiResponse } from 'next'

import { requestHandler } from '@/mods/shared/libs/api'
import { getServerCredentials } from '@/mods/shared/libs/api/getUserCredentials'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manager = new AccountManager(getServerCredentials())

  const handlers = {
    get: async () => manager.getPublishableKey(),
  }

  return requestHandler({ handlers, req, res })
}
