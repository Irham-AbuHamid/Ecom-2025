import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react"
import useEcomStore from "./../store/ecom-store"

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts)
  const user = useEcomStore((state) => state.user)
  const logout = useEcomStore((state) => state.logout)

  // console.log(user)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const totalCart = carts.length

  const toggleDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen)
  }

  const menuItems = ["Home", "Shop", "Cart"]

  const authItems = !user ? ["Register", "Login"] : []

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-green-500 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-white text-3xl font-semibold tracking-wide hover:text-yellow-300 transition duration-300"
          >
            LOGO
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[...menuItems, ...authItems].map((item) => {
              const path =
                "/" + (item.toLowerCase() === "home" ? "" : item.toLowerCase())
              const isCart = item === "Cart"

              return (
                <NavLink
                  key={item}
                  to={path}
                  className={({ isActive }) =>
                    [
                      "relative flex items-center justify-center text-lg transition duration-300 rounded-md",
                      isActive
                        ? "text-green-600 px-3 py-2 bg-white font-semibold "
                        : "text-white px-3 py-2 hover:text-green-600 hover:bg-gray-200",
                    ].join(" ")
                  }
                >
                  {item}
                  {isCart && totalCart > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {totalCart}
                    </span>
                  )}
                </NavLink>
              )
            })}

            {/* User Dropdown Desktop */}

            {user && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-1 text-white hover:text-yellow-300 transition"
                >
                  <User className="w-5 h-5" />
                  <span>{user.username || "User"}</span>
                  <ChevronDown />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/user/history"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      History
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Top Right Menu */}
          <div className="md:hidden flex items-center gap-4">
            {/* User Dropdown Mobile */}
            {user && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-1 text-white hover:text-yellow-300 transition"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user.username || "User"}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/user/history"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      History
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setUserDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="text-white hover:text-yellow-300 transition"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-emerald-500 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 py-4 px-6 space-y-3" : "max-h-0"
        }`}
      >
        {[...menuItems, ...authItems].map((item) => {
          const path =
            "/" + (item.toLowerCase() === "home" ? "" : item.toLowerCase())
          const isCart = item === "Cart"

          return (
            <NavLink
              key={item}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                [
                  "relative flex items-center justify-center text-lg transition duration-300 py-2 rounded-md",
                  isActive
                    ? "bg-white text-green-600 font-semibold"
                    : "text-white hover:bg-white hover:text-green-600",
                ].join(" ")
              }
            >
              {item}
              {isCart && totalCart > 0 && (
                <span className="ml-2 relative bg-green-600 hover:bg-green-700 text-white rounded-full p-2 shadow-md transition">
                  <ShoppingCart size={15} />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse shadow-md">
                    {totalCart}
                  </span>
                </span>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default MainNav
