import axios from "axios"

export const getOrdersAdmin = async (token) => {
  return await axios.get("http://localhost:3000/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
