import { routr } from '@fonoster/core'

import { redis } from './connections'
import { RESOURCE, ROUTR_RESOURCES } from './types'

export const getUsers = async () => {
  return (await redis.smembers('fn_users')) || []
}

export const getProjects = async (users: string[]) => {
  let projects: string[] = []

  for (const user of users) {
    const projectsByUser = (await redis.smembers('u_' + user)) || []

    if (projectsByUser.length) projects = [...projects, ...projectsByUser]
  }

  return projects
}

export const getResource =
  (projects: string[]) => async (resource: RESOURCE) => {
    const isRoutrResource = Boolean(
      ROUTR_RESOURCES.map(r => r.toString()).includes(resource?.toLowerCase())
    )

    if (isRoutrResource) {
      const res =
        resource.toLowerCase() === RESOURCE.PROVIDER
          ? RESOURCE.PROVIDER_ALIAS
          : `${resource.toLowerCase()}s`

      await routr.connect()
      routr.resourceType(res)

      return (
        await Promise.all<number>(
          projects.map(async (id: string) => {
            const result = await routr.list(
              {
                itemsPerPage: 10_000_000,
              },
              id
            )

            return result.meta.totalItems
          })
        )
      ).reduce((prev: number, cur: number) => prev + cur, 0)
    }

    return 0
  }
