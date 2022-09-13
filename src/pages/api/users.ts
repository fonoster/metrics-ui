import Fonoster from '@fonoster/sdk'
import { NextApiRequest, NextApiResponse } from 'next'

import { requestHandler } from '@/mods/shared/libs/api'
import { getUserCredentials } from '@/mods/shared/libs/api/getUserCredentials'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userManager = new Fonoster.Users({
    ...getUserCredentials(req),
    endpoint: process.env.APISERVER_ENDPOINT,
  })

  const handlers = {
    get: async () => userManager.getUser(req.query.ref as string),
  }

  return requestHandler({ handlers, req, res })
}
