import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, message: "Gambar tidak ditemukan" },
        { status: 400 }
      );
    }

    // Kirim ke backend Python FastAPI
    const res = await fetch("http://localhost:8000/detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64 }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ Response bukan JSON:", text);
      return NextResponse.json(
        { success: false, message: "Response dari Python invalid" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deteksi berhasil (via Python)",
      result: data.result || { status: "Tidak diketahui" },
    });
  } catch (error) {
    console.error("💥 Error di /api/detect:", error);
    return NextResponse.json(
      { success: false, message: "Gagal deteksi", error: error.message },
      { status: 500 }
    );
  }
}
