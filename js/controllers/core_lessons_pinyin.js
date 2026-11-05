// Core Storage, Audio/Speech, Level/Gacha/Skin Engine, Tab 1 & Tab 2
// 6. STORAGE, AUDIO SYNTHESIS, SPEECH & CORE UI HELPERS
    // =========================================================================
    function loadSavedState() {
      try {
        const raw = localStorage.getItem('hoa_ngu_tinh_thong_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.completedLessons)) APP_STATE.completedLessons = parsed.completedLessons;
          if (Array.isArray(parsed.savedVocabIds)) APP_STATE.savedVocabIds = parsed.savedVocabIds;
          if (typeof parsed.xp === 'number') APP_STATE.xp = parsed.xp;
          if (parsed.skillsScore) Object.assign(APP_STATE.skillsScore, parsed.skillsScore);
          if (parsed.scriptMode) APP_STATE.scriptMode = parsed.scriptMode;
          if (parsed.globalLevel) APP_STATE.globalLevel = parsed.globalLevel;
          if (parsed.guidedGoal) APP_STATE.guidedGoal = parsed.guidedGoal;
          if (typeof parsed.streakDays === 'number') APP_STATE.streakDays = parsed.streakDays;
          if (parsed.lastStudyDate) APP_STATE.lastStudyDate = parsed.lastStudyDate;
          if (typeof parsed.checkedInToday === 'boolean') APP_STATE.checkedInToday = parsed.checkedInToday;
          if (typeof parsed.darkMode === 'boolean') APP_STATE.darkMode = parsed.darkMode;
          if (parsed.hanziFontScale) APP_STATE.hanziFontScale = parsed.hanziFontScale;
          if (Array.isArray(parsed.unlockedBadges)) APP_STATE.unlockedBadges = parsed.unlockedBadges;
          if (parsed.activeLessonId) APP_STATE.activeLessonId = parsed.activeLessonId;
          if (Array.isArray(parsed.srsMasteredIds) && typeof SRS_STATE !== 'undefined') {
            SRS_STATE.masteredIds = parsed.srsMasteredIds;
          }
          if (parsed.lastSavedAt) {
            const tsEl = document.getElementById('last-saved-timestamp');
            if (tsEl) tsEl.textContent = `Lần lưu tự động gần nhất trên thiết bị này: ${parsed.lastSavedAt}`;
          }
        }
        const savedEndpoint = localStorage.getItem('hoa_ngu_cloud_url_v1');
        const epEl = document.getElementById('cloud-endpoint-input');
        if (epEl && savedEndpoint) epEl.value = savedEndpoint;

        const savedNotes = localStorage.getItem('hoa_ngu_notes_v1');
        const notesEl = document.getElementById('personal-notes-area');
        if (notesEl) {
          notesEl.value = savedNotes || '📌 Mục tiêu tuần này:\n- Phân biệt rõ câu chữ 把 và câu bị động 被\n- Thuộc 15 từ vựng Đàm phán Ngoại thương (FOB, MOQ, 报关单)\n- Luyện viết 5 chữ Hán mỗi ngày trên bảng Mễ Tự Cách.';
        }
      } catch (err) {
        // Fallback silently in sandboxed iframe
      }
    }

    function buildProgressSnapshot() {
      const nowStr = new Date().toLocaleString('vi-VN');
      const notesVal = document.getElementById('personal-notes-area')?.value || '';
      const includeKey = document.getElementById('sync-api-key-with-cloud')?.checked !== false;
      return {
        version: '1.2',
        lastSavedAt: nowStr,
        geminiApiKey: includeKey ? getStoredGeminiApiKey() : '',
        completedLessons: APP_STATE.completedLessons,
        savedVocabIds: APP_STATE.savedVocabIds,
        xp: APP_STATE.xp,
        skillsScore: APP_STATE.skillsScore,
        scriptMode: APP_STATE.scriptMode,
        globalLevel: APP_STATE.globalLevel,
        guidedGoal: APP_STATE.guidedGoal,
        currentLevel: APP_STATE.currentLevel,
        gachaTickets: APP_STATE.gachaTickets,
        rewardedLessonIds: APP_STATE.rewardedLessonIds,
        streakDays: APP_STATE.streakDays,
        lastStudyDate: APP_STATE.lastStudyDate,
        checkedInToday: APP_STATE.checkedInToday,
        darkMode: APP_STATE.darkMode,
        hanziFontScale: APP_STATE.hanziFontScale,
        unlockedBadges: APP_STATE.unlockedBadges,
        activeLessonId: APP_STATE.activeLessonId,
        srsMasteredIds: typeof SRS_STATE !== 'undefined' ? SRS_STATE.masteredIds : [],
        personalNotes: notesVal
      };
    }

    function applyProgressSnapshot(snap) {
      if (!snap || typeof snap !== 'object') return false;
      if (Array.isArray(snap.completedLessons)) APP_STATE.completedLessons = snap.completedLessons;
      if (Array.isArray(snap.savedVocabIds)) APP_STATE.savedVocabIds = snap.savedVocabIds;
      if (typeof snap.xp === 'number') APP_STATE.xp = snap.xp;
      if (snap.skillsScore && typeof snap.skillsScore === 'object') Object.assign(APP_STATE.skillsScore, snap.skillsScore);
      if (snap.scriptMode === 'simp' || snap.scriptMode === 'trad') APP_STATE.scriptMode = snap.scriptMode;
      if (snap.globalLevel) APP_STATE.globalLevel = snap.globalLevel;
      if (snap.guidedGoal) APP_STATE.guidedGoal = snap.guidedGoal;
      if (typeof snap.currentLevel === 'number') APP_STATE.currentLevel = snap.currentLevel;
      if (typeof snap.gachaTickets === 'number') APP_STATE.gachaTickets = snap.gachaTickets;
      if (Array.isArray(snap.rewardedLessonIds)) APP_STATE.rewardedLessonIds = snap.rewardedLessonIds;
      if (typeof snap.streakDays === 'number') APP_STATE.streakDays = snap.streakDays;
      if (snap.lastStudyDate) APP_STATE.lastStudyDate = snap.lastStudyDate;
      if (typeof snap.checkedInToday === 'boolean') APP_STATE.checkedInToday = snap.checkedInToday;
      if (typeof snap.darkMode === 'boolean') APP_STATE.darkMode = snap.darkMode;
      if (snap.hanziFontScale) APP_STATE.hanziFontScale = snap.hanziFontScale;
      if (Array.isArray(snap.unlockedBadges)) APP_STATE.unlockedBadges = snap.unlockedBadges;
      applyThemeAndScalePreferences();
      if (snap.activeLessonId) APP_STATE.activeLessonId = snap.activeLessonId;
      if (Array.isArray(snap.srsMasteredIds) && typeof SRS_STATE !== 'undefined') {
        SRS_STATE.masteredIds = snap.srsMasteredIds;
      }
      if (typeof snap.personalNotes === 'string') {
        const notesEl = document.getElementById('personal-notes-area');
        if (notesEl) notesEl.value = snap.personalNotes;
        try { localStorage.setItem('hoa_ngu_notes_v1', snap.personalNotes); } catch (e) {}
      }
      if (snap.geminiApiKey && typeof snap.geminiApiKey === 'string') {
        try { localStorage.setItem('hoa_ngu_gemini_api_key_v1', snap.geminiApiKey); } catch (e) {}
      }
      updateGeminiStatusBadges();
      saveAppState();
      refreshAllViews();
      return true;
    }

    function saveAppState() {
      try {
        const snap = buildProgressSnapshot();
        localStorage.setItem('hoa_ngu_tinh_thong_v1', JSON.stringify(snap));
        const tsEl = document.getElementById('last-saved-timestamp');
        if (tsEl) tsEl.textContent = `Đã tự động lưu tiến độ lúc: ${snap.lastSavedAt}`;
      } catch (err) {
        // Ignore storage errors in sandbox
      }
    }

    function showToast(message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const colors = {
        info: 'bg-stone-900 text-white border-amber-500',
        success: 'bg-emerald-900 text-emerald-50 border-emerald-400',
        warn: 'bg-amber-900 text-amber-50 border-amber-400'
      };
      const toast = document.createElement('div');
      toast.className = `pointer-events-auto px-4 py-3 rounded-xl border-l-4 shadow-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 animate-fade ${colors[type] || colors.info}`;
      toast.innerHTML = `<span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 3200);
    }

    function addXp(amount, reason) {
      const mult = APP_STATE.doubleXpActive ? 2 : 1;
      const finalAmount = amount * mult;
      APP_STATE.xp += finalAmount;
      if (typeof playCinematicSound === 'function') playCinematicSound('ting');
      updateHeaderStats();
      saveAppState();
      if (reason) {
        showToast(`✨ +${finalAmount} XP${mult > 1 ? ' (Đã x2 Đan Dược ⚡)' : ''}: ${reason}`, 'success');
      }
    }

    // =========================================================================
    // LEVEL THRESHOLDS & PROGRESS CALCULATION ENGINE
    // =========================================================================
    // Level formula: Each level requires progressively more XP
    // Level 1: 0-100 XP, Level 2: 100-250 XP, Level 3: 250-450 XP, Level 4: 450-700 XP, etc.
    const LEVEL_THRESHOLDS = [
      { lvl: 1, minXp: 0, maxXp: 100, rank: 'Tân Thủ Nhập Môn', tier: 'Sơ khởi', icon: '🌱' },
      { lvl: 2, minXp: 100, maxXp: 250, rank: 'Học Điệp Cơ Sở (HSK 1)', tier: 'Sơ khởi', icon: '📖' },
      { lvl: 3, minXp: 250, maxXp: 450, rank: 'Môn Đồ Sơ Cấp (HSK 2)', tier: 'Sơ khởi', icon: '🏮' },
      { lvl: 4, minXp: 450, maxXp: 700, rank: 'Hành Giả Trung Cấp (HSK 3)', tier: 'Trung cấp', icon: '⚡' },
      { lvl: 5, minXp: 700, maxXp: 1000, rank: 'Học Sĩ Bát Pháp (HSK 4)', tier: 'Trung cấp', icon: '🖌️' },
      { lvl: 6, minXp: 1000, maxXp: 1400, rank: 'Cao Thủ Hoa Ngữ (HSK 5)', tier: 'Cao cấp', icon: '🐉' },
      { lvl: 7, minXp: 1400, maxXp: 1900, rank: 'Danh Gia Hán Học (HSK 6)', tier: 'Cao cấp', icon: '🏯' },
      { lvl: 8, minXp: 1900, maxXp: 2500, rank: 'Đại Sư Kỳ Cựu (HSK 7–8)', tier: 'Thượng đẳng', icon: '🔮' },
      { lvl: 9, minXp: 2500, maxXp: 3500, rank: 'Thần Bút Cổ Văn HSK 9', tier: 'Thần thoại', icon: '👑' },
      { lvl: 10, minXp: 3500, maxXp: 99999, rank: 'Đại Tông Sư Vô Song', tier: 'Chí tôn', icon: '✨' }
    ];

    function calculateLevelInfo(xp) {
      let currentInfo = LEVEL_THRESHOLDS[0];
      for (const t of LEVEL_THRESHOLDS) {
        if (xp >= t.minXp) {
          currentInfo = t;
        } else {
          break;
        }
      }
      const range = currentInfo.maxXp - currentInfo.minXp;
      const progressInLevel = Math.max(0, xp - currentInfo.minXp);
      const pct = Math.min(100, Math.round((progressInLevel / range) * 100));
      const needed = Math.max(0, currentInfo.maxXp - xp);
      return {
        level: currentInfo.lvl,
        rank: currentInfo.rank,
        tier: currentInfo.tier,
        icon: currentInfo.icon,
        minXp: currentInfo.minXp,
        maxXp: currentInfo.maxXp,
        percent: pct,
        needed: needed
      };
    }

    function getRankName(xp) {
      return calculateLevelInfo(xp).rank;
    }

    function updateHeaderStats() {
      const info = calculateLevelInfo(APP_STATE.xp);

      // Check for Level Up!
      const previousLevel = APP_STATE.currentLevel || 1;
      if (info.level > previousLevel) {
        APP_STATE.currentLevel = info.level;
        APP_STATE.gachaTickets = (APP_STATE.gachaTickets || 0) + 2; // +2 tickets on level up!
        triggerCinematicLevelUpIntro(info);
      }

      // Update Header & Hero Elements
      const xpEl = document.getElementById('stat-xp');
      const xpNextEl = document.getElementById('stat-xp-next');
      const xpNeededEl = document.getElementById('stat-xp-needed');
      const xpBarEl = document.getElementById('stat-xp-progress-bar');
      const lvlBadgeEl = document.getElementById('stat-user-level-badge');
      const rankEl = document.getElementById('stat-rank');
      const rankTierEl = document.getElementById('stat-rank-tier');
      const lesEl = document.getElementById('stat-lessons');
      const lesTotEl = document.getElementById('stat-lessons-total');
      const savedEl = document.getElementById('stat-saved');
      const stEl = document.getElementById('stat-streak-days');
      const gachaEl = document.getElementById('stat-gacha-tickets');

      if (xpEl) xpEl.textContent = APP_STATE.xp;
      if (xpNextEl) xpNextEl.textContent = `${info.maxXp} XP`;
      if (xpNeededEl) xpNeededEl.textContent = info.needed;
      if (xpBarEl) xpBarEl.style.width = `${info.percent}%`;
      if (lvlBadgeEl) lvlBadgeEl.textContent = `LV. ${info.level}`;
      if (rankEl) rankEl.textContent = info.rank;
      if (rankTierEl) rankTierEl.textContent = `(${info.tier})`;
      if (lesEl) lesEl.textContent = APP_STATE.completedLessons.length;
      if (lesTotEl) lesTotEl.textContent = LESSONS_DATA.length;
      if (savedEl) savedEl.textContent = APP_STATE.savedVocabIds.length;
      if (stEl) stEl.textContent = APP_STATE.streakDays;
      if (gachaEl) gachaEl.textContent = APP_STATE.gachaTickets || 0;

      if (typeof checkAndUnlockBadges === 'function') checkAndUnlockBadges();
    }

    // =========================================================================
    // CINEMATIC WEBAUDIO SOUND FX SYNTHESIZER (Ting / Boom / Fanfare / Chime)
    // =========================================================================
    function playCinematicSound(type) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        if (type === 'gold_boom') {
          // Deep impact boom + shimmering high bell
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(140, now);
          osc1.frequency.exponentialRampToValueAtTime(32, now + 0.8);
          gain1.gain.setValueAtTime(0.8, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start(now);
          osc1.stop(now + 0.9);

          // Shimmer chime
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + 0.2 + (i * 0.1));
            gain.gain.setValueAtTime(0.3, now + 0.2 + (i * 0.1));
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + 0.2 + (i * 0.1));
            osc.stop(now + 1.3);
          });
        } else if (type === 'fanfare') {
          // 4-note victory trumpet chime
          [440, 554.37, 659.25, 880].forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now + idx * 0.12);
            g.gain.setValueAtTime(0.35, now + idx * 0.12);
            g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start(now + idx * 0.12);
            osc.stop(now + idx * 0.12 + 0.65);
          });
        } else if (type === 'ting') {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1760, now + 0.35);
          g.gain.setValueAtTime(0.4, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
        }
      } catch (e) {}
    }

    // =========================================================================
    // CINEMATIC INTRO MODAL TRIGGER CONTROLLERS (LEVEL UP / TITLE / GACHA)
    // =========================================================================
    function triggerCinematicLevelUpIntro(info) {
      const modal = document.getElementById('cinematic-intro-modal');
      if (!modal) return;
      playCinematicSound('gold_boom');

      document.getElementById('cinematic-category-tag').textContent = `🎉 CHÚC MỪNG THĂNG CẤP • LEVEL ${info.level}`;
      document.getElementById('cinematic-star-row').textContent = '⭐'.repeat(Math.min(5, Math.max(3, info.level)));
      document.getElementById('cinematic-card-icon').textContent = info.icon;
      document.getElementById('cinematic-card-title').textContent = info.rank.toUpperCase();
      document.getElementById('cinematic-card-subtitle').textContent = `Chúc mừng bạn đã đạt cấp bậc ${info.tier}! Năng lực phản xạ và vốn từ đã bước sang cảnh giới mới.`;
      document.getElementById('cinematic-card-desc').innerHTML = `
        <div class="text-[11px] text-amber-400 font-bold uppercase">🎁 Chiến Lợi Phẩm Lên Cấp:</div>
        <div class="text-stone-200 font-semibold">• Thưởng ngay: <strong>+2 Vé Quay Gacha 🎫</strong></div>
        <div class="text-stone-200 font-semibold">• Mở khóa quyền năng: <strong>${info.rank}</strong></div>
        <div class="text-stone-300 text-[11px] pt-1">Tiếp tục duy trì học tập để sớm thăng cấp lên mốc ${info.maxXp} XP tiếp theo!</div>
      `;

      const cardBox = document.getElementById('cinematic-card-box');
      if (cardBox) {
        cardBox.className = 'bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-2xl aura-gold space-y-4 relative overflow-hidden';
      }
      modal.classList.remove('hidden');
    }

    function triggerCinematicTitleUnlockIntro(badge) {
      const modal = document.getElementById('cinematic-intro-modal');
      if (!modal) return;
      const tierMap = {
        COMMON: { stars: '⭐⭐⭐', tag: 'DANH HIỆU THƯỜNG • MỞ KHÓA', aura: 'aura-blue', border: 'border-sky-400' },
        MID: { stars: '⭐⭐⭐⭐', tag: 'DANH HIỆU TRUNG CẤP • XUẤT SẮC', aura: 'aura-purple', border: 'border-purple-400' },
        HIGH: { stars: '⭐⭐⭐⭐⭐', tag: 'DANH HIỆU CAO CẤP • HOÀNG KIM', aura: 'aura-gold', border: 'border-amber-400' }
      };
      const tierCfg = tierMap[badge.tier || 'MID'] || tierMap.MID;
      playCinematicSound(badge.tier === 'HIGH' ? 'gold_boom' : 'fanfare');

      document.getElementById('cinematic-category-tag').textContent = tierCfg.tag;
      document.getElementById('cinematic-star-row').textContent = tierCfg.stars;
      document.getElementById('cinematic-card-icon').textContent = badge.icon;
      document.getElementById('cinematic-card-title').textContent = badge.title.toUpperCase();
      document.getElementById('cinematic-card-subtitle').textContent = badge.desc;
      document.getElementById('cinematic-card-desc').innerHTML = `
        <div class="text-[11px] text-amber-400 font-bold uppercase">🏆 Thuộc Tính Danh Hiệu:</div>
        <div class="text-stone-200 font-semibold">• Đã ghi danh vào Phòng Truyền Thống vĩnh viễn</div>
        <div class="text-stone-200 font-semibold">• Tăng uy danh trong Đấu trường & Phòng Chat WeChat</div>
      `;

      const cardBox = document.getElementById('cinematic-card-box');
      if (cardBox) {
        cardBox.className = `bg-gradient-to-b from-stone-900 to-stone-950 border-2 ${tierCfg.border} rounded-3xl p-6 sm:p-8 shadow-2xl ${tierCfg.aura} space-y-4 relative overflow-hidden`;
      }
      modal.classList.remove('hidden');
    }

    // =========================================================================
    // GACHA VIDEO SUMMONING, INVENTORY BACKPACK & SKIN CUSTOMIZATION ENGINE
    // =========================================================================
    const DEFAULT_GACHA_VIDEO_URL = 'https://res.cloudinary.com/idtxlije/video/upload/v1793801051/Gacha_Scripture_Summoning.mp4';

    const COSMETIC_SKINS_CATALOG = [
      // 1. AVATAR & LESSON CARD FRAMES
      {
        id: 'FRAME_DEFAULT',
        category: 'FRAME',
        categoryName: 'Khung Viền Avatar & Bài Học',
        tier: 'COMMON',
        stars: '⭐⭐⭐',
        icon: '🔲',
        title: 'Khung Viền Mặc Định',
        desc: 'Phong cách tiêu chuẩn tinh gọn, rõ ràng.',
        unlockedByDefault: true
      },
      {
        id: 'FRAME_INK',
        category: 'FRAME',
        categoryName: 'Khung Viền Avatar & Bài Học',
        tier: 'MID',
        stars: '⭐⭐⭐⭐',
        icon: '🐼',
        title: 'Khung Viền Thủy Mặc Đan Thanh (水墨丹青)',
        desc: 'Hiệu ứng vệt mực tàu loang nghệ thuật quanh Avatar, Thẻ bài học và Thanh điều hướng (Mở sẵn để bạn test thử ngay!).',
        unlockedByDefault: true
      },
      {
        id: 'FRAME_DRAGON',
        category: 'FRAME',
        categoryName: 'Khung Viền Avatar & Bài Học',
        tier: 'HIGH',
        stars: '⭐⭐⭐⭐⭐',
        icon: '🐉',
        title: 'Khung Rồng Vàng Hoàng Kim (金龙至尊)',
        desc: 'Viền hào quang rồng vàng lấp lánh quanh Avatar và bài học.',
        unlockedByDefault: false
      },
      // 2. CALLIGRAPHY BRUSH SKINS
      {
        id: 'BRUSH_DEFAULT',
        category: 'BRUSH',
        categoryName: 'Skin Bút Lông Tập Viết Chữ Hán',
        tier: 'COMMON',
        stars: '⭐⭐⭐',
        icon: '✒️',
        title: 'Bút Lông Mặc Định',
        desc: 'Nét mực tiêu chuẩn trên bảng Mễ Tự Cách.',
        unlockedByDefault: true
      },
      {
        id: 'BRUSH_ROYAL_VERMILION',
        category: 'BRUSH',
        categoryName: 'Skin Bút Lông Tập Viết Chữ Hán',
        tier: 'HIGH',
        stars: '⭐⭐⭐⭐⭐',
        icon: '🖌️',
        title: 'Bút Lông Hoàng Gia • Mực Son Ánh Vàng',
        desc: 'Khi viết trên bảng Mễ Tự Cách (Tab 4), nét chữ tỏa ánh vàng kim rực rỡ trên nền mực chu sa cung đình.',
        unlockedByDefault: true
      },
      {
        id: 'BRUSH_JADE_BAMBOO',
        category: 'BRUSH',
        categoryName: 'Skin Bút Lông Tập Viết Chữ Hán',
        tier: 'MID',
        stars: '⭐⭐⭐⭐',
        icon: '🎋',
        title: 'Bút Lông Trúc Lâm • Mực Xanh Ngọc Bích',
        desc: 'Nét bút xanh ngọc bích thanh tao tỏa hào quang dịu mắt khi luyện viết chữ Hán.',
        unlockedByDefault: true
      },
      // 3. FULL WEB PREMIUM THEMES
      {
        id: 'THEME_DEFAULT',
        category: 'THEME',
        categoryName: 'Đại Giao Diện Toàn Cảnh (Web Theme)',
        tier: 'COMMON',
        stars: '⭐⭐⭐',
        icon: '🏛️',
        title: 'Giao Diện Mặc Định (Chu Sa & Mặc Thạch)',
        desc: 'Tông màu hiện đại tương phản cao.',
        unlockedByDefault: true
      },
      {
        id: 'THEME_SHANSHUI',
        category: 'THEME',
        categoryName: 'Đại Giao Diện Toàn Cảnh (Web Theme)',
        tier: 'HIGH',
        stars: '⭐⭐⭐⭐⭐',
        icon: '⛰️',
        title: 'Đại Giao Diện Thủy Mặc Cổ Phong (水墨宣纸)',
        desc: 'Biến toàn bộ nền trang web thành màu giấy tuyên cổ phong ấm áp, dịu mắt như đọc sách trong Tàng Kinh Các.',
        unlockedByDefault: true
      },
      {
        id: 'THEME_IMPERIAL',
        category: 'THEME',
        categoryName: 'Đại Giao Diện Toàn Cảnh (Web Theme)',
        tier: 'HIGH',
        stars: '⭐⭐⭐⭐⭐',
        icon: '👑',
        title: 'Đại Giao Diện Tử Cấm Thành Hoàng Gia (紫禁金辉)',
        desc: 'Sắc vàng hoàng tộc kết hợp viền kim tuyến sang trọng trên toàn trang.',
        unlockedByDefault: false
      }
    ];

    const GACHA_LOOT_TABLE = [
      {
        id: 'LOOT_FRAME_INK',
        skinId: 'FRAME_INK',
        tier: 'MID',
        stars: '⭐⭐⭐⭐',
        title: 'Khung Viền Thủy Mặc Đan Thanh 🐼',
        subtitle: 'Ngoại Trang Khung Avatar & Bài Học (4 Sao)',
        desc: 'Khoác lên Avatar và các thẻ bài học đường viền mực tàu thủy mặc cổ phong tuyệt đẹp.',
        icon: '🐼',
        rewardText: 'Có thể bấm Trang Bị ngay trong Túi Càn Khôn!'
      },
      {
        id: 'LOOT_FRAME_DRAGON',
        skinId: 'FRAME_DRAGON',
        tier: 'HIGH',
        stars: '⭐⭐⭐⭐⭐',
        title: 'Khung Rồng Vàng Hoàng Kim 🐉',
        subtitle: 'Ngoại Trang Chí Tôn (5 Sao)',
        desc: 'Hào quang rồng vàng phát sáng quanh Avatar và các thẻ bài học trọng điểm.',
        icon: '🐉',
        rewardText: 'Đã mở khóa Khung Rồng Vàng trong Túi Càn Khôn!'
      },
      {
        id: 'LOOT_BRUSH_ROYAL',
        skinId: 'BRUSH_ROYAL_VERMILION',
        tier: 'HIGH',
        stars: '⭐⭐⭐⭐⭐',
        title: 'Mực Son Chu Sa Hoàng Gia 🖌️',
        subtitle: 'Skin Bút Lông Huyền Thoại (5 Sao)',
        desc: 'Mở khóa nét bút mực đỏ son dát vàng óng ánh khi luyện viết chữ Hán trên bảng Mễ Tự Cách.',
        icon: '🖌️',
        rewardText: 'Trang bị hiệu ứng Thư Pháp Cung Đình'
      },
      {
        id: 'LOOT_SCRIPTURE_SUNTZU',
        tier: 'HIGH',
        stars: '⭐⭐⭐⭐⭐',
        title: 'Bí Kíp Cổ Văn: Binh Pháp Tôn Tử 📜',
        subtitle: 'Bản Độc Bản HSK 9 (5 Sao)',
        desc: 'Mở khóa trọn bộ phân tích 13 thiên chiến lược và triết lý ngôn ngữ cổ đại.',
        icon: '📜',
        rewardText: 'Đã lưu vào Ngăn Bí Kíp Cổ Văn (+1 Mảnh Bí Kíp)'
      },
      {
        id: 'LOOT_STREAK_SHIELD',
        tier: 'MID',
        stars: '⭐⭐⭐⭐',
        title: 'Bùa Hộ Mệnh Chuỗi Ngày Học 🛡️',
        subtitle: 'Vật Phẩm Bảo Vệ Streak (4 Sao)',
        desc: 'Tự động bảo vệ chuỗi ngày học không bị đứt nếu bạn lỡ bận việc đột xuất 1 ngày.',
        icon: '🛡️',
        rewardText: 'Đã cộng +1 Bùa Hộ Mệnh vào Túi Đồ'
      },
      {
        id: 'LOOT_2X_POTION',
        tier: 'MID',
        stars: '⭐⭐⭐⭐',
        title: 'Bình Đan Dược Song Bội XP (2x XP) ⚡',
        subtitle: 'Bổ Trợ Tốc Độ Thăng Cấp (4 Sao)',
        desc: 'Nhân đôi toàn bộ XP nhận được khi làm bài tập và luyện nói.',
        icon: '⚡',
        rewardText: 'Đã cộng +1 Bình Đan Dược x2 XP vào Túi Đồ'
      },
      {
        id: 'LOOT_FORTUNE_COOKIE',
        tier: 'COMMON',
        stars: '⭐⭐⭐',
        title: 'Quẻ Xăm Hoa Ngữ Đại Cát 🥠',
        subtitle: 'Bánh Quy May Mắn Hàng Ngày (3 Sao)',
        desc: 'Hôm nay vận khí hanh thông: "千里之行，始于足下 (Đường xa vạn dặm khởi đầu từ một bước chân)".',
        icon: '🥠',
        rewardText: '+50 XP Kinh nghiệm & +1 Quẻ Xăm Đại Cát'
      }
    ];

    let pendingGachaPickedItem = null;
    let gachaVideoFallbackTimeout = null;

    function getCustomGachaVideoUrl() {
      const inp = document.getElementById('custom-gacha-video-url-input');
      if (inp && inp.value.trim()) return inp.value.trim();
      try {
        return localStorage.getItem('hoa_ngu_gacha_video_url_v1') || DEFAULT_GACHA_VIDEO_URL;
      } catch (e) {
        return DEFAULT_GACHA_VIDEO_URL;
      }
    }

    function triggerGachaPull(mode) {
      if ((APP_STATE.gachaTickets || 0) <= 0) {
        showToast('⚠️ Bạn đã hết Vé Quay Gacha! Hãy hoàn thành bài học hoặc điểm danh để nhận thêm vé nhé.', 'warn');
        return;
      }
      APP_STATE.gachaTickets--;

      // Pick item with high chance of exciting skins & items
      const idx = Math.floor(Math.random() * GACHA_LOOT_TABLE.length);
      const picked = GACHA_LOOT_TABLE[idx];
      pendingGachaPickedItem = picked;

      // Grant item into inventory state
      ensureInventoryInitialized();
      if (picked.skinId && !APP_STATE.unlockedSkins.includes(picked.skinId)) {
        APP_STATE.unlockedSkins.push(picked.skinId);
      }
      if (picked.id === 'LOOT_STREAK_SHIELD') APP_STATE.consumables.streakShields++;
      if (picked.id === 'LOOT_2X_POTION') APP_STATE.consumables.xpPotions++;
      if (picked.id === 'LOOT_FORTUNE_COOKIE') {
        APP_STATE.consumables.fortuneCookies++;
        addXp(50, 'Quẻ xăm may mắn Gacha');
      }
      if (picked.id === 'LOOT_SCRIPTURE_SUNTZU') {
        APP_STATE.consumables.scriptureShards = Math.min(3, (APP_STATE.consumables.scriptureShards || 1) + 1);
      }

      updateHeaderStats();
      saveAppState();

      // Open modal in STAGE 1 (Summoning Video Stage)
      const modal = document.getElementById('cinematic-intro-modal');
      const videoStage = document.getElementById('cinematic-video-stage');
      const cardStage = document.getElementById('cinematic-card-stage');
      const videoEl = document.getElementById('cinematic-gacha-video');
      if (!modal) return;

      modal.classList.remove('hidden');
      if (videoStage && cardStage && videoEl) {
        videoStage.classList.remove('hidden');
        cardStage.classList.add('hidden');
        const vUrl = getCustomGachaVideoUrl();
        if (videoEl.src !== vUrl) videoEl.src = vUrl;
        videoEl.currentTime = 0;
        videoEl.muted = false;

        if (gachaVideoFallbackTimeout) clearTimeout(gachaVideoFallbackTimeout);
        // Auto transition when video finishes or after 6.5s max safety fallback
        videoEl.onended = () => revealGachaCardAfterVideo();
        videoEl.onerror = () => revealGachaCardAfterVideo();
        gachaVideoFallbackTimeout = setTimeout(() => {
          if (!videoStage.classList.contains('hidden')) {
            revealGachaCardAfterVideo();
          }
        }, 7500);

        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If browser blocks unmuted autoplay, play muted + WebAudio synth
            videoEl.muted = true;
            videoEl.play().catch(() => revealGachaCardAfterVideo());
          });
        }
      } else {
        revealGachaCardAfterVideo();
      }
    }

    function skipGachaVideoToCard() {
      const videoEl = document.getElementById('cinematic-gacha-video');
      if (videoEl) {
        try { videoEl.pause(); } catch (e) {}
      }
      revealGachaCardAfterVideo();
    }

    function revealGachaCardAfterVideo() {
      if (gachaVideoFallbackTimeout) {
        clearTimeout(gachaVideoFallbackTimeout);
        gachaVideoFallbackTimeout = null;
      }
      const videoStage = document.getElementById('cinematic-video-stage');
      const cardStage = document.getElementById('cinematic-card-stage');
      if (videoStage) videoStage.classList.add('hidden');
      if (cardStage) cardStage.classList.remove('hidden');

      const picked = pendingGachaPickedItem || GACHA_LOOT_TABLE[0];
      playCinematicSound(picked.tier === 'HIGH' ? 'gold_boom' : 'fanfare');

      document.getElementById('cinematic-category-tag').textContent = `🎰 KHO BÁU GACHA • TRIỆU HỒI THÀNH CÔNG`;
      document.getElementById('cinematic-star-row').textContent = picked.stars;
      document.getElementById('cinematic-card-icon').textContent = picked.icon;
      document.getElementById('cinematic-card-title').textContent = picked.title.toUpperCase();
      document.getElementById('cinematic-card-subtitle').textContent = picked.subtitle;
      document.getElementById('cinematic-card-desc').innerHTML = `
        <div class="text-[11px] text-amber-400 font-bold uppercase">✨ Vật Phẩm Triệu Hồi:</div>
        <div class="text-stone-200 font-semibold">• ${picked.desc}</div>
        <div class="text-emerald-400 font-bold text-xs pt-1">🎁 ${picked.rewardText}</div>
        <div class="text-stone-400 text-[11px] pt-0.5">Số vé gacha còn lại: ${APP_STATE.gachaTickets} vé</div>
      `;

      const cardBox = document.getElementById('cinematic-card-box');
      if (cardBox) {
        const borderClass = picked.tier === 'HIGH' ? 'border-amber-400 aura-gold' : (picked.tier === 'MID' ? 'border-purple-400 aura-purple' : 'border-sky-400 aura-blue');
        cardBox.className = `bg-gradient-to-b from-stone-900 to-stone-950 border-2 ${borderClass} rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden`;
      }
    }

    function dismissCinematicIntro() {
      const videoEl = document.getElementById('cinematic-gacha-video');
      if (videoEl) {
        try { videoEl.pause(); } catch (e) {}
      }
      const modal = document.getElementById('cinematic-intro-modal');
      if (modal) modal.classList.add('hidden');
    }

    // --- INVENTORY & SKIN EQUIPPING CONTROLLERS ---
    let activeInventoryTab = 'cosmetics';

    function ensureInventoryInitialized() {
      if (!Array.isArray(APP_STATE.unlockedSkins)) {
        APP_STATE.unlockedSkins = ['FRAME_DEFAULT', 'FRAME_INK', 'BRUSH_DEFAULT', 'BRUSH_ROYAL_VERMILION', 'BRUSH_JADE_BAMBOO', 'THEME_DEFAULT', 'THEME_SHANSHUI'];
      }
      if (!APP_STATE.equippedFrameSkin) APP_STATE.equippedFrameSkin = 'FRAME_DEFAULT';
      if (!APP_STATE.equippedBrushSkin) APP_STATE.equippedBrushSkin = 'BRUSH_DEFAULT';
      if (!APP_STATE.equippedWebTheme) APP_STATE.equippedWebTheme = 'THEME_DEFAULT';
      if (!APP_STATE.consumables || typeof APP_STATE.consumables !== 'object') {
        APP_STATE.consumables = {
          streakShields: 2,
          xpPotions: 2,
          fortuneCookies: 3,
          comboSavers: 2,
          scriptureShards: 2
        };
      }
    }

    function applyEquippedSkinsToDOM() {
      ensureInventoryInitialized();
      // 1. Apply Frame Skin
      document.body.classList.remove('skin-frame-ink', 'skin-frame-dragon');
      const frameTag = document.getElementById('user-avatar-frame-tag');
      const avatarEmoji = document.getElementById('user-avatar-emoji');
      if (APP_STATE.equippedFrameSkin === 'FRAME_INK') {
        document.body.classList.add('skin-frame-ink');
        if (frameTag) {
          frameTag.textContent = '水墨 THỦY MẶC';
          frameTag.className = 'absolute -bottom-1.5 px-1.5 rounded text-[9px] font-black bg-stone-950 text-stone-100 border border-stone-400';
        }
        if (avatarEmoji) avatarEmoji.textContent = '🐼';
      } else if (APP_STATE.equippedFrameSkin === 'FRAME_DRAGON') {
        document.body.classList.add('skin-frame-dragon');
        if (frameTag) {
          frameTag.textContent = '金龙 HOÀNG KIM';
          frameTag.className = 'absolute -bottom-1.5 px-1.5 rounded text-[9px] font-black bg-amber-500 text-stone-950 border border-amber-200';
        }
        if (avatarEmoji) avatarEmoji.textContent = '🐉';
      } else {
        if (frameTag) {
          frameTag.textContent = 'MẶC ĐỊNH';
          frameTag.className = 'absolute -bottom-1.5 px-1 rounded text-[9px] font-black bg-stone-800 text-amber-300 border border-stone-600';
        }
        if (avatarEmoji) avatarEmoji.textContent = '🏮';
      }

      // 2. Apply Web Theme Skin
      document.body.classList.remove('web-theme-shanshui', 'web-theme-imperial');
      if (APP_STATE.equippedWebTheme === 'THEME_SHANSHUI') {
        document.body.classList.add('web-theme-shanshui');
      } else if (APP_STATE.equippedWebTheme === 'THEME_IMPERIAL') {
        document.body.classList.add('web-theme-imperial');
      }

      // 3. Update Hero Skin Summary & 2x XP Pill
      const sumEl = document.getElementById('equipped-skin-summary');
      if (sumEl) {
        const fObj = COSMETIC_SKINS_CATALOG.find(s => s.id === APP_STATE.equippedFrameSkin);
        const bObj = COSMETIC_SKINS_CATALOG.find(s => s.id === APP_STATE.equippedBrushSkin);
        sumEl.textContent = `Khung: ${fObj ? fObj.title.split('(')[0].trim() : 'Mặc định'} • Bút: ${bObj ? bObj.title.split('•')[0].trim() : 'Mặc định'}`;
      }
      const buffPill = document.getElementById('active-buff-2x-pill');
      if (buffPill) {
        if (APP_STATE.doubleXpActive) buffPill.classList.remove('hidden');
        else buffPill.classList.add('hidden');
      }
      redrawHanziCanvas();
    }

    function equipCosmeticSkin(skinId) {
      ensureInventoryInitialized();
      const skin = COSMETIC_SKINS_CATALOG.find(s => s.id === skinId);
      if (!skin) return;
      if (!APP_STATE.unlockedSkins.includes(skinId) && !skin.unlockedByDefault) {
        showToast('🔒 Ngoại trang này chưa mở khóa! Hãy quay Gacha để sở hữu nhé.', 'warn');
        return;
      }
      if (skin.category === 'FRAME') APP_STATE.equippedFrameSkin = skinId;
      else if (skin.category === 'BRUSH') APP_STATE.equippedBrushSkin = skinId;
      else if (skin.category === 'THEME') APP_STATE.equippedWebTheme = skinId;

      playCinematicSound('ting');
      applyEquippedSkinsToDOM();
      saveAppState();
      renderInventoryModalContent();
      showToast(`✨ Đã trang bị ngoại trang: "${skin.title}"!`, 'success');
    }

    function openInventoryModal() {
      ensureInventoryInitialized();
      const modal = document.getElementById('inventory-backpack-modal');
      if (!modal) return;
      modal.classList.remove('hidden');
      renderInventoryModalContent();
    }

    function closeInventoryModal() {
      document.getElementById('inventory-backpack-modal')?.classList.add('hidden');
    }

    function switchInventoryTab(tab) {
      activeInventoryTab = tab;
      ['cosmetics', 'consumables', 'unlockables'].forEach(t => {
        const btn = document.getElementById(`inv-tab-${t}`);
        if (btn) {
          btn.className = t === tab
            ? 'px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-stone-900 text-white shadow-sm transition'
            : 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 transition';
        }
      });
      renderInventoryModalContent();
    }

    function useConsumableItem(type) {
      ensureInventoryInitialized();
      if (type === 'xp_potion') {
        if (APP_STATE.consumables.xpPotions <= 0) {
          showToast('⚠️ Bạn đã dùng hết Bình Đan Dược x2 XP!', 'warn');
          return;
        }
        APP_STATE.consumables.xpPotions--;
        APP_STATE.doubleXpActive = true;
        playCinematicSound('fanfare');
        applyEquippedSkinsToDOM();
        saveAppState();
        renderInventoryModalContent();
        showToast('⚡ Đã uống Đan Dược Song Bội! Toàn bộ XP nhận được từ bây giờ sẽ nhân đôi (x2)!', 'success');
      } else if (type === 'fortune_cookie') {
        if (APP_STATE.consumables.fortuneCookies <= 0) {
          showToast('⚠️ Bạn đã hết Bánh Quy Quẻ Xăm! Hãy quay Gacha để nhận thêm.', 'warn');
          return;
        }
        APP_STATE.consumables.fortuneCookies--;
        const fortunes = [
          '🌟 Quẻ Đại Cát: "天道酬勤 (Thiên đạo thù cần)" — Trời không phụ người có lòng kiên trì! (+50 XP)',
          '🌟 Quẻ Hồng Vận: "熟能生巧 (Thục năng sinh xảo)" — Trăm hay không bằng tay quen, hôm nay luyện nói ắt đột phá! (+50 XP)',
          '🌟 Quẻ Tài Lộc: "和气生财 (Hòa khí sinh tài)" — Giao tiếp mềm mỏng trong Phòng Chat 1688 sẽ chốt được giá hời! (+50 XP)'
        ];
        const msg = fortunes[Math.floor(Math.random() * fortunes.length)];
        addXp(50, 'Rút Quẻ Xăm Đại Cát');
        renderInventoryModalContent();
        showToast(msg, 'success');
      } else if (type === 'streak_shield') {
        showToast(`🛡️ Bùa Hộ Mệnh đang ở trạng thái Tự Động Bảo Vệ (${APP_STATE.consumables.streakShields} bùa dự trữ)!`, 'info');
      }
    }

    function renderInventoryModalContent() {
      ensureInventoryInitialized();
      const bodyEl = document.getElementById('inventory-modal-body');
      const ticketCnt = document.getElementById('inv-modal-ticket-count');
      if (ticketCnt) ticketCnt.textContent = APP_STATE.gachaTickets || 0;
      if (!bodyEl) return;

      if (activeInventoryTab === 'cosmetics') {
        const categories = [
          { code: 'FRAME', title: '🖼️ 1. Khung Viền Avatar & Khung Bài Học (Có sẵn Khung Thủy Mặc để bạn test thử!)' },
          { code: 'BRUSH', title: '🖌️ 2. Skin Bút Lông Tập Viết Chữ Hán (Bảng Mễ Tự Cách Tab 4)' },
          { code: 'THEME', title: '🏛️ 3. Đại Giao Diện Toàn Cảnh (Full Web Premium Themes)' }
        ];

        bodyEl.innerHTML = categories.map(cat => {
          const items = COSMETIC_SKINS_CATALOG.filter(s => s.category === cat.code);
          return `
            <div class="space-y-2.5">
              <h4 class="font-extrabold text-stone-900 text-xs sm:text-sm border-b border-stone-200 pb-1.5">${cat.title}</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${items.map(item => {
                  const unlocked = APP_STATE.unlockedSkins.includes(item.id) || item.unlockedByDefault;
                  const isEquipped =
                    (item.category === 'FRAME' && APP_STATE.equippedFrameSkin === item.id) ||
                    (item.category === 'BRUSH' && APP_STATE.equippedBrushSkin === item.id) ||
                    (item.category === 'THEME' && APP_STATE.equippedWebTheme === item.id);
                  return `
                    <div class="p-3.5 rounded-2xl border-2 transition flex flex-col justify-between gap-3 ${
                      isEquipped
                        ? 'bg-amber-50/90 border-vermilion-600 shadow-md'
                        : unlocked
                        ? 'bg-stone-50 border-stone-200 hover:border-stone-400'
                        : 'bg-stone-100 border-stone-200 opacity-65'
                    }">
                      <div class="space-y-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-2xl">${item.icon}</span>
                          <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isEquipped ? 'bg-vermilion-600 text-white' : unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-300 text-stone-700'
                          }">${isEquipped ? 'ĐANG TRANG BỊ ✓' : unlocked ? 'ĐÃ SỞ HỮU' : '🔒 GACHA'}</span>
                        </div>
                        <div class="font-extrabold text-stone-900 text-xs sm:text-sm">${item.title}</div>
                        <div class="text-[11px] text-amber-600 font-bold">${item.stars}</div>
                        <p class="text-[11px] text-stone-600 leading-relaxed">${item.desc}</p>
                      </div>
                      <button type="button" onclick="equipCosmeticSkin('${item.id}')" class="w-full py-2 rounded-xl text-xs font-extrabold transition ${
                        isEquipped
                          ? 'bg-stone-900 text-amber-300'
                          : unlocked
                          ? 'bg-vermilion-600 hover:bg-vermilion-700 text-white shadow-sm'
                          : 'bg-stone-300 text-stone-600 cursor-not-allowed'
                      }">
                        ${isEquipped ? '✓ Đang Sử Dụng' : unlocked ? '⚡ Trang Bị Ngay' : 'Quay Gacha Để Mở'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('');
      } else if (activeInventoryTab === 'consumables') {
        const c = APP_STATE.consumables;
        bodyEl.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex flex-col justify-between gap-3">
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-3xl">⚡</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-black text-xs">Số lượng: ${c.xpPotions}</span>
                </div>
                <h4 class="font-extrabold text-stone-900">Bình Đan Dược Song Bội XP (2x XP)</h4>
                <p class="text-xs text-stone-600">Khi kích hoạt, mọi điểm kinh nghiệm XP từ Bài học, Phòng Chat WeChat và Luyện đề đều được nhân đôi!</p>
              </div>
              <button type="button" onclick="useConsumableItem('xp_potion')" class="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold">
                ${APP_STATE.doubleXpActive ? '⚡ Đang Bật x2 XP' : '🧪 Uống Đan Dược (Bật x2 XP)'}
              </button>
            </div>

            <div class="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex flex-col justify-between gap-3">
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-3xl">🥠</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs">Số lượng: ${c.fortuneCookies}</span>
                </div>
                <h4 class="font-extrabold text-stone-900">Bánh Quy Quẻ Xăm Đại Cát</h4>
                <p class="text-xs text-stone-600">Bẻ bánh nhận câu châm ngôn Hán ngữ may mắn trong ngày kèm thưởng nóng +50 XP!</p>
              </div>
              <button type="button" onclick="useConsumableItem('fortune_cookie')" class="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-extrabold">
                🥠 Bẻ Bánh Rút Quẻ (+50 XP)
              </button>
            </div>

            <div class="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex flex-col justify-between gap-3">
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-3xl">🛡️</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 font-black text-xs">Số lượng: ${c.streakShields}</span>
                </div>
                <h4 class="font-extrabold text-stone-900">Bùa Hộ Mệnh Chuỗi Ngày Học</h4>
                <p class="text-xs text-stone-600">Tự động kích hoạt bảo vệ chuỗi lửa Streak không bị đứt khi bạn bận việc quên điểm danh 1 ngày.</p>
              </div>
              <button type="button" onclick="useConsumableItem('streak_shield')" class="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold">
                🛡️ Đang Bảo Vệ Tự Động
              </button>
            </div>
          </div>
        `;
      } else {
        const shards = APP_STATE.consumables.scriptureShards || 2;
        bodyEl.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl border border-amber-300 bg-amber-50/60 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="text-3xl">📜</span>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 font-black text-xs">Mảnh ghép: ${shards}/3</span>
              </div>
              <h4 class="font-extrabold text-stone-900">Bí Kíp Cổ Văn: Binh Pháp Tôn Tử & Luận Ngữ (HSK 9)</h4>
              <p class="text-xs text-stone-600">Thu thập mảnh bí kíp từ Gacha để lĩnh hội tinh hoa Văn ngôn cổ đại và cấu trúc diễn thuyết C2.</p>
              <button type="button" onclick="closeInventoryModal(); selectGlobalLevel('LVL4'); switchMainTab('lessons'); selectLesson('L10');" class="w-full py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-extrabold">
                📖 Mở Trang Bí Kíp Cổ Văn Ngay
              </button>
            </div>

            <div class="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/60 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="text-3xl">🗝️</span>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-black text-xs">Đã Mở Khóa ✓</span>
              </div>
              <h4 class="font-extrabold text-stone-900">Chìa Khóa Kịch Bản VIP: Đàm Phán Thượng Hải & 1688</h4>
              <p class="text-xs text-stone-600">Mở toàn bộ các lượt đối thoại chuyên sâu với Chủ xưởng Thâm Quyến và Giám Đốc Lý tại Thượng Hải.</p>
              <button type="button" onclick="closeInventoryModal(); switchMainTab('roleplay'); switchRoleplaySubtab('chat');" class="w-full py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold">
                💬 Vào Phòng Chat Thực Chiến Ngay
              </button>
            </div>
          </div>
        `;
      }
    }

    // --- HANDS-FREE PASSIVE RADIO LOOP CONTROLLER ---
    const RADIO_STATE = {
      active: false,
      trackIdx: 0,
      timer: null
    };

    function getRadioPlaylist() {
      const list = [];
      SHADOWING_TRACKS.forEach(t => {
        list.push({
          simp: t.segments.map(s => s.s).join(''),
          trad: t.segments.map(s => s.t).join(''),
          py: t.segments.map(s => s.py).join(' '),
          vi: t.vi
        });
      });
      VOCAB_DATA.slice(0, 10).forEach(v => {
        list.push({
          simp: `${v.simp} — ${v.exSimp}`,
          trad: `${v.trad} — ${v.exTrad}`,
          py: `${v.pinyin} — ${v.exPinyin}`,
          vi: `${v.meaning}: ${v.exVi}`
        });
      });
      return list;
    }

    function toggleHandsFreeRadio() {
      RADIO_STATE.active = !RADIO_STATE.active;
      const bar = document.getElementById('handsfree-radio-bar');
      const lbl = document.getElementById('header-radio-label');
      if (RADIO_STATE.active) {
        if (bar) bar.classList.remove('hidden');
        if (lbl) lbl.textContent = 'Đang phát Radio...';
        showToast('🎧 Đã bật Radio Nghe Thụ Động Rảnh Tay! Hệ thống sẽ tự động đọc tuần tự.', 'success');
        playCurrentRadioTrack();
      } else {
        if (RADIO_STATE.timer) clearTimeout(RADIO_STATE.timer);
        try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
        if (bar) bar.classList.add('hidden');
        if (lbl) lbl.textContent = 'Radio Rảnh Tay';
        showToast('⏹️ Đã tắt chế độ Radio Nghe Thụ Động.', 'info');
      }
    }

    function nextHandsFreeRadioTrack() {
      if (RADIO_STATE.timer) clearTimeout(RADIO_STATE.timer);
      const playlist = getRadioPlaylist();
      RADIO_STATE.trackIdx = (RADIO_STATE.trackIdx + 1) % playlist.length;
      playCurrentRadioTrack();
    }

    function playCurrentRadioTrack() {
      if (!RADIO_STATE.active) return;
      const playlist = getRadioPlaylist();
      const item = playlist[RADIO_STATE.trackIdx % playlist.length];
      const disp = hz(item.simp, item.trad);

      const hzEl = document.getElementById('radio-current-hanzi');
      const pyEl = document.getElementById('radio-current-pinyin');
      const viEl = document.getElementById('radio-current-vi');
      if (hzEl) hzEl.textContent = disp;
      if (pyEl) pyEl.textContent = item.py;
      if (viEl) viEl.textContent = item.vi;

      speakChinese(disp);
      RADIO_STATE.timer = setTimeout(() => {
        if (!RADIO_STATE.active) return;
        RADIO_STATE.trackIdx = (RADIO_STATE.trackIdx + 1) % playlist.length;
        playCurrentRadioTrack();
      }, 5200);
    }

    function fillSuggestedNextReply() {
      const sc = ROLEPLAY_SCENARIOS[ROLEPLAY_STATE.scenarioIdx % ROLEPLAY_SCENARIOS.length];
      const currentTurnObj = sc.turns[ROLEPLAY_STATE.turnIdx % sc.turns.length];
      const qr = currentTurnObj?.quickReplies?.[0];
      if (!qr) return;
      const inp = document.getElementById('wechat-user-input');
      if (inp) {
        inp.value = hz(qr.simp, qr.trad);
        inp.focus();
      }
      showToast(`💡 Gợi ý: "${qr.vi}" (${qr.py})`, 'info');
    }

    // Web Speech API + Web Audio fallback tone cue
    function speakChinese(text) {
      if (!text) return;
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.lang = APP_STATE.scriptMode === 'trad' ? 'zh-TW' : 'zh-CN';
          utter.rate = APP_STATE.speechRate || 0.95;
          window.speechSynthesis.speak(utter);
          showToast(`🔊 Đang phát âm: "${text}"`, 'info');
          return;
        }
      } catch (e) {
        // Fallback below
      }
      playToneContourSynth(1);
      showToast(`🔊 Phát âm mẫu: "${text}"`, 'info');
    }

    // Synthesize pitch contour using Web Audio API so user hears exact tone contour
    function playToneContourSynth(toneNumber) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const now = ctx.currentTime;
        const duration = 0.55;

        if (toneNumber === 1) {
          osc.frequency.setValueAtTime(330, now);
          osc.frequency.linearRampToValueAtTime(330, now + duration);
        } else if (toneNumber === 2) {
          osc.frequency.setValueAtTime(210, now);
          osc.frequency.exponentialRampToValueAtTime(340, now + duration);
        } else if (toneNumber === 3) {
          osc.frequency.setValueAtTime(195, now);
          osc.frequency.linearRampToValueAtTime(145, now + duration * 0.55);
          osc.frequency.linearRampToValueAtTime(280, now + duration);
        } else {
          osc.frequency.setValueAtTime(350, now);
          osc.frequency.exponentialRampToValueAtTime(150, now + duration);
        }

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
      } catch (e) {
        // Ignore audio context restrictions
      }
    }

    function setScriptMode(mode) {
      APP_STATE.scriptMode = mode;
      const btnSimp = document.getElementById('btn-script-simp');
      const btnTrad = document.getElementById('btn-script-trad');
      if (mode === 'simp') {
        btnSimp.className = 'px-2.5 py-1 text-xs font-semibold rounded-md bg-vermilion-600 text-white transition';
        btnTrad.className = 'px-2.5 py-1 text-xs font-semibold rounded-md text-stone-300 hover:text-white transition';
        document.getElementById('quote-hanzi').textContent = '学而时习之，不亦说乎？';
      } else {
        btnTrad.className = 'px-2.5 py-1 text-xs font-semibold rounded-md bg-vermilion-600 text-white transition';
        btnSimp.className = 'px-2.5 py-1 text-xs font-semibold rounded-md text-stone-300 hover:text-white transition';
        document.getElementById('quote-hanzi').textContent = '學而時習之，不亦說乎？';
      }
      refreshAllViews();
      showToast(mode === 'simp' ? 'Đã chuyển toàn trang sang Chữ Giản Thể (简体字)' : 'Đã chuyển toàn trang sang Chữ Phồn Thể (繁體字)', 'info');
    }

    function toggleDisplayOption(key) {
      APP_STATE[key] = !APP_STATE[key];
      const map = {
        showPinyin: { btn: 'toggle-pinyin', label: 'state-pinyin' },
        showHanViet: { btn: 'toggle-hanviet', label: 'state-hanviet' },
        showMeaning: { btn: 'toggle-meaning', label: 'state-meaning' }
      };
      const cfg = map[key];
      if (cfg) {
        const lbl = document.getElementById(cfg.label);
        if (lbl) lbl.textContent = APP_STATE[key] ? 'BẬT' : 'TẮT';
      }
      refreshAllViews();
    }

    function setSpeechRate(val) {
      APP_STATE.speechRate = parseFloat(val) || 0.95;
      showToast(`Đã chỉnh tốc độ đọc: ${val}x`, 'info');
    }

    function selectGlobalLevel(levelCode) {
      APP_STATE.globalLevel = levelCode;
      const pills = document.querySelectorAll('.level-pill');
      pills.forEach(btn => {
        const isCurrent = btn.getAttribute('data-level') === levelCode;
        if (isCurrent) {
          btn.className = 'level-pill px-3 py-2 rounded-xl text-left border transition bg-stone-900 text-white border-stone-900 shadow-sm';
        } else {
          btn.className = 'level-pill px-3 py-2 rounded-xl text-left border transition bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200';
        }
      });
      const badge = document.getElementById('active-level-badge');
      if (badge && LEVEL_META[levelCode]) {
        badge.textContent = `Đang chọn: ${LEVEL_META[levelCode].name}`;
      }
      refreshAllViews();
      showToast(`Đã lọc nội dung theo: ${LEVEL_META[levelCode].name}`, 'info');
    }

    function switchMainTab(tabId) {
      APP_STATE.activeMainTab = tabId;
      const tabs = ['lessons', 'pinyin', 'lexicon', 'writing', 'arena', 'dashboard', 'roleplay'];
      tabs.forEach(t => {
        const panel = document.getElementById(`panel-${t}`);
        const navBtn = document.getElementById(`nav-${t}`);
        if (panel) {
          if (t === tabId) panel.classList.remove('hidden');
          else panel.classList.add('hidden');
        }
        if (navBtn) {
          if (t === tabId) {
            navBtn.className = 'main-tab-btn shrink-0 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-vermilion-600 text-white shadow-sm transition flex items-center gap-1.5';
          } else {
            navBtn.className = 'main-tab-btn shrink-0 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-200/80 transition flex items-center gap-1.5';
          }
        }
      });

      if (tabId === 'writing') {
        setTimeout(() => redrawHanziCanvas(), 40);
      } else if (tabId === 'dashboard') {
        setTimeout(() => {
          renderSkillsChart();
          generateStudyPlan();
          renderSavedBookmarks();
        }, 40);
      } else if (tabId === 'roleplay') {
        renderRoleplayTabAll();
      }
    }

    // =========================================================================
    // 7. TAB 1 CONTROLLER: LESSONS & DEEP VIEWER
    // =========================================================================
    function renderLessonList() {
      const container = document.getElementById('lesson-list-container');
      const countBadge = document.getElementById('lesson-count-badge');
      if (!container) return;

      const focusFilter = document.getElementById('filter-lesson-focus')?.value || 'ALL';
      const statusFilter = document.getElementById('filter-lesson-status')?.value || 'ALL';
      const query = (document.getElementById('search-lesson-input')?.value || '').trim().toLowerCase();

      const filtered = LESSONS_DATA.filter(les => {
        if (APP_STATE.globalLevel !== 'ALL' && les.level !== APP_STATE.globalLevel) return false;
        if (focusFilter !== 'ALL' && les.focus !== focusFilter) return false;
        const isDone = APP_STATE.completedLessons.includes(les.id);
        if (statusFilter === 'DONE' && !isDone) return false;
        if (statusFilter === 'TODO' && isDone) return false;
        if (query) {
          const hay = `${les.code} ${les.title} ${les.summary}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      if (countBadge) countBadge.textContent = `${filtered.length} bài`;

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="p-6 text-center space-y-2">
            <p class="text-sm font-semibold text-stone-700">Không tìm thấy bài học khớp bộ lọc</p>
            <button type="button" onclick="resetLessonFilters()" class="px-3 py-1.5 rounded-lg bg-vermilion-600 text-white text-xs font-bold">Xem tất cả 14 bài học</button>
          </div>`;
        return;
      }

      // Ensure activeLessonId is valid in filtered list
      if (!filtered.some(l => l.id === APP_STATE.activeLessonId)) {
        APP_STATE.activeLessonId = filtered[0].id;
      }

      container.innerHTML = filtered.map(les => {
        const isSelected = les.id === APP_STATE.activeLessonId;
        const isDone = APP_STATE.completedLessons.includes(les.id);
        const lvlBadge = LEVEL_META[les.level]?.badge || 'bg-stone-100 text-stone-700';
        return `
          <button type="button" onclick="selectLesson('${les.id}')" class="lesson-card-skin w-full text-left p-3.5 rounded-xl transition flex flex-col gap-1.5 ${isSelected ? 'bg-amber-50/90 border-l-4 border-vermilion-600' : 'hover:bg-stone-50'}">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-md border ${lvlBadge}">${les.code}</span>
              <span class="text-xs font-bold ${isDone ? 'text-emerald-600' : 'text-stone-400'}">${isDone ? '✓ Đã học' : `+${les.xpReward} XP`}</span>
            </div>
            <h3 class="text-xs sm:text-sm font-bold text-stone-900 leading-snug">${les.title}</h3>
            <p class="text-[11px] text-stone-500 line-clamp-2">${les.summary}</p>
          </button>
        `;
      }).join('');

      renderLessonDetail();
    }

    function resetLessonFilters() {
      APP_STATE.globalLevel = 'ALL';
      const fFocus = document.getElementById('filter-lesson-focus');
      const fStatus = document.getElementById('filter-lesson-status');
      const fSearch = document.getElementById('search-lesson-input');
      if (fFocus) fFocus.value = 'ALL';
      if (fStatus) fStatus.value = 'ALL';
      if (fSearch) fSearch.value = '';
      selectGlobalLevel('ALL');
    }

    function selectLesson(lessonId) {
      APP_STATE.activeLessonId = lessonId;
      renderLessonList();
    }

    function renderLessonDetail() {
      const container = document.getElementById('lesson-detail-container');
      if (!container) return;
      const les = LESSONS_DATA.find(l => l.id === APP_STATE.activeLessonId) || LESSONS_DATA[0];
      const isDone = APP_STATE.completedLessons.includes(les.id);
      const lvlBadge = LEVEL_META[les.level]?.badge || 'bg-stone-100 text-stone-800';

      const takeawaysHtml = les.keyTakeaways.map(k => `
        <li class="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
          <span class="text-vermilion-600 font-bold mt-0.5">✦</span>
          <span>${k}</span>
        </li>
      `).join('');

      const vocabRowsHtml = les.vocab.map(v => {
        const displayChar = hz(v.simp, v.trad);
        return `
          <tr class="border-b border-stone-100 hover:bg-stone-50/80">
            <td class="py-2.5 px-3 font-bold text-base sm:text-lg hanzi-font text-stone-900">${displayChar}</td>
            <td class="py-2.5 px-3 text-xs sm:text-sm font-semibold text-emerald-700">${APP_STATE.showPinyin ? v.pinyin : '<span class="italic text-stone-400">[Đã ẩn]</span>'}</td>
            <td class="py-2.5 px-3 text-xs font-bold text-amber-800">${APP_STATE.showHanViet ? v.hanviet : '—'}</td>
            <td class="py-2.5 px-3 text-xs text-stone-600">${v.pos}</td>
            <td class="py-2.5 px-3 text-xs sm:text-sm text-stone-800">${APP_STATE.showMeaning ? v.meaning : '<span class="italic text-stone-400">[Đã ẩn nghĩa]</span>'}</td>
            <td class="py-2.5 px-3 text-right">
              <button type="button" onclick="speakChinese('${displayChar.replace(/'/g, '')}')" class="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-700 text-white text-xs font-semibold">🔊</button>
            </td>
          </tr>
        `;
      }).join('');

      const grammarHtml = les.grammar.map(g => `
        <div class="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2">
          <div class="text-xs sm:text-sm font-bold text-vermilion-800">📐 Công thức / Quy tắc: ${g.pattern}</div>
          <p class="text-xs sm:text-sm text-stone-700 leading-relaxed">${g.explanation}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
            <div class="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-rose-900"><strong>❌ Hay nhầm:</strong> ${g.wrong}</div>
            <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-emerald-900"><strong>✅ Chuẩn xác:</strong> ${g.right}</div>
          </div>
        </div>
      `).join('');

      const dialogueHtml = les.dialogue.map(d => {
        const lineChar = hz(d.simp, d.trad);
        return `
          <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-300">${d.speaker}</span>
                <span class="text-base sm:text-lg font-bold hanzi-font text-stone-900">${lineChar}</span>
              </div>
              ${APP_STATE.showPinyin ? `<p class="text-xs font-semibold text-emerald-700">${d.pinyin}</p>` : ''}
              ${APP_STATE.showHanViet ? `<p class="text-[11px] font-medium text-amber-800 uppercase tracking-wide">Hán Việt: ${d.hanviet}</p>` : ''}
              ${APP_STATE.showMeaning ? `<p class="text-xs sm:text-sm text-stone-700">${d.vi}</p>` : ''}
            </div>
            <div class="flex flex-col sm:flex-row gap-1.5 shrink-0">
              <button type="button" onclick="speakChinese('${lineChar.replace(/'/g, '')}')" class="px-3 py-1.5 rounded-xl bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs font-bold shadow-sm">
                🔊 Nghe
              </button>
              <button type="button" onclick="practiceDialogueLineInSpeechLab('${d.simp.replace(/'/g, '')}', '${d.trad.replace(/'/g, '')}', '${d.pinyin.replace(/'/g, '')}', '${d.vi.replace(/'/g, '')}')" class="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm" title="Chấm điểm phát âm câu này qua Micro">
                🎙️ Luyện nói
              </button>
            </div>
          </div>
        `;
      }).join('');

      const quizOptionsHtml = les.quiz.options.map((opt, idx) => `
        <button type="button" onclick="checkLessonQuiz('${les.id}', ${idx})" class="w-full text-left px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-amber-50 hover:border-amber-400 text-xs sm:text-sm font-medium text-stone-800 transition flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-xs font-bold">${String.fromCharCode(65 + idx)}</span>
          <span>${opt}</span>
        </button>
      `).join('');

      container.innerHTML = `
        <!-- Lesson Header -->
        <div class="flex flex-wrap items-start justify-between gap-3 border-b border-stone-200 pb-4">
          <div class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-md border ${lvlBadge}">${les.code}</span>
              <span class="text-xs font-semibold text-stone-500">Thưởng hoàn thành: +${les.xpReward} XP</span>
            </div>
            <h2 class="text-lg sm:text-2xl font-extrabold text-stone-900">${les.title}</h2>
            <p class="text-xs sm:text-sm text-stone-600">${les.summary}</p>
          </div>
          <button type="button" onclick="toggleCompleteLesson('${les.id}')" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${isDone ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-stone-900 text-white hover:bg-stone-800'}">
            ${isDone ? '✓ Đã Hoàn Thành Bài Này' : '☑️ Đánh Dấu Hoàn Thành'}
          </button>
        </div>

        <!-- 1. Key Takeaways -->
        <div class="space-y-2">
          <h3 class="text-sm font-bold uppercase tracking-wider text-stone-500">1. Trọng Tâm Kiến Thức Cần Nắm</h3>
          <ul class="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2">${takeawaysHtml}</ul>
        </div>

        <!-- 2. Core Vocabulary Table -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold uppercase tracking-wider text-stone-500">2. Từ Vựng & Thuật Ngữ Trọng Tâm</h3>
            <span class="text-xs text-stone-500">Click 🔊 để nghe phát âm chuẩn</span>
          </div>
          <div class="overflow-x-auto border border-stone-200 rounded-xl">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-stone-100 text-[11px] font-bold uppercase text-stone-600 border-b border-stone-200">
                  <th class="py-2.5 px-3">Chữ Hán</th>
                  <th class="py-2.5 px-3">Pinyin</th>
                  <th class="py-2.5 px-3">Hán Việt</th>
                  <th class="py-2.5 px-3">Từ loại</th>
                  <th class="py-2.5 px-3">Nghĩa Tiếng Việt</th>
                  <th class="py-2.5 px-3 text-right">Nghe</th>
                </tr>
              </thead>
              <tbody>${vocabRowsHtml}</tbody>
            </table>
          </div>
        </div>

        <!-- 3. Grammar & Nuance Breakdown -->
        <div class="space-y-2.5">
          <h3 class="text-sm font-bold uppercase tracking-wider text-stone-500">3. Phân Tích Ngữ Pháp & Tránh Lỗi Sai Thường Gặp</h3>
          ${grammarHtml}
        </div>

        <!-- 4. Real-World Dialogue / Reading Passage -->
        <div class="space-y-2.5">
          <h3 class="text-sm font-bold uppercase tracking-wider text-stone-500">4. Hội Thoại & Ngữ Cảnh Thực Chiến</h3>
          <div class="space-y-2.5">${dialogueHtml}</div>
        </div>

        <!-- 5. Quick Lesson Verification Quiz -->
        <div class="bg-stone-100 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3">
          <div class="text-xs font-bold uppercase tracking-wider text-vermilion-700">🎯 Câu Hỏi Kiểm Tra Nhanh Cuối Bài</div>
          <p class="text-sm font-bold text-stone-900">${les.quiz.question}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${quizOptionsHtml}</div>
          <div id="lesson-quiz-feedback" class="hidden p-3 rounded-xl text-xs sm:text-sm font-medium"></div>
        </div>
      `;
    }

    function checkLessonQuiz(lessonId, selectedIdx) {
      const les = LESSONS_DATA.find(l => l.id === lessonId);
      const fb = document.getElementById('lesson-quiz-feedback');
      if (!les || !fb) return;
      fb.classList.remove('hidden');
      if (selectedIdx === les.quiz.correctIndex) {
        fb.className = 'p-3.5 rounded-xl text-xs sm:text-sm font-medium bg-emerald-100 text-emerald-950 border border-emerald-300';
        fb.innerHTML = `<strong>🎉 Chính xác!</strong> ${les.quiz.explanation}`;
        if (!APP_STATE.completedLessons.includes(lessonId)) {
          APP_STATE.completedLessons.push(lessonId);
        }
        if (!APP_STATE.rewardedLessonIds.includes(lessonId)) {
          APP_STATE.rewardedLessonIds.push(lessonId);
          addXp(les.xpReward, `Hoàn thành xuất sắc bài kiểm tra: ${les.code} (+${les.xpReward} XP)`);
        } else {
          showToast('Bạn đã trả lời chính xác câu hỏi kiểm tra bài học!', 'success');
        }
        renderLessonList();
      } else {
        fb.className = 'p-3.5 rounded-xl text-xs sm:text-sm font-medium bg-rose-100 text-rose-950 border border-rose-300';
        fb.innerHTML = `<strong>💡 Chưa đúng rồi!</strong> Hãy xem lại gợi ý ngữ pháp phía trên và thử chọn đáp án khác nhé.`;
      }
    }

    function toggleCompleteLesson(lessonId) {
      const les = LESSONS_DATA.find(l => l.id === lessonId);
      if (!les) return;
      const idx = APP_STATE.completedLessons.indexOf(lessonId);
      if (idx === -1) {
        APP_STATE.completedLessons.push(lessonId);
        // Anti-spam safeguard: Only grant completion XP on the FIRST TIME this lesson is completed!
        if (!APP_STATE.rewardedLessonIds.includes(lessonId)) {
          APP_STATE.rewardedLessonIds.push(lessonId);
          addXp(les.xpReward, `Hoàn thành lần đầu: ${les.code} (+${les.xpReward} XP)`);
          // Reward 1 Gacha Ticket for every 2 completed lessons!
          if (APP_STATE.rewardedLessonIds.length % 2 === 0) {
            APP_STATE.gachaTickets = (APP_STATE.gachaTickets || 0) + 1;
            showToast('🎫 Thưởng mốc tiến độ: Nhận thêm 1 Vé Quay Gacha!', 'success');
          }
        } else {
          showToast(`Đã đánh dấu lại hoàn thành ${les.code} (Điểm XP lần đầu đã nhận trước đó)`, 'info');
          updateHeaderStats();
          saveAppState();
        }
      } else {
        APP_STATE.completedLessons.splice(idx, 1);
        updateHeaderStats();
        saveAppState();
        showToast(`Đã bỏ đánh dấu ${les.code}`, 'info');
      }
      renderLessonList();
    }

    // =========================================================================
    // 8. TAB 2 CONTROLLER: PINYIN LAB, TONES, STROKES & 214 RADICALS
    // =========================================================================
    function switchPinyinSubtab(subId) {
      const subs = ['table', 'tones', 'strokes', 'radicals'];
      subs.forEach(s => {
        const panel = document.getElementById(`subpanel-pinyin-${s}`);
        const btn = document.getElementById(`subbtn-pinyin-${s}`);
        if (panel) {
          if (s === subId) panel.classList.remove('hidden');
          else panel.classList.add('hidden');
        }
        if (btn) {
          btn.className = s === subId
            ? 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-900 text-white transition'
            : 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition';
        }
      });
    }

    function renderPinyinLab() {
      const initGrid = document.getElementById('pinyin-initials-grid');
      const finGrid = document.getElementById('pinyin-finals-grid');
      if (initGrid) {
        initGrid.innerHTML = PINYIN_INITIALS_GROUPS.map(grp => `
          <div class="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-2">
            <div class="text-xs font-bold text-stone-700">${grp.groupName}</div>
            <div class="flex flex-wrap gap-2">
              ${grp.items.map(it => `
                <button type="button" onclick="inspectPinyinItem('${it.id}')" class="px-3 py-1.5 rounded-lg bg-white hover:bg-vermilion-50 border border-stone-300 hover:border-vermilion-500 text-xs sm:text-sm font-bold text-stone-900 shadow-sm transition">
                  ${it.code} <span class="text-[11px] font-normal text-stone-500">${it.ipa}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `).join('');
      }

      if (finGrid) {
        finGrid.innerHTML = PINYIN_FINALS_GROUPS.map(grp => `
          <div class="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-2">
            <div class="text-xs font-bold text-stone-700">${grp.groupName}</div>
            <div class="flex flex-wrap gap-2">
              ${grp.items.map(it => `
                <button type="button" onclick="inspectPinyinItem('${it.id}')" class="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 border border-stone-300 hover:border-emerald-500 text-xs sm:text-sm font-bold text-stone-900 shadow-sm transition">
                  ${it.code}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('');
      }

      inspectPinyinItem('zh');
      renderTonesAndSandhi();
      renderStrokesAndRules();
      renderRadicalsGrid();
    }

    function inspectPinyinItem(itemId) {
      const card = document.getElementById('pinyin-inspector-card');
      if (!card) return;
      let found = null;
      for (const g of [...PINYIN_INITIALS_GROUPS, ...PINYIN_FINALS_GROUPS]) {
        const match = g.items.find(x => x.id === itemId);
        if (match) { found = { ...match, groupName: g.groupName }; break; }
      }
      if (!found) return;
      const sampleHanzi = found.sample.split('(')[0].replace(/•/g, '').trim();
      card.innerHTML = `
        <div class="flex items-center justify-between border-b border-stone-700 pb-3">
          <div>
            <span class="text-[11px] uppercase tracking-wider text-amber-400 font-bold">${found.groupName}</span>
            <h4 class="text-3xl font-extrabold text-white mt-0.5">${found.code} <span class="text-base font-normal text-stone-400">${found.ipa}</span></h4>
          </div>
          <button type="button" onclick="speakChinese('${sampleHanzi}')" class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow transition">
            🔊 Nghe Mẫu
          </button>
        </div>
        <div class="space-y-3 text-xs sm:text-sm">
          <div class="bg-stone-800 rounded-xl p-3 border border-stone-700">
            <div class="text-amber-300 font-bold mb-1">👄 Vị trí Răng - Môi - Lưỡi & Luồng Hơi:</div>
            <p class="text-stone-200 leading-relaxed">${found.tip}</p>
          </div>
          <div class="bg-stone-800 rounded-xl p-3 border border-stone-700">
            <div class="text-rose-300 font-bold mb-1">⚠️ Điểm Người Việt Hay Phát Âm Nhầm:</div>
            <p class="text-stone-200 leading-relaxed">${found.confuse}</p>
          </div>
          <div class="bg-stone-800 rounded-xl p-3 border border-stone-700 flex items-center justify-between">
            <div>
              <div class="text-emerald-300 font-bold">Từ vựng luyện âm tiêu biểu:</div>
              <div class="text-base font-bold hanzi-font text-white mt-0.5">${found.sample}</div>
            </div>
            <button type="button" onclick="speakChinese('${sampleHanzi}')" class="px-3 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-white text-xs font-semibold">Đọc từ</button>
          </div>
        </div>
      `;
    }

    function renderTonesAndSandhi() {
      const toneBox = document.getElementById('tone-cards-container');
      if (toneBox) {
        toneBox.innerHTML = TONE_DATA.map(t => {
          const exText = hz(t.exampleSimp, t.exampleTrad);
          const pureChar = exText.split('(')[0].trim();
          return `
            <div class="rounded-xl border border-stone-200 p-3.5 bg-stone-50 flex flex-col justify-between gap-2">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="text-xs font-bold text-stone-900">${t.name}</div>
                  <div class="text-[11px] text-stone-500">${t.pitch}</div>
                </div>
                <span class="text-sm font-extrabold px-2 py-0.5 rounded bg-white border border-stone-200">${t.mark}</span>
              </div>
              <svg viewBox="0 0 200 120" class="w-full h-20 bg-white rounded-lg border border-stone-200 p-1">
                <line x1="15" y1="25" x2="185" y2="25" stroke="#e7e5e4" stroke-width="1" stroke-dasharray="3,3" />
                <line x1="15" y1="65" x2="185" y2="65" stroke="#e7e5e4" stroke-width="1" stroke-dasharray="3,3" />
                <line x1="15" y1="105" x2="185" y2="105" stroke="#e7e5e4" stroke-width="1" stroke-dasharray="3,3" />
                <path d="${t.svgPath}" fill="none" stroke="${t.color}" stroke-width="5" stroke-linecap="round" />
              </svg>
              <p class="text-[11px] text-stone-600">${t.meaning}</p>
              <div class="flex items-center justify-between pt-1">
                <span class="text-xs font-bold hanzi-font text-stone-900">${exText}</span>
                <div class="flex gap-1">
                  <button type="button" onclick="playToneContourSynth(${t.tone})" class="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 text-[11px] font-semibold">🎵 Cao độ</button>
                  <button type="button" onclick="speakChinese('${pureChar}')" class="px-2 py-1 rounded bg-stone-900 hover:bg-stone-700 text-white text-[11px] font-semibold">🔊 Đọc</button>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }

      const sandhiBox = document.getElementById('sandhi-rules-container');
      if (sandhiBox) {
        sandhiBox.innerHTML = SANDHI_RULES_DATA.map(s => `
          <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <div class="text-xs sm:text-sm font-bold text-stone-900">${s.title}</div>
              <button type="button" onclick="speakChinese('${s.speakSample}')" class="px-2.5 py-1 rounded-lg bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs font-bold shrink-0">🔊 Nghe</button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="bg-white p-2 rounded-lg border border-stone-200"><strong>Mặt chữ & Pinyin gốc:</strong><br><span class="hanzi-font font-semibold">${s.written}</span></div>
              <div class="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-950"><strong>Phát âm thực tế:</strong><br><span class="font-bold">${s.spoken}</span></div>
            </div>
            <p class="text-xs text-stone-600">${s.desc}</p>
          </div>
        `).join('');
      }
    }

    function renderStrokesAndRules() {
      const stGrid = document.getElementById('eight-strokes-grid');
      if (stGrid) {
        stGrid.innerHTML = EIGHT_STROKES_DATA.map(st => `
          <div class="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3">
            <div class="w-12 h-12 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center text-2xl font-bold hanzi-serif shrink-0">${st.stroke}</div>
            <div class="space-y-0.5 text-xs">
              <div class="font-bold text-stone-900">${st.name}</div>
              <div class="text-vermilion-700 font-semibold">Hướng bút: ${st.dir}</div>
              <div class="text-stone-600">${st.desc}</div>
              <div class="text-stone-800 font-medium pt-0.5">Chữ mẫu: <span class="hanzi-font font-bold">${st.sample}</span></div>
            </div>
          </div>
        `).join('');
      }

      const ruleList = document.getElementById('stroke-rules-list');
      if (ruleList) {
        ruleList.innerHTML = STROKE_RULES_DATA.map(r => `
          <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
            <div class="font-bold text-stone-900">${r.rule}</div>
            <div class="text-stone-700">Ví dụ tiêu biểu: <strong class="hanzi-font text-sm text-vermilion-700">${r.example}</strong></div>
          </div>
        `).join('');
      }
    }

    function renderRadicalsGrid() {
      const container = document.getElementById('radicals-grid-container');
      if (!container) return;
      const cat = document.getElementById('filter-radical-cat')?.value || 'ALL';
      const q = (document.getElementById('search-radical-input')?.value || '').trim().toLowerCase();

      const list = RADICALS_DATA.filter(r => {
        if (cat !== 'ALL' && r.cat !== cat) return false;
        if (q) {
          const hay = `${r.rad} ${r.pinyin} ${r.hv} ${r.meaning} ${r.mnemonic} ${r.examples}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      container.innerHTML = list.map(r => {
        const firstChar = r.rad.split('/')[0].trim();
        return `
          <div class="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col justify-between gap-3 hover:border-amber-400 transition">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-xl font-bold hanzi-font text-vermilion-700">${r.rad}</div>
                <div>
                  <h4 class="text-sm font-bold text-stone-900">${r.hv} <span class="text-emerald-700">(${r.pinyin})</span></h4>
                  <span class="text-[11px] text-stone-500">${r.strokes} nét • Ý nghĩa: ${r.meaning}</span>
                </div>
              </div>
              <button type="button" onclick="speakChinese('${firstChar}')" class="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-bold">🔊</button>
            </div>
            <div class="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs text-stone-700 space-y-1">
              <div><strong class="text-stone-900">💡 Mẹo chiết tự:</strong> ${r.mnemonic}</div>
              <div class="pt-1"><strong class="text-stone-900">Chữ phái sinh:</strong> <span class="hanzi-font font-bold text-sm text-vermilion-700">${r.examples}</span></div>
            </div>
          </div>
        `;
      }).join('');
    }
    // =========================================================================
