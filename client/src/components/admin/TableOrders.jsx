import React, { useEffect, useState } from "react"
import useEcomStore from "./../../store/ecom-store"
import { getOrdersAdmin } from "./../../api/admin"

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
                  <td>{item.orderStatus}</td>
                  <td>Action</td>
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
