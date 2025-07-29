import React from "react"
import { Bell, UserCircle2 } from "lucide-react"

const HeaderAdmin = () => {
  return (
    <div className="flex items-center justify-between h-16">
      {/* Left: Title */}
      <div className="text-xl font-semibold text-green-800">
        Admin Dashboard
      </div>

      {/* Right: Notification & User */}
      <div className="flex items-center space-x-4">
        {/* Notification */}
        <button className="relative p-2 hover:bg-green-100 rounded-full transition">
          <Bell className="w-5 h-5 text-green-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <UserCircle2 className="w-8 h-8 text-green-700" />
          <span className="text-sm text-gray-700 font-medium">Admin</span>
        </div>
      </div>
    </div>
  )
}

export default HeaderAdmin
