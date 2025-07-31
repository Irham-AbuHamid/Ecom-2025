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
        setOrders(res.data.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
        ประวัติการสั่งซื้อ
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-12 text-sm sm:text-base">
          ยังไม่มีประวัติการสั่งซื้อ
        </p>
      ) : (
        orders.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100 mb-6 transition hover:shadow-md"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 mb-4">
              <div>
                <p className="text-sm text-gray-400">วันที่สั่งซื้อ</p>
                <p className="text-xs text-gray-800">
                  {new Date(item.updatedAt).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {/* orderStatus */}
              <div className="text-xs sm:text-sm px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 font-medium w-fit">
                {item.orderStatus}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="p-4 whitespace-nowrap">สินค้า</th>
                    <th className="p-3 text-center whitespace-nowrap">ราคา</th>
                    <th className="p-3 text-center whitespace-nowrap">จำนวน</th>
                    <th className="p-3 text-center whitespace-nowrap">รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {item.products?.map((product, idx) => (
                    <tr
                      key={idx}
                      className=" text-gray-700 hover:bg-gray-50 transition"
                    >
                      {/* สินค้า */}
                      <td className="p-3">{product.product.title}</td>
                      {/* ราคา */}
                      <td className="p-3 text-center">
                        {product.product.price.toLocaleString("th-TH", {
                          style: "currency",
                          currency: "THB",
                        })}
                      </td>
                      {/* จำนวน */}
                      <td className="p-3 text-center">{product.count}</td>
                      {/* รวม */}
                      <td className="p-3 text-center">
                        {(product.count * product.product.price).toLocaleString(
                          "th-TH",
                          {
                            style: "currency",
                            currency: "THB",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="flex justify-end mt-4">
              <div className="text-right">
                <p className="text-gray-400">ราคาสุทธิ</p>
                <p className="text-lg font-semibold text-gray-800">
                  {item.cartTotal.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default HistoryCard
