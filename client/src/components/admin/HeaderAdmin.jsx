import React from "react"
import { Bell, UserCircle2 } from "lucide-react"

const HeaderAdmin = () => {
  return (
    <div className="flex mx-auto">
      {/* Notification & User */}
      <div className="flex items-center space-x-2 ">
        {/* Notification */}
        <button className="relative p-2 hover:bg-green-100 rounded-full transition">
          <Bell size={30} className=" text-green-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Info */}
        <UserCircle2
          size={30}
          className=" text-green-700  hover:bg-green-100 rounded-full transition"
        />
      </div>
    </div>
  )
}

export default HeaderAdmin
