import React from "react"

function Landing(): JSX.Element {
  return (
    <div className="relative bg-bg-blue flex items-center justify-center w-full h-screen">
      <div className="flex flex-col gap-4 items-center z-10">
        <h1 className="text-white font-bold text-6xl">GW2 Guild&apos;<span className="text-accent-blue">finder</span></h1>
        <p className="text-light-gray text-lg font-medium mb-4">La plateforme pour trouver la guilde qui vous correspond</p>
        <button type="submit" className="bg-gradient-to-r rounded-full bg-accent-blue px-6 py-4 text-lg font-raleway text-white w-fit">Se connecter</button>
      </div>
      <img className="absolute top-0 left-0 opacity-25 h-full object-cover w-full" src="./images/bg-landing.jpg" alt="" />
    </div>
  ) 
}

export default Landing