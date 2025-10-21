import { NextResponse } from "next/server";

let history = [];

export async function GET() {
  return NextResponse.json(history);
}

export async function POST(req) {
  try {
    const { camera, status } = await req.json();

    const record = {
      time: new Date().toLocaleTimeString("id-ID", { hour12: false }),
      camera: camera || "CAM-001",
      status: status || "Aman",
    };

    history.unshift(record); // push ke atas biar terbaru muncul dulu

    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error("Error di /api/history:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan history" },
      { status: 500 }
    );
  }
}
