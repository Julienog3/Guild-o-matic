export type GW2GuildType = {
  id: string
  name: string
  tag: string
  emblem: GW2GuildEmblemType
  level: number
  motd: string
  influence: number
  aetherium: string
  favor: number
  memberCount: number
  memberCapacity: number
}

export type GW2GuildEmblemType = {
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