import { NextApiRequest, NextApiResponse } from 'next'

import { requestHandler } from '@/libs/api'
import { getProjects, getResource, getUsers, RESOURCE } from '@/libs/resources'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handlers = {
    get: async () => {
      const response = [
        {
          id: 'calls',
          label: 'Total Calls',
          count: 0,
        },
        {
          id: 'revenue_github',
          label: 'Monthly Revenue from Github',
          count: 'Coming soon...',
        },
        {
          id: 'revenue_stripe',
          label: 'Monthly Revenue from Stripe',
          count: 'Coming soon...',
        },
      ]

      const users = await getUsers()
      const projects = await getProjects(users)

      const numbers = await getResource(RESOURCE.NUMBER)

      response.push({
        id: 'accounts',
        label: 'Registered Account',
        count: users.length,
      })

      response.push({
        id: 'projects',
        label: 'Total Projects',
        count: projects.length,
      })

      response.push({
        id: 'numbers',
        label: 'Total Numbers',
        count: numbers.length,
      })

      return response
    },
  }
  return requestHandler({ handlers, req, res })
}
