import React, { useEffect, useState } from "react"
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/category"
import useEcomStore from "./../../store/ecom-store"
import { toast } from "react-toastify"
import { Trash2 } from "lucide-react"

const FormCategory = () => {
  const token = useEcomStore((state) => state.token)
  const [name, setName] = useState("")
  // const [categories, setCategories] = useState([])
  const categories = useEcomStore((state) => state.categories)
  const getCategory = useEcomStore((state) => state.getCategory)

  useEffect(() => {
    getCategory(token)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name) {
      return toast.warning("Please fill category name")
    }

    try {
      const res = await createCategory(token, { name })
      toast.success(` Added "${res.data.name}" successfully!`)
      setName("") // reset input
      getCategory(token)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id)
      console.log(res)
      toast.warn(` Category ${res.data.name} deleted`)
      getCategory(token)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-3xl font-semibold text-green-700 mb-6 text-center">
        Category Management
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter new category"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition font-semibold"
        >
          Add Category
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-medium text-gray-700 mb-3">
        Current Categories
      </h2>
      <ul className="space-y-2">
        {categories.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md shadow-sm"
          >
            <span className="text-gray-800 font-medium">{item.name}</span>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete category"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FormCategory
