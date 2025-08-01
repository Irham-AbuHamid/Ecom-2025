import React, { useEffect, useState } from "react"
import useEcomStore from "./../../store/ecom-store"
import { getOrdersAdmin, changOrderStatus } from "./../../api/admin"
import { toast } from "react-toastify"
import { numberFormat } from "../../utils/number"
import { dateFormat } from './../../utils/dateFormat';

const TableOrders = () => {
  const token = useEcomStore((state) => state.token)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    handleGetOrder(token)
  }, [])

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeOderStatus = (token, orderId, orderStatus) => {
    changOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res)
        toast.success("อัพเดทสถานะเรียบร้อยแล้ว")
        handleGetOrder(token)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getStatusBadge = (status) => {
    const base =
      "text-xs font-medium px-3 py-1 rounded-full border w-fit inline-block"
    switch (status) {
      case "จัดส่งแล้ว":
        return `${base} bg-green-100 text-green-700 border-green-200`
      case "กำลังจัดส่ง":
        return `${base} bg-yellow-100 text-yellow-700 border-yellow-200`
      case "กำลังดำเนินการ":
        return `${base} bg-blue-100 text-blue-700 border-blue-200`
      case "ยกเลิก":
        return `${base} bg-red-100 text-red-700 border-red-200`
      default:
        return `${base} bg-gray-100 text-gray-600 border-gray-200`
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
        รายการคำสั่งซื้อทั้งหมด
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-center px-4 py-3">ลำดับ</th>
              <th className="text-center px-4 py-3">ผู้ใช้งาน</th>
              <th className="text-center px-4 py-3">วันที่</th>
              <th className="text-center px-4 py-3">สินค้า</th>
              <th className="text-center px-4 py-3">รวม</th>
              <th className="text-center px-4 py-3">สถานะ</th>
              <th className="text-center px-4 py-3">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                <td className="text-center px-4 py-3">
                  {index + 1}
                </td>

                <td className="text-center px-4 py-3">
                  <p className="font-medium text-gray-800">
                    {item.orderedBy.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.orderedBy.address}
                  </p>
                </td>

                <td className="text-center px-4 py-3">
                  {dateFormat(item.createdAt)}
                </td>

                <td className="px-4 py-3 space-y-2">
                  {item.products?.map((product, i) => (
                    <div key={i} className="text-sm">
                      <p className="font-medium">{product.product.title}</p>
                      <span className="text-gray-500 text-xs">
                        {product.count} × {numberFormat(product.product.price)} ฿
                      </span>
                    </div>
                  ))}
                </td>

                <td className="text-center px-4 py-3 text-gray-700 font-semibold">
                  {numberFormat(item.cartTotal)} ฿
                </td>

                <td className="text-center px-4 py-3">
                  <span className={getStatusBadge(item.orderStatus)}>
                    {item.orderStatus}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <select
                    value={item.orderStatus}
                    onChange={(e) =>
                      handleChangeOderStatus(token, item.id, e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-sm text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    เลือก
                    <option value="จัดส่งแล้ว">จัดส่งแล้ว</option>
                    <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                    <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    <option value="ยกเลิก">ยกเลิก</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableOrders
