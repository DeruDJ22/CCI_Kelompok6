"use client";
import { FaUserCircle, FaShieldAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-[#0B162C] text-white px-6 py-3 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex items-center gap-3">
        <div className="bg-[#132043] p-2 rounded-lg flex items-center justify-center">
          <FaShieldAlt className="text-green-400 text-lg" />
        </div>

        <div className="leading-tight">
          <h1 className="text-sm font-semibold">APD Helmet Detection</h1>
          <p className="text-xs text-gray-300">Safety Monitoring System</p>
        </div>
      </div>

      <div className="flex gap-8 text-sm font-medium">
        <a href="#home" className="hover:text-gray-300 transition-colors">
          Dashboard
        </a>
        <a href="#monitoring" className="hover:text-gray-300 transition-colors">
          Monitoring
        </a>
        <a href="#riwayat" className="hover:text-gray-300 transition-colors">
          Riwayat
        </a>
        <a href="#faq" className="hover:text-gray-300 transition-colors">
          FAQ
        </a>
      </div>

      <div className="flex items-center justify-center">
        <FaUserCircle className="text-green-400 text-2xl cursor-pointer hover:opacity-80 transition" />
      </div>
    </nav>
  );
}
