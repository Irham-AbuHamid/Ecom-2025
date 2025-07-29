import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval)
          setRedirect(true)
        }
        return currentCount - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-2">ไม่มีสิทธิ์เข้าถึง</h2>
      <p className="text-gray-700">
        จะกลับสู่หน้าหลักใน <span className="font-bold">{count}</span> วินาที...
      </p>
    </div>
  )
}

export default LoadingToRedirect
