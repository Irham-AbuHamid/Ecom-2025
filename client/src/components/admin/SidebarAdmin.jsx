import React from "react"
import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Settings,
  Layers,
  Package,
  LogOut,
  X,
} from "lucide-react"

const SidebarAdmin = ({ onClose }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
      isActive
        ? "bg-green-700 text-white"
        : "text-green-100 hover:bg-green-700/50"
    }`

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Top: Logo + Close Button (Mobile only) */}
      <div className="p-6 border-b border-green-700 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>

        {/* ปุ่มปิดเมนูในมือถือ */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-white focus:outline-none"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Middle: Menu */}
      <nav className="flex-1 p-4 space-y-1">
        <NavLink to="/admin" end className={linkClass} onClick={onClose}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/mange" className={linkClass} onClick={onClose}>
          <Settings size={18} />
          <span>Manage</span>
        </NavLink>

        <NavLink to="/admin/category" className={linkClass} onClick={onClose}>
          <Layers size={18} />
          <span>Category</span>
        </NavLink>

        <NavLink to="/admin/product" className={linkClass} onClick={onClose}>
          <Package size={18} />
          <span>Product</span>
        </NavLink>

        <NavLink to="/admin/Orders" className={linkClass} onClick={onClose}>
          <Package size={18} />
          <span>Orders</span>
        </NavLink>
      </nav>

      {/* Bottom: Logout */}
      <div className="p-4 border-t border-green-700">
        <NavLink to="/logout" className={linkClass} onClick={onClose}>
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  )
}

export default SidebarAdmin
