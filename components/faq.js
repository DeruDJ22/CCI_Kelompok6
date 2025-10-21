"use client";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      q: "Mengapa memakai helm sangat penting di area kerja?",
      a: "Helm berfungsi melindungi kepala dari risiko cedera akibat benturan atau jatuhan benda keras di area kerja.",
    },
    {
      q: "Apa yang terjadi jika pekerja tidak menggunakan APD?",
      a: "Pekerja berisiko mengalami cedera berat atau kecelakaan fatal. Penggunaan APD merupakan kewajiban keselamatan.",
    },
    {
      q: "Bagaimana cara memastikan helm yang digunakan aman?",
      a: "Pastikan helm dalam kondisi baik, tidak retak, dan tali pengikat berfungsi dengan benar.",
    },
    {
      q: "Kapan helm kerja harus diganti?",
      a: "Ganti helm setiap 2-3 tahun atau segera jika mengalami kerusakan atau benturan keras.",
    },
  ];

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-[#0B162C] text-white px-5 py-3 flex items-center gap-3">
        <FaQuestionCircle className="text-2xl" />
        <div>
          <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
          <p className="text-sm text-gray-300">
            Panduan keselamatan dan informasi helm pelindung
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {questions.map((item, i) => (
          <div
            key={i}
            className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => toggle(i)}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">{item.q}</h4>
              <IoChevronDown
                className={`transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-sm text-gray-600"
              >
                {item.a}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
