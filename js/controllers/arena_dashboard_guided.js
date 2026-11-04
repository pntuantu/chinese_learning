// Tab 5 (Luyện đề), Tab 6 (Sổ tay/Radar), Cloud Sync & Bộ điều hướng Mục tiêu (Guided Learning Paths)
// 11. TAB 5 CONTROLLER: PRACTICE ARENA (QUIZ, SENTENCE BUILDER, TRANSLATION)
    // =========================================================================
    const ARENA_STATE = {
      mode: 'quiz',
      quizIndex: 0,
      sentenceIndex: 0,
      selectedTokens: [],
      availableTokens: [],
      translationIndex: 0
    };

    function switchArenaMode(mode) {
      ARENA_STATE.mode = mode;
      const modes = ['quiz', 'sentence', 'translation', 'speech', 'reader', 'ime'];
      modes.forEach(m => {
        const panel = document.getElementById(`subpanel-arena-${m}`);
        const btn = document.getElementById(`subbtn-arena-${m}`);
        if (panel) {
          if (m === mode) panel.classList.remove('hidden');
          else panel.classList.add('hidden');
        }
        if (btn) {
          btn.className = m === mode
            ? 'px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-900 text-white shadow-sm transition'
            : 'px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition';
        }
      });
      renderArenaAll();
    }

    function renderArenaAll() {
      renderSpeechLab();
      renderSmartReader();
      renderPinyinImeSimulator();
      renderArenaQuiz();
      renderSentenceBuilder();
      renderTranslationDojo();
    }

    function renderArenaQuiz() {
      const box = document.getElementById('subpanel-arena-quiz');
      if (!box) return;
      const pool = ARENA_QUIZ_DATA.filter(q => APP_STATE.globalLevel === 'ALL' || q.level === APP_STATE.globalLevel);
      const list = pool.length > 0 ? pool : ARENA_QUIZ_DATA;
      const item = list[ARENA_STATE.quizIndex % list.length];
      const lvlBadge = LEVEL_META[item.level]?.badge || 'bg-stone-100 text-stone-800';

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded border ${lvlBadge}">${LEVEL_META[item.level]?.short || item.level}</span>
            <span class="text-xs font-semibold text-stone-500">Chuyên mục: ${item.type}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-stone-500">Câu ${(ARENA_STATE.quizIndex % list.length) + 1} / ${list.length}</span>
            <button type="button" onclick="nextArenaQuiz()" class="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-800">Câu tiếp theo ➔</button>
          </div>
        </div>
        <h4 class="text-sm sm:text-base font-bold text-stone-900 leading-relaxed">${item.prompt}</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${item.options.map((opt, idx) => `
            <button type="button" onclick="answerArenaQuiz('${item.id}', ${idx})" class="text-left p-3.5 rounded-xl border border-stone-300 hover:border-vermilion-500 hover:bg-amber-50/50 transition text-xs sm:text-sm font-medium text-stone-800 flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-xs font-bold shrink-0">${String.fromCharCode(65 + idx)}</span>
              <span class="hanzi-font">${opt}</span>
            </button>
          `).join('')}
        </div>
        <div id="arena-quiz-feedback" class="hidden p-4 rounded-xl text-xs sm:text-sm"></div>
      `;
    }

    function answerArenaQuiz(qId, idx) {
      const item = ARENA_QUIZ_DATA.find(q => q.id === qId);
      const fb = document.getElementById('arena-quiz-feedback');
      if (!item || !fb) return;
      fb.classList.remove('hidden');
      if (idx === item.answer) {
        APP_STATE.arenaStreak += 1;
        APP_STATE.skillsScore.grammar = Math.min(100, APP_STATE.skillsScore.grammar + 2);
        document.getElementById('arena-streak-count').textContent = `${APP_STATE.arenaStreak} 🔥`;
        fb.className = 'p-4 rounded-xl text-xs sm:text-sm bg-emerald-100 text-emerald-950 border border-emerald-300';
        fb.innerHTML = `<strong>✅ Chính xác!</strong> ${item.explain}`;
        addXp(20, 'Giải đúng câu hỏi Luyện đề');
      } else {
        APP_STATE.arenaStreak = 0;
        document.getElementById('arena-streak-count').textContent = `0 🔥`;
        fb.className = 'p-4 rounded-xl text-xs sm:text-sm bg-rose-100 text-rose-950 border border-rose-300';
        fb.innerHTML = `<strong>❌ Chưa chính xác!</strong> Đáp án đúng là <strong>${String.fromCharCode(65 + item.answer)}</strong>. Giải thích: ${item.explain}`;
      }
    }

    function nextArenaQuiz() {
      ARENA_STATE.quizIndex += 1;
      renderArenaQuiz();
    }

    // --- Sentence Builder ---
    function initSentenceItem() {
      const item = SENTENCE_BUILDER_DATA[ARENA_STATE.sentenceIndex % SENTENCE_BUILDER_DATA.length];
      ARENA_STATE.selectedTokens = [];
      ARENA_STATE.availableTokens = item.tokens.map((t, i) => ({ id: i, text: t })).sort(() => Math.random() - 0.5);
    }

    function renderSentenceBuilder() {
      const box = document.getElementById('subpanel-arena-sentence');
      if (!box) return;
      const item = SENTENCE_BUILDER_DATA[ARENA_STATE.sentenceIndex % SENTENCE_BUILDER_DATA.length];
      if (ARENA_STATE.availableTokens.length === 0 && ARENA_STATE.selectedTokens.length === 0) {
        initSentenceItem();
      }

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <span class="text-xs font-bold uppercase text-vermilion-700">Ghép Từ Thành Câu Chuẩn Trật Tự Ngữ Pháp</span>
            <p class="text-xs text-stone-500">Click vào từng mảnh từ bên dưới để xếp thành câu tương ứng với nghĩa tiếng Việt</p>
          </div>
          <div class="flex gap-2">
            <button type="button" onclick="resetSentenceTokens()" class="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold">🔄 Xếp lại</button>
            <button type="button" onclick="nextSentenceBuilder()" class="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold">Câu khác ➔</button>
          </div>
        </div>

        <div class="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
          <div class="text-xs font-bold text-stone-500">Nghĩa Tiếng Việt cần ghép:</div>
          <div class="text-sm sm:text-base font-bold text-stone-900 mt-0.5">"${item.vi}"</div>
        </div>

        <!-- Assembled Dropzone -->
        <div class="min-h-[64px] p-3.5 rounded-xl bg-stone-50 border-2 border-dashed border-stone-300 flex flex-wrap items-center gap-2">
          ${ARENA_STATE.selectedTokens.length === 0
            ? '<span class="text-xs text-stone-400">👆 Hãy click vào các mảnh từ tiếng Trung ở dưới để đưa lên đây...</span>'
            : ARENA_STATE.selectedTokens.map((tk, idx) => `
              <button type="button" onclick="unselectSentenceToken(${idx})" class="px-3 py-1.5 rounded-xl bg-stone-900 text-amber-300 text-sm font-bold hanzi-font shadow hover:bg-rose-800 transition">
                ${tk.text}
              </button>
            `).join('')}
        </div>

        <!-- Available Token Pool -->
        <div class="flex flex-wrap gap-2 pt-1">
          ${ARENA_STATE.availableTokens.map((tk, idx) => `
            <button type="button" onclick="pickSentenceToken(${idx})" class="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:border-vermilion-600 hover:bg-vermilion-50 text-sm font-bold hanzi-font text-stone-900 shadow-sm transition">
              ${tk.text}
            </button>
          `).join('')}
        </div>

        <div class="flex flex-wrap items-center gap-2 pt-2">
          <button type="button" onclick="checkSentenceBuilder()" class="px-4 py-2 rounded-xl bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs sm:text-sm font-bold shadow">✨ Kiểm Tra Câu Đã Ghép</button>
          <button type="button" onclick="speakChinese('${item.answer}')" class="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold">🔊 Nghe câu chuẩn</button>
        </div>

        <div id="sentence-builder-feedback" class="hidden p-3.5 rounded-xl text-xs sm:text-sm"></div>
      `;
    }

    function pickSentenceToken(idx) {
      const tk = ARENA_STATE.availableTokens.splice(idx, 1)[0];
      if (tk) ARENA_STATE.selectedTokens.push(tk);
      renderSentenceBuilder();
    }

    function unselectSentenceToken(idx) {
      const tk = ARENA_STATE.selectedTokens.splice(idx, 1)[0];
      if (tk) ARENA_STATE.availableTokens.push(tk);
      renderSentenceBuilder();
    }

    function resetSentenceTokens() {
      initSentenceItem();
      renderSentenceBuilder();
    }

    function nextSentenceBuilder() {
      ARENA_STATE.sentenceIndex += 1;
      initSentenceItem();
      renderSentenceBuilder();
    }

    function checkSentenceBuilder() {
      const item = SENTENCE_BUILDER_DATA[ARENA_STATE.sentenceIndex % SENTENCE_BUILDER_DATA.length];
      const userStr = ARENA_STATE.selectedTokens.map(t => t.text).join('');
      const fb = document.getElementById('sentence-builder-feedback');
      if (!fb) return;
      fb.classList.remove('hidden');
      if (userStr === item.answer) {
        fb.className = 'p-3.5 rounded-xl text-xs sm:text-sm bg-emerald-100 text-emerald-950 border border-emerald-300';
        fb.innerHTML = `<strong>🎉 Hoàn hảo!</strong> Câu ghép: <span class="hanzi-font font-bold">${item.answer}</span><br>${item.grammarTip}`;
        addXp(25, 'Ghép đúng cấu trúc câu tiếng Trung');
      } else {
        fb.className = 'p-3.5 rounded-xl text-xs sm:text-sm bg-amber-100 text-amber-950 border border-amber-300';
        fb.innerHTML = `<strong>💡 Gợi ý trật tự chuẩn:</strong> <span class="hanzi-font font-bold">${item.answer}</span><br>${item.grammarTip}`;
      }
    }

    // --- Translation Dojo ---
    function renderTranslationDojo() {
      const box = document.getElementById('subpanel-arena-translation');
      if (!box) return;
      const item = TRANSLATION_DOJO_DATA[ARENA_STATE.translationIndex % TRANSLATION_DOJO_DATA.length];
      const lvlBadge = LEVEL_META[item.level]?.badge || 'bg-stone-100 text-stone-800';

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded border ${lvlBadge}">${LEVEL_META[item.level]?.short || item.level}</span>
            <h4 class="text-sm font-bold text-stone-900">${item.title}</h4>
          </div>
          <button type="button" onclick="nextTranslationExercise()" class="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold">Đề dịch tiếp theo ➔</button>
        </div>

        <div class="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
          <div class="text-xs font-bold uppercase text-stone-500">Đề Bài Tiếng Việt:</div>
          <p class="text-sm sm:text-base font-bold text-stone-900 leading-relaxed">"${item.sourceVi}"</p>
          <p class="text-xs text-stone-500">Từ khóa gợi ý: <span class="hanzi-font font-semibold text-vermilion-700">${item.keywords.join(' • ')}</span></p>
        </div>

        <div class="space-y-2">
          <label for="translation-user-input" class="block text-xs font-bold text-stone-700">Nhập bản dịch tiếng Trung của bạn (hoặc bấm "Đối chiếu & Xem đáp án mẫu"):</label>
          <textarea id="translation-user-input" rows="3" placeholder="Gõ bản dịch tiếng Trung của bạn vào đây (VD: ${item.standardZh.slice(0, 12)}...)" class="w-full p-3 text-sm hanzi-font bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-vermilion-600"></textarea>
          <div class="flex flex-wrap gap-2">
            <button type="button" onclick="evaluateTranslation()" class="px-4 py-2 rounded-xl bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs sm:text-sm font-bold shadow">🖋️ Chấm Điểm & Đối Chiếu Bản Dịch Kỳ Cựu</button>
            <button type="button" onclick="fillSampleTranslation()" class="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold">Điền thử bản dịch mẫu</button>
          </div>
        </div>

        <div id="translation-feedback-box" class="hidden space-y-3 pt-2"></div>
      `;
    }

    function fillSampleTranslation() {
      const item = TRANSLATION_DOJO_DATA[ARENA_STATE.translationIndex % TRANSLATION_DOJO_DATA.length];
      const inp = document.getElementById('translation-user-input');
      if (inp) inp.value = item.veteranZh;
    }

    function nextTranslationExercise() {
      ARENA_STATE.translationIndex += 1;
      renderTranslationDojo();
    }

    function evaluateTranslation() {
      const item = TRANSLATION_DOJO_DATA[ARENA_STATE.translationIndex % TRANSLATION_DOJO_DATA.length];
      const userTxt = (document.getElementById('translation-user-input')?.value || '').trim();
      const fb = document.getElementById('translation-feedback-box');
      if (!fb) return;

      let matched = 0;
      item.keywords.forEach(kw => {
        if (userTxt.includes(kw)) matched++;
      });
      const ratio = userTxt.length > 0 ? Math.min(100, Math.round(((matched + 1) / (item.keywords.length + 1)) * 100)) : 0;

      fb.classList.remove('hidden');
      fb.innerHTML = `
        <div class="p-4 rounded-xl bg-stone-900 text-white space-y-3">
          <div class="flex items-center justify-between border-b border-stone-700 pb-2">
            <span class="text-xs font-bold text-amber-400">Độ khớp từ khóa cốt lõi: ${ratio}% (${matched}/${item.keywords.length} từ khóa)</span>
            <button type="button" onclick="speakChinese('${item.veteranZh}')" class="px-2.5 py-1 rounded bg-amber-500 text-stone-950 text-xs font-bold">🔊 Nghe Bản Kỳ Cựu</button>
          </div>
          <div class="space-y-2 text-xs sm:text-sm">
            <div class="bg-stone-800 p-3 rounded-lg border border-stone-700">
              <div class="text-sky-300 font-bold mb-0.5">📘 Bản dịch Tiêu chuẩn (Giao tiếp / HSK 3–4):</div>
              <div class="hanzi-font text-base font-semibold">${item.standardZh}</div>
            </div>
            <div class="bg-stone-800 p-3 rounded-lg border border-amber-500/40">
              <div class="text-amber-300 font-bold mb-0.5">🐉 Bản dịch Kỳ Cựu / Bản Xứ Trang Trọng (HSK 7–9 & B2B):</div>
              <div class="hanzi-font text-base font-bold text-amber-100">${item.veteranZh}</div>
            </div>
            <div class="text-xs text-stone-300 leading-relaxed"><strong>💡 Phân tích kỹ thuật dịch thuật:</strong> ${item.notes}</div>
          </div>
        </div>
      `;
      APP_STATE.skillsScore.business = Math.min(100, APP_STATE.skillsScore.business + 3);
      addXp(25, 'Hoàn thành bài luyện dịch chuyên sâu');
    }

    // =========================================================================
    // 11B. GROUP 2 INTERACTIVE TOOLS: SPEECH LAB, SMART READER & PINYIN IME
    // =========================================================================

    // --- 11B.1: SPEECH RECOGNITION PRONUNCIATION LAB ---
    const SPEECH_LAB_SENTENCES = [
      {
        id: 'SP01', level: 'LVL0', tag: 'Nhập Môn • Biến điệu Thanh 3',
        simp: '你好，请问这个汉字怎么读？',
        trad: '你好，請問這個漢字怎麼讀？',
        pinyin: 'Nǐ hǎo, qǐngwèn zhège Hànzì zěnme dú?',
        vi: 'Xin chào, cho hỏi chữ Hán này đọc như thế nào?',
        tip: 'Chú ý biến điệu: 你好 đọc là ní hǎo; chữ 请 (qǐng) bật hơi mặt lưỡi; 字 (zì) đầu lưỡi thẳng.'
      },
      {
        id: 'SP02', level: 'LVL1', tag: 'Sơ Cấp HSK 1–2 • Giao tiếp',
        simp: '我明天下午三点在咖啡馆等你。',
        trad: '我明天下午三點在咖啡館等你。',
        pinyin: 'Wǒ míngtiān xiàwǔ sān diǎn zài kāfēiguǎn děng nǐ.',
        vi: '3 giờ chiều mai tôi đợi bạn ở quán cà phê.',
        tip: 'Chú ý cụm "等你 (děng nǐ)" là 2 thanh 3 đi liền → đọc thành "déng nǐ".'
      },
      {
        id: 'SP03', level: 'LVL2', tag: 'Trung Cấp HSK 3–4 • Câu chữ 把',
        simp: '我已经把那份市场报告翻译成越南语了。',
        trad: '我已經把那份市場報告翻譯成越南語了。',
        pinyin: 'Wǒ yǐjīng bǎ nà fèn shìchǎng bàogào fānyì chéng Yuènányǔ le.',
        vi: 'Tôi đã dịch bản báo cáo thị trường đó sang tiếng Việt rồi.',
        tip: 'Giữ nhịp ngắt tự nhiên: 我已经 / 把那份市场报告 / 翻译成越南语了。'
      },
      {
        id: 'SP04', level: 'LVL3', tag: 'Cao Cấp HSK 5–6 • Kinh tế số',
        simp: '人工智能正在深刻改变全球供应链。',
        trad: '人工智能正在深刻改變全球供應鏈。',
        pinyin: 'Réngōng zhìnéng zhèngzài shēnkè gǎibiàn quánqiú gōngyìngliàn.',
        vi: 'Trí tuệ nhân tạo đang thay đổi sâu sắc chuỗi cung ứng toàn cầu.',
        tip: 'Phát âm rõ âm cong lưỡi: 智 (zhì), 正 (zhèng), 深 (shēn) và vận mẫu mũi sau -ng.'
      },
      {
        id: 'SP05', level: 'BIZ', tag: 'Thương Mại & 1688 • Đàm phán B2B',
        simp: '老板您好，这款蓝牙耳机有现货吗？支持定制吗？',
        trad: '老闆您好，這款藍牙耳機有現貨嗎？支持定制嗎？',
        pinyin: 'Lǎobǎn nínhǎo, zhè kuǎn lányá ěrjī yǒu xiànhuò ma? Zhīchí dìngzhì ma?',
        vi: 'Chào sếp, mẫu tai nghe Bluetooth này có sẵn hàng không? Có hỗ trợ làm thương hiệu riêng không?',
        tip: 'Lǎobǎn đọc thành Láobǎn (biến điệu thanh 3); 支持 (zhīchí) đều là âm cong lưỡi.'
      },
      {
        id: 'SP06', level: 'LVL4', tag: 'Kỳ Cựu HSK 7–9 • Cổ văn & Chiến lược',
        simp: '唯有审时度势、未雨绸缪，方能立于不败之地。',
        trad: '唯有審時度勢、未雨綢繆，方能立於不敗之地。',
        pinyin: 'Wéiyǒu shěnshí-duóshì, wèiyǔ-chóumóu, fāng néng lì yú búbài zhī dì.',
        vi: 'Chỉ có đánh giá đúng thời thế và chuẩn bị từ sớm mới có thể đứng ở thế bất bại.',
        tip: 'Chữ 度 trong 审时度势 bắt buộc đọc là duó (thanh 2), không đọc là dù!'
      }
    ];

    const SPEECH_LAB_STATE = {
      currentIndex: 0,
      customItem: null,
      isRecording: false,
      userRequestedStop: false,
      pauseToleranceMode: 'PAUSE_4S', // 'PAUSE_4S' | 'MANUAL_ONLY' | 'PAUSE_2S'
      accumulatedFinalText: '',
      interimSessionText: '',
      silenceTimer: null,
      recognizedText: '',
      lastAccuracy: null,
      recognitionInstance: null
    };

    function getActiveSpeechItem() {
      if (SPEECH_LAB_STATE.customItem) return SPEECH_LAB_STATE.customItem;
      const pool = SPEECH_LAB_SENTENCES.filter(s => APP_STATE.globalLevel === 'ALL' || s.level === APP_STATE.globalLevel);
      const list = pool.length > 0 ? pool : SPEECH_LAB_SENTENCES;
      return list[SPEECH_LAB_STATE.currentIndex % list.length];
    }

    function practiceDialogueLineInSpeechLab(simp, trad, pinyin, vi) {
      SPEECH_LAB_STATE.customItem = {
        id: 'CUSTOM_LINE',
        level: APP_STATE.globalLevel,
        tag: 'Trích từ Hội thoại Bài học đang chọn',
        simp: simp,
        trad: trad || simp,
        pinyin: pinyin,
        vi: vi,
        tip: 'Hãy bấm 🔊 Nghe mẫu trước 1 lần để nắm ngữ điệu, sau đó bấm 🎙️ Bắt đầu thu âm để đọc theo.'
      };
      SPEECH_LAB_STATE.recognizedText = '';
      SPEECH_LAB_STATE.lastAccuracy = null;
      switchMainTab('arena');
      switchArenaMode('speech');
      showToast('🎙️ Đã nạp câu hội thoại vào Phòng Luyện Nói AI!', 'success');
    }

    function selectSpeechSentence(idx) {
      SPEECH_LAB_STATE.customItem = null;
      SPEECH_LAB_STATE.currentIndex = idx;
      SPEECH_LAB_STATE.recognizedText = '';
      SPEECH_LAB_STATE.lastAccuracy = null;
      renderSpeechLab();
    }

    function normalizeChineseChars(str) {
      return (str || '').replace(/[，。！？、；：“”‘’（）《》\s,.!?;:"'()\-]/g, '');
    }

    function evaluateSpokenTranscript(transcriptStr) {
      SPEECH_LAB_STATE.recognizedText = (transcriptStr || '').trim();
      const item = getActiveSpeechItem();
      const targetStr = hz(item.simp, item.trad);
      const cleanTarget = normalizeChineseChars(targetStr);
      const cleanSpoken = normalizeChineseChars(SPEECH_LAB_STATE.recognizedText);

      if (!cleanSpoken) {
        SPEECH_LAB_STATE.lastAccuracy = 0;
        renderSpeechLab();
        return;
      }

      let matchedCount = 0;
      for (const ch of cleanTarget) {
        if (cleanSpoken.includes(ch)) matchedCount++;
      }
      const acc = cleanTarget.length > 0 ? Math.min(100, Math.round((matchedCount / cleanTarget.length) * 100)) : 0;
      SPEECH_LAB_STATE.lastAccuracy = acc;

      if (acc >= 75) {
        APP_STATE.skillsScore.phonetics = Math.min(100, APP_STATE.skillsScore.phonetics + 2);
        addXp(20, `Phát âm chuẩn ${acc}% câu tiếng Trung!`);
      } else if (acc >= 40) {
        addXp(10, `Hoàn thành lượt luyện phát âm (${acc}%)`);
      }
      renderSpeechLab();
    }

    function setSpeechPauseTolerance(mode) {
      SPEECH_LAB_STATE.pauseToleranceMode = mode;
      showToast(
        mode === 'MANUAL_ONLY'
          ? '✋ Đã bật chế độ Thủ công: Micro sẽ thu âm liên tục cho tới khi bạn bấm Dừng!'
          : `⏳ Đã bật chế độ Chờ lấy hơi (${mode === 'PAUSE_4S' ? '4 giây' : '2.5 giây'}): Bạn thoải mái ngắt nghỉ giữa câu!`,
        'info'
      );
    }

    function clearSpeechSilenceTimer() {
      if (SPEECH_LAB_STATE.silenceTimer) {
        clearTimeout(SPEECH_LAB_STATE.silenceTimer);
        SPEECH_LAB_STATE.silenceTimer = null;
      }
    }

    function stopAndFinalizeMicrophone() {
      SPEECH_LAB_STATE.userRequestedStop = true;
      SPEECH_LAB_STATE.isRecording = false;
      clearSpeechSilenceTimer();
      if (SPEECH_LAB_STATE.recognitionInstance) {
        try { SPEECH_LAB_STATE.recognitionInstance.stop(); } catch (e) {}
      }
      const finalCombined = (SPEECH_LAB_STATE.accumulatedFinalText + SPEECH_LAB_STATE.interimSessionText).trim() || SPEECH_LAB_STATE.recognizedText;
      if (finalCombined) {
        evaluateSpokenTranscript(finalCombined);
      } else {
        renderSpeechLab();
      }
    }

    function scheduleSpeechAutoStopCheck() {
      clearSpeechSilenceTimer();
      if (SPEECH_LAB_STATE.pauseToleranceMode === 'MANUAL_ONLY') {
        return; // Never auto-stop; wait until user clicks Stop & Grade
      }
      const waitMs = SPEECH_LAB_STATE.pauseToleranceMode === 'PAUSE_2S' ? 2500 : 4200;
      SPEECH_LAB_STATE.silenceTimer = setTimeout(() => {
        if (SPEECH_LAB_STATE.isRecording) {
          stopAndFinalizeMicrophone();
        }
      }, waitMs);
    }

    function toggleMicrophoneRecording() {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SPEECH_LAB_STATE.isRecording) {
        stopAndFinalizeMicrophone();
        return;
      }

      if (!SpeechRec) {
        showToast('⚠️ Trình duyệt hiện tại chưa bật Web Speech API. Bạn có thể bấm nút "Test Đọc Chuẩn" hoặc dùng Voice Typing bàn phím để chấm điểm!', 'warn');
        return;
      }

      // Reset buffers for a fresh continuous recording session
      SPEECH_LAB_STATE.userRequestedStop = false;
      SPEECH_LAB_STATE.accumulatedFinalText = '';
      SPEECH_LAB_STATE.interimSessionText = '';
      SPEECH_LAB_STATE.recognizedText = '';
      SPEECH_LAB_STATE.lastAccuracy = null;

      try {
        const rec = new SpeechRec();
        rec.lang = APP_STATE.scriptMode === 'trad' ? 'zh-TW' : 'zh-CN';
        rec.continuous = true;       // Keep recording across breathing pauses!
        rec.interimResults = true;   // Stream live characters without cutting off

        rec.onstart = function () {
          SPEECH_LAB_STATE.isRecording = true;
          renderSpeechLab();
          scheduleSpeechAutoStopCheck();
          showToast('🎙️ Đang thu âm liên tục... Bạn cứ đọc thoải mái, ngắt hơi giữa câu sẽ KHÔNG bị ngắt!', 'info');
        };

        rec.onresult = function (event) {
          let sessionFinal = '';
          let sessionInterim = '';
          for (let i = 0; i < event.results.length; i++) {
            const seg = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              sessionFinal += seg;
            } else {
              sessionInterim += seg;
            }
          }
          SPEECH_LAB_STATE.interimSessionText = sessionFinal + sessionInterim;
          const combined = (SPEECH_LAB_STATE.accumulatedFinalText + SPEECH_LAB_STATE.interimSessionText).trim();
          SPEECH_LAB_STATE.recognizedText = combined;

          // Update live input box & live preview without re-creating the whole DOM or stopping mic
          const inputEl = document.getElementById('speech-manual-input');
          if (inputEl) inputEl.value = combined;
          const liveBadge = document.getElementById('speech-live-stream-preview');
          if (liveBadge) {
            liveBadge.textContent = combined || 'Đang lắng nghe giọng của bạn...';
          }

          // Reset the silence debounce timer every time user speaks a syllable
          scheduleSpeechAutoStopCheck();
        };

        rec.onerror = function (event) {
          if (event && event.error === 'no-speech' && SPEECH_LAB_STATE.isRecording && !SPEECH_LAB_STATE.userRequestedStop) {
            // Do not abort if user is taking a breath!
            return;
          }
          SPEECH_LAB_STATE.isRecording = false;
          SPEECH_LAB_STATE.userRequestedStop = true;
          clearSpeechSilenceTimer();
          renderSpeechLab();
          showToast('💡 Khung xem trước chặn quyền Micro hoặc chưa nhận giọng. Hãy bấm nút "Test Đọc Chuẩn" hoặc mở trên web Vercel/Netlify của bạn để thu âm trực tiếp!', 'warn');
        };

        rec.onend = function () {
          // If browser ended the speech session during a breath pause while still recording, seamlessly restart and keep accumulated text!
          if (SPEECH_LAB_STATE.isRecording && !SPEECH_LAB_STATE.userRequestedStop) {
            SPEECH_LAB_STATE.accumulatedFinalText += SPEECH_LAB_STATE.interimSessionText;
            SPEECH_LAB_STATE.interimSessionText = '';
            try {
              rec.start();
              return;
            } catch (restartErr) {}
          }
          if (SPEECH_LAB_STATE.isRecording) {
            stopAndFinalizeMicrophone();
          }
        };

        SPEECH_LAB_STATE.recognitionInstance = rec;
        rec.start();
      } catch (err) {
        SPEECH_LAB_STATE.isRecording = false;
        renderSpeechLab();
        showToast('⚠️ Không thể khởi tạo Micro trong khung sandbox. Hãy thử nút Test Đọc Chuẩn bên dưới!', 'warn');
      }
    }

    function simulateSpeechDemo(mode) {
      const item = getActiveSpeechItem();
      const targetStr = hz(item.simp, item.trad);
      if (mode === 'perfect') {
        evaluateSpokenTranscript(targetStr);
      } else {
        const chars = targetStr.split('');
        if (chars.length > 3) chars[2] = '的';
        if (chars.length > 6) chars[5] = '十';
        evaluateSpokenTranscript(chars.join(''));
      }
    }

    function renderSpeechLab() {
      const box = document.getElementById('subpanel-arena-speech');
      if (!box) return;
      const pool = SPEECH_LAB_SENTENCES.filter(s => APP_STATE.globalLevel === 'ALL' || s.level === APP_STATE.globalLevel);
      const list = pool.length > 0 ? pool : SPEECH_LAB_SENTENCES;
      const item = getActiveSpeechItem();
      const targetStr = hz(item.simp, item.trad);
      const cleanSpoken = normalizeChineseChars(SPEECH_LAB_STATE.recognizedText);

      const charDiffHtml = targetStr.split('').map(ch => {
        const isPunct = /[，。！？、；：“”‘’（）《》\s,.!?;:"'()\-]/.test(ch);
        if (isPunct) {
          return `<span class="text-2xl sm:text-3xl font-bold text-stone-400 px-0.5">${ch}</span>`;
        }
        if (SPEECH_LAB_STATE.lastAccuracy === null) {
          return `<span class="px-2 py-1 rounded-xl bg-stone-100 border border-stone-200 text-2xl sm:text-3xl font-bold hanzi-font text-stone-900">${ch}</span>`;
        }
        const isHit = cleanSpoken.includes(ch);
        return isHit
          ? `<span class="px-2 py-1 rounded-xl bg-emerald-100 border-2 border-emerald-500 text-2xl sm:text-3xl font-bold hanzi-font text-emerald-900 shadow-sm" title="Phát âm chuẩn xác ✓">${ch}<span class="block text-[10px] text-center font-extrabold text-emerald-700">✓ Đúng</span></span>`
          : `<span class="px-2 py-1 rounded-xl bg-rose-100 border-2 border-rose-500 text-2xl sm:text-3xl font-bold hanzi-font text-rose-900 shadow-sm" title="Cần phát âm rõ hơn ✗">${ch}<span class="block text-[10px] text-center font-extrabold text-rose-700">✗ Lệch</span></span>`;
      }).join('');

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-700">🎙️ Phòng Luyện Nói & Chấm Điểm Phát Âm Qua Micro (Web Speech API)</span>
            <p class="text-xs text-stone-500">Đọc câu mẫu vào Micro để hệ thống nhận diện giọng nói và tô màu <strong class="text-emerald-700">Xanh (Đúng)</strong> / <strong class="text-rose-700">Đỏ (Lệch âm)</strong> từng chữ Hán</p>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${list.map((s, idx) => `
              <button type="button" onclick="selectSpeechSentence(${idx})" class="px-2.5 py-1 rounded-lg text-xs font-bold border transition ${(!SPEECH_LAB_STATE.customItem && (SPEECH_LAB_STATE.currentIndex % list.length) === idx) ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}">
                Mẫu ${idx + 1}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Target Sentence Card -->
        <div class="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">${item.tag}</span>
            <button type="button" onclick="speakChinese('${targetStr.replace(/'/g, '')}')" class="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm">
              🔊 Nghe Giọng Mẫu Chuẩn
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-1.5 py-2">${charDiffHtml}</div>

          <div class="space-y-1 border-t border-stone-200/80 pt-2.5">
            ${APP_STATE.showPinyin ? `<div class="text-sm sm:text-base font-bold text-emerald-700">${item.pinyin}</div>` : ''}
            ${APP_STATE.showMeaning ? `<div class="text-xs sm:text-sm text-stone-700 font-medium">Nghĩa: "${item.vi}"</div>` : ''}
            <div class="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-1">
              <strong>💡 Bí quyết phát âm câu này:</strong> ${item.tip}
            </div>
          </div>
        </div>

        <!-- Continuous Recording Mode & Breath Pause Tolerance Config -->
        <div class="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2">
            <span class="font-bold text-emerald-950">🫁 Chế độ chống ngắt quãng khi lấy hơi giữa câu:</span>
            <span class="text-emerald-800 hidden md:inline">(Cộng dồn toàn bộ chữ bạn đọc cho đến khi hết câu)</span>
          </div>
          <select id="select-speech-pause-mode" onchange="setSpeechPauseTolerance(this.value)" aria-label="Chọn thời gian chờ ngắt hơi" class="bg-white border border-emerald-300 text-stone-800 font-bold rounded-lg px-2.5 py-1.5 text-xs">
            <option value="PAUSE_4S" ${SPEECH_LAB_STATE.pauseToleranceMode === 'PAUSE_4S' ? 'selected' : ''}>⏳ Chờ 4.2 giây im lặng mới tự chấm (Khuyên dùng)</option>
            <option value="MANUAL_ONLY" ${SPEECH_LAB_STATE.pauseToleranceMode === 'MANUAL_ONLY' ? 'selected' : ''}>✋ Không tự ngắt — Chỉ chấm khi bấm nút Dừng</option>
            <option value="PAUSE_2S" ${SPEECH_LAB_STATE.pauseToleranceMode === 'PAUSE_2S' ? 'selected' : ''}>⚡ Chờ 2.5 giây im lặng (Đọc nhanh)</option>
          </select>
        </div>

        ${SPEECH_LAB_STATE.isRecording ? `
          <div class="p-3.5 rounded-xl bg-stone-900 text-white border-2 border-rose-500 flex items-center justify-between gap-3">
            <div class="space-y-0.5">
              <div class="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>Micro đang thu âm liên tục (Ngắt hơi thoải mái)...</span>
              </div>
              <div id="speech-live-stream-preview" class="text-base sm:text-lg font-bold hanzi-font text-amber-300">${SPEECH_LAB_STATE.recognizedText || 'Hãy bắt đầu đọc câu tiếng Trung...'}</div>
            </div>
            <button type="button" onclick="stopAndFinalizeMicrophone()" class="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-extrabold shrink-0 shadow">
              ✅ Đọc Xong & Chấm Điểm
            </button>
          </div>
        ` : ''}

        <!-- Microphone Control & Simulation Bar -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div class="lg:col-span-5 flex flex-wrap items-center gap-2">
            <button type="button" onclick="toggleMicrophoneRecording()" class="flex-1 py-3 px-4 rounded-2xl font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 ${SPEECH_LAB_STATE.isRecording ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse' : 'bg-vermilion-600 hover:bg-vermilion-700 text-white'}">
              <span>${SPEECH_LAB_STATE.isRecording ? '⏹️ Đọc Xong — Bấm Để Chấm Điểm' : '🎙️ Bấm Để Đọc Bằng Micro'}</span>
            </button>
            <button type="button" onclick="simulateSpeechDemo('perfect')" class="px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold" title="Thử nghiệm chấm điểm khi đọc chuẩn 100%">
              ✨ Test Đọc Chuẩn
            </button>
            <button type="button" onclick="simulateSpeechDemo('partial')" class="px-3 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold" title="Thử nghiệm phát hiện chữ đọc sai">
              🔍 Test Lệch Âm
            </button>
          </div>

          <div class="lg:col-span-7 flex items-center gap-2">
            <input id="speech-manual-input" type="text" value="${SPEECH_LAB_STATE.recognizedText}" placeholder="Kết quả Micro nhận diện sẽ hiện ở đây (hoặc dùng Voice Typing trên bàn phím để nhập)..." class="flex-1 px-3.5 py-2.5 text-xs sm:text-sm hanzi-font bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-vermilion-600" />
            <button type="button" onclick="evaluateSpokenTranscript(document.getElementById('speech-manual-input').value)" class="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shrink-0">
              Chấm Điểm
            </button>
          </div>
        </div>

        ${SPEECH_LAB_STATE.lastAccuracy !== null ? `
          <div class="p-4 rounded-2xl border ${SPEECH_LAB_STATE.lastAccuracy >= 80 ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'} flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="space-y-1 text-xs sm:text-sm">
              <div class="font-extrabold text-base">
                Điểm phát âm của bạn: <span class="${SPEECH_LAB_STATE.lastAccuracy >= 80 ? 'text-emerald-700' : 'text-vermilion-700'}">${SPEECH_LAB_STATE.lastAccuracy}%</span>
                ${SPEECH_LAB_STATE.lastAccuracy >= 85 ? '🌟 Xuất sắc như người bản xứ!' : '💪 Hãy chú ý các chữ tô màu Đỏ (✗ Lệch) và thử đọc lại nhé!'}
              </div>
              <div>Giọng thu nhận được: <strong class="hanzi-font text-sm">"${SPEECH_LAB_STATE.recognizedText || '(Chưa nghe rõ)'}"</strong></div>
            </div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-white border border-stone-200 self-start sm:self-auto">+20 XP Kỹ năng Ngữ âm</span>
          </div>
        ` : ''}
      `;
    }

    // --- 11B.2: SMART READER WITH INSTANT WORD HOVER/TAP POPUP ---
    const SMART_READER_PASSAGES = [
      {
        id: 'SR01',
        level: 'LVL1',
        category: 'Đời sống • HSK 1–2',
        title: 'Buổi Sáng Cuối Tuần Ở Bắc Kinh (周末的北京早晨)',
        viTranslation: 'Hôm nay là Chủ nhật, thời tiết Bắc Kinh nắng đẹp. Buổi sáng tôi cùng bạn học đi công viên tập thái cực quyền, sau đó uống một tách trà nóng và ăn sủi cảo.',
        question: 'Sau khi tập thái cực quyền ở công viên, nhân vật trong bài đã làm gì?',
        options: ['Đi siêu thị mua quần áo', 'Uống trà nóng và ăn sủi cảo', 'Về ký túc xá ngủ'],
        answer: 1,
        tokens: [
          { s: '今天', t: '今天', py: 'jīntiān', hv: 'KIM THIÊN', pos: 'Danh từ', m: 'Hôm nay' },
          { s: '是', t: '是', py: 'shì', hv: 'THỊ', pos: 'Động từ', m: 'Là, chính là' },
          { s: '星期天', t: '星期天', py: 'xīngqītiān', hv: 'TINH KỲ THIÊN', pos: 'Danh từ', m: 'Chủ nhật' },
          { p: '，' },
          { s: '北京', t: '北京', py: 'Běijīng', hv: 'BẮC KINH', pos: 'Địa danh', m: 'Thủ đô Bắc Kinh' },
          { s: '是', t: '是', py: 'shì', hv: 'THỊ', pos: 'Động từ', m: 'Là' },
          { s: '晴天', t: '晴天', py: 'qíngtiān', hv: 'TÌNH THIÊN', pos: 'Danh từ', m: 'Trời nắng đẹp' },
          { p: '。' },
          { s: '早上', t: '早上', py: 'zǎoshang', hv: 'TẢO THƯỢNG', pos: 'Danh từ', m: 'Buổi sáng sớm' },
          { s: '我', t: '我', py: 'wǒ', hv: 'NGÃ', pos: 'Đại từ', m: 'Tôi, mình' },
          { s: '和', t: '和', py: 'hé', hv: 'HÒA', pos: 'Liên từ', m: 'Và, cùng với' },
          { s: '同学', t: '同學', py: 'tóngxué', hv: 'ĐỒNG HỌC', pos: 'Danh từ', m: 'Bạn cùng lớp' },
          { s: '去', t: '去', py: 'qù', hv: 'KHỨ', pos: 'Động từ', m: 'Đi đến' },
          { s: '公园', t: '公園', py: 'gōngyuán', hv: 'CÔNG VIÊN', pos: 'Danh từ', m: 'Công viên' },
          { s: '打太极拳', t: '打太極拳', py: 'dǎ tàijíquán', hv: 'ĐẢ THÁI CỰC QUYỀN', pos: 'Cụm ĐT', m: 'Tập Thái cực quyền' },
          { p: '，' },
          { s: '然后', t: '然後', py: 'ránhòu', hv: 'NHIÊN HẬU', pos: 'Liên từ', m: 'Sau đó, tiếp theo' },
          { s: '喝', t: '喝', py: 'hē', hv: 'HÁT', pos: 'Động từ', m: 'Uống' },
          { s: '一杯', t: '一杯', py: 'yì bēi', hv: 'NHẤT BÔI', pos: 'Số-Lượng', m: 'Một cốc / một tách' },
          { s: '热茶', t: '熱茶', py: 'rèchá', hv: 'NHIỆT TRÀ', pos: 'Danh từ', m: 'Trà nóng' },
          { p: '、' },
          { s: '吃饺子', t: '吃餃子', py: 'chī jiǎozi', hv: 'NGẬT GIAO TỬ', pos: 'Cụm ĐT', m: 'Ăn bánh sủi cảo' },
          { p: '。' }
        ]
      },
      {
        id: 'SR02',
        level: 'LVL2',
        category: 'Công sở & Đời sống • HSK 3–4',
        title: 'Thích Nghi Với Nhịp Sống Mới (适应新城市的生活节奏)',
        viTranslation: 'Tháng trước tôi vừa chuyển đến Thượng Hải làm việc. Ban đầu tôi cảm thấy nhịp sống ở đây quá nhanh, nhưng nhờ đồng nghiệp nhiệt tình giúp đỡ, tôi đã nhanh chóng thích nghi và đem công việc sắp xếp ngăn nắp.',
        question: 'Nhờ đâu mà tác giả nhanh chóng thích nghi với cuộc sống ở Thượng Hải?',
        options: ['Nhờ đã sống ở đó từ nhỏ', 'Nhờ các đồng nghiệp nhiệt tình giúp đỡ', 'Nhờ công việc rất nhàn rỗi'],
        answer: 1,
        tokens: [
          { s: '上个月', t: '上個月', py: 'shàng gè yuè', hv: 'THƯỢNG CÁ NGUYỆT', pos: 'Thời gian', m: 'Tháng trước' },
          { s: '我', t: '我', py: 'wǒ', hv: 'NGÃ', pos: 'Đại từ', m: 'Tôi' },
          { s: '刚', t: '剛', py: 'gāng', hv: 'CƯƠNG', pos: 'Phó từ', m: 'Vừa mới (đứng trước động từ)' },
          { s: '搬到', t: '搬到', py: 'bāndào', hv: 'BAN ĐÁO', pos: 'Động-Bổ', m: 'Chuyển nhà đến' },
          { s: '上海', t: '上海', py: 'Shànghǎi', hv: 'THƯỢNG HẢI', pos: 'Địa danh', m: 'Thành phố Thượng Hải' },
          { s: '工作', t: '工作', py: 'gōngzuò', hv: 'CÔNG TÁC', pos: 'Động/Danh', m: 'Làm việc / Công việc' },
          { p: '。' },
          { s: '起初', t: '起初', py: 'qǐchū', hv: 'KHỞI SƠ', pos: 'Danh từ', m: 'Ban đầu, lúc mới đầu' },
          { s: '觉得', t: '覺得', py: 'juéde', hv: 'GIÁC ĐẮC', pos: 'Động từ', m: 'Cảm thấy, cho rằng' },
          { s: '这里', t: '這裡', py: 'zhèlǐ', hv: 'GIÁ LÝ', pos: 'Đại từ', m: 'Ở đây, nơi này' },
          { s: '的', t: '的', py: 'de', hv: 'ĐÍCH', pos: 'Trợ từ', m: 'Của (trợ từ định ngữ)' },
          { s: '节奏', t: '節奏', py: 'jiézòu', hv: 'TIẾT TẤU', pos: 'Danh từ', m: 'Nhịp độ, tiết tấu' },
          { s: '太快', t: '太快', py: 'tài kuài', hv: 'THÁI KHOÁI', pos: 'Cụm TT', m: 'Quá nhanh' },
          { p: '，' },
          { s: '但', t: '但', py: 'dàn', hv: 'ĐẢN', pos: 'Liên từ', m: 'Nhưng mà' },
          { s: '多亏', t: '多虧', py: 'duōkuī', hv: 'ĐA KHUY', pos: 'Động/Phó', m: 'Nhờ có, may mà có' },
          { s: '同事们', t: '同事們', py: 'tóngshìmen', hv: 'ĐỒNG SỰ MÔN', pos: 'Danh từ', m: 'Các đồng nghiệp' },
          { s: '热情帮助', t: '熱情幫助', py: 'rèqíng bāngzhù', hv: 'NHIỆT TÌNH BANG TRỢ', pos: 'Cụm ĐT', m: 'Giúp đỡ nhiệt tình' },
          { p: '，' },
          { s: '我', t: '我', py: 'wǒ', hv: 'NGÃ', pos: 'Đại từ', m: 'Tôi' },
          { s: '很快', t: '很快', py: 'hěn kuài', hv: 'NGẬN KHOÁI', pos: 'Trạng ngữ', m: 'Rất nhanh chóng' },
          { s: '适应', t: '適應', py: 'shìyìng', hv: 'THÍCH ỨNG', pos: 'Động từ', m: 'Thích nghi, làm quen' },
          { s: '并', t: '並', py: 'bìng', hv: 'TỊNH', pos: 'Liên từ', m: 'Đồng thời, và' },
          { s: '把', t: '把', py: 'bǎ', hv: 'BẢ', pos: 'Giới từ', m: 'Đem/Lấy (Giới từ câu xử trí)' },
          { s: '任务', t: '任務', py: 'rènwu', hv: 'NHIỆM VỤ', pos: 'Danh từ', m: 'Nhiệm vụ, công việc' },
          { s: '整理', t: '整理', py: 'zhěnglǐ', hv: 'CHỈNH LÝ', pos: 'Động từ', m: 'Sắp xếp gọn gàng' },
          { s: '好', t: '好', py: 'hǎo', hv: 'HẢO', pos: 'Bổ ngữ', m: 'Xong xuôi, hoàn tất' },
          { s: '了', t: '了', py: 'le', hv: 'LIỄU', pos: 'Trợ từ', m: 'Rồi (đánh dấu hoàn thành)' },
          { p: '。' }
        ]
      },
      {
        id: 'SR03',
        level: 'BIZ',
        category: 'Thương Mại & Công Nghệ • B2B / HSK 5–6',
        title: 'Xu Hướng Thương Mại Điện Tử Xuyên Biên Giới & AI (跨境电商与人工智能赋能)',
        viTranslation: 'Xét thấy chuỗi cung ứng toàn cầu đang điều chỉnh, nhiều doanh nghiệp ngoại thương dốc sức ứng dụng mô hình AI lớn để tối ưu hóa dịch vụ khách hàng, từ đó nâng cao hiệu suất và tránh cạnh tranh giá cả bào mòn (nội quyển).',
        question: 'Các doanh nghiệp trong bài ứng dụng AI nhằm đạt kết quả gì?',
        options: ['Để cắt giảm toàn bộ sản phẩm xuất khẩu', 'Tối ưu dịch vụ khách hàng, nâng cao hiệu suất và tránh cạnh tranh nội quyển', 'Để tăng giá bán gấp đôi'],
        answer: 1,
        tokens: [
          { s: '鉴于', t: '鑑於', py: 'jiànyú', hv: 'GIÁM Ư', pos: 'Giới từ', m: 'Xét thấy, căn cứ vào (văn viết trang trọng)' },
          { s: '全球', t: '全球', py: 'quánqiú', hv: 'TOÀN CẦU', pos: 'Danh từ', m: 'Toàn cầu, thế giới' },
          { s: '供应链', t: '供應鏈', py: 'gōngyìngliàn', hv: 'CUNG ỨNG LIÊN', pos: 'Kinh tế', m: 'Chuỗi cung ứng (Supply chain)' },
          { s: '持续调整', t: '持續調整', py: 'chíxù tiáozhěng', hv: 'TRÌ TỤC ĐIỀU CHỈNH', pos: 'Cụm ĐT', m: 'Liên tục điều chỉnh' },
          { p: '，' },
          { s: '许多', t: '許多', py: 'xǔduō', hv: 'HỨA ĐA', pos: 'Số từ', m: 'Rất nhiều' },
          { s: '外贸企业', t: '外貿企業', py: 'wàimào qǐyè', hv: 'NGOẠI MẬU XÍ NGHIỆP', pos: 'Danh từ', m: 'Doanh nghiệp ngoại thương / XNK' },
          { s: '致力于', t: '致力於', py: 'zhìlì yú', hv: 'CHÍ LỰC Ư', pos: 'Động từ', m: 'Dốc sức vào, chuyên tâm vào' },
          { s: '利用', t: '利用', py: 'lìyòng', hv: 'LỢI DỤNG', pos: 'Động từ', m: 'Tận dụng, ứng dụng' },
          { s: '大语言模型', t: '大語言模型', py: 'dà yǔyán móxíng', hv: 'ĐẠI NGỮ NGÔN MÔ HÌNH', pos: 'Công nghệ', m: 'Mô hình ngôn ngữ lớn (LLM / AI)' },
          { s: '优化', t: '優化', py: 'yōuhuà', hv: 'ƯU HÓA', pos: 'Động từ', m: 'Tối ưu hóa' },
          { s: '客户服务', t: '客戶服務', py: 'kèhù fúwù', hv: 'KHÁCH HỘ PHỤC VỤ', pos: 'Danh từ', m: 'Dịch vụ chăm sóc khách hàng' },
          { p: '，' },
          { s: '从而', t: '從而', py: 'cóng’ér', hv: 'TÙNG NHI', pos: 'Liên từ', m: 'Từ đó, nhờ vậy mà (dẫn tới kết quả)' },
          { s: '提高', t: '提高', py: 'tígāo', hv: 'ĐỀ CAO', pos: 'Động từ', m: 'Nâng cao, gia tăng' },
          { s: '效率', t: '效率', py: 'xiàolǜ', hv: 'HIỆU SUẤT', pos: 'Danh từ', m: 'Hiệu suất làm việc' },
          { s: '并', t: '並', py: 'bìng', hv: 'TỊNH', pos: 'Liên từ', m: 'Đồng thời, và' },
          { s: '避免', t: '避免', py: 'bìmiǎn', hv: 'TỊ MIỄN', pos: 'Động từ', m: 'Tránh khỏi, ngăn ngừa' },
          { s: '盲目', t: '盲目', py: 'mángmù', hv: 'MANH MỤC', pos: 'Tính từ', m: 'Mù quáng, thiếu định hướng' },
          { s: '内卷', t: '內卷', py: 'nèijuǎn', hv: 'NỘI QUYỂN', pos: 'Slang/KT', m: 'Cạnh tranh bào mòn kiệt sức' },
          { p: '。' }
        ]
      },
      {
        id: 'SR04',
        level: 'LVL4',
        category: 'Cổ Văn & Triết Lý Quản Trị • HSK 7–9',
        title: 'Đạo Quản Trị: Biết Người Biết Ta & Lo Liệu Từ Sớm (知己知彼与未雨绸缪)',
        viTranslation: 'Cổ nhân có câu: "Biết người biết ta, trăm trận không nguy." Trên thương trường biến đổi khôn lường, người lãnh đạo chỉ có quan sát kỹ thời thế và chuẩn bị phòng ngừa từ sớm mới có thể giữ doanh nghiệp phát triển lâu dài.',
        question: 'Thành ngữ "未雨绸缪 (Vị vũ trù mưu)" trong bài khuyên người lãnh đạo điều gì?',
        options: ['Đợi khi khủng hoảng xảy ra mới xử lý', 'Chủ động chuẩn bị và phòng ngừa rủi ro từ trước khi nó xảy đến', 'Chỉ tập trung vào lợi nhuận ngắn hạn'],
        answer: 1,
        tokens: [
          { s: '古人云', t: '古人云', py: 'gǔrén yún', hv: 'CỔ NHÂN VÂN', pos: 'Cổ văn', m: 'Người xưa có nói rằng' },
          { p: '：“' },
          { s: '知己知彼', t: '知己知彼', py: 'zhījǐ-zhībǐ', hv: 'TRI KỶ TRI BỈ', pos: 'Thành ngữ', m: 'Biết mình biết người' },
          { p: '，' },
          { s: '百战不殆', t: '百戰不殆', py: 'bǎizhàn-búdài', hv: 'BÁCH CHIẾN BẤT ĐÃI', pos: 'Thành ngữ', m: 'Trăm trận không nguy hiểm/thất bại' },
          { p: '。”' },
          { s: '在', t: '在', py: 'zài', hv: 'TẠI', pos: 'Giới từ', m: 'Ở trong, tại' },
          { s: '瞬息万变', t: '瞬息萬變', py: 'shùnxī-wànbiàn', hv: 'THUẤN TỨC VẠN BIẾN', pos: 'Thành ngữ', m: 'Biến đổi vạn lần trong chớp mắt' },
          { s: '的', t: '的', py: 'de', hv: 'ĐÍCH', pos: 'Trợ từ', m: 'Của' },
          { s: '商场', t: '商場', py: 'shāngchǎng', hv: 'THƯƠNG TRƯỜNG', pos: 'Danh từ', m: 'Thương trường' },
          { s: '中', t: '中', py: 'zhōng', hv: 'TRUNG', pos: 'Phương vị', m: 'Bên trong' },
          { p: '，' },
          { s: '唯有', t: '唯有', py: 'wéiyǒu', hv: 'DUY HỮU', pos: 'Liên từ', m: 'Chỉ có (văn ngôn trang trọng)' },
          { s: '审时度势', t: '審時度勢', py: 'shěnshí-duóshì', hv: 'THẨM THỜI ĐOẠC THẾ', pos: 'Thành ngữ', m: 'Quan sát thời cuộc, đánh giá đúng xu thế' },
          { p: '、' },
          { s: '未雨绸缪', t: '未雨綢繆', py: 'wèiyǔ-chóumóu', hv: 'VỊ VŨ TRÙ MƯU', pos: 'Thành ngữ', m: 'Lo liệu phòng ngừa rủi ro từ sớm' },
          { p: '，' },
          { s: '方能', t: '方能', py: 'fāng néng', hv: 'PHƯƠNG NĂNG', pos: 'Phó từ', m: 'Thì mới có thể' },
          { s: '实现', t: '實現', py: 'shíxiàn', hv: 'THỰC HIỆN', pos: 'Động từ', m: 'Thực hiện, đạt được' },
          { s: '长远发展', t: '長遠發展', py: 'chángyuǎn fāzhǎn', hv: 'TRƯỜNG VIỄN PHÁT TRIỂN', pos: 'Cụm DT', m: 'Sự phát triển bền vững lâu dài' },
          { p: '。' }
        ]
      }
    ];

    const SMART_READER_STATE = {
      passageIndex: 0,
      activeTokenIndex: 0,
      showInlinePinyin: false,
      showFullTranslation: false
    };

    function selectReaderPassage(idx) {
      SMART_READER_STATE.passageIndex = idx;
      SMART_READER_STATE.activeTokenIndex = 0;
      renderSmartReader();
    }

    function inspectReaderToken(tokenIdx) {
      SMART_READER_STATE.activeTokenIndex = tokenIdx;
      renderSmartReaderInspectorOnly();
    }

    function toggleReaderInlinePinyin() {
      SMART_READER_STATE.showInlinePinyin = !SMART_READER_STATE.showInlinePinyin;
      renderSmartReader();
    }

    function toggleReaderFullTranslation() {
      SMART_READER_STATE.showFullTranslation = !SMART_READER_STATE.showFullTranslation;
      renderSmartReader();
    }

    function saveCurrentReaderTokenToNotebook() {
      const passage = SMART_READER_PASSAGES[SMART_READER_STATE.passageIndex % SMART_READER_PASSAGES.length];
      const tok = passage.tokens[SMART_READER_STATE.activeTokenIndex] || passage.tokens[0];
      if (!tok || tok.p) return;

      let existing = VOCAB_VAULT_DATA.find(v => v.simp === tok.s);
      if (!existing) {
        const newId = 'V_SR_' + Date.now();
        existing = {
          id: newId,
          level: APP_STATE.globalLevel === 'ALL' ? 'LVL2' : APP_STATE.globalLevel,
          domain: 'DAILY',
          simp: tok.s,
          trad: tok.t || tok.s,
          pinyin: tok.py,
          hanviet: tok.hv,
          pos: tok.pos,
          meaning: tok.m,
          collocations: tok.s,
          exSimp: tok.s,
          exTrad: tok.t || tok.s,
          exVi: tok.m
        };
        VOCAB_VAULT_DATA.unshift(existing);
      }
      if (!APP_STATE.savedVocabIds.includes(existing.id)) {
        APP_STATE.savedVocabIds.push(existing.id);
        addXp(10, `Đã lưu từ "${hz(tok.s, tok.t)}" vào Sổ tay!`);
        renderSavedBookmarks();
      } else {
        showToast(`Từ "${hz(tok.s, tok.t)}" đã có sẵn trong Sổ tay của bạn!`, 'info');
      }
      renderSmartReaderInspectorOnly();
    }

    function renderSmartReaderInspectorOnly() {
      const card = document.getElementById('smart-reader-popup-card');
      if (!card) return;
      const passage = SMART_READER_PASSAGES[SMART_READER_STATE.passageIndex % SMART_READER_PASSAGES.length];
      const tok = passage.tokens[SMART_READER_STATE.activeTokenIndex] || passage.tokens[0];
      if (!tok || tok.p) return;

      const dispWord = hz(tok.s, tok.t);
      const isSaved = VOCAB_VAULT_DATA.some(v => v.simp === tok.s && APP_STATE.savedVocabIds.includes(v.id));

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2 border-b border-stone-700 pb-3">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">${tok.pos}</span>
            <h4 class="text-3xl sm:text-4xl font-extrabold hanzi-font text-white mt-1.5">${dispWord}</h4>
          </div>
          <div class="flex flex-col gap-1.5">
            <button type="button" onclick="speakChinese('${dispWord}')" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold shadow">
              🔊 Phát âm
            </button>
            <button type="button" onclick="saveCurrentReaderTokenToNotebook()" class="px-3 py-1.5 rounded-xl ${isSaved ? 'bg-emerald-600 text-white' : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-600'} text-xs font-bold">
              ${isSaved ? '★ Đã lưu Sổ tay' : '☆ Lưu vào Sổ tay'}
            </button>
          </div>
        </div>

        <div class="space-y-2.5 pt-1 text-xs sm:text-sm">
          <div class="flex items-center justify-between bg-stone-800 px-3 py-2 rounded-xl border border-stone-700">
            <span class="text-stone-400">Phiên âm Pinyin:</span>
            <span class="text-base font-extrabold text-emerald-400">${tok.py}</span>
          </div>
          <div class="flex items-center justify-between bg-stone-800 px-3 py-2 rounded-xl border border-stone-700">
            <span class="text-stone-400">Âm Hán Việt:</span>
            <span class="text-xs font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">${tok.hv}</span>
          </div>
          <div class="bg-stone-800 p-3 rounded-xl border border-stone-700 space-y-1">
            <div class="text-stone-400 text-xs">Nghĩa tiếng Việt trong ngữ cảnh:</div>
            <div class="text-sm sm:text-base font-bold text-white">${tok.m}</div>
          </div>
        </div>
      `;
    }

    function checkReaderQuiz(selectedIdx) {
      const passage = SMART_READER_PASSAGES[SMART_READER_STATE.passageIndex % SMART_READER_PASSAGES.length];
      const fb = document.getElementById('smart-reader-quiz-feedback');
      if (!fb) return;
      fb.classList.remove('hidden');
      if (selectedIdx === passage.answer) {
        fb.className = 'p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold';
        fb.innerHTML = '🎉 Chính xác! Bạn đã nắm rất chắc nội dung bài đọc.';
        addXp(20, `Đọc hiểu thành công bài "${passage.title}"`);
      } else {
        fb.className = 'p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-950 text-xs font-bold';
        fb.innerHTML = '💡 Chưa đúng rồi! Hãy chạm vào các từ khóa trong đoạn văn để xem nghĩa rồi chọn lại nhé.';
      }
    }

    function renderSmartReader() {
      const box = document.getElementById('subpanel-arena-reader');
      if (!box) return;
      const passage = SMART_READER_PASSAGES[SMART_READER_STATE.passageIndex % SMART_READER_PASSAGES.length];
      const fullText = passage.tokens.map(t => t.p ? t.p : hz(t.s, t.t)).join('');

      const interactiveTokensHtml = passage.tokens.map((tok, idx) => {
        if (tok.p) {
          return `<span class="text-xl sm:text-2xl font-bold text-stone-400 select-none">${tok.p}</span>`;
        }
        const disp = hz(tok.s, tok.t);
        const isSelected = idx === SMART_READER_STATE.activeTokenIndex;
        return `
          <button type="button" onmouseenter="inspectReaderToken(${idx})" onclick="inspectReaderToken(${idx})" class="inline-flex flex-col items-center px-1.5 py-1 rounded-xl transition cursor-pointer border ${isSelected ? 'bg-amber-200/90 border-vermilion-600 text-vermilion-950 shadow-sm' : 'bg-white hover:bg-amber-100/80 border-transparent hover:border-amber-300 text-stone-900'}">
            ${SMART_READER_STATE.showInlinePinyin ? `<span class="text-[10px] font-semibold text-emerald-700 leading-tight">${tok.py}</span>` : ''}
            <span class="text-xl sm:text-2xl font-bold hanzi-font leading-snug">${disp}</span>
          </button>
        `;
      }).join('');

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-amber-700">📖 Trình Đọc Thông Minh (Smart Reader — Chạm / Rê Chuột Tra Từ Tức Thì)</span>
            <p class="text-xs text-stone-500">Di chuột hoặc chạm vào <strong>bất kỳ từ nào</strong> trong bài đọc để xem ngay Pinyin, Âm Hán Việt, Nghĩa và lưu vào Sổ tay</p>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${SMART_READER_PASSAGES.map((p, idx) => `
              <button type="button" onclick="selectReaderPassage(${idx})" class="px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${(SMART_READER_STATE.passageIndex % SMART_READER_PASSAGES.length) === idx ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}">
                Bài ${idx + 1}: ${p.category.split('•')[0].trim()}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <!-- Left 7 cols: Interactive Passage -->
          <div class="lg:col-span-7 space-y-4">
            <div class="bg-amber-50/50 rounded-2xl p-4 sm:p-5 border border-amber-200/80 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-2.5">
                <div>
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-200/80 text-amber-950">${passage.category}</span>
                  <h4 class="text-base sm:text-lg font-extrabold text-stone-900 mt-1">${passage.title}</h4>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <button type="button" onclick="toggleReaderInlinePinyin()" class="px-2.5 py-1 rounded-lg text-xs font-bold border ${SMART_READER_STATE.showInlinePinyin ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-stone-700 border-stone-300'}">
                    ${SMART_READER_STATE.showInlinePinyin ? 'Ẩn Pinyin trên chữ' : 'Hiện Pinyin trên chữ'}
                  </button>
                  <button type="button" onclick="speakChinese('${fullText.replace(/'/g, '')}')" class="px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold">
                    🔊 Nghe Toàn Bài
                  </button>
                </div>
              </div>

              <div class="leading-loose flex flex-wrap items-baseline gap-y-2 py-2 select-none">
                ${interactiveTokensHtml}
              </div>

              <div class="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                <button type="button" onclick="toggleReaderFullTranslation()" class="text-xs font-bold text-vermilion-700 hover:underline">
                  ${SMART_READER_STATE.showFullTranslation ? '🙈 Ẩn bản dịch toàn bài' : '👁️ Xem bản dịch tiếng Việt toàn bài'}
                </button>
                <span class="text-[11px] text-stone-500">👆 Chạm vào từng từ để tra nghĩa</span>
              </div>
              ${SMART_READER_STATE.showFullTranslation ? `
                <div class="p-3 rounded-xl bg-white border border-amber-200 text-xs sm:text-sm text-stone-700 italic">
                  "${passage.viTranslation}"
                </div>
              ` : ''}
            </div>

            <!-- Comprehension Mini-Check -->
            <div class="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5">
              <div class="text-xs font-extrabold uppercase text-stone-500">❓ Câu hỏi kiểm tra đọc hiểu:</div>
              <div class="text-xs sm:text-sm font-bold text-stone-900">${passage.question}</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${passage.options.map((opt, oIdx) => `
                  <button type="button" onclick="checkReaderQuiz(${oIdx})" class="p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-stone-300 text-left text-xs font-semibold text-stone-800 transition">
                    ${String.fromCharCode(65 + oIdx)}. ${opt}
                  </button>
                `).join('')}
              </div>
              <div id="smart-reader-quiz-feedback" class="hidden"></div>
            </div>
          </div>

          <!-- Right 5 cols: Instant Popup Inspector Card -->
          <div class="lg:col-span-5 bg-stone-900 text-white rounded-2xl p-5 shadow-lg space-y-3 sticky top-28" id="smart-reader-popup-card"></div>
        </div>
      `;

      renderSmartReaderInspectorOnly();
    }

    // --- 11B.3: PINYIN INPUT SIMULATOR (WEB IME & TONE MARK CONVERTER) ---
    const PINYIN_IME_DICT = {
      'ni': [{ s: '你', t: '你', py: 'nǐ', m: 'Bạn' }, { s: '尼', t: '尼', py: 'ní', m: 'Ni' }],
      'hao': [{ s: '好', t: '好', py: 'hǎo', m: 'Tốt, khỏe' }, { s: '号', t: '號', py: 'hào', m: 'Số, ngày' }],
      'nihao': [{ s: '你好', t: '你好', py: 'nǐ hǎo', m: 'Xin chào' }, { s: '您好', t: '您好', py: 'nín hǎo', m: 'Xin chào (kính trọng)' }],
      'ninhao': [{ s: '您好', t: '您好', py: 'nín hǎo', m: 'Xin chào (kính trọng)' }],
      'wo': [{ s: '我', t: '我', py: 'wǒ', m: 'Tôi, mình' }, { s: '握', t: '握', py: 'wò', m: 'Nắm giữ' }],
      'women': [{ s: '我们', t: '我們', py: 'wǒmen', m: 'Chúng tôi, chúng ta' }],
      'shi': [{ s: '是', t: '是', py: 'shì', m: 'Là, vâng' }, { s: '事', t: '事', py: 'shì', m: 'Sự việc' }, { s: '时', t: '時', py: 'shí', m: 'Thời gian' }, { s: '十', t: '十', py: 'shí', m: 'Số 10' }],
      'bu': [{ s: '不', t: '不', py: 'bù', m: 'Không' }, { s: '步', t: '步', py: 'bù', m: 'Bước đi' }, { s: '部', t: '部', py: 'bù', m: 'Bộ phận' }],
      'bushi': [{ s: '不是', t: '不是', py: 'bú shì', m: 'Không phải' }],
      'mei': [{ s: '没', t: '沒', py: 'méi', m: 'Chưa, không có' }, { s: '美', t: '美', py: 'měi', m: 'Đẹp' }, { s: '每', t: '每', py: 'měi', m: 'Mỗi' }],
      'meiyou': [{ s: '没有', t: '沒有', py: 'méiyǒu', m: 'Không có, chưa' }],
      'yuenan': [{ s: '越南', t: '越南', py: 'Yuènán', m: 'Việt Nam' }, { s: '越南语', t: '越南語', py: 'Yuènányǔ', m: 'Tiếng Việt' }],
      'zhongguo': [{ s: '中国', t: '中國', py: 'Zhōngguó', m: 'Trung Quốc' }],
      'hanyu': [{ s: '汉语', t: '漢語', py: 'Hànyǔ', m: 'Tiếng Hán / Tiếng Trung' }],
      'zhongwen': [{ s: '中文', t: '中文', py: 'Zhōngwén', m: 'Tiếng Trung' }],
      'xuexi': [{ s: '学习', t: '學習', py: 'xuéxí', m: 'Học tập' }],
      'xuesheng': [{ s: '学生', t: '學生', py: 'xuésheng', m: 'Học sinh, sinh viên' }],
      'liuxuesheng': [{ s: '留学生', t: '留學生', py: 'liúxuéshēng', m: 'Du học sinh' }],
      'laoshi': [{ s: '老师', t: '老師', py: 'lǎoshī', m: 'Giáo viên, thầy cô' }],
      'xiexie': [{ s: '谢谢', t: '謝謝', py: 'xièxie', m: 'Cảm ơn' }],
      'bukeqi': [{ s: '不客气', t: '不客氣', py: 'bú kèqi', m: 'Đừng khách sáo' }],
      'duibuqi': [{ s: '对不起', t: '對不起', py: 'duìbuqǐ', m: 'Xin lỗi' }],
      'meiguanxi': [{ s: '没关系', t: '沒關係', py: 'méi guānxi', m: 'Không sao đâu' }],
      'qingwen': [{ s: '请问', t: '請問', py: 'qǐngwèn', m: 'Xin hỏi' }],
      'mingtian': [{ s: '明天', t: '明天', py: 'míngtiān', m: 'Ngày mai' }],
      'jintian': [{ s: '今天', t: '今天', py: 'jīntiān', m: 'Hôm nay' }],
      'zuotian': [{ s: '昨天', t: '昨天', py: 'zuótiān', m: 'Hôm qua' }],
      'xiawu': [{ s: '下午', t: '下午', py: 'xiàwǔ', m: 'Buổi chiều' }],
      'zaoshang': [{ s: '早上', t: '早上', py: 'zǎoshang', m: 'Buổi sáng' }],
      'gongzuo': [{ s: '工作', t: '工作', py: 'gōngzuò', m: 'Công việc / Làm việc' }],
      'gongsi': [{ s: '公司', t: '公司', py: 'gōngsī', m: 'Công ty' }],
      'kaihui': [{ s: '开会', t: '開會', py: 'kāihuì', m: 'Họp, mở cuộc họp' }],
      'laoban': [{ s: '老板', t: '老闆', py: 'lǎobǎn', m: 'Ông chủ, sếp' }],
      'jingli': [{ s: '经理', t: '經理', py: 'jīnglǐ', m: 'Giám đốc, quản lý' }],
      'hetong': [{ s: '合同', t: '合同', py: 'hétong', m: 'Hợp đồng' }],
      'baojia': [{ s: '报价', t: '報價', py: 'bàojià', m: 'Báo giá' }, { s: '报价单', t: '報價單', py: 'bàojiàdān', m: 'Bảng báo giá' }],
      'xianhuo': [{ s: '现货', t: '現貨', py: 'xiànhuò', m: 'Hàng có sẵn' }],
      'baoyou': [{ s: '包邮', t: '包郵', py: 'bāoyóu', m: 'Miễn phí vận chuyển' }],
      'jiaohuo': [{ s: '交货', t: '交貨', py: 'jiāohuò', m: 'Giao hàng' }, { s: '交货期', t: '交貨期', py: 'jiāohuòqī', m: 'Thời hạn giao hàng' }],
      'baoguan': [{ s: '报关', t: '報關', py: 'bàoguān', m: 'Khai báo hải quan' }, { s: '报关单', t: '報關單', py: 'bàoguāndān', m: 'Tờ khai hải quan' }],
      'qingguan': [{ s: '清关', t: '清關', py: 'qīngguān', m: 'Thông quan' }],
      'gongyinglian': [{ s: '供应链', t: '供應鏈', py: 'gōngyìngliàn', m: 'Chuỗi cung ứng' }],
      'rengongzhineng': [{ s: '人工智能', t: '人工智能', py: 'réngōng zhìnéng', m: 'Trí tuệ nhân tạo (AI)' }],
      'neijuan': [{ s: '内卷', t: '內卷', py: 'nèijuǎn', m: 'Cạnh tranh bào mòn (Nội quyển)' }],
      'weiyuchoumou': [{ s: '未雨绸缪', t: '未雨綢繆', py: 'wèiyǔ-chóumóu', m: 'Lo liệu phòng ngừa từ sớm' }],
      'shenshiduoshi': [{ s: '审时度势', t: '審時度勢', py: 'shěnshí-duóshì', m: 'Thẩm thời đoạc thế' }],
      'zhijizhibi': [{ s: '知己知彼', t: '知己知彼', py: 'zhījǐ-zhībǐ', m: 'Biết người biết ta' }],
      'baizhanbudai': [{ s: '百战不殆', t: '百戰不殆', py: 'bǎizhàn-búdài', m: 'Trăm trận không nguy' }],
      'ba': [{ s: '把', t: '把', py: 'bǎ', m: 'Giới từ câu chữ 把' }, { s: '吧', t: '吧', py: 'ba', m: 'Trợ từ cuối câu nhé/nhỉ' }, { s: '八', t: '八', py: 'bā', m: 'Số 8' }],
      'bei': [{ s: '被', t: '被', py: 'bèi', m: 'Bị/Được (Bị động)' }, { s: '杯', t: '杯', py: 'bēi', m: 'Cốc, tách' }, { s: '北', t: '北', py: 'běi', m: 'Phía Bắc' }],
      'de': [{ s: '的', t: '的', py: 'de', m: 'Của (Định ngữ)' }, { s: '得', t: '得', py: 'de', m: 'Trợ từ bổ ngữ' }, { s: '地', t: '地', py: 'de', m: 'Trợ từ trạng ngữ' }],
      'le': [{ s: '了', t: '了', py: 'le', m: 'Rồi (Trợ từ)' }, { s: '乐', t: '樂', py: 'lè', m: 'Vui vẻ' }],
      'ma': [{ s: '吗', t: '嗎', py: 'ma', m: 'Không? (Trợ từ nghi vấn)' }, { s: '妈', t: '媽', py: 'mā', m: 'Mẹ' }, { s: '马', t: '馬', py: 'mǎ', m: 'Con ngựa' }],
      'zai': [{ s: '在', t: '在', py: 'zài', m: 'Ở tại / Đang' }, { s: '再', t: '再', py: 'zài', m: 'Lại, lần nữa' }],
      'you': [{ s: '有', t: '有', py: 'yǒu', m: 'Có' }, { s: '又', t: '又', py: 'yòu', m: 'Lại' }, { s: '友', t: '友', py: 'yǒu', m: 'Bạn bè' }],
      'qu': [{ s: '去', t: '去', py: 'qù', m: 'Đi' }, { s: '区', t: '區', py: 'qū', m: 'Khu vực' }],
      'lai': [{ s: '来', t: '來', py: 'lái', m: 'Đến' }],
      'kan': [{ s: '看', t: '看', py: 'kàn', m: 'Xem, nhìn, đọc' }],
      'shuo': [{ s: '说', t: '說', py: 'shuō', m: 'Nói' }],
      'ting': [{ s: '听', t: '聽', py: 'tīng', m: 'Nghe' }],
      'xie': [{ s: '写', t: '寫', py: 'xiě', m: 'Viết' }, { s: '些', t: '些', py: 'xiē', m: 'Một vài' }],
      'mai': [{ s: '买', t: '買', py: 'mǎi', m: 'Mua' }, { s: '卖', t: '賣', py: 'mài', m: 'Bán' }],
      'qian': [{ s: '钱', t: '錢', py: 'qián', m: 'Tiền' }, { s: '前', t: '前', py: 'qián', m: 'Phía trước' }, { s: '千', t: '千', py: 'qiān', m: 'Một nghìn' }],
      'liang': [{ s: '两', t: '兩', py: 'liǎng', m: 'Hai (trước lượng từ)' }, { s: '量', t: '量', py: 'liàng', m: 'Số lượng' }],
      'ge': [{ s: '个', t: '個', py: 'gè', m: 'Cái, người (Lượng từ)' }, { s: '哥', t: '哥', py: 'gē', m: 'Anh trai' }],
      'hen': [{ s: '很', t: '很', py: 'hěn', m: 'Rất' }],
      'gaoxing': [{ s: '高兴', t: '高興', py: 'gāoxìng', m: 'Vui mừng' }],
      'renshi': [{ s: '认识', t: '認識', py: 'rènshi', m: 'Quen biết' }]
    };

    const IME_CHALLENGES = [
      { promptVi: 'Xin chào, tôi là du học sinh Việt Nam.', targetSimp: '你好，我是越南留学生。', targetTrad: '你好，我是越南留學生。', hintKeys: 'Gõ lần lượt: nihao → ， → wo → shi → yuenan → liuxuesheng → 。' },
      { promptVi: 'Chào sếp, công ty có hàng sẵn và miễn phí vận chuyển không?', targetSimp: '老板您好，公司有现货包邮吗？', targetTrad: '老闆您好，公司有現貨包郵嗎？', hintKeys: 'Gõ lần lượt: laoban → ninhao → ， → gongsi → you → xianhuo → baoyou → ma → ？' },
      { promptVi: 'Biết người biết ta, trăm trận không nguy.', targetSimp: '知己知彼，百战不殆。', targetTrad: '知己知彼，百戰不殆。', hintKeys: 'Gõ lần lượt: zhijizhibi → ， → baizhanbudai → 。' }
    ];

    const IME_STATE = {
      rawBuffer: '',
      candidates: [],
      composedText: '你好，我是越南留学生。',
      challengeIndex: 0,
      toneNumberInput: 'ni3 hao3, wo3 hen3 xi3 huan1 xue2 han4 yu3!'
    };

    function stripPinyinTones(py) {
      return (py || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ü/g, 'v')
        .replace(/[^a-z]/g, '');
    }

    function lookupImeCandidates(rawQuery) {
      const q = (rawQuery || '').toLowerCase().replace(/[^a-z]/g, '');
      if (!q) return [];
      const results = [];
      const seen = new Set();

      const addCand = (s, t, py, m) => {
        if (seen.has(s)) return;
        seen.add(s);
        results.push({ s, t: t || s, py, m });
      };

      if (PINYIN_IME_DICT[q]) {
        PINYIN_IME_DICT[q].forEach(it => addCand(it.s, it.t, it.py, it.m));
      }

      VOCAB_VAULT_DATA.forEach(v => {
        const cleanPy = stripPinyinTones(v.pinyin);
        if (cleanPy === q || cleanPy.startsWith(q)) {
          addCand(v.simp, v.trad, v.pinyin, v.meaning);
        }
      });

      LESSONS_DATA.forEach(les => {
        les.vocab.forEach(v => {
          const basePy = stripPinyinTones(v.pinyin.split('(')[0]);
          if (basePy === q || basePy.startsWith(q)) {
            addCand(v.simp, v.trad, v.pinyin.split('(')[0].trim(), v.meaning);
          }
        });
      });

      Object.keys(PINYIN_IME_DICT).forEach(k => {
        if (k.startsWith(q) && k !== q) {
          PINYIN_IME_DICT[k].forEach(it => addCand(it.s, it.t, it.py, it.m));
        }
      });

      return results.slice(0, 8);
    }

    function onImeBufferInput(val) {
      IME_STATE.rawBuffer = val;
      IME_STATE.candidates = lookupImeCandidates(val);
      renderImeCandidatesBarOnly();
    }

    function handleImeBufferKeydown(event) {
      if (IME_STATE.candidates.length === 0) return;
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        pickImeCandidate(0);
      } else if (event.key >= '1' && event.key <= '8') {
        const idx = parseInt(event.key, 10) - 1;
        if (IME_STATE.candidates[idx]) {
          event.preventDefault();
          pickImeCandidate(idx);
        }
      }
    }

    function pickImeCandidate(idx) {
      const cand = IME_STATE.candidates[idx];
      if (!cand) return;
      const disp = hz(cand.s, cand.t);
      const area = document.getElementById('ime-composed-textarea');
      if (area) {
        IME_STATE.composedText = area.value + disp;
        area.value = IME_STATE.composedText;
      } else {
        IME_STATE.composedText += disp;
      }
      IME_STATE.rawBuffer = '';
      IME_STATE.candidates = [];
      const bufInp = document.getElementById('ime-pinyin-buffer-input');
      if (bufInp) {
        bufInp.value = '';
        bufInp.focus();
      }
      renderImeCandidatesBarOnly();
    }

    function insertChinesePunct(punct) {
      const area = document.getElementById('ime-composed-textarea');
      if (area) {
        IME_STATE.composedText = area.value + punct;
        area.value = IME_STATE.composedText;
      }
    }

    function clearImeComposedText() {
      IME_STATE.composedText = '';
      const area = document.getElementById('ime-composed-textarea');
      if (area) area.value = '';
    }

    function checkImeChallengeMatch() {
      const area = document.getElementById('ime-composed-textarea');
      if (area) IME_STATE.composedText = area.value;
      const ch = IME_CHALLENGES[IME_STATE.challengeIndex % IME_CHALLENGES.length];
      const target = hz(ch.targetSimp, ch.targetTrad);
      const cleanUser = normalizeChineseChars(IME_STATE.composedText);
      const cleanTarget = normalizeChineseChars(target);
      const fb = document.getElementById('ime-challenge-feedback');
      if (!fb) return;
      fb.classList.remove('hidden');

      if (cleanUser === cleanTarget) {
        fb.className = 'p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold';
        fb.innerHTML = `🎉 Tuyệt vời! Bạn đã gõ chính xác 100% câu "${target}" (+20 XP).`;
        addXp(20, 'Hoàn thành thử thách Gõ Pinyin Văn phòng');
      } else {
        fb.className = 'p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold';
        fb.innerHTML = `💡 Câu mục tiêu là: <span class="hanzi-font text-sm">${target}</span> — Hãy gõ tiếp hoặc kiểm tra các chữ còn thiếu nhé!`;
      }
    }

    function nextImeChallenge() {
      IME_STATE.challengeIndex = (IME_STATE.challengeIndex + 1) % IME_CHALLENGES.length;
      IME_STATE.composedText = '';
      renderPinyinImeSimulator();
    }

    function copyImeComposedText() {
      const area = document.getElementById('ime-composed-textarea');
      const txt = area ? area.value : IME_STATE.composedText;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).then(() => showToast('📋 Đã sao chép đoạn chữ Hán vừa gõ!', 'success'));
          return;
        }
      } catch (e) {}
      if (area) {
        area.select();
        document.execCommand('copy');
        showToast('📋 Đã sao chép đoạn chữ Hán vừa gõ!', 'success');
      }
    }

    function convertNumberedPinyinToTones(inputStr) {
      const toneMap = {
        a: ['ā', 'á', 'ǎ', 'à'],
        o: ['ō', 'ó', 'ǒ', 'ò'],
        e: ['ē', 'é', 'ě', 'è'],
        i: ['ī', 'í', 'ǐ', 'ì'],
        u: ['ū', 'ú', 'ǔ', 'ù'],
        v: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
        ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ']
      };

      const normalized = (inputStr || '').replace(/u:/gi, 'v');
      return normalized.replace(/([a-zA-ZüÜ]+)([1-4])/g, (full, syl, toneDigit) => {
        const tIdx = parseInt(toneDigit, 10) - 1;
        const lower = syl.toLowerCase();
        let targetVowel = null;
        if (lower.includes('a')) targetVowel = 'a';
        else if (lower.includes('o')) targetVowel = 'o';
        else if (lower.includes('e')) targetVowel = 'e';
        else if (lower.includes('iu')) targetVowel = 'u';
        else if (lower.includes('ui')) targetVowel = 'i';
        else {
          for (const v of ['i', 'u', 'v', 'ü']) {
            if (lower.includes(v)) { targetVowel = v; break; }
          }
        }
        if (!targetVowel || !toneMap[targetVowel]) return full;
        const replacement = toneMap[targetVowel][tIdx];
        return syl.replace(new RegExp(targetVowel, 'i'), replacement).replace(/v/g, 'ü');
      });
    }

    function onToneConverterInput(val) {
      IME_STATE.toneNumberInput = val;
      const outEl = document.getElementById('tone-converter-output');
      if (outEl) {
        outEl.textContent = convertNumberedPinyinToTones(val);
      }
    }

    function renderImeCandidatesBarOnly() {
      const bar = document.getElementById('ime-candidates-bar');
      if (!bar) return;
      if (!IME_STATE.rawBuffer) {
        bar.innerHTML = `<span class="text-xs text-stone-400">👆 Gõ Pinyin không dấu vào ô phía trên (VD: <code>nihao</code>, <code>yuenan</code>, <code>hetong</code>, <code>baojia</code>, <code>xianhuo</code>, <code>neijuan</code>) để hiện danh sách chữ Hán gợi ý...</span>`;
        return;
      }
      if (IME_STATE.candidates.length === 0) {
        bar.innerHTML = `<span class="text-xs text-amber-700">Không tìm thấy từ khớp với "${IME_STATE.rawBuffer}". Hãy thử gõ từng âm tiết như <code>ni</code>, <code>hao</code>, <code>wo</code>, <code>shi</code>, <code>gongsi</code>...</span>`;
        return;
      }
      bar.innerHTML = IME_STATE.candidates.map((cand, idx) => {
        const disp = hz(cand.s, cand.t);
        return `
          <button type="button" onclick="pickImeCandidate(${idx})" class="px-3 py-1.5 rounded-xl border transition flex items-baseline gap-1.5 ${idx === 0 ? 'bg-vermilion-600 text-white border-vermilion-600 shadow-sm' : 'bg-white hover:bg-amber-50 text-stone-900 border-stone-300'}">
            <span class="text-xs font-extrabold ${idx === 0 ? 'text-amber-200' : 'text-vermilion-700'}">${idx + 1}.</span>
            <span class="text-base sm:text-lg font-bold hanzi-font">${disp}</span>
            <span class="text-[11px] ${idx === 0 ? 'text-stone-100' : 'text-emerald-700'}">(${cand.py})</span>
          </button>
        `;
      }).join('');
    }

    function renderPinyinImeSimulator() {
      const box = document.getElementById('subpanel-arena-ime');
      if (!box) return;
      const ch = IME_CHALLENGES[IME_STATE.challengeIndex % IME_CHALLENGES.length];
      const chTarget = hz(ch.targetSimp, ch.targetTrad);

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-sky-700">⌨️ Bộ Mô Phỏng Gõ Pinyin Văn Phòng (Web IME & Chuyển Dấu Thanh Điệu)</span>
            <p class="text-xs text-stone-500">Rèn kỹ năng gõ chữ Hán bằng bàn phím máy tính/điện thoại mà không cần cài phần mềm bên ngoài</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div class="lg:col-span-7 bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3.5">
            <div class="flex flex-wrap items-center justify-between gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div class="space-y-0.5 text-xs">
                <div class="font-extrabold text-amber-950">🎯 Thử thách gõ câu văn phòng #${(IME_STATE.challengeIndex % IME_CHALLENGES.length) + 1}: "${ch.promptVi}"</div>
                <div class="text-stone-700">Chữ đích: <strong class="hanzi-font text-sm text-vermilion-700">${chTarget}</strong></div>
                <div class="text-[11px] text-stone-500">${ch.hintKeys}</div>
              </div>
              <button type="button" onclick="nextImeChallenge()" class="px-2.5 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold shrink-0">Đổi câu khác ➔</button>
            </div>

            <div class="space-y-1.5">
              <label for="ime-pinyin-buffer-input" class="block text-xs font-bold text-stone-700">1. Ô gõ Pinyin không dấu (Nhấn phím Cách / Số 1–8 hoặc Click vào từ gợi ý để chọn chữ):</label>
              <input id="ime-pinyin-buffer-input" type="text" value="${IME_STATE.rawBuffer}" oninput="onImeBufferInput(this.value)" onkeydown="handleImeBufferKeydown(event)" placeholder="Gõ Pinyin vào đây: nihao, wo, shi, yuenan, laoban, baojia, xianhuo..." class="w-full px-3.5 py-2.5 text-sm font-mono font-bold bg-white border-2 border-sky-500 rounded-xl focus:outline-none focus:border-vermilion-600" />
            </div>

            <div id="ime-candidates-bar" class="min-h-[48px] p-2.5 rounded-xl bg-stone-100 border border-stone-200 flex flex-wrap items-center gap-2"></div>

            <div class="flex flex-wrap items-center gap-1.5 text-xs">
              <span class="text-stone-500 font-semibold mr-1">Chèn nhanh dấu câu:</span>
              <button type="button" onclick="insertChinesePunct('，')" class="px-2.5 py-1 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100">，</button>
              <button type="button" onclick="insertChinesePunct('。')" class="px-2.5 py-1 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100">。</button>
              <button type="button" onclick="insertChinesePunct('？')" class="px-2.5 py-1 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100">？</button>
              <button type="button" onclick="insertChinesePunct('！')" class="px-2.5 py-1 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100">！</button>
              <button type="button" onclick="insertChinesePunct('、')" class="px-2.5 py-1 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100">、</button>
            </div>

            <div class="space-y-1.5">
              <label for="ime-composed-textarea" class="block text-xs font-bold text-stone-700">2. Khung văn bản chữ Hán đã soạn thảo:</label>
              <textarea id="ime-composed-textarea" rows="3" oninput="IME_STATE.composedText = this.value" class="w-full p-3 text-base sm:text-lg hanzi-font font-bold bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-vermilion-600">${IME_STATE.composedText}</textarea>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <button type="button" onclick="checkImeChallengeMatch()" class="px-4 py-2 rounded-xl bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs font-extrabold shadow">✨ Kiểm Tra Câu Vừa Gõ</button>
              <button type="button" onclick="speakChinese(document.getElementById('ime-composed-textarea').value)" class="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold">🔊 Đọc câu vừa gõ</button>
              <button type="button" onclick="copyImeComposedText()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold">📋 Sao chép chữ Hán</button>
              <button type="button" onclick="clearImeComposedText()" class="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold">🧹 Xóa</button>
            </div>
            <div id="ime-challenge-feedback" class="hidden"></div>
          </div>

          <div class="lg:col-span-5 bg-stone-900 text-white rounded-2xl p-5 shadow-lg space-y-4">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">Công cụ Bổ trợ</span>
              <h4 class="text-base font-extrabold text-white mt-1.5">🔤 Chuyển Pinyin Số → Dấu Thanh Điệu Chuẩn</h4>
              <p class="text-xs text-stone-300 mt-0.5">Gõ số <code>1, 2, 3, 4</code> sau âm tiết (và <code>v</code> hoặc <code>u:</code> cho <code>ü</code>) để tự động đặt dấu thanh điệu đúng quy tắc <code>a &gt; o &gt; e &gt; i/u</code>:</p>
            </div>

            <div class="space-y-1.5">
              <label for="tone-converter-input" class="block text-xs font-semibold text-stone-300">Nhập Pinyin kèm số thanh điệu:</label>
              <textarea id="tone-converter-input" rows="3" oninput="onToneConverterInput(this.value)" class="w-full p-3 text-xs sm:text-sm font-mono bg-stone-800 text-white border border-stone-700 rounded-xl focus:outline-none focus:border-amber-400">${IME_STATE.toneNumberInput}</textarea>
            </div>

            <div class="bg-stone-800 p-3.5 rounded-xl border border-amber-500/40 space-y-1">
              <div class="text-[11px] text-amber-300 font-bold">Kết quả Pinyin có dấu chuẩn:</div>
              <div id="tone-converter-output" class="text-base sm:text-lg font-extrabold text-emerald-400 break-words">${convertNumberedPinyinToTones(IME_STATE.toneNumberInput)}</div>
            </div>

            <div class="text-[11px] text-stone-400 space-y-1 border-t border-stone-800 pt-2">
              <div><strong>Quy tắc đặt dấu thanh điệu:</strong></div>
              <div>• Có <strong>a</strong> hoặc <strong>e</strong> thì đặt ngay trên a, e (<code>hao3 → hǎo</code>, <code>peng2 → péng</code>).</div>
              <div>• Tổ hợp <strong>ou</strong> đặt trên o (<code>dou1 → dōu</code>).</div>
              <div>• Tổ hợp <strong>iu</strong> và <strong>ui</strong> đặt trên nguyên âm đứng sau (<code>liu2 → liú</code>, <code>dui4 → duì</code>).</div>
            </div>
          </div>
        </div>
      `;

      renderImeCandidatesBarOnly();
    }

    // =========================================================================
    // 12. TAB 6 CONTROLLER: RADAR CHART, STUDY PLANNER & SAVED BOOKMARKS
    // =========================================================================
    let skillsChartInstance = null;

    function renderSkillsChart() {
      const canvas = document.getElementById('skills-radar-chart');
      if (!canvas || typeof Chart === 'undefined') return;
      if (skillsChartInstance) {
        skillsChartInstance.destroy();
      }
      const s = APP_STATE.skillsScore;
      skillsChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'radar',
        data: {
          labels: ['Ngữ âm & Biến điệu', 'Hán tự & Bộ thủ', 'Từ vựng Đa ngành', 'Ngữ pháp & Câu 把/被', 'Cổ văn & Thành ngữ', 'Đàm phán Thương mại'],
          datasets: [{
            label: 'Chỉ số Tinh thông hiện tại (/100)',
            data: [s.phonetics, s.hanzi, s.vocab, s.grammar, s.classical, s.business],
            backgroundColor: 'rgba(220, 38, 38, 0.18)',
            borderColor: '#dc2626',
            pointBackgroundColor: '#f59e0b',
            pointBorderColor: '#1c1917',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: { stepSize: 20, font: { size: 10 } },
              pointLabels: { font: { size: 11, weight: '600' }, color: '#292524' }
            }
          },
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 11 } } }
          }
        }
      });
    }

    function generateStudyPlan() {
      const box = document.getElementById('generated-plan-container');
      if (!box) return;
      const lvl = document.getElementById('plan-current-level')?.value || 'ZERO';
      const goal = document.getElementById('plan-target-goal')?.value || 'ALL_ROUND';
      const mins = parseInt(document.getElementById('plan-daily-time')?.value || '60', 10);

      const t1 = Math.round(mins * 0.3);
      const t2 = Math.round(mins * 0.4);
      const t3 = mins - t1 - t2;

      const stageDesc = {
        ZERO: 'Tuần 1–4: Nắm chắc 21 Thanh mẫu, 36 Vận mẫu, Biến điệu, 8 Nét cơ bản và 50 Bộ thủ tần suất cao nhất (Tab 2).',
        HSK2: 'Tuần 1–6: Làm chủ Trật tự trạng ngữ Thời gian - Địa điểm, Bổ ngữ kết quả/xu hướng và 600 từ giao tiếp (Bài 03–05).',
        HSK4: 'Tuần 1–8: Xử lý triệt để Câu chữ 把/被, Liên từ phức hợp, Từ cận nghĩa và Đọc hiểu báo chí (Bài 06–09).',
        HSK6: 'Tuần 1–10: Đi sâu vào Văn ngôn Luận Ngữ, Tôn Tử Binh Pháp, Sửa lỗi Bệnh câu và Dịch thuật C2 (Bài 10–14).'
      };

      const goalFocus = {
        ALL_ROUND: 'Kết hợp đồng đều Nghe - Nói - Đọc - Viết và làm đề mô phỏng HSK tại Đấu trường Luyện đề.',
        BIZ_TRADE: 'Ưu tiên học Bài 12–13 (Ngoại thương FOB/CIF, MOQ, 1688) và Luyện dịch Hợp đồng thương mại.',
        SPEAKING: 'Bật tốc độ đọc 1.0x–1.2x, nhại theo (Shadowing) toàn bộ hội thoại và luyện ghép câu phản xạ nhanh.',
        LITERARY: 'Khai thác Tàng Kinh Các (Thành ngữ & Điển cố) cùng 10 cặp Từ cận nghĩa học thuật.'
      };

      box.innerHTML = `
        <div class="font-bold text-stone-900 text-sm">📌 Phác Đồ Học Tập Đề Xuất (${mins} phút / ngày):</div>
        <p class="text-stone-700">${stageDesc[lvl]}</p>
        <p class="text-vermilion-800 font-medium">🎯 Trọng tâm chuyên biệt: ${goalFocus[goal]}</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <div class="bg-white p-2.5 rounded-lg border border-stone-200">
            <strong class="text-emerald-700">⏱️ ${t1} phút đầu:</strong> Ôn thẻ Flashcard SRS 3D & Luyện viết 3 chữ Hán trên bảng Mễ Tự Cách.
          </div>
          <div class="bg-white p-2.5 rounded-lg border border-stone-200">
            <strong class="text-vermilion-700">⏱️ ${t2} phút giữa:</strong> Học sâu 1 Bài học chuyên đề (Ngữ pháp + Đọc to hội thoại theo băng).
          </div>
          <div class="bg-white p-2.5 rounded-lg border border-stone-200">
            <strong class="text-amber-700">⏱️ ${t3} phút cuối:</strong> Làm 3 câu Trắc nghiệm Bệnh câu & 1 bài Dịch thuật thực chiến.
          </div>
        </div>
      `;
    }

    function renderSavedBookmarks() {
      const box = document.getElementById('saved-bookmarks-list');
      if (!box) return;
      const items = VOCAB_VAULT_DATA.filter(v => APP_STATE.savedVocabIds.includes(v.id));
      if (items.length === 0) {
        box.innerHTML = `<div class="p-4 text-xs text-stone-500 text-center">Chưa có từ nào trong Sổ tay. Hãy bấm nút "☆ Lưu" ở Kho Từ Điển để thêm từ vào đây!</div>`;
        return;
      }
      box.innerHTML = items.map(v => {
        const ch = hz(v.simp, v.trad);
        return `
          <div class="py-2.5 px-2 flex items-center justify-between gap-2 hover:bg-stone-50 rounded-lg">
            <div>
              <span class="font-bold text-base hanzi-font text-stone-900">${ch}</span>
              <span class="text-xs font-bold text-emerald-700 ml-1.5">${v.pinyin}</span>
              <span class="text-[11px] font-semibold text-amber-800 ml-1">[${v.hanviet}]</span>
              <p class="text-xs text-stone-600">${v.meaning}</p>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" onclick="speakChinese('${ch}')" class="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-xs">🔊</button>
              <button type="button" onclick="toggleBookmarkVocab('${v.id}')" class="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold">✕</button>
            </div>
          </div>
        `;
      }).join('');
    }

    function copySavedVocabToClipboard() {
      const items = VOCAB_VAULT_DATA.filter(v => APP_STATE.savedVocabIds.includes(v.id));
      const lines = ['# Sổ Tay Từ Vựng Hoa Ngữ Tinh Thông', ''];
      items.forEach(v => {
        lines.push(`- **${hz(v.simp, v.trad)}** (${v.pinyin} | ${v.hanviet}): ${v.meaning} — *VD: ${hz(v.exSimp, v.exTrad)}*`);
      });
      const text = lines.join('\n');
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => showToast('📋 Đã sao chép Sổ tay từ vựng vào Clipboard!', 'success'));
          return;
        }
      } catch (e) {}
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('📋 Đã sao chép Sổ tay từ vựng vào Clipboard!', 'success');
    }

    function savePersonalNotes() {
      const val = document.getElementById('personal-notes-area')?.value || '';
      try {
        localStorage.setItem('hoa_ngu_notes_v1', val);
      } catch (e) {}
      showToast('💾 Đã lưu ghi chú học tập cá nhân!', 'success');
    }

    // =========================================================================
    // 12B. GROUP 3 CONTROLLERS: STREAK, BADGES, DARK MODE, FONT SCALE & ANKI/CSV
    // =========================================================================
    const ACHIEVEMENT_BADGES_DATA = [
      {
        id: 'B_FIRST_STEP',
        icon: '🌱',
        title: 'Khởi Đầu Tinh Thông',
        tier: 'COMMON', // Danh hiệu Thường (3 sao)
        desc: 'Hoàn thành ít nhất 2 bài học trong lộ trình',
        check: () => APP_STATE.completedLessons.length >= 2
      },
      {
        id: 'B_STREAK_3',
        icon: '🔥',
        title: 'Chiến Binh Bền Bỉ',
        tier: 'COMMON', // Danh hiệu Thường (3 sao)
        desc: 'Duy trì chuỗi ngày học liên tục từ 3 ngày trở lên',
        check: () => APP_STATE.streakDays >= 3
      },
      {
        id: 'B_LEXICON',
        icon: '⭐',
        title: 'Học Giả Tàng Kinh Các',
        tier: 'COMMON', // Danh hiệu Thường (3 sao)
        desc: 'Lưu ít nhất 5 từ vựng / thành ngữ vào Sổ tay cá nhân',
        check: () => APP_STATE.savedVocabIds.length >= 5
      },
      {
        id: 'B_STREAK_7',
        icon: '⚡',
        title: 'Thần Tốc Tuần Lễ Vàng',
        tier: 'MID', // Danh hiệu Trung cấp (4 sao)
        desc: 'Đạt mốc 7 ngày học liên tục hoặc trên 600 XP',
        check: () => APP_STATE.streakDays >= 7 || APP_STATE.xp >= 600
      },
      {
        id: 'B_CALLIGRAPHER',
        icon: '🖌️',
        title: 'Danh Sư Bát Pháp',
        tier: 'MID', // Danh hiệu Trung cấp (4 sao)
        desc: 'Chỉ số Hán tự & Bộ thủ đạt từ 67 điểm trở lên',
        check: () => APP_STATE.skillsScore.hanzi >= 67
      },
      {
        id: 'B_SPEAKER',
        icon: '🎙️',
        title: 'Cao Thủ Khẩu Ngữ AI',
        tier: 'MID', // Danh hiệu Trung cấp (4 sao)
        desc: 'Chỉ số Ngữ âm & Biến điệu đạt từ 80 điểm trở lên',
        check: () => APP_STATE.skillsScore.phonetics >= 80
      },
      {
        id: 'B_MERCHANT',
        icon: '💼',
        title: 'Thương Nhân Quốc Tế',
        tier: 'HIGH', // Danh hiệu Cao cấp Hoàng kim (5 sao)
        desc: 'Hoàn thành bài học Thương mại (L12/L13) hoặc kỹ năng TM >= 65',
        check: () => APP_STATE.completedLessons.includes('L12') || APP_STATE.completedLessons.includes('L13') || APP_STATE.skillsScore.business >= 65
      },
      {
        id: 'B_GRANDMASTER',
        icon: '🐉',
        title: 'Đại Sư Hoa Ngữ HSK 9',
        tier: 'HIGH', // Danh hiệu Cao cấp Hoàng kim (5 sao)
        desc: 'Tích lũy đạt mốc 1.000 XP hoặc hoàn thành 8 bài học',
        check: () => APP_STATE.xp >= 1000 || APP_STATE.completedLessons.length >= 8
      }
    ];

    function checkAndUnlockBadges() {
      let newlyUnlocked = false;
      let lastUnlockedBadge = null;
      ACHIEVEMENT_BADGES_DATA.forEach(b => {
        if (!APP_STATE.unlockedBadges.includes(b.id) && b.check()) {
          APP_STATE.unlockedBadges.push(b.id);
          newlyUnlocked = true;
          lastUnlockedBadge = b;
          showToast(`🏆 Mở khóa Danh hiệu mới: "${b.icon} ${b.title}"!`, 'success');
        }
      });
      if (newlyUnlocked) {
        saveAppState();
        if (lastUnlockedBadge) {
          triggerCinematicTitleUnlockIntro(lastUnlockedBadge);
        }
      }
    }

    function claimDailyStreakCheckIn() {
      const todayIso = new Date().toISOString().slice(0, 10);
      if (APP_STATE.checkedInToday && APP_STATE.lastStudyDate === todayIso) {
        showToast('🔥 Bạn đã điểm danh nhận thưởng chuỗi ngày học hôm nay rồi!', 'info');
        return;
      }
      APP_STATE.streakDays = (APP_STATE.streakDays || 3) + 1;
      APP_STATE.lastStudyDate = todayIso;
      APP_STATE.checkedInToday = true;
      addXp(25, `Điểm danh chuỗi ${APP_STATE.streakDays} ngày học liên tục 🔥`);
      renderStreakAndBadges();
    }

    function renderStreakAndBadges() {
      checkAndUnlockBadges();
      const bannerEl = document.getElementById('dashboard-streak-banner');
      const btnCheckin = document.getElementById('btn-daily-checkin');
      const weekStrip = document.getElementById('streak-week-strip');
      const badgesGrid = document.getElementById('badges-showcase-grid');

      const todayIso = new Date().toISOString().slice(0, 10);
      const isCheckedToday = APP_STATE.checkedInToday && APP_STATE.lastStudyDate === todayIso;

      if (bannerEl) {
        bannerEl.textContent = `🔥 Chuỗi hiện tại: ${APP_STATE.streakDays} ngày liên tục (${APP_STATE.unlockedBadges.length}/${ACHIEVEMENT_BADGES_DATA.length} Huy hiệu)`;
      }
      if (btnCheckin) {
        btnCheckin.textContent = isCheckedToday ? '✓ Đã Điểm Danh Hôm Nay' : '🎁 Điểm Danh Hôm Nay (+25 XP)';
        btnCheckin.className = isCheckedToday
          ? 'px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow transition'
          : 'px-3.5 py-1.5 rounded-xl bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs font-extrabold shadow transition';
      }

      if (weekStrip) {
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
        weekStrip.innerHTML = days.map((dName, idx) => {
          const isLit = idx < Math.min(7, APP_STATE.streakDays);
          return `
            <div class="p-2.5 rounded-xl border ${isLit ? 'bg-amber-50 border-amber-300 text-amber-950' : 'bg-stone-50 border-stone-200 text-stone-400'} flex flex-col items-center gap-1">
              <span class="text-[11px] font-bold">${dName}</span>
              <span class="text-lg">${isLit ? '🔥' : '⚪'}</span>
              <span class="text-[10px] font-semibold">${isLit ? 'Đã học' : 'Chờ mở'}</span>
            </div>
          `;
        }).join('');
      }

      if (badgesGrid) {
        badgesGrid.innerHTML = ACHIEVEMENT_BADGES_DATA.map(b => {
          const unlocked = APP_STATE.unlockedBadges.includes(b.id) || b.check();
          return `
            <div class="p-3.5 rounded-xl border transition flex items-start gap-3 ${unlocked ? 'bg-amber-50/70 border-amber-300 shadow-sm' : 'bg-stone-50 border-stone-200 opacity-60'}">
              <div class="w-11 h-11 rounded-xl ${unlocked ? 'bg-stone-900 text-amber-400' : 'bg-stone-200 text-stone-500'} flex items-center justify-center text-2xl shrink-0">
                ${b.icon}
              </div>
              <div class="space-y-0.5 text-xs">
                <div class="font-extrabold text-stone-900 flex items-center gap-1.5">
                  <span>${b.title}</span>
                  ${unlocked ? '<span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Đã đạt ✓</span>' : ''}
                </div>
                <p class="text-[11px] text-stone-600 leading-snug">${b.desc}</p>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // --- Dark Mode & Hanzi Font Size Scaling ---
    function applyThemeAndScalePreferences() {
      if (APP_STATE.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      const iconEl = document.getElementById('dark-mode-icon');
      const lblEl = document.getElementById('dark-mode-label');
      if (iconEl) iconEl.textContent = APP_STATE.darkMode ? '☀️' : '🌙';
      if (lblEl) lblEl.textContent = APP_STATE.darkMode ? 'Ban ngày' : 'Ban đêm';

      document.body.classList.remove('hanzi-scale-lg', 'hanzi-scale-xl');
      if (APP_STATE.hanziFontScale === 'lg') {
        document.body.classList.add('hanzi-scale-lg');
      } else if (APP_STATE.hanziFontScale === 'xl') {
        document.body.classList.add('hanzi-scale-xl');
      }
      const scaleSelect = document.getElementById('select-hanzi-scale');
      if (scaleSelect) scaleSelect.value = APP_STATE.hanziFontScale || 'normal';
    }

    function toggleDarkMode() {
      APP_STATE.darkMode = !APP_STATE.darkMode;
      applyThemeAndScalePreferences();
      saveAppState();
      showToast(
        APP_STATE.darkMode ? '🌙 Đã bật Chế độ Ban đêm (Bảo vệ mắt khi học tối)' : '☀️ Đã chuyển về Chế độ Ban ngày',
        'info'
      );
    }

    function setHanziFontScale(scaleVal) {
      APP_STATE.hanziFontScale = scaleVal || 'normal';
      applyThemeAndScalePreferences();
      saveAppState();
      const names = { normal: 'Chuẩn (100%)', lg: 'Lớn (120%)', xl: 'Rõ nét (140%)' };
      showToast(`🔍 Đã chỉnh cỡ chữ Hán toàn trang: ${names[APP_STATE.hanziFontScale]}`, 'info');
    }

    // --- Export Saved Vocab to Anki (.txt), Excel (.csv) & Quizlet ---
    function exportSavedVocabToAnkiTxt() {
      const items = VOCAB_VAULT_DATA.filter(v => APP_STATE.savedVocabIds.includes(v.id));
      const pool = items.length > 0 ? items : VOCAB_VAULT_DATA.slice(0, 10);
      const lines = [
        '#separator:tab',
        '#html:true',
        '#tags column:3'
      ];
      pool.forEach(v => {
        const front = hz(v.simp, v.trad);
        const ex = hz(v.exSimp, v.exTrad);
        const back = `<b>${v.pinyin}</b> [${v.hanviet}] (${v.pos})<br>${v.meaning}<br><i>VD: ${ex} (${v.exVi})</i>`;
        const tag = `HoaNguTinhThong ${v.level || 'HSK'}`;
        lines.push(`${front}\t${back}\t${tag}`);
      });
      const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `anki_hoa_ngu_tinh_thong_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addXp(10, 'Xuất bộ thẻ từ vựng chuẩn Anki (.txt)');
    }

    function exportSavedVocabToCsv() {
      const items = VOCAB_VAULT_DATA.filter(v => APP_STATE.savedVocabIds.includes(v.id));
      const pool = items.length > 0 ? items : VOCAB_VAULT_DATA.slice(0, 10);
      const escCsv = (val) => `"${String(val || '').replace(/"/g, '""')}"`;
      const rows = [
        ['Chữ Hán (Giản thể)', 'Chữ Hán (Phồn thể)', 'Pinyin', 'Âm Hán Việt', 'Từ loại', 'Nghĩa Tiếng Việt', 'Câu Ví Dụ', 'Dịch Ví Dụ'].map(escCsv).join(',')
      ];
      pool.forEach(v => {
        rows.push([v.simp, v.trad, v.pinyin, v.hanviet, v.pos, v.meaning, v.exSimp, v.exVi].map(escCsv).join(','));
      });
      // Prepend UTF-8 BOM (\uFEFF) so Excel renders Chinese & Vietnamese characters cleanly
      const blob = new Blob(['\uFEFF' + rows.join('\r\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `so_tay_tu_vung_hoa_ngu_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addXp(10, 'Xuất bảng từ vựng Excel (.csv)');
    }

    function copySavedVocabForQuizlet() {
      const items = VOCAB_VAULT_DATA.filter(v => APP_STATE.savedVocabIds.includes(v.id));
      const pool = items.length > 0 ? items : VOCAB_VAULT_DATA.slice(0, 10);
      const text = pool.map(v => `${hz(v.simp, v.trad)}\t${v.pinyin} [${v.hanviet}] — ${v.meaning} (VD: ${hz(v.exSimp, v.exTrad)})`).join('\n');
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => showToast('🃏 Đã copy định dạng Quizlet (Tab-separated)! Bạn có thể dán thẳng vào Quizlet.', 'success'));
          return;
        }
      } catch (e) {}
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('🃏 Đã copy định dạng Quizlet! Bạn có thể dán thẳng vào Quizlet.', 'success');
    }

    // =========================================================================
    // 13. MODALS: PLACEMENT TEST & CUSTOM PATH SELECTOR
    // =========================================================================
    function openPlacementModal() {
      const modal = document.getElementById('placement-modal');
      const body = document.getElementById('placement-modal-body');
      if (!modal || !body) return;
      modal.classList.remove('hidden');

      body.innerHTML = `
        <div class="space-y-4">
          ${PLACEMENT_QUESTIONS.map((pq, qIdx) => `
            <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div class="text-xs sm:text-sm font-bold text-stone-900">${pq.q}</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${pq.opts.map((opt, oIdx) => `
                  <label class="flex items-center gap-2 p-2 rounded-lg bg-white border border-stone-200 cursor-pointer hover:border-vermilion-500 text-xs">
                    <input type="radio" name="place_q_${qIdx}" value="${oIdx}" ${oIdx === 1 ? 'checked' : ''} class="accent-vermilion-600" />
                    <span class="hanzi-font">${opt}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" onclick="closePlacementModal()" class="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold">Đóng</button>
            <button type="button" onclick="submitPlacementTest()" class="px-5 py-2 rounded-xl bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs sm:text-sm font-bold shadow">🎯 Chấm Điểm & Đề Xuất Lộ Trình</button>
          </div>
        </div>
      `;
    }

    function closePlacementModal() {
      document.getElementById('placement-modal')?.classList.add('hidden');
    }

    function submitPlacementTest() {
      let score = 0;
      PLACEMENT_QUESTIONS.forEach((pq, qIdx) => {
        const checked = document.querySelector(`input[name="place_q_${qIdx}"]:checked`);
        if (checked && parseInt(checked.value, 10) === pq.ans) score++;
      });

      let recLevel = 'LVL0';
      if (score <= 1) recLevel = 'LVL0';
      else if (score === 2) recLevel = 'LVL1';
      else if (score === 3) recLevel = 'LVL2';
      else if (score === 4) recLevel = 'LVL3';
      else if (score === 5) recLevel = 'BIZ';
      else recLevel = 'LVL4';

      closePlacementModal();
      selectGlobalLevel(recLevel);
      addXp(30, `Hoàn thành Test Trình Độ (${score}/6 câu đúng)`);
    }

    function openCustomPathModal() {
      const modal = document.getElementById('custom-path-modal');
      const box = document.getElementById('custom-preset-cards');
      if (!modal || !box) return;
      modal.classList.remove('hidden');

      box.innerHTML = CUSTOM_PATH_PRESETS.map((p, idx) => `
        <button type="button" onclick="applyCustomPath(${idx})" class="text-left p-4 rounded-xl border border-stone-200 hover:border-vermilion-600 hover:bg-amber-50/50 transition space-y-1.5">
          <div class="text-sm font-bold text-stone-900">${p.title}</div>
          <p class="text-xs text-stone-600 leading-relaxed">${p.desc}</p>
          <div class="text-[11px] font-bold text-vermilion-700 pt-1">Áp dụng lộ trình này ➔</div>
        </button>
      `).join('');
    }

    function closeCustomPathModal() {
      document.getElementById('custom-path-modal')?.classList.add('hidden');
    }

    function applyCustomPath(idx) {
      const p = CUSTOM_PATH_PRESETS[idx];
      if (!p) return;
      closeCustomPathModal();
      const fFocus = document.getElementById('filter-lesson-focus');
      if (fFocus && p.focus) fFocus.value = p.focus;
      selectGlobalLevel(p.level);
      switchMainTab(p.tab);
      showToast(`Đã kích hoạt lộ trình: ${p.title}`, 'success');
    }

    // =========================================================================
    // 13B. CLOUD SYNC, JSON BACKUP & ONLINE DEPLOYMENT CONTROLLERS
    // =========================================================================
    function getStoredGeminiApiKey() {
      try {
        return (localStorage.getItem('hoa_ngu_gemini_api_key_v1') || '').trim();
      } catch (e) {
        return '';
      }
    }

    function updateGeminiStatusBadges() {
      const key = getStoredGeminiApiKey();
      const hasKey = key.length > 10;
      const modalBadge = document.getElementById('gemini-key-badge');
      if (modalBadge) {
        modalBadge.textContent = hasKey ? '✅ Đã kết nối Gemini AI' : 'Chưa nhập khóa';
        modalBadge.className = hasKey
          ? 'text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300'
          : 'text-[10px] font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-700';
      }
      const roleplayPill = document.getElementById('roleplay-ai-mode-pill');
      if (roleplayPill) {
        roleplayPill.textContent = hasKey
          ? '🤖 AI Gemini Bản Xứ: ĐANG BẬT (Chat tự do)'
          : '🎭 Chế độ Kịch bản Thông minh (Nhập API Key để bật AI tự do)';
        roleplayPill.className = hasKey
          ? 'text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300'
          : 'text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300';
      }
    }

    function toggleShowGeminiKeyInput() {
      const inp = document.getElementById('gemini-api-key-input');
      if (!inp) return;
      inp.type = inp.type === 'password' ? 'text' : 'password';
    }

    function saveCloudAndGeminiConfig() {
      const url = (document.getElementById('cloud-endpoint-input')?.value || '').trim();
      const apiKey = (document.getElementById('gemini-api-key-input')?.value || '').trim();
      const vidUrl = (document.getElementById('custom-gacha-video-url-input')?.value || '').trim();
      try {
        if (url) localStorage.setItem('hoa_ngu_cloud_url_v1', url);
        localStorage.setItem('hoa_ngu_gemini_api_key_v1', apiKey);
        if (vidUrl) localStorage.setItem('hoa_ngu_gacha_video_url_v1', vidUrl);
      } catch (e) {}
      updateGeminiStatusBadges();
      const statusEl = document.getElementById('cloud-sync-status');
      if (statusEl) {
        statusEl.textContent = `✅ Đã lưu cấu hình! ${url ? 'Link Cloud JSON đã sẵn sàng. ' : ''}${apiKey ? 'Khóa Gemini AI đã kích hoạt cho Phòng Chat Thực Chiến!' : 'Đã xóa/để trống khóa Gemini AI.'}`;
      }
      showToast('💾 Đã lưu cấu hình Link Cloud & Khóa Gemini AI!', 'success');
    }

    async function testGeminiApiConnection() {
      const apiKey = (document.getElementById('gemini-api-key-input')?.value || '').trim() || getStoredGeminiApiKey();
      const statusEl = document.getElementById('cloud-sync-status');
      if (!apiKey) {
        showToast('⚠️ Vui lòng dán Khóa Google Gemini API (AIzaSy...) vào ô trước khi bấm Test!', 'warn');
        return;
      }
      try { localStorage.setItem('hoa_ngu_gemini_api_key_v1', apiKey); } catch (e) {}
      updateGeminiStatusBadges();
      if (statusEl) statusEl.textContent = '⏳ Đang kiểm tra kết nối tới máy chủ Google Gemini AI...';
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Hãy trả lời ngắn gọn: 你好！Kết nối thành công.' }] }]
          })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '你好！';
        if (statusEl) statusEl.textContent = `🎉 Kết nối Gemini AI thành công! Phản hồi từ AI: "${reply.trim()}"`;
        showToast('🤖 Kết nối Google Gemini AI thành công! Bạn có thể chat tự do ở Tab 7.', 'success');
      } catch (err) {
        if (statusEl) statusEl.textContent = '💡 Đã lưu khóa API! (Lưu ý: Khung xem trước có thể chặn kết nối mạng ra ngoài, nhưng khi bạn mở trên web Vercel/Netlify của mình, khóa Gemini AI sẽ chạy trực tiếp 100%).';
        showToast('💾 Đã lưu khóa Gemini API! Hãy dùng trên web thật hoặc trải nghiệm kịch bản mẫu ngay.', 'info');
      }
    }

    function openCloudDeployModal() {
      const modal = document.getElementById('cloud-deploy-modal');
      if (!modal) return;
      modal.classList.remove('hidden');
      const snap = buildProgressSnapshot();
      const codeArea = document.getElementById('sync-code-textarea');
      if (codeArea) {
        try {
          codeArea.value = btoa(unescape(encodeURIComponent(JSON.stringify(snap))));
        } catch (e) {}
      }
      const keyInput = document.getElementById('gemini-api-key-input');
      if (keyInput) keyInput.value = getStoredGeminiApiKey();
      const urlInput = document.getElementById('cloud-endpoint-input');
      try {
        const savedUrl = localStorage.getItem('hoa_ngu_cloud_url_v1');
        if (urlInput && savedUrl) urlInput.value = savedUrl;
      } catch (e) {}
      updateGeminiStatusBadges();
    }

    function closeCloudDeployModal() {
      document.getElementById('cloud-deploy-modal')?.classList.add('hidden');
    }

    function exportProgressJson() {
      const snap = buildProgressSnapshot();
      const blob = new Blob([JSON.stringify(snap, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tien_do_hoa_ngu_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('📥 Đã tải file sao lưu tiến độ (.json) về máy!', 'success');
    }

    function triggerImportProgressFile() {
      document.getElementById('import-progress-file-input')?.click();
    }

    function handleImportProgressFile(event) {
      const file = event.target?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const parsed = JSON.parse(e.target.result);
          if (applyProgressSnapshot(parsed)) {
            showToast('🎉 Đã khôi phục toàn bộ tiến độ học tập từ file JSON!', 'success');
          }
        } catch (err) {
          showToast('⚠️ File JSON không hợp lệ, vui lòng kiểm tra lại.', 'warn');
        }
      };
      reader.readAsText(file);
    }

    function generateAndCopySyncCode() {
      const snap = buildProgressSnapshot();
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(snap))));
      const area = document.getElementById('sync-code-textarea');
      if (area) {
        area.value = encoded;
        area.select();
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(encoded).then(() => {
            showToast('📋 Đã tạo & sao chép Mã Đồng Bộ Tiến Độ!', 'success');
          });
          return;
        }
      } catch (e) {}
      document.execCommand('copy');
      showToast('📋 Đã tạo & sao chép Mã Đồng Bộ Tiến Độ!', 'success');
    }

    function restoreFromSyncCode() {
      const rawCode = (document.getElementById('sync-code-textarea')?.value || '').trim();
      if (!rawCode) {
        showToast('⚠️ Vui lòng dán Mã Đồng Bộ vào ô trước khi bấm Khôi phục!', 'warn');
        return;
      }
      try {
        const jsonStr = decodeURIComponent(escape(atob(rawCode)));
        const snap = JSON.parse(jsonStr);
        if (applyProgressSnapshot(snap)) {
          showToast('⚡ Đã đồng bộ thành công tiến độ từ mã chuyển thiết bị!', 'success');
        }
      } catch (err) {
        showToast('⚠️ Mã Đồng Bộ không đúng định dạng, vui lòng kiểm tra lại.', 'warn');
      }
    }

    async function pushProgressToCloud() {
      const url = (document.getElementById('cloud-endpoint-input')?.value || '').trim();
      const statusEl = document.getElementById('cloud-sync-status');
      if (!url) {
        showToast('⚠️ Vui lòng nhập URL Cloud Endpoint (VD: Firebase .json URL) trước!', 'warn');
        return;
      }
      try { localStorage.setItem('hoa_ngu_cloud_url_v1', url); } catch (e) {}
      if (statusEl) statusEl.textContent = '⏳ Đang đẩy dữ liệu tiến độ lên Cloud...';
      try {
        const snap = buildProgressSnapshot();
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(snap)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        if (statusEl) statusEl.textContent = `✅ Đã đồng bộ lên Cloud thành công lúc ${snap.lastSavedAt}!`;
        showToast('☁️ Đã lưu tiến độ lên Đám mây thành công!', 'success');
      } catch (err) {
        if (statusEl) statusEl.textContent = '⚠️ Không thể kết nối tới URL Cloud (do môi trường xem trước chặn mạng hoặc URL chưa bật CORS). Hãy dùng Mã Đồng Bộ hoặc File JSON nhé!';
        showToast('⚠️ Không thể kết nối Cloud URL từ khung xem trước này. Bạn có thể dùng khi chạy trên web thật!', 'warn');
      }
    }

    async function pullProgressFromCloud() {
      const url = (document.getElementById('cloud-endpoint-input')?.value || '').trim();
      const statusEl = document.getElementById('cloud-sync-status');
      if (!url) {
        showToast('⚠️ Vui lòng nhập URL Cloud Endpoint trước!', 'warn');
        return;
      }
      try { localStorage.setItem('hoa_ngu_cloud_url_v1', url); } catch (e) {}
      if (statusEl) statusEl.textContent = '⏳ Đang tải tiến độ từ Cloud về máy...';
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const snap = await res.json();
        if (applyProgressSnapshot(snap)) {
          if (statusEl) statusEl.textContent = `✅ Đã tải và cập nhật tiến độ từ Cloud (${snap.lastSavedAt || 'mới nhất'})!`;
          showToast('🔄 Đã đồng bộ tiến độ từ Cloud về máy!', 'success');
        }
      } catch (err) {
        if (statusEl) statusEl.textContent = '⚠️ Không tải được dữ liệu từ URL Cloud. Hãy kiểm tra lại đường dẫn hoặc dùng Mã Đồng Bộ.';
        showToast('⚠️ Không thể tải từ Cloud URL trong khung xem trước.', 'warn');
      }
    }

        // =========================================================================
    // 14. INITIALIZATION & GLOBAL REFRESH
    // =========================================================================
    // =========================================================================
    // 13C. GUIDED LEARNING PATHS CONTROLLER (HỌC CÓ HƯỚNG DẪN THEO MỤC ĐÍCH)
    // =========================================================================
    const GUIDED_GOALS_CONFIG = {
      SPEAKING: {
        name: '🗣️ Giao Tiếp & Phản Xạ Thực Tế',
        badge: 'Ưu tiên Nghe - Nói (80%)',
        recommendedLevel: 'ALL',
        lessonFocus: 'CONVERSATION',
        priorityTabs: ['roleplay', 'lessons', 'pinyin', 'arena'],
        optionalTabs: ['writing'],
        focusPoints: [
          'Luyện chuẩn <strong>Thanh mẫu, Vận mẫu & Quy tắc Biến điệu</strong> (Thanh 3, 一, 不) để nói tự nhiên không bị ngượng nghịu.',
          'Học trực tiếp qua <strong>Hội thoại thực tế</strong> trong Bài học: Bấm 🔊 nghe mẫu và <strong>nhại lại (Shadowing)</strong> theo tốc độ 1.0x → 1.2x.',
          'Luyện <strong>Ghép từ thành câu</strong> và <strong>Flashcard SRS (chỉ cần nhìn chữ đọc Pinyin + nghĩa)</strong> để phản xạ bật ra câu ngay.'
        ],
        skipPoints: [
          '<strong>Bỏ qua Tập viết chữ Hán bằng tay</strong> trên bảng Mễ Tự Cách (thời đại số chỉ cần nhận mặt chữ để gõ Pinyin).',
          '<strong>Bỏ qua học thuộc lòng 214 Bộ thủ chi tiết</strong> và các điển cố Cổ văn / Văn ngôn hàn lâm.',
          '<strong>Không sa đà vào bắt lỗi bệnh câu (病句)</strong> phức tạp của đề thi viết HSK 6–9.'
        ],
        steps: [
          { label: 'Bước 1: Chat WeChat & Nhại Âm 💬', action: "jumpToGuidedStep('roleplay', 'chat', null)" },
          { label: 'Bước 2: Luyện nói AI qua Micro 🎙️', action: "jumpToGuidedStep('arena', 'speech', null)" },
          { label: 'Bước 2: Chuẩn hóa Pinyin & Biến điệu', action: "jumpToGuidedStep('pinyin', 'tones', null)" },
          { label: 'Bước 3: Đọc truyện Popup tra từ 📖', action: "jumpToGuidedStep('arena', 'reader', null)" },
          { label: 'Bước 4: Lật thẻ SRS nhớ âm', action: "jumpToGuidedStep('writing', null, null)" }
        ]
      },
      HSK: {
        name: '🎓 Luyện Thi Chứng Chỉ HSK (1–6 & 7–9)',
        badge: 'Trọng tâm Từ vựng - Ngữ pháp - Giải đề',
        recommendedLevel: 'ALL',
        lessonFocus: 'GRAMMAR',
        priorityTabs: ['lessons', 'lexicon', 'arena', 'writing'],
        optionalTabs: [],
        focusPoints: [
          'Nắm chắc <strong>Cấu trúc ngữ pháp cốt lõi</strong>: Trật tự thời gian - địa điểm, Bổ ngữ kết quả/xu hướng/khả năng, Câu chữ 把/被 và Liên từ phức.',
          'Phân biệt kỹ <strong>10 cặp Từ cận nghĩa (近义词)</strong> hay bẫy trong đề thi (二 vs 两, 刚 vs 刚才, 通过 vs 经过, 截止 vs 截至, 以至 vs 以致).',
          'Cày <strong>Trắc nghiệm HSK, Sửa lỗi Bệnh câu (病句)</strong> và <strong>Ghép câu chuẩn trật tự</strong> tại Đấu trường.'
        ],
        skipPoints: [
          '<strong>Tạm gác lại thuật ngữ Ngoại thương / 1688 chuyên sâu</strong> nếu mục tiêu trước mắt là lấy bằng HSK 3–5.',
          '<strong>Không cần luyện viết thư pháp cầu kỳ từng chữ</strong> nếu bạn đăng ký thi HSK trên máy tính (gõ Pinyin và nhận diện mặt chữ là chính).'
        ],
        steps: [
          { label: 'Bước 1: Học Ngữ pháp trọng điểm', action: "jumpToGuidedStep('lessons', null, 'GRAMMAR')" },
          { label: 'Bước 2: Phân biệt Từ cận nghĩa', action: "jumpToGuidedStep('lexicon', 'synonyms', null)" },
          { label: 'Bước 3: Giải đề Trắc nghiệm & Bệnh câu', action: "jumpToGuidedStep('arena', 'quiz', null)" },
          { label: 'Bước 4: Ôn từ vựng qua thẻ SRS', action: "jumpToGuidedStep('writing', null, null)" }
        ]
      },
      BUSINESS: {
        name: '💼 Tiếng Trung Đi Làm, Thương Mại & Nguồn Hàng 1688',
        badge: 'Thực chiến Công sở & B2B',
        recommendedLevel: 'BIZ',
        lessonFocus: 'BUSINESS',
        priorityTabs: ['lessons', 'lexicon', 'arena'],
        optionalTabs: ['pinyin', 'writing'],
        focusPoints: [
          'Học thẳng <strong>Bài 12, 13, 14</strong>: Đàm phán hợp đồng ngoại thương (FOB, CIF, MOQ, L/C), Săn hàng Taobao/1688 (OEM, ODM, 拿样, 包邮) và Thuật ngữ AI/Công sở.',
          'Tra cứu nhanh và lưu vào Sổ tay nhóm <strong>Từ vựng Thương mại & Công nghệ</strong> trong Từ điển.',
          'Thực hành <strong>Phòng Luyện Dịch Thuật Thực Chiến (Việt ↔ Trung)</strong> để viết email, hợp đồng và chat WeChat chuyên nghiệp với đối tác.'
        ],
        skipPoints: [
          '<strong>Bỏ qua Bát pháp Vĩnh Tự & Tập viết tay từng nét</strong> (đi làm thực tế 100% dùng bộ gõ Pinyin trên máy tính và WeChat).',
          '<strong>Bỏ qua các câu đố mẹo ngữ pháp hàn lâm</strong> không dùng trong giao dịch thương mại.'
        ],
        steps: [
          { label: 'Bước 1: Học bài Đàm phán & 1688', action: "jumpToGuidedStep('lessons', null, 'BUSINESS')" },
          { label: 'Bước 2: Thực hành Gõ Pinyin Văn phòng ⌨️', action: "jumpToGuidedStep('arena', 'ime', null)" },
          { label: 'Bước 3: Đọc bản tin & B2B Reader 📖', action: "jumpToGuidedStep('arena', 'reader', null)" },
          { label: 'Bước 4: Luyện dịch Hợp đồng B2B', action: "jumpToGuidedStep('arena', 'translation', null)" }
        ]
      },
      CLASSICAL: {
        name: '🐉 Cổ Văn, Thành Ngữ & Dịch Thuật Kỳ Cựu (HSK 7–9)',
        badge: 'Tinh hoa Học thuật & Văn chương',
        recommendedLevel: 'LVL4',
        lessonFocus: 'CLASSICAL',
        priorityTabs: ['lessons', 'lexicon', 'writing', 'arena'],
        optionalTabs: [],
        focusPoints: [
          'Nghiên cứu <strong>Hư từ Văn ngôn (之, 乎, 者, 也, 以, 而, 唯其…方能…)</strong> qua Luận Ngữ và Binh pháp Tôn Tử (Bài 10 & Bài 11).',
          'Nắm rõ điển cố lịch sử, nghĩa đen và nghĩa bóng trong <strong>Tàng Kinh Các (Thành ngữ 4 chữ 四字格)</strong>.',
          'Luyện <strong>Thư pháp Mễ Tự Cách</strong>, chiết tự 214 Bộ thủ Khang Hy và <strong>Dịch thuật chuẩn Tín - Đạt - Nhã</strong>.'
        ],
        skipPoints: [
          '<strong>Bỏ qua các bài hội thoại sơ cấp</strong> nếu bạn đã nắm vững nền tảng HSK 4–5 trở lên.'
        ],
        steps: [
          { label: 'Bước 1: Học Cổ văn & Binh pháp', action: "jumpToGuidedStep('lessons', null, 'CLASSICAL')" },
          { label: 'Bước 2: Tàng Kinh Các (Thành ngữ)', action: "jumpToGuidedStep('lexicon', 'chengyu', null)" },
          { label: 'Bước 3: Luyện dịch Tín - Đạt - Nhã', action: "jumpToGuidedStep('arena', 'translation', null)" },
          { label: 'Bước 4: Thư pháp Mễ Tự Cách', action: "jumpToGuidedStep('writing', null, null)" }
        ]
      },
      ALL: {
        name: '🌟 Lộ Trình Toàn Diện 4 Kỹ Năng (Nghe - Nói - Đọc - Viết)',
        badge: 'Toàn bộ hệ sinh thái',
        recommendedLevel: 'ALL',
        lessonFocus: 'ALL',
        priorityTabs: ['lessons', 'pinyin', 'lexicon', 'writing', 'arena', 'dashboard'],
        optionalTabs: [],
        focusPoints: [
          'Đi tuần tự từ <strong>Bài 01 (Nhập môn Pinyin & Nét chữ)</strong> đến <strong>Bài 14 (Kỳ cựu & Chuyên ngành)</strong>.',
          'Kết hợp học lý thuyết ở Tab 1–3 với <strong>Luyện viết Mễ Tự Cách + Thẻ SRS (Tab 4)</strong> và <strong>Làm bài tập (Tab 5)</strong>.'
        ],
        skipPoints: [
          'Nếu bạn chỉ cần học nhanh để <strong>Giao tiếp</strong> hoặc <strong>Đi làm buôn bán</strong>, hãy bấm chọn mục đích tương ứng ở thanh phía trên để hệ thống lọc gọn nội dung cho bạn!'
        ],
        steps: [
          { label: 'Bước 1: Làm Test Xếp Lớp (6 câu)', action: "openPlacementModal()" },
          { label: 'Bước 2: Học Bài học theo cấp độ', action: "jumpToGuidedStep('lessons', null, 'ALL')" },
          { label: 'Bước 3: Xem Lộ trình & Sổ tay', action: "jumpToGuidedStep('dashboard', null, null)" }
        ]
      }
    };

    function selectGuidedGoal(goalKey) {
      if (!GUIDED_GOALS_CONFIG[goalKey]) goalKey = 'ALL';
      APP_STATE.guidedGoal = goalKey;
      APP_STATE.forceShowWritingCanvas = false;
      const cfg = GUIDED_GOALS_CONFIG[goalKey];

      // Sync lesson focus filter & global level automatically to guide the user
      const fFocus = document.getElementById('filter-lesson-focus');
      if (fFocus && cfg.lessonFocus) {
        fFocus.value = cfg.lessonFocus;
      }
      if (goalKey === 'BUSINESS') {
        APP_STATE.globalLevel = 'BIZ';
      } else if (goalKey === 'CLASSICAL') {
        APP_STATE.globalLevel = 'LVL4';
      } else if (goalKey === 'ALL' || goalKey === 'SPEAKING' || goalKey === 'HSK') {
        APP_STATE.globalLevel = 'ALL';
      }

      // Update level pill UI
      const pills = document.querySelectorAll('.level-pill');
      pills.forEach(btn => {
        const isCurrent = btn.getAttribute('data-level') === APP_STATE.globalLevel;
        btn.className = isCurrent
          ? 'level-pill px-3 py-2 rounded-xl text-left border transition bg-stone-900 text-white border-stone-900 shadow-sm'
          : 'level-pill px-3 py-2 rounded-xl text-left border transition bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200';
      });

      saveAppState();
      refreshAllViews();
      showToast(`🧭 Đã kích hoạt hướng dẫn: ${cfg.name}`, 'success');
    }

    function toggleGuidedCompassDetails() {
      APP_STATE.compassExpanded = !APP_STATE.compassExpanded;
      renderGuidedCompass();
    }

    function toggleForceShowWritingCanvas() {
      APP_STATE.forceShowWritingCanvas = !APP_STATE.forceShowWritingCanvas;
      applyGuidedModeToWritingTab();
      setTimeout(() => redrawHanziCanvas(), 40);
    }

    function jumpToGuidedStep(mainTab, subTab, focusOrDomain) {
      if (focusOrDomain && mainTab === 'lessons') {
        const fFocus = document.getElementById('filter-lesson-focus');
        if (fFocus) fFocus.value = focusOrDomain;
        renderLessonList();
      }
      switchMainTab(mainTab);
      if (mainTab === 'pinyin' && subTab) {
        switchPinyinSubtab(subTab);
      } else if (mainTab === 'lexicon' && subTab) {
        switchLexiconSubtab(subTab);
        if (subTab === 'vocab' && focusOrDomain) {
          const domSel = document.getElementById('filter-vocab-domain');
          if (domSel) domSel.value = focusOrDomain;
          renderVocabVault();
        }
      } else if (mainTab === 'arena' && subTab) {
        switchArenaMode(subTab);
      } else if (mainTab === 'roleplay' && subTab) {
        switchRoleplaySubtab(subTab);
      }
    }

    function applyGuidedModeToWritingTab() {
      const notice = document.getElementById('writing-guided-notice');
      const canvasCard = document.getElementById('hanzi-canvas-card-wrapper');
      const srsCol = document.getElementById('srs-card-column-wrapper');
      const btnForce = document.getElementById('btn-force-show-canvas');
      if (!notice || !canvasCard || !srsCol) return;

      if (APP_STATE.guidedGoal === 'SPEAKING') {
        notice.classList.remove('hidden');
        if (APP_STATE.forceShowWritingCanvas) {
          canvasCard.classList.remove('hidden');
          srsCol.className = 'lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-4';
          if (btnForce) btnForce.textContent = '🙈 Ẩn Bảng Tập Viết (Tập trung Nghe - Nói)';
        } else {
          canvasCard.classList.add('hidden');
          srsCol.className = 'lg:col-span-12 max-w-3xl mx-auto w-full bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-4';
          if (btnForce) btnForce.textContent = '🖌️ Vẫn mở Bảng Tập Viết';
        }
      } else {
        notice.classList.add('hidden');
        canvasCard.classList.remove('hidden');
        srsCol.className = 'lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-4';
      }
    }

    function updateNavBadgesForGuidedGoal() {
      const cfg = GUIDED_GOALS_CONFIG[APP_STATE.guidedGoal] || GUIDED_GOALS_CONFIG.ALL;
      const baseLabels = {
        lessons: '📚 1. Bài Học Chuyên Sâu',
        pinyin: '🎵 2. Pinyin, Biến Điệu & 214 Bộ Thủ',
        lexicon: '🏛️ 3. Từ Điển, Thành Ngữ & Từ Cận Nghĩa',
        writing: APP_STATE.guidedGoal === 'SPEAKING' ? '🗂️ 4. Flashcard Phản Xạ SRS (Đã ẩn Viết tay)' : '🖌️ 4. Tập Viết Chữ Hán & Flashcard SRS',
        arena: '⚔️ 5. Luyện Đề, Ghép Câu & Dịch Thuật',
        dashboard: '📊 6. Sổ Tay & Lộ Trình Cá Nhân',
        roleplay: '💬 7. Chat Thực Chiến & Nhại Âm'
      };

      Object.keys(baseLabels).forEach(tabKey => {
        const btn = document.getElementById(`nav-${tabKey}`);
        if (!btn) return;
        let badgeHtml = '';
        if (APP_STATE.guidedGoal !== 'ALL') {
          if (cfg.priorityTabs.includes(tabKey)) {
            badgeHtml = `<span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-stone-950 font-extrabold">Trọng tâm</span>`;
          } else if (cfg.optionalTabs.includes(tabKey)) {
            badgeHtml = `<span class="text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-600 font-normal">Phụ trợ</span>`;
          }
        }
        btn.innerHTML = `<span>${baseLabels[tabKey]}</span>${badgeHtml}`;
      });
    }

    function renderGuidedCompass() {
      const goalKey = APP_STATE.guidedGoal || 'ALL';
      const cfg = GUIDED_GOALS_CONFIG[goalKey] || GUIDED_GOALS_CONFIG.ALL;

      // Highlight selected pill
      const pills = document.querySelectorAll('.guided-goal-pill');
      pills.forEach(p => {
        const g = p.getAttribute('data-goal');
        if (g === goalKey) {
          p.className = 'guided-goal-pill p-2.5 rounded-xl text-left border-2 transition bg-stone-900 text-white border-vermilion-500 shadow-md';
          p.querySelectorAll('span, div').forEach(el => {
            if (el.classList.contains('text-stone-600')) {
              el.classList.remove('text-stone-600');
              el.classList.add('text-stone-200');
            }
          });
        } else {
          p.className = 'guided-goal-pill p-2.5 rounded-xl text-left border transition bg-white hover:bg-amber-50/70 border-stone-200 shadow-sm text-stone-900';
        }
      });

      const compassBox = document.getElementById('guided-compass-box');
      const toggleBtn = document.getElementById('btn-toggle-compass');
      if (!compassBox) return;

      if (!APP_STATE.compassExpanded) {
        compassBox.classList.add('hidden');
        if (toggleBtn) toggleBtn.textContent = 'Mở bảng chỉ dẫn học tập ▾';
        return;
      }
      compassBox.classList.remove('hidden');
      if (toggleBtn) toggleBtn.textContent = 'Thu gọn bảng chỉ dẫn ▴';

      compassBox.innerHTML = `
        <div class="space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="text-xs sm:text-sm font-extrabold text-stone-900">🗺️ Chỉ Dẫn Lộ Trình Cho Mục Tiêu: <span class="text-vermilion-700">${cfg.name}</span></span>
            </div>
            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">${cfg.badge}</span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs">
            <!-- What to focus on -->
            <div class="lg:col-span-5 bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 space-y-1.5">
              <div class="font-extrabold text-emerald-900 flex items-center gap-1.5">
                <span>✅ NÊN TẬP TRUNG TUYỆT ĐỐI (80% THỜI GIAN):</span>
              </div>
              <ul class="space-y-1 text-stone-700 list-disc list-inside leading-relaxed">
                ${cfg.focusPoints.map(fp => `<li>${fp}</li>`).join('')}
              </ul>
            </div>

            <!-- What to skip -->
            <div class="lg:col-span-4 bg-rose-50/70 border border-rose-200 rounded-xl p-3 space-y-1.5">
              <div class="font-extrabold text-rose-900 flex items-center gap-1.5">
                <span>⏭️ NÊN LƯỢC BỎ / GIẢM TẢI (TRÁNH LAN MAN):</span>
              </div>
              <ul class="space-y-1 text-stone-700 list-disc list-inside leading-relaxed">
                ${cfg.skipPoints.map(sp => `<li>${sp}</li>`).join('')}
              </ul>
            </div>

            <!-- Direct Action Steps -->
            <div class="lg:col-span-3 bg-stone-900 text-white rounded-xl p-3 flex flex-col justify-between gap-2">
              <div class="font-bold text-amber-300 text-xs">⚡ Bắt đầu học ngay theo thứ tự:</div>
              <div class="space-y-1.5">
                ${cfg.steps.map(st => `
                  <button type="button" onclick="${st.action}" class="w-full text-left px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-vermilion-600 text-stone-100 hover:text-white text-[11px] font-bold transition flex items-center justify-between">
                    <span>${st.label}</span>
                    <span>➔</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      updateNavBadgesForGuidedGoal();
      applyGuidedModeToWritingTab();
    }

    // =========================================================================
    // 13D. TAB 7 CONTROLLER: WECHAT AI ROLEPLAY & SHADOWING KARAOKE STUDIO
    // =========================================================================
    const ROLEPLAY_SCENARIOS = [
      {
        id: 'SC_1688',
        avatar: '🏭',
        name: 'Trần Tổng (陈总 — Chủ Xưởng Điện Tử Thâm Quyến)',
        subtitle: 'WeChat B2B • Đàm phán giá sỉ, MOQ & OEM 1688',
        levelBadge: 'Thương Mại & Giao Tiếp',
        mission: 'Hỏi xem mẫu tai nghe Bluetooth có sẵn hàng (现货) không, số lượng đặt tối thiểu (起订量 MOQ) là bao nhiêu và mặc cả giảm giá nếu đặt 500 chiếc.',
        systemPrompt: 'Bạn là Trần Tổng (陈总), chủ xưởng sản xuất tai nghe Bluetooth tại Thâm Quyến trên 1688. Hãy trò chuyện ngắn gọn, tự nhiên như chat WeChat với khách mua hàng Việt Nam.',
        initialMessages: [
          {
            sender: 'partner',
            simp: '老板您好！欢迎光临我们深圳源头工厂，请问您看中哪款产品？',
            trad: '老闆您好！歡迎光臨我們深圳源頭工廠，請問您看中哪款產品？',
            py: 'Lǎobǎn nínhǎo! Huānyíng guānglín wǒmen Shēnzhèn yuántóu gōngchǎng, qǐngwèn nín kànzhòng nǎ kuǎn chǎnpǐn?',
            hv: 'Lão bản nẫm hảo! Hoan nghênh quang lâm ngã môn Thâm Quyến nguyên đầu công xưởng, thỉnh vấn nẫm khán trúng na khoản sản phẩm?',
            vi: 'Chào sếp! Chào mừng đến với xưởng gốc Thâm Quyến của chúng tôi, xin hỏi bạn đang quan tâm mẫu sản phẩm nào?'
          }
        ],
        turns: [
          {
            quickReplies: [
              { simp: '陈总好，这款蓝牙耳机有现货吗？起订量是多少？', trad: '陳總好，這款藍牙耳機有現貨嗎？起訂量是多少？', py: 'Chén zǒng hǎo, zhè kuǎn lányá ěrjī yǒu xiànhuò ma? Qǐdìngliàng shì duōshao?', vi: 'Chào sếp Trần, mẫu tai nghe này có sẵn hàng không? MOQ là bao nhiêu?' },
              { simp: '我想先拿两个样品看看质量，包邮吗？', trad: '我想先拿兩個樣品看看質量，包郵嗎？', py: 'Wǒ xiǎng xiān ná liǎng gè yàngpǐn kànkan zhìliàng, bāoyóu ma?', vi: 'Tôi muốn lấy trước 2 cái mẫu xem chất lượng, có freeship không?' },
              { simp: '请发给我最新的FOB报价单，谢谢！', trad: '請發給我最新的FOB報價單，謝謝！', py: 'Qǐng fā gěi wǒ zuìxīn de FOB bàojiàdān, xièxie!', vi: 'Vui lòng gửi cho tôi bảng báo giá FOB mới nhất, cảm ơn!' }
            ],
            partnerReply: {
              simp: '这款目前有大量现货！常规起订量是200个，批发价每个35元。如果您今天下单拿样，我们给您包邮到广州仓！',
              trad: '這款目前有大量現貨！常規起訂量是200個，批發價每個35元。如果您今天下單拿樣，我們給您包郵到廣州倉！',
              py: 'Zhè kuǎn mùqián yǒu dàliàng xiànhuò! Chángguī qǐdìngliàng shì 200 gè, pīfājià měi gè 35 yuán. Rúguǒ nín jīntiān xiàdān náyàng, wǒmen gěi nín bāoyóu dào Guǎngzhōu cāng!',
              hv: 'Giá khoản mục tiền hữu đại lượng hiện hóa! Thường quy khởi đính lượng thị 200 cá...',
              vi: 'Mẫu này hiện có sẵn số lượng lớn! MOQ thông thường là 200 chiếc, giá sỉ 35 tệ/chiếc. Nếu hôm nay bạn lên đơn lấy mẫu, xưởng bao phí ship tới kho Quảng Châu cho bạn!',
              coachTip: '💡 Mẹo phản xạ B2B: Khi xưởng báo giá 35 tệ với MOQ 200, hãy thử nâng số lượng lên 500 chiếc và đề nghị in logo riêng (定制LOGO) để ép giá xuống!'
            }
          },
          {
            quickReplies: [
              { simp: '如果我订500个，可以便宜一点吗？支持定制LOGO吗？', trad: '如果我訂500個，可以便宜一點嗎？支持定制LOGO嗎？', py: 'Rúguǒ wǒ dìng 500 gè, kěyǐ piányi yìdiǎn ma? Zhīchí dìngzhì LOGO ma?', vi: 'Nếu tôi đặt 500 cái thì giảm giá thêm được không? Có hỗ trợ in logo riêng không?' },
              { simp: '交货期大概需要多少天？能准时发货吗？', trad: '交貨期大概需要多少天？能準時發貨嗎？', py: 'Jiāohuòqī dàgài xūyào duōshao tiān? Néng zhǔnshí fāhuò ma?', vi: 'Thời gian giao hàng mất khoảng bao nhiêu ngày? Có giao đúng hẹn được không?' },
              { simp: '好的，那我先拍两个样品测试一下音质。', trad: '好的，那我先拍兩個樣品測試一下音質。', py: 'Hǎo de, nà wǒ xiān pāi liǎng gè yàngpǐn cèshì yíxià yīnzhì.', vi: 'Ok, vậy tôi đặt trước 2 mẫu để test chất lượng âm thanh.' }
            ],
            partnerReply: {
              simp: '没问题！既然您诚心合作，500个我们按31元给您，免费激光雕刻您的品牌LOGO，3天内准时发货！我现在拟合同发您确认 nhé！',
              trad: '沒問題！既然您誠心合作，500個我們按31元給您，免費激光雕刻您的品牌LOGO，3天內準時發貨！我現在擬合同發您確認！',
              py: 'Méi wèntí! Jìrán nín chéngxīn hézuò, 500 gè wǒmen àn 31 yuán gěi nín, miǎnfèi jīguāng diāokè nín de pǐnpái LOGO, 3 tiān nèi zhǔnshí fāhuò!',
              hv: 'Mộ vấn đề! Ký nhiên nẫm thành tâm hợp tác...',
              vi: 'Không thành vấn đề! Đã là đối tác thiện chí, 500 cái xưởng tính giá 31 tệ, khắc laser miễn phí logo thương hiệu của bạn, giao hàng đúng hẹn trong 3 ngày!',
              coachTip: '🎉 Xuất sắc! Bạn đã dùng cấu trúc "如果…可以…吗" và thuật ngữ "定制LOGO" cực kỳ tự nhiên như dân buôn chuyên nghiệp!'
            }
          },
          {
            quickReplies: [
              { simp: '发货前请帮我仔细检查质量，不要有次品哦！', trad: '發貨前請幫我仔細檢查質量，不要有次品哦！', py: 'Fāhuò qián qǐng bāng wǒ zǐxì jiǎnchá zhìliàng, búyào yǒu cìpǐn o!', vi: 'Trước khi xuất hàng nhớ kiểm tra kỹ chất lượng giúp tôi, đừng để có hàng lỗi nhé!' },
              { simp: '我先付30%定金，尾款发货前付清可以吗？', trad: '我先付30%定金，尾款發貨前付清可以嗎？', py: 'Wǒ xiān fù 30% dìngjīn, wěikuǎn fāhuò qián fùqīng kěyǐ ma?', vi: 'Tôi cọc trước 30%, khoản còn lại thanh toán đủ trước khi xuất hàng được không?' },
              { simp: '请把货物发到我们在广州白云区的越南物流仓。', trad: '請把貨物發到我們在廣州白雲區的越南物流倉。', py: 'Qǐng bǎ huòwù fā dào wǒmen zài Guǎngzhōu Báiyúnqū de Yuènán wùliúcāng.', vi: 'Hãy gửi hàng tới kho logistics Việt Nam của chúng tôi ở quận Bạch Vân, Quảng Châu.' }
            ],
            partnerReply: {
              simp: '放心吧老板！我们质检部门会100%全检。支持30%定金，货到广州白云仓后我马上拍视频和运单号发给您，祝我们合作愉快，大卖发财！',
              trad: '放心吧老闆！我們質檢部門會100%全檢。支持30%定金，貨到廣州白雲倉後我馬上拍視頻和運單號發給您，祝我們合作愉快，大賣發財！',
              py: 'Fàngxīn ba lǎobǎn! Wǒmen zhìjiǎn bùmén huì 100% quánjiǎn. Zhīchí 30% dìngjīn... Zhù wǒmen hézuò yúkuài, dàmài fācái!',
              hv: 'Phóng tâm ba lão bản! Ngã môn chất kiểm bộ môn hội 100% toàn kiểm...',
              vi: 'Yên tâm đi sếp! Bộ phận QC của xưởng sẽ kiểm 100% hàng. Đồng ý cọc 30%, hàng tới kho Bạch Vân Quảng Châu tôi sẽ quay video và chụp mã vận đơn gửi ngay. Chúc hợp tác vui vẻ, buôn may bán đắt!',
              coachTip: '🏆 Hoàn tất đàm phán đơn hàng 1688! Bạn đã nắm trọn bộ từ khóa vàng: 现货 (hàng sẵn), 起订量 (MOQ), 定制LOGO, 定金 (tiền cọc), 尾款 (khoản còn lại) và 物流仓 (kho vận chuyển)!'
            }
          }
        ]
      },
      {
        id: 'SC_FRIEND',
        avatar: '🧋',
        name: 'Tiểu Mỹ (小美 — Bạn Thân Ở Bắc Kinh)',
        subtitle: 'WeChat Đời sống • Hẹn đi ăn lẩu & Tám chuyện cuối tuần',
        levelBadge: 'Giao Tiếp Phản Xạ',
        mission: 'Hỏi thăm công việc của Tiểu Mỹ tuần này có bận không, chốt giờ hẹn đi ăn lẩu Tứ Xuyên và uống trà sữa chiều thứ Bảy.',
        systemPrompt: 'Bạn là Tiểu Mỹ (小美), một người bạn trẻ vui tính ở Bắc Kinh. Hãy nói chuyện thân mật, tự nhiên, dùng khẩu ngữ đời sống.',
        initialMessages: [
          {
            sender: 'partner',
            simp: '嘿！好久不见，这周工作忙不忙？周末咱们出去聚一聚吧！',
            trad: '嘿！好久不見，這週工作忙不忙？週末咱們出去聚一聚吧！',
            py: 'Hēi! Hǎojiǔ bújiàn, zhè zhōu gōngzuò máng bu máng? Zhōumò zánmen chūqù jù yi jù ba!',
            hv: 'Hắc! Hảo cửu bất kiến, giá chu công tác mang bất mang? Chu mạt tản môn xuất khứ tụ nhất tụ ba!',
            vi: 'Này! Lâu rồi không gặp, tuần này công việc có bận không? Cuối tuần tụi mình ra ngoài tụ tập một bữa đi!'
          }
        ],
        turns: [
          {
            quickReplies: [
              { simp: '这周挺忙的，天天加班！周六下午我们去吃四川火锅怎么样？', trad: '這週挺忙的，天天加班！週六下午我們去吃四川火鍋怎麼樣？', py: 'Zhè zhōu tǐng máng de, tiāntiān jiābān! Zhōuliù xiàwǔ wǒmen qù chī Sìchuān huǒguō zěnmeyàng?', vi: 'Tuần này khá bận, tăng ca suốt! Chiều thứ Bảy tụi mình đi ăn lẩu Tứ Xuyên nhé?' },
              { simp: '我不忙，刚把项目做完。你想去哪里玩？', trad: '我不忙，剛把項目做完。你想去哪裡玩？', py: 'Wǒ bù máng, gāng bǎ xiàngmù zuò wán. Nǐ xiǎng qù nǎlǐ wán?', vi: 'Mình không bận, vừa làm xong dự án rồi. Cậu muốn đi đâu chơi?' },
              { simp: '太好了！我也正想找你喝奶茶聊天呢。', trad: '太好了！我也正想找你喝奶茶聊天呢。', py: 'Tài hǎo le! Wǒ yě zhèng xiǎng zhǎo nǐ hē nǎichá liáotiān ne.', vi: 'Tuyệt quá! Mình cũng đang tính rủ cậu đi uống trà sữa tám chuyện đây.' }
            ],
            partnerReply: {
              simp: '哈哈，太懂我了！我也超级想吃麻辣火锅！那周六下午六点，我们在三里屯地铁站见面吧，别迟到哦！',
              trad: '哈哈，太懂我了！我也超級想吃麻辣火鍋！那週六下午六點，我們在三里屯地鐵站見面吧，別遲到哦！',
              py: 'Hāhā, tài dǒng wǒ le! Wǒ yě chāojí xiǎng chī málà huǒguō! Nà zhōuliù xiàwǔ liù diǎn, wǒmen zài Sānlǐtún dìtiězhàn jiànmiàn ba, bié chídào o!',
              hv: 'Ha ha, thái đổng ngã liễu! Ngã dã siêu cấp tưởng ngật ma lạt hỏa oa...',
              vi: 'Haha, hiểu ý mình quá trời! Mình cũng siêu thèm lẩu cay tê! Vậy 6 giờ chiều thứ Bảy gặp nhau ở ga tàu điện ngầm Tam Lý Đồn nhé, đừng đến muộn nha!',
              coachTip: '💡 Mẹo khẩu ngữ: Cụm "挺忙的 (tǐng máng de - khá là bận)" và "……怎么样？(...thế nào?)" dùng cực kỳ phổ biến khi rủ bạn bè!'
            }
          },
          {
            quickReplies: [
              { simp: '一言为定！我一定准时到，到时候见！', trad: '一言為定！我一定準時到，到時候見！', py: 'Yìyán-wéidìng! Wǒ yídìng zhǔnshí dào, dào shíhou jiàn!', vi: 'Chốt lời nhé! Mình nhất định đến đúng giờ, hẹn gặp lúc đó nha!' },
              { simp: '没问题，我先把位置预订好，周六见！', trad: '沒問題，我先把位置預訂好，週六見！', py: 'Méi wèntí, wǒ xiān bǎ wèizhì yùdìng hǎo, zhōuliù jiàn!', vi: 'Không vấn đề, để mình đặt bàn trước luôn, hẹn thứ Bảy nhé!' },
              { simp: '好的，吃完火锅我请你喝珍珠奶茶！', trad: '好的，吃完火鍋我請你喝珍珠奶茶！', py: 'Hǎo de, chī wán huǒguō wǒ qǐng nǐ hē zhēnzhū nǎichá!', vi: 'Ok luôn, ăn lẩu xong mình mời cậu uống trà sữa trân châu!' }
            ],
            partnerReply: {
              simp: '耶！你最好了，那我先把肚子留着，周六不见不散！',
              trad: '耶！你最好了，那我先把肚子留著，週六不見不散！',
              py: 'Yē! Nǐ zuì hǎo le, nà wǒ xiān bǎ dùzi liúzhe, zhōuliù bújiàn-búsàn!',
              hv: 'Gia! Nhĩ tối hảo liễu, na ngã tiên bả đỗ tử lưu trước, chu lục bất kiến bất tán!',
              vi: 'Yeah! Cậu tuyệt nhất luôn, vậy mình để dành bụng từ bây giờ, thứ Bảy không gặp không về (bất kiến bất tán) nhé!',
              coachTip: '🌟 Thành ngữ giao tiếp: "一言为定 (Nhất ngôn vi định - Một lời đã chốt)" và "不见不散 (Bất kiến bất tán - Không gặp không về)" giúp câu nói của bạn tự nhiên 100%!'
            }
          }
        ]
      },
      {
        id: 'SC_RESTAURANT',
        avatar: '🍲',
        name: 'Ông Chủ Trương (张老板 — Quán Lẩu Thành Đô)',
        subtitle: 'Tình huống Du lịch & Gọi món • Phản xạ nhà hàng',
        levelBadge: 'Du Lịch & Đời Sống',
        mission: 'Đặt bàn cho 2 người, gọi nồi lẩu uyên ương (1 bên cay 1 bên không cay), thịt bò thái lát và tính tiền qua WeChat.',
        systemPrompt: 'Bạn là Ông chủ Trương nhiệt tình của quán lẩu Tứ Xuyên ở Thành Đô. Hãy phục vụ khách hàng thân thiện, ngắn gọn.',
        initialMessages: [
          {
            sender: 'partner',
            simp: '欢迎光临老成都火锅店！请问今天几位用餐？有预订吗？',
            trad: '歡迎光臨老成都火鍋店！請問今天幾位用餐？有預訂嗎？',
            py: 'Huānyíng guānglín Lǎo Chéngdū huǒguōdiàn! Qǐngwèn jīntiān jǐ wèi yòngcān? Yǒu yùdìng ma?',
            hv: 'Hoan nghênh quang lâm Lão Thành Đô hỏa oa điếm! Thỉnh vấn kim thiên kỷ vị dụng xan? Hữu dự đính ma?',
            vi: 'Chào mừng quý khách đến quán lẩu Lão Thành Đô! Xin hỏi hôm nay mình đi mấy người ạ? Đã đặt bàn trước chưa?'
          }
        ],
        turns: [
          {
            quickReplies: [
              { simp: '我们两位，没有预订。请问现在还有靠窗的座位吗？', trad: '我們兩位，沒有預訂。請問現在還有靠窗的座位嗎？', py: 'Wǒmen liǎng wèi, méiyǒu yùdìng. Qǐngwèn xiànzài hái yǒu kàochuāng de zuòwèi ma?', vi: 'Chúng tôi đi 2 người, chưa đặt trước. Cho hỏi còn bàn cạnh cửa sổ không?' },
              { simp: '老板好，我们两个人，要一个鸳鸯锅，微辣就可以。', trad: '老闆好，我們兩個人，要一個鴛鴦鍋，微辣就可以。', py: 'Lǎobǎn hǎo, wǒmen liǎng gè rén, yào yí gè yuānyāngguō, wēilà jiù kěyǐ.', vi: 'Chào ông chủ, tụi tôi đi 2 người, cho 1 nồi lẩu uyên ương cay nhẹ thôi.' },
              { simp: '我已经用手机预订了六点的位置，姓阮。', trad: '我已經用手機預訂了六點的位置，姓阮。', py: 'Wǒ yǐjīng yòng shǒujī yùdìng le liù diǎn de wèizhì, xìng Ruǎn.', vi: 'Tôi đã đặt bàn lúc 6 giờ qua điện thoại rồi, tôi họ Nguyễn.' }
            ],
            partnerReply: {
              simp: '好的两位里面请！正好有一张靠窗的桌子。锅底要招牌麻辣锅还是鸳鸯锅？肥牛和毛肚要来一份吗？',
              trad: '好的兩位裡面請！正好有一張靠窗的桌子。鍋底要招牌麻辣鍋還是鴛鴦鍋？肥牛和毛肚要來一份嗎？',
              py: 'Hǎo de liǎng wèi lǐmiàn qǐng! Zhènghǎo yǒu yì zhāng kàochuāng de zhuōzi. Guōdǐ yào zhāopái málàguō háishì yuānyāngguō? Féiniú hé máodǔ yào lái yí fèn ma?',
              hv: 'Hảo đích lưỡng vị lý diện thỉnh! Chính hảo hữu nhất trương kháo song đích trác tử...',
              vi: 'Dạ mời 2 vị vào trong! Vừa khéo còn 1 bàn sát cửa sổ. Nước lẩu mình chọn lẩu cay đặc trưng hay lẩu uyên ương 2 ngăn? Có gọi thêm bò ba chỉ và sách bò không ạ?',
              coachTip: '💡 Lưu ý số đếm: Khi nói "2 người / 2 vị", luôn dùng "两位 (liǎng wèi)" hoặc "两个人", tuyệt đối không dùng "二位" trong giao tiếp hàng ngày!'
            }
          }
        ]
      }
    ];

    const SHADOWING_TRACKS = [
      {
        id: 'SH01',
        level: 'LVL0',
        title: 'Nhịp 1: Phản xạ Chào hỏi & Làm quen tự nhiên',
        speedHint: 'Nhịp vừa phải • Chú ý biến điệu 3 chữ thanh 3 liên tiếp',
        vi: 'Rất vui được quen biết bạn, sau này mong được chỉ giáo nhiều hơn!',
        segments: [
          { s: '很高兴', t: '很高興', py: 'Hěn gāoxìng' },
          { s: '认识你，', t: '認識你，', py: 'rènshi nǐ,' },
          { s: '以后', t: '以後', py: 'yǐhòu' },
          { s: '请多关照！', t: '請多關照！', py: 'qǐng duō guānzhào!' }
        ]
      },
      {
        id: 'SH02',
        level: 'LVL2',
        title: 'Nhịp 2: Giao tiếp Công sở & Báo cáo tiến độ',
        speedHint: 'Nhịp dứt khoát • Nhấn mạnh cấu trúc 把 và bổ ngữ kết quả 完',
        vi: 'Trước khi tan làm hôm nay, tôi nhất định sẽ gửi bản kế hoạch cho ngài.',
        segments: [
          { s: '今天下班前，', t: '今天下班前，', py: 'Jīntiān xiàbān qián,' },
          { s: '我一定', t: '我一定', py: 'wǒ yídìng' },
          { s: '把方案', t: '把方案', py: 'bǎ fāng’àn' },
          { s: '发给您。', t: '發給您。', py: 'fā gěi nín.' }
        ]
      },
      {
        id: 'SH03',
        level: 'BIZ',
        title: 'Nhịp 3: Đàm phán Giá sỉ & Chất lượng với Xưởng 1688',
        speedHint: 'Giọng thương lượng tự tin • Ngắt nhịp rõ sau mệnh đề 如果',
        vi: 'Nếu chất lượng hàng mẫu ổn định, tháng sau chúng tôi sẽ đặt đơn lớn.',
        segments: [
          { s: '如果', t: '如果', py: 'Rúguǒ' },
          { s: '样品质量', t: '樣品品質', py: 'yàngpǐn zhìliàng' },
          { s: '稳定的话，', t: '穩定的話，', py: 'wěndìng de huà,' },
          { s: '下个月', t: '下個月', py: 'xià gè yuè' },
          { s: '我们就下大单！', t: '我們就下大單！', py: 'wǒmen jiù xià dà dān!' }
        ]
      },
      {
        id: 'SH04',
        level: 'LVL4',
        title: 'Nhịp 4: Khí chất Cổ văn & Chiến lược Kinh doanh',
        speedHint: 'Nhịp trầm hùng, trang trọng • Phát âm chuẩn chữ 度 (duó)',
        vi: 'Biết người biết ta trăm trận không nguy; chuẩn bị từ sớm ắt thành công.',
        segments: [
          { s: '知己知彼，', t: '知己知彼，', py: 'Zhījǐ-zhībǐ,' },
          { s: '百战不殆；', t: '百戰不殆；', py: 'bǎizhàn-búdài;' },
          { s: '未雨绸缪，', t: '未雨綢繆，', py: 'wèiyǔ-chóumóu,' },
          { s: '方能成功。', t: '方能成功。', py: 'fāng néng chénggōng.' }
        ]
      }
    ];

    const ROLEPLAY_STATE = {
      subtab: 'chat', // 'chat' | 'shadow'
      scenarioIdx: 0,
      turnIdx: 0,
      messages: [],
      isPartnerTyping: false,
      isMicRecording: false,
      micInstance: null,
      // Shadowing Studio state
      shadowTrackIdx: 0,
      shadowPhase: 'IDLE', // 'IDLE' | 'LISTENING' | 'SHADOWING' | 'RESULT'
      activeKarSegment: -1,
      shadowTimer: null,
      shadowSpokenText: '',
      shadowScore: null
    };

    function initRoleplayChatScenario(scIdx) {
      ROLEPLAY_STATE.scenarioIdx = scIdx;
      ROLEPLAY_STATE.turnIdx = 0;
      const sc = ROLEPLAY_SCENARIOS[scIdx % ROLEPLAY_SCENARIOS.length];
      ROLEPLAY_STATE.messages = sc.initialMessages.map(m => ({ ...m }));
      renderRoleplayChatPanel();
    }

    function resetCurrentRoleplayChat() {
      initRoleplayChatScenario(ROLEPLAY_STATE.scenarioIdx);
      showToast('🔄 Đã làm mới cuộc trò chuyện tình huống!', 'info');
    }

    function switchRoleplaySubtab(sub) {
      ROLEPLAY_STATE.subtab = sub;
      const chatPanel = document.getElementById('subpanel-roleplay-chat');
      const shadowPanel = document.getElementById('subpanel-roleplay-shadow');
      const btnChat = document.getElementById('subbtn-roleplay-chat');
      const btnShadow = document.getElementById('subbtn-roleplay-shadow');

      if (chatPanel && shadowPanel) {
        if (sub === 'chat') {
          chatPanel.classList.remove('hidden');
          shadowPanel.classList.add('hidden');
        } else {
          chatPanel.classList.add('hidden');
          shadowPanel.classList.remove('hidden');
        }
      }
      if (btnChat && btnShadow) {
        btnChat.className = sub === 'chat'
          ? 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-900 text-white shadow-sm transition flex items-center gap-1.5'
          : 'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition flex items-center gap-1.5';
        btnShadow.className = sub === 'shadow'
          ? 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-900 text-white shadow-sm transition flex items-center gap-1.5'
          : 'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition flex items-center gap-1.5';
      }
      renderRoleplayTabAll();
    }

    function renderRoleplayTabAll() {
      updateGeminiStatusBadges();
      if (ROLEPLAY_STATE.messages.length === 0) {
        const sc = ROLEPLAY_SCENARIOS[ROLEPLAY_STATE.scenarioIdx % ROLEPLAY_SCENARIOS.length];
        ROLEPLAY_STATE.messages = sc.initialMessages.map(m => ({ ...m }));
      }
      renderRoleplayChatPanel();
      renderShadowingStudio();
    }

    function renderRoleplayChatPanel() {
      const scListEl = document.getElementById('roleplay-scenario-list');
      const missionEl = document.getElementById('roleplay-mission-box');
      const streamEl = document.getElementById('wechat-messages-stream');
      const quickEl = document.getElementById('wechat-quick-replies');
      if (!scListEl || !streamEl) return;

      const sc = ROLEPLAY_SCENARIOS[ROLEPLAY_STATE.scenarioIdx % ROLEPLAY_SCENARIOS.length];

      // Update header
      const avEl = document.getElementById('chat-header-avatar');
      const nmEl = document.getElementById('chat-header-name');
      const subEl = document.getElementById('chat-header-subtitle');
      if (avEl) avEl.textContent = sc.avatar;
      if (nmEl) nmEl.textContent = sc.name;
      if (subEl) subEl.textContent = sc.subtitle;

      // Render Scenario Cards
      scListEl.innerHTML = ROLEPLAY_SCENARIOS.map((item, idx) => {
        const active = idx === ROLEPLAY_STATE.scenarioIdx;
        return `
          <button type="button" onclick="initRoleplayChatScenario(${idx})" class="w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${active ? 'bg-stone-900 text-white border-stone-900 shadow-sm' : 'bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200'}">
            <span class="text-2xl shrink-0">${item.avatar}</span>
            <div class="min-w-0 flex-1">
              <div class="text-xs font-extrabold truncate ${active ? 'text-amber-300' : 'text-stone-900'}">${item.name}</div>
              <div class="text-[11px] truncate ${active ? 'text-stone-300' : 'text-stone-500'}">${item.subtitle}</div>
            </div>
          </button>
        `;
      }).join('');

      if (missionEl) {
        missionEl.innerHTML = `
          <div class="font-extrabold text-amber-950 flex items-center gap-1.5">
            <span>🎯 Nhiệm vụ giao tiếp của bạn:</span>
          </div>
          <p class="text-stone-700 leading-relaxed">${sc.mission}</p>
        `;
      }

      // Render Messages
      streamEl.innerHTML = ROLEPLAY_STATE.messages.map(m => {
        const disp = hz(m.simp, m.trad || m.simp);
        if (m.sender === 'user') {
          return `
            <div class="flex flex-col items-end space-y-1">
              <div class="max-w-[82%] bg-emerald-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 shadow-sm space-y-1">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-base font-bold hanzi-font">${disp}</span>
                  <button type="button" onclick="speakChinese('${disp.replace(/'/g, '')}')" class="text-xs px-2 py-0.5 rounded bg-emerald-700 hover:bg-emerald-800 text-amber-200 font-bold">🔊</button>
                </div>
                ${m.py && APP_STATE.showPinyin ? `<div class="text-xs text-emerald-100">${m.py}</div>` : ''}
                ${m.vi && APP_STATE.showMeaning ? `<div class="text-[11px] text-emerald-200 italic">${m.vi}</div>` : ''}
              </div>
            </div>
          `;
        } else {
          return `
            <div class="flex items-start gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-stone-800 text-white flex items-center justify-center text-sm shrink-0 mt-0.5">${sc.avatar}</div>
              <div class="max-w-[85%] space-y-1.5">
                <div class="bg-white border border-stone-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm space-y-1">
                  <div class="flex items-start justify-between gap-3">
                    <span class="text-base sm:text-lg font-bold hanzi-font text-stone-900">${disp}</span>
                    <button type="button" onclick="speakChinese('${disp.replace(/'/g, '')}')" class="shrink-0 px-2.5 py-1 rounded-lg bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs font-bold">🔊 Nghe</button>
                  </div>
                  ${m.py && APP_STATE.showPinyin ? `<div class="text-xs font-semibold text-emerald-700">${m.py}</div>` : ''}
                  ${m.hv && APP_STATE.showHanViet ? `<div class="text-[11px] font-medium text-amber-800">Hán Việt: ${m.hv}</div>` : ''}
                  ${m.vi && APP_STATE.showMeaning ? `<div class="text-xs text-stone-600 border-t border-stone-100 pt-1">${m.vi}</div>` : ''}
                </div>
                ${m.coachTip ? `
                  <div class="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-xs text-amber-950">
                    ${m.coachTip}
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }
      }).join('') + (ROLEPLAY_STATE.isPartnerTyping ? `
        <div class="flex items-center gap-2 text-xs text-stone-500 italic">
          <span>${sc.avatar} Đối phương đang nhập tin nhắn...</span>
        </div>
      ` : '');

      streamEl.scrollTop = streamEl.scrollHeight;

      // Render Quick Replies for current turn
      const currentTurnObj = sc.turns[ROLEPLAY_STATE.turnIdx % sc.turns.length];
      if (quickEl && currentTurnObj) {
        quickEl.innerHTML = currentTurnObj.quickReplies.map((qr, qIdx) => {
          const dispQr = hz(qr.simp, qr.trad);
          return `
            <button type="button" onclick="useQuickReplyInChat(${qIdx})" class="p-2 rounded-xl bg-white hover:bg-amber-50 border border-stone-300 hover:border-vermilion-500 text-left transition space-y-0.5">
              <div class="text-xs sm:text-sm font-bold hanzi-font text-stone-900">${dispQr}</div>
              ${APP_STATE.showPinyin ? `<div class="text-[11px] font-semibold text-emerald-700 truncate">${qr.py}</div>` : ''}
              <div class="text-[10px] text-stone-500 truncate">${qr.vi}</div>
            </button>
          `;
        }).join('');
      }
    }

    function useQuickReplyInChat(qIdx) {
      const sc = ROLEPLAY_SCENARIOS[ROLEPLAY_STATE.scenarioIdx % ROLEPLAY_SCENARIOS.length];
      const currentTurnObj = sc.turns[ROLEPLAY_STATE.turnIdx % sc.turns.length];
      const qr = currentTurnObj?.quickReplies?.[qIdx];
      if (!qr) return;
      const inp = document.getElementById('wechat-user-input');
      if (inp) inp.value = hz(qr.simp, qr.trad);
      sendRoleplayUserMessage(qr);
    }

    async function sendRoleplayUserMessage(presetQrObj) {
      const inp = document.getElementById('wechat-user-input');
      const rawText = (inp?.value || '').trim();
      if (!rawText) {
        showToast('⚠️ Hãy chọn 1 câu gợi ý hoặc nói/gõ câu tiếng Trung trước khi gửi!', 'warn');
        return;
      }
      if (inp) inp.value = '';

      const sc = ROLEPLAY_SCENARIOS[ROLEPLAY_STATE.scenarioIdx % ROLEPLAY_SCENARIOS.length];
      ROLEPLAY_STATE.messages.push({
        sender: 'user',
        simp: rawText,
        trad: rawText,
        py: presetQrObj?.py || '',
        vi: presetQrObj?.vi || ''
      });
      ROLEPLAY_STATE.isPartnerTyping = true;
      renderRoleplayChatPanel();

      addXp(15, 'Phản xạ giao tiếp trong Phòng Chat WeChat');
      APP_STATE.skillsScore.phonetics = Math.min(100, APP_STATE.skillsScore.phonetics + 1);

      const apiKey = getStoredGeminiApiKey();
      if (apiKey.length > 10) {
        // Try Live Google Gemini AI Roleplay first!
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
          const prompt = `${sc.systemPrompt}
Người học vừa nhắn câu tiếng Trung: "${rawText}".
Hãy trả lời lại bằng JSON thuần túy (không bọc markdown) theo đúng cấu trúc:
{"simp":"Câu trả lời chữ Hán giản thể (1-2 câu tự nhiên)","trad":"Câu trả lời chữ Hán phồn thể","py":"Phiên âm Pinyin có dấu","hv":"Âm Hán Việt","vi":"Dịch nghĩa tiếng Việt","coachTip":"💡 Nhận xét ngắn gọn câu vừa nói của người học và gợi ý 1 cụm từ hay liên quan"}`;

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          });
          if (res.ok) {
            const data = await res.json();
            const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const cleaned = rawJson.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            if (parsed && parsed.simp) {
              ROLEPLAY_STATE.isPartnerTyping = false;
              ROLEPLAY_STATE.messages.push({
                sender: 'partner',
                simp: parsed.simp,
                trad: parsed.trad || parsed.simp,
                py: parsed.py || '',
                hv: parsed.hv || '',
                vi: parsed.vi || '',
                coachTip: parsed.coachTip || ''
              });
              ROLEPLAY_STATE.turnIdx = (ROLEPLAY_STATE.turnIdx + 1) % sc.turns.length;
              renderRoleplayChatPanel();
              speakChinese(hz(parsed.simp, parsed.trad || parsed.simp));
              return;
            }
          }
        } catch (aiErr) {
          // Seamless fallback to structured branching scenario if offline or blocked by sandbox
        }
      }

      // Fallback / Default Interactive Scenario Turn Response
      setTimeout(() => {
        const turnObj = sc.turns[ROLEPLAY_STATE.turnIdx % sc.turns.length];
        const reply = turnObj.partnerReply;
        ROLEPLAY_STATE.isPartnerTyping = false;
        ROLEPLAY_STATE.messages.push({
          sender: 'partner',
          simp: reply.simp,
          trad: reply.trad,
          py: reply.py,
          hv: reply.hv,
          vi: reply.vi,
          coachTip: reply.coachTip
        });
        ROLEPLAY_STATE.turnIdx = (ROLEPLAY_STATE.turnIdx + 1) % sc.turns.length;
        renderRoleplayChatPanel();
        speakChinese(hz(reply.simp, reply.trad));
      }, 650);
    }

    function toggleRoleplayVoiceMic() {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      const btn = document.getElementById('btn-chat-voice-mic');
      if (ROLEPLAY_STATE.isMicRecording && ROLEPLAY_STATE.micInstance) {
        ROLEPLAY_STATE.isMicRecording = false;
        try { ROLEPLAY_STATE.micInstance.stop(); } catch (e) {}
        if (btn) btn.innerHTML = '<span>🎙️ Nói Tiếng Trung</span>';
        return;
      }
      if (!SpeechRec) {
        showToast('💡 Trình duyệt chưa bật Micro trực tiếp. Bạn có thể bấm chọn 1 trong 3 gợi ý phản xạ nhanh phía trên!', 'info');
        return;
      }
      try {
        const rec = new SpeechRec();
        rec.lang = APP_STATE.scriptMode === 'trad' ? 'zh-TW' : 'zh-CN';
        rec.continuous = true;
        rec.interimResults = true;
        rec.onstart = function () {
          ROLEPLAY_STATE.isMicRecording = true;
          if (btn) btn.innerHTML = '<span class="animate-pulse">⏹️ Đọc Xong Bấm Gửi</span>';
          showToast('🎙️ Hãy nói câu trả lời tiếng Trung của bạn vào Micro...', 'info');
        };
        rec.onresult = function (event) {
          let txt = '';
          for (let i = 0; i < event.results.length; i++) {
            txt += event.results[i][0].transcript;
          }
          const inp = document.getElementById('wechat-user-input');
          if (inp) inp.value = txt;
        };
        rec.onerror = function () {
          ROLEPLAY_STATE.isMicRecording = false;
          if (btn) btn.innerHTML = '<span>🎙️ Nói Tiếng Trung</span>';
        };
        rec.onend = function () {
          ROLEPLAY_STATE.isMicRecording = false;
          if (btn) btn.innerHTML = '<span>🎙️ Nói Tiếng Trung</span>';
        };
        ROLEPLAY_STATE.micInstance = rec;
        rec.start();
      } catch (e) {
        showToast('💡 Hãy chọn gợi ý câu phản xạ hoặc gõ trực tiếp vào ô chat!', 'info');
      }
    }

    // --- 13D.2: SHADOWING KARAOKE 3-STEP STUDIO ---
    function selectShadowTrack(idx) {
      if (ROLEPLAY_STATE.shadowTimer) clearInterval(ROLEPLAY_STATE.shadowTimer);
      ROLEPLAY_STATE.shadowTrackIdx = idx;
      ROLEPLAY_STATE.shadowPhase = 'IDLE';
      ROLEPLAY_STATE.activeKarSegment = -1;
      ROLEPLAY_STATE.shadowSpokenText = '';
      ROLEPLAY_STATE.shadowScore = null;
      renderShadowingStudio();
    }

    function startShadowing3StepCycle() {
      if (ROLEPLAY_STATE.shadowTimer) clearInterval(ROLEPLAY_STATE.shadowTimer);
      const track = SHADOWING_TRACKS[ROLEPLAY_STATE.shadowTrackIdx % SHADOWING_TRACKS.length];
      const fullSentence = track.segments.map(seg => hz(seg.s, seg.t)).join('');

      // STEP 1: LISTEN & KARAOKE HIGHLIGHT
      ROLEPLAY_STATE.shadowPhase = 'LISTENING';
      ROLEPLAY_STATE.activeKarSegment = 0;
      ROLEPLAY_STATE.shadowScore = null;
      renderShadowingStudio();
      speakChinese(fullSentence);

      let segIdx = 0;
      ROLEPLAY_STATE.shadowTimer = setInterval(() => {
        segIdx++;
        if (segIdx < track.segments.length) {
          ROLEPLAY_STATE.activeKarSegment = segIdx;
          renderShadowingStudio();
        } else {
          clearInterval(ROLEPLAY_STATE.shadowTimer);
          // Transition to STEP 2: SHADOWING (User repeats)
          ROLEPLAY_STATE.shadowPhase = 'SHADOWING';
          ROLEPLAY_STATE.activeKarSegment = 0;
          renderShadowingStudio();
          runShadowingUserRepeatPhase(track);
        }
      }, 950);
    }

    function runShadowingUserRepeatPhase(track) {
      let sIdx = 0;
      ROLEPLAY_STATE.shadowTimer = setInterval(() => {
        sIdx++;
        if (sIdx < track.segments.length) {
          ROLEPLAY_STATE.activeKarSegment = sIdx;
          renderShadowingStudio();
        } else {
          clearInterval(ROLEPLAY_STATE.shadowTimer);
          ROLEPLAY_STATE.activeKarSegment = -1;
          renderShadowingStudio();
        }
      }, 1050);
    }

    function finishShadowingAndScore(demoMode) {
      if (ROLEPLAY_STATE.shadowTimer) clearInterval(ROLEPLAY_STATE.shadowTimer);
      const track = SHADOWING_TRACKS[ROLEPLAY_STATE.shadowTrackIdx % SHADOWING_TRACKS.length];
      const fullSentence = track.segments.map(seg => hz(seg.s, seg.t)).join('');
      const manualVal = (document.getElementById('shadow-manual-input')?.value || '').trim();

      let spoken = manualVal;
      if (demoMode === 'perfect' || !spoken) {
        spoken = fullSentence;
      }

      ROLEPLAY_STATE.shadowSpokenText = spoken;
      const cleanTarget = normalizeChineseChars(fullSentence);
      const cleanSpoken = normalizeChineseChars(spoken);
      let hits = 0;
      for (const ch of cleanTarget) {
        if (cleanSpoken.includes(ch)) hits++;
      }
      const accuracy = cleanTarget.length > 0 ? Math.min(100, Math.round((hits / cleanTarget.length) * 100)) : 100;
      ROLEPLAY_STATE.shadowScore = accuracy;
      ROLEPLAY_STATE.shadowPhase = 'RESULT';
      addXp(25, `Hoàn thành chu trình Nhại âm Shadowing (${accuracy}%)`);
      renderShadowingStudio();
    }

    function renderShadowingStudio() {
      const box = document.getElementById('subpanel-roleplay-shadow');
      if (!box) return;
      const track = SHADOWING_TRACKS[ROLEPLAY_STATE.shadowTrackIdx % SHADOWING_TRACKS.length];
      const fullSentence = track.segments.map(seg => hz(seg.s, seg.t)).join('');

      const phaseLabels = {
        IDLE: 'Sẵn sàng • Bấm "Bắt Đầu Chu Trình 3 Nhịp" để nghe mẫu và nhại theo Karaoke',
        LISTENING: '🔊 NHỊP 1/3: ĐANG PHÁT GIỌNG MẪU — Hãy lắng nghe và nhìn chữ sáng theo nhịp...',
        SHADOWING: '🎙️ NHỊP 2/3: ĐẾN LƯỢT BẠN NHẠI LẠI (SHADOWING) — Đọc to đuổi theo cụm chữ đang sáng!',
        RESULT: `🌟 NHỊP 3/3: HOÀN TẤT ĐỐI CHIẾU NGỮ ĐIỆU — Độ khớp nhịp & âm: ${ROLEPLAY_STATE.shadowScore}%`
      };

      const segmentsHtml = track.segments.map((seg, idx) => {
        const disp = hz(seg.s, seg.t);
        const isActive = idx === ROLEPLAY_STATE.activeKarSegment;
        const isDoneResult = ROLEPLAY_STATE.shadowPhase === 'RESULT';
        return `
          <div class="px-4 py-3 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center ${
            isActive
              ? 'bg-amber-400 text-stone-950 border-vermilion-600 scale-105 shadow-lg'
              : isDoneResult
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-stone-50 border-stone-200 text-stone-900'
          }">
            <span class="text-xs sm:text-sm font-bold ${isActive ? 'text-vermilion-800' : 'text-emerald-700'}">${seg.py}</span>
            <span class="text-2xl sm:text-3xl font-extrabold hanzi-font mt-0.5">${disp}</span>
          </div>
        `;
      }).join('');

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-vermilion-700">🎧 Phòng Luyện Nhại Âm Bản Xứ (Shadowing Karaoke 3 Nhịp Tự Động)</span>
            <p class="text-xs text-stone-500">Phương pháp luyện phản xạ cơ miệng tốt nhất: <strong>1. Nghe mẫu mắt nhìn nhịp chữ ➔ 2. Đọc nhại đuổi theo ➔ 3. Chấm điểm độ trôi chảy</strong></p>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${SHADOWING_TRACKS.map((t, idx) => `
              <button type="button" onclick="selectShadowTrack(${idx})" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition ${idx === ROLEPLAY_STATE.shadowTrackIdx ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}">
                Bài Nhại ${idx + 1}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Live Phase Status Banner -->
        <div class="p-3.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-between gap-2 ${
          ROLEPLAY_STATE.shadowPhase === 'LISTENING'
            ? 'bg-amber-100 text-amber-950 border-2 border-amber-400'
            : ROLEPLAY_STATE.shadowPhase === 'SHADOWING'
            ? 'bg-rose-600 text-white animate-pulse'
            : ROLEPLAY_STATE.shadowPhase === 'RESULT'
            ? 'bg-emerald-100 text-emerald-950 border-2 border-emerald-400'
            : 'bg-stone-900 text-amber-300'
        }">
          <span>${phaseLabels[ROLEPLAY_STATE.shadowPhase]}</span>
          <span class="text-xs font-semibold opacity-90">${track.speedHint}</span>
        </div>

        <!-- Karaoke Stage Box -->
        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-sm sm:text-base font-extrabold text-stone-900">${track.title}</h4>
            <button type="button" onclick="speakChinese('${fullSentence.replace(/'/g, '')}')" class="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold">
              🔊 Nghe Lại Câu Mẫu
            </button>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3 py-4">
            ${segmentsHtml}
          </div>

          <div class="text-center text-xs sm:text-sm text-stone-600 italic border-t border-stone-200/80 pt-3">
            Nghĩa: "${track.vi}"
          </div>
        </div>

        <!-- Controls for 3-Step Shadowing -->
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="startShadowing3StepCycle()" class="px-5 py-3 rounded-2xl bg-vermilion-600 hover:bg-vermilion-700 text-white text-xs sm:text-sm font-extrabold shadow-md transition">
              ▶️ Bắt Đầu Chu Trình Shadowing 3 Nhịp (Nghe ➔ Nhại)
            </button>
            <button type="button" onclick="finishShadowingAndScore('perfect')" class="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-sm transition">
              ✅ Đã Nhại Xong — Chấm Điểm Ngữ Điệu
            </button>
          </div>

          <div class="flex items-center gap-2 flex-1 max-w-md">
            <input id="shadow-manual-input" type="text" value="${ROLEPLAY_STATE.shadowSpokenText}" placeholder="Hoặc dùng Voice Typing đọc câu nhại vào đây..." class="flex-1 px-3 py-2 text-xs hanzi-font bg-stone-50 border border-stone-300 rounded-xl" />
          </div>
        </div>
      `;
    }

    function refreshAllViews() {
      updateHeaderStats();
      renderGuidedCompass();
      renderLessonList();
      renderPinyinLab();
      renderVocabVault();
      renderChengyuVault();
      renderSynonymsVault();
      renderCanvasPresets();
      redrawHanziCanvas();
      buildSrsDeck();
      renderArenaAll();
      renderSavedBookmarks();
    }

    window.onload = function () {
      loadSavedState();
      initHanziCanvas();
      initSentenceItem();
      refreshAllViews();
      generateStudyPlan();
    };
