import React, { useEffect, useState } from "react"
import useEcomStore from "./../../store/ecom-store"
import { getOrdersAdmin, changOrderStatus } from "./../../api/admin"
import { toast } from "react-toastify"

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

  const handleChangeOderStatus = (token, oderId, orderStatus) => {
    console.log(oderId, orderStatus)
    changOrderStatus(token, oderId, orderStatus)
      .then((res) => {
        console.log(res)
        toast.success("อัพเดทสถานะเรียบร้อยแล้ว")
        handleGetOrder(token)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "จัดส่งแล้ว":
        return "bg-green-200"
      case "กำลังจัดส่ง":
        return "bg-yellow-200"
      case "กำลังดำเนินการ":
        return "bg-blue-200"
      case "ยกเลิก":
        return "bg-red-200"
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 px-4 bg-white rounded-xl shadow-lg">
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ผู้ใช้งาน</th>
              <th>สินค้า</th>
              <th>รวม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => {
              console.log(item)
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>

                  <td>
                    {item.products?.map((product, index) => (
                      <div key={index}>
                        <li>
                          <p>{product.product.title}</p>
                        </li>
                        <span>
                          {product.count}x{product.product.price}
                        </span>
                      </div>
                    ))}
                  </td>

                  <td>{item.cartTotal}</td>

                  <td className={`${getStatusColor(item.orderStatus)}`}>
                    <span>{item.orderStatus}</span>
                  </td>

                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangeOderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option>จัดส่งแล้ว</option>
                      <option>กำลังจัดส่ง</option>
                      <option>กำลังดำเนินการ</option>
                      <option>ยกเลิก</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableOrders
