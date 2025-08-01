import React, { useState, useEffect } from "react"
import { getListAllUser } from "../../api/admin"
import useEcomStore from "./../../store/ecom-store"

const TableUsers = () => {
  const token = useEcomStore((state) => state.token)
  const [users, setUsers] = useState([])

  useEffect(() => {
    handleGetUser(token)
  }, [])

  const handleGetUser = (token) => {
    getListAllUser(token)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <table className="w-full">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>อีเมล</th>
            {/* <th>วันที่แก้ไขล่าสุด</th> */}
            <th>สิทธ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((el, i) => (
            <tr key={el.i}>
              <td>{i + 1} </td>
              <td>{el.email} </td>
              {/* <td>{el.updatedAt}</td> */}
              <td>{el.role}</td>
              <td>{el.enabled ? "เปิดใช้งาน" : "ปิดใช้งาน"}</td>
              <td>Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableUsers
