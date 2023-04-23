import { Outlet } from "react-router-dom"
import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {

  return (
    <div className="bg-neutral-950 w-full min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
