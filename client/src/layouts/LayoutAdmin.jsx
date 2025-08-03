import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import SidebarAdmin from "../components/admin/SidebarAdmin"
import HeaderAdmin from "../components/admin/HeaderAdmin"
import { Menu } from "lucide-react"
import MainFooter from "../components/MainFooter"

const LayoutAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-green-50 relative">
      {/* Sidebar: Desktop */}
      <aside className="hidden md:block w-64 bg-green-800 text-white shadow-lg">
        <SidebarAdmin />
      </aside>

      {/* Sidebar: Mobile */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-green-800 z-50 shadow-lg">
            <SidebarAdmin onClose={() => setIsSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white px-4 md:px-6 py-4 shadow-sm border-b flex items-center justify-between">
          {/* Sidebar Toggle Button (Mobile) */}
          <button
            className="md:hidden text-green-800"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <HeaderAdmin />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-green-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutAdmin
