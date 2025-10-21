# CCI Helmet Detection System

Proyek ini merupakan sistem **deteksi helm keselamatan secara realtime** menggunakan **Next.js** untuk frontend dan **FastAPI (Python)** untuk backend dengan model **YOLOv8**.

---

### Fitur
- Deteksi helm realtime lewat kamera
- Model YOLOv8 (best.pt)
- Riwayat hasil deteksi otomatis
- Integrasi Next.js ↔ FastAPI
- Status: Aman / Pelanggaran

---

### Backend (FastAPI)
```bash
cd python_api
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```
### Frontend (Next.js)
```bash
cd CCI_Kelompok6
npm install
npm run dev
```
Akses di http://localhost:3000

### Alur Sistem
- Kamera aktif → kirim frame ke /api/detect
- Next.js meneruskan ke backend FastAPI
- YOLOv8 mendeteksi apakah helm terpakai
- Hasil ditampilkan + disimpan ke /api/history
