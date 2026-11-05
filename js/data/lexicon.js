// Kho Từ vựng đa ngành, Tàng Kinh Các (Thành ngữ/Cổ văn) & Từ cận nghĩa
// 4. LEXICON, CHENGYU, SYNONYMS & PRACTICE ARENA DATASETS
    // =========================================================================
    const VOCAB_VAULT_DATA = [
      { id: 'V01', level: 'LVL0', domain: 'DAILY', simp: '请问', trad: '請問', pinyin: 'qǐngwèn', hanviet: 'THỈNH VẤN', pos: 'Động từ', meaning: 'Xin hỏi / Cho tôi hỏi (mở đầu câu hỏi lịch sự)', collocations: '请问一下 • 请问您贵姓', exSimp: '请问，去地铁站怎么走？', exTrad: '請問，去地鐵站怎麼走？', exVi: 'Xin hỏi, đi đến ga tàu điện ngầm đi đường nào?' },
      { id: 'V02', level: 'LVL0', domain: 'DAILY', simp: '没关系', trad: '沒關係', pinyin: 'méi guānxi', hanviet: 'MỘT QUAN HỆ', pos: 'Cụm từ', meaning: 'Không sao đâu (đáp lại lời xin lỗi 对不起)', collocations: '没关系，别客气', exSimp: '迟到五分钟没关系，路上安全第一。', exTrad: '遲到五分鐘沒關係，路上安全第一。', exVi: 'Đến muộn 5 phút không sao đâu, an toàn trên đường là trên hết.' },
      { id: 'V03', level: 'LVL1', domain: 'DAILY', simp: '休息', trad: '休息', pinyin: 'xiūxi', hanviet: 'HƯU TỨC', pos: 'Động từ', meaning: 'Nghỉ ngơi (休 = người tựa cây, 息 = nhịp thở của tim)', collocations: '休息一下 • 周末休息', exSimp: '你工作太累了，早点儿休息吧。', exTrad: '你工作太累了，早點兒休息吧。', exVi: 'Bạn làm việc mệt quá rồi, nghỉ ngơi sớm một chút đi.' },
      { id: 'V04', level: 'LVL1', domain: 'DAILY', simp: '准备', trad: '準備', pinyin: 'zhǔnbèi', hanviet: 'CHUẨN BỊ', pos: 'Động từ', meaning: 'Chuẩn bị, dự định làm gì', collocations: '准备好 • 准备考试', exSimp: '我已经准备好了明天的演讲材料。', exTrad: '我已經準備好了明天的演講材料。', exVi: 'Tôi đã chuẩn bị xong tài liệu thuyết trình ngày mai rồi.' },
      { id: 'V05', level: 'LVL1', domain: 'DAILY', simp: '觉得', trad: '覺得', pinyin: 'juéde', hanviet: 'GIÁC ĐẮC', pos: 'Động từ', meaning: 'Cảm thấy, cho rằng (nêu quan điểm cá nhân)', collocations: '我觉得 • 觉得很满意', exSimp: '你觉得这个方案怎么样？', exTrad: '你覺得這個方案怎麼樣？', exVi: 'Bạn cảm thấy phương án này thế nào?' },
      { id: 'V06', level: 'LVL2', domain: 'DAILY', simp: '负责', trad: '負責', pinyin: 'fùzé', hanviet: 'PHỤ TRÁCH', pos: 'Động/Tính', meaning: 'Phụ trách, chịu trách nhiệm, có tinh thần trách nhiệm', collocations: '对工作负责 • 负责市场部', exSimp: '他是一个对客户非常负责的项目经理。', exTrad: '他是一個對客戶非常負責的項目經理。', exVi: 'Anh ấy là một quản lý dự án vô cùng có trách nhiệm với khách hàng.' },
      { id: 'V07', level: 'LVL2', domain: 'DAILY', simp: '适应', trad: '適應', pinyin: 'shìyìng', hanviet: 'THÍCH ỨNG', pos: 'Động từ', meaning: 'Thích nghi, làm quen với môi trường/nhịp độ mới', collocations: '适应环境 • 适应节奏', exSimp: '来北京三个月后，我终于适应了这里的气候。', exTrad: '來北京三個月後，我終於適應了這裡的氣候。', exVi: 'Sau 3 tháng đến Bắc Kinh, cuối cùng tôi đã thích nghi với khí hậu nơi đây.' },
      { id: 'V08', level: 'LVL2', domain: 'ACADEMIC', simp: '积累', trad: '積累', pinyin: 'jīlěi', hanviet: 'TÍCH LŨY', pos: 'Động/Danh', meaning: 'Tích lũy từng chút một (kinh nghiệm, từ vựng, vốn)', collocations: '积累经验 • 长期积累', exSimp: '学习外语需要长期的词汇积累。', exTrad: '學習外語需要長期的詞彙積累。', exVi: 'Học ngoại ngữ đòi hỏi sự tích lũy từ vựng lâu dài.' },
      { id: 'V09', level: 'LVL2', domain: 'DAILY', simp: '后悔', trad: '後悔', pinyin: 'hòuhuǐ', hanviet: 'HẬU HỐI', pos: 'Động/Tính', meaning: 'Hối hận, tiếc nuối về việc đã qua', collocations: '感到后悔 • 后悔莫及', exSimp: '只要全力以赴，无论结果如何都不会后悔。', exTrad: '只要全力以赴，無論結果如何都不會後悔。', exVi: 'Chỉ cần dốc hết sức mình, bất luận kết quả ra sao cũng sẽ không hối hận.' },
      { id: 'V10', level: 'LVL3', domain: 'ACADEMIC', simp: '至关重要', trad: '至關重要', pinyin: 'zhìguān-zhòngyào', hanviet: 'CHÍ QUAN TRỌNG YẾU', pos: 'Cụm 4 chữ', meaning: 'Vô cùng quan trọng, mang tính chất sống còn/then chốt', collocations: '起着至关重要的作用', exSimp: '核心技术的研发对企业的长远发展至关重要。', exTrad: '核心技術的研發對企業的長遠發展至關重要。', exVi: 'Nghiên cứu phát triển công nghệ lõi có ý nghĩa sống còn đối với sự phát triển lâu dài của doanh nghiệp.' },
      { id: 'V11', level: 'LVL3', domain: 'ACADEMIC', simp: '权衡利弊', trad: '權衡利弊', pinyin: 'quánhéng-lìbì', hanviet: 'QUYỀN HÀNH LỢI TỆ', pos: 'Cụm 4 chữ', meaning: 'Cân nhắc thiệt hơn, đong đếm mặt lợi và mặt hại', collocations: '反复权衡利弊', exSimp: '在做出重大投资决定之前，必须全面权衡利弊。', exTrad: '在做出重大投資決定之前，必須全面權衡利弊。', exVi: 'Trước khi đưa ra quyết định đầu tư trọng đại, bắt buộc phải cân nhắc toàn diện lợi hại.' },
      { id: 'V12', level: 'LVL3', domain: 'ACADEMIC', simp: '归根结底', trad: '歸根結底', pinyin: 'guīgēn-jiédǐ', hanviet: 'QUY CĂN KẾT ĐỂ', pos: 'Thành ngữ', meaning: 'Suy cho cùng, xét đến tận gốc rễ vấn đề', collocations: '归根结底在于人才', exSimp: '企业的竞争，归根结底是人才与创新的竞争。', exTrad: '企業的競爭，歸根結底是人才與創新的競爭。', exVi: 'Sự cạnh tranh giữa các doanh nghiệp, suy cho cùng là sự cạnh tranh về nhân tài và đổi mới sáng tạo.' },
      { id: 'V13', level: 'LVL4', domain: 'ACADEMIC', simp: '未雨绸缪', trad: '未雨綢繆', pinyin: 'wèiyǔ-chóumóu', hanviet: 'VỊ VŨ TRÙ MƯU', pos: 'Thành ngữ', meaning: 'Lo liệu phòng bị từ trước khi rủi ro ập đến', collocations: '懂得未雨绸缪', exSimp: '面对市场波动，成熟的管理层总会未雨绸缪。', exTrad: '面對市場波動，成熟的管理層總會未雨綢繆。', exVi: 'Đối mặt với biến động thị trường, ban quản trị chín chắn luôn biết chuẩn bị phòng ngừa từ sớm.' },
      { id: 'V14', level: 'LVL4', domain: 'ACADEMIC', simp: '相得益彰', trad: '相得益彰', pinyin: 'xiāngdé-yìzhāng', hanviet: 'TƯƠNG ĐẮC ÍCH CHƯƠNG', pos: 'Thành ngữ', meaning: 'Kết hợp với nhau càng làm tôn thêm vẻ đẹp/giá trị của cả hai', collocations: '传统与现代相得益彰', exSimp: '古典建筑与现代灯光设计在这里相得益彰。', exTrad: '古典建築與現代燈光設計在這裡相得益彰。', exVi: 'Kiến trúc cổ điển và thiết kế ánh sáng hiện đại tại nơi đây tôn vinh vẻ đẹp của nhau.' },
      { id: 'V15', level: 'LVL4', domain: 'ACADEMIC', simp: '不言而喻', trad: '不言而喻', pinyin: 'bùyán-éryù', hanviet: 'BẤT NGÔN NHI DỤ', pos: 'Thành ngữ', meaning: 'Không cần nói ra cũng tự hiểu rõ (hiển nhiên)', collocations: '重要性不言而喻', exSimp: '港口物流对国际贸易的重要性是不言而喻的。', exTrad: '港口物流對國際貿易的重要性是不言而喻的。', exVi: 'Tầm quan trọng của logistics cảng biển đối với thương mại quốc tế là điều hiển nhiên không cần bàn cãi.' },
      { id: 'V16', level: 'BIZ', domain: 'BUSINESS', simp: '供应链', trad: '供應鏈', pinyin: 'gōngyìngliàn', hanviet: 'CUNG ỨNG LIÊN', pos: 'Kinh tế', meaning: 'Chuỗi cung ứng (Supply Chain)', collocations: '全球供应链 • 供应链管理', exSimp: '越南正在成为全球电子产品供应链的重要枢纽。', exTrad: '越南正在成為全球電子產品供應鏈的重要樞紐。', exVi: 'Việt Nam đang trở thành mắt xích trung tâm quan trọng trong chuỗi cung ứng điện tử toàn cầu.' },
      { id: 'V17', level: 'BIZ', domain: 'BUSINESS', simp: '信用证', trad: '信用證', pinyin: 'xìnyòngzhèng', hanviet: 'TÍN DỤNG CHỨNG', pos: 'Ngoại thương', meaning: 'Thư tín dụng (L/C - Letter of Credit)', collocations: '开立不可撤销信用证', exSimp: '大宗商品贸易通常采用不可撤销信用证进行结算。', exTrad: '大宗商品貿易通常採用不可撤銷信用證進行結算。', exVi: 'Thương mại hàng hóa số lượng lớn thường sử dụng thư tín dụng không hủy ngang để thanh toán.' },
      { id: 'V18', level: 'BIZ', domain: 'BUSINESS', simp: '报关单', trad: '報關單', pinyin: 'bàoguāndān', hanviet: 'BÁO QUAN ĐƠN', pos: 'Hải quan', meaning: 'Tờ khai hải quan (Customs Declaration Form)', collocations: '填写进出口报关单', exSimp: '请核对装箱单、商业发票与报关单上的数据是否一致。', exTrad: '請核對裝箱單、商業發票與報關單上的數據是否一致。', exVi: 'Vui lòng đối chiếu số liệu trên Packing List, Hóa đơn thương mại và Tờ khai hải quan xem có khớp nhau không.' },
      { id: 'V19', level: 'BIZ', domain: 'TECH', simp: '人工智能', trad: '人工智能', pinyin: 'réngōng zhìnéng', hanviet: 'NHÂN CÔNG TRÍ NĂNG', pos: 'Công nghệ', meaning: 'Trí tuệ nhân tạo (AI)', collocations: '生成式人工智能', exSimp: '生成式人工智能正在深刻改变软件开发行业。', exTrad: '生成式人工智能正在深刻改變軟件開發行業。', exVi: 'Trí tuệ nhân tạo tạo sinh (Generative AI) đang thay đổi sâu sắc ngành phát triển phần mềm.' },
      { id: 'V20', level: 'BIZ', domain: 'TECH', simp: '算法推荐', trad: '算法推薦', pinyin: 'suànfǎ tuījiàn', hanviet: 'TOÁN PHÁP THÔI TIẾN', pos: 'Công nghệ', meaning: 'Đề xuất bằng thuật toán (Algorithm Recommendation)', collocations: '精准算法推荐', exSimp: '短视频平台依靠精准的算法推荐留住了大量用户。', exTrad: '短視頻平台依靠精準的算法推薦留住了大量用戶。', exVi: 'Các nền tảng video ngắn dựa vào thuật toán đề xuất chính xác để giữ chân lượng lớn người dùng.' },
      { id: 'V21', level: 'BIZ', domain: 'SLANG', simp: '内卷', trad: '內卷', pinyin: 'nèijuǎn', hanviet: 'NỘI QUYỂN', pos: 'Slang xã hội', meaning: 'Cạnh tranh kiệt sức trong nội bộ mà không tạo ra đột phá mới', collocations: '职场内卷 • 拒绝盲目内卷', exSimp: '与其在价格战里同行内卷，不如靠产品创新开拓蓝海。', exTrad: '與其在價格戰裡同行內卷，不如靠產品創新開拓藍海。', exVi: 'Thay vì cạnh tranh bào mòn lẫn nhau trong cuộc chiến giá cả, chi bằng dựa vào đổi mới sản phẩm để mở ra đại dương xanh.' },
      { id: 'V22', level: 'BIZ', domain: 'SLANG', simp: '情绪价值', trad: '情緒價值', pinyin: 'qíngxù jiàzhí', hanviet: 'TÌNH TỰ GIÁ TRỊ', pos: 'Tâm lý / Slang', meaning: 'Giá trị cảm xúc (khả năng đem lại sự thoải mái, khích lệ cho người khác)', collocations: '拉满情绪价值', exSimp: '现在的消费者不仅买产品功能，更愿意为情绪价值买单。', exTrad: '現在的消費者不僅買產品功能，更願意為情緒價值買單。', exVi: 'Người tiêu dùng hiện nay không chỉ mua công năng sản phẩm mà còn sẵn sàng chi tiền cho giá trị cảm xúc.' }
    ];

    const CHENGYU_VAULT_DATA = [
      {
        simp: '画蛇添足', trad: '畫蛇添足', pinyin: 'huàshé-tiānzú', hanviet: 'HỌA XÀ THIÊM TÚC',
        literal: 'Vẽ rắn thêm chân',
        meaning: 'Làm việc thừa thãi, bày vẽ thêm chi tiết không cần thiết làm hỏng cả việc vốn đã hoàn hảo.',
        origin: 'Chiến Quốc Sách: Mấy người thi vẽ rắn để uống bình rượu thưởng. Một người vẽ xong đầu tiên nhưng lại cầm bút vẽ thêm chân cho rắn, kết quả bị người thứ hai vẽ xong giật mất bình rượu vì "rắn làm gì có chân".',
        usage: '这篇报告已经非常精炼了，再加那些空洞的套话反而画蛇添足。'
      },
      {
        simp: '塞翁失马，焉知非福', trad: '塞翁失馬，焉知非福', pinyin: 'sàiwēng-shīmǎ, yānzhī-fēifú', hanviet: 'TÁI ÔNG THẤT MÃ, YÊN TRI PHI PHÚC',
        literal: 'Ông lão biên ải mất ngựa, biết đâu chẳng phải là phúc',
        meaning: 'Trong cái rủi có cái may; họa phúc ở đời chuyển hóa khôn lường, không nên bi quan trước thất bại tạm thời.',
        origin: 'Hoài Nam Tử: Ông lão ở biên giới mất ngựa quý nhưng không buồn, ít lâu sau ngựa quay về dẫn theo cả駿 mã Hồ; con trai ông cưỡi ngựa bị gãy chân nhưng nhờ thế lại thoát nạn đi lính tử trận.',
        usage: '错过这次小合作未必是坏事，塞翁失马，焉知非福，我们可以集中精力攻克更大的客户。'
      },
      {
        simp: '韬光养晦', trad: '韜光養晦', pinyin: 'tāoguāng-yǎnghuì', hanviet: 'THAO QUANG DƯỠNG HỐI',
        literal: 'Giấu ánh sáng sắc bén, nuôi dưỡng nội lực trong bóng tối',
        meaning: 'Ẩn mình chờ thời, khiêm nhường không phô trương thanh thế khi thực lực chưa đủ mạnh để âm thầm tích lũy sức mạnh.',
        origin: 'Đường thư & Tam Quốc Diễn Nghĩa (Lưu Bị làm vườn trồng rau ở Hứa Đô để che mắt Tào Tháo trong lúc xây dựng lực lượng).',
        usage: '初创企业在尚未建立核心壁垒之前，应当懂得韬光养晦，深耕产品研发。'
      },
      {
        simp: '破釜沉舟', trad: '破釜沉舟', pinyin: 'pòfǔ-chénzhōu', hanviet: 'PHÁ PHỦ TRẦM CHÂU',
        literal: 'Đập vỡ nồi nấu cơm, đánh đắm thuyền qua sông',
        meaning: 'Quyết tâm tới cùng, tự cắt đường lui để dốc toàn lực chiến thắng hoàn cảnh sinh tử.',
        origin: 'Sử Ký Tư Mã Thiên (Hạng Vũ Bản Kỷ): Hạng Vũ dẫn quân vượt sông Chương cứu Cự Lộc, ra lệnh đập hết nồi niêu, dìm hết thuyền bè, chỉ mang 3 ngày lương thực, đánh 9 trận đại phá quân Tần.',
        usage: '面对传统市场的萎缩，董事会决定破釜沉舟，全面转型新能源领域。'
      },
      {
        simp: '举一反三', trad: '舉一反三', pinyin: 'jǔyī-fǎnsān', hanviet: 'CỬ NHẤT PHẢN TAM',
        literal: 'Đưa ra một góc của vật bốn góc, tự suy ra được ba góc còn lại',
        meaning: 'Học một biết mười, từ một nguyên lý/ví dụ mà tự suy luận và ứng dụng sáng tạo sang nhiều trường hợp khác.',
        origin: 'Luận Ngữ (Thuật Nhi): Khổng Tử dạy học trò "Cử nhất ngung bất dĩ tam ngung phản, tắc bất phục dã" (Chỉ cho 1 góc mà không tự suy ra 3 góc kia thì ta chưa dạy tiếp).',
        usage: '掌握了汉字的部首和造字规律，你就能举一反三，轻松记住成千上万个词汇。'
      },
      {
        simp: '水滴石穿，绳锯木断', trad: '水滴石穿，繩鋸木斷', pinyin: 'shuǐdī-shíchuān, shéngjù-mùduàn', hanviet: 'THỦY TÍCH THẠCH XUYÊN, THẰNG CỨ MỘC ĐOẠN',
        literal: 'Nước chảy đá mòn, dây thừng cưa mãi gỗ cũng đứt',
        meaning: 'Sức mạnh của sự kiên trì bền bỉ mỗi ngày: dù việc nhỏ bé nhưng tích lũy không ngừng ắt làm nên kỳ tích.',
        origin: 'Hán Thư & Hạc Lâm Ngọc Lộ (Trương Quai Nhai thời Tống xử án và bàn về sự tích lũy kiên trì).',
        usage: '语言学习没有捷径，唯有秉持“水滴石穿”的毅力，日积月累方能精通。'
      }
    ];

    const SYNONYM_VAULT_DATA = [
      {
        pair: '1. 二 (èr) vs 两 (liǎng) — Cùng nghĩa là "Số 2"',
        level: 'LVL1',
        diff: '二 dùng trong toán học, số thứ tự (第一、第二), số điện thoại, hàng chục (二十、十二). 两 dùng khi đứng trước Lượng từ (两个人、两本书) và trước 千、万、亿.',
        right: '✅ 我有两个妹妹，今年二十二岁。',
        wrong: '❌ 我有二个妹妹。(Sai vì trước lượng từ 个 phải dùng 两)'
      },
      {
        pair: '2. 不 (bù) vs 没 (méi) — Phủ định trong tiếng Trung',
        level: 'LVL1',
        diff: '不 phủ định ý chí chủ quan ở hiện tại/tương lai hoặc thói quen, tính chất (không muốn / không phải). 没 phủ định sự việc khách quan ĐÃ XẢY RA hay chưa, hoặc phủ định sở hữu 有 (chưa / không có).',
        right: '✅ 我昨天没去公司（Khách quan chưa đi）。我明天不去（Chủ quan không đi）。',
        wrong: '❌ 我不有钱 / 我昨天不去。(Sai: với 有 và quá khứ khách quan phải dùng 没)'
      },
      {
        pair: '3. 能 (néng) vs 会 (huì) vs 可以 (kěyǐ) — "Có thể"',
        level: 'LVL1',
        diff: '会: Biết làm nhờ HỌC TẬP (会说汉语, 会开车) hoặc khả năng xảy ra ở tương lai (明天会下雨). 能: Năng lực/điều kiện khách quan cho phép (一分钟能打一百字). 可以: Được phép hoặc khuyên nhủ (这里可以停车吗？).',
        right: '✅ 我会游泳，今天天气好，我可以去游泳池游两千米。',
        wrong: '❌ 我能说一点儿汉语，因为我刚学了一个月。(Nói về kỹ năng qua học tập nên dùng 会)'
      },
      {
        pair: '4. 刚 (gāng) vs 刚才 (gāngcái) — "Vừa mới"',
        level: 'LVL2',
        diff: '刚 là Phó từ (chỉ đứng SAU chủ ngữ, TRƯỚC động từ, có thể đi với mốc thời gian cách đây lâu theo cảm nhận người nói). 刚才 là Danh từ chỉ thời gian (vừa nãy — cách đây vài phút, đứng được cả đầu câu hoặc sau chủ ngữ, đi được với phủ định 没).',
        right: '✅ 你刚才去哪儿了？刚才没看见你。 / 他上个月刚从英国回来。',
        wrong: '❌ 你刚没看见我吗？ / 他刚才上个月回来。(Sai từ loại)'
      },
      {
        pair: '5. 适合 (shìhé) vs 合适 (héshì) — "Phù hợp"',
        level: 'LVL2',
        diff: '适合 là Động từ (mang tân ngữ theo sau: 适合 + Ai/Cái gì). 合适 là Tính từ (không mang tân ngữ phía sau, thường làm vị ngữ hoặc định ngữ: 很合适 / 合适的时间).',
        right: '✅ 这件衬衫的颜色很适合你，尺码也很合适。',
        wrong: '❌ 这份工作非常合适你。(Sai vì 合适 là tính từ, không nhận tân ngữ 你)'
      },
      {
        pair: '6. 通过 (tōngguò) vs 经过 (jīngguò) — "Thông qua / Trải qua"',
        level: 'LVL3',
        diff: '通过 nhấn mạnh PHƯƠNG THỨC, CÔNG CỤ, CON ĐƯỜNG dẫn tới kết quả (通过努力、通过互联网). 经过 nhấn mạnh QUÁ TRÌNH THỜI GIAN hoặc chuỗi sự việc vất vả đã trải qua (经过三年的谈判、经过深思熟虑).',
        right: '✅ 经过长达半年的严格测试，我们通过创新算法解决了这一难题。',
        wrong: '❌ 经过互联网，我们可以随时查阅资料。(Internet là công cụ phương tiện nên phải dùng 通过)'
      },
      {
        pair: '7. 必须 (bìxū) vs 必需 (bìxū) — Đồng âm khác nghĩa',
        level: 'LVL3',
        diff: '必须 (Bộ Sam 彡) là Phó từ: "Bắt buộc phải" + Động từ (必须遵守、必须完成). 必需 (Bộ Vũ 雨) là Động từ/Tính từ: "Cần thiết phải có" về mặt vật chất, thường ghép thành 必需品 (nhu yếu phẩm).',
        right: '✅ 出门旅行必须带好身份证和生活必需品。',
        wrong: '❌ 水和空气是人类生存必须的。(Cần cho sinh tồn vật chất phải dùng 必需)'
      },
      {
        pair: '8. 截止 (jiézhǐ) vs 截至 (jiézhì) — "Tính đến / Hết hạn"',
        level: 'LVL4',
        diff: '截止 (Chấm dứt/Đóng lại) là động từ nội động, KHÔNG mang tân ngữ thời gian phía sau (报名已经截止 / 截止到昨天). 截至 (Tính cho đến mốc...) BẮT BUỘC mang mốc thời gian phía sau và sự việc vẫn còn tiếp diễn (截至目前、截至2026年底).',
        right: '✅ 本次招标报名将于本周五截止；截至今日上午，已有三十家企业提交标书。',
        wrong: '❌ 截止目前，销售额已突破亿元。(Trước mốc thời gian trực tiếp phải dùng 截至 hoặc 截止到)'
      },
      {
        pair: '9. 以至 (yǐzhì) vs 以致 (yǐzhì) — "Đến mức / Dẫn đến"',
        level: 'LVL4',
        diff: '以至 chỉ sự mở rộng mức độ, phạm vi từ nhỏ đến lớn hoặc kết quả tự nhiên (Tốt hoặc trung tính). 以致 (chữ 致 trong 导致) CHỈ DÙNG CHO KẾT QUẢ XẤU, TIÊU CỰC do nguyên nhân sai lầm phía trước gây ra!',
        right: '✅ 他事先没有仔细核对合同条款，以致造成了严重的经济损失。',
        wrong: '❌ 他每天刻苦练习，以致取得了全校第一名。(Kết quả tốt không bao giờ dùng 以致!)'
      },
      {
        pair: '10. 反应 (fǎnyìng) vs 反映 (fǎnyìng) — "Phản ứng / Phản ánh"',
        level: 'LVL4',
        diff: '反应 (Bộ Hựu 又): Phản ứng hóa học, phản xạ cơ thể hoặc thái độ đáp trả tự nhiên trước kích thích (化学反应、反应敏捷). 反映 (Bộ Nhật 日 - chiếu sáng): Phản ánh tình hình/ý kiến lên cấp trên, hoặc tác phẩm nghệ thuật phản ánh hiện thực xã hội (反映问题、反映社会现实).',
        right: '✅ 许多居民向物业管理处反映了噪音问题，管理处反应非常迅速。',
        wrong: '❌ 这部电影深刻地反应了当代年轻人的生活状态。(Phản ánh hiện thực phải dùng 反映 có bộ Nhật 日)'
      }
    ];
    // =========================================================================
