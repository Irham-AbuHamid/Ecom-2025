import React from "react"
import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"
import MainFooter from "../components/MainFooter"

const LayoutUser = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <MainNav />
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  )
}

export default LayoutUser
