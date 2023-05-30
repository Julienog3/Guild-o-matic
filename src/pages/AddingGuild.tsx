import React, { useEffect, useState } from "react"
import Page from "../components/layout/Page"
import usePlayer from "../hooks/usePlayer"
import { keysToCamel } from "../utils/helpers"

const AddingGuild = (): JSX.Element => {
  const { player, apiKey } = usePlayer()
  const [guilds, setGuilds] = useState<any[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
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
    console.log('guilds', guilds)
  }, [guilds])

  return (
    <Page>
      <div className="w-full border-b border-light-blue mb-4">
        <h2 className="text-4xl font-raleway font-semibold text-white mb-4">Ajouter une guilde</h2>
      </div>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="salut"/>
        <select name="guilds" id="guilds">
          {guilds && guilds.map((guild) => {
            return <option key={guild.id} value={guild.id}>{guild.name}</option>
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    </Page>
  )
}

export default AddingGuild