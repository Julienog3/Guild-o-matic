import React from "react";
import Page from "../components/layout/Page";
import LinkedButton from "../components/utils/LinkedButton";

function ErrorPage() {
  return (
    <div className="bg-neutral-950 w-full min-h-screen">
      <Page className="flex items-center justify-center w-full flex-col">
        <h2 className="text-5xl font-bold text-white mb-8 max-w-2xl text-center">Oups ! Il semblerait que la page recherchée n&apos;existe plus</h2>
        <LinkedButton path="/">
          Retourner à l&apos;accueil
        </LinkedButton>
      </Page>
    </div>
  )
}

export default ErrorPage