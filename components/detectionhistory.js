"use client";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

export default function DetectionHistory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Gagal ambil history:", err);
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 mt-10">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">
          Riwayat Deteksi Terkini
        </h3>
        <p className="text-sm text-gray-500">
          Daftar deteksi dan pelanggaran hari ini
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b border-gray-300">
              <th className="p-2 border text-left font-semibold">Waktu</th>
              <th className="p-2 border text-left font-semibold">ID Kamera</th>
              <th className="p-2 border text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center text-gray-400 py-4 italic"
                >
                  Belum ada data deteksi
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-2 border text-gray-700">{row.time}</td>
                  <td className="p-2 border text-gray-700">{row.camera}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Aman"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
