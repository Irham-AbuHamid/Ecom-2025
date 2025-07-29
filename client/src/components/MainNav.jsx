import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import useEcomStore from "./../store/ecom-store"
import { ShoppingCart } from "lucide-react"

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts)
  const [open, setOpen] = useState(false)

  // คำนวณจำนวนรวมสินค้าในตะกร้า
  const totalCart = carts.length

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
            {["Home", "Shop", "Cart", "Register", "Login"].map((item) => {
              const path =
                "/" + (item.toLowerCase() === "home" ? "" : item.toLowerCase())
              const isCart = item === "Cart"

              return (
                <Link
                  key={item}
                  to={path}
                  className="relative text-white text-lg transition duration-300 justify-center flex items-center rounded-md hover:text-green-800"
                >
                  {item}
                  {isCart && totalCart > 0 && (
                    <span className="absolute -top-2 -right-5 bg-red-600 text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {totalCart}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="relative text-white text-lg transition duration-300 justify-center flex items-center py-2 rounded-md hover:text-green-600"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-emerald-500 transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 py-4 px-6 space-y-3" : "max-h-0"
        }`}
      >
        {["Home", "Shop", "Cart", "Register", "Login"].map((item) => {
          const path =
            "/" + (item.toLowerCase() === "home" ? "" : item.toLowerCase())
          const isCart = item === "Cart"

          return (
            <Link
              key={item}
              to={path}
              onClick={() => setOpen(false)}
              className="relative text-white text-lg transition duration-300 justify-center flex items-center py-2 rounded-md hover:bg-white hover:text-green-600"
            >
              {item}
              {isCart && totalCart > 0 && (
                <button className="relative ml-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition">
                  <ShoppingCart size={15} />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse shadow-md">
                    {totalCart}
                  </span>
                </button>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MainNav
