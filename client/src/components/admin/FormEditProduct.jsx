import React, { useState, useEffect } from "react"
import useEcomStore from "./../../store/ecom-store"
import { createProduct, readProduct, updateProduct } from "../../api/product"
import { toast } from "react-toastify"
import UploadFile from "./UploadFile"
import { useParams, useNavigate } from "react-router-dom"

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
}

const FormEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const token = useEcomStore((state) => state.token)
  const getCategory = useEcomStore((state) => state.getCategory)
  const categories = useEcomStore((state) => state.categories)

  const [form, setForm] = useState(initialState)

  useEffect(() => {
    getCategory()
    fetchProduct(token, id, form)
  }, [])

  const fetchProduct = async (token) => {
    try {
      const res = await readProduct(token, id, form)
      console.log("res from backend", res)
      setForm(res.data)
    } catch (err) {
      console.log("Error Fetch Data", err)
    }
  }
  console.log(form)

  const handleOnChang = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProduct(token, id, form)
      toast.success(`✅ เพิ่มข้อมูล ${res.data.title} สำเร็จ!`)
      navigate("/admin/product")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🛒 ข้อมูลสินค้า
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

        <div className="flex gap-4">
          <div className="w-1/2">
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
          <div className="w-1/2">
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

        {/* Uploade file */}
        <UploadFile form={form} setForm={setForm} />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition font-semibold shadow"
        >
          แก้ไขสินค้า
        </button>
      </form>
    </div>
  )
}

export default FormEditProduct
