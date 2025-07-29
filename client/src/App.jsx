// rafce
import React from "react"
import AppRoutes from "./routes/AppRoutes"
import { ToastContainer, toast } from "react-toastify"

const App = () => {
  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  )
}

export default App
