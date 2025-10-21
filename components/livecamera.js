"use client";
import { useRef, useState, useEffect } from "react";
import { FaPlay, FaStop, FaCamera } from "react-icons/fa";

export default function LiveCamera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);

  // === Start kamera ===
  useEffect(() => {
    let currentStream;

    if (isRunning) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          currentStream = mediaStream;
          setStream(mediaStream);
          if (videoRef.current) videoRef.current.srcObject = mediaStream;
        })
        .catch((err) => {
          console.error("Gagal akses kamera:", err);
          alert("Pastikan izin kamera aktif.");
          setIsRunning(false);
        });
    }

    return () => {
      if (currentStream) currentStream.getTracks().forEach((t) => t.stop());
    };
  }, [isRunning]);

  // === Interval deteksi otomatis ===
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      handleDetect();
    }, 5000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const captureFrame = () => {
    const video = videoRef.current;
    if (!video) return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg");
  };

  const handleDetect = async () => {
    try {
      const img = captureFrame();
      if (!img) return;

      const res = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: img }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("❌ Response bukan JSON:", text);
        return;
      }

      if (!data || !data.result) {
        console.error("⚠️ Response kosong:", data);
        return;
      }

      setResult(data.result);
      console.log("✅ Hasil deteksi:", data);

      // Kirim ke history
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          camera: "CAM-001",
          status: data.result.status,
        }),
      });
    } catch (err) {
      console.error("💥 Error handleDetect:", err);
    }
  };

  const startMonitoring = () => setIsRunning(true);
  const stopMonitoring = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setIsRunning(false);
    setResult(null);
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

      <div className="bg-[#1E2433] aspect-video w-full flex flex-col items-center justify-center rounded-b-xl relative overflow-hidden">
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
            <p className="font-semibold">Camera Inactive</p>
            <p className="text-xs text-gray-400">
              Click <b>Start Monitoring</b> to begin
            </p>
          </div>
        )}

        {result && (
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-semibold">
            Status:{" "}
            <span
              className={`${
                result.status === "Aman" ? "text-green-700" : "text-red-700"
              }`}
            >
              {result.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
