import React from "react"
import { Facebook, Instagram, Twitter } from "lucide-react"
const MainFooter = () => {
  return (
    <div className="bg-gray-200">
      <footer className="flex justify-between max-w-7xl mx-auto py-6 px-4 text-center text-gray-600">
        <p>Copyright © 2025 Abuhamid Inc. All rights reserved.</p>

        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <Facebook size={16} />
          </a>
          <a href="#" className="text-gray-500 hover:text-pink-500">
            <Instagram size={16} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default MainFooter
