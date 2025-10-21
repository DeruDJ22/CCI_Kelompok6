"use client";
import { useRef, useState, useEffect } from "react";
import { FaPlay, FaStop, FaCamera } from "react-icons/fa";

export default function LiveCamera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let currentStream;

    if (isRunning) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          currentStream = mediaStream;
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.error("Gagal akses kamera:", err);
          alert("Gagal mengakses kamera. Pastikan izin kamera aktif.");
          setIsRunning(false);
        });
    }

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isRunning]);

  const startMonitoring = () => setIsRunning(true);
  const stopMonitoring = () => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setIsRunning(false);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-200">
      <div className="bg-[#0B162C] text-white rounded-t-xl px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCamera className="text-lg" />
          <div>
            <h2 className="font-semibold">Live Camera Feed</h2>
            <p className="text-xs text-gray-300">Real-time Helmet Detection</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 px-5 py-3 bg-[#0B162C] border-b border-gray-300">
        <button
          onClick={startMonitoring}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-semibold w-1/2"
        >
          <FaPlay /> Start Monitoring
        </button>
        <button
          onClick={stopMonitoring}
          className="flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-md text-sm font-semibold w-1/2"
        >
          <FaStop /> Stop Monitoring
        </button>
      </div>

      <div className="bg-[#1E2433] aspect-video w-full flex items-center justify-center rounded-b-xl relative overflow-hidden">
        {isRunning ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="object-cover w-full h-full rounded-b-xl"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400 text-sm select-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 mb-2 opacity-70"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6.75a.75.75 0 00-.75-.75h-3.243m0 0L9.75 3.75m2.007 2.25v5.25M4.5 6.75h15a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 15V9a2.25 2.25 0 012.25-2.25z"
              />
            </svg>
            <p className="font-semibold">Camera Inactive</p>
            <p className="text-xs text-gray-400">
              Click <b>Start Monitoring</b> to begin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
