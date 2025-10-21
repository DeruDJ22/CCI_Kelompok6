"use client";
import { FaCamera } from "react-icons/fa";

export default function DetectionHistory() {
  const data = [
    { time: "14:23:15", camera: "CAM-001", status: "Aman" },
    { time: "14:23:15", camera: "CAM-001", status: "Pelanggaran" },
    { time: "14:23:15", camera: "CAM-001", status: "Pelanggaran" },
    { time: "14:23:15", camera: "CAM-001", status: "Aman" },
  ];

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
              <th className="p-2 border text-left font-semibold">Snapshot</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
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
                <td className="p-2 border">
                  <button className="flex items-center gap-2 text-black hover:text-gray-600">
                    <FaCamera className="text-base" />
                    <span className="text-sm font-semibold">Lihat</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
