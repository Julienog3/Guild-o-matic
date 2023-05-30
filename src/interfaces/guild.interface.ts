export interface Guild {
  id: number
  tag: string
  memberCount: number
  numberCapacity: number
  level: number
  createdAt: Date
  name: string
  description: string
  isRecruiting: boolean
  guildId: string
}

export enum GuildCategory {

}