import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import useEcomStore from "../store/ecom-store"
import { currentAdmin } from "../api/auth"
import LoadingToRedirect from "./LoadingToRedirect"

const ProtectRouteAdmin = () => {
  const [ok, setOk] = useState(false)
  const token = useEcomStore((state) => state.token)
  const user = useEcomStore((state) => state.user)

  useEffect(() => {
    if (user && token) {
      currentAdmin(token)
        .then(() => setOk(true))
        .catch(() => setOk(false))
    }
  }, [])

  return ok ? <Outlet /> : <LoadingToRedirect />
}

export default ProtectRouteAdmin
