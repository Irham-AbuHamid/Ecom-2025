import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import useEcomStore from "../../store/ecom-store"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { numberFormat } from "../../utils/number"

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const Products = useEcomStore((state) => state.products)
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

  const getCategory = useEcomStore((state) => state.getCategory)
  const categories = useEcomStore((state) => state.categories)

  const [text, setText] = useState("")
  const [categorySelected, setCategorySelected] = useState([])
  const [price, setPrice] = useState([100, 80000])
  const [ok, setOk] = useState(false)

  useEffect(() => {
    getCategory()
  }, [])

  // ค้นหาด้วยคำ
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text })
      } else {
        getProduct()
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [text])

  // ค้นหาด้วยหมวดหมู่
  const handleCheck = (e) => {
    const val = e.target.value
    const inState = [...categorySelected]
    const findCheck = inState.indexOf(val)

    if (findCheck === -1) {
      inState.push(val)
    } else {
      inState.splice(findCheck, 1)
    }

    setCategorySelected(inState)

    if (inState.length > 0) {
      actionSearchFilters({ category: inState })
    } else {
      getProduct()
    }
  }

  // ค้นหาด้วยราคา
  useEffect(() => {
    actionSearchFilters({ price })
  }, [ok])

  const handlePrice = (value) => {
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  const handleReset = () => {
    setText("")
    setCategorySelected([])
    setPrice([100, 80000])
    getProduct()
  }

  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg mx-auto mt-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        🔍 ค้นหาสินค้า
      </h2>
      <p className="text-center text-sm text-gray-500">
        กรองสินค้าตามที่คุณต้องการ
      </p>

      {/* Search by Text */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">ค้นหาด้วยคำ</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="เช่น Keyboard, Mouse..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
        />
      </div>

      {/* Search by Category */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          📁 หมวดหมู่สินค้า
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {categories.map((item) => {
            const idStr = String(item.id)
            return (
              <label
                key={item.id}
                className="flex items-center space-x-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  value={idStr}
                  checked={categorySelected.includes(idStr)}
                  onChange={handleCheck}
                  className="accent-blue-500"
                />
                <span>{item.name}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Search by Price */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          💸 ค้นหาตามราคา
        </h3>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>ต่ำสุด : {numberFormat(price[0])} ฿</span>
          <span>สูงสุด : {numberFormat(price[1])} ฿</span>
        </div>
        <Slider
          onChange={handlePrice}
          range
          min={0}
          max={100000}
          value={price}
          styles={{
            track: { backgroundColor: "#3b82f6", height: 6 },
            handle: {
              borderColor: "#3b82f6",
              backgroundColor: "#fff",
              borderWidth: 2,
              width: 20,
              height: 20,
              marginTop: -7,
              boxShadow: "0 0 0 3px rgba(59,130,246,0.2)",
            },
            rail: { backgroundColor: "#e5e7eb", height: 6 },
          }}
        />
      </div>

      {/* Reset + Count */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600"
        >
          📦 พบสินค้า <strong>{Products.length}</strong> รายการ
        </motion.span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
        >
          ล้างตัวกรอง
        </motion.button>
      </div>
    </motion.div>
  )
}

export default SearchCard
