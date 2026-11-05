// Tab 3 (Từ điển/Thành ngữ/Từ cận nghĩa) & Tab 4 (Mễ Tự Cách Canvas & SRS 3D)
// 9. TAB 3 CONTROLLER: VOCABULARY VAULT, CHENGYU & SYNONYMS
    // =========================================================================
    function switchLexiconSubtab(subId) {
      const subs = ['vocab', 'chengyu', 'synonyms'];
      subs.forEach(s => {
        const panel = document.getElementById(`subpanel-lex-${s}`);
        const btn = document.getElementById(`subbtn-lex-${s}`);
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

    function toggleSavedVocabFilter() {
      APP_STATE.onlySavedVocab = !APP_STATE.onlySavedVocab;
      const btn = document.getElementById('btn-filter-saved-vocab');
      if (btn) {
        btn.className = APP_STATE.onlySavedVocab
          ? 'w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-bold border border-amber-500 bg-amber-400 text-stone-950 transition'
          : 'w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-semibold border border-stone-300 bg-stone-50 hover:bg-amber-50 text-stone-700 transition';
      }
      renderVocabVault();
    }

    function toggleBookmarkVocab(vocabId) {
      const idx = APP_STATE.savedVocabIds.indexOf(vocabId);
      if (idx === -1) {
        APP_STATE.savedVocabIds.push(vocabId);
        addXp(5, 'Đã lưu từ vựng vào Sổ tay cá nhân');
      } else {
        APP_STATE.savedVocabIds.splice(idx, 1);
        updateHeaderStats();
        saveAppState();
        showToast('Đã xóa từ khỏi Sổ tay cá nhân', 'info');
      }
      renderVocabVault();
      renderSavedBookmarks();
      renderStreakAndBadges();
      applyThemeAndScalePreferences();
      applyEquippedSkinsToDOM();
      renderRoleplayTabAll();
    }

    function renderVocabVault() {
      const grid = document.getElementById('vocab-vault-grid');
      if (!grid) return;
      const domain = document.getElementById('filter-vocab-domain')?.value || 'ALL';
      const q = (document.getElementById('search-vocab-input')?.value || '').trim().toLowerCase();

      const filtered = VOCAB_VAULT_DATA.filter(v => {
        if (APP_STATE.globalLevel !== 'ALL' && v.level !== APP_STATE.globalLevel) return false;
        if (domain !== 'ALL' && v.domain !== domain) return false;
        if (APP_STATE.onlySavedVocab && !APP_STATE.savedVocabIds.includes(v.id)) return false;
        if (q) {
          const hay = `${v.simp} ${v.trad} ${v.pinyin} ${v.hanviet} ${v.meaning} ${v.collocations}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full bg-white rounded-2xl p-6 text-center border border-stone-200 text-xs sm:text-sm text-stone-600">Không có từ vựng nào khớp bộ lọc hiện tại. Hãy chọn "🌟 Tất Cả Cấp Độ" hoặc tắt bộ lọc "Chỉ hiện từ đã lưu".</div>`;
        return;
      }

      grid.innerHTML = filtered.map(v => {
        const isSaved = APP_STATE.savedVocabIds.includes(v.id);
        const charText = hz(v.simp, v.trad);
        const exText = hz(v.exSimp, v.exTrad);
        const lvlBadge = LEVEL_META[v.level]?.badge || 'bg-stone-100 text-stone-700';
        return `
          <div class="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col justify-between gap-3 hover:border-vermilion-400 transition">
            <div>
              <div class="flex items-start justify-between gap-2">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded border ${lvlBadge}">${LEVEL_META[v.level]?.short || v.level} • ${v.pos}</span>
                <div class="flex items-center gap-1">
                  <button type="button" onclick="speakChinese('${charText}')" class="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-bold" title="Nghe phát âm">🔊</button>
                  <button type="button" onclick="toggleBookmarkVocab('${v.id}')" class="px-2 py-1 rounded-lg border text-xs font-bold ${isSaved ? 'bg-amber-400 border-amber-500 text-stone-950' : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-900'}" title="Lưu vào Sổ tay">
                    ${isSaved ? '★ Đã lưu' : '☆ Lưu'}
                  </button>
                </div>
              </div>
              <div class="mt-2 flex items-baseline gap-2 flex-wrap">
                <h4 class="text-2xl font-bold hanzi-font text-stone-900">${charText}</h4>
                ${APP_STATE.showPinyin ? `<span class="text-sm font-bold text-emerald-700">${v.pinyin}</span>` : ''}
                ${APP_STATE.showHanViet ? `<span class="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">${v.hanviet}</span>` : ''}
              </div>
              ${APP_STATE.showMeaning ? `<p class="text-xs sm:text-sm font-semibold text-stone-800 mt-1.5">${v.meaning}</p>` : ''}
              <p class="text-[11px] text-stone-500 mt-1"><strong>Cụm từ ghép:</strong> <span class="hanzi-font text-stone-700">${v.collocations}</span></p>
            </div>
            <div class="bg-stone-50 rounded-xl p-2.5 border border-stone-200 text-xs space-y-1">
              <div class="flex items-center justify-between gap-1">
                <span class="font-medium hanzi-font text-stone-900">${exText}</span>
                <button type="button" onclick="speakChinese('${exText}')" class="text-[11px] text-vermilion-700 font-bold shrink-0">🔊 Câu</button>
              </div>
              ${APP_STATE.showMeaning ? `<div class="text-stone-500 italic">${v.exVi}</div>` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    function renderChengyuVault() {
      const grid = document.getElementById('chengyu-vault-grid');
      if (!grid) return;
      const q = (document.getElementById('search-chengyu-input')?.value || '').trim().toLowerCase();
      const list = CHENGYU_VAULT_DATA.filter(c => {
        if (!q) return true;
        return `${c.simp} ${c.trad} ${c.pinyin} ${c.hanviet} ${c.meaning} ${c.origin}`.toLowerCase().includes(q);
      });

      grid.innerHTML = list.map(c => {
        const displayTitle = hz(c.simp, c.trad);
        return `
          <div class="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
            <div class="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h4 class="text-xl sm:text-2xl font-bold hanzi-serif text-vermilion-800">${displayTitle}</h4>
                <div class="flex flex-wrap items-center gap-2 mt-1">
                  ${APP_STATE.showPinyin ? `<span class="text-xs font-bold text-emerald-700">${c.pinyin}</span>` : ''}
                  ${APP_STATE.showHanViet ? `<span class="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">${c.hanviet}</span>` : ''}
                </div>
              </div>
              <button type="button" onclick="speakChinese('${displayTitle}')" class="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-700 shrink-0">🔊 Đọc</button>
            </div>
            <div class="space-y-2 text-xs sm:text-sm">
              <div><strong class="text-stone-900">Nghĩa đen:</strong> <span class="text-stone-700">${c.literal}</span></div>
              <div><strong class="text-stone-900">Nghĩa bóng & Ngữ dụng:</strong> <span class="text-stone-800 font-medium">${c.meaning}</span></div>
              <div class="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs text-stone-700">
                <strong class="text-amber-900">📜 Điển cố / Xuất xứ:</strong> ${c.origin}
              </div>
              <div class="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs flex items-center justify-between gap-2">
                <div><strong class="text-stone-900">Ứng dụng đặt câu:</strong> <span class="hanzi-font text-stone-800">${c.usage}</span></div>
                <button type="button" onclick="speakChinese('${c.usage}')" class="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold shrink-0">🔊</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function renderSynonymsVault() {
      const grid = document.getElementById('synonyms-vault-grid');
      if (!grid) return;
      const q = (document.getElementById('search-synonym-input')?.value || '').trim().toLowerCase();
      const list = SYNONYM_VAULT_DATA.filter(s => {
        if (APP_STATE.globalLevel !== 'ALL' && s.level !== APP_STATE.globalLevel) return false;
        if (!q) return true;
        return `${s.pair} ${s.diff} ${s.right} ${s.wrong}`.toLowerCase().includes(q);
      });

      if (list.length === 0) {
        grid.innerHTML = `<div class="col-span-full bg-white rounded-2xl p-6 text-center border border-stone-200 text-xs sm:text-sm text-stone-600">Không có cặp từ cận nghĩa nào ở bộ lọc này. Hãy chọn "🌟 Tất Cả Cấp Độ" trên thanh công cụ để xem trọn bộ 10 chuyên đề từ Sơ cấp đến HSK 9.</div>`;
        return;
      }

      grid.innerHTML = list.map(s => `
        <div class="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-3">
          <div class="flex items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
            <h4 class="text-sm sm:text-base font-extrabold text-stone-900">${s.pair}</h4>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded border ${LEVEL_META[s.level]?.badge || ''}">${LEVEL_META[s.level]?.short || s.level}</span>
          </div>
          <p class="text-xs sm:text-sm text-stone-700 leading-relaxed">${s.diff}</p>
          <div class="space-y-1.5 text-xs">
            <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 hanzi-font font-medium">${s.right}</div>
            <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 hanzi-font font-medium">${s.wrong}</div>
          </div>
        </div>
      `).join('');
    }

    // =========================================================================
    // 10. TAB 4 CONTROLLER: HANZI CALLIGRAPHY CANVAS & 3D SRS FLASHCARDS
    // =========================================================================
    const HANZI_CANVAS_STATE = {
      activeCharIndex: 0,
      customChar: null,
      showGhost: true,
      brushColor: '#1c1917',
      brushSize: 12,
      isDrawing: false,
      strokes: [],
      currentStroke: []
    };

    function initHanziCanvas() {
      renderCanvasPresets();
      const canvas = document.getElementById('hanzi-canvas');
      if (!canvas) return;

      const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: ((clientX - rect.left) / rect.width) * canvas.width,
          y: ((clientY - rect.top) / rect.height) * canvas.height
        };
      };

      canvas.addEventListener('mousedown', (e) => {
        HANZI_CANVAS_STATE.isDrawing = true;
        HANZI_CANVAS_STATE.currentStroke = [getPos(e)];
        redrawHanziCanvas();
      });

      canvas.addEventListener('mousemove', (e) => {
        if (!HANZI_CANVAS_STATE.isDrawing) return;
        HANZI_CANVAS_STATE.currentStroke.push(getPos(e));
        redrawHanziCanvas();
      });

      window.addEventListener('mouseup', () => {
        if (!HANZI_CANVAS_STATE.isDrawing) return;
        HANZI_CANVAS_STATE.isDrawing = false;
        if (HANZI_CANVAS_STATE.currentStroke.length > 0) {
          HANZI_CANVAS_STATE.strokes.push({
            color: HANZI_CANVAS_STATE.brushColor,
            size: HANZI_CANVAS_STATE.brushSize,
            points: [...HANZI_CANVAS_STATE.currentStroke]
          });
          HANZI_CANVAS_STATE.currentStroke = [];
        }
        redrawHanziCanvas();
      });

      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        HANZI_CANVAS_STATE.isDrawing = true;
        HANZI_CANVAS_STATE.currentStroke = [getPos(e)];
        redrawHanziCanvas();
      }, { passive: false });

      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!HANZI_CANVAS_STATE.isDrawing) return;
        HANZI_CANVAS_STATE.currentStroke.push(getPos(e));
        redrawHanziCanvas();
      }, { passive: false });

      canvas.addEventListener('touchend', () => {
        if (!HANZI_CANVAS_STATE.isDrawing) return;
        HANZI_CANVAS_STATE.isDrawing = false;
        if (HANZI_CANVAS_STATE.currentStroke.length > 0) {
          HANZI_CANVAS_STATE.strokes.push({
            color: HANZI_CANVAS_STATE.brushColor,
            size: HANZI_CANVAS_STATE.brushSize,
            points: [...HANZI_CANVAS_STATE.currentStroke]
          });
          HANZI_CANVAS_STATE.currentStroke = [];
        }
        redrawHanziCanvas();
      });

      redrawHanziCanvas();
    }

    function getActiveCanvasCharObj() {
      if (HANZI_CANVAS_STATE.customChar) {
        return {
          char: HANZI_CANVAS_STATE.customChar,
          trad: HANZI_CANVAS_STATE.customChar,
          pinyin: 'Chữ tự chọn',
          hv: 'HÁN TỰ',
          strokes: '—',
          radical: 'Tra cứu tự do',
          decomp: 'Hãy canh đều trọng tâm chữ vào điểm giao Mễ Tự Cách ở chính giữa khung.'
        };
      }
      return CANVAS_CHARS_DATA[HANZI_CANVAS_STATE.activeCharIndex] || CANVAS_CHARS_DATA[0];
    }

    function renderCanvasPresets() {
      const box = document.getElementById('canvas-char-presets');
      const meta = document.getElementById('canvas-char-meta');
      if (box) {
        box.innerHTML = CANVAS_CHARS_DATA.map((item, idx) => {
          const disp = hz(item.char, item.trad);
          const isAct = !HANZI_CANVAS_STATE.customChar && idx === HANZI_CANVAS_STATE.activeCharIndex;
          return `
            <button type="button" onclick="selectCanvasChar(${idx})" class="px-3 py-1.5 rounded-xl text-sm font-bold hanzi-font border transition ${isAct ? 'bg-vermilion-600 text-white border-vermilion-600 shadow' : 'bg-stone-50 text-stone-800 border-stone-300 hover:bg-amber-50'}">
              ${disp} <span class="text-[11px] font-normal">(${item.pinyin})</span>
            </button>
          `;
        }).join('');
      }

      const activeObj = getActiveCanvasCharObj();
      const dispChar = hz(activeObj.char, activeObj.trad);
      if (meta) {
        meta.innerHTML = `
          <div class="space-y-0.5 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-xl font-extrabold hanzi-font text-vermilion-700">${dispChar}</span>
              <span class="font-bold text-emerald-700">${activeObj.pinyin}</span>
              <span class="font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">${activeObj.hv}</span>
              <span class="text-stone-500">• Bộ: ${activeObj.radical} (${activeObj.strokes} nét)</span>
            </div>
            <p class="text-stone-600">${activeObj.decomp}</p>
          </div>
          <button type="button" onclick="speakChinese('${dispChar}')" class="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold shrink-0">🔊 Phát âm</button>
        `;
      }
    }

    function selectCanvasChar(idx) {
      HANZI_CANVAS_STATE.activeCharIndex = idx;
      HANZI_CANVAS_STATE.customChar = null;
      HANZI_CANVAS_STATE.strokes = [];
      renderCanvasPresets();
      redrawHanziCanvas();
    }

    function loadCustomCharacter() {
      const inp = document.getElementById('custom-hanzi-input');
      const val = (inp?.value || '').trim();
      if (!val) {
        showToast('Hãy nhập 1 chữ Hán vào ô trước khi bấm Nạp chữ!', 'warn');
        return;
      }
      HANZI_CANVAS_STATE.customChar = val[0];
      HANZI_CANVAS_STATE.strokes = [];
      renderCanvasPresets();
      redrawHanziCanvas();
      showToast(`Đã nạp chữ "${val[0]}" lên bảng Mễ Tự Cách!`, 'success');
    }

    function setBrushColor(c) {
      HANZI_CANVAS_STATE.brushColor = c;
    }

    function setBrushSize(s) {
      HANZI_CANVAS_STATE.brushSize = parseInt(s, 10) || 12;
    }

    function toggleGhostGuide() {
      HANZI_CANVAS_STATE.showGhost = !HANZI_CANVAS_STATE.showGhost;
      const btn = document.getElementById('btn-ghost-guide');
      if (btn) btn.textContent = `👁️ Chữ mờ: ${HANZI_CANVAS_STATE.showGhost ? 'BẬT' : 'TẮT'}`;
      redrawHanziCanvas();
    }

    function undoLastStroke() {
      HANZI_CANVAS_STATE.strokes.pop();
      redrawHanziCanvas();
    }

    function clearHanziCanvas() {
      HANZI_CANVAS_STATE.strokes = [];
      HANZI_CANVAS_STATE.currentStroke = [];
      redrawHanziCanvas();
    }

    function redrawHanziCanvas() {
      const canvas = document.getElementById('hanzi-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeObj = getActiveCanvasCharObj();
      const dispChar = hz(activeObj.char, activeObj.trad);

      // Draw ghost guide character
      if (HANZI_CANVAS_STATE.showGhost) {
        ctx.save();
        ctx.font = '700 185px "Noto Serif SC", "Noto Sans SC", serif';
        ctx.fillStyle = 'rgba(214, 211, 209, 0.52)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(dispChar, canvas.width / 2, canvas.height / 2 + 8);
        ctx.restore();
      }

      // Draw user strokes
      const allStrokes = [...HANZI_CANVAS_STATE.strokes];
      if (HANZI_CANVAS_STATE.currentStroke.length > 0) {
        allStrokes.push({
          color: HANZI_CANVAS_STATE.brushColor,
          size: HANZI_CANVAS_STATE.brushSize,
          points: HANZI_CANVAS_STATE.currentStroke
        });
      }

      allStrokes.forEach(st => {
        if (!st.points || st.points.length === 0) return;
        ctx.save();
        if (APP_STATE.equippedBrushSkin === 'BRUSH_ROYAL_VERMILION') {
          ctx.strokeStyle = '#dc2626';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 10;
        } else if (APP_STATE.equippedBrushSkin === 'BRUSH_JADE_BAMBOO') {
          ctx.strokeStyle = '#059669';
          ctx.shadowColor = '#34d399';
          ctx.shadowBlur = 8;
        } else if (APP_STATE.equippedBrushSkin === 'BRUSH_SHANSHUI_INK') {
          ctx.strokeStyle = '#0c0a09';
          ctx.shadowColor = '#57534e';
          ctx.shadowBlur = 6;
        } else {
          ctx.strokeStyle = st.color;
        }
        ctx.lineWidth = st.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(st.points[0].x, st.points[0].y);
        for (let i = 1; i < st.points.length; i++) {
          ctx.lineTo(st.points[i].x, st.points[i].y);
        }
        if (st.points.length === 1) {
          ctx.lineTo(st.points[0].x + 0.5, st.points[0].y + 0.5);
        }
        ctx.stroke();
        ctx.restore();
      });
    }

    function evaluateHanziWriting() {
      const box = document.getElementById('canvas-score-box');
      if (HANZI_CANVAS_STATE.strokes.length === 0) {
        if (box) box.innerHTML = `<span class="text-rose-700 font-bold">⚠️ Bạn chưa viết nét nào trên bảng! Hãy dùng chuột hoặc ngón tay viết chữ vào ô Mễ Tự Cách trước nhé.</span>`;
        return;
      }

      // Offscreen pixel comparison between user strokes and reference glyph
      const activeObj = getActiveCanvasCharObj();
      const dispChar = hz(activeObj.char, activeObj.trad);
      const size = 260;

      const refCanvas = document.createElement('canvas');
      refCanvas.width = size; refCanvas.height = size;
      const refCtx = refCanvas.getContext('2d');
      refCtx.font = '700 185px "Noto Serif SC", "Noto Sans SC", serif';
      refCtx.fillStyle = '#000';
      refCtx.textAlign = 'center';
      refCtx.textBaseline = 'middle';
      refCtx.fillText(dispChar, size / 2, size / 2 + 8);

      const usrCanvas = document.createElement('canvas');
      usrCanvas.width = size; usrCanvas.height = size;
      const usrCtx = usrCanvas.getContext('2d');
      HANZI_CANVAS_STATE.strokes.forEach(st => {
        usrCtx.strokeStyle = '#000';
        usrCtx.lineWidth = Math.max(st.size, 14);
        usrCtx.lineCap = 'round';
        usrCtx.lineJoin = 'round';
        usrCtx.beginPath();
        usrCtx.moveTo(st.points[0].x, st.points[0].y);
        for (let i = 1; i < st.points.length; i++) usrCtx.lineTo(st.points[i].x, st.points[i].y);
        usrCtx.stroke();
      });

      const refData = refCtx.getImageData(0, 0, size, size).data;
      const usrData = usrCtx.getImageData(0, 0, size, size).data;
      let refPixels = 0, overlapPixels = 0, usrPixels = 0;

      for (let i = 3; i < refData.length; i += 16) {
        const rOn = refData[i] > 40;
        const uOn = usrData[i] > 40;
        if (rOn) refPixels++;
        if (uOn) usrPixels++;
        if (rOn && uOn) overlapPixels++;
      }

      const recall = refPixels > 0 ? overlapPixels / refPixels : 0;
      const precision = usrPixels > 0 ? overlapPixels / usrPixels : 0;
      const f1 = (recall + precision) > 0 ? (2 * recall * precision) / (recall + precision) : 0;
      const score = Math.min(99, Math.max(45, Math.round(f1 * 135)));

      APP_STATE.skillsScore.hanzi = Math.min(100, APP_STATE.skillsScore.hanzi + 2);
      addXp(15, `Luyện viết chữ "${dispChar}" đạt ${score}% độ chuẩn nét`);

      if (box) {
        box.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-bold text-stone-900">Độ chuẩn xác chữ "${dispChar}": <strong class="text-vermilion-600 text-sm">${score}%</strong> (${HANZI_CANVAS_STATE.strokes.length} nét đã viết)</span>
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">+15 XP</span>
          </div>
          <p class="mt-1 text-stone-600">${score >= 80 ? '🌟 Bố cục rất cân đối, trọng tâm chữ bám sát tâm Mễ Tự Cách!' : '💡 Hãy chú ý độ mở của nét Phiệt/Mác và giữ trục dọc thẳng theo đường tâm đứng.'}</p>
        `;
      }
    }

    // --- 3D SRS Flashcard Controller ---
    const SRS_STATE = {
      deckMode: 'ALL',
      cards: [],
      currentIndex: 0,
      masteredIds: []
    };

    function buildSrsDeck() {
      let pool = [];
      if (SRS_STATE.deckMode === 'SAVED') {
        pool = VOCAB_VAULT_DATA.filter(v => APP_STATE.savedVocabIds.includes(v.id));
        if (pool.length === 0) pool = VOCAB_VAULT_DATA.slice(0, 6);
      } else if (SRS_STATE.deckMode === 'CHENGYU') {
        pool = CHENGYU_VAULT_DATA.map((c, idx) => ({
          id: `CY_${idx}`, level: 'LVL4', simp: c.simp, trad: c.trad, pinyin: c.pinyin,
          hanviet: c.hanviet, meaning: c.meaning, collocations: c.literal, exSimp: c.usage, exTrad: c.usage, exVi: c.origin
        }));
      } else if (SRS_STATE.deckMode === 'BUSINESS') {
        pool = VOCAB_VAULT_DATA.filter(v => v.level === 'BIZ');
      } else {
        pool = VOCAB_VAULT_DATA.filter(v => APP_STATE.globalLevel === 'ALL' || v.level === APP_STATE.globalLevel);
        if (pool.length === 0) pool = VOCAB_VAULT_DATA;
      }
      SRS_STATE.cards = [...pool];
      SRS_STATE.currentIndex = 0;
      renderCurrentSrsCard();
    }

    function changeSrsDeck(mode) {
      SRS_STATE.deckMode = mode;
      buildSrsDeck();
    }

    function shuffleSrsDeck() {
      SRS_STATE.cards.sort(() => Math.random() - 0.5);
      SRS_STATE.currentIndex = 0;
      renderCurrentSrsCard();
      showToast('Đã trộn ngẫu nhiên bộ thẻ Flashcard!', 'info');
    }

    function flipSrsCard() {
      const wrap = document.getElementById('srs-flip-wrapper');
      if (wrap) wrap.classList.toggle('flipped');
    }

    function renderCurrentSrsCard() {
      const wrap = document.getElementById('srs-flip-wrapper');
      if (wrap) wrap.classList.remove('flipped');
      if (SRS_STATE.cards.length === 0) return;

      const card = SRS_STATE.cards[SRS_STATE.currentIndex % SRS_STATE.cards.length];
      const dispChar = hz(card.simp, card.trad);
      const dispEx = hz(card.exSimp, card.exTrad);

      document.getElementById('srs-index-label').textContent = `${(SRS_STATE.currentIndex % SRS_STATE.cards.length) + 1} / ${SRS_STATE.cards.length}`;
      document.getElementById('srs-mastered-count').textContent = SRS_STATE.masteredIds.length;
      document.getElementById('srs-front-tag').textContent = LEVEL_META[card.level]?.short || card.level;
      document.getElementById('srs-front-hanzi').textContent = dispChar;
      document.getElementById('srs-back-hanzi').textContent = dispChar;
      document.getElementById('srs-back-pinyin').textContent = card.pinyin;
      document.getElementById('srs-back-hanviet').textContent = card.hanviet;
      document.getElementById('srs-back-meaning').textContent = card.meaning;
      document.getElementById('srs-back-note').textContent = `Cụm mở rộng / Nghĩa gốc: ${card.collocations}`;
      document.getElementById('srs-back-example').textContent = dispEx;
      document.getElementById('srs-back-example-vi').textContent = card.exVi;
    }

    function speakCurrentSrs() {
      if (SRS_STATE.cards.length === 0) return;
      const card = SRS_STATE.cards[SRS_STATE.currentIndex % SRS_STATE.cards.length];
      speakChinese(hz(card.simp, card.trad));
    }

    function rateSrsCard(rating) {
      if (SRS_STATE.cards.length === 0) return;
      const card = SRS_STATE.cards[SRS_STATE.currentIndex % SRS_STATE.cards.length];
      if (rating === 'easy' || rating === 'good') {
        if (!SRS_STATE.masteredIds.includes(card.id)) SRS_STATE.masteredIds.push(card.id);
        addXp(rating === 'easy' ? 15 : 10, `Ôn thẻ "${hz(card.simp, card.trad)}"`);
      } else if (rating === 'hard') {
        addXp(5, null);
      }
      SRS_STATE.currentIndex = (SRS_STATE.currentIndex + 1) % SRS_STATE.cards.length;
      renderCurrentSrsCard();
    }
    // =========================================================================
