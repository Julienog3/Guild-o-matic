import {
  GuildPayloadInterface,
  GuildType,
} from '../../../interfaces/guild.interface';

export enum GuildModalStep {
  GENERAL = 'general',
  DESCRIPTION = 'description',
  IMAGE = 'image',
}

export enum GuildModalMode {
  EDITING = 'editing',
  ADDING = 'adding',
}

export interface GuildModalStepProps {
  mode: GuildModalMode;
  guildPayload: GuildPayloadInterface;
  handleChange: (guild: GuildPayloadInterface) => void;
}
