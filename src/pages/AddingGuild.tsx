import React, { useEffect, useState } from "react"
import Page from "../components/layout/Page"
import usePlayer from "../hooks/usePlayer"
import { keysToCamel } from "../utils/helpers"
import { GuildType } from "../interfaces/gw2/guild"
import ReactMarkdown from "react-markdown"
import { useMutation } from "react-query"
import { guildsService } from "../services/guilds.service"
import { QueryClient } from "@tanstack/query-core"

const AddingGuild = (): JSX.Element => {
  const queryClient = new QueryClient()
  
  const { player, apiKey } = usePlayer()
  const [guilds, setGuilds] = useState<any[]>([])

  const [guildToAdd, setGuildToAdd] = useState({
    guildId: '',
    isRecruiting: false,
    description: ''
  })
  
  const mutation = useMutation({
    mutationFn: guildsService.postGuild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guilds'] })
    },
  })

  const [gameGuild, setGameGuild] = useState<GuildType>()

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
          <div className="w-full border-b border-light-blue mb-4">
            <h2 className="text-4xl font-raleway font-semibold text-white mb-4">Ajouter une guilde</h2>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
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
              <span className="ml-3 text-sm  text-white">Est ce que la guilde recrute ?</span>
            </label>
            <label htmlFor="">
              <textarea 
                name="" 
                id="" 
                value={guildToAdd.description}
                onChange={e => setGuildToAdd(guildToAdd => ({
                  ...guildToAdd,
                  description: e.target.value
                }))}
                placeholder="description"
                className="bg-main-blue w-full p-4 rounded-lg border border-light-blue text-white"
              />
            </label>
            <button
              type="submit"
              className="bg-accent-blue rounded-lg p-4 text-lg font-raleway text-white"
            >Submit</button>
          </form>
        </div>
        <div className="p-8 flex w-2/3">
          <article className="rounded-lg w-full p-4 bg-light-blue h-full border border-accent-blue">
            <h2 className="text-white text-2xl font-bold">{gameGuild?.name}</h2>
            <div className="flex gap-4 items-center">
              <span className={`${guildToAdd.isRecruiting ? 'bg-green' : 'bg-red'} w-2 h-2 rounded-full`} />
                {guildToAdd.isRecruiting 
                  ? <p className="text-green text-lg font-medium">Ouvert</p>
                  : <p className="text-red text-lg font-medium">Fermé</p>
                }
            </div>
            <h3 className="text-lg text-white font-medium mb-2">Description</h3>
            <p className="prose">
              <ReactMarkdown>
                {guildToAdd.description}
              </ReactMarkdown>
            </p>
          </article>
        </div>
      </div>
    </Page>
  )
}

export default AddingGuild