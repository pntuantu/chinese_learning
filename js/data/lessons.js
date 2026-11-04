// Dữ liệu 14 Bài học chuyên sâu (Nhập môn -> HSK 9 & Thương mại)
// 2. CURRICULUM LESSONS DATASET (14 DEEP LESSONS ACROSS ALL LEVELS)
    // =========================================================================
    const LESSONS_DATA = [
      {
        id: 'L01',
        code: 'Bài 01 • Nhập Môn',
        level: 'LVL0',
        focus: 'PHONETICS',
        title: 'Hệ Thống Pinyin, 3 Nhóm Âm Dễ Nhầm & Quy Tắc Biến Điệu Thanh 3, 一, 不',
        summary: 'Làm chủ 21 Thanh mẫu, 36 Vận mẫu, cách phân biệt j/q/x - z/c/s - zh/ch/sh và quy tắc biến điệu tự nhiên.',
        xpReward: 50,
        keyTakeaways: [
          'Phân biệt âm bật hơi (p, t, k, q, c, ch) và âm không bật hơi (b, d, g, j, z, zh) bằng tờ giấy mỏng trước miệng.',
          'Quy tắc biến điệu Thanh 3: Hai thanh 3 đi liền nhau (3+3) thì âm đầu đọc thành Thanh 2 (2+3), ví dụ 你好 (nǐ hǎo → ní hǎo).',
          'Chữ 一 (yī) đọc thành yí trước Thanh 4 (一个 yí gè) và đọc thành yì trước Thanh 1, 2, 3 (一天 yì tiān, 一起 yì qǐ).',
          'Chữ 不 (bù) đọc thành bú khi đứng trước Thanh 4 (不对 bú duì, 不是 bú shì).'
        ],
        vocab: [
          { simp: '你好', trad: '你好', pinyin: 'nǐ hǎo (đọc: ní hǎo)', hanviet: 'NHĨ HẢO', pos: 'Thán từ', meaning: 'Xin chào (biến điệu 3+3 → 2+3)' },
          { simp: '不对', trad: '不對', pinyin: 'bù duì (đọc: bú duì)', hanviet: 'BẤT ĐỐI', pos: 'Cụm từ', meaning: 'Không đúng (不 biến điệu trước thanh 4)' },
          { simp: '一个', trad: '一個', pinyin: 'yī gè (đọc: yí gè)', hanviet: 'NHẤT CÁ', pos: 'Số-Lượng', meaning: 'Một cái / Một người (一 biến điệu trước thanh 4)' },
          { simp: '展览馆', trad: '展覽館', pinyin: 'zhǎnlǎnguǎn (đọc: zhánlánguǎn)', hanviet: 'TRIỂN LÃM QUÁN', pos: 'Danh từ', meaning: 'Nhà triển lãm (3 thanh 3 đi liền → 2+2+3)' }
        ],
        grammar: [
          {
            pattern: 'Thanh 3 + Thanh 3 → Thanh 2 + Thanh 3',
            explanation: 'Khi hai âm tiết mang thanh 3 đứng cạnh nhau trong cùng một nhịp ngữ điệu, âm tiết thứ nhất tự động chuyển thành thanh 2 (sắc/hỏi cao) để không bị nghẹn giọng. Lưu ý: khi viết Pinyin vẫn giữ nguyên dấu thanh 3 gốc!',
            wrong: 'Đọc rời từng chữ nặng nề: nǐ (thấp) + hǎo (thấp)',
            right: 'Đọc mượt: ní hǎo (你好), hén hǎo (很好), kěyǐ → kéyǐ (可以)'
          },
          {
            pattern: 'Nhóm vận mẫu "ü" đi với j, q, x, y → Bỏ dấu hai chấm trên đầu',
            explanation: 'Nguyên âm tròn môi ü khi kết hợp với j, q, x, y sẽ viết là ju, qu, xu, yu nhưng VẪN ĐỌC LÀ TRÒN MÔI (ü), tuyệt đối không đọc như âm "u" thường.',
            wrong: 'Đọc 去 (qù) giống như "khu" môi dẹt',
            right: 'Chúm tròn môi từ đầu đến cuối khi phát âm:居 (jū), 去 (qù), 学 (xué), 雨 (yǔ)'
          }
        ],
        dialogue: [
          { speaker: 'Giáo viên', simp: '你好！请问，这个字怎么读？', trad: '你好！請問，這個字怎麼讀？', pinyin: 'Nǐ hǎo! Qǐngwèn, zhège zì zěnme dú?', hanviet: 'Nhĩ hảo! Thỉnh vấn, giá cá tự chẩm ma độc?', vi: 'Xin chào! Cho hỏi chữ này đọc như thế nào?' },
          { speaker: 'Học viên', simp: '老师好！这个词读“展览馆”，要注意声调变化。', trad: '老師好！這個詞讀「展覽館」，要注意聲調變化。', pinyin: 'Lǎoshī hǎo! Zhège cí dú "zhǎnlǎnguǎn", yào zhùyì shēngdiào biànhuà.', hanviet: 'Lão sư hảo! Giá cá từ độc "triển lãm quán", yếu chú ý thanh điệu biến hóa.', vi: 'Chào thầy/cô! Từ này đọc là "zhǎnlǎnguǎn", cần chú ý quy tắc biến điệu.' }
        ],
        quiz: {
          question: 'Khi phát âm cụm từ "不客气 (bù kèqi - Đừng khách sáo)", chữ "不" sẽ được đọc theo thanh mấy?',
          options: [
            'Giữ nguyên thanh 4 (bù)',
            'Biến thành thanh 2 (bú) vì đứng trước chữ 客 (kè) mang thanh 4',
            'Biến thành thanh 1 (bū)',
            'Biến thành thanh nhẹ (bu)'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Chữ 客 (kè) mang thanh 4, nên 不 (bù) đứng trước nó phải đọc thành thanh 2: bú kèqi.'
        }
      },
      {
        id: 'L02',
        code: 'Bài 02 • Nhập Môn',
        level: 'LVL0',
        focus: 'PHONETICS',
        title: 'Cấu Trúc Không Gian Chữ Hán, Bát Pháp Vĩnh Tự & 7 Quy Tắc Bút Thuận',
        summary: 'Hiểu bản chất chữ tượng hình, chỉ sự, hội ý, hình thanh (80% chữ Hán) và quy tắc viết chữ đẹp.',
        xpReward: 50,
        keyTakeaways: [
          'Hơn 80% chữ Hán hiện đại là chữ Hình Thanh (形声字): gồm 1 Bộ thủ chỉ ý nghĩa (Hình phù) + 1 phần gợi âm đọc (Thanh phù).',
          'Ví dụ: Bộ Thanh 青 (qīng) làm gốc âm → thêm 氵(nước) thành 清 (qīng - trong sạch); thêm 忄(tâm) thành 情 (qíng - tình cảm); thêm 讠(lời nói) thành 请 (qǐng - xin mời); thêm 日 (mặt trời) thành 晴 (qíng - trời nắng).',
          '7 quy tắc bút thuận cơ bản: Ngang trước sổ sau (十), Phiệt trước mác sau (八), Trên trước dưới sau (三), Trái trước phải sau (林), Ngoài trước trong sau (同), Vào nhà trước đóng cửa sau (回), Giữa trước hai bên sau (小, 水).'
        ],
        vocab: [
          { simp: '汉字', trad: '漢字', pinyin: 'Hànzì', hanviet: 'HÁN TỰ', pos: 'Danh từ', meaning: 'Chữ Hán' },
          { simp: '部首', trad: '部首', pinyin: 'bùshǒu', hanviet: 'BỘ THỦ', pos: 'Danh từ', meaning: 'Bộ thủ (gốc phân loại ý nghĩa chữ Hán)' },
          { simp: '笔顺', trad: '筆順', pinyin: 'bǐshùn', hanviet: 'BÚT THUẬN', pos: 'Danh từ', meaning: 'Thứ tự nét viết' },
          { simp: '晴天', trad: '晴天', pinyin: 'qíngtiān', hanviet: 'TÌNH THIÊN', pos: 'Danh từ', meaning: 'Trời nắng đẹp (Bộ Nhật 日 + âm Thanh 青)' }
        ],
        grammar: [
          {
            pattern: 'Phương pháp nhớ chữ Hán theo chuỗi Hình - Thanh (Bộ thủ + Thanh phù)',
            explanation: 'Thay vì học vẹt từng nét rời rạc, hãy tách chữ thành [Bộ thủ chỉ ý] + [Phần âm]. Khi gặp chữ lạ, nhìn Bộ thủ đoán trường nghĩa, nhìn phần còn lại đoán âm đọc.',
            wrong: 'Học thuộc lòng từng gạch ngang dọc của chữ 请, 清, 情, 晴, 睛 như 5 chữ xa lạ',
            right: 'Nhóm chung gốc 青 (qīng/qíng/qǐng): 讠(Lời nói → 请 mời), 氵(Nước → 清 trong), 忄(Tâm → 情 tình), 日(Mặt trời → 晴 nắng), 目(Mắt → 睛 con ngươi)'
          }
        ],
        dialogue: [
          { speaker: 'Học viên', simp: '汉字太难写了，怎么才能记住这么多字？', trad: '漢字太難寫了，怎麼才能記住這麼多字？', pinyin: 'Hànzì tài nán xiě le, zěnme cáinéng jìzhù zhème duō zì?', hanviet: 'Hán tự thái nan tả liễu, chẩm ma tài năng ký trụ giá ma đa tự?', vi: 'Chữ Hán khó viết quá, làm sao mới nhớ được nhiều chữ như vậy?' },
          { speaker: 'Giáo viên', simp: '先学好部首和笔顺，拆字记忆就会事半功倍。', trad: '先學好部首和筆順，拆字記憶就會事半功倍。', pinyin: 'Xiān xuéhǎo bùshǒu hé bǐshùn, chāizì jìyì jiù huì shìbàn-gōngbèi.', hanviet: 'Tiên học hảo bộ thủ hòa bút thuận, sách tự ký ức tựu hội sự bán công bội.', vi: 'Hãy học kỹ bộ thủ và bút thuận trước, nhớ bằng cách chiết tự sẽ tốn một nửa công sức mà hiệu quả gấp đôi.' }
        ],
        quiz: {
          question: 'Theo quy tắc bút thuận "Vào trước đóng sau", khi viết chữ 回 (huí - quay về) hoặc 国 (guó - quốc gia), nét nào được viết CUỐI CÙNG?',
          options: [
            'Nét sổ bên trái của khung ngoài',
            'Các nét bên trong lòng chữ',
            'Nét ngang đáy khép kín khung ngoài (đóng cửa)',
            'Nét ngang trên cùng'
          ],
          correctIndex: 2,
          explanation: 'Chuẩn xác! Với các chữ bao vây 4 phía (囗), ta viết khung ngoài trước (trừ nét đáy), viết hết phần bên trong rồi mới kéo nét ngang đáy cuối cùng để "đóng cửa".'
        }
      },
      {
        id: 'L03',
        code: 'Bài 03 • Sơ Cấp HSK 1',
        level: 'LVL1',
        focus: 'CONVERSATION',
        title: 'Chào Hỏi, Giới Thiệu Quốc Tịch, Nghề Nghiệp & Câu Chữ 是, 吗, 呢',
        summary: 'Làm chủ cấu trúc câu khẳng định, phủ định với 不, câu hỏi nghi vấn 吗 và câu hỏi tỉnh lược 呢.',
        xpReward: 60,
        keyTakeaways: [
          'Trật tự câu cơ bản trong tiếng Trung giống tiếng Việt (SVO): Chủ ngữ + Động từ + Tân ngữ.',
          'Phó từ phủ định 不 (bù) luôn đứng TRƯỚC động từ hoặc tính từ: 我不是老师 (Tôi không phải là giáo viên).',
          'Trợ từ nghi vấn 吗 (ma) đặt cuối câu trần thuật để biến thành câu hỏi Có/Không.',
          'Bổ ngữ định ngữ sở hữu: Định ngữ + 的 + Trung tâm ngữ (Ngược với tiếng Việt: "Sách của tôi" → 我的书).'
        ],
        vocab: [
          { simp: '越南', trad: '越南', pinyin: 'Yuènán', hanviet: 'VIỆT NAM', pos: 'Danh từ', meaning: 'Nước Việt Nam' },
          { simp: '留学生', trad: '留學生', pinyin: 'liúxuéshēng', hanviet: 'LƯU HỌC SINH', pos: 'Danh từ', meaning: 'Du học sinh' },
          { simp: '工程师', trad: '工程師', pinyin: 'gōngchéngshī', hanviet: 'CÔNG TRÌNH SƯ', pos: 'Danh từ', meaning: 'Kỹ sư' },
          { simp: '认识', trad: '認識', pinyin: 'rènshi', hanviet: 'NHẬN THỨC', pos: 'Động từ', meaning: 'Quen biết, làm quen' }
        ],
        grammar: [
          {
            pattern: 'Cấu trúc Cụm Danh Từ: [Định ngữ / Thuộc tính] + 的 + [Danh từ chính]',
            explanation: 'Đây là khác biệt lớn nhất giữa tiếng Việt và tiếng Trung ở giai đoạn sơ cấp. Trong tiếng Trung, mọi thành phần bổ nghĩa cho danh từ đều phải đặt TRƯỚC danh từ chính (và đứng trước chữ 的).',
            wrong: '书我的 (Sách của tôi - dịch từng chữ theo trật tự tiếng Việt)',
            right: '我的书 (Sách của tôi) • 很好的朋友 (Người bạn rất tốt)'
          }
        ],
        dialogue: [
          { speaker: 'Minh', simp: '你好，我是越南留学生。你也是学生吗？', trad: '你好，我是越南留學生。你也是學生嗎？', pinyin: 'Nǐ hǎo, wǒ shì Yuènán liúxuéshēng. Nǐ yě shì xuéshēng ma?', hanviet: 'Nhĩ hảo, ngã thị Việt Nam lưu học sinh. Nhĩ dã thị học sinh ma?', vi: 'Xin chào, tôi là du học sinh Việt Nam. Bạn cũng là học sinh phải không?' },
          { speaker: 'Lâm', simp: '我不是学生，我是软件工程师。很高兴认识你！', trad: '我不是學生，我是軟件工程師。很高興認識你！', pinyin: 'Wǒ bú shì xuéshēng, wǒ shì ruǎnjiàn gōngchéngshī. Hěn gāoxìng rènshi nǐ!', hanviet: 'Ngã bất thị học sinh, ngã thị nhuyễn kiện công trình sư. Ngận cao hứng nhận thức nhĩ!', vi: 'Tôi không phải học sinh, tôi là kỹ sư phần mềm. Rất vui được làm quen với bạn!' }
        ],
        quiz: {
          question: 'Dịch câu "Cô ấy là giáo viên tiếng Trung của tôi" sang tiếng Trung đúng trật tự ngữ pháp:',
          options: [
            '她是老师汉语的我的。',
            '她是我的汉语老师。',
            '她是汉语老师我的。',
            '她我的汉语是老师。'
          ],
          correctIndex: 1,
          explanation: 'Đúng! Định ngữ sở hữu "我的" (của tôi) và định ngữ chuyên môn "汉语" (tiếng Trung) phải đặt trước danh từ chính "老师" (giáo viên): 她是我的汉语老师。'
        }
      },
      {
        id: 'L04',
        code: 'Bài 04 • Sơ Cấp HSK 2',
        level: 'LVL1',
        focus: 'GRAMMAR',
        title: 'Trật Tự Thời Gian – Địa Điểm, Lượng Từ Đặc Thù & Phân Biệt 二 vs 两',
        summary: 'Nắm vững quy tắc vàng: [Chủ ngữ + Thời gian + Địa điểm + Động từ] và hệ thống lượng từ tiếng Trung.',
        xpReward: 70,
        keyTakeaways: [
          'Quy tắc trật tự trạng ngữ: Thời gian (Từ lớn đến nhỏ: Năm → Tháng → Ngày → Buổi → Giờ) + Tại Địa điểm (在 + Nơi chốn) + Hành động.',
          'Giữa Số từ (hay 这/那/哪/几) và Danh từ BẮT BUỘC phải có Lượng từ phù hợp (个, 本, 件, 条, 张, 杯, 辆...).',
          'Phân biệt 二 (èr) và 两 (liǎng): Đếm số thứ tự, số điện thoại, hàng chục dùng 二 (二十, 第二); đi trước Lượng từ và Hàng nghìn/vạn dùng 两 (两个人, 两本书, 两千).'
        ],
        vocab: [
          { simp: '件', trad: '件', pinyin: 'jiàn', hanviet: 'KIỆN', pos: 'Lượng từ', meaning: 'Chiếc, cái (dùng cho áo quần, hành lý, sự việc)' },
          { simp: '条', trad: '條', pinyin: 'tiáo', hanviet: 'ĐIỀU', pos: 'Lượng từ', meaning: 'Con, chiếc, dòng (dùng cho vật dài: đường, sông, cá, quần, tin nhắn)' },
          { simp: '张', trad: '張', pinyin: 'zhāng', hanviet: 'TRƯƠNG', pos: 'Lượng từ', meaning: 'Tờ, chiếc (dùng cho vật có bề mặt phẳng: vé, bàn, giường, giấy, ảnh)' },
          { simp: '咖啡馆', trad: '咖啡館', pinyin: 'kāfēiguǎn', hanviet: 'CA PHÊ QUÁN', pos: 'Danh từ', meaning: 'Quán cà phê' }
        ],
        grammar: [
          {
            pattern: 'Chủ ngữ + [Thời gian] + [在 + Địa điểm] + Động từ + Tân ngữ',
            explanation: 'Người Việt hay nói "Tôi uống cà phê ở quán lúc 8 giờ sáng", nhưng tiếng Trung bắt buộc đưa Thời gian và Địa điểm lên TRƯỚC động từ!',
            wrong: '我喝咖啡在咖啡馆今天早上八点。',
            right: '我今天早上八点在咖啡馆喝咖啡。'
          }
        ],
        dialogue: [
          { speaker: 'Lan', simp: '你明天下午三点在哪里工作？', trad: '你明天下午三點在哪裡工作？', pinyin: 'Nǐ míngtiān xiàwǔ sān diǎn zài nǎlǐ gōngzuò?', hanviet: 'Nhĩ minh thiên hạ ngọ tam điểm tại ná lý công tác?', vi: '3 giờ chiều mai bạn làm việc ở đâu?' },
          { speaker: 'Hùng', simp: '我明天下午在公司开会，还要买两张去北京的机票。', trad: '我明天下午在公司開會，還要買兩張去北京的機票。', pinyin: 'Wǒ míngtiān xiàwǔ zài gōngsī kāihuì, hái yào mǎi liǎng zhāng qù Běijīng de jīpiào.', hanviet: 'Ngã minh thiên hạ ngọ tại công ty khai hội, hoàn yếu mãi lưỡng trương khứ Bắc Kinh đích cơ phiếu.', vi: 'Chiều mai tôi họp ở công ty, còn phải mua hai tấm vé máy bay đi Bắc Kinh.' }
        ],
        quiz: {
          question: 'Câu nào dưới đây đúng chuẩn ngữ pháp tiếng Trung khi diễn đạt "Hôm qua tôi mua 2 chiếc áo sơ mi ở trung tâm thương mại"?',
          options: [
            '我买二件衬衫在商场昨天。',
            '我昨天在商场买了两件衬衫。',
            '我昨天买了二件衬衫在商场。',
            '我在商场昨天买了两衬衫。'
          ],
          correctIndex: 1,
          explanation: 'Tuyệt vời! "昨天" (thời gian) + "在商场" (địa điểm) đứng trước động từ "买了", và trước lượng từ "件" phải dùng "两" chứ không dùng "二".'
        }
      },
      {
        id: 'L05',
        code: 'Bài 05 • Trung Cấp HSK 3',
        level: 'LVL2',
        focus: 'GRAMMAR',
        title: 'Hệ Thống Bổ Ngữ Kết Quả, Bổ Ngữ Xu Hướng & Bổ Ngữ Khả Năng',
        summary: 'Làm chủ linh hồn của động từ tiếng Trung: 看见 vs 看懂, 走出来 vs 想起来, 买得起 vs 买不起.',
        xpReward: 85,
        keyTakeaways: [
          'Bổ ngữ kết quả (Động từ + 完/好/懂/见/错/到/住): Cho biết kết quả cụ thể của hành động (听懂: nghe hiểu, 记不住: không nhớ nổi).',
          'Bổ ngữ xu hướng kép (上/下/进/出/回/过/起 + 来/去): Nghĩa gốc chỉ hướng di chuyển, nghĩa bóng chỉ trạng thái (想起来: nhớ ra; 坚持下去: kiên trì tiếp tục; 看出来: nhìn nhận ra).',
          'Bổ ngữ khả năng (V + 得/不 + Bổ ngữ): Diễn tả đủ hay không đủ điều kiện/năng lực để đạt kết quả (吃得完: ăn hết nổi; 买不起: không đủ tiền mua).'
        ],
        vocab: [
          { simp: '来得及', trad: '來得及', pinyin: 'láidejí', hanviet: 'LAI ĐẮC CẬP', pos: 'Cụm bổ ngữ', meaning: 'Kịp thời gian (Phủ định: 来不及 - không kịp nữa)' },
          { simp: '买不起', trad: '買不起', pinyin: 'mǎibuqǐ', hanviet: 'MÃI BẤT KHỞI', pos: 'Cụm bổ ngữ', meaning: 'Không đủ khả năng tài chính để mua' },
          { simp: '想起来', trad: '想起來', pinyin: 'xiǎng qǐlái', hanviet: 'TƯỞNG KHỞI LAI', pos: 'Động-Bổ', meaning: 'Nhớ lại được (thông tin vốn đã quên)' },
          { simp: '坚持下去', trad: '堅持下去', pinyin: 'jiānchí xiàqù', hanviet: 'KIÊN TRÌ HẠ KHỨ', pos: 'Động-Bổ', meaning: 'Tiếp tục kiên trì đến cùng' }
        ],
        grammar: [
          {
            pattern: 'Vị trí Tân ngữ trong Bổ ngữ xu hướng kép: V + 进/出/回/过/上/下 + [Tân ngữ chỉ nơi chốn] + 来/去',
            explanation: 'Nếu tân ngữ là ĐỊA ĐIỂM/NƠI CHỐN, tân ngữ bắt buộc phải kẹp ở giữa bổ ngữ xu hướng và 来/去! Nếu tân ngữ là sự vật thông thường, có thể đặt giữa hoặc đặt cuối.',
            wrong: '他走进来教室了。(Sai vì 教室 là tân ngữ chỉ nơi chốn)',
            right: '他走进教室来了。(Anh ấy bước vào trong lớp học rồi)'
          }
        ],
        dialogue: [
          { speaker: 'An', simp: '市中心的房子太贵了，现在的年轻人真的买得起吗？', trad: '市中心的房子太貴了，現在的年輕人真的買得起嗎？', pinyin: 'Shìzhōngxīn de fángzi tài guì le, xiànzài de niánqīngrén zhēnde mǎideqǐ ma?', hanviet: 'Thị trung tâm đích phòng tử thái quý liễu, hiện tại đích niên khinh nhân chân đích mãi đắc khởi ma?', vi: 'Nhà ở trung tâm thành phố đắt quá, người trẻ hiện nay thực sự đủ tiền mua nổi sao?' },
          { speaker: 'Bình', simp: '一下子肯定买不起，但只要努力工作、坚持下去，总有一天能买到。', trad: '一下子肯定買不起，但只要努力工作、堅持下去，總有一天能買到。', pinyin: 'Yíxiàzi kěndìng mǎibuqǐ, dàn zhǐyào nǔlì gōngzuò, jiānchí xiàqù, zǒng yǒu yì tiān néng mǎidào.', hanviet: 'Nhất hạ tử khẳng định mãi bất khởi, đản chỉ yếu nỗ lực công tác, kiên trì hạ khứ, tổng hữu nhất thiên năng mãi đáo.', vi: 'Một chốc một lát chắc chắn chưa mua nổi, nhưng chỉ cần nỗ lực làm việc và kiên trì tiếp tục,ắt có ngày mua được.' }
        ],
        quiz: {
          question: 'Chọn câu đúng ngữ pháp để nói: "Anh ấy đã quay trở về nước rồi":',
          options: [
            '他回来国了。',
            '他回国来了。',
            '他来回国了。',
            '他回来了国。'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! "国" (quốc gia) là tân ngữ chỉ địa điểm nên phải đặt giữa "回" và "来": 回国来.'
        }
      },
      {
        id: 'L06',
        code: 'Bài 06 • Trung Cấp HSK 4',
        level: 'LVL2',
        focus: 'GRAMMAR',
        title: 'Tuyệt Kỹ Câu Chữ 把 (Xử Trí Thức) & Câu Bị Động Chữ 被 / 叫 / 让',
        summary: 'Nắm chắc 5 điều kiện bắt buộc của câu chữ 把 và cách chuyển đổi chủ động - bị động tự nhiên.',
        xpReward: 90,
        keyTakeaways: [
          'Câu chữ 把 dùng để nhấn mạnh sự tác động làm THAY ĐỔI vị trí, trạng thái hoặc kết quả của một tân ngữ xác định.',
          'Công thức: Chủ ngữ + [Không/Chưa/Phó từ: 没/别/已经] + 把 + Tân ngữ xác định + Động từ + Thành phần khác (了 / Bổ ngữ kết quả / Bổ ngữ xu hướng / 在 / 到 / 给 / 成).',
          'Cấm kỵ trong câu chữ 把: Động từ KHÔNG ĐƯỢC đứng trơ trọi một mình cuối câu, và không dùng với động từ tâm lý/nhận thức (知道, 喜欢, 觉得, 看见).',
          'Câu bị động chữ 被: Tân ngữ chịu tác động + 被 (+ Tác nhân) + Động từ + Thành phần kết quả.'
        ],
        vocab: [
          { simp: '整理', trad: '整理', pinyin: 'zhěnglǐ', hanviet: 'CHỈNH LÝ', pos: 'Động từ', meaning: 'Sắp xếp, dọn dẹp gọn gàng' },
          { simp: '翻译成', trad: '翻譯成', pinyin: 'fānyì chéng', hanviet: 'PHIÊN DỊCH THÀNH', pos: 'Động-Bổ', meaning: 'Dịch sang / chuyển ngữ thành...' },
          { simp: '批评', trad: '批評', pinyin: 'pīpíng', hanviet: 'PHÊ BÌNH', pos: 'Động từ', meaning: 'Phê bình, khiển trách' },
          { simp: '弄丢', trad: '弄丟', pinyin: 'nòngdiū', hanviet: 'LỘNG ĐIU', pos: 'Động-Bổ', meaning: 'Làm mất, đánh rơi' }
        ],
        grammar: [
          {
            pattern: 'Chủ ngữ + (没/别) + 把 + Tân ngữ + Động từ + [Bổ ngữ / 了 / Tân ngữ 2]',
            explanation: 'Phó từ phủ định (没, 别) và động từ năng nguyện (想, 要, 应该) BẮT BUỘC phải đặt TRƯỚC chữ 把, tuyệt đối không đặt trước động từ chính!',
            wrong: '我把那份合同没放在桌子上。(Sai vị trí chữ 没)',
            right: '我没把那份合同放在桌子上。(Tôi đã không để bản hợp đồng đó trên bàn)'
          }
        ],
        dialogue: [
          { speaker: 'Trưởng phòng', simp: '小王，你把那份市场调查报告翻译成越南语了吗？', trad: '小王，你把那份市場調查報告翻譯成越南語了嗎？', pinyin: 'Xiǎo Wáng, nǐ bǎ nà fèn shìchǎng diàochá bàogào fānyì chéng Yuènányǔ le ma?', hanviet: 'Tiểu Vương, nhĩ bả na phần thị trường điều tra báo cáo phiên dịch thành Việt Nam ngữ liễu ma?', vi: 'Tiểu Vương, cậu đã dịch bản báo cáo khảo sát thị trường đó sang tiếng Việt chưa?' },
          { speaker: 'Tiểu Vương', simp: '已经翻译好了，而且我已经把文件发到您的邮箱里了。', trad: '已經翻譯好了，而且我已經把文件發到您的郵箱裡了。', pinyin: 'Yǐjīng fānyì hǎo le, érqiě wǒ yǐjīng bǎ wénjiàn fā dào nín de yóuxiāng lǐ le.', hanviet: 'Dĩ kinh phiên dịch hảo liễu, nhi thả ngã dĩ kinh bả văn kiện phát đáo ngài đích bưu tương lý liễu.', vi: 'Dịch xong rồi ạ, hơn nữa em đã gửi tài liệu vào hòm thư của sếp rồi.' }
        ],
        quiz: {
          question: 'Câu nào dưới đây SAI ngữ pháp khi sử dụng cấu trúc chữ 把?',
          options: [
            '请把空调关掉。',
            '他把护照弄丢了。',
            '我把这首歌很喜欢。',
            '妈妈把房间整理得干干净净。'
          ],
          correctIndex: 2,
          explanation: 'Chính xác! "喜欢" (thích) là động từ tâm lý cảm xúc, không gây ra sự dịch chuyển hay biến đổi trạng thái lên tân ngữ nên KHÔNG ĐƯỢC dùng câu chữ 把. Phải nói: 我很喜欢这首歌。'
        }
      },
      {
        id: 'L07',
        code: 'Bài 07 • Trung Cấp HSK 4',
        level: 'LVL2',
        focus: 'CONVERSATION',
        title: 'Hệ Thống Liên Từ Phức Hợp & Lập Luận Logic Trong Giao Tiếp Xã Hội',
        summary: 'Sử dụng nhuần nhuyễn 不仅…而且…, 即使…也…, 无论…都…, 与其…不如… để diễn đạt sắc bén.',
        xpReward: 90,
        keyTakeaways: [
          'Nhóm Nhượng bộ giả định: 即使…也… (Cho dù... cũng... - giả định chưa xảy ra) khác với 虽然…但是… (Mặc dù... nhưng... - sự thật đã xảy ra).',
          'Nhóm Bất luận điều kiện: 无论/不管…都… (Bất luận... đều...) luôn đòi hỏi có đại từ nghi vấn (谁, 什么, 怎么, 多么) hoặc lựa chọn A还是B ở vế đầu.',
          'Nhóm Chọn lựa so sánh: 与其 A，不如 B (Thà rằng A chi bằng B — khuyên bỏ A chọn B).'
        ],
        vocab: [
          { simp: '与其…不如…', trad: '與其…不如…', pinyin: 'yǔqí... bùrú...', hanviet: 'DỮ KỲ... BẤT NHƯ...', pos: 'Liên từ', meaning: 'Thay vì A thì chi bằng B (khẳng định B tốt hơn)' },
          { simp: '即使…也…', trad: '即使…也…', pinyin: 'jíshǐ... yě...', hanviet: 'TỨC SỬ... DÃ...', pos: 'Liên từ', meaning: 'Cho dù / Giả sử... thì cũng...' },
          { simp: '不仅…而且…', trad: '不僅…而且…', pinyin: 'bùjǐn... érqiě...', hanviet: 'BẤT CẨN... NHI THẢ...', pos: 'Liên từ', meaning: 'Không những... mà còn...' },
          { simp: '效率', trad: '效率', pinyin: 'xiàolǜ', hanviet: 'HIỆU SUẤT', pos: 'Danh từ', meaning: 'Hiệu suất, năng suất làm việc' }
        ],
        grammar: [
          {
            pattern: '与其 + [Phương án kém hơn]，不如 + [Phương án tối ưu hơn]',
            explanation: 'Cấu trúc cực kỳ đắt giá để đưa ra lời khuyên hoặc quyết định chiến lược khi đã cân nhắc lợi hại của hai phương án.',
            wrong: '与其坐出租车堵在路上，不如我们坐地铁去吧。(Thiếu sự cân xứng nhịp câu)',
            right: '与其坐出租车堵在路上，不如坐地铁去，既准时又省钱。'
          }
        ],
        dialogue: [
          { speaker: 'Quản lý', simp: '与其每天加班到深夜，不如优化一下工作流程，提高效率。', trad: '與其每天加班到深夜，不如優化一下工作流程，提高效率。', pinyin: 'Yǔqí měitiān jiābān dào shēnyè, bùrú yōuhuà yíxià gōngzuò liúchéng, tígāo xiàolǜ.', hanviet: 'Dữ kỳ mỗi thiên gia ban đáo thâm dạ, bất như ưu hóa nhất hạ công tác lưu trình, đề cao hiệu suất.', vi: 'Thay vì ngày nào cũng tăng ca đến tận khuya, chi bằng tối ưu hóa quy trình làm việc để nâng cao hiệu suất.' },
          { speaker: 'Đồng nghiệp', simp: '您说得对。无论遇到什么困难，我们都应该用科学的方法解决。', trad: '您說得對。無論遇到什麼困難，我們都應該用科學的方法解決。', pinyin: 'Nín shuō de duì. Wúlùn yùdào shénme kùnnan, wǒmen dōu yīnggāi yòng kēxué de fāngfǎ jiějué.', hanviet: 'Ngài thuyết đắc đối. Vô luận ngộ đáo thập ma khốn nan, ngã môn đô ưng cai dụng khoa học đích phương pháp giải quyết.', vi: 'Sếp nói rất đúng. Bất luận gặp phải khó khăn gì, chúng ta đều nên dùng phương pháp khoa học để giải quyết.' }
        ],
        quiz: {
          question: 'Điền cặp liên từ thích hợp nhất: "____ 在家抱怨生活无聊，____ 出去学习一项新技能。"',
          options: [
            '虽然……但是……',
            '与其……不如……',
            '因为……所以……',
            '不但……而且……'
          ],
          correctIndex: 1,
          explanation: 'Đúng! Câu đang đối chiếu việc "ở nhà than vãn" (kém) với việc "ra ngoài học một kỹ năng mới" (tốt hơn), nên dùng "与其……不如……" (Thay vì... chi bằng...).'
        }
      }
    ];
    // Append Advanced, Veteran & Business Lessons (L08 - L14)
    LESSONS_DATA.push(
      {
        id: 'L08',
        code: 'Bài 08 • Cao Cấp HSK 5',
        level: 'LVL3',
        focus: 'READING',
        title: 'Văn Phong Báo Chí, Hư Từ Văn Viết (书面语) & Phân Biệt Từ Cận Nghĩa',
        summary: 'Chuyển đổi từ khẩu ngữ sang văn viết trang trọng: 从而 vs 进而, 鉴于, 致力于, 意味着.',
        xpReward: 110,
        keyTakeaways: [
          'Trong báo chí và báo cáo học thuật, người Trung Quốc thay thế từ khẩu ngữ bằng từ song âm tiết trang trọng (书面语): 帮 → 协助; 觉得 → 认为; 因为 → 鉴于/由于; 很多 → 诸多.',
          'Phân biệt 从而 (cóng\'ér - từ đó dẫn đến kết quả tất yếu từ hành động trước) và 进而 (jìn\'ér - tiến thêm một bước nữa trên nền tảng đã có).',
          'Cấu trúc 致力于 + [Mục tiêu lớn] (Dốc sức/tâm huyết vào công cuộc...).'
        ],
        vocab: [
          { simp: '致力于', trad: '致力於', pinyin: 'zhìlì yú', hanviet: 'CHÍ LỰC Ư', pos: 'Động từ', meaning: 'Dốc sức vào, cống hiến tâm lực cho...' },
          { simp: '鉴于', trad: '鑑於', pinyin: 'jiànyú', hanviet: 'GIÁM Ư', pos: 'Giới từ', meaning: 'Xét thấy, căn cứ vào (dùng mở đầu văn bản/quyết định)' },
          { simp: '从而', trad: '從而', pinyin: 'cóng\'ér', hanviet: 'TÙNG NHI', pos: 'Liên từ', meaning: 'Từ đó, nhờ đó mà (nối nguyên nhân/phương pháp với kết quả)' },
          { simp: '潜移默化', trad: '潛移默化', pinyin: 'qiányí-mòhuà', hanviet: 'TIỀM DI MẶC HÓA', pos: 'Thành ngữ', meaning: 'Mưa dầm thấm lâu, tác động thay đổi một cách tự nhiên vô hình' }
        ],
        grammar: [
          {
            pattern: '鉴于 + [Tình hình/Thực tế khách quan]，Chủ ngữ + [Đưa ra quyết định/Biện pháp]',
            explanation: 'Cấu trúc mở đầu cực kỳ phổ biến trong thông cáo báo chí, biên bản cuộc họp hoặc hợp đồng kinh tế.',
            wrong: '鉴于他很累，所以睡觉了。(Quá khẩu ngữ, không hợp văn phong trang trọng của 鉴于)',
            right: '鉴于目前原材料价格持续上涨，公司决定调整下季度的采购策略。'
          }
        ],
        dialogue: [
          { speaker: 'Bản tin Kinh tế', simp: '鉴于全球供应链正在经历深刻调整，许多企业致力于推动数字化转型，从而大幅降低了运营成本。', trad: '鑑於全球供應鏈正在經歷深刻調整，許多企業致力於推動數字化轉型，從而大幅降低了運營成本。', pinyin: 'Jiànyú quánqiú gōngyìngliàn zhèngzài jīnglì shēnkè tiáozhěng, xǔduō qǐyè zhìlì yú tuīdòng shùzìhuà zhuǎnxíng, cóng\'ér dàfú jiàngdī le yùnyíng chéngběn.', hanviet: 'Giám ư toàn cầu cung ứng liên chính tại kinh lịch thâm khắc điều chỉnh, hứa đa xí nghiệp chí lực ư thôi động số tự hóa chuyển hình, tùng nhi đại phúc giáng đê liễu vận doanh thành bản.', vi: 'Xét thấy chuỗi cung ứng toàn cầu đang trải qua sự điều chỉnh sâu sắc, nhiều doanh nghiệp đang dốc sức thúc đẩy chuyển đổi số, từ đó giảm mạnh chi phí vận hành.' },
          { speaker: 'Chuyên gia', simp: '没错，环境对人的思维也有着潜移默化的影响。', trad: '沒錯，環境對人的思維也有著潛移默化的影響。', pinyin: 'Méicuò, huánjìng duì rén de sīwéi yě yǒuzhe qiányí-mòhuà de yǐngxiǎng.', hanviet: 'Một thác, hoàn cảnh đối nhân đích tư duy dã hữu trước tiềm di mặc hóa đích ảnh hưởng.', vi: 'Đúng vậy, môi trường cũng có sự tác động mưa dầm thấm lâu đối với tư duy con người.' }
        ],
        quiz: {
          question: 'Chọn từ thích hợp nhất điền vào câu báo chí: "文化交流在________中增进了两国人民的理解与信任。"',
          options: [
            '乱七八糟 (loạn thất bát tao)',
            '潜移默化 (tiềm di mặc hóa)',
            '马马虎虎 (mã mã hổ hổ)',
            '莫名其妙 (mạc danh kỳ diệu)'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! "潜移默化" (tiềm di mặc hóa - mưa dầm thấm lâu, chuyển hóa âm thầm) là thành ngữ chuẩn xác nhất để mô tả tác động sâu sắc của giao lưu văn hóa.'
        }
      },
      {
        id: 'L09',
        code: 'Bài 09 • Cao Cấp HSK 6',
        level: 'LVL3',
        focus: 'GRAMMAR',
        title: 'Kỹ Thuật Bắt Lỗi "Bệnh Câu" (病句辨析) & Cấu Trúc Phủ Định Kép Nâng Cao',
        summary: 'Làm chủ phần thi khó nhất HSK 6: nhận diện 6 dạng lỗi logic, thiếu thành phần, thừa từ và phủ định kép.',
        xpReward: 120,
        keyTakeaways: [
          'Dạng bệnh câu số 1 (Khuyết chủ ngữ): Dùng đồng thời "通过/经过..." ở vế đầu và "使/让..." ở vế hai khiến câu mất hoàn toàn chủ ngữ! (Ví dụ sai: 通过这次培训，使我学到了很多知识 → Phải bỏ 通过 hoặc bỏ 使).',
          'Dạng bệnh câu số 2 (Một mặt đối Hai mặt - 一面对两面): Vế trước có "能否 / 是否 / 好坏" (2 chiều) nhưng vế sau chỉ nói 1 chiều.',
          'Cấu trúc phủ định kép: 非…不可 (Nhất định phải...), 未尝不 (Chẳng phải là không...), 无不 (Không ai/cái gì là không...).'
        ],
        vocab: [
          { simp: '非…不可', trad: '非…不可', pinyin: 'fēi... bùkě', hanviet: 'PHI... BẤT KHẢ', pos: 'Cấu trúc', meaning: 'Nhất định phải..., không... không được' },
          { simp: '无不', trad: '無不', pinyin: 'wúbù', hanviet: 'VÔ BẤT', pos: 'Phó từ', meaning: 'Không ai là không..., tất cả đều...' },
          { simp: '有条不紊', trad: '有條不紊', pinyin: 'yǒutiáo-bùwěn', hanviet: 'HỮU ĐIỀU BẤT VẤN', pos: 'Thành ngữ', meaning: 'Ngăn nắp, trật tự, đâu vào đấy không chút rối loạn' },
          { simp: '相辅相成', trad: '相輔相成', pinyin: 'xiāngfǔ-xiāngchéng', hanviet: 'TƯƠNG PHỤ TƯƠNG THÀNH', pos: 'Thành ngữ', meaning: 'Bổ trợ lẫn nhau, gắn kết tạo nên thành công' }
        ],
        grammar: [
          {
            pattern: 'Lỗi kinh điển: [通过 / 经过 / 由于 + Cụm A]，[使 / 让 / 令 + Cụm B...]',
            explanation: 'Khi đầu câu đã có giới từ (通过/经过/由于), cả cụm đầu trở thành trạng ngữ. Nếu vế sau lại bắt đầu bằng động từ sai khiến (使/让), câu sẽ KHÔNG CÓ CHỦ NGỮ!',
            wrong: '通过老师的耐心指导，使他的汉语水平有了明显提高。',
            right: '通过老师的耐心指导，他的汉语水平有了明显提高。(Hoặc: 老师的耐心指导使他的汉语水平有了明显提高。)'
          }
        ],
        dialogue: [
          { speaker: 'Giám khảo HSK 6', simp: '在场的所有观众听了他的演讲后，无不感到深受启发。', trad: '在場的所有觀眾聽了他的演講後，無不感到深受啟發。', pinyin: 'Zàichǎng de suǒyǒu guānzhòng tīng le tā de yǎnjiǎng hòu, wúbù gǎndào shēn shòu qǐfā.', hanviet: 'Tại trường đích sở hữu quan chúng thính liễu tha đích diễn giảng hậu, vô bất cảm đáo thâm thụ khởi phát.', vi: 'Tất cả khán giả có mặt tại hội trường sau khi nghe bài diễn thuyết của anh ấy, không ai là không cảm thấy được truyền cảm hứng sâu sắc.' },
          { speaker: 'Thí sinh', simp: '理论与实践是相辅相成的，要把工作做得有条不紊，非下苦功不可。', trad: '理論與實踐是相輔相成的，要把工作做得有條不紊，非下苦功不可。', pinyin: 'Lǐlùn yǔ shíjiàn shì xiāngfǔ-xiāngchéng de, yào bǎ gōngzuò zuò de yǒutiáo-bùwěn, fēi xià kǔgōng bùkě.', hanviet: 'Lý luận dữ thực tiễn thị tương phụ tương thành đích, yếu bả công tác tố đắc hữu điều bất vấn, phi hạ khổ công bất khả.', vi: 'Lý thuyết và thực tiễn bổ trợ lẫn nhau, muốn làm công việc ngăn nắp đâu vào đấy thì nhất định phải dày công khổ luyện.' }
        ],
        quiz: {
          question: 'Tìm câu KHÔNG MẮC LỖI NGỮ PHÁP (không phải bệnh câu) trong 4 câu dưới đây:',
          options: [
            '经过这次实地考察，使我们发现了许多潜在问题。',
            '能否保持良好的心态，是考试取得成功的关键。',
            '为了防止这类交通事故不再发生，交警部门加强了管理。',
            '由于技术不断创新，这家企业的国际竞争力显著增强。'
          ],
          correctIndex: 3,
          explanation: 'Xuất sắc! Câu 1 sai lỗi khuyết chủ ngữ (经过...使...). Câu 2 sai lỗi 2 chiều - 1 chiều (能否 là 2 chiều nhưng 取得成功 chỉ 1 chiều). Câu 3 sai lỗi phủ định thừa (防止...不再发生 = ngăn chặn không tái diễn nữa → thành mong nó tái diễn!). Chỉ có câu 4 hoàn toàn chuẩn xác!'
        }
      },
      {
        id: 'L10',
        code: 'Bài 10 • Kỳ Cựu HSK 7–9',
        level: 'LVL4',
        focus: 'CLASSICAL',
        title: 'Nhập Môn Văn Ngôn (文言文): Hư Từ Cổ Văn (之, 乎, 者, 也, 以, 而) & Luận Ngữ Tinh Hoa',
        summary: 'Giải mã ngữ pháp Cổ văn ứng dụng trong tiếng Trung học thuật cao cấp và văn hóa doanh nghiệp Á Đông.',
        xpReward: 150,
        keyTakeaways: [
          'Chữ 之 (zhī) trong cổ văn có 3 chức năng lớn: (1) Trợ từ sở hữu tương đương 的 hiện đại (缓兵之计 - kế hoãn binh); (2) Đại từ tân ngữ "nó/họ" (学而时习之 - học rồi thường ôn tập nó); (3) Động từ "đi đến" (吾欲之南海 - Ta muốn đi đến Nam Hải).',
          'Cấu trúc phán đoán cổ văn: [Danh từ A] + 者，[Danh từ B] + 也 (Ví dụ: 师者，所以传道受业解惑也 - Người thầy là người truyền đạo, dạy nghề và giải đáp惑 nghi).',
          'Chữ 而 (ér) nối hai vế có thể chỉ quan hệ Thuận thừa (rồi thì) hoặc Chuyển ngoặt (nhưng mà: 人不知而不愠 - Người ta không hiểu mình mà mình không giận).'
        ],
        vocab: [
          { simp: '温故而知新', trad: '溫故而知新', pinyin: 'wēngù ér zhīxīn', hanviet: 'ÔN CỐ NHI TRI TÂN', pos: 'Cổ văn / Thành ngữ', meaning: 'Ôn lại điều cũ mà hiểu thêm được tri thức mới (Luận Ngữ)' },
          { simp: '三人行，必有我师焉', trad: '三人行，必有我師焉', pinyin: 'sān rén xíng, bì yǒu wǒ shī yān', hanviet: 'TAM NHÂN HÀNH, TẤT HỮU NGÃ SƯ YÊN', pos: 'Cổ văn', meaning: 'Ba người cùng đi, ắt có người là thầy của ta ở trong đó' },
          { simp: '欲速则不达', trad: '欲速則不達', pinyin: 'yù sù zé bù dá', hanviet: 'DỤC TỐC TẮC BẤT ĐẠT', pos: 'Cổ văn / Thành ngữ', meaning: 'Muốn nhanh quá (nóng vội) thì lại không đạt được mục đích' },
          { simp: '己所不欲，勿施于人', trad: '己所不欲，勿施於人', pinyin: 'jǐ suǒ bú yù, wù shī yú rén', hanviet: 'KỶ SỞ BẤT DỤC, VẬT THI Ư NHÂN', pos: 'Cổ văn', meaning: 'Điều gì mình không muốn thì chớ áp đặt lên người khác' }
        ],
        grammar: [
          {
            pattern: 'Cấu trúc "所 + Động từ" → Danh từ hóa ("Cái điều mà... / Người mà...")',
            explanation: 'Cấu trúc cổ văn này vẫn sống rất mạnh mẽ trong tiếng Trung hiện đại cao cấp (HSK 6-9): 所见所闻 (những điều mắt thấy tai nghe), 众所周知 (điều mọi người đều biết), 力所能及 (trong phạm vi sức lực có thể đạt tới).',
            wrong: 'Dịch "己所不欲" là "Chỗ của mình không muốn"',
            right: '"所 + 不欲" = Điều mà bản thân không mong muốn (Danh từ hóa cụm động từ)'
          }
        ],
        dialogue: [
          { speaker: 'Học giả Trần', simp: '古人云：“欲速则不达，见小利则大事不成。”做学术和做企业都是同样的道理。', trad: '古人云：「欲速則不達，見小利則大事不成。」做學術和做企業都是同樣的道理。', pinyin: 'Gǔrén yún: "Yù sù zé bù dá, jiàn xiǎo lì zé dàshì bù chéng." Zuò xuéshù hé zuò qǐyè dōu shì tóngyàng de dàolǐ.', hanviet: 'Cổ nhân vân: "Dục tốc tắc bất đạt, kiến tiểu lợi tắc đại sự bất thành." Tố học thuật hòa tố xí nghiệp đô thị đồng dạng đích đạo lý.', vi: 'Cổ nhân có câu: "Nóng vội thì không đạt, ham lợi nhỏ thì việc lớn không thành." Làm học thuật hay làm doanh nghiệp đều cùng một đạo lý ấy.' },
          { speaker: 'Doanh nhân Lý', simp: '确实如此。我们在拓展海外市场时，也始终秉持“己所不欲，勿施于人”的合作原则。', trad: '確實如此。我們在拓展海外市場時，也始終秉持「己所不欲，勿施於人」的合作原則。', pinyin: 'Quèshí rúcǐ. Wǒmen zài tuòzhǎn hǎiwài shìchǎng shí, yě shǐzhōng bǐngchí "jǐ suǒ bú yù, wù shī yú rén" de hézuò yuánzé.', hanviet: 'Xác thực như thử. Ngã môn tại thác triển hải ngoại thị trường thời, dã thủy chung bỉnh trì "kỷ sở bất dục, vật thi ư nhân" đích hợp tác nguyên tắc.', vi: 'Quả đúng như vậy. Khi mở rộng thị trường nước ngoài, chúng tôi cũng luôn giữ vững nguyên tắc hợp tác "Điều mình không muốn, chớ làm cho người".' }
        ],
        quiz: {
          question: 'Trong câu danh ngôn của Khổng Tử "知之者不如好之者，好之者不如乐之者", chữ "之 (zhī)" đóng vai trò ngữ pháp gì?',
          options: [
            'Trợ từ kết cấu tương đương với chữ 的',
            'Đại từ làm tân ngữ (chỉ "tri thức / đạo học / công việc đó")',
            'Liên từ nối hai vế câu',
            'Phó từ phủ định'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! "知之" (biết nó), "好之" (hào zhī - yêu thích nó), "乐之" (lè zhī - lấy nó làm niềm vui). Chữ 之 ở đây là đại từ tân ngữ!'
        }
      },
      {
        id: 'L11',
        code: 'Bài 11 • Kỳ Cựu HSK 7–9',
        level: 'LVL4',
        focus: 'CLASSICAL',
        title: 'Binh Pháp Tôn Tử, Chiến Lược Kinh Doanh & Nghệ Thuật Dịch Thuật Bậc Thầy',
        summary: 'Ứng dụng triết lý cổ điển vào diễn thuyết, tranh biện học thuật và dịch thuật C2 (Tín - Đạt - Nhã).',
        xpReward: 160,
        keyTakeaways: [
          'Tiêu chuẩn dịch thuật "Tín - Đạt - Nhã" (信、达、雅) của Nghiêm Phục: Tín (Trung thành chuẩn nghĩa), Đạt (Lưu loát, thuận ngữ pháp đích), Nhã (Tinh tế, giàu mỹ cảm văn chương).',
          'Trong tiếng Trung cao cấp, câu 4 chữ (四字格) tạo nhịp điệu cân xứng và uy lực hùng biện rất lớn (ví dụ: 居安思危, 未雨绸缪, 运筹帷幄, 审时度势).'
        ],
        vocab: [
          { simp: '知己知彼，百战不殆', trad: '知己知彼，百戰不殆', pinyin: 'zhījǐ-zhībǐ, bǎizhàn-búdài', hanviet: 'TRI KỶ TRI BỈ, BÁCH CHIẾN BẤT ĐÃI', pos: 'Binh pháp', meaning: 'Biết người biết ta, trăm trận không nguy (殆 = nguy hiểm, thất bại)' },
          { simp: '未雨绸缪', trad: '未雨綢繆', pinyin: 'wèiyǔ-chóumóu', hanviet: 'VỊ VŨ TRÙ MƯU', pos: 'Thành ngữ', meaning: 'Chưa mưa đã buộc chặt cửa sổ — Chuẩn bị phòng ngừa rủi ro từ sớm' },
          { simp: '审时度势', trad: '審時度勢', pinyin: 'shěnshí-duóshì', hanviet: 'THẨM THỜI ĐOẠC THẾ', pos: 'Thành ngữ', meaning: 'Quan sát kỹ thời cuộc và đánh giá đúng xu thế (chú ý 度 đọc là duó)' },
          { simp: '统筹兼顾', trad: '統籌兼顧', pinyin: 'tǒngchóu-jiāngù', hanviet: 'THỐNG TRÙ KIÊM CỐ', pos: 'Thành ngữ', meaning: 'Quy hoạch tổng thể và chiếu cố hài hòa mọi mặt' }
        ],
        grammar: [
          {
            pattern: 'Cấu trúc Văn Ngôn Trang Trọng: 唯其…方能… (Chỉ có... mới có thể...)',
            explanation: 'Dùng trong bài phát biểu cấp cao, xã luận hoặc luận văn để nhấn mạnh điều kiện tiên quyết mang tính chiến lược.',
            wrong: 'Dùng khẩu ngữ 只有…才能… trong diễn văn trang trọng cấp bộ/tập đoàn',
            right: '唯有审时度势、未雨绸缪，方能在激烈的全球竞争中立于不败之地。'
          }
        ],
        dialogue: [
          { speaker: 'Chủ tịch HĐQT', simp: '商场如战场，所谓“知己知彼，百战不殆”。面对行业剧变，我们必须未雨绸缪。', trad: '商場如戰場，所謂「知己知彼，百戰不殆」。面對行業劇變，我們必須未雨綢繆。', pinyin: 'Shāngchǎng rú zhànchǎng, suǒwèi "zhījǐ-zhībǐ, bǎizhàn-búdài". Miànduì hángyè jùbiàn, wǒmen bìxū wèiyǔ-chóumóu.', hanviet: 'Thương trường như chiến trường, sở vị "tri kỷ tri bỉ, bách chiến bất đãi". Diện đối ngành nghiệp kịch biến, ngã môn tất tu vị vũ trù mưu.', vi: 'Thương trường như chiến trường, cổ nhân có câu "Biết người biết ta, trăm trận không nguy". Đối mặt với biến động dữ dội của ngành, chúng ta bắt buộc phải chuẩn bị phòng ngừa từ sớm.' },
          { speaker: 'Giám đốc Chiến lược', simp: '董事长所言极是。唯有审时度势、统筹兼顾，方能实现长远发展。', trad: '董事長所言極是。唯有審時度勢、統籌兼顧，方能實現長遠發展。', pinyin: 'Dǒngshìzhǎng suǒ yán jí shì. Wéiyǒu shěnshí-duóshì, tǒngchóu-jiāngù, fāng néng shíxiàn chángyuǎn fāzhǎn.', hanviet: 'Đổng sự trưởng sở ngôn cực thị. Duy hữu thẩm thời đoạc thế, thống trù kiêm cố, phương năng thực hiện trường viễn phát triển.', vi: 'Lời Chủ tịch nói chí phải. Chỉ có đánh giá đúng thời thế và quy hoạch tổng thể hài hòa các mặt thì mới có thể thực hiện sự phát triển lâu dài.' }
        ],
        quiz: {
          question: 'Trong thành ngữ "审时度势 (Thẩm thời đoạc thế - Xem xét thời cuộc, đánh giá xu thế)", chữ "度" được phát âm chuẩn là gì?',
          options: [
            'dù (như trong 温度, 态度)',
            'duó (mang nghĩa suy đoán, cân nhắc, đo lường)',
            'toạc',
            'dú'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Đây là câu hỏi phân biệt âm đa âm (多音字) kinh điển ở trình độ HSK 7-9: Độ (dù) là danh từ chỉ mức độ, còn Đoạc (duó) là động từ chỉ sự ước lượng, phán đoán (审时度势 shěnshí-duóshì, 揣度 chuǎiduó).'
        }
      },
      {
        id: 'L12',
        code: 'Bài 12 • Chuyên Ngành Thương Mại',
        level: 'BIZ',
        focus: 'BUSINESS',
        title: 'Đàm Phán Hợp Đồng Ngoại Thương, Báo Giá (FOB/CIF) & Thanh Toán Quốc Tế',
        summary: 'Thuật ngữ và mẫu câu thực chiến khi làm việc với nhà máy Trung Quốc, đàm phán chiết khấu và điều khoản hợp đồng.',
        xpReward: 130,
        keyTakeaways: [
          'Nắm vững bộ thuật ngữ ngoại thương cốt lõi: 报价单 (Bảng báo giá), 离岸价 FOB, 到岸价 CIF, 最小起订量 MOQ, 交货期 (Lead time), 信用证 (L/C), 电汇 (T/T).',
          'Cách trả giá (讨价还价) lịch sự nhưng cứng rắn trong đàm phán B2B: "Nếu quý công ty có thể giảm 5% đơn giá, chúng tôi cam kết tăng gấp đôi sản lượng đặt hàng quý tới".'
        ],
        vocab: [
          { simp: '最小起订量', trad: '最小起訂量', pinyin: 'zuìxiǎo qǐdìngliàng', hanviet: 'TỐI TIỂU KHỞI ĐÍNH LƯỢNG', pos: 'Thuật ngữ XNK', meaning: 'Số lượng đặt hàng tối thiểu (MOQ)' },
          { simp: '离岸价', trad: '離岸價', pinyin: 'lí\'ànjià', hanviet: 'LY NGẠN GIÁ', pos: 'Thuật ngữ XNK', meaning: 'Giá FOB (Giao hàng lên tàu tại cảng đi)' },
          { simp: '交货期', trad: '交貨期', pinyin: 'jiāohuòqī', hanviet: 'GIAO HÓA KỲ', pos: 'Danh từ', meaning: 'Thời hạn giao hàng (Lead time)' },
          { simp: '违约金', trad: '違約金', pinyin: 'wéiyuējīn', hanviet: 'VI ƯỚC KIM', pos: 'Pháp lý TM', meaning: 'Tiền phạt vi phạm hợp đồng' }
        ],
        grammar: [
          {
            pattern: 'Cấu trúc Đàm phán B2B: 倘若贵方能 + [Nhượng bộ A]，我方愿意 + [Cam kết lợi ích B]',
            explanation: 'Sử dụng 贵方 (Quý bên / Quý công ty) và 我方 (Bên chúng tôi) tạo sự chuyên nghiệp và tôn trọng đối tác trong văn bản thương mại.',
            wrong: '如果你们便宜一点，我们就多买一点。(Quá chợ búa, thiếu tính chuyên nghiệp B2B)',
            right: '倘若贵公司能在离岸价（FOB）基础上再优惠3%，我方愿意将首单订购量提高至五万件。'
          }
        ],
        dialogue: [
          { speaker: 'Đối tác Việt Nam', simp: '王总，贵司的样品质量确实不错，但目前的FOB报价略高于我们的预算。', trad: '王總，貴司的樣品質量確實不錯，但目前的FOB報價略高於我們的預算。', pinyin: 'Wáng zǒng, guì sī de yàngpǐn zhìliàng quèshí búcuò, dàn mùqián de FOB bàojià lüè gāo yú wǒmen de yùsuàn.', hanviet: 'Vương tổng, quý ty đích dạng phẩm chất lượng xác thực bất thác, đản mục tiền đích FOB báo giá lược cao ư ngã môn đích dự toán.', vi: 'Giám đốc Vương, chất lượng hàng mẫu của quý công ty quả thực rất tốt, nhưng báo giá FOB hiện tại hơi cao hơn ngân sách của chúng tôi.' },
          { speaker: 'Nhà máy Thâm Quyến', simp: '阮先生，考虑到这是我们首次合作，如果订单达到最小起订量两万件，我们可以给您让利百分之四，并保证三十天内交货。', trad: '阮先生，考慮到這是我們首次合作，如果訂單達到最小起訂量兩萬件，我們可以給您讓利百分之四，並保證三十天內交貨。', pinyin: 'Ruǎn xiānsheng, kǎolǜ dào zhè shì wǒmen shǒucì hézuò, rúguǒ dìngdān dádào zuìxiǎo qǐdìngliàng liǎng wàn jiàn, wǒmen kěyǐ gěi nín rànglì bǎifēnzhī sì, bìng bǎozhèng sānshí tiān nèi jiāohuò.', hanviet: 'Nguyễn tiên sinh, khảo lự đáo giá thị ngã môn thủ thứ hợp tác, như quả đính đơn đạt đáo tối tiểu khởi đính lượng lưỡng vạn kiện, ngã môn khả dĩ cấp ngài nhượng lợi bách phân chi tứ, tịnh bảo chứng tam thập thiên nội giao hóa.', vi: 'Anh Nguyễn, xét thấy đây là lần hợp tác đầu tiên của chúng ta, nếu đơn hàng đạt MOQ 20.000 chiếc, chúng tôi có thể nhượng lợi (chiết khấu) cho anh 4% và đảm bảo giao hàng trong vòng 30 ngày.' }
        ],
        quiz: {
          question: 'Khi nhập hàng từ nhà máy Trung Quốc, thuật ngữ "报关 (bàoguān)" và "清关 (qīngguān)" có nghĩa là gì?',
          options: [
            'Đóng gói bao bì và Kiểm tra chất lượng',
            'Khai báo hải quan (xuất khẩu) và Thông quan (nhập khẩu)',
            'Đặt cọc tiền hàng và Thanh toán số dư',
            'Bảo hiểm hàng hóa và Vận chuyển đường biển'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! 报关 (Báo quan) là thủ tục khai báo hải quan đầu xuất, còn 清关 (Thanh quan) là hoàn tất thủ tục thông quan tại cảng đến.'
        }
      },
      {
        id: 'L13',
        code: 'Bài 13 • Chuyên Ngành Thương Mại Số',
        level: 'BIZ',
        focus: 'BUSINESS',
        title: 'Thương Mại Điện Tử (Taobao / 1688 / Livestream), Logistics & Khiếu Nại Đơn Hàng',
        summary: 'Từ vựng thực tế khi săn nguồn hàng 1688, làm việc với xưởng gia công OEM/ODM và xử lý hậu mãi.',
        xpReward: 110,
        keyTakeaways: [
          'Phân biệt OEM (贴牌生产 - Gia công gắn nhãn thương hiệu của bạn trên mẫu có sẵn) và ODM (原始设计制造 - Xưởng vừa thiết kế mẫu mới vừa sản xuất).',
          'Thuật ngữ mua hàng & vận chuyển: 包邮 (Freeship nội địa), 现货 (Hàng có sẵn), 预售 (Hàng đặt trước), 代发 (Dropship / Gửi hộ), 物流单号 (Mã vận đơn).'
        ],
        vocab: [
          { simp: '贴牌代工', trad: '貼牌代工', pinyin: 'tiēpái dàigōng', hanviet: 'THIẾP BÀI ĐẠI CÔNG', pos: 'Thuật ngữ SX', meaning: 'Gia công gắn thương hiệu riêng (OEM)' },
          { simp: '现货包邮', trad: '現貨包郵', pinyin: 'xiànhuò bāoyóu', hanviet: 'HIỆN HÓA BAO BƯU', pos: 'TMĐT', meaning: 'Hàng có sẵn kho và miễn phí vận chuyển nội địa' },
          { simp: '退货退款', trad: '退貨退款', pinyin: 'tuìhuò tuìkuǎn', hanviet: 'THOÁI HÓA THOÁI KHOẢN', pos: 'TMĐT', meaning: 'Trả hàng và hoàn tiền' },
          { simp: '质检报告', trad: '質檢報告', pinyin: 'zhìjiǎn bàogào', hanviet: 'CHẤT KIỂM BÁO CÁO', pos: 'Danh từ', meaning: 'Báo cáo kiểm định chất lượng (QC Report)' }
        ],
        grammar: [
          {
            pattern: 'Mẫu câu Chat với Chủ Xưởng 1688: 掌柜的，这款有现货吗？支持定制LOGO和一件代发吗？',
            explanation: 'Câu hỏi ngắn gọn, đi thẳng vào 3 vấn đề cốt lõi: Tồn kho thực tế (现货), In logo riêng (定制LOGO) và Gửi lẻ từng đơn (一件代发).',
            wrong: 'Dùng câu văn rườm rà sách vở khi chat nhanh trên AliWangWang / WeChat',
            right: '老板，拿样怎么算？后期大货能退样品费吗？(Sếp ơi, lấy hàng mẫu tính giá sao? Sau này đặt đơn lớn có hoàn phí mẫu không?)'
          }
        ],
        dialogue: [
          { speaker: 'Buyer Việt Nam', simp: '老板您好，这款蓝牙耳机有现货吗？如果定做三千个，支持激光雕刻我们的品牌Logo吗？', trad: '老闆您好，這款藍牙耳機有現貨嗎？如果定做三千個，支持激光雕刻我們的品牌Logo嗎？', pinyin: 'Lǎobǎn nínhǎo, zhè kuǎn lányá ěrjī yǒu xiànhuò ma? Rúguǒ dìngzuò sānqiān gè, zhīchí jīguāng diāokè wǒmen de pǐnpái Logo ma?', hanviet: 'Lão bản ngài hảo, giá khoản lam nha nhĩ cơ hữu hiện hóa ma? Như quả đính tố tam thiên cá, chi trì kích quang điêu khắc ngã môn đích phẩm bài Logo ma?', vi: 'Chào sếp, mẫu tai nghe Bluetooth này có sẵn hàng không? Nếu đặt làm 3.000 cái, có hỗ trợ khắc laser Logo thương hiệu của bên tôi không?' },
          { speaker: 'Chủ xưởng 1688', simp: '亲，仓库有现货！满一千个就可以免费定制Logo和包装盒，今天下单明天就能发顺丰专线。', trad: '親，倉庫有現貨！滿一千個就可以免費定制Logo和包裝盒，今天下單明天就能發順豐專線。', pinyin: 'Qīn, cāngkù yǒu xiànhuò! Mǎn yìqiān gè jiù kěyǐ miǎnfèi dìngzhì Logo hé bāozhuānghé, jīntiān xiàdān míngtiān jiù néng fā Shùnfēng zhuānxiàn.', hanviet: 'Thân, thương khố hữu hiện hóa! Mãn nhất thiên cá tựu khả dĩ miễn phí đính chế Logo hòa bao trang hộp, kim thiên hạ đơn minh thiên tựu năng phát Thuận Phong chuyên tuyến.', vi: 'Bạn ơi, kho có sẵn hàng nhé! Đủ 1.000 cái là được miễn phí làm Logo riêng và hộp bao bì, hôm nay lên đơn mai gửi tuyến chuyên biệt SF Express luôn.' }
        ],
        quiz: {
          question: 'Khi chat với xưởng trên 1688, cụm từ "拿样 (náyàng)" có nghĩa là gì?',
          options: [
            'Hủy đơn hàng',
            'Lấy hàng mẫu (Sample) để kiểm tra chất lượng trước khi đặt sỉ',
            'Kiểm đếm số lượng container',
            'Thanh toán qua ví Alipay'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! "拿样" (Náyàng) là lấy mẫu thử nghiệm trước khi xuống đơn hàng sản xuất hàng loạt (大货 - dàhuò).'
        }
      },
      {
        id: 'L14',
        code: 'Bài 14 • Chuyên Ngành Hiện Đại',
        level: 'BIZ',
        focus: 'CONVERSATION',
        title: 'Tiếng Trung Công Nghệ AI, Xu Hướng Xã Hội & Tiếng Lóng Giới Trẻ (Internet Slang)',
        summary: 'Hiểu ngay ngôn ngữ mạng Weibo, Xiaohongshu, Douyin và thuật ngữ AI: 内卷, 躺平, 破防, 情绪价值, 大模型.',
        xpReward: 115,
        keyTakeaways: [
          'Ngôn ngữ mạng và xã hội Trung Quốc đương đại phản ánh tâm lý thế hệ trẻ: 内卷 (nèijuǎn - cạnh tranh kiệt sức không tạo thêm giá trị mới), 躺平 (tǎngpíng - nằm thẳng buông bỏ cuộc đua), 破防 (pòfáng - vỡ phòng thủ cảm xúc / xúc động mạnh).',
          'Thuật ngữ AI & Công nghệ: 人工智能 (Trí tuệ nhân tạo), 大语言模型 (Mô hình ngôn ngữ lớn - LLM), 提示词 (Prompt), 赋能 (Trao quyền / Nâng tầm sức mạnh).'
        ],
        vocab: [
          { simp: '内卷', trad: '內卷', pinyin: 'nèijuǎn', hanviet: 'NỘI QUYỂN', pos: 'Từ热 (Hotword)', meaning: 'Cạnh tranh nội bộ khốc liệt, bào mòn sức lực (Involution)' },
          { simp: '情绪价值', trad: '情緒價值', pinyin: 'qíngxù jiàzhí', hanviet: 'TÌNH TỰ GIÁ TRỊ', pos: 'Cụm danh từ', meaning: 'Giá trị cảm xúc (sự đồng cảm, năng lượng tích cực mang lại cho người khác)' },
          { simp: '大语言模型', trad: '大語言模型', pinyin: 'dà yǔyán móxíng', hanviet: 'ĐẠI NGỮ NGÔN MÔ HÌNH', pos: 'Công nghệ AI', meaning: 'Mô hình ngôn ngữ lớn (LLM)' },
          { simp: '破防', trad: '破防', pinyin: 'pòfáng', hanviet: 'PHÁ PHÒNG', pos: 'Slang mạng', meaning: 'Vỡ trận cảm xúc (bị chạm tới nỗi lòng dẫn đến xúc động hoặc suy sụp)' }
        ],
        grammar: [
          {
            pattern: 'Cấu trúc: 给 + [Đối tượng] + 提供情绪价值 / 赋能',
            explanation: 'Hai cụm từ xuất hiện dày đặc trên truyền thông, podcast và môi trường công sở Trung Quốc hiện nay.',
            wrong: 'Dịch máy móc 情绪价值 là "giá cả của tâm trạng"',
            right: '真正优秀的伴侣和合作伙伴，都懂得互相提供高水平的情绪价值。'
          }
        ],
        dialogue: [
          { speaker: 'Creator Tiểu Hồng Thư', simp: '与其在低效的工作里盲目“内卷”，不如学会利用AI大模型给自己的专业能力赋能。', trad: '與其在低效的工作裡盲目「內卷」，不如學會利用AI大模型給自己的專業能力賦能。', pinyin: 'Yǔqí zài dīxiào de gōngzuò lǐ mángmù "nèijuǎn", bùrú xuéhuì lìyòng AI dàmóxíng gěi zìjǐ de zhuānyè nénglì fùnéng.', hanviet: 'Dữ kỳ tại đê hiệu đích công tác lý manh mục "nội quyển", bất như học hội lợi dụng AI đại mô hình cấp tự kỷ đích chuyên nghiệp năng lực phú năng.', vi: 'Thay vì "cạnh tranh bào mòn (nội quyển)" một cách mù quáng trong công việc kém hiệu quả, chi bằng học cách tận dụng mô hình AI lớn để nâng tầm năng lực chuyên môn của bản thân.' },
          { speaker: 'Cư dân mạng', simp: '这句话太真实了，直接让我破防！现代人最需要的就是高效率和高情绪价值。', trad: '這句話太真實了，直接讓我破防！現代人最需要的就是高效率和高情緒價值。', pinyin: 'Zhè jù huà tài zhēnshí le, zhíjiē ràng wǒ pòfáng! Xiàndàirén zuì xūyào de jiùshì gāo xiàolǜ hé gāo qíngxù jiàzhí.', hanviet: 'Giá cú thoại thái chân thực liễu, trực tiếp nhượng ngã phá phòng! Hiện đại nhân tối nhu yếu đích tựu thị cao hiệu suất hòa cao tình tự giá trị.', vi: 'Câu nói này chân thực quá, chạm đúng nỗi lòng làm tôi "vỡ phòng thủ" luôn! Điều người hiện đại cần nhất chính là hiệu suất cao và giá trị cảm xúc cao.' }
        ],
        quiz: {
          question: 'Khi giới trẻ Trung Quốc nói "我们部门太卷了 (Wǒmen bùmén tài juǎn le)", chữ "卷 (juǎn)" trong ngữ cảnh này có nghĩa là gì?',
          options: [
            'Phòng ban rất thích ăn bánh cuốn',
            'Phòng ban có nhiều tài liệu cuộn tròn',
            'Mọi người trong phòng ban cạnh tranh ngầm/chạy đua tăng ca quá khốc liệt',
            'Phòng ban sắp được nghỉ phép dài ngày'
          ],
          correctIndex: 2,
          explanation: 'Chính xác! "卷" (viết tắt của 内卷 - nèijuǎn) dùng làm tính từ/động từ để chỉ sự cạnh tranh khốc liệt, chạy đua thành tích hoặc giờ làm việc.'
        }
      }
    );
    // =========================================================================
