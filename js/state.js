// Quản lý trạng thái toàn cục (Global State & Level Metadata)
// 1. GLOBAL STATE & CONFIGURATION
    // =========================================================================
    const APP_STATE = {
      scriptMode: 'simp',       // 'simp' | 'trad'
      showPinyin: true,
      showHanViet: true,
      showMeaning: true,
      speechRate: 0.95,
      globalLevel: 'ALL',       // 'ALL' | 'LVL0' | 'LVL1' | 'LVL2' | 'LVL3' | 'LVL4' | 'BIZ'
      guidedGoal: 'ALL',        // 'ALL' | 'SPEAKING' | 'HSK' | 'BUSINESS' | 'CLASSICAL'
      compassExpanded: true,
      forceShowWritingCanvas: false,
      activeMainTab: 'lessons',
      activeLessonId: 'L01',
      completedLessons: ['L01', 'L03'],
      savedVocabIds: ['V01', 'V08', 'V15', 'V22'],
      onlySavedVocab: false,
      xp: 320,
      currentLevel: 3, // Numeric Level 1 -> 20+
      gachaTickets: 5, // Gacha & Lucky wheel pulls
      rewardedLessonIds: ['L01', 'L02'], // Anti-spam tracking for lesson XP
      streakDays: 3,
      lastStudyDate: '2026-11-03',
      checkedInToday: false,
      darkMode: false,
      hanziFontScale: 'normal',
      unlockedBadges: ['B_FIRST_STEP', 'B_STREAK_3'],
      arenaStreak: 0,
      skillsScore: {
        phonetics: 78,
        hanzi: 65,
        vocab: 72,
        grammar: 68,
        classical: 54,
        business: 62
      }
    };

    const LEVEL_META = {
      ALL:  { name: 'Toàn bộ lộ trình (Nhập môn → Kỳ cựu)', badge: 'bg-stone-800 text-amber-300', short: 'Tất cả' },
      LVL0: { name: 'Cấp 0: Nhập Môn (Pinyin, Biến điệu & Nét chữ)', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', short: 'Nhập Môn' },
      LVL1: { name: 'Cấp 1: Sơ Cấp (HSK 1–2 • Giao tiếp nền tảng)', badge: 'bg-sky-100 text-sky-800 border-sky-300', short: 'Sơ Cấp HSK 1-2' },
      LVL2: { name: 'Cấp 2: Trung Cấp (HSK 3–4 • Ngữ pháp & Phản xạ)', badge: 'bg-indigo-100 text-indigo-800 border-indigo-300', short: 'Trung Cấp HSK 3-4' },
      LVL3: { name: 'Cấp 3: Cao Cấp (HSK 5–6 • Báo chí & Từ cận nghĩa)', badge: 'bg-purple-100 text-purple-800 border-purple-300', short: 'Cao Cấp HSK 5-6' },
      LVL4: { name: 'Cấp 4: Kỳ Cựu (HSK 7–9 • Cổ văn & Điển cố)', badge: 'bg-rose-100 text-rose-800 border-rose-300', short: 'Kỳ Cựu HSK 7-9' },
      BIZ:  { name: 'Chuyên Ngành: Thương Mại, XNK, Công Nghệ & Slang', badge: 'bg-amber-100 text-amber-900 border-amber-300', short: 'Chuyên Ngành' }
    };

    // Helper: Return Simplified or Traditional text based on global script mode
    function hz(simpText, tradText) {
      if (APP_STATE.scriptMode === 'trad' && tradText) return tradText;
      return simpText;
    }

    // =========================================================================
