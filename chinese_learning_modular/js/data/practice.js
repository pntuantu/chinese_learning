// Dữ liệu Luyện viết Mễ Tự Cách, Trắc nghiệm HSK, Ghép câu & Dịch thuật
// 5. CALLIGRAPHY CANVAS, ARENA QUIZ, SENTENCE BUILDER & TRANSLATION DATA
    // =========================================================================
    const CANVAS_CHARS_DATA = [
      { char: '永', trad: '永', pinyin: 'yǒng', hv: 'VĨNH', strokes: 5, radical: '水 (Thủy)', decomp: 'Chữ mẫu hội tụ đủ 8 nét Bát pháp (Điểm, Ngang, Sổ, Móc, Hất, Phiệt, Đoản phiệt, Mác).', level: 'LVL0' },
      { char: '好', trad: '好', pinyin: 'hǎo', hv: 'HẢO', strokes: 6, radical: '女 (Nữ)', decomp: 'Trái là Nữ (女), phải là Tử (子) — Tốt lành, viên mãn.', level: 'LVL1' },
      { char: '学', trad: '學', pinyin: 'xué', hv: 'HỌC', strokes: 8, radical: '子 (Tử)', decomp: 'Đứa trẻ (子) dưới mái trường (冖) tiếp thu tri thức.', level: 'LVL1' },
      { char: '爱', trad: '愛', pinyin: 'ài', hv: 'ÁI', strokes: 10, radical: '爫 (Trảo)', decomp: 'Phồn thể 愛 có chữ Tâm (心) ở chính giữa: Yêu bằng cả trái tim và tình bạn (友).', level: 'LVL2' },
      { char: '赢', trad: '贏', pinyin: 'yíng', hv: 'DOANH', strokes: 17, radical: '贝 (Bối)', decomp: 'Gồm 5 bộ: 亡 (Ý thức nguy cơ) + 口 (Giao tiếp) + 月 (Thời gian) + 贝 (Tài chính) + 凡 (Bình tâm) = Chiến thắng!', level: 'LVL3' },
      { char: '道', trad: '道', pinyin: 'dào', hv: 'ĐẠO', strokes: 12, radical: '辶 (Sước)', decomp: 'Cái đầu suy nghĩ (首) dẫn bước chân đi trên đường (辶) — Con đường, Đạo lý.', level: 'LVL4' },
      { char: '商', trad: '商', pinyin: 'shāng', hv: 'THƯƠNG', strokes: 11, radical: '口 (Khẩu)', decomp: 'Bàn bạc, trao đổi giá cả (口) để kinh doanh thương mại.', level: 'BIZ' }
    ];

    const ARENA_QUIZ_DATA = [
      {
        id: 'Q01', level: 'LVL0', type: 'Ngữ âm & Biến điệu',
        prompt: 'Khi đọc cụm từ "可以很好 (kěyǐ hěn hǎo - Có thể rất tốt)", cách xử lý biến điệu Thanh 3 chuẩn tự nhiên theo nhịp 2+2 là gì?',
        options: [
          'Giữ nguyên cả 4 thanh 3: kě yǐ hěn hǎo',
          'Nhịp (可以) + (很好) → đọc thành: kéyǐ hén hǎo',
          'Đọc cả 4 chữ thành thanh 2: ké yí hén háo',
          'Đọc thành thanh 4 hết'
        ],
        answer: 1,
        explain: 'Trong cụm 4 chữ tách nhịp 2+2 (可以 / 很好), mỗi cặp biến điệu thành 2+3 → kéyǐ hén hǎo.'
      },
      {
        id: 'Q02', level: 'LVL1', type: 'Ngữ pháp Sơ cấp',
        prompt: 'Chọn câu đúng trật tự ngữ pháp tiếng Trung: "Tôi làm việc ở Thành phố Hồ Chí Minh được 3 năm rồi."',
        options: [
          '我工作在胡志明市三年了。',
          '我在胡志明市工作三年了。',
          '我三年工作在胡志明市了。',
          '在胡志明市三年我工作了。'
        ],
        answer: 1,
        explain: 'Cụm giới từ chỉ địa điểm (在胡志明市) đứng TRƯỚC động từ (工作), còn bổ ngữ thời lượng (三年了) đứng SAU động từ.'
      },
      {
        id: 'Q03', level: 'LVL2', type: 'Câu chữ 把 & Bổ ngữ',
        prompt: 'Điền phương án chuẩn xác nhất vào chỗ trống: "请你________那份重要的合同交给王经理。"',
        options: [
          '被 (bèi)',
          '把 (bǎ)',
          '使 (shǐ)',
          '对 (duì)'
        ],
        answer: 1,
        explain: 'Hành động xử trí đưa một vật xác định (那份重要的合同) tới cho ai (交给王经理) bắt buộc dùng giới từ 把.'
      },
      {
        id: 'Q04', level: 'LVL3', type: 'Phân biệt Từ cận nghĩa HSK 6',
        prompt: 'Chọn cặp từ điền vào 2 chỗ trống: "________昨日24时，本次广交会线上报名已经正式________。"',
        options: [
          '截止 …… 截至',
          '截至 …… 截止',
          '由于 …… 从而',
          '以致 …… 以至'
        ],
        answer: 1,
        explain: 'Chỗ trống 1 đứng trước mốc thời gian "昨日24时" nên bắt buộc dùng "截至" (tính đến). Chỗ trống 2 đứng cuối câu làm vị ngữ chỉ sự kết thúc nên dùng "截止" (đóng lại/hết hạn).'
      },
      {
        id: 'Q05', level: 'LVL4', type: 'Bắt lỗi Bệnh Câu (病句 HSK 7–9)',
        prompt: 'Trong 4 câu dưới đây, câu nào HOÀN TOÀN ĐÚNG NGỮ PHÁP (không mắc lỗi bệnh câu)?',
        options: [
          '通过这次跨国并购谈判，使我们团队积累了宝贵的实战经验。',
          '他因为事先没有充分调研目标市场，以至造成了巨大的亏损。',
          '人工智能技术能否真正落地，关键在于企业是否具备高质量的数据基础。',
          '为了避免财务数据不再泄露，公司升级了加密系统。'
        ],
        answer: 2,
        explain: 'Câu 3 hoàn toàn chuẩn (Hai mặt 能否 đối ứng chuẩn với Hai mặt 是否). Câu 1 khuyết chủ ngữ (通过...使...). Câu 2 dùng sai 以至 (kết quả xấu 亏损 phải dùng 以致). Câu 4 phủ định thừa (避免...不再泄露).'
      },
      {
        id: 'Q06', level: 'BIZ', type: 'Đàm phán Ngoại thương',
        prompt: 'Trong hợp đồng nhập khẩu, điều khoản "不可抗力条款 (bùkěkànglì tiáokuǎn)" có nghĩa tiếng Việt là gì?',
        options: [
          'Điều khoản thanh toán trả chậm',
          'Điều khoản bất khả kháng (Force Majeure Clause)',
          'Điều khoản độc quyền phân phối',
          'Điều khoản bảo hành trọn đời'
        ],
        answer: 1,
        explain: '不可抗力 (Bất khả kháng lực - Force Majeure) quy định miễn trừ trách nhiệm khi xảy ra thiên tai, dịch bệnh, chiến tranh.'
      }
    ];

    const SENTENCE_BUILDER_DATA = [
      {
        id: 'S01', level: 'LVL1',
        vi: 'Chiều mai tôi đi hiệu sách mua hai quyển từ điển tiếng Trung.',
        tokens: ['我', '明天下午', '去书店', '买', '两本', '汉语词典。'],
        answer: '我明天下午去书店买两本汉语词典。',
        grammarTip: 'Trật tự câu liên động: Chủ ngữ (我) + Thời gian (明天下午) + Đi đâu (去书店) + Làm gì (买两本汉语词典).'
      },
      {
        id: 'S02', level: 'LVL2',
        vi: 'Trợ lý đã dịch xong bản hợp đồng đó sang tiếng Việt rồi.',
        tokens: ['助理', '已经', '把那份合同', '翻译成', '越南语', '了。'],
        answer: '助理已经把那份合同翻译成越南语了。',
        grammarTip: 'Câu chữ 把: Chủ ngữ (助理) + Phó từ (已经) + 把 + Tân ngữ (那份合同) + Động từ (翻译) + Bổ ngữ kết quả (成越南语了).'
      },
      {
        id: 'S03', level: 'LVL3',
        vi: 'Thay vì bị động chờ đợi cơ hội, chi bằng chủ động nâng cao năng lực cạnh tranh cốt lõi.',
        tokens: ['与其', '被动地', '等待机会，', '不如', '主动提升', '核心竞争力。'],
        answer: '与其被动地等待机会，不如主动提升核心竞争力。',
        grammarTip: 'Cấu trúc lựa chọn chiến lược: 与其 [Phương án A kém] ，不如 [Phương án B tối ưu].'
      },
      {
        id: 'S04', level: 'LVL4',
        vi: 'Chỉ có chuẩn bị phòng ngừa từ sớm mới có thể đứng vững ở thế bất bại trong biến động.',
        tokens: ['唯有', '未雨绸缪，', '方能在', '行业剧变中', '立于', '不败之地。'],
        answer: '唯有未雨绸缪，方能在行业剧变中立于不败之地。',
        grammarTip: 'Cấu trúc văn ngôn cao cấp: 唯有…方能… (Chỉ có... mới có thể...) kết hợp thành ngữ 未雨绸缪 và 立于不败之地.'
      }
    ];

    const TRANSLATION_DOJO_DATA = [
      {
        id: 'T01',
        level: 'LVL1',
        title: 'Giao Tiếp Đời Sống & Công Sở Sơ Cấp',
        sourceVi: 'Xin hỏi, chiều nay lúc 3 giờ Giám đốc Vương có ở văn phòng không? Tôi muốn bàn với ông ấy về kế hoạch tuần sau.',
        keywords: ['请问', '下午', '三点', '办公室', '计划'],
        standardZh: '请问，今天下午三点王经理在办公室吗？我想跟他说一下下周的计划。',
        veteranZh: '请问王总今天下午三点在办公室吗？我想跟您汇报并沟通一下下周的工作计划。',
        notes: 'Ở mức độ chuẩn (HSK 2), chỉ cần đặt đúng thời gian "今天下午三点" trước "在办公室". Ở mức độ Đi làm/Chuyên nghiệp, dùng "王总" và động từ "汇报并沟通" (báo cáo và trao đổi) sẽ ghi điểm tuyệt đối.'
      },
      {
        id: 'T02',
        level: 'BIZ',
        title: 'Đàm Phán Hợp Đồng Ngoại Thương & Chiết Khấu',
        sourceVi: 'Nếu quý công ty có thể giảm 5% trên giá FOB và đảm bảo giao hàng trong vòng 25 ngày, chúng tôi sẵn sàng ký hợp đồng đặt 10.000 sản phẩm ngay tuần này.',
        keywords: ['如果', '贵', 'FOB', '交货', '合同'],
        standardZh: '如果贵公司能在FOB价格上便宜5%，并且在25天内交货，我们愿意这周签一万个产品的合同。',
        veteranZh: '倘若贵司能在离岸价（FOB）基础上让利5%，并确保于25天内完成交货，我方愿于本周内正式签署一万件的采购合同。',
        notes: 'Bản dịch Kỳ cựu thay "便宜" (rẻ - khẩu ngữ) bằng "让利/优惠" (nhượng lợi/ưu đãi), thay "签...合同" bằng "正式签署...采购合同" đúng chuẩn văn bản pháp lý B2B.'
      },
      {
        id: 'T03',
        level: 'LVL4',
        title: 'Bình Luận Kinh Tế & Triết Lý Quản Trị (HSK 7–9)',
        sourceVi: 'Sự cạnh tranh giữa các doanh nghiệp hiện đại, suy cho cùng là sự cạnh tranh về nhân tài và công nghệ lõi. Chỉ có nhìn rõ thời thế và chuẩn bị từ sớm mới phát triển bền vững.',
        keywords: ['企业', '竞争', '人才', '技术', '发展'],
        standardZh: '现代企业的竞争，最后是人才和核心技术的竞争。只有看清形势、提前准备，才能持续发展。',
        veteranZh: '现代企业之角逐，归根结底乃人才与核心技术之争。唯有审时度势、未雨绸缪，方能实现可持续发展。',
        notes: 'Sử dụng cụm 4 chữ (归根结底, 审时度势, 未雨绸缪) và cặp liên từ văn ngôn (唯有…方能…) biến câu văn thành đẳng cấp diễn thuyết C2 / HSK 9.'
      }
    ];

    const PLACEMENT_QUESTIONS = [
      {
        q: 'Câu 1 (Nhập Môn): Khi hai chữ mang Thanh 3 đi liền nhau như "你好 (nǐ hǎo)", chữ đầu tiên đọc thành thanh mấy?',
        opts: ['Thanh 1', 'Thanh 2 (ní hǎo)', 'Thanh 4', 'Giữ nguyên Thanh 3'],
        ans: 1
      },
      {
        q: 'Câu 2 (HSK 1–2): Chọn câu đúng ngữ pháp: "Anh ấy mua hai quyển sách ở hiệu sách hôm qua."',
        opts: ['他买二本书在书店昨天。', '他昨天在书店买了两本书。', '他在书店昨天买了二本书。', '昨天他买书两本在书店。'],
        ans: 1
      },
      {
        q: 'Câu 3 (HSK 3–4): Chọn câu dùng đúng cấu trúc chữ 把:',
        opts: ['我把那本词典没带来。', '请把会议资料发到我的邮箱里。', '她把这首歌非常喜欢。', '我把汉语学。'],
        ans: 1
      },
      {
        q: 'Câu 4 (HSK 5–6): Điền từ đúng: "________长达三年的研发，他们终于________人工智能算法攻克了这一难关。"',
        opts: ['通过 …… 经过', '经过 …… 通过', '由于 …… 以致', '不仅 …… 反而'],
        ans: 1
      },
      {
        q: 'Câu 5 (Thương mại): Thuật ngữ "最小起订量 (MOQ)" và "离岸价 (FOB)" dùng trong bối cảnh nào?',
        opts: ['Đặt phòng khách sạn du lịch', 'Đàm phán đơn hàng xuất nhập khẩu & ngoại thương', 'Khám chữa bệnh tại bệnh viện', 'Thi bằng lái xe'],
        ans: 1
      },
      {
        q: 'Câu 6 (Kỳ cựu HSK 7–9 & Cổ văn): Trong câu "知己知彼，百战不殆", chữ "殆 (dài)" có nghĩa là gì?',
        opts: ['Mệt mỏi', 'Nguy hiểm / Thất bại', 'Chậm trễ', 'Vui vẻ'],
        ans: 1
      }
    ];

    const CUSTOM_PATH_PRESETS = [
      {
        title: '🌱 Người Mới Bắt Đầu Từ Con Số 0',
        desc: 'Tập trung làm chủ Pinyin, 4 Thanh điệu, Biến điệu, 8 Nét chữ và 214 Bộ thủ Khang Hy.',
        level: 'LVL0', tab: 'pinyin', focus: 'PHONETICS'
      },
      {
        title: '🗣️ Giao Tiếp Phản Xạ Cấp Tốc (HSK 1–3)',
        desc: 'Mẫu câu sinh hoạt, mua sắm, du lịch, đặt lịch hẹn và bổ ngữ kết quả/xu hướng thực tế.',
        level: 'LVL1', tab: 'lessons', focus: 'CONVERSATION'
      },
      {
        title: '📐 Chuyên Gia Ngữ Pháp & Luyện Thi HSK 4–6',
        desc: 'Câu chữ 把/被, liên từ phức hợp, phân biệt từ cận nghĩa và bắt lỗi bệnh câu (病句).',
        level: 'LVL3', tab: 'lexicon', focus: 'GRAMMAR'
      },
      {
        title: '💼 Tiếng Trung Thương Mại, 1688 & Xuất Nhập Khẩu',
        desc: 'Đàm phán giá FOB/CIF, MOQ, hợp đồng B2B, chat xưởng 1688/Taobao và thuật ngữ AI.',
        level: 'BIZ', tab: 'lessons', focus: 'BUSINESS'
      },
      {
        title: '🐉 Kỳ Cựu HSK 7–9: Cổ Văn, Điển Cố & Dịch Thuật',
        desc: 'Văn ngôn Luận Ngữ, Binh pháp Tôn Tử, Thành ngữ bác học và luyện dịch Tín - Đạt - Nhã.',
        level: 'LVL4', tab: 'lexicon', focus: 'CLASSICAL'
      },
      {
        title: '🖌️ Luyện Viết Chữ Hán & Ôn Thẻ SRS Hàng Ngày',
        desc: 'Rèn nét chữ trên khung Mễ Tự Cách có chấm điểm tự động và lật thẻ 3D Spaced Repetition.',
        level: 'ALL', tab: 'writing', focus: 'ALL'
      }
    ];
    // =========================================================================
