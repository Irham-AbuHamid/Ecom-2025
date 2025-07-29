import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { motion } from "framer-motion"
import { FiUser, FiMail, FiLock } from "react-icons/fi"
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      toast.error("❌ Passwords do not match!")
      return
    }

    try {
      await axios.post("http://localhost:3000/api/register", form)
      toast.success("✅ Registered successfully!")
      setTimeout(() => navigate("/"), 3000)
    } catch (err) {
      const errMsg = err.response?.data?.message || "Something went wrong"
      toast.error(`❌ ${errMsg}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </a>
        </p>
      </motion.div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default Register
