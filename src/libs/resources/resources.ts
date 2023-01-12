import { redis } from './connections'
import {
  Entity,
  Project,
  Range,
  RangeType,
  RESOURCE,
  ROUTR_RESOURCES,
} from './types'

export const getResourcesByRange = async (
  resourceType: RESOURCE,
  resources: string[],
  range: RangeType
) => {
  const entities: Entity[] = []

  for (const resource of resources) {
    const entity = await redis.get(resource)

    if (entity) {
      const payload = JSON.parse(entity)

      entities.push({
        ...payload,
        createdOn:
          resourceType === RESOURCE.PROJECT
            ? (payload as Project)?.createTime
            : payload.createdOn,
      })
    }
  }

  const isCustomRange = typeof range === 'object'

  const date = isCustomRange ? range : undefined

  const end = date ? new Date(date.end) : new Date()
  const start = date ? new Date(date.start) : new Date()

  if (!isCustomRange && range === Range.LAST_7_DAYS) {
    start.setDate(start.getDate() - 7)
  }

  if (!isCustomRange && range === Range.LAST_30_DAYS) {
    start.setDate(start.getDate() - 30)
  }

  return entities.filter(({ createdOn }) => {
    const createdAt = new Date(createdOn)

    return createdAt >= start && createdAt <= end
  })
}

export const getResource = async (resource: RESOURCE, range?: RangeType) => {
  const isRoutrResource = Boolean(
    ROUTR_RESOURCES.map(r => r.toString()).includes(resource?.toLowerCase())
  )

  const resources = isRoutrResource
    ? (await redis.smembers(resource)) || []
    : []

  if (range) {
    return (await getResourcesByRange(resource, resources, range)).map(
      ({ ref }) => ref
    )
  }

  return resources
}

export const getProjects = async (users: string[], range?: RangeType) => {
  let projects: string[] = []

  for (const user of users) {
    const projectsByUser = (await redis.smembers('u_' + user)) || []

    if (projectsByUser.length) projects = [...projects, ...projectsByUser]
  }

  if (range) {
    return (await getResourcesByRange(RESOURCE.PROJECT, projects, range)).map(
      ({ ref }) => ref
    )
  }

  return projects
}

export const getUsers = async (range?: RangeType) =>
  getResource(RESOURCE.USERS, range)
