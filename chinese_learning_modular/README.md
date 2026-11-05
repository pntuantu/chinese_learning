# Hoa Ngữ Tinh Thông — Kiến Trúc Đa File (Modular Architecture)

Dự án đã được tách thành các module độc lập để dễ dàng bảo trì, mở rộng dữ liệu và chạy trực tiếp trên **VS Code (Live Server) / GitHub / Vercel / Netlify**.

## Cấu trúc thư mục

```text
├── index.html                              # Trang chủ (Chứa đầy đủ 7 Tab + Modal Túi Đồ Skin + Modal Video Gacha)
├── css/
│   └── style.css                           # Giao diện tùy biến, Khung Thủy Mặc, Rồng Vàng & Mễ Tự Cách
├── assets/
│   └── hero_banner.jpg                     # Hình minh họa Hero Banner
└── js/
    ├── state.js                            # Cấu hình trạng thái toàn cục (APP_STATE, LEVEL_META)
    ├── data/
    │   ├── lessons.js                      # Dữ liệu 14 bài học chuyên sâu (Nhập môn -> HSK 9 & Thương mại)
    │   ├── pinyin_radicals.js              # Dữ liệu Pinyin, Thanh điệu, Biến điệu, 8 Nét & 214 Bộ thủ
    │   ├── lexicon.js                      # Từ vựng chuyên ngành, Tàng Kinh Các (Thành ngữ) & Từ cận nghĩa
    │   └── practice.js                     # Chữ mẫu Mễ Tự Cách, Trắc nghiệm, Ghép câu & Dịch thuật
    └── controllers/
        ├── core_lessons_pinyin.js          # Lưu trữ LocalStorage, Cấp độ XP, Gacha Video, Túi Đồ Skin, Radio, Tab 1 & Tab 2
        ├── lexicon_writing_srs.js          # Tab 3 (Từ điển) & Tab 4 (Bảng vẽ Mễ Tự Cách + SRS 3D)
        └── arena_dashboard_guided.js       # Tab 5, Tab 6, Tab 7 (Phòng Chat WeChat & Nhại Âm), Cloud Sync & Hướng dẫn
```
