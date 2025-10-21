from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import numpy as np
import base64
import cv2

app = FastAPI()
model = YOLO("models/best.pt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "API deteksi helm aktif"}

@app.post("/detect")
async def detect(request: Request):
    try:
        data = await request.json()
        img_data = data.get("imageBase64")

        if not img_data:
            return {"success": False, "message": "Gambar tidak ditemukan"}

        img_bytes = base64.b64decode(img_data.split(",")[1])
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        results = model(img)
        boxes = []

        for r in results[0].boxes:
            boxes.append({
                "cls": model.names[int(r.cls[0])],
                "conf": float(r.conf[0]),
                "xyxy": r.xyxy[0].tolist()
            })

        detected_classes = [b["cls"].lower() for b in boxes]
        status = "Aman" if any("helmet" in c for c in detected_classes) else "Pelanggaran"

        return {
            "success": True,
            "message": "Deteksi berhasil",
            "result": {
                "status": status,
                "objects": boxes,
            }
        }

    except Exception as e:
        print("Error:", e)
        return {"success": False, "message": str(e)}
