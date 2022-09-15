export interface Callback {
  (options: { itemsPerPage: number }, id: string): Promise<{
    meta: { totalItems: number }
  }>
}

export interface RedisClient {
  get(key: string): Promise<string>
  smembers(key: string): Promise<string[]>
}

export interface RoutrClient {
  connect: () => Promise<void>
  resourceType: (resourceType: string) => RoutrClient
  list: Callback
}

export enum RESOURCE {
  PROVIDER = 'provider',
  PROVIDER_ALIAS = 'gateways',
  AGENT = 'agent',
  DOMAIN = 'domain',
  PROJECT = 'project',
  NUMBER = 'number',
}

export const ROUTR_RESOURCES = [
  RESOURCE.AGENT,
  RESOURCE.DOMAIN,
  RESOURCE.NUMBER,
  RESOURCE.PROVIDER,
]

export interface Entity {
  ref: string
}

export interface User extends Entity {
  email: string
  accessKeyId: string
  status: string
}

export interface Project extends Entity {
  name: string
  userRef: string
  accessKeyId: string
  accessKeySecret: string
}
