import axios from "axios"

export const createProduct = async (token, form) => {
  return await axios.post("http://localhost:3000/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const listProduct = async (count = 20) => {
  return await axios.get("http://localhost:3000/api/products/" + count)
}

export const readProduct = async (token, id) => {
  return await axios.get("http://localhost:3000/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deleteProduct = async (token, id) => {
  return await axios.delete("http://localhost:3000/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateProduct = async (token, id, form) => {
  return await axios.put("http://localhost:3000/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const uploadFiles = async (token, form) => {
  return await axios.post(
    "http://localhost:3000/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
export const removeFiles = async (token, public_id) => {
  return await axios.post(
    "http://localhost:3000/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const searchFilters = async (arg) => {
  // code body
  return axios.post("http://localhost:3000/api/search/filters", arg)
}

export const listProductBy = async (sort, order, limit) => {
  // code body
  return axios.post("http://localhost:3000/api/productby", {
    sort,
    order,
    limit,
  })
}

