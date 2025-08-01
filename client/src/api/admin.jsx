import axios from "axios"

export const getOrdersAdmin = async (token) => {
  return await axios.get("http://localhost:3000/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const changOrderStatus = async (token, orderId, orderStatus) => {
  return await axios.put(
    "http://localhost:3000/api/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getListAllUser = async (token) => {
  return await axios.get("http://localhost:3000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const changeUserStatus = async (token, value) => {
  return await axios.post("http://localhost:3000/api/change-status", value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const changeUserRole = async (token, value) => {
  return await axios.post("http://localhost:3000/api/change-role", value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
