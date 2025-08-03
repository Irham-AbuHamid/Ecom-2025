import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { motion } from "framer-motion"
import { FiUser, FiMail, FiLock } from "react-icons/fi"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import zxcvbn from "zxcvbn"

const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "กรุณากรอกชื่อ-นามสกุล" }),
    email: z.email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "กรุณากรอกรหัสผ่านให้ตรงกัน",
    path: ["confirmPassword"],
  })

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : "").score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  const onSubmit = async (data) => {
    const passwordScore = zxcvbn(data.password).score
    if (passwordScore < 3) {
      toast.warning("รหัสผ่านมีความปลอดภัยต่ำ")
      return
    }
    try {
      await axios.post("http://localhost:3000/api/register", data)
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("fullName")}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("email")}
            />

            {errors.email && (
              <div className="mx-1 text-sm text-red-500">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("password")}
            />
            {errors.password && (
              <div className="mx-1 text-sm text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>

          {watch().password?.length > 0 && (
            <div className="flex">
              {Array.from(Array(5).keys()).map((item, index) => (
                <span className="w-1/5 px-1" key={index}>
                  <div
                    className={`h-2 rounded-md
                  ${
                    passwordScore <= 2
                      ? "bg-red-500"
                      : passwordScore < 4
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  ></div>
                </span>
              ))}
            </div>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <div className="mx-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </div>
            )}
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
