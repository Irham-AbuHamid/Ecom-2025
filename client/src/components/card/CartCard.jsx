import React from "react"
import { Trash2, Minus, Plus } from "lucide-react"
import useEcomStore from "../../store/ecom-store"
import { Link } from "react-router-dom"
import { numberFormat } from "../../utils/number"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts)
  // console.log(carts)

  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  )
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
  const clearCart = useEcomStore((state) => state.clearCart)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

  const handleQtyChange = (id, newCount, title) => {
    if (newCount < 1) return
    actionUpdateQuantity(id, newCount)
    toast.info(`แก้จำนวน “${title}” เป็น ${newCount}`)
  }

  const handleRemove = (id, title) => {
    actionRemoveProduct(id)
    toast.warn(`ลบ “${title}” ออกจากตะกร้าแล้ว`)
  }

  return (
    <div className="text-sm text-gray-800 mt-4">
      <h1 className="text-2xl font-bold text-green-600 mb-4 justify-center flex items-center gap-2">
        🛒 ตะกร้าสินค้า
      </h1>

      <div className="border border-gray-200 bg-white p-4 rounded-xl shadow-lg">
        {carts.length === 0 ? (
          <p className="text-center text-gray-400">ยังไม่มีสินค้าในตะกร้า</p>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  clearCart()
                  toast.warn("ลบสินค้าทั้งหมดแล้ว")
                }}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 hover:underline"
              >
                <Trash2 size={18} />
                ลบสินค้าทั้งหมด
              </button>
            </div>
            <AnimatePresence>
              {carts.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="border-b pb-4 mb-4"
                >
                  {/* Row 1 */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                      {item.images?.[0]?.url ? (
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs">
                          No Image
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {item.price}x{item.count}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id, item.title)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="ลบสินค้า"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Row 2 */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center rounded-md overflow-hidden">
                      <button
                        onClick={() =>
                          handleQtyChange(item.id, item.count - 1, item.title)
                        }
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-1"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-1">{item.count}</span>
                      <button
                        onClick={() =>
                          handleQtyChange(item.id, item.count + 1, item.title)
                        }
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-1"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-green-600">
                      {numberFormat(item.price * item.count)} ฿
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}

        {/* รวมยอดทั้งหมด */}
        {carts.length > 0 && (
          <>
            <div className="flex justify-between text-md font-medium pt-2">
              <span>รวมทั้งหมด</span>
              <span className="font-bold text-green-700">
                {numberFormat(getTotalPrice())} ฿
              </span>
            </div>

            <Link to="/cart">
              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl shadow-md font-semibold transition">
                ดำเนินการชำระเงิน
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default CartCard
