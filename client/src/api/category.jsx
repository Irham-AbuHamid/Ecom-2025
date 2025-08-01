import axios from "axios"

export const createCategory = async (token, data) => {
  return await axios.post("http://localhost:3000/api/category", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const listCategory = async () => {
  return await axios.get("http://localhost:3000/api/category")
}
export const removeCategory = async (token, id) => {
  return await axios.delete("http://localhost:3000/api/category/"+id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
