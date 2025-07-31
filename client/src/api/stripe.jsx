import axios from "axios"

export const payment = async (token) =>
  await axios.post(
    "http://localhost:3000/api/user/secret",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

