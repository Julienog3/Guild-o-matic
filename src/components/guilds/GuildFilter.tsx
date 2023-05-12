import React from "react"

const GuildFilter = (): JSX.Element => {
  return <div className="flex flex-col mb-8">
    <h3 className="font-raleway text-light-gray text-lg font-medium mb-4">Filtrer par Catégories</h3>
    <ul className="flex gap-4">
      <div className="bg-main-blue rounded-full h-10 flex items-center px-6 border border-light-blue text-white font-semibold">
        PVP
      </div>
      <div className="bg-main-blue rounded-full h-10 flex items-center px-6 border border-light-blue text-white font-semibold">
        PVE
      </div>
      <div className="bg-main-blue rounded-full h-10 flex items-center px-6 border border-light-blue text-white font-semibold">
        MCM
      </div>
    </ul>
  </div>
}

export default GuildFilter