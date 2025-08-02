import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { productDetail } from "../../api/product"
import { numberFormat } from "./../../utils/number"
import useEcomStore from "../../store/ecom-store"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Check } from "lucide-react"
import { toast } from "react-toastify"

const ProductDetailCard = (item) => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    fetchData(id)
  }, [])

  const fetchData = async (id) => {
    try {
      const res = await productDetail(id)
      console.log(res.data)
      setProduct(res.data)
    } catch (error) {
      console.error("โหลดข้อมูลสินค้าไม่สำเร็จ:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-20">กำลังโหลด...</div>
  if (!product)
    return <div className="text-center py-20">ไม่พบข้อมูลสินค้า</div>

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
      {/* รูปสินค้า */}
      <div className="w-full md:w-1/2">
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-96 object-contain rounded-xl"
          />
        ) : (
          <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-gray-500">
            ไม่มีรูป
          </div>
        )}
      </div>

      {/* รายละเอียดสินค้า */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">
            {product.description}
          </p>
        </div>

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
    </div>
  )
}

export default ProductDetailCard
