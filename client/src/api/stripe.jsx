import axios from "axios"

export const payment = async (token) =>
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/user/create-payment-intent`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
