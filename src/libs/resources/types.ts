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
  PROVIDER = 'gateways',
  AGENT = 'agents',
  DOMAIN = 'domains',
  PROJECT = 'projects',
  NUMBER = 'numbers',
  USERS = 'fn_users',
}

export const ROUTR_RESOURCES = [
  RESOURCE.AGENT,
  RESOURCE.DOMAIN,
  RESOURCE.NUMBER,
  RESOURCE.PROVIDER,
  RESOURCE.PROJECT,
  RESOURCE.USERS,
]

export interface Entity {
  ref: string
  createdOn: string
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

export interface Project {
  ref: string
  createTime: string
}

export enum Range {
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
}

export type RangeType = Range | { start: string; end: string }
