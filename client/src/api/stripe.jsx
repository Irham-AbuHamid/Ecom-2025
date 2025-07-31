import axios from "axios"

export const payment = async (token) =>
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/user/create-checkout-session`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
