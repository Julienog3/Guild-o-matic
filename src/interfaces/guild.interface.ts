export interface GuildType {
  id?: number
  tag?: string
  memberCount?: number
  numberCapacity?: number
  level?: number
  createdAt?: Date
  name?: string
  description: string
  isRecruiting: boolean
  guildId: string
  discordLink: string
  categories: GuildCategoryEnum[]
}

export enum GuildCategoryEnum {
  MCM = 'mcm',
  PVP = 'pvp',
  PVE = 'pve'
}