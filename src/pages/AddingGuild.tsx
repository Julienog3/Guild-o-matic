import React, { useEffect, useState } from "react"
import Page from "../components/layout/Page"
import usePlayer from "../hooks/usePlayer"
import { keysToCamel } from "../utils/helpers"
import { GW2GuildType } from "../interfaces/gw2/guild"
import { useMutation } from "react-query"
import { guildsService } from "../services/guilds.service"
import { QueryClient } from "@tanstack/query-core"
import AddingGuildHeader from "../components/adding-guild/AddingGuildHeader"
import { GuildCategoryEnum, GuildType } from "../interfaces/guild.interface"

const AddingGuild = (): JSX.Element => {
  const queryClient = new QueryClient()
  
  const { player, apiKey } = usePlayer()
  const [guilds, setGuilds] = useState<any[]>([])

  const [guildToAdd, setGuildToAdd] = useState<GuildType>({
    guildId: '',
    isRecruiting: false,
    description: '',
    discordLink: '',
    categories: [GuildCategoryEnum.MCM]
  })
  
  const mutation = useMutation({
    mutationFn: guildsService.postGuild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guilds'] })
    },
  })

  const [gameGuild, setGameGuild] = useState<GW2GuildType>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(guildToAdd)
    // await addGuild(guildToAdd)
    console.log(guildToAdd)
  }  

  useEffect(() => {
    const getGuild = async (id: string) => {
      return await fetch(`${import.meta.env.VITE_GW2_API_URL}/v2/guild/${id}?access_token=${apiKey}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => keysToCamel(data))
    }

    const getAllGuilds = (guildsId: string[]) => {
      Promise.all(
        [...guildsId].map(async (guildId) => {
          return await getGuild(guildId)
        })
      ).then((guilds) => {
        setGuilds(guilds)
      })
    }

    if (player) {
      getAllGuilds(player.guilds)
    }
  }, [player])

  useEffect(() => {
    const getGuild = async (id: string) => {
      return await fetch(`${import.meta.env.VITE_GW2_API_URL}/v2/guild/${id}?access_token=${apiKey}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => keysToCamel(data))
        .then((guild) => setGameGuild(guild))
    }

    getGuild(guildToAdd.guildId)
  }, [guildToAdd.guildId])
  
  return (
    <Page>
      <div className="flex gap-4 h-full">
        <div className="flex flex-col w-full">
          <AddingGuildHeader />
          <form className="flex flex-col w-1/2 gap-4" id="adding-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="grid grid-cols-3 gap-4">
              <label htmlFor="guild-type-pve">
                <input
                  type="checkbox"
                  id="guild-type-pve"
                  checked={guildToAdd.categories.includes(GuildCategoryEnum.PVE)}
                  className="sr-only peer"
                  onChange={e => setGuildToAdd(guildToAdd => {
                    if (guildToAdd.categories.includes(GuildCategoryEnum.PVE)) {
                      return {
                        ...guildToAdd,
                        categories: guildToAdd.categories.filter((category) => category !== GuildCategoryEnum.PVE)
                      }
                    } else {
                      return {
                        ...guildToAdd,
                        categories: [
                          ...guildToAdd.categories,
                          GuildCategoryEnum.PVE
                        ]
                      }
                    }
                  })}
                />
                <div className="relative text-white font-semibold text-xl flex items-end p-4 justify-center peer bg-main-blue rounded-lg overflow-hidden border peer-checked:border-accent-blue border-light-blue w-full h-40">
                  <p className="z-10">PVE</p>
                  <img className="absolute top-0 w-full h-full object-cover opacity-25" src="/images/bg-mcm.jpg" alt="" />
                </div>
              </label>
              <label htmlFor="guild-type-mcm">
                <input 
                  type="checkbox"
                  id="guild-type-mcm"
                  checked={guildToAdd.categories.includes(GuildCategoryEnum.MCM)}
                  className="sr-only peer"
                  onChange={e => setGuildToAdd(guildToAdd => {
                    console.log(e.target.value)

                    if (guildToAdd.categories.includes(GuildCategoryEnum.MCM)) {
                      return {
                        ...guildToAdd,
                        categories: guildToAdd.categories.filter((category) => category !== GuildCategoryEnum.MCM)
                      }
                    } else {
                      return {
                        ...guildToAdd,
                        categories: [
                          ...guildToAdd.categories,
                          GuildCategoryEnum.MCM
                        ]
                      }
                    }
                  })}
                />
                <div className="text-white font-semibold text-xl flex items-end p-4 justify-center peer bg-main-blue rounded-lg border peer-checked:border-accent-blue border-light-blue w-full h-40">
                  MCM
                </div>
              </label>
              <label htmlFor="guild-type-pvp">
                <input 
                  type="checkbox"
                  id="guild-type-pvp"
                  checked={guildToAdd.categories.includes(GuildCategoryEnum.PVP)}
                  className="sr-only peer"
                  onChange={e => setGuildToAdd(guildToAdd => {
                    if (guildToAdd.categories.includes(GuildCategoryEnum.PVP)) {
                      return {
                        ...guildToAdd,
                        categories: guildToAdd.categories.filter((category) => category !== GuildCategoryEnum.PVP)
                      }
                    } else {
                      return {
                        ...guildToAdd,
                        categories: [
                          ...guildToAdd.categories,
                          GuildCategoryEnum.PVP
                        ]
                      }
                    }
                  })}
                />
                <div className="text-white font-semibold text-xl flex items-end p-4 justify-center peer bg-main-blue rounded-lg border peer-checked:border-accent-blue border-light-blue w-full h-40">
                  PVP
                </div>
              </label>
            </div>
            <label className="relative flex flex-col gap-2 text-light-gray" htmlFor="guilds" aria-required>
              <p>Guilde <span className="text-accent-blue">*</span></p>
              <select 
              name="guilds"
              id="guilds" 
              value={guildToAdd.guildId}
              onChange={e => setGuildToAdd(guildToAdd => ({
                ...guildToAdd,
                guildId: e.target.value
              }))}
              className="bg-main-blue p-4 rounded-lg border border-light-blue text-white"
            >
              {guilds && guilds.map((guild) => {
                return <option key={guild.id} value={guild.id}>{guild.name}</option>
              })}
            </select>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={guildToAdd.isRecruiting}
                onChange={() => setGuildToAdd(guildToAdd => ({
                  ...guildToAdd,
                  isRecruiting: !guildToAdd.isRecruiting
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-light-blue rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
              <span className="ml-3 text-sm text-white">Est ce que la guilde recrute ?</span>
            </label>
            <label className="relative flex flex-col gap-2 text-light-gray" htmlFor="">
              Lien discord
              <input
                type="text"
                className="bg-main-blue w-full p-4 rounded-lg border border-light-blue text-white"
                placeholder="ex : https://discord.com/invite/..."
                value={guildToAdd.discordLink}
                onChange={e => setGuildToAdd(guildToAdd => ({
                  ...guildToAdd,
                  discordLink: e.target.value
                }))}
              />
            </label>
            <label className="relative flex flex-col gap-2 text-light-gray" htmlFor="">
              <p>Description</p>
              <textarea 
                value={guildToAdd.description}
                onChange={e => setGuildToAdd(guildToAdd => ({
                  ...guildToAdd,
                  description: e.target.value
                }))}
                placeholder="Une description complète de votre guilde"
                className="bg-main-blue w-full p-4 rounded-lg border border-light-blue text-white"
              />
            </label>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default AddingGuild