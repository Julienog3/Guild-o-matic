import { create } from 'zustand';
import { GuildType } from '../interfaces/guild.interface';

interface GuildState {
  guilds: GuildType[];
}

const useGuildStore = create<GuildState>((set) => ({
  guilds: [],
}));

export default useGuildStore;
