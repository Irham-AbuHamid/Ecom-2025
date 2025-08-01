import React, { useState, useEffect } from "react"
import {
  changeUserStatus,
  getListAllUser,
  changeUserRole,
} from "../../api/admin"
import useEcomStore from "./../../store/ecom-store"
import { toast } from "react-toastify"

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

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus)
    const value = {
      id: userId,
      enabled: !userStatus,
    }
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res)
        handleGetUser(token)
        toast.success(res.data)
      })
      .catch((err) => console.log(err))
  }

  const handleChangeUserRole = (userId, userRole) => {
    // console.log(userId, userRole)
    const value = {
      id: userId,
      role: userRole,
    }
    changeUserRole(token, value)
      .then((res) => {
        console.log(res)
        handleGetUser(token)
        toast.success(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <table className="w-full">
        <thead className="text-center">
          <tr>
            <th>ลำดับ</th>
            <th>อีเมล</th>
            {/* <th>วันที่แก้ไขล่าสุด</th> */}
            <th>สิทธ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {users?.map((el, i) => (
            <tr key={el.id}>
              <td>{i + 1} </td>
              <td>{el.email} </td>
              {/* <td>{el.updatedAt}</td> */}

              <td>
                <select
                  onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                  value={el.role}
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>

              <td>{el.enabled ? "เปิดใช้งาน" : "ปิดใช้งาน"}</td>
              <td>
                <button
                  className="bg-yellow-400 rounded-md shadow-md p-1"
                  onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                >
                  {el.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableUsers
