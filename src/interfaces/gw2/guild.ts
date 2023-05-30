export type GuildType = {
  id: string
  name: string
  tag: string
  emblem: GuildEmblemType
  level: number
  motd: string
  influence: number
  aetherium: string
  favor: number
  memberCount: number
  memberCapacity: number
}

export type GuildEmblemType = {
  background: {
    id: string
    colors: number[]
  }
  foreground: {
    id: string
    colors: number[]
  }
  flags: string[]
}