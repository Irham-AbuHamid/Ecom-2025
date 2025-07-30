import React, { useState, useEffect } from "react"
import { getOrders } from "./../../api/user"
import useEcomStore from "../../store/ecom-store"

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    hdlGetOrders(token)
  }, [])

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log(res)
        setOrders(res.data.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        ประวัติการสั่งซื้อ
      </h1>

      {/* คลุมหมด */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-medium text-gray-800">{item.updatedAt}</p>
          </div>
          <div className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            {item.orderStatus}
          </div>
        </div>

        {/* Table Loop Product */}

        {orders?.map((item, index) => {
          // console.log(item)

          return (
            <div key={index} className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <th className="p-3">สินค้า</th>
                    <th className="p-3 text-right">ราคา</th>
                    <th className="p-3 text-right">จำนวน</th>
                    <th className="p-3 text-right">รวม</th>
                  </tr>
                </thead>

                <tbody>
                  {item.products?.map((product, index) => {
                    console.log(product)
                    return (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">{product.product.title}</td>
                        <td className="p-3 text-right">{product.product.price}</td>
                        <td className="p-3 text-right">{product.count}</td>
                        <td className="p-3 text-right">{product.count * product.product.price}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}

        {/* Total */}
        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-500">ราคาสุทธิ</p>
            <p className="text-xl font-semibold text-gray-800">{item.cartTotal}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryCard
