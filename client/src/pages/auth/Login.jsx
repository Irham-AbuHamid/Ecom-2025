import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { FiMail, FiLock } from "react-icons/fi"
import { motion } from "framer-motion"
import "react-toastify/dist/ReactToastify.css"
import useEcomStore from "../../store/ecom-store"

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      toast.success("✅ Login successful!")

      // รอให้ toast แสดงครบก่อน redirect
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin")
        } else {
          navigate(-1) // กลับไปยังหน้าก่อนหน้า
        }
      }, 1500)
    } catch (err) {
      console.error(err)
      const errMsg = err.response?.data?.message || "Login failed"
      toast.error(`❌ ${errMsg}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FiMail className="text-gray-400 mr-2" />
              <input
                onChange={handleOnChange}
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FiLock className="text-gray-400 mr-2" />
              <input
                onChange={handleOnChange}
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <a
            href="/register"
            className="text-blue-600 hover:underline ml-1 font-medium"
          >
            Register
          </a>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
