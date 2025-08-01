import React, { useState, useEffect } from "react"
import useEcomStore from "./../../store/ecom-store"
import { createProduct, deleteProduct } from "../../api/product"
import { toast } from "react-toastify"
import UploadFile from "./UploadFile"
import { Link } from "react-router-dom"
import { numberFormat } from "../../utils/number"
import { dateFormat } from "../../utils/dateFormat"

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
}

const FormProduct = () => {
  const token = useEcomStore((state) => state.token)
  const getCategory = useEcomStore((state) => state.getCategory)
  const categories = useEcomStore((state) => state.categories)
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  const [form, setForm] = useState(initialState)

  useEffect(() => {
    getCategory()
    getProduct(100)
  }, [])

  const handleOnChang = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createProduct(token, form)

      toast.success(`🎉 เพิ่มสินค้า "${res.data.title}" สำเร็จแล้ว!`)

      // รีเซตฟอร์มกลับค่าเริ่มต้น
      setForm(initialState)

      // โหลดรายการสินค้าล่าสุด
      getProduct()
    } catch (error) {
      console.error("❌ Error creating product:", error)
      toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า")
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "❗ แน่ใจหรือไม่ว่าต้องการลบสินค้านี้?"
    )

    if (!confirmDelete) return

    try {
      const res = await deleteProduct(token, id)
      console.log("✅ Deleted:", res)

      toast.success("🗑️ ลบสินค้าเรียบร้อยแล้ว!")

      // โหลดข้อมูลสินค้าใหม่
      getProduct()
    } catch (error) {
      console.error("❌ Delete error:", error)
      toast.error("เกิดข้อผิดพลาดในการลบสินค้า")
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 px-4 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
        🛒 เพิ่มข้อมูลสินค้า
      </h1>

      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ชื่อสินค้า
          </label>
          <input
            value={form.title}
            onChange={handleOnChang}
            placeholder="Title"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            รายละเอียด
          </label>
          <input
            value={form.description}
            onChange={handleOnChang}
            placeholder="Description"
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ราคา (บาท)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={handleOnChang}
              placeholder="Price"
              name="price"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนสินค้า
            </label>
            <input
              type="number"
              value={form.quantity}
              onChange={handleOnChang}
              placeholder="Quantity"
              name="quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            หมวดหมู่สินค้า
          </label>
          <select
            name="categoryId"
            onChange={handleOnChang}
            required
            value={form.categoryId}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              กรุณาเลือกหมวดหมู่
            </option>
            {categories?.length > 0 ? (
              categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option disabled>ไม่มีหมวดหมู่</option>
            )}
          </select>
        </div>

        {/* Upload File */}
        <UploadFile form={form} setForm={setForm} />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 md:px-6 rounded-md hover:bg-green-700 transition font-semibold shadow text-base md:text-lg"
        >
          เพิ่มสินค้า
        </button>
      </form>

      {/* ตารางแสดงสินค้า */}
      <div className="mt-10 overflow-x-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
          📦 รายการสินค้า
        </h2>
        <table className="min-w-[1000px] border border-gray-300 text-sm text-left">
          <thead className="bg-green-100 text-gray-700 font-medium">
            <tr>
              <th className="py-2 px-4 border">ลำดับ</th>
              <th className="py-2 px-4 border">รูปสินค้า</th>
              <th className="py-2 px-4 border">ชื่อสินค้า</th>
              <th className="py-2 px-4 border">รายละเอียด</th>
              <th className="py-2 px-4 border">ราคา</th>
              <th className="py-2 px-4 border">จำนวนคงเหลือ</th>
              <th className="py-2 px-4 border">ขายแล้ว</th>
              <th className="py-2 px-4 border">อัปเดตล่าสุด</th>
              <th className="py-2 px-4 border">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">
                    <div className="w-20 h-20 rounded-md overflow-hidden shadow border border-gray-200 bg-white flex items-center justify-center">
                      {item.images.length > 0 ? (
                        <img
                          src={item.images[0].url}
                          alt="Product"
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 border">{item.title}</td>
                  <td className="py-2 px-4 border">{item.description}</td>
                  <td className="py-2 px-4 border">
                    {numberFormat(item.price)}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-4 border text-center">{item.sold}</td>
                  <td className="py-2 px-4 border text-sm text-gray-600">
                    {dateFormat(item.updatedAt)}
                  </td>
                  <td>
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mt-2">
                      <Link
                        to={`/admin/product/${item.id}`}
                        className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 shadow"
                      >
                        ✏️ แก้ไข
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200 shadow"
                        type="button"
                      >
                        🗑️ ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 text-center text-gray-500">
                  ไม่มีข้อมูลสินค้า
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FormProduct
