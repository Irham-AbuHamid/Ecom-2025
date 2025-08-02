import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import Cart from "./../pages/Cart"

import Checkout from "../pages/Checkout"

import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"

import Layout from "../layouts/Layout"

import LayoutAdmin from "./../layouts/LayoutAdmin"
import Category from "./../pages/admin/Category"
import Dashboard from "./../pages/admin/Dashboard"
import Manage from "./../pages/admin/Manage"
import Product from "./../pages/admin/Product"

import LayoutUser from "../layouts/LayoutUser"

import HomeUser from "./../pages/user/HomeUser"

import ProtectRouteUser from "./ProtectRouteUser"
import ProtectRouteAdmin from "./ProtectRouteAdmin"
import EditProduct from "../pages/admin/EditProduct"
import Payment from "../pages/user/Payment"
import History from "./../pages/user/History"
import ManageOrders from "./../pages/admin/ManageOrders"
import ProductDetail from "../pages/ProductDetail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin />, // 🛡️ Guard Route
    children: [
      {
        path: "",
        element: <LayoutAdmin />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "category", element: <Category /> },
          { path: "product", element: <Product /> },
          { path: "product/:id", element: <EditProduct /> },
          { path: "mange", element: <Manage /> },
          { path: "orders", element: <ManageOrders /> },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser />, // 🛡️ Guard Route
    children: [
      {
        path: "",
        element: <LayoutUser />,
        children: [
          { index: true, element: <HomeUser /> },
          { path: "payment", element: <Payment /> },
          { path: "history", element: <History /> },
        ],
      },
    ],
  },
])

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default AppRoutes
