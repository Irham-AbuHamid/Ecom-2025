import React, { useState, useRef, useEffect } from "react"
import { Trash2, Minus, Plus, ListCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import useEcomStore from "../../store/ecom-store"
import { numberFormat } from "../../utils/number"
import { toast } from "react-toastify"
import { createUserCart } from "../../api/user"

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts)
  const user = useEcomStore((state) => state.user)
  const token = useEcomStore((state) => state.token)

  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  )
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
  const actionClearCart = useEcomStore((state) => state.actionClearCart)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

  const totalRef = useRef(null)
  const [isBottomVisible, setIsBottomVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomVisible(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (totalRef.current) observer.observe(totalRef.current)
    return () => {
      if (totalRef.current) observer.unobserve(totalRef.current)
    }
  }, [])

  const navigate = useNavigate()
  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log("Cart saved successfully:", res)
        toast.success("บันทึกตะกร้าสินค้าเรียบร้อยแล้ว", {
          position: "top-center",
        })
        navigate("/checkout")
      })
      .catch((err) => {
        console.error("Error saving cart:", err)
        toast.warning(err.response.data.message)
      })
  }

  const handleQtyChange = (id, newCount, title) => {
    if (newCount < 1) return
    actionUpdateQuantity(id, newCount)
    toast.info(`แก้จำนวน “${title}” เป็น ${newCount}`)
  }

  const handleRemove = (id, title) => {
    actionRemoveProduct(id)
    toast.warn(`ลบ “${title}” ออกจากตะกร้าแล้ว`)
  }

  const handleClearCart = () => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้าทั้งหมด?")) {
      actionClearCart()
      toast.warn("ลบสินค้าทั้งหมดแล้ว")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h3 className="text-3xl font-bold text-green-700 mb-4 flex items-center gap-2">
        🛒 ตะกร้าสินค้า
      </h3>

      <div className="flex gap-2 mb-2">
        <ListCheck size={35} />
        <h3 className="text-2xl font-bold text-black mb-4 flex items-center gap-4">
          <span className="text-gray-500">({cart.length})</span> รายการในตะกร้า
        </h3>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-xl bg-white shadow-xl p-10 text-center text-gray-500 text-lg">
          ยังไม่มีสินค้าในตะกร้า
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
            <div className="flex justify-end">
              <button
                onClick={handleClearCart}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 hover:underline"
              >
                <Trash2 size={18} />
                ลบสินค้าทั้งหมด
              </button>
            </div>

            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="border-b pb-4 mb-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                      {item.images?.[0]?.url ? (
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description || "ไม่มีรายละเอียด"}
                        </p>
                        <p className="text-sm text-gray-500">
                          ฿{numberFormat(item.price)} x {item.count}
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

                  <div className="flex justify-between items-center">
                    <div className="flex items-center rounded-md overflow-hidden">
                      <button
                        onClick={() =>
                          handleQtyChange(item.id, item.count - 1, item.title)
                        }
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-1"
                      >
                        <Minus size={14} />
                      </button>
                      <motion.span
                        key={item.count}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="px-4 py-1"
                      >
                        {item.count}
                      </motion.span>
                      <button
                        onClick={() =>
                          handleQtyChange(item.id, item.count + 1, item.title)
                        }
                        className="bg-gray-100 hover:bg-gray-200 px-2 py-1"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-green-600 font-semibold">
                      {numberFormat(item.price * item.count)} ฿
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div
            ref={totalRef}
            className="bg-white rounded-xl shadow-xl p-6 h-fit sticky top-10"
          >
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>จำนวนทั้งหมด</span>
                <span>{cart.reduce((sum, i) => sum + i.count, 0)} ชิ้น</span>
              </div>
              <div className="flex justify-between text-lg font-medium border-b pb-4">
                <span>รวมทั้งหมด</span>
                <span className="text-green-700 font-bold">
                  {numberFormat(getTotalPrice())} ฿
                </span>
              </div>

              {user ? (
                <Link>
                  <button
                    disabled={cart.length < 1}
                    onClick={handleSaveCart}
                    className="mt-1 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
                  >
                    ดำเนินการชำระเงิน
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition">
                    Login
                  </button>
                </Link>
              )}

              <Link to="/shop">
                <button className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold shadow-md transition">
                  แก้ไขรายการสินค้า
                </button>
              </Link>
            </div>
          </div>

          {!isBottomVisible && (
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md px-4 py-3 z-50 sm:hidden">
              {user ? (
                <Link>
                  <button
                    disabled={cart.length < 1}
                    onClick={handleSaveCart}
                    className="mt-1 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
                  >
                    ดำเนินการชำระเงิน
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition">
                    Login
                  </button>
                </Link>
              )}

              <Link to="/shop">
                <button className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition">
                  แก้ไขรายการสินค้า
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ListCart
