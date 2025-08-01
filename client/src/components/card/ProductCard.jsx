import React from "react"
import { ShoppingCart, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import useEcomStore from "../../store/ecom-store"
import { numberFormat } from "../../utils/number"

const ProductCard = ({ item }) => {
  const actionAddToCart = useEcomStore((s) => s.actionAddToCart)
  const actionRemoveProduct = useEcomStore((s) => s.actionRemoveProduct)
  const carts = useEcomStore((s) => s.carts)

  const inCart = carts.find((i) => i.id === item.id)

  const handleAddToCart = () => {
    actionAddToCart(item)
    toast.success(`เพิ่ม “${item.title}” ลงในตะกร้าแล้ว`)
  }

  const handleRemoveFromCart = () => {
    actionRemoveProduct(item.id)
    toast.warn(`ลบ “${item.title}” ออกจากตะกร้าแล้ว`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* รูปสินค้า */}
      <div className="relative">
        {item.images?.[0]?.url ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-40 sm:h-48 object-cover "
          />
        ) : (
          <div className="w-full h-40 sm:h-48 bg-gray-100 flex items-center justify-center text-sm text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* รายละเอียด */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <p className="text-md font-semibold text-gray-800 truncate">
            {item.title}
          </p>
          <p className="text-sm text-gray-500 mt-1 break-words max-h-[3.5rem] overflow-hidden">
            {item.description}
          </p>
        </div>

        {/* ราคา + ปุ่ม */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-600 font-bold text-lg">
            {numberFormat(item.price)} ฿
          </span>

          {inCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="relative p-2 bg-green-100 hover:bg-red-100 text-green-700 hover:text-red-600 rounded-full shadow-md transition"
              title={`คลิกเพื่อลบสินค้า ออกจากตะกร้า`}
            >
              <Check size={18} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={inCart.count}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow"
                >
                  {inCart.count}
                </motion.span>
              </AnimatePresence>
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition"
              title="เพิ่มลงตะกร้า"
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
