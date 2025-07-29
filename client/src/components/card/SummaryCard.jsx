import React, { useState, useEffect } from "react"
import { listUserCart, saveAddress } from "../../api/user"
import useEcomStore from "../../store/ecom-store"
import { numberFormat } from "../../utils/number"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token)
  const [products, setProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [address, setAddress] = useState("")
  const [addressSaved, setAddressSaved] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    hdlGetUserCart(token)
  }, [])

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log('DATA จาก listUserCart:', res.data)
        setProducts(res.data.products)
        setCartTotal(res.data.cartTotal)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const hdlSaveAddress = () => {
    if (!address) {
      return toast.warning("กรุณากรอกที่อยู่")
    }
    saveAddress(token, address)
      .then((res) => {
        console.log(res)
        toast.success(res.data.message)
        setAddressSaved(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่")
    }
    navigate("/user/payment")
  }
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* ฝั่งซ้าย: ข้อมูลผู้ซื้อ */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full lg:w-2/3">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          ข้อมูลผู้ซื้อ
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              ชื่อ-นามสกุล
            </label>
            <input
              type="text"
              placeholder="Jhon Doe"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">อีเมล</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">เบอร์โทร</label>
            <input
              type="tel"
              placeholder="0812345678"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              ที่อยู่จัดส่ง
            </label>
            <textarea
              required
              onClick={(e) => setAddress(e.target.value)}
              placeholder="บ้านเลขที่ / ถนน / เขต / ตำบล / อำเภอ / จังหวัด / รหัสไปรษณีย์"
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3"
            ></textarea>
          </div>
          {/* ปุ่ม Save Address */}
          <button
            onClick={hdlSaveAddress}
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition"
          >
            บันทึกที่อยู่
          </button>
        </form>
      </div>

      {/* ฝั่งขวา: รายละเอียดการสั่งซื้อ */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full lg:w-1/3">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          รายละเอียดการสั่งซื้อ
        </h2>

        <div className="space-y-4 max-h-60 overflow-y-auto border-b pb-4 mb-4">
          {products?.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              {item.images?.[0]?.url ? (
                <img
                  src={item.images[0].url}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <p className="text-green-800 font-medium">
                  {item.product.title}
                </p>
                <p className="text-sm text-gray-500">
                  จำนวน: {item.count} x {numberFormat(item.product.price)} ฿{" "}
                </p>
              </div>
              <p className="text-green-700 font-semibold">
                {numberFormat(item.count * item.product.price)} ฿
              </p>
            </div>
          ))}
        </div>

        {/* สรุปยอด */}
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <div className="flex justify-between">
            <span>ยอดรวม</span>
            <span>{numberFormat(cartTotal)} ฿</span>
          </div>
          <div className="flex justify-between">
            <span>ค่าจัดส่ง</span>
            {/* <span>{numberFormat(shippingFee)}</span> */}
          </div>
          <div className="flex justify-between">
            <span>ส่วนลด</span>
            {/* <span className="text-red-500">-{numberFormat(discount)}</span> */}
          </div>
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-green-800">
            <span>รวมทั้งหมด</span>
            {/* <span>{numberFormat(total)}</span> */}
          </div>
        </div>

        {/* เงื่อนไข & ปุ่ม */}
        <label className="flex items-center gap-2 text-sm text-gray-700 mb-4">
          <input type="checkbox" className="accent-green-600" />
          ฉันยอมรับ{" "}
          <a href="#" className="underline text-green-600">
            เงื่อนไขและข้อตกลง
          </a>
        </label>

        <button
          onClick={hdlGoToPayment}
          // disabled={!addressSaved}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
        >
          ดำเนินการชำระเงิน
        </button>
      </div>
    </div>
  )
}

export default SummaryCard
