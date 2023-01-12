import { NextApiRequest, NextApiResponse } from 'next'

import { requestHandler } from '@/libs/api'
import {
  getProjects,
  getResource,
  getUsers,
  RangeType,
  RESOURCE,
} from '@/libs/resources'
import { getRevenueFromGithub } from '@/libs/resources/revenue-from-github'
import { getRevenueFromStripe } from '@/libs/resources/revenue-from-stripe'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handlers = {
    get: async () => {
      const { start, end } = req.query
      const payload = { start, end } as RangeType

      const users = await getUsers(payload)

      const [revenueFromGithub, revenueFromStripe, projects, numbers] =
        await Promise.all([
          getRevenueFromGithub(),
          getRevenueFromStripe(),
          getProjects(users, payload),
          getResource(RESOURCE.NUMBER, payload),
        ])

      return [
        {
          id: 'revenue_github',
          label: 'Monthly Revenue from Github',
          count: revenueFromGithub,
        },
        {
          id: 'revenue_stripe',
          label: 'Monthly Revenue from Stripe',
          count: revenueFromStripe,
        },
        {
          id: 'calls',
          label: 'Total Calls',
          count: 0,
        },
        {
          id: 'accounts',
          label: 'Registered Account',
          count: users.length,
        },
        {
          id: 'projects',
          label: 'Total Projects',
          count: projects.length,
        },
        {
          id: 'numbers',
          label: 'Total Numbers',
          count: numbers.length,
        },
      ]
    },
  }

  return requestHandler({ handlers, req, res })
}
