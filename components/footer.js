"use client";
import { FaPhoneAlt, FaEnvelope, FaUserFriends } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { BsShieldCheck } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-[#0B162C] text-white rounded-t-2xl mt-16">
      <div className="container mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <FaPhoneAlt className="text-green-400" />
            Kontak Darurat
          </h4>
          <p className="text-sm">
            <span className="font-semibold text-white">Email :</span>{" "}
            <span className="text-gray-300">safety32@apd.system.com</span>
          </p>
          <p className="text-sm mt-1">
            <span className="font-semibold text-white">Emergency :</span>{" "}
            <span className="text-gray-300">112 (24/7)</span>
          </p>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <HiDocumentText className="text-green-400" />
            Panduan Keselamatan
          </h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <BsShieldCheck className="text-gray-400" /> Standar Penggunaan APD
            </li>
            <li className="flex items-center gap-2">
              <BsShieldCheck className="text-gray-400" /> Prosedur Keselamatan
              Kerja
            </li>
            <li className="flex items-center gap-2">
              <BsShieldCheck className="text-gray-400" /> Panduan Evakuasi
              Darurat
            </li>
          </ul>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <FaUserFriends className="text-green-400" />
            Tim Pengembang
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            Sistem APD Helmet Detection dikembangkan oleh tim 6{" "}
            <span className="font-semibold text-white">The Hack CCI</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Versi 1.0 | 20 Oktober 2025
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mx-6"></div>
      <p className="text-center text-xs text-gray-400 py-4">
        © 2025 APD Helmet Detection System. All rights reserved.
      </p>
    </footer>
  );
}
