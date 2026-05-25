# Hoàng & Thảo — Wedding

## Chạy trên máy (dev)

```powershell
cd d:\WEDDINGHT
npm install
npm start
```

Mở http://localhost:3000 (hoặc port khác nếu bận).

## Đưa lên web miễn phí — Vercel

### Bước 1: Đẩy code lên GitHub

1. Tạo repo mới trên https://github.com/new (ví dụ tên `wedding-ht`, **Public** hoặc Private đều được).
2. Trong terminal:

```powershell
cd d:\WEDDINGHT
git init
git add .
git commit -m "Wedding site Hoàng & Thảo"
git branch -M main
git remote add origin https://github.com/TEN_GITHUB/wedding-ht.git
git push -u origin main
```

Đổi `TEN_GITHUB` và tên repo cho đúng.

### Bước 2: Deploy trên Vercel (free)

1. Vào https://vercel.com → **Sign Up** / đăng nhập bằng **GitHub**.
2. **Add New…** → **Project** → chọn repo `wedding-ht`.
3. Giữ mặc định:
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. **Deploy** — đợi ~1–2 phút.

Link global dạng: `https://wedding-ht.vercel.app` (hoặc tên Vercel gợi ý).

### Bước 3: Cập nhật sau này

Mỗi lần sửa code:

```powershell
git add .
git commit -m "Mô tả thay đổi"
git push
```

Vercel tự build và cập nhật site.

### Tên miền riêng (tùy chọn)

Trong Vercel: **Project → Settings → Domains** → thêm domain và làm theo hướng dẫn DNS.
