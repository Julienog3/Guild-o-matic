export interface GuildType {
  id: string;
  tag?: string;
  memberCount?: number;
  numberCapacity?: number;
  level?: number;
  createdAt?: Date;
  name?: string;
  description: string;
  isRecruiting: boolean;
  guildId: string;
  discordLink: string;
  categories: GuildCategoryEnum[];
  ownerId: string;
}

export interface GuildPayloadInterface {
  description?: string;
  isRecruiting: boolean;
  guildId: string;
  discordLink?: string;
  illustration?: File;
  categories: GuildCategoryEnum[];
  ownerId: string;
}

export enum GuildCategoryEnum {
  MCM = 'mcm',
  PVP = 'pvp',
  PVE = 'pve',
}

export interface GuildCategoryInterface {
  id: string;
  guildId: string;
  categoryId: number;
}

export interface GuildCategoryPayloadInterface {
  guildId: string;
  categoryId: number;
}
