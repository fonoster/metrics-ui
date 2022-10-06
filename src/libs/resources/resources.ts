import { redis } from './connections'
import { RESOURCE, ROUTR_RESOURCES } from './types'

export const getUsers = async () => getResource(RESOURCE.USERS)

export const getProjects = async (users: string[]) => {
  let projects: string[] = []

  for (const user of users) {
    const projectsByUser = (await redis.smembers('u_' + user)) || []

    if (projectsByUser.length) projects = [...projects, ...projectsByUser]
  }

  return projects
}

export const getResource = async (resource: RESOURCE) => {
  const isRoutrResource = Boolean(
    ROUTR_RESOURCES.map(r => r.toString()).includes(resource?.toLowerCase())
  )

  return isRoutrResource ? (await redis.smembers(resource)) || [] : []
}
