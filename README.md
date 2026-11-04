# Hoa Ngữ Tinh Thông — Kiến Trúc Đa File (Modular Architecture)

Dự án đã được tách thành các module độc lập để dễ dàng bảo trì, mở rộng dữ liệu và triển khai trên **GitHub / Vercel / Netlify**.

## Cấu trúc thư mục

```text
├── index.html                              # Trang chủ (Entry point chuẩn cho Vercel/Netlify)
├── css/
│   └── style.css                           # Giao diện tùy biến, lưới Mễ Tự Cách & hiệu ứng lật thẻ 3D
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
        ├── core_lessons_pinyin.js          # Lưu trữ LocalStorage, Phát âm TTS, Tab 1 & Tab 2
        ├── lexicon_writing_srs.js          # Tab 3 (Từ điển) & Tab 4 (Bảng vẽ Mễ Tự Cách + SRS 3D)
        └── arena_dashboard_guided.js       # Tab 5, Tab 6, Cloud Sync Firebase & Bộ điều hướng Mục tiêu
```

## Cách thêm bài học hoặc từ vựng mới
- **Thêm bài học mới**: Mở `js/data/lessons.js` và thêm 1 object mới vào mảng `LESSONS_DATA`.
- **Thêm từ vựng / thành ngữ / từ cận nghĩa**: Mở `js/data/lexicon.js` và thêm vào `VOCAB_VAULT_DATA`, `CHENGYU_VAULT_DATA` hoặc `SYNONYM_VAULT_DATA`.
- **Chỉnh sửa định hướng mục tiêu học**: Mở `js/controllers/arena_dashboard_guided.js` tại hằng số `GUIDED_GOALS_CONFIG`.
