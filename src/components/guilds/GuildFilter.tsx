import React from "react"
import Input from "../utils/Input"
import { FiMenu } from "react-icons/fi";
import { BsGridFill } from "react-icons/bs";

const GuildFilter = (): JSX.Element => {
  return <div className="flex flex-col">
      <h3 className="font-raleway text-light-gray text-sm mb-3">Filtrer par Catégories</h3>
      <ul className="flex gap-3">
        <div className="bg-light-blue rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold">
          PVP
        </div>
        <div className="bg-light-blue rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold">
          PVE
        </div>
        <div className="bg-light-blue rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold">
          MCM
        </div>
      </ul>
    </div>
}

export default GuildFilter