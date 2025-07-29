import React, { useState } from "react"
import { toast } from "react-toastify"
import Resize from "react-image-file-resizer"
import { removeFiles, uploadFiles } from "../../api/product"
import useEcomStore from "../../store/ecom-store"
import { Loader } from "lucide-react"

const Uploadfile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleOnChange = (e) => {
    const files = e.target.files
    if (files) {
      setIsLoading(true)
      let allFiles = [...form.images] // clone images array

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Validate type
        if (!file.type.startsWith("image/")) {
          toast.error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ`)
          continue
        }

        // Validate size
        if (file.size > 2 * 1024 * 1024) {
          toast.error(`ไฟล์ ${file.name} ใหญ่เกิน 2MB`)
          continue
        }

        // Validate max count
        if (allFiles.length >= 5) {
          toast.error("อัปโหลดได้ไม่เกิน 5 รูป")
          break
        }

        Resize.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFiles(token, data, {
              onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                )
                setUploadProgress(percent)
              },
            })
              .then((res) => {
                allFiles.push(res.data)
                setForm({ ...form, images: allFiles })
                toast.success("อัปโหลดรูปภาพสำเร็จ!")
                setIsLoading(false)
              })
              .catch((err) => {
                console.error(err)
                toast.error("เกิดข้อผิดพลาดในการอัปโหลด")
                setIsLoading(false)
              })
          },
          "base64"
        )
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleOnChange({ target: { files: e.dataTransfer.files } })
  }

  const handleDelete = (public_id) => {
    const images = form.images
    removeFiles(token, public_id)
      .then((res) => {
        const filterImages = images.filter(
          (item) => item.public_id !== public_id
        )
        setForm({ ...form, images: filterImages })
        toast.error(res.data)
      })
      .catch((err) => {
        console.error(err)
        toast.error("ลบรูปไม่สำเร็จ")
      })
  }

  const handleClearAll = async () => {
    const images = form.images

    if (images.length === 0) return

    try {
      // เริ่มโหลด
      setIsLoading(true)

      // ลบรูปทั้งหมดใน Cloudinary
      await Promise.all(images.map((img) => removeFiles(token, img.public_id)))

      // เคลียร์ state
      setForm({ ...form, images: [] })

      toast.info("ลบรูปทั้งหมดแล้ว")
    } catch (err) {
      console.error(err)
      toast.error("ลบรูปจาก Cloudinary ไม่สำเร็จ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="my-6">
      {/* Preview Images */}
      <div className="flex flex-wrap gap-4 mx-4 my-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center w-24 h-24">
            <Loader className="w-6 h-6 animate-spin text-gray-500" />
            <span className="text-xs text-gray-500 mt-1">
              {uploadProgress}%
            </span>
          </div>
        )}

        {form.images.map((item, index) => (
          <div
            key={item.public_id || index}
            className="relative group w-24 h-24 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={item.url}
              alt={`uploaded-${index}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full p-1 shadow-md transition"
              title="ลบรูปภาพ"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {form.images.length > 0 && (
        <div className="mx-4 mb-2">
          <button
            onClick={handleClearAll}
            className="text-sm text-red-500 underline hover:text-red-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "กำลังลบ..." : "ลบรูปภาพทั้งหมด"}
          </button>
        </div>
      )}

      {/* Upload Input with Drag & Drop */}
      <label
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          e.currentTarget.classList.add("ring-2", "ring-blue-400", "bg-blue-50")
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.currentTarget.classList.remove(
            "ring-2",
            "ring-blue-400",
            "bg-blue-50"
          )
        }}
        className="group mx-4 mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
      >
        <div className="text-4xl mb-2">📤</div>
        <p className="text-gray-600 group-hover:text-blue-600 text-sm">
          ลาก & วางไฟล์ที่นี่ หรือ{" "}
          <span className="font-medium underline">คลิกเพื่อเลือก</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          รองรับไฟล์ภาพ .jpg, .png ขนาดไม่เกิน 2MB
        </p>

        <input
          type="file"
          name="images"
          multiple
          onChange={handleOnChange}
          className="hidden"
        />
      </label>
    </div>
  )
}

export default Uploadfile
