import axios from "axios"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { listCategory } from "../api/category"
import { listProduct, searchFilters } from "../api/product"
import _ from "lodash"

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    })
  },
  actionAddToCart: (product) => {
    const carts = get().carts
    const updateCart = [...carts, { ...product, count: 1 }]

    // step unique
    const unique = _.unionWith(updateCart, _.isEqual)

    set({ carts: unique })
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }))
  },
  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }))
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count
    }, 0)
  },
  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:3000/api/login", form)
    set({
      user: res.data.payload,
      token: res.data.token,
    })
    return res
  },
  getCategory: async () => {
    try {
      const res = await listCategory()
      set({ categories: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count)
      set({ products: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg)
      set({ products: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  clearCart: () => set({ carts: [] }),
})

const usePersist = {
  name: "ecom-store",
  Storage: createJSONStorage(() => localStorage),
}
const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore
