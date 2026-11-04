// Dữ liệu Pinyin, 4 Thanh điệu, Biến điệu, 8 Nét & 214 Bộ thủ
// 3. PINYIN LAB, TONE SANDHI, 8 STROKES & 214 RADICALS DATASET
    // =========================================================================
    const PINYIN_INITIALS_GROUPS = [
      {
        groupName: '1. Âm Hai Môi & Răng Môi (双唇音 / 唇齿音)',
        items: [
          { id: 'b', code: 'b', ipa: '[p]', sample: '爸爸 (bàba)', tip: 'Hai môi khép lại rồi mở ra, KHÔNG bật hơi (giống "p" nhẹ hoặc "b" vô thanh).', confuse: 'Dễ nhầm với p (bật hơi mạnh).' },
          { id: 'p', code: 'p', ipa: '[pʰ]', sample: '朋友 (péngyou)', tip: 'Hai môi mím lại rồi BẬT LUỒNG HƠI MẠNH ra ngoài (đặt tờ giấy trước miệng thấy giấy bay).', confuse: 'Nhớ bật hơi mạnh, không đọc như "ph" tiếng Việt.' },
          { id: 'm', code: 'm', ipa: '[m]', sample: '妈妈 (māma)', tip: 'Âm mũi hai môi, phát âm tương tự chữ "m" trong tiếng Việt.', confuse: 'Âm dễ, đọc tự nhiên.' },
          { id: 'f', code: 'f', ipa: '[f]', sample: '发展 (fāzhǎn)', tip: 'Răng hàm trên chạm nhẹ môi dưới, đẩy hơi ma sát ra ngoài (giống "ph" tiếng Việt).', confuse: 'Không đi với vận mẫu mở đầu bằng i, ü.' }
        ]
      },
      {
        groupName: '2. Âm Đầu Lưỡi Giữa (舌尖中音)',
        items: [
          { id: 'd', code: 'd', ipa: '[t]', sample: '大学 (dàxué)', tip: 'Đầu lưỡi chạm lợi hàm trên, KHÔNG bật hơi (đọc giống âm "t" trong tiếng Việt!).', confuse: 'Người Việt hay đọc nhầm thành "đ" — nhớ đọc là "t"!' },
          { id: 't', code: 't', ipa: '[tʰ]', sample: '天下 (tiānxià)', tip: 'Đầu lưỡi chạm lợi trên rồi BẬT HƠI MẠNH (giống "th" tiếng Việt nhưng bật hơi sắc hơn).', confuse: 'Phân biệt rõ d (không bật hơi) và t (bật hơi).' },
          { id: 'n', code: 'n', ipa: '[n]', sample: '努力 (nǔlì)', tip: 'Đầu lưỡi chạm lợi trên, hơi thoát qua mũi (giống "n" tiếng Việt).', confuse: 'Đi được với cả u (nu) và ü (nü - Nữ 女).' },
          { id: 'l', code: 'l', ipa: '[l]', sample: '老师 (lǎoshī)', tip: 'Đầu lưỡi chạm lợi trên, hơi thoát qua hai bên lưỡi (giống "l" tiếng Việt).', confuse: 'Đi với ü giữ nguyên hai chấm: 旅游 (lǚyóu).' }
        ]
      },
      {
        groupName: '3. Âm Cuống Lưỡi (舌根音)',
        items: [
          { id: 'g', code: 'g', ipa: '[k]', sample: '哥哥 (gēge)', tip: 'Cuống lưỡi nâng lên chạm ngạc mềm, KHÔNG bật hơi (đọc giống âm "c/k" trong tiếng Việt).', confuse: 'Không đọc rung cổ họng như "g" tiếng Việt.' },
          { id: 'k', code: 'k', ipa: '[kʰ]', sample: '可以 (kěyǐ)', tip: 'Cuống lưỡi chạm ngạc mềm rồi BẬT HƠI MẠNH từ cổ họng ra (gần giống "kh" nhưng bật hơi dứt khoát).', confuse: 'Cần luồng hơi mạnh hơn chữ "kh" tiếng Việt.' },
          { id: 'h', code: 'h', ipa: '[x]', sample: '喝水 (hē shuǐ)', tip: 'Ma sát nhẹ ở cuống họng, nằm giữa chữ "h" và chữ "kh" nhẹ của tiếng Việt.', confuse: 'Tránh đọc thành "kh" quá gắt.' }
        ]
      },
      {
        groupName: '4. Âm Mặt Lưỡi (舌面音 — Chỉ ghép với i và ü)',
        items: [
          { id: 'j', code: 'j', ipa: '[tɕ]', sample: '经济 (jīngjì)', tip: 'Đầu lưỡi hạ xuống chạm mặt sau răng cửa dưới, mặt lưỡi nâng sát ngạc cứng, KHÔNG bật hơi (gần giống "ch" nhẹ).', confuse: 'Khi đi với ü bỏ dấu 2 chấm: 居 (jū), 句 (jù).' },
          { id: 'q', code: 'q', ipa: '[tɕʰ]', sample: '清楚 (qīngchu)', tip: 'Khẩu hình y hệt âm j nhưng BẬT HƠI MẠNH qua khe mặt lưỡi, khóe miệng hơi kéo sang hai bên.', confuse: 'Đừng đọc thành "kh" hay "ch" thường; phải có luồng hơi bật mạnh!' },
          { id: 'x', code: 'x', ipa: '[ɕ]', sample: '学习 (xuéxí)', tip: 'Đầu lưỡi đặt sau răng dưới, mặt lưỡi nâng lên để luồng hơi xì êm ái (giống "x" nhẹ, miệng hơi mỉm cười).', confuse: 'Nhớ giữ nguyên âm tròn môi khi đọc 学 (xué), 选 (xuǎn).' }
        ]
      },
      {
        groupName: '5. Âm Đầu Lưỡi Trước — Lưỡi Thẳng (舌尖前音平舌)',
        items: [
          { id: 'z', code: 'z', ipa: '[ts]', sample: '自己 (zìjǐ)', tip: 'Đầu lưỡi đặt thẳng chạm mặt sau răng cửa trên, KHÔNG bật hơi (khi đi với i thì đọc ưỡi giữ nguyên: zì).', confuse: 'Không cong lưỡi như zh!' },
          { id: 'c', code: 'c', ipa: '[tsʰ]', sample: '聪明 (cōngmíng)', tip: 'Đầu lưỡi đặt thẳng chạm mặt sau răng cửa rồi BẬT HƠI MẠNH ("ts" bật hơi sắc).', confuse: 'Rất nhiều người quên bật hơi âm c (예: 次 cì, 菜 cài).' },
          { id: 's', code: 's', ipa: '[s]', sample: '思考 (sīkǎo)', tip: 'Lưỡi thẳng, hơi xì qua kẽ răng cửa (giống "x" tiếng Việt Hà Nội).', confuse: 'Khi ghép với i (四 sì) đọc là "xư" nhẹ với đầu lưỡi thẳng.' }
        ]
      },
      {
        groupName: '6. Âm Đầu Lưỡi Sau — Cong Lưỡi (舌尖后音翘舌)',
        items: [
          { id: 'zh', code: 'zh', ipa: '[ʈʂ]', sample: '中国 (Zhōngguó)', tip: 'Đầu lưỡi CONG LÊN chạm vòm ngạc cứng phía trên, KHÔNG bật hơi (giống "tr" miền Trung/Nam).', confuse: 'Phân biệt rõ với z (lưỡi thẳng): 知道 (zhīdào) vs 自己 (zìjǐ).' },
          { id: 'ch', code: 'ch', ipa: '[ʈʂʰ]', sample: '成功 (chénggōng)', tip: 'Đầu lưỡi CONG LÊN chạm vòm miệng rồi BẬT HƠI MẠNH ra ngoài.', confuse: 'Khác với q (mặt lưỡi phẳng) và c (lưỡi thẳng).' },
          { id: 'sh', code: 'sh', ipa: '[ʂ]', sample: '老师 (lǎoshī)', tip: 'Đầu lưỡi CONG LÊN gần vòm miệng, đẩy hơi ma sát (giống "s" cong lưỡi).', confuse: 'Phân biệt 十四 (shísì = 14) và 四十 (sìshí = 40)!' },
          { id: 'r', code: 'r', ipa: '[ʐ]', sample: '人民 (rénmín)', tip: 'Đầu lưỡi cong lên như sh nhưng dây thanh quản RUNG (không rung lưỡi kiểu R tiếng Ý/Việt).', confuse: 'Giữ lưỡi cong cố định, không đánh lưỡi.' }
        ]
      }
    ];

    const PINYIN_FINALS_GROUPS = [
      {
        groupName: 'Vận Mẫu Đơn & Đặc Biệt (单韵母)',
        items: [
          { id: 'a_o_e', code: 'a / o / e', ipa: '[a / o / ɤ]', sample: '大 (dà) • 喝 (hē)', tip: 'Chữ "e" đọc là "ơ/ưa" (như 喝 hē, 哥 gē), chỉ đọc là "ê" khi đi sau i, ü (như 也 yě, 月 yuè).', confuse: 'Đừng đọc 喝水 (hē shuǐ) thành "he suẩy"!' },
          { id: 'i_u_v', code: 'i / u / ü', ipa: '[i / u / y]', sample: '女 (nǚ) • 绿 (lǜ) • 去 (qù)', tip: 'Âm ü: phát âm chữ "i" nhưng chúm tròn môi lại như đang huýt sáo (giống chữ "uy" tròn môi).', confuse: 'Khi đi sau z, c, s, zh, ch, sh, r thì chữ "i" đọc là âm "ư".' },
          { id: 'er', code: 'er (儿化音)', ipa: '[ɑɻ]', sample: '而且 (érqiě) • 一会儿 (yíhuìr)', tip: 'Vừa phát âm chữ "ơ/a" vừa cuộn cong đầu lưỡi lên phía vòm họng.', confuse: 'Đắc sản giọng Bắc Kinh: 哪儿 (nǎr), 一点儿 (yìdiǎnr).' }
        ]
      },
      {
        groupName: 'Vận Mẫu Kép & Vận Mẫu Mũi (复韵母 / 鼻韵母)',
        items: [
          { id: 'ai_ei_ao_ou', code: 'ai / ei / ao / ou', ipa: 'Kép', sample: '爱 (ài) • 北 (běi) • 好 (hǎo)', tip: 'Đọc lướt mượt từ nguyên âm chính sang nguyên âm phụ.', confuse: 'Chữ "ou" đọc gần giống "âu" (都 dōu, 走 zǒu).' },
          { id: 'an_en_in_un', code: 'an / en / in / ün (-n)', ipa: 'Mũi trước', sample: '看 (kàn) • 人 (rén) • 新 (xīn)', tip: 'Kết thúc bằng đầu lưỡi chạm lợi hàm trên (-n), âm gọn phía trước khoang miệng.', confuse: 'Chú ý "ian" đọc là "i-en" (như 天 tiān, 钱 qián), không đọc là "i-an"!' },
          { id: 'ang_eng_ing_ong', code: 'ang / eng / ing / ong (-ng)', ipa: 'Mũi sau', sample: '忙 (máng) • 听 (tīng) • 红 (hóng)', tip: 'Kết thúc bằng cuống lưỡi hạ thấp, miệng mở rộng hơn, âm vang ở họng sau (-ng).', confuse: 'Phân biệt rõ: 门 (mén) vs 梦 (mèng); 信 (xìn) vs 星 (xīng).' }
        ]
      }
    ];

    const TONE_DATA = [
      {
        tone: 1,
        name: 'Thanh 1 — Âm Bình (阴平 55)',
        mark: 'ā (mā 妈)',
        pitch: 'Cao và Bằng phẳng (5 → 5)',
        svgPath: 'M 20,25 L 180,25',
        color: '#ef4444',
        exampleSimp: '妈妈 (māma)',
        exampleTrad: '媽媽 (māma)',
        meaning: 'Mẹ • Giữ cao độ đều đặn như nốt Sol cao, không hạ giọng cuối âm.'
      },
      {
        tone: 2,
        name: 'Thanh 2 — Dương Bình (阳平 35)',
        mark: 'á (má 麻)',
        pitch: 'Vút lên từ Trung bình lên Cao (3 → 5)',
        svgPath: 'M 20,65 L 180,20',
        color: '#f59e0b',
        exampleSimp: '麻烦 (máfán)',
        exampleTrad: '麻煩 (máfán)',
        meaning: 'Làm phiền • Giống giọng hỏi "Hả?" dứt khoát từ giữa vút lên cao.'
      },
      {
        tone: 3,
        name: 'Thanh 3 — Thượng Thanh (上声 214)',
        mark: 'ǎ (mǎ 马)',
        pitch: 'Trầm xuống đáy rồi lượn lên (2 → 1 → 4)',
        svgPath: 'M 20,75 L 95,105 L 180,40',
        color: '#10b981',
        exampleSimp: '马上 (mǎshàng)',
        exampleTrad: '馬上 (mǎshàng)',
        meaning: 'Ngay lập tức • Khi đi trước thanh 1, 2, 4 chỉ đọc nửa thanh 3 trầm (2 → 1).'
      },
      {
        tone: 4,
        name: 'Thanh 4 — Khứ Thanh (去声 51)',
        mark: 'à (mà 骂)',
        pitch: 'Chém mạnh từ Đỉnh cao xuống Đáy (5 → 1)',
        svgPath: 'M 20,20 L 180,105',
        color: '#3b82f6',
        exampleSimp: '骂人 (mà rén)',
        exampleTrad: '罵人 (mà rén)',
        meaning: 'Mắng người • Đọc dứt khoát, mạnh mẽ từ cao xuống thấp.'
      }
    ];

    const SANDHI_RULES_DATA = [
      {
        title: '1. Hai Thanh 3 đi liền (3 + 3 → 2 + 3)',
        written: '你好 (nǐ hǎo) • 可以 (kě yǐ) • 辅导 (fǔ dǎo)',
        spoken: 'ní hǎo • ké yǐ • fú dǎo',
        speakSample: '你好，可以辅导',
        desc: 'Âm tiết thứ nhất đọc thành Thanh 2, âm tiết thứ hai giữ nguyên Thanh 3.'
      },
      {
        title: '2. Ba Thanh 3 đi liền (3 + 3 + 3 → 2 + 2 + 3 hoặc 3 + 2 + 3)',
        written: '展览馆 (zhǎn lǎn guǎn) • 我很想 (wǒ hěn xiǎng)',
        spoken: 'zhán lán guǎn (2-2-3) • wǒ hén xiǎng (3-2-3)',
        speakSample: '展览馆，我很想你',
        desc: 'Tùy theo cấu trúc từ ghép (2+1 hay 1+2) mà biến điệu nhịp nhàng để câu nói trôi chảy.'
      },
      {
        title: '3. Biến điệu của chữ 不 (bù)',
        written: '不对 (bù duì) • 不去 (bù qù) vs 不好 (bù hǎo)',
        spoken: 'bú duì (2+4) • bú qù (2+4) vs bù hǎo (4+3)',
        speakSample: '不对，不去，不好',
        desc: 'Đứng trước Thanh 4 thì 不 đọc thành bú (Thanh 2). Đứng trước Thanh 1, 2, 3 giữ nguyên bù (Thanh 4).'
      },
      {
        title: '4. Biến điệu của chữ 一 (yī)',
        written: '第一 (dì-yī) • 一个 (yī gè) • 一天 (yī tiān) • 一起 (yī qǐ)',
        spoken: 'dì-yī (Thanh 1) • yí gè (Thanh 2) • yì tiān (Thanh 4) • yì qǐ (Thanh 4)',
        speakSample: '第一，一个，一天，一起',
        desc: 'Đếm số thứ tự đọc yī; trước Thanh 4 đọc yí; trước Thanh 1, 2, 3 đọc yì.'
      }
    ];

    const EIGHT_STROKES_DATA = [
      { stroke: '丶', name: '1. Nét Điểm (点 - diǎn)', dir: 'Chấm từ trên xuống phải', sample: '主、六、永', desc: 'Giọt nước rơi, tạo điểm tựa tinh thần cho chữ.' },
      { stroke: '一', name: '2. Nét Ngang (横 - héng)', dir: 'Kéo từ trái sang phải', sample: '一、三、大', desc: 'Như cây cầu cân bằng trọng tâm toàn bộ chữ Hán.' },
      { stroke: '丨', name: '3. Nét Sổ (竖 - shù)', dir: 'Kéo thẳng từ trên xuống dưới', sample: '十、中、川', desc: 'Trụ cột thẳng đứng giữ cho chữ không bị nghiêng đổ.' },
      { stroke: '丿', name: '4. Nét Phiệt (撇 - piě)', dir: 'Phẩy cong từ phải qua trái xuống', sample: '人、八、千', desc: 'Nhấn đầu bút rồi vuốt thanh thoát sang phía trái.' },
      { stroke: '乀', name: '5. Nét Mác (捺 - nà)', dir: 'Nhấn nghiêng từ trái sang phải xuống', sample: '大、天、木', desc: 'Chân bút mở rộng sang phải đối xứng với nét Phiệt.' },
      { stroke: '㇀', name: '6. Nét Hất (提 - tí)', dir: 'Hất chéo từ dưới trái lên trên phải', sample: '江、河、把', desc: 'Thường nằm ở nét cuối của bộ Thủy (氵) hoặc bộ Thổ (土).' },
      { stroke: '𠃍', name: '7. Nét Gập (折 - zhé)', dir: 'Đang ngang/sổ thì bẻ góc chuyển hướng', sample: '口、日、国', desc: 'Tạo khung vuông vắn, góc cạnh cho các chữ bao vây.' },
      { stroke: '亅', name: '8. Nét Móc (钩 - gōu)', dir: 'Cuối nét sổ/ngang/cong bật nhẹ mũi móc', sample: '小、水、心', desc: 'Mũi móc hướng về nét tiếp theo để liên kết khí mạch.' }
    ];

    const STROKE_RULES_DATA = [
      { rule: '1. Ngang trước, Sổ sau (先横后竖)', example: '十 (Nét 一 trước, nét 丨 sau), 王, 干' },
      { rule: '2. Phiệt (Phẩy) trước, Mác sau (先撇后捺)', example: '八, 人, 大, 天, 木' },
      { rule: '3. Trên trước, Dưới sau (从上到下)', example: '三, 二, 李, 意' },
      { rule: '4. Trái trước, Phải sau (从左到右)', example: '你, 好, 林, 汉, 语' },
      { rule: '5. Ngoài trước, Trong sau (先外后内)', example: '月, 同, 风, 问' },
      { rule: '6. Vào nhà trước, Đóng cửa sau (先里头后封口)', example: '回, 国, 日, 四 (Nét ngang đáy luôn viết cuối cùng)' },
      { rule: '7. Giữa trước, Hai bên đối xứng sau (先中间后两边)', example: '小, 水, 永, 办' }
    ];

    const RADICALS_DATA = [
      { rad: '人 / 亻', pinyin: 'rén', hv: 'Bộ Nhân (Đứng)', cat: 'HUMAN', strokes: 2, meaning: 'Con người, tính cách hoặc hành động của người.', mnemonic: 'Chữ 休 (Nghỉ): Người (亻) tựa lưng vào gốc cây (木). Chữ 信 (Tín): Lời nói (言) của con người (亻).', examples: '你、他、休、信、体' },
      { rad: '女', pinyin: 'nǚ', hv: 'Bộ Nữ', cat: 'HUMAN', strokes: 3, meaning: 'Phụ nữ, gia đình, sự dịu dàng, vẻ đẹp.', mnemonic: 'Chữ 好 (Hảo - Tốt): Có con gái (女) và con trai (子) là điều tốt đẹp viên mãn. Chữ 安 (An): Người phụ nữ (女) dưới mái nhà (宀).', examples: '妈、姐、好、安、姓' },
      { rad: '心 / 忄', pinyin: 'xīn', hv: 'Bộ Tâm (Đứng)', cat: 'HUMAN', strokes: 3, meaning: 'Trái tim, tâm trạng, cảm xúc, tư tưởng.', mnemonic: 'Mọi chữ chỉ buồn vui, suy nghĩ đều có bộ Tâm: 忙 (Bận = Tâm + Vong), 怕 (Sợ = Tâm + Bạch), 想 (Nhớ/Nghĩ).', examples: '想、情、忙、快、懂' },
      { rad: '手 / 扌', pinyin: 'shǒu', hv: 'Bộ Thủ (Gảy)', cat: 'ACTION', strokes: 3, meaning: 'Bàn tay, động tác cầm nắm, đánh, đẩy.', mnemonic: 'Chữ 看 (Xem): Lấy tay (手) che lên trên mắt (目) để nhìn xa. Chữ 打 (Đánh), 把 (Cầm nắm).', examples: '打、把、找、拿、推' },
      { rad: '口', pinyin: 'kǒu', hv: 'Bộ Khẩu', cat: 'HUMAN', strokes: 3, meaning: 'Cái miệng, lời nói, ăn uống, tiếng kêu hoặc trợ từ.', mnemonic: 'Ăn (吃), uống (喝), gọi (叫), hỏi (问 = Cổng 门 có cái miệng 口).', examples: '吃、喝、唱、问、吗' },
      { rad: '言 / 讠', pinyin: 'yán', hv: 'Bộ Ngôn', cat: 'HUMAN', strokes: 2, meaning: 'Ngôn ngữ, lời nói, học hỏi, trao đổi.', mnemonic: 'Tất cả hoạt động giao tiếp: 请 (Mời), 谢 (Cảm ơn), 说 (Nói), 读 (Đọc), 谈 (Đàm phán).', examples: '请、说、读、话、认识' },
      { rad: '目', pinyin: 'mù', hv: 'Bộ Mục', cat: 'HUMAN', strokes: 5, meaning: 'Con mắt, cái nhìn, thị giác.', mnemonic: 'Chữ 睡 (Ngủ): Mắt (目) rủ xuống (垂) là ngủ. Chữ 睛 (Con ngươi mắt).', examples: '看、眼、睛、睡、相' },
      { rad: '水 / 氵', pinyin: 'shuǐ', hv: 'Bộ Thủy (Tam chấm thủy)', cat: 'NATURE', strokes: 3, meaning: 'Nước, chất lỏng, sông biển, sự trong sạch.', mnemonic: 'Phân biệt 氵(3 chấm = Nước) với 冫(2 chấm = Băng giá lạnh: 冷, 冰).', examples: '河、海、洗、清、汉' },
      { rad: '火 / 灬', pinyin: 'huǒ', hv: 'Bộ Hỏa (Bốn chấm hỏa)', cat: 'NATURE', strokes: 4, meaning: 'Lửa, sức nóng, nấu nướng, ánh sáng.', mnemonic: 'Khi nằm dưới đáy chữ biến thành 4 dấu chấm (灬): 热 (Nóng), 煮 (Nấu), 点 (Đốt đèn/Điểm).', examples: '烧、烤、热、灯、然' },
      { rad: '木', pinyin: 'mù', hv: 'Bộ Mộc', cat: 'NATURE', strokes: 4, meaning: 'Cây cối, gỗ, đồ vật làm bằng gỗ.', mnemonic: '1 cây là 木 (Mộc), 2 cây là 林 (Lâm - Rừng thưa), 3 cây là 森 (Sâm - Rừng rậm).', examples: '林、森、树、桌、本' },
      { rad: '日', pinyin: 'rì', hv: 'Bộ Nhật', cat: 'NATURE', strokes: 4, meaning: 'Mặt trời, thời gian, ngày tháng, ánh sáng.', mnemonic: 'Nhật (日) + Nguyệt (月) = 明 (Minh - Sáng rõ). Mặt trời nhô lên trên đường chân trời = 旦 (Đán - Bình minh).', examples: '明、早、晚、晴、时' },
      { rad: '月', pinyin: 'yuè', hv: 'Bộ Nguyệt / Nhục', cat: 'NATURE', strokes: 4, meaning: 'Mặt trăng, tháng; hoặc biến thể của bộ Nhục (肉 - cơ thể).', mnemonic: 'Trong 期, 明, 朋 là Mặt trăng; còn trong 脸 (Mặt), 脚 (Chân), 胖 (Béo) là bộ Nhục (Thịt/Cơ thể)!', examples: '期、明、脸、脑、胖' },
      { rad: '金 / 钅', pinyin: 'jīn', hv: 'Bộ Kim', cat: 'OBJECT', strokes: 5, meaning: 'Kim loại, vàng bạc, tiền bạc, máy móc sắc bén.', mnemonic: 'Chữ 钱 (Tiền): Kim loại (钅) từng gây ra tranh chấp giáo mác (戋).', examples: '钱、银、铁、钟、错' },
      { rad: '食 / 饣', pinyin: 'shí', hv: 'Bộ Thực', cat: 'OBJECT', strokes: 3, meaning: 'Thức ăn, lương thực, bữa ăn.', mnemonic: 'Cơm (饭), bánh sủi cảo (饺), no (饱), đói (饿).', examples: '饭、饿、饱、馆、饺' },
      { rad: '辵 / 辶', pinyin: 'chuò', hv: 'Bộ Sước (Quai xước)', cat: 'ACTION', strokes: 3, meaning: 'Bước đi trên đường, khoảng cách xa gần, vận động.', mnemonic: 'Luôn viết SAU CÙNG của chữ: 远 (Xa), 近 (Gần), 送 (Tiễn), 道 (Con đường).', examples: '远、近、道、选、通' },
      { rad: '宀', pinyin: 'mián', hv: 'Bộ Miên (Mái nhà)', cat: 'OBJECT', strokes: 3, meaning: 'Mái nhà che chở, gia đình, không gian bên trong.', mnemonic: 'Mái nhà (宀) bên dưới có con heo (豕) là chữ 家 (Gia - Nhà, vì thời cổ nhà nuôi gia súc là ấm no).', examples: '家、室、安、宝、字' },
      { rad: '贝 / 貝', pinyin: 'bèi', hv: 'Bộ Bối (Vỏ sò tiền tệ)', cat: 'OBJECT', strokes: 4, meaning: 'Tiền tài, buôn bán, giá trị kinh tế.', mnemonic: 'Thời cổ dùng vỏ sò làm tiền nên mọi chữ về kinh doanh đều có Bộ Bối: 买 (Mua), 贵 (Đắt), 财 (Tài sản), 贸 (Thương mại).', examples: '买、贵、财、货、贸' },
      { rad: '艸 / 艹', pinyin: 'cǎo', hv: 'Bộ Thảo (Cỏ)', cat: 'NATURE', strokes: 3, meaning: 'Cỏ cây, hoa lá, thảo mộc, trà thuốc.', mnemonic: 'Chữ 茶 (Trà): Người (人) đứng giữa cỏ (艹) và cây gỗ (木) để hái lá trà.', examples: '花、茶、草、药、菜' }
    ];
    // =========================================================================
