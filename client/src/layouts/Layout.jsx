import React from "react"
import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"

const Layout = () => {
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

      {/* Footer (Optional) */}
      {/* <footer className="py-4 text-center text-sm text-gray-500">
        © 2025 Your Shop. All rights reserved.
      </footer> */}
    </div>
  )
}

export default Layout
