import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X } from "lucide-react"
import ProductCard from "../components/card/ProductCard"
import useEcomStore from "../store/ecom-store"
import SearchCard from "../components/card/SearchCard"
import CartCard from "../components/card/CartCard"

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  const [isCartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className="min-h-screen bg-white relative">
      {/* Mobile Cart Button */}
      <div className="fixed bottom-4 right-4 z-30 lg:hidden">
        <button
          onClick={() => setCartOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-xl flex items-center gap-2"
        >
          <ShoppingCart size={20} />
          <span className="font-semibold text-sm">ตะกร้าสินค้า</span>
        </button>
      </div>

      {/* Drawer Cart Mobile */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex justify-end"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setCartOpen(false)}
            />

            {/* Drawer Content */}
            <div className="relative z-50 w-80 bg-white h-full shadow-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-green-700">
                  🛒 ตะกร้าสินค้า
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <CartCard />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:p-8">
        {/* Sidebar Search */}
        <div className="lg:col-span-3 bg-gray-50 rounded-2xl p-4 shadow-md border border-gray-100 h-fit">
          <SearchCard />
        </div>

        {/* Product List */}
        <div className="lg:col-span-6">
          <p className="text-2xl font-bold text-green-700 mb-4">
            🛍️ สินค้าทั้งหมด ({products.length} รายการ)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Cart (Desktop only) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-6 h-fit bg-green-50 rounded-2xl shadow-lg p-4 border border-green-200">
          <CartCard />
        </div>
      </div>
    </div>
  )
}

export default Shop
