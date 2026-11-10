/* ArabicBrailleApp.jsx - Comprehensive Single-File Arabic & Quranic Braille Application */
const { useState, useEffect, useMemo, useCallback, useRef } = React;

    // ==========================================
    // 1. DATA DICTIONARY & LINGUISTIC REGISTRY
    // ==========================================
    const ARABIC_BRAILLE_REGISTRY = [
      { id: 'alif', char: 'ا', nameUrdu: 'الف (ساکن / خالی)', nameEn: 'Bare Alif (Silent)', dots: [1], category: 'alphabet', example: 'الله' },
      { id: 'baa', char: 'ب', nameUrdu: 'با', nameEn: 'Baa', dots: [1, 2], category: 'alphabet', example: 'بِسْمِ' },
      { id: 'taa', char: 'ت', nameUrdu: 'تا', nameEn: 'Taa', dots: [2, 3, 4, 5], category: 'alphabet', example: 'تَمْر' },
      { id: 'thaa', char: 'ث', nameUrdu: 'ثا', nameEn: 'Thaa', dots: [1, 4, 5, 6], category: 'alphabet', example: 'ثَوَاب' },
      { id: 'jeem', char: 'ج', nameUrdu: 'جيم', nameEn: 'Jeem', dots: [2, 4, 5], category: 'alphabet', example: 'جَنَّة' },
      { id: 'haa', char: 'ح', nameUrdu: 'حا', nameEn: 'Haa', dots: [1, 5, 6], category: 'alphabet', example: 'حَمْد' },
      { id: 'khaa', char: 'خ', nameUrdu: 'خا', nameEn: 'Khaa', dots: [1, 3, 4, 6], category: 'alphabet', example: 'خَيْر' },
      { id: 'daal', char: 'د', nameUrdu: 'دال', nameEn: 'Daal', dots: [1, 4, 5], category: 'alphabet', example: 'دِين' },
      { id: 'zhaal', char: 'ذ', nameUrdu: 'ذال', nameEn: 'Zhaal', dots: [2, 3, 4, 6], category: 'alphabet', example: 'ذِكْر' },
      { id: 'raa', char: 'ر', nameUrdu: 'را', nameEn: 'Raa', dots: [1, 2, 3, 5], category: 'alphabet', example: 'رَحْمٰن' },
      { id: 'zay', char: 'ز', nameUrdu: 'زا / زے', nameEn: 'Zay', dots: [1, 3, 5, 6], category: 'alphabet', example: 'زَكَاة' },
      { id: 'seen', char: 'س', nameUrdu: 'سين', nameEn: 'Seen', dots: [2, 3, 4], category: 'alphabet', example: 'سَلَام' },
      { id: 'sheen', char: 'ش', nameUrdu: 'شين', nameEn: 'Sheen', dots: [1, 4, 6], category: 'alphabet', example: 'شَمْس' },
      { id: 'saad', char: 'ص', nameUrdu: 'صاد', nameEn: 'Saad', dots: [1, 2, 3, 4, 6], category: 'alphabet', example: 'صِرَاط' },
      { id: 'daad', char: 'ض', nameUrdu: 'ضاد', nameEn: 'Daad', dots: [1, 2, 4, 6], category: 'alphabet', example: 'ضُحَى' },
      { id: 'taa_heavy', char: 'ط', nameUrdu: 'طا', nameEn: 'Taa (Emphatic)', dots: [2, 3, 4, 5, 6], category: 'alphabet', example: 'طَيِّب' },
      { id: 'zaa', char: 'ظ', nameUrdu: 'ظا', nameEn: 'Zaa (Emphatic)', dots: [1, 2, 3, 4, 5, 6], category: 'alphabet', example: 'ظُلُمَات' },
      { id: 'ayn', char: 'ع', nameUrdu: 'عين', nameEn: 'Ayn', dots: [1, 2, 3, 5, 6], category: 'alphabet', example: 'عَلِيم' },
      { id: 'ghayn', char: 'غ', nameUrdu: 'غين', nameEn: 'Ghayn', dots: [1, 2, 6], category: 'alphabet', example: 'غَفُور' },
      { id: 'faa', char: 'ف', nameUrdu: 'فا', nameEn: 'Faa', dots: [1, 2, 4], category: 'alphabet', example: 'فَتْح' },
      { id: 'qaaf', char: 'ق', nameUrdu: 'قاف', nameEn: 'Qaaf', dots: [1, 2, 3, 4, 5], category: 'alphabet', example: 'قُرْآن' },
      { id: 'kaaf', char: 'ك', nameUrdu: 'كاف', nameEn: 'Kaaf', dots: [1, 3], category: 'alphabet', example: 'كِتَاب' },
      { id: 'kaaf_urdu', char: 'ک', nameUrdu: 'کاف', nameEn: 'Kaaf (Urdu)', dots: [1, 3], category: 'alphabet', example: 'کلام' },
      { id: 'laam', char: 'ل', nameUrdu: 'لام', nameEn: 'Laam', dots: [1, 2, 3], category: 'alphabet', example: 'لَيْل' },
      { id: 'meem', char: 'م', nameUrdu: 'ميم', nameEn: 'Meem', dots: [1, 3, 4], category: 'alphabet', example: 'مَلِك' },
      { id: 'noon', char: 'ن', nameUrdu: 'نون', nameEn: 'Noon', dots: [1, 3, 4, 5], category: 'alphabet', example: 'نُور' },
      { id: 'haa_soft', char: 'ه', nameUrdu: 'ہائے ہوز', nameEn: 'Haa', dots: [1, 2, 5], category: 'alphabet', example: 'هُدَى' },
      { id: 'haa_urdu', char: 'ہ', nameUrdu: 'چھوٹی ہ', nameEn: 'Haa (Urdu)', dots: [1, 2, 5], category: 'alphabet', example: 'ہم' },
      { id: 'waw', char: 'و', nameUrdu: 'واؤ', nameEn: 'Waw', dots: [2, 4, 5, 6], category: 'alphabet', example: 'وَقْت' },
      { id: 'yaa', char: 'ي', nameUrdu: 'يا (معیاری)', nameEn: 'Standard Yaa', dots: [2, 4], category: 'alphabet', example: 'فِي / قِيلَ / الَّذِي', context: 'Beginning, middle, or end of word' },
      { id: 'yaa_persian', char: 'ی', nameUrdu: 'چھوٹی ی', nameEn: 'Yaa (Farsi/Urdu)', dots: [2, 4], category: 'alphabet', example: 'یکتا' },
      { id: 'taa_marbuta', char: 'ة', nameUrdu: 'تائے مربوطہ', nameEn: 'Taa Marbuta', dots: [1, 6], category: 'alphabet', example: 'رَحْمَة' },
      { id: 'alif_hamza_above', char: 'أ', label: 'أ', nameUrdu: 'الف مع ہمزہ', nameEn: 'Alif with Hamza', dots: [3, 4], category: 'alphabet', example: 'أَمْر', verified: true },
      { id: 'alif_hamza_below', char: 'إ', label: 'إ', nameUrdu: 'الف مع ہمزہ زیر', nameEn: 'Alif with Hamza Below', dots: [3, 4], category: 'alphabet', example: 'إِنَّ', compoundNote: '[3,4] + [1,5]', verified: true },
      { id: 'waw_hamza', char: 'ؤ', nameUrdu: 'واؤ مع ہمزہ', nameEn: 'Waw Hamza', dots: [1, 2, 5, 6], category: 'alphabet', example: 'مُؤْمِن' },
      { id: 'yaa_hamza', char: 'ئ', nameUrdu: 'یا مع ہمزہ', nameEn: 'Yaa Hamza', dots: [1, 3, 4, 5, 6], category: 'alphabet', example: 'بَرِيء' },
      { id: 'hamza_isolated', char: 'ء', nameUrdu: 'ہمزہ مفرد', nameEn: 'Isolated Hamza', dots: [3], category: 'alphabet', example: 'سَمَاء' },
      { id: 'alif_maqsoorah', char: 'ى', nameUrdu: 'الف مقصورہ', nameEn: 'Alif Maqsoorah', dots: [1, 3, 5], category: 'alphabet', example: 'عَلَىٰ / مَوْلَىٰ / هُدًى', context: 'Exclusively terminal carrying dagger alif or preceded by Fathah' },
      { id: 'laam_alif', char: 'لا', nameUrdu: 'لام الف مرکب', nameEn: 'Laam-Alif Ligature', dots: [1, 2, 3, 6], category: 'alphabet', example: 'لَا رَيْبَ' },

      // Harakat & Vocalization
      { id: 'fathah', char: 'َ', nameUrdu: 'زبر / فتحہ', nameEn: 'Fathah', dots: [2], category: 'harakat', example: 'ـَ (بَ)' },
      { id: 'kasrah', char: 'ِ', nameUrdu: 'زیر / کسرہ', nameEn: 'Kasrah', dots: [1, 5], category: 'harakat', example: 'ـِ (بِ)' },
      { id: 'dammah', char: 'ُ', nameUrdu: 'پیش / ضمہ', nameEn: 'Dammah', dots: [1, 3, 6], category: 'harakat', example: 'ـُ (بُ)' },
      { id: 'tanween_fath', char: 'ً', nameUrdu: 'دو زبر / تنوین فتح', nameEn: 'Tanween Fath', dots: [2, 3], category: 'harakat', example: 'ـً (بً)' },
      { id: 'tanween_kasr', char: 'ٍ', nameUrdu: 'دو زیر / تنوین کسر', nameEn: 'Tanween Kasr', dots: [3, 5], category: 'harakat', example: 'ـٍ (بٍ)' },
      { id: 'tanween_damm', char: 'ٌ', nameUrdu: 'دو پیش / تنوین ضم', nameEn: 'Tanween Damm', dots: [2, 6], category: 'harakat', example: 'ـٌ (بٌ)' },
      { id: 'dagger_alif', char: 'ٰ', nameUrdu: 'کھڑا زبر / الف خنجریہ', nameEn: 'Dagger Alif', dots: [4], category: 'harakat', example: 'ـٰ (هٰذَا)' },
      { id: 'khari_zair', char: 'ٖ', nameUrdu: 'کھڑی زیر', nameEn: 'Subscript Alef (Khari Zair)', dots: [4, 5], category: 'harakat', example: 'ـٖ (بِهٖ)' },
      { id: 'inverted_dammah', char: 'ٗ', nameUrdu: 'الٹا پیش', nameEn: 'Inverted Dammah', dots: [3, 4, 6], category: 'harakat', example: 'ـٗ (لَهٗ)' },

      // Markers & Quranic signs
      { id: 'sukoon', char: 'ْ', nameUrdu: 'جزم / سکون', nameEn: 'Sukoon', dots: [2, 5], category: 'markers', example: 'ـْ (قُلْ)' },
      { id: 'quranic_sukoon', char: 'ۡ', nameUrdu: 'جزم قرآنی / سکون', nameEn: 'Quranic Sukoon', dots: [2, 5], category: 'markers', example: 'ـۡ' },
      { id: 'madda_comp', char: 'ۤ', nameUrdu: 'مدّ قرآنی', nameEn: 'Quranic Maddah', dots: [3, 4, 5], category: 'markers', example: 'لَاۤ' },
      { id: 'maddah', char: 'ٓ', nameUrdu: 'مدّ', nameEn: 'Maddah', dots: [3, 4, 5], category: 'markers', example: 'شَآءَ' },
      { id: 'hamza_above', char: 'ٔ', nameUrdu: 'ہمزہ بالا', nameEn: 'Hamza Above', dots: [3], category: 'markers', example: 'يَـــُٔوۡدُهٗ' },
      { id: 'shaddah', char: 'ّ', nameUrdu: 'شدّ / تشدید (حرف سے پہلے)', nameEn: 'Shaddah (Prepended)', dots: [6], category: 'markers', example: 'ـّ (أَنَّ = أ + [6] + ن + [2])' },
      // Quranic Pause Marks (رموزِ اوقاف قرآن مجید) - 2-Cell Compound Layout: Left Cell [3,6] + Right Cell [Specific Sign]
      {
        id: 'waqf_marker',
        char: 'ۚ',
        title: 'رموزِ اوقاف اشاریہ',
        nameUrdu: 'رموزِ اوقاف اشاریہ',
        nameEn: 'Waqf Indicator Prefix',
        dots: [3, 6],
        category: 'markers',
        example: 'اشاریہ [3,6]',
        description: 'علاماتِ وقف سے قبل متصل آنے والا اشاریہ'
      },
      {
        id: 'waqf_laazim_m',
        char: 'م (وقف)',
        title: 'وقف لازم (م)',
        nameUrdu: 'وقف لازم (م)',
        nameEn: 'Waqf Laazim (Meem)',
        dots: [1, 3, 4],
        cells: [[3, 6], [1, 3, 4]],
        category: 'markers',
        example: 'مـ (لازم)',
        description: 'یہاں وقف کرنا لازم ہے، نہ ٹھہرنے کی صورت میں معنی خراب ہو سکتے ہیں۔'
      },
      {
        id: 'waqf_mutlaq_t',
        char: 'ط (وقف)',
        title: 'وقف مطلق (ط)',
        nameUrdu: 'وقف مطلق (ط)',
        nameEn: 'Waqf Mutlaq (Tah)',
        dots: [1, 4, 5],
        cells: [[3, 6], [1, 4, 5]],
        category: 'markers',
        example: 'ط (مطلق)',
        description: 'وقفِ تام کی علامت ہے، یہاں ٹھہرنا چاہیے۔'
      },
      {
        id: 'waqf_jaaiz_j',
        char: 'ج (وقف)',
        title: 'وقف جائید (ج)',
        nameUrdu: 'وقف جائید (ج)',
        nameEn: 'Waqf Jaaiz (Jeem)',
        dots: [2, 4, 5],
        cells: [[3, 6], [2, 4, 5]],
        category: 'markers',
        example: 'ج (جائز)',
        description: 'یہاں ٹھہرنا اور نہ ٹھہرنا دونوں جائز ہیں۔'
      },
      {
        id: 'waqf_mujawwaz_z',
        char: 'ز (وقف)',
        title: 'علامتِ وقفِ مجوز (ز)',
        nameUrdu: 'علامتِ وقفِ مجوز (ز)',
        nameEn: 'Waqf Mujawwaz (Zay)',
        dots: [1, 3, 5, 6],
        cells: [[3, 6], [1, 3, 5, 6]],
        category: 'markers',
        example: 'ز (مجوز)',
        description: 'یہاں نہ ٹھہرنا بہتر ہے۔'
      },
      {
        id: 'waqf_murakhkhas_s',
        char: 'ص (وقف)',
        title: 'علامتِ وقفِ مرخص (ص)',
        nameUrdu: 'علامتِ وقفِ مرخص (ص)',
        nameEn: 'Waqf Murakh-khas (Saad)',
        dots: [1, 2, 3, 4, 6],
        cells: [[3, 6], [1, 2, 3, 4, 6]],
        category: 'markers',
        example: 'ص (مرخص)',
        description: 'ملا کر پڑھنا چاہیے لیکن اگر کوئی تھکن کی وجہ سے ٹھہر جائے تو رخصت ہے۔'
      },
      {
        id: 'waqf_al_wasl_awla_sl',
        char: 'صل (وقف)',
        title: 'الوصل اولى (صل)',
        nameUrdu: 'الوصل اولى (صل)',
        nameEn: 'Al-Wasl Awla (Sad-Lam)',
        dots: [1, 2, 3, 4, 5],
        cells: [[3, 6], [1, 2, 3, 4, 5]],
        category: 'markers',
        example: 'صل (الوصل اولى)',
        description: 'ملا کر پڑھنا بہتر ہے۔'
      },
      {
        id: 'waqf_qif_q',
        char: 'ق (وقف)',
        title: 'قِف / قلی (ق)',
        nameUrdu: 'قِف / قلی (ق)',
        nameEn: 'Qif / Qila (Qaf)',
        dots: [1, 2, 3, 4, 5],
        cells: [[3, 6], [1, 2, 3, 4, 5]],
        category: 'markers',
        example: 'ق (قِف)',
        description: 'وقف کے معنی میں ہے، یہاں ٹھہرنا چاہیے۔'
      },
      {
        id: 'waqf_qila_awla_qf',
        char: 'قف (وقف)',
        title: 'قلی / وقف قلی (قف)',
        nameUrdu: 'قلی / وقف قلی (قف)',
        nameEn: 'Qila / Waqf Qila (Qaf-Fe)',
        dots: [1, 2, 3, 4, 5],
        cells: [[3, 6], [1, 2, 3, 4, 5]],
        category: 'markers',
        example: 'قف (الوقف اولى)',
        description: 'وقف اولیٰ ہے۔'
      },
      {
        id: 'waqf_salle_qif',
        char: 'صلّ (وقف)',
        title: 'صلّ (قِف)',
        nameUrdu: 'صلّ (قِف)',
        nameEn: 'Salle / Qad Yusal',
        dots: [1, 2, 3, 4],
        cells: [[3, 6], [1, 2, 3, 4]],
        category: 'markers',
        example: 'صلّ (قد یصل)',
        description: 'قد یصل کا مخفف ہے، یہاں ٹھہرنا بھی اور کبھی نہیں بھی۔'
      },
      {
        id: 'waqf_saktah_s',
        char: 'س (وقف)',
        title: 'سکتہ (س)',
        nameUrdu: 'سکتہ (س)',
        nameEn: 'Saktah (Seen)',
        dots: [2, 3, 4],
        cells: [[3, 6], [2, 3, 4]],
        category: 'markers',
        example: 'س (سکتہ)',
        description: 'یہاں کسی قدر ٹھہرنا چاہیے مگر سانس نہ ٹوٹنے پائے۔'
      },
      {
        id: 'waqf_waqfah',
        char: 'وقفہ',
        title: 'وقفہ',
        nameUrdu: 'وقفہ',
        nameEn: 'Waqfah',
        dots: [2, 3, 4, 5],
        cells: [[3, 6], [2, 3, 4, 5]],
        category: 'markers',
        example: 'وقفہ',
        description: 'سکتہ کی نسبت زیادہ ٹھہرنا چاہیے لیکن سانس نہ ٹوٹے۔'
      },
      {
        id: 'waqf_la_mamnoo',
        char: 'لا (وقف)',
        title: 'لا (ممنوع وقف)',
        nameUrdu: 'لا (ممنوع وقف)',
        nameEn: 'La (Mamnoo Waqf)',
        dots: [1, 2, 3],
        cells: [[3, 6], [1, 2, 3]],
        category: 'markers',
        example: 'لا (ممنوع)',
        description: 'یہاں ہرگز نہ ٹھہرنا چاہئے۔'
      },
      {
        id: 'waqf_kaf_kazalik',
        char: 'ک (وقف)',
        title: 'کف (ک)',
        nameUrdu: 'کف (ک)',
        nameEn: 'Kaf (Kazalik)',
        dots: [1, 3],
        cells: [[3, 6], [1, 3]],
        category: 'markers',
        example: 'ک (کذلک)',
        description: 'کذلک کا مخفف ہے، اس سے مراد ہے کہ جو حکم پہلی آیت میں ہے وہی اس پر بھی ہے۔'
      },
      {
        id: 'waqf_muanaqah',
        char: '∴',
        title: 'معانقہ (∴ ∴)',
        nameUrdu: 'معانقہ (∴ ∴)',
        nameEn: 'Muanaqah (Three Dots)',
        dots: [1, 4, 6],
        cells: [[3, 6], [1, 4, 6]],
        category: 'markers',
        example: 'ۛ ۛ (معانقہ)',
        description: 'یہ تین نقطوں والے دو وقف قریب قریب آتے ہیں (معانقہ)، دونوں وقت میں سے ایک پر ٹھہرنا چاہئے۔'
      },
      {
        id: 'ayah_marker',
        char: '۝',
        title: 'نشانِ آیت',
        nameUrdu: 'نشانِ آیت',
        nameEn: 'Ayah End Marker',
        dots: [2, 3, 5, 6],
        category: 'markers',
        example: '۝ # ١',
        description: 'آیت کا اختتامی نشان مع ہندسہ'
      },
      { id: 'braille_num_sign_sym', char: '⠼', title: 'علامتِ عدد بریل', nameUrdu: 'علامتِ عدد بریل', nameEn: 'Number Sign', dots: [3, 4, 5, 6], category: 'numbers', example: '⠼' },
      { id: 'braille_full_stop_sym', char: '⠲', title: 'ختمہ / فل اسٹاپ (نقاط 2، 5، 6)', nameUrdu: 'ختمہ / فل اسٹاپ (نقاط 2، 5، 6)', nameEn: 'Full Stop [2,5,6]', dots: [2, 5, 6], category: 'markers', example: '⠲' },
      { id: 'muqattaat', char: '۞', title: 'حروفِ مقطعات اشاریہ', nameUrdu: 'حروفِ مقطعات اشاریہ', nameEn: "Muqatta'at Indicator", dots: [3, 6], category: 'markers', example: 'الٓمّٓ (ہر حرف بعد [3,6])' },

      // Numerals
      { id: 'num_sign', char: '#', nameUrdu: 'علامتِ عدد', nameEn: 'Number Sign Prefix', dots: [3, 4, 5, 6], category: 'numbers', example: '# + 1' },
      { id: 'num_1', char: '١', nameUrdu: '١ (ایک)', nameEn: 'Digit 1', dots: [1], category: 'numbers', example: '# + 1' },
      { id: 'num_2', char: '٢', nameUrdu: '٢ (دو)', nameEn: 'Digit 2', dots: [1, 2], category: 'numbers', example: '# + 2' },
      { id: 'num_3', char: '٣', nameUrdu: '٣ (تین)', nameEn: 'Digit 3', dots: [1, 4], category: 'numbers', example: '# + 3' },
      { id: 'num_4', char: '٤', nameUrdu: '٤ (چار)', nameEn: 'Digit 4', dots: [1, 4, 5], category: 'numbers', example: '# + 4' },
      { id: 'num_5', char: '٥', nameUrdu: '٥ (پانچ)', nameEn: 'Digit 5', dots: [1, 5], category: 'numbers', example: '# + 5' },
      { id: 'num_6', char: '٦', nameUrdu: '٦ (چھ)', nameEn: 'Digit 6', dots: [1, 2, 4], category: 'numbers', example: '# + 6' },
      { id: 'num_7', char: '٧', nameUrdu: '٧ (سات)', nameEn: 'Digit 7', dots: [1, 2, 4, 5], category: 'numbers', example: '# + 7' },
      { id: 'num_8', char: '٨', nameUrdu: '٨ (آٹھ)', nameEn: 'Digit 8', dots: [1, 2, 5], category: 'numbers', example: '# + 8' },
      { id: 'num_9', char: '٩', nameUrdu: '٩ (نو)', nameEn: 'Digit 9', dots: [2, 4], category: 'numbers', example: '# + 9' },
      { id: 'num_0', char: '٠', nameUrdu: '٠ (صفر)', nameEn: 'Digit 0', dots: [2, 4, 5], category: 'numbers', example: '# + 0' }
    ];

    const REFERENCE_REGISTRY = ARABIC_BRAILLE_REGISTRY;
    const CHAR_MAP = new Map(ARABIC_BRAILLE_REGISTRY.map(it => [it.char, it]));
    const ID_MAP = new Map(ARABIC_BRAILLE_REGISTRY.map(it => [it.id, it]));

    // Lookup fallbacks
    CHAR_MAP.set('\u282F', CHAR_MAP.get('۝'));
    ID_MAP.set('waqf_jeem', ID_MAP.get('waqf_jaaiz_j'));
    ID_MAP.set('waqf_tah', ID_MAP.get('waqf_mutlaq_t'));
    ID_MAP.set('waqf_tah_code', ID_MAP.get('waqf_mutlaq_t'));
    ID_MAP.set('waqf_qila_q', ID_MAP.get('waqf_qif_q'));
    ID_MAP.set('waqf_salle_s', ID_MAP.get('waqf_al_wasl_awla_sl'));
    ID_MAP.set('braille_ayah_sym', ID_MAP.get('ayah_marker'));

    CHAR_MAP.set('ۘ', ID_MAP.get('waqf_laazim_m'));
    CHAR_MAP.set('ؕ', ID_MAP.get('waqf_mutlaq_t'));
    CHAR_MAP.set('ۚ', ID_MAP.get('waqf_jaaiz_j'));
    CHAR_MAP.set('ۖ', ID_MAP.get('waqf_mujawwaz_z'));
    CHAR_MAP.set('ۗ', ID_MAP.get('waqf_qila_awla_qf') || ID_MAP.get('waqf_qif_q'));
    CHAR_MAP.set('ۛ', ID_MAP.get('waqf_muanaqah'));
    CHAR_MAP.set('∴', ID_MAP.get('waqf_muanaqah'));

    // Canonical overrides to guarantee core letters, Qaf, Maddah, and Laam-Alif are preserved
    CHAR_MAP.set('ق', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'qaaf') || { id: 'qaaf', char: 'ق', nameUrdu: 'قاف', nameEn: 'Qaaf', dots: [1, 2, 3, 4, 5] });
    CHAR_MAP.set('ۤ', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'madda_comp') || { id: 'madda_comp', char: 'ۤ', nameUrdu: 'مدّ قرآنی', nameEn: 'Quranic Maddah', dots: [3, 4, 5] });
    CHAR_MAP.set('ٓ', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'maddah') || { id: 'maddah', char: 'ٓ', nameUrdu: 'مدّ', nameEn: 'Maddah', dots: [3, 4, 5] });
    CHAR_MAP.set('\u06E4', CHAR_MAP.get('ۤ'));
    CHAR_MAP.set('\u0653', CHAR_MAP.get('ٓ'));
    CHAR_MAP.set('لا', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'laam_alif') || { id: 'laam_alif', char: 'لا', nameUrdu: 'لام الف مرکب', nameEn: 'Laam-Alif', dots: [1, 2, 3, 6] });
    // Explicit canonical overrides to prevent any mis-mappings
    CHAR_MAP.set('أ', {
      id: 'alif_hamza_above',
      char: 'أ',
      label: 'أ',
      nameUrdu: 'الف مع ہمزہ',
      nameEn: 'Alif with Hamza',
      dots: [3, 4],
      category: 'alphabet',
      example: 'أَمْر',
      verified: true
    });
    CHAR_MAP.set('\u0623', CHAR_MAP.get('أ'));
    CHAR_MAP.set('إ', {
      id: 'alif_hamza_below',
      char: 'إ',
      label: 'إ',
      nameUrdu: 'الف مع ہمزہ زیر',
      nameEn: 'Alif with Hamza Below',
      dots: [3, 4],
      category: 'alphabet',
      example: 'إِنَّ',
      verified: true
    });
    CHAR_MAP.set('\u0625', CHAR_MAP.get('إ'));

    function dotsKey(dots) {
      return [...dots].sort((a, b) => a - b).join(',');
    }

    function dotsToUnicode(dots) {
      if (!dots || dots.length === 0) return '\u2800';
      let mask = 0;
      dots.forEach(d => {
        if (d >= 1 && d <= 6) mask |= (1 << (d - 1));
      });
      return String.fromCharCode(0x2800 + mask);
    }

    function unicodeToDots(char) {
      const code = char.charCodeAt(0);
      if (code < 0x2800 || code > 0x28FF) return [];
      const mask = code - 0x2800;
      const dots = [];
      for (let i = 0; i < 6; i++) {
        if ((mask & (1 << i)) !== 0) dots.push(i + 1);
      }
      return dots;
    }

    // Complete 14 Quranic Ramooz-e-Awqaf Rules Registry (2-Cell LTR Compound Structure)
    const QURANIC_WAQF_RULES_REGISTRY = [
      {
        id: 'waqf_laazim_m',
        title: 'وقف لازم (م)',
        nameUrdu: 'وقف لازم (م)',
        nameEn: 'Waqf Laazim (Meem)',
        char: 'م',
        ruleTextUrdu: 'یہاں وقف کرنا لازم ہے، نہ ٹھہرنے کی صورت میں معنی خراب ہو سکتے ہیں۔',
        cells: [[3, 6], [1, 3, 4]],
        letterDots: [1, 3, 4]
      },
      {
        id: 'waqf_mutlaq_t',
        title: 'وقف مطلق (ط)',
        nameUrdu: 'وقف مطلق (ط)',
        nameEn: 'Waqf Mutlaq (Tah)',
        char: 'ط',
        ruleTextUrdu: 'وقفِ تام کی علامت ہے، یہاں ٹھہرنا چاہیے۔',
        cells: [[3, 6], [1, 4, 5]],
        letterDots: [1, 4, 5]
      },
      {
        id: 'waqf_jaaiz_j',
        title: 'وقف جائز (ج)',
        nameUrdu: 'وقف جائز (ج)',
        nameEn: 'Waqf Jaaiz (Jeem)',
        char: 'ج',
        ruleTextUrdu: 'یہاں ٹھہرنا اور نہ ٹھہرنا دونوں جائز ہیں۔',
        cells: [[3, 6], [2, 4, 5]],
        letterDots: [2, 4, 5]
      },
      {
        id: 'waqf_mujawwaz_z',
        title: 'علامتِ وقفِ مجوز (ز)',
        nameUrdu: 'علامتِ وقفِ مجوز (ز)',
        nameEn: 'Waqf Mujawwaz (Zay)',
        char: 'ز',
        ruleTextUrdu: 'یہاں نہ ٹھہرنا بہتر ہے۔',
        cells: [[3, 6], [1, 3, 5, 6]],
        letterDots: [1, 3, 5, 6]
      },
      {
        id: 'waqf_murakhkhas_s',
        title: 'علامتِ وقفِ مرخص (ص)',
        nameUrdu: 'علامتِ وقفِ مرخص (ص)',
        nameEn: 'Waqf Murakh-khas (Saad)',
        char: 'ص',
        ruleTextUrdu: 'ملا کر پڑھنا چاہیے لیکن اگر کوئی تھکن کی وجہ سے ٹھہر جائے تو رخصت ہے۔',
        cells: [[3, 6], [1, 2, 3, 4, 6]],
        letterDots: [1, 2, 3, 4, 6]
      },
      {
        id: 'waqf_al_wasl_awla_sl',
        title: 'الوصل اولى (صل)',
        nameUrdu: 'الوصل اولى (صل)',
        nameEn: 'Al-Wasl Awla (Sad-Lam)',
        char: 'صل',
        ruleTextUrdu: 'ملا کر پڑھنا بہتر ہے۔',
        cells: [[3, 6], [1, 2, 3, 4, 5]],
        letterDots: [1, 2, 3, 4, 5]
      },
      {
        id: 'waqf_qif_q',
        title: 'قِف / قلی (ق)',
        nameUrdu: 'قِف / قلی (ق)',
        nameEn: 'Qif / Qila (Qaf)',
        char: 'ق',
        ruleTextUrdu: 'وقف کے معنی میں ہے، یہاں ٹھہرنا چاہیے۔',
        cells: [[3, 6], [1, 2, 3, 4, 5]],
        letterDots: [1, 2, 3, 4, 5]
      },
      {
        id: 'waqf_qila_awla_qf',
        title: 'وقف قلی (قف)',
        nameUrdu: 'وقف قلی (قف)',
        nameEn: 'Waqf Qila (Qaf-Fe)',
        char: 'قف',
        ruleTextUrdu: 'وقف اولیٰ ہے۔',
        cells: [[3, 6], [1, 2, 3, 4, 5]],
        letterDots: [1, 2, 3, 4, 5]
      },
      {
        id: 'waqf_salle_qif',
        title: 'صلّ (قِف - قد یصل)',
        nameUrdu: 'صلّ (قِف - قد یصل)',
        nameEn: 'Salle / Qad Yusal',
        char: 'صلّ',
        ruleTextUrdu: 'یہاں ٹھہرنا بھی اور کبھی نہیں بھی۔',
        cells: [[3, 6], [1, 2, 3, 4]],
        letterDots: [1, 2, 3, 4]
      },
      {
        id: 'waqf_saktah_s',
        title: 'سکتہ (س)',
        nameUrdu: 'سکتہ (س)',
        nameEn: 'Saktah (Seen)',
        char: 'س',
        ruleTextUrdu: 'یہاں کسی قدر ٹھہرنا چاہیے مگر سانس نہ ٹوٹنے پائے۔',
        cells: [[3, 6], [2, 3, 4]],
        letterDots: [2, 3, 4]
      },
      {
        id: 'waqf_waqfah',
        title: 'وقفہ',
        nameUrdu: 'وقفہ',
        nameEn: 'Waqfah',
        char: 'وقفہ',
        ruleTextUrdu: 'سکتہ کی نسبت زیادہ ٹھہرنا چاہیے لیکن سانس نہ ٹوٹے۔',
        cells: [[3, 6], [2, 3, 4, 5]],
        letterDots: [2, 3, 4, 5]
      },
      {
        id: 'waqf_la_mamnoo',
        title: 'لا (ممنوع وقف)',
        nameUrdu: 'لا (ممنوع وقف)',
        nameEn: 'La (Mamnoo Waqf)',
        char: 'لا',
        ruleTextUrdu: 'یہاں ہرگز نہ ٹھہرنا چاہئے۔',
        cells: [[3, 6], [1, 2, 3]],
        letterDots: [1, 2, 3]
      },
      {
        id: 'waqf_kaf_kazalik',
        title: 'کف (ک)',
        nameUrdu: 'کف (ک)',
        nameEn: 'Kaf (Kazalik)',
        char: 'ک',
        ruleTextUrdu: 'کذلک کا مخفف ہے، اس سے مراد ہے کہ جو حکم پہلی آیت میں ہے وہی اس پر بھی ہے۔',
        cells: [[3, 6], [1, 3]],
        letterDots: [1, 3]
      },
      {
        id: 'waqf_muanaqah',
        title: 'معانقہ (∴ ∴)',
        nameUrdu: 'معانقہ (∴ ∴)',
        nameEn: 'Muanaqah (Three Dots)',
        char: '∴',
        ruleTextUrdu: 'یہ تین نقطوں والے دو وقف قریب قریب آتے ہیں، دونوں میں سے ایک پر ٹھہرنا چاہئے۔',
        cells: [[3, 6], [1, 4, 6]],
        letterDots: [1, 4, 6]
      }
    ];

    // 7 Core Rules Catalog
    const RULES_CATALOG = [
      {
        id: 'shaddah_precedence',
        number: 1,
        titleUrdu: 'حرفِ مشدد کا قاعدہ (Shaddah Precedence)',
        titleEn: 'Shaddah Precedence Rule',
        descUrdu: 'بریل میں تشدید (شدّ) کا سیل [Dot 6] ہمیشہ مشدد حرف سے پہلے رکھا جاتا ہے، بعد میں نہیں۔',
        descEn: 'The Shaddah indicator cell [Dot 6] MUST precede the doubled consonant, never follow it.',
        exampleArabic: 'أَنَّ',
        demonstration: {
          explanationUrdu: 'أ [3,4] ➔ شدّ [6] ➔ ن [1,3,4,5] ➔ زبر [2]',
          explanationEn: 'Alif Hamza [3,4] ➔ Shaddah [6] ➔ Noon [1,3,4,5] ➔ Fathah [2]',
          cells: [
            { label: 'أ', dots: [3, 4], urdu: 'الف مع ہمزہ', en: 'Alif Hamza' },
            { label: 'ـّ', dots: [6], urdu: 'شدّ (قبل از حرف)', en: 'Shaddah [6]' },
            { label: 'ن', dots: [1, 3, 4, 5], urdu: 'نون', en: 'Noon' },
            { label: 'ـَ', dots: [2], urdu: 'زبر', en: 'Fathah' }
          ]
        }
      },
      {
        id: 'harakat_sequencing',
        number: 2,
        titleUrdu: 'حرکات اور تنوین کا تسلسل (Harakat Sequencing)',
        titleEn: 'Harakat & Tanween Sequencing',
        descUrdu: 'حرکات (زبر، زیر، پیش)، تنوین اور کھڑے اعراب بغیر فاصلے کے بنیادی حرف کے فوراً بعد پیوستہ ہوتے ہیں۔',
        descEn: 'Vowels [2], [1,5], [1,3,6], Tanween, Sukoon, and vertical diacritics must immediately follow the base consonant.',
        exampleArabic: 'بِسْمِ',
        demonstration: {
          explanationUrdu: 'با [1,2] ➔ زیر [1,5] ➔ سين [2,3,4] ➔ سکون [2,5] ➔ ميم [1,3,4] ➔ زیر [1,5]',
          explanationEn: 'Baa [1,2] ➔ Kasrah [1,5] ➔ Seen [2,3,4] ➔ Sukoon [2,5] ➔ Meem [1,3,4] ➔ Kasrah [1,5]',
          cells: [
            { label: 'ب', dots: [1, 2], urdu: 'با', en: 'Baa' },
            { label: 'ـِ', dots: [1, 5], urdu: 'زیر', en: 'Kasrah' },
            { label: 'س', dots: [2, 3, 4], urdu: 'سين', en: 'Seen' },
            { label: 'ـْ', dots: [2, 5], urdu: 'سکون', en: 'Sukoon' },
            { label: 'م', dots: [1, 3, 4], urdu: 'ميم', en: 'Meem' },
            { label: 'ـِ', dots: [1, 5], urdu: 'زیر', en: 'Kasrah' }
          ]
        }
      },
      {
        id: 'grade2_maddah',
        number: 3,
        titleUrdu: 'قاعدہ الف، یا، اور واؤ مدہ (Grade 2 Contraction)',
        titleEn: 'Grade 2 Maddah Contraction Rule',
        descUrdu: 'گریڈ 2 بریل میں حروفِ مدہ سے قبل ہم جنس مختصر حرکت کو حذف کر دیا جاتا ہے (زبر+ا ➔ ا [1]، زیر+ی ➔ ی [2,4]، پیش+و ➔ و [2,4,5,6])۔',
        descEn: 'In Grade 2 contracted Braille, redundant short vowels before long vowels are omitted (fathah+alif ➔ bare alif, etc.).',
        exampleArabic: 'لَا رَيْبَ',
        demonstration: {
          explanationUrdu: 'گریڈ 1: ل [1,2,3] + زبر [2] + ا [1] | گریڈ 2: لا مرکب [1,2,3,6]',
          explanationEn: 'Grade 1: Laam + Fathah + Alif | Grade 2: Contracted Laam-Alif [1,2,3,6]',
          cells: [
            { label: 'لا', dots: [1, 2, 3, 6], urdu: 'لا مرکب', en: 'Laam-Alif' },
            { label: 'ر', dots: [1, 2, 3, 5], urdu: 'را', en: 'Raa' },
            { label: 'ـَ', dots: [2], urdu: 'زبر', en: 'Fathah' },
            { label: 'ي', dots: [2, 4], urdu: 'يا', en: 'Yaa' },
            { label: 'ـْ', dots: [2, 5], urdu: 'سکون', en: 'Sukoon' },
            { label: 'ب', dots: [1, 2], urdu: 'با', en: 'Baa' },
            { label: 'ـَ', dots: [2], urdu: 'زبر', en: 'Fathah' }
          ]
        }
      },
      {
        id: 'alif_maqsoorah',
        number: 4,
        titleUrdu: 'الف مقصورہ بمقابلہ یاء معیاری (Alif Maqsoorah vs. Standard Yaa)',
        titleEn: 'Alif Maqsoorah [1,3,5] vs. Standard Yaa [2,4] Rule',
        descUrdu: 'معیاری یاء (ي / ی) شروع، درمیان یا آخر میں نقاط [2,4] (⠤) سے لکھی جاتی ہے (جیسے فِي، قِيلَ، الَّذِي)۔ جبکہ الف مقصورہ (ى / ىٰ) صرف لفظ کے آخر میں کھڑے زبر یا ماقبل فتحہ کے ساتھ نقاط [1,3,5] (⠕) سے لکھی جاتی ہے (جیسے عَلَىٰ، مَوْلَىٰ، هُدًى)۔',
        descEn: 'Standard Yaa (ي / ی) maps to dots [2,4] (⠤) at the beginning, middle, or end of a word (e.g., فِي, قِيلَ, الَّذِي). Alif Maqsoorah (ى / ىٰ) appears exclusively at the word end carrying a dagger alif or preceded by Fathah, mapping to dots [1,3,5] (⠕) (e.g., عَلَىٰ, مَوْلَىٰ, هُدًى).',
        exampleArabic: 'عَلَىٰ وَفِي',
        demonstration: {
          explanationUrdu: 'عَلَىٰ: ع [1,2,3,5,6] ➔ زبر [2] ➔ ل [1,2,3] ➔ ىٰ مقصورہ [1,3,5] | وَفِي: و [2,4,5,6] ➔ زبر [2] ➔ ف [1,2,4] ➔ زیر [1,5] ➔ ي معیاری [2,4]',
          explanationEn: 'عَلَىٰ ends in Alif Maqsoorah [1,3,5] (⠕) | وَفِي ends in Standard Yaa [2,4] (⠤)',
          cells: [
            { label: 'ع', dots: [1, 2, 3, 5, 6], urdu: 'عين', en: 'Ayn' },
            { label: 'ـَ', dots: [2], urdu: 'زبر', en: 'Fathah' },
            { label: 'ل', dots: [1, 2, 3], urdu: 'لام', en: 'Laam' },
            { label: 'ىٰ', dots: [1, 3, 5], urdu: 'الف مقصورہ', en: 'Alif Maqsoorah [1,3,5]' },
            { label: ' ', dots: [], urdu: 'فاصلہ', en: 'Space' },
            { label: 'و', dots: [2, 4, 5, 6], urdu: 'واؤ', en: 'Waw' },
            { label: 'ـَ', dots: [2], urdu: 'زبر', en: 'Fathah' },
            { label: 'ف', dots: [1, 2, 4], urdu: 'فا', en: 'Faa' },
            { label: 'ـِ', dots: [1, 5], urdu: 'زیر', en: 'Kasrah' },
            { label: 'ي', dots: [2, 4], urdu: 'يا معیاری', en: 'Standard Yaa [2,4]' }
          ]
        }
      },
      {
        id: 'quranic_waqf',
        number: 5,
        titleUrdu: 'رموزِ اوقاف اور علاماتِ وقف (Quranic Waqf)',
        titleEn: 'Quranic Pause Markers (Waqf)',
        descUrdu: 'درمیانِ آیت علامتِ وقف سے قبل اشاریہ [3,6] لفظ سے متصل لکھا جاتا ہے، پھر وقف کا حرف اور اس کے بعد ایک خالی سیل درج ہوتا ہے۔',
        descEn: 'Waqf indicator [3,6] attaches directly to the word without space, appends the pause character, then inserts one blank cell.',
        exampleArabic: 'أَبْصَارَهُمْ ۚ كُلَّمَا',
        demonstration: {
          explanationUrdu: 'لفظ ➔ [3,6] ➔ ط/ج/م ➔ فاصلہ [Space] ➔ اگلا لفظ',
          explanationEn: 'Word ➔ Waqf Indicator [3,6] ➔ Pause Letter ➔ [Space] ➔ Next Word',
          cells: [
            { label: 'ۚ', dots: [3, 6], urdu: 'علامتِ وقف', en: 'Waqf [3,6]' },
            { label: 'ط', dots: [1, 4, 5], urdu: 'وقف مطلق (ط)', en: 'Pause Sign' },
            { label: ' ', dots: [], urdu: 'فاصلہ', en: 'Space Cell' }
          ]
        }
      },
      {
        id: 'ayah_numbering',
        number: 6,
        titleUrdu: 'نشانِ آیت اور نمبر (Ayah End & Numbering)',
        titleEn: 'Ayah End & Verse Numbering',
        descUrdu: 'آیت کے آخری لفظ سے نشانِ آیت [2,3,5,6] ملا کر آتا ہے، پھر ایک خالی سیل، علامتِ عدد [3,4,5,6] اور بریل اعداد آتے ہیں۔',
        descEn: 'Ayah End Marker [2,3,5,6] attaches directly to the final word, followed by one blank cell, then Number Prefix [3,4,5,6] and digits.',
        exampleArabic: 'يَعْلَمُونَ ۝ ١٠',
        demonstration: {
          explanationUrdu: 'لفظ ➔ نشانِ آیت [2,3,5,6] ➔ فاصلہ ➔ عدد نشان [3,4,5,6] ➔ ١ [1] ➔ ٠ [2,4,5]',
          explanationEn: 'Final Word ➔ Ayah Marker [2,3,5,6] ➔ Space ➔ Number Sign [3,4,5,6] ➔ Digit 1 ➔ Digit 0',
          cells: [
            { label: '۝', dots: [2, 3, 5, 6], urdu: 'نشانِ آیت', en: 'Ayah Marker' },
            { label: ' ', dots: [], urdu: 'فاصلہ', en: 'Space Cell' },
            { label: '#', dots: [3, 4, 5, 6], urdu: 'علامتِ عدد', en: 'Number Sign' },
            { label: '١', dots: [1], urdu: 'عدد ۱', en: 'Digit 1' },
            { label: '٠', dots: [2, 4, 5], urdu: 'عدد ۰', en: 'Digit 0' }
          ]
        }
      },
      {
        id: 'muqattaat',
        number: 7,
        titleUrdu: 'قاعدہ حروفِ مقطعات مع اعراب (Huroof-e-Muqatta\'at)',
        titleEn: "Huroof-e-Muqatta'at Rules with Diacritics",
        descUrdu: 'قرآن مجید کے حروفِ مقطعات لکھتے وقت ہر الگ پڑھے جانے والے حرف کے بعد نقاط 3، 6 کا نشان لگایا جاتا ہے۔ اگر کسی حرف پر کھڑا زبر یا مد ہو تو وہ حرف کے ساتھ لکھا جائے گا اور اس کے بعد نقاط 3، 6 آئیں گے۔ اگر کسی حرف پر تشدید ہو تو شد [6] حرف سے پہلے آئے گی۔',
        descEn: "When transcribing isolated Quranic letters (Muqatta'at), the separator cell [3, 6] must be appended immediately after each pronounced letter. Dagger Alifs follow the letter before the separator, and Shaddah precedes the doubled consonant.",
        exampleArabic: 'الٓمٓ',
        demonstration: {
          explanationUrdu: 'ا [1] ➔ [3,6] ➔ ل [1,2,3] ➔ [3,6] ➔ م [1,3,4] ➔ [3,6]',
          explanationEn: 'Alif [1] ➔ [3,6] ➔ Laam [1,2,3] ➔ [3,6] ➔ Meem [1,3,4] ➔ [3,6]',
          cells: [
            { label: 'ا', dots: [1], urdu: 'الف', en: 'Alif' },
            { label: 'ۤ', dots: [3, 6], urdu: 'فاصلہ مقطعات', en: 'Separator [3,6]' },
            { label: 'ل', dots: [1, 2, 3], urdu: 'لام', en: 'Laam' },
            { label: 'ۤ', dots: [3, 6], urdu: 'فاصلہ مقطعات', en: 'Separator [3,6]' },
            { label: 'م', dots: [1, 3, 4], urdu: 'ميم', en: 'Meem' },
            { label: 'ۤ', dots: [3, 6], urdu: 'فاصلہ مقطعات', en: 'Separator [3,6]' }
          ]
        }
      },
      {
        id: 'alif_hamza_below_rule',
        number: 8,
        titleUrdu: 'قاعدہ الف و ہمزہ (Alif vs. Hamza & إ)',
        titleEn: 'Alif vs. Hamza Rule & Universal Hamza Base',
        descUrdu: 'عربی و قرآنی رسم الخط کا بنیادی قاعدہ ہے کہ الف ہمیشہ ساکن رہتا ہے اور کوئی حرکت قبول نہیں کرتا۔ جس الف پر حرکت (زبر، زیر، پیش، سکون یا تشدید) آ جائے وہ درحقیقت ہمزہ ہے جس کا بریل کوڈ [3, 4] ہے۔ اسی لیے الف مع ہمزہ زیر (إ) کا کلمہ ہمیشہ دو خلیوں پر مشتمل ہوتا ہے: الف مع ہمزہ [3, 4] اور اس کے بعد کسرہ/زیر [1, 5]۔',
        descEn: 'Orthographic Rule: Plain Alif (ا / [1]) is strictly bare/silent and never carries any vowel. Whenever an Alif-shaped letter bears ANY diacritic or Shaddah, it is phonetically and orthographically Hamza ([3, 4]). Consequently, Alef with Hamza Below (إ) universally transcribes to the two-cell compound sequence: [3, 4] (Alif Hamza) + [1, 5] (Kasrah/Zeer).',
        exampleArabic: 'إِنَّا',
        demonstration: {
          explanationUrdu: 'إ [3,4] + زیر [1,5] ➔ شدّ [6] ➔ ن [1,3,4,5] ➔ زبر [2] ➔ ا [1]',
          explanationEn: 'Alif Hamza [3,4] ➔ Kasrah [1,5] ➔ Shaddah [6] ➔ Noon [1,3,4,5] ➔ Fathah [2] ➔ Alif [1]',
          cells: [
            { label: 'أ', dots: [3, 4], urdu: 'الف مع ہمزہ', en: 'Alif Hamza [3,4]' },
            { label: 'ـِ', dots: [1, 5], urdu: 'زیر / کسرہ', en: 'Kasrah [1,5]' },
            { label: 'ـّ', dots: [6], urdu: 'شدّ', en: 'Shaddah [6]' },
            { label: 'ن', dots: [1, 3, 4, 5], urdu: 'نون', en: 'Noon' },
            { label: 'ـَ', dots: [2], urdu: 'زبر', en: 'Fathah' },
            { label: 'ا', dots: [1], urdu: 'الف (ساکن)', en: 'Bare Alif [1]' }
          ]
        }
      }
    ];

    const QURANIC_VERSES_CATALOG = [
      {
        id: 'ayatul_kursi',
        surahUrdu: 'سورۃ البقرۃ: آیت الکرسی (آیت ۲۵۵)',
        surahEn: 'Surah Al-Baqarah: Ayat al-Kursi (Verse 255)',
        textArabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ ۝ ٢٥٥',
        descUrdu: 'سیدہ آیات القرآن - تشدیدِ متوالیہ، مخفف لام الف [1,2,3,6]، کھڑے زبر، رموزِ اوقاف (ج، ط، صلے)، حمزہ اور ۳ ہندسی آیت کا جامع نمونہ۔',
        descEn: 'The Master Verse - features consecutive Tashdeed, Laam-Alif contractions [1,2,3,6], Dagger Alifs, Waqf indicators, and 3-digit Ayah punctuation.',
        tags: ['Ayat al-Kursi', 'Laam-Alif Contraction', 'Shaddah', 'Dagger Alif', 'Waqf Indicators', 'Ayah #255']
      },
      {
        id: 'surah_ikhlas',
        surahUrdu: 'سورۃ الإخلاص (آیات ۱ تا ۴)',
        surahEn: 'Surah Al-Ikhlas (Verses 1 to 4)',
        textArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ ١ اللَّهُ الصَّمَدُ ۝ ٢ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ ٣ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ۝ ٤',
        descUrdu: 'توحیدِ خالص - مکمل سکون، تنوین، تشدید، واؤ مع ہمزہ (ؤ)، اور ہر آیت کے اختتام پر نمبر سائن کے ساتھ ہندسہ جات۔',
        descEn: 'Purity of Monotheism - Sukoon, Tanween, Tashdeed, Waw with Hamza (ؤ), and sequential Ayah end markers with numbers 1 to 4.',
        tags: ['Tawheed', 'Ayah Markers', 'Tanween', 'Sukoon']
      },
      {
        id: 'surah_fatihah',
        surahUrdu: 'سورۃ الفاتحۃ: ام الکتاب (آیات ۱ تا ۴)',
        surahEn: 'Surah Al-Fatihah: The Opening (Verses 1 to 4)',
        textArabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ ۝ ١ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ ٢ الرَّحْمٰنِ الرَّحِيمِ ۝ ٣ مَالِكِ يَوْمِ الدِّينِ ۝ ٤',
        descUrdu: 'فاتحۃ الکتاب - اسم جلالہ میں تشدید و کھڑا زبر، شمسی و قمری لام، اور مفرد حرکات (زبر، زیر، پیش) کا مکمل امتزاج۔',
        descEn: 'The Opening - comprehensive blend of Allah ligature, prepended Shaddah, Dagger Alifs, and sequential Ayah numbers.',
        tags: ['Al-Fatihah', 'Lafz Allah', 'Shaddah', 'Ayah Markers']
      },
      {
        id: 'surah_kawthar',
        surahUrdu: 'سورۃ الکوثر (آیات ۱ تا ۳)',
        surahEn: 'Surah Al-Kawthar (Verses 1 to 3)',
        textArabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ ١ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ ٢ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ ۝ ٣',
        descUrdu: 'کامل اعراب - یاء مع ہمزہ [1,3,4,5,6] (شَانِئَكَ)، زیر مع تشدید (فَصَلِّ)، اور سکون کا تفصیلی قرآنی نمونہ۔',
        descEn: 'Dense vocalization - includes Yaa with Hamza [1,3,4,5,6] in (شَانِئَكَ), Kasrah with Tashdeed (فَصَلِّ), and Sukoon punctuation.',
        tags: ['Al-Kawthar', 'Yaa with Hamza', 'Tashdeed with Kasrah']
      }
    ];

    // ==========================================
    // AYAT-UL-KURSI DATA UPDATE IN ARABIC BRAILLE STUDIO
    // ==========================================

    // 1. Updated Preset Text for Ayat-ul-Kursi with Explicit Ayah Sign & Number
    const AYAT_UL_KURSI_TEXT = 'اَللّٰهُ لَاۤ اِلٰهَ اِلَّا هُوَ الۡحَـىُّ الۡقَيُّوۡمُ ۚ لَا تَاۡخُذُهٗ سِنَةٌ وَّلَا نَوۡمٌؕ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الۡاَرۡضِؕ مَنۡ ذَا الَّذِىۡ يَشۡفَعُ عِنۡدَهٗۤ اِلَّا بِاِذۡنِهٖؕ يَعۡلَمُ مَا بَيۡنَ اَيۡدِيۡهِمۡ وَمَا خَلۡفَهُمۡۚ وَلَا يُحِيۡطُوۡنَ بِشَىۡءٍ مِّنۡ عِلۡمِهٖۤ اِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرۡسِيُّهُ السَّمٰوٰتِ وَالۡاَرۡضَۚ وَلَا يَـــُٔوۡدُهٗ حِفۡظُهُمَا ۚ وَ هُوَ الۡعَلِىُّ الۡعَظِيۡمُ ٢٥٥';

    const QURANIC_PRESETS = [
      {
        id: 'ayat_ul_kursi',
        titleUrdu: 'آیت الكرسی (سورۃ البقرہ: 255)',
        arabicText: AYAT_UL_KURSI_TEXT
      }
    ];

    function convertDigitToBraille(digit) {
      const norm = (digit >= '0' && digit <= '9') ? String.fromCharCode(digit.charCodeAt(0) - 48 + 0x0660) : digit;
      const digits = {
        '٠': '\u281A',
        '١': '\u2801',
        '٢': '\u2803',
        '٣': '\u2809',
        '٤': '\u2819',
        '٥': '\u2811',
        '٦': '\u280B',
        '٧': '\u281B',
        '٨': '\u2813',
        '٩': '\u280A'
      };
      return digits[norm] || '';
    }

    // 2. Strict Translation Engine Rule for Ayah End Formatting
    function formatAyahEndBraille(text) {
      if (!text) return '';
      // Matches the verse ending with an Ayah sign (۝) and digits (e.g., ٢٥٥)
      return text.replace(/([^\s]+)\s*۝?\s*([٠-٩\d]+)/g, (match, lastWord, ayahNum) => {
        const brailleAyahMarker = '\u282F'; // Dots [2, 3, 5, 6] (⠯)
        const brailleNumberSign = '\u283C'; // Dots [3, 4, 5, 6] (⠼)
        const brailleFullStop = '\u2832';   // Dots [2, 5, 6] or standard punctuation dot if applicable
        
        const convertedDigits = ayahNum.split('').map(d => convertDigitToBraille(d)).join('');
        
        // Exact Rule Structure:
        // [Last Word / Character] + [Ayah Sign: 2,3,5,6] + [Space] + [Number Sign: 3,4,5,6] + [Ayah Number Digits] + [Full Stop Dots]
        return `${lastWord}${brailleAyahMarker} ${brailleNumberSign}${convertedDigits}${brailleFullStop}`;
      });
    }

    const processAyahAndCharacterRules = formatAyahEndBraille;

    // 3. Character-level mapper for Yaa (یا) vs. Alif Maqsoorah (الف مقصورہ)
    function mapArabicCharToBrailleEnhanced(char, nextChar, isWordEnd) {
      // Alif Maqsoorah (terminal dotless yaa / dagger alif context at the exact end of a word)
      if ((char === 'ى' || char === 'ٰ') && isWordEnd) {
        return '\u2815'; // Dots [1, 3, 5] (⠕)
      }
      
      // Standard Yaa (can appear anywhere: initial, medial, or final)
      if (char === 'ي' || char === 'ی' || char === 'ى') {
        return '\u2810'; // Dots [2, 4] (⠤)
      }

      return null; // Fallback to standard translation dictionary
    }

    /**
     * Direct character mapping helper for Yaa vs. Alif Maqsoorah and Arabic characters.
     */
    function mapArabicCharToBraille(char, nextChar, isWordEnd) {
      const enhanced = mapArabicCharToBrailleEnhanced(char, nextChar, isWordEnd);
      if (enhanced) return enhanced;

      // Alif Maqsoorah: terminal 'ى' or when followed by dagger alif at word end
      if ((char === 'ى' || char === 'ٰ' || (char === 'ي' && nextChar === 'ٰ')) && isWordEnd) {
        return '\u2815'; // Dots [1, 3, 5] - Alif Maqsoorah (⠕)
      }
      
      // Standard Yaa
      if (char === 'ي' || char === 'ی' || char === 'ى') {
        return '\u2810'; // Dots [2, 4] - Yaa (⠤)
      }

      // Guaranteed direct mapping for critical letters & Maddah
      if (char === 'ق') return '\u281F'; // Dots [1, 2, 3, 4, 5] (⠟)
      if (char === 'ۤ' || char === 'ٓ' || char === 'آ') return '\u281C'; // Dots [3, 4, 5] (⠜)
      if (char === 'لا') return '\u2827'; // Dots [1, 2, 3, 6] (⠧)

      const entry = CHAR_MAP.get(char);
      if (entry) {
        return dotsToUnicode(entry.dots);
      }
      return '\u2800';
    }

    /**
     * Resolves whether a Yaa / Alef Maksura glyph represents
     * standard Yaa [2, 4] or Alif Maqsoorah [1, 3, 5].
     *
     * 1. Standard Yaa (ي / ی): Dots [2, 4] (⠤) - can appear at beginning, middle, or end of a word (e.g., فِي, قِيلَ, الَّذِي).
     * 2. Alif Maqsoorah (ى / ىٰ): Dots [1, 3, 5] (⠕) - appears exclusively at the very end of a word,
     *    typically carrying a dagger alif or representing a terminal dotless yaa preceded by a Fathah (e.g., عَلَىٰ, مَوْلَىٰ, هُدًى).
     *
     * @param {string} char - Current character ('ي', 'ی', or 'ى')
     * @param {string|null} prevVowel - The immediate preceding vowel/harakah (if any)
     * @param {boolean} hasDaggerAlif - True if dagger alif (U+0670 / ـٰ) is on or preceding this letter
     * @param {boolean} isWordEnd - True if this letter is at the end of a word
     */
    function resolveYaaOrAlifMaqsoorah(char, prevVowel, hasDaggerAlif, isWordEnd = true) {
      const KASRAH = '\u0650';         // ـِ
      const FATHAH = '\u064E';         // ـَ
      const DAGGER_ALIF = '\u0670';    // ـٰ

      // Medial or initial position: ALWAYS Standard Yaa [2, 4]
      if (!isWordEnd) {
        return [2, 4];
      }

      // RULE 1: If preceded by Kasrah (ـِ), it is GUARANTEED to be Standard Yaa / Yaa Maddah [2, 4].
      // (e.g., فِي, قِيلَ, الَّذِي, يَرْمِي)
      if (prevVowel === KASRAH) {
        return [2, 4];
      }

      // RULE 2: Terminal Alif Maqsoorah [1, 3, 5] at word end:
      // - Explicitly carries or follows Dagger Alif (ـٰ) (e.g., عَلَىٰ, مَوْلَىٰ, هُدَىٰ), OR
      // - Is terminal dotless yaa 'ى' (e.g., مَوْلَى, رَمَى, هُدًى, ضُحَى)
      if (hasDaggerAlif || char === 'ى') {
        return [1, 3, 5];
      }

      // RULE 3: Default fallback for standard two-dot Yaa ('ي' or 'ی') at word end (e.g., رَبِّي, الذِي)
      return [2, 4];
    }

    /**
     * Fisher-Yates Shuffling Algorithm for unbiased array randomization.
     * @param {Array} array
     * @returns {Array} Shuffled copy of the input array
     */
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    function transcribeArabicToBraille(text, grade = 1) {
      if (!text) return [];

      text = formatAyahEndBraille(text);

      const cells = [];
      let i = 0;
      let lastVowel = null;

      const isDigit = ch => (ch >= '٠' && ch <= '٩') || (ch >= '0' && ch <= '9');

      const WAQF_MAP = {
        'ۚ': { letterDots: [2, 4, 5], display: 'ج', nameUrdu: 'وقف جائز (ج)', nameEn: 'Waqf Jaaiz (Jeem)' },
        'ؕ': { letterDots: [1, 4, 5], display: 'ط', nameUrdu: 'وقف مطلق (ط)', nameEn: 'Waqf Mutlaq (Tah)' },
        'ۘ': { letterDots: [1, 3, 4], display: 'م', nameUrdu: 'وقف لازم (م)', nameEn: 'Waqf Laazim (Meem)' },
        'ۖ': { letterDots: [1, 3, 5, 6], display: 'ز', nameUrdu: 'علامتِ وقفِ مجوز (ز)', nameEn: 'Waqf Mujawwaz (Zay)' },
        'ۗ': { letterDots: [1, 2, 3, 4, 5], display: 'قف', nameUrdu: 'وقف قلی (قف)', nameEn: 'Waqf Qila (Qaf-Fe)' },
        'ۛ': { letterDots: [1, 4, 6], display: '∴', nameUrdu: 'معانقہ (∴)', nameEn: 'Muanaqah' },
        '∴': { letterDots: [1, 4, 6], display: '∴', nameUrdu: 'معانقہ (∴)', nameEn: 'Muanaqah' },
        'ۜ': { letterDots: [2, 3, 4], display: 'س', nameUrdu: 'سکتہ (س)', nameEn: 'Saktah (Seen)' },
        '\u06D6': { letterDots: [1, 2, 3, 4, 5], display: 'صل', nameUrdu: 'الوصل اولى (صل)', nameEn: 'Al-Wasl Awla' },
        '\u06D7': { letterDots: [1, 2, 3, 4, 5], display: 'قف', nameUrdu: 'وقف قلی (قف)', nameEn: 'Waqf Qila' },
        '\u06D8': { letterDots: [1, 3, 4], display: 'م', nameUrdu: 'وقف لازم (م)', nameEn: 'Waqf Laazim' },
        '\u06D9': { letterDots: [1, 2, 3], display: 'لا', nameUrdu: 'لا (ممنوع وقف)', nameEn: 'La (Mamnoo Waqf)' },
        '\u06DA': { letterDots: [2, 4, 5], display: 'ج', nameUrdu: 'وقف جائز (ج)', nameEn: 'Waqf Jaaiz' },
        '\u06DB': { letterDots: [1, 4, 6], display: '∴', nameUrdu: 'معانقہ', nameEn: 'Muanaqah' },
        '\u06DC': { letterDots: [2, 3, 4], display: 'س', nameUrdu: 'سکتہ (س)', nameEn: 'Saktah' }
      };

      const isWaqfChar = (ch, pos = 0, src = '') => {
        if (WAQF_MAP[ch]) return true;
        if (['ط', 'ج', 'ز', 'ص', 'م', 'س', 'ق'].includes(ch)) {
          const prev = pos > 0 ? src[pos - 1] : ' ';
          const next = pos + 1 < src.length ? src[pos + 1] : ' ';
          return (prev !== ' ' && (next === ' ' || next === '\t' || pos + 1 >= src.length));
        }
        return false;
      };

      const PUNCT_MAP = {
        '،': { dots: [2], display: '،', nameUrdu: 'سکتہ / کوما', nameEn: 'Comma [2]' },
        ',': { dots: [2], display: '،', nameUrdu: 'سکتہ / کوما', nameEn: 'Comma [2]' },
        '؛': { dots: [2, 3], display: '؛', nameUrdu: 'وقفہ / سیمی کولن', nameEn: 'Semicolon [2,3]' },
        ';': { dots: [2, 3], display: '؛', nameUrdu: 'وقفہ / سیمی کولن', nameEn: 'Semicolon [2,3]' },
        '؟': { dots: [2, 3, 6], display: '؟', nameUrdu: 'سوالیہ نشان', nameEn: 'Question Mark [2,3,6]' },
        '?': { dots: [2, 3, 6], display: '؟', nameUrdu: 'سوالیہ نشان', nameEn: 'Question Mark [2,3,6]' },
        '.': { dots: [2, 5, 6], display: '.', nameUrdu: 'ختمہ / فل اسٹاپ', nameEn: 'Full Stop [2,5,6]' },
        '۔': { dots: [2, 5, 6], display: '۔', nameUrdu: 'ختمہ', nameEn: 'Full Stop [2,5,6]' },
        ':': { dots: [2, 5], display: ':', nameUrdu: 'رابطہ / کولن', nameEn: 'Colon [2,5]' },
        '!': { dots: [2, 3, 5], display: '!', nameUrdu: 'فجائیہ / ندائیہ', nameEn: 'Exclamation [2,3,5]' },
        '-': { dots: [3, 6], display: '-', nameUrdu: 'خطِ فاصل / ہائفن', nameEn: 'Hyphen [3,6]' }
      };

      const isPunctuationChar = ch => Boolean(PUNCT_MAP[ch]);

      // Core Huroof-e-Muqatta'\''at patterns across the Holy Quran
      const MUQATTAAT_LIST = [
        'الم', 'المص', 'الر', 'المر', 'كهيعص', 'طه', 'طسم', 'طس', 'يس', 'ص', 'حم', 'عسق', 'ق', 'ن'
      ];
      const cleanToBare = s => s.replace(/[\u064B-\u065F\u0670\u0653\u0654\u0655\u0656\u0657\u06DF\u06E1]/g, '').trim();

      const words = text.trim().split(/\s+/);
      const isAllMuqattaat = words.length > 0 && words.every(w => MUQATTAAT_LIST.includes(cleanToBare(w)));

      if (isAllMuqattaat) {
        words.forEach((word, wIdx) => {
          if (wIdx > 0) {
            cells.push({ dots: [], unicode: ' ', display: ' ', nameUrdu: 'فاصلہ', nameEn: 'Space' });
          }
          const bare = cleanToBare(word);
          const isTsm = (bare === 'طسم');
          let wPos = 0;

          while (wPos < word.length) {
            const ch = word[wPos];
            if (ch === ' ' || ch === '\t') {
              wPos++;
              continue;
            }

            const letter = ch;
            wPos++;
            let hasShaddah = false;
            let hasDagger = false;

            while (wPos < word.length && /[\u0651\u0670\u0653\u0656\u0657\u06DF\u06E1]/.test(word[wPos])) {
              if (word[wPos] === '\u0651') {
                hasShaddah = true;
              } else if (word[wPos] === '\u0670') {
                hasDagger = true;
              }
              wPos++;
            }

            // Tashdeed precedes the consonant
            if ((letter === 'م' && (isTsm || hasShaddah)) || hasShaddah) {
              cells.push({
                dots: [6],
                unicode: dotsToUnicode([6]),
                display: 'ـّ',
                nameUrdu: 'شدّ (قبل از حرف)',
                nameEn: 'Shaddah [6]',
                rule: 'Muqattaat Tashdeed'
              });
            }

            const letterEntry = CHAR_MAP.get(letter);
            if (letterEntry) {
              cells.push({
                dots: letterEntry.dots,
                unicode: dotsToUnicode(letterEntry.dots),
                display: letter,
                nameUrdu: letterEntry.nameUrdu,
                nameEn: letterEntry.nameEn,
                rule: 'Muqattaat Letter'
              });
            }

            if (hasDagger) {
              cells.push({
                dots: [4],
                unicode: dotsToUnicode([4]),
                display: 'ـٰ',
                nameUrdu: 'کھڑا زبر',
                nameEn: 'Dagger Alif [4]',
                rule: 'Muqattaat Aerab'
              });
            }

            // Each recited letter followed immediately by separator dots [3, 6]
            cells.push({
              dots: [3, 6],
              unicode: dotsToUnicode([3, 6]),
              display: 'ۤ',
              nameUrdu: 'حروفِ مقطعات فاصلہ',
              nameEn: 'Muqattaat Separator [3,6]',
              rule: 'Muqattaat Rule'
            });
          }
        });

        return cells;
      }

      while (i < text.length) {
        const ch = text[i];

        // Tatweel / Kashida skip
        if (ch === '\u0640') {
          i++;
          continue;
        }

        // Newline handling
        if (ch === '\n') {
          cells.push({ dots: [], unicode: '\n', display: '\n', nameUrdu: 'نئی سطر', nameEn: 'Newline' });
          lastVowel = null;
          i++;
          continue;
        }

        // Whitespace handling with Punctuation & Waqf lookahead
        // Spacing Rule: NO space before Waqf or Punctuation sign; attach directly to word.
        if (ch === ' ' || ch === '\t') {
          let peek = i + 1;
          while (peek < text.length && (text[peek] === ' ' || text[peek] === '\t')) peek++;
          if (peek < text.length && (isWaqfChar(text[peek], peek, text) || isPunctuationChar(text[peek]) || text[peek] === '۝' || text[peek] === '\u282F')) {
            // Skip space before sign so sign attaches directly
            i = peek;
            continue;
          }
          cells.push({ dots: [], unicode: ' ', display: ' ', nameUrdu: 'فاصلہ', nameEn: 'Space' });
          lastVowel = null;
          i++;
          continue;
        }

        // Direct Braille Number Sign
        if (ch === '\u283C') {
          cells.push({
            dots: [3, 4, 5, 6],
            unicode: '\u283C',
            display: '#',
            nameUrdu: 'علامتِ عدد',
            nameEn: 'Number Sign',
            rule: 'Ayah'
          });
          i++;
          continue;
        }

        // Direct Braille Full Stop
        if (ch === '\u2832') {
          cells.push({
            dots: [2, 5, 6],
            unicode: '\u2832',
            display: '⠲',
            nameUrdu: 'ختمہ / فل اسٹاپ (نقاط 2، 5، 6)',
            nameEn: 'Full Stop [2,5,6]',
            rule: 'Ayah Punctuation'
          });
          i++;
          continue;
        }

        // Direct Braille Digits (e.g. from formatAyahEndBraille)
        const brailleDigits = {
          '\u281A': { norm: '٠', dots: [2, 4, 5], urdu: 'صفر', en: '0' },
          '\u2801': { norm: '١', dots: [1], urdu: 'ایک', en: '1' },
          '\u2803': { norm: '٢', dots: [1, 2], urdu: 'دو', en: '2' },
          '\u2809': { norm: '٣', dots: [1, 4], urdu: 'تین', en: '3' },
          '\u2819': { norm: '٤', dots: [1, 4, 5], urdu: 'چار', en: '4' },
          '\u2811': { norm: '٥', dots: [1, 5], urdu: 'پانچ', en: '5' },
          '\u280B': { norm: '٦', dots: [1, 2, 4], urdu: 'چھ', en: '6' },
          '\u281B': { norm: '٧', dots: [1, 2, 4, 5], urdu: 'سات', en: '7' },
          '\u2813': { norm: '٨', dots: [1, 2, 5], urdu: 'آٹھ', en: '8' },
          '\u280A': { norm: '٩', dots: [2, 4], urdu: 'نو', en: '9' }
        };
        if (brailleDigits[ch]) {
          const bDig = brailleDigits[ch];
          cells.push({
            dots: bDig.dots,
            unicode: ch,
            display: bDig.norm,
            nameUrdu: bDig.urdu,
            nameEn: bDig.en,
            rule: 'Ayah Digit'
          });
          i++;
          continue;
        }

        // Rule 6: Ayah End Marker & Numbering
        if (ch === '۝' || ch === '\u282F' || ch === '\u2836' || ch === '﴿' || ch === '﴾') {
          cells.push({
            dots: [2, 3, 5, 6],
            unicode: dotsToUnicode([2, 3, 5, 6]),
            display: '۝',
            nameUrdu: 'نشانِ آیت',
            nameEn: 'Ayah Marker',
            rule: 'Ayah'
          });
          i++;

          if (i < text.length && isWaqfChar(text[i], i, text)) {
            const waqfEntry = CHAR_MAP.get(text[i]);
            if (waqfEntry) {
              cells.push({
                dots: waqfEntry.dots,
                unicode: dotsToUnicode(waqfEntry.dots),
                display: text[i],
                nameUrdu: waqfEntry.nameUrdu,
                nameEn: waqfEntry.nameEn,
                rule: 'Ayah Waqf'
              });
            }
            i++;
          }

          // If next char is whitespace or direct Braille number sign, ensure space cell is preserved
          if (i < text.length && (text[i] === ' ' || text[i] === '\t')) {
            cells.push({ dots: [], unicode: ' ', display: ' ', nameUrdu: 'فاصلہ', nameEn: 'Space' });
            while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i++;
          } else if (i < text.length && (isDigit(text[i]) || text[i] === '\u283C')) {
            cells.push({ dots: [], unicode: ' ', display: ' ', nameUrdu: 'فاصلہ', nameEn: 'Space' });
          }

          if (i < text.length && isDigit(text[i])) {
            cells.push({
              dots: [3, 4, 5, 6],
              unicode: dotsToUnicode([3, 4, 5, 6]),
              display: '#',
              nameUrdu: 'علامتِ عدد',
              nameEn: 'Number Sign',
              rule: 'Number Sign'
            });
            while (i < text.length && isDigit(text[i])) {
              const digit = text[i];
              const norm = (digit >= '0' && digit <= '9') ? String.fromCharCode(digit.charCodeAt(0) - 48 + 0x0660) : digit;
              const digEntry = CHAR_MAP.get(norm);
              if (digEntry) {
                cells.push({
                  dots: digEntry.dots,
                  unicode: dotsToUnicode(digEntry.dots),
                  display: norm,
                  nameUrdu: digEntry.nameUrdu,
                  nameEn: digEntry.nameEn,
                  rule: 'Digit'
                });
              }
              i++;
            }
          }
          continue;
        }

        // Rule 5: Quranic Pause Markers (رموزِ اوقاف)
        // Structure: [Preceding letter cell] + [Indicator [3,6]] + [Waqf Sign Cell] + [1 Space Cell] + [Next Word]
        if (isWaqfChar(ch, i, text)) {
          // 1. NO space before sign - strip any trailing space cell
          while (cells.length > 0 && cells[cells.length - 1].unicode === ' ') {
            cells.pop();
          }

          // 2. Left Cell: [3, 6] indicator
          cells.push({
            dots: [3, 6],
            unicode: dotsToUnicode([3, 6]),
            display: 'ۚ',
            nameUrdu: 'رموزِ اوقاف اشاریہ',
            nameEn: 'Waqf Indicator [3,6]',
            rule: 'Waqf Indicator'
          });

          // 3. Right Cell: Specific Waqf sign
          let wInfo = WAQF_MAP[ch];
          if (!wInfo) {
            const waqfLetterMap = {
              'م': { letterDots: [1, 3, 4], display: 'م', nameUrdu: 'وقف لازم (م)', nameEn: 'Waqf Laazim (Meem)' },
              'ط': { letterDots: [1, 4, 5], display: 'ط', nameUrdu: 'وقف مطلق (ط)', nameEn: 'Waqf Mutlaq (Tah)' },
              'ج': { letterDots: [2, 4, 5], display: 'ج', nameUrdu: 'وقف جائز (ج)', nameEn: 'Waqf Jaaiz (Jeem)' },
              'ز': { letterDots: [1, 3, 5, 6], display: 'ز', nameUrdu: 'علامتِ وقفِ مجوز (ز)', nameEn: 'Waqf Mujawwaz (Zay)' },
              'ص': { letterDots: [1, 2, 3, 4, 6], display: 'ص', nameUrdu: 'علامتِ وقفِ مرخص (ص)', nameEn: 'Waqf Murakh-khas (Saad)' },
              'س': { letterDots: [2, 3, 4], display: 'س', nameUrdu: 'سکتہ (س)', nameEn: 'Saktah (Seen)' },
              'ق': { letterDots: [1, 2, 3, 4, 5], display: 'ق', nameUrdu: 'قِف / قلی (ق)', nameEn: 'Qif (Qaf)' },
              'ک': { letterDots: [1, 3], display: 'ک', nameUrdu: 'کف (ک)', nameEn: 'Kaf (Kazalik)' }
            };
            wInfo = waqfLetterMap[ch] || { letterDots: [2, 4, 5], display: ch, nameUrdu: 'علامتِ وقف', nameEn: 'Waqf Sign' };
          }

          cells.push({
            dots: wInfo.letterDots,
            unicode: dotsToUnicode(wInfo.letterDots),
            display: wInfo.display,
            nameUrdu: wInfo.nameUrdu,
            nameEn: wInfo.nameEn,
            rule: 'Waqf Sign'
          });

          i++;
          // Consume all trailing whitespace in input text
          while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i++;

          // Exactly ONE space cell after sign before next word begins
          if (i < text.length && text[i] !== '\n' && text[i] !== '۝' && text[i] !== '\u282F') {
            cells.push({ dots: [], unicode: ' ', display: ' ', nameUrdu: 'فاصلہ', nameEn: 'Space' });
          }
          continue;
        }

        // General Punctuation (، ؛ ؟ . : ! -)
        // Structure: [Letter] + [Punctuation Cell] + [1 Space Cell] + [Next Word]
        if (isPunctuationChar(ch)) {
          while (cells.length > 0 && cells[cells.length - 1].unicode === ' ') {
            cells.pop();
          }
          const pInfo = PUNCT_MAP[ch];
          cells.push({
            dots: pInfo.dots,
            unicode: dotsToUnicode(pInfo.dots),
            display: pInfo.display,
            nameUrdu: pInfo.nameUrdu,
            nameEn: pInfo.nameEn,
            rule: 'Punctuation'
          });
          i++;
          while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i++;
          if (i < text.length && text[i] !== '\n' && text[i] !== '۝' && text[i] !== '\u282F') {
            cells.push({ dots: [], unicode: ' ', display: ' ', nameUrdu: 'فاصلہ', nameEn: 'Space' });
          }
          continue;
        }

        // Numbers
        if (isDigit(ch)) {
          cells.push({
            dots: [3, 4, 5, 6],
            unicode: dotsToUnicode([3, 4, 5, 6]),
            display: '#',
            nameUrdu: 'علامتِ عدد',
            nameEn: 'Number Sign',
            rule: 'Number Sign'
          });
          while (i < text.length && isDigit(text[i])) {
            const digit = text[i];
            const norm = (digit >= '0' && digit <= '9') ? String.fromCharCode(digit.charCodeAt(0) - 48 + 0x0660) : digit;
            const digEntry = CHAR_MAP.get(norm);
            if (digEntry) {
              cells.push({
                dots: digEntry.dots,
                unicode: dotsToUnicode(digEntry.dots),
                display: norm,
                nameUrdu: digEntry.nameUrdu,
                nameEn: digEntry.nameEn,
                rule: 'Digit'
              });
            }
            i++;
          }
          continue;
        }

        // Ligature: Laam-Alif & Maddah (handles unvocalized 'لا', vocalized 'لَا', and Maddah-carrying 'لَاۤ' / 'لَآ')
        if (ch === 'ل' && i + 1 < text.length) {
          let nextIdx = i + 1;
          let hasFathah = false;
          if (text[nextIdx] === '\u064E') {
            hasFathah = true;
            nextIdx++;
          }
          if (nextIdx < text.length && (text[nextIdx] === 'ا' || text[nextIdx] === 'أ' || text[nextIdx] === 'إ' || text[nextIdx] === 'آ')) {
            let afterAlif = nextIdx + 1;
            let hasMaddah = false;
            let maddahChar = null;
            if (text[nextIdx] === 'آ') {
              hasMaddah = true;
              maddahChar = 'ٓ';
            } else if (afterAlif < text.length && (text[afterAlif] === 'ۤ' || text[afterAlif] === 'ٓ' || text[afterAlif] === '\u06E4' || text[afterAlif] === '\u0653')) {
              hasMaddah = true;
              maddahChar = text[afterAlif];
              afterAlif++;
            }

            if (grade === 2) {
              // Grade 2: Contracted Laam-Alif ligature [1, 2, 3, 6] (⠧)
              cells.push({
                dots: [1, 2, 3, 6],
                unicode: dotsToUnicode([1, 2, 3, 6]),
                display: 'لا',
                nameUrdu: 'لام الف مرکب',
                nameEn: 'Laam-Alif Ligature [1,2,3,6]',
                rule: 'Grade 2 Laam-Alif'
              });
              // If Maddah is present, append proper Maddah dots [3, 4, 5] (⠜)
              if (hasMaddah) {
                cells.push({
                  dots: [3, 4, 5],
                  unicode: dotsToUnicode([3, 4, 5]),
                  display: maddahChar || 'ۤ',
                  nameUrdu: 'مدّ قرآنی',
                  nameEn: 'Maddah [3,4,5]',
                  rule: 'Maddah'
                });
              }
              i = afterAlif;
              continue;
            } else {
              // Grade 1: Uncontracted
              cells.push({
                dots: [1, 2, 3],
                unicode: dotsToUnicode([1, 2, 3]),
                display: 'ل',
                nameUrdu: 'لام',
                nameEn: 'Laam',
                rule: 'Grade 1 Letter'
              });
              if (hasFathah) {
                cells.push({
                  dots: [2],
                  unicode: dotsToUnicode([2]),
                  display: 'َ',
                  nameUrdu: 'زبر',
                  nameEn: 'Fathah',
                  rule: 'Grade 1 Harakah'
                });
              }
              cells.push({
                dots: [1],
                unicode: dotsToUnicode([1]),
                display: 'ا',
                nameUrdu: 'الف',
                nameEn: 'Alif',
                rule: 'Grade 1 Letter'
              });
              if (hasMaddah) {
                cells.push({
                  dots: [3, 4, 5],
                  unicode: dotsToUnicode([3, 4, 5]),
                  display: maddahChar || 'ۤ',
                  nameUrdu: 'مدّ قرآنی',
                  nameEn: 'Maddah [3,4,5]',
                  rule: 'Maddah'
                });
              }
              i = afterAlif;
              continue;
            }
          }
        }

        let letterChar = ch;
        i++;
        let hasShaddah = false;
        let attachedHarakat = [];

        while (i < text.length) {
          const nextChar = text[i];
          if (nextChar === '\u0651') {
            hasShaddah = true;
            i++;
          } else if (/[\u064B-\u065F\u0670\u0653\u0654\u0656\u0657\u06DF\u06E1\u06E4]/.test(nextChar)) {
            attachedHarakat.push(nextChar);
            i++;
          } else {
            break;
          }
        }

        // Orthographic Rule: "Alif Never Takes a Harakah"
        // Plain Alif ('ا' / [1]) is strictly silent/bare (ساکن).
        // If an Alif-shaped letter bears ANY diacritic or Shaddah, it is orthographically Hamza [3, 4].
        if (letterChar === 'ا' && (attachedHarakat.length > 0 || hasShaddah)) {
          letterChar = 'أ';
        }

        // Universal Hamza Base Rule: Alif with Hamza Below ('إ' / \u0625)
        // Must universally resolve to the two-cell compound sequence: [3, 4] (Alif Hamza) + [1, 5] (Kasrah/Zeer)
        if (letterChar === 'إ' || letterChar === '\u0625') {
          letterChar = 'أ';
          // Consume any redundant explicit Kasrah diacritic (\u0650) and guarantee Kasrah [1, 5] is immediately attached
          attachedHarakat = attachedHarakat.filter(h => h !== '\u0650');
          attachedHarakat.unshift('\u0650');
        }

        // Lafz-e-Jalalah (الله / لله) orthography: second Laam with Shaddah carries Khara Zabar (Dot [4])
        if (letterChar === 'ل' && hasShaddah) {
          const isFathahPresent = attachedHarakat.includes('\u064E');
          const isDaggerPresent = attachedHarakat.includes('\u0670');
          if (isFathahPresent && !isDaggerPresent) {
            const nextL = text.slice(i).match(/^[\u064B-\u0652\u0670\u0656\u0657\u0651\s]*([\u0621-\u064A\u0671-\u06D3])/);
            const nextLetter = nextL ? nextL[1] : '';
            if (nextLetter === 'ه' || nextLetter === 'ہ') {
              attachedHarakat = attachedHarakat.map(h => h === '\u064E' ? '\u0670' : h);
            }
          }
        }

        // Rule 3: Grade 2 Maddah Contraction
        if (grade === 2 && i < text.length) {
          const peekLetter = text[i];
          if (peekLetter === 'ا' && attachedHarakat.includes('\u064E')) {
            attachedHarakat = attachedHarakat.filter(h => h !== '\u064E');
          } else if ((peekLetter === 'ي' || peekLetter === 'ی') && attachedHarakat.includes('\u0650')) {
            attachedHarakat = attachedHarakat.filter(h => h !== '\u0650');
          } else if (peekLetter === 'و' && attachedHarakat.includes('\u064F')) {
            attachedHarakat = attachedHarakat.filter(h => h !== '\u064F');
          }
        }

        // Rule 4: Alif Maqsoorah detection using resolveYaaOrAlifMaqsoorah
        let isAlifMaqsoorah = false;
        if (letterChar === 'ى' || letterChar === 'ي' || letterChar === 'ی') {
          const hasDaggerAlif = attachedHarakat.includes('\u0670');
          let isWordEnd = true;
          let p = i;
          while (p < text.length && /[\u064B-\u065F\u0670\u0653\u0654\u0655\u0656\u0657\u06DF\u06E1]/.test(text[p])) {
            p++;
          }
          if (p < text.length && !/\s|[،؛؟!"'\(\)\[\]\.\-۝﴿﴾]/.test(text[p]) && !isWaqfChar(text[p], p, text)) {
            isWordEnd = false;
          }
          const dots = resolveYaaOrAlifMaqsoorah(letterChar, lastVowel, hasDaggerAlif, isWordEnd);
          if (dots[0] === 1 && dots[1] === 3 && dots[2] === 5) {
            isAlifMaqsoorah = true;
            letterChar = 'ى';
            attachedHarakat = attachedHarakat.filter(h => h !== '\u0670');
          } else {
            letterChar = 'ي';
          }
        }

        // Rule 1: Shaddah Precedence Rule (Prepended before the base consonant)
        if (hasShaddah) {
          cells.push({
            dots: [6],
            unicode: dotsToUnicode([6]),
            display: 'ـّ',
            nameUrdu: 'شدّ (قبل از حرف)',
            nameEn: 'Shaddah [6]',
            rule: 'Shaddah Precedence'
          });
        }

        // Special canonical check for Qaaf [1, 2, 3, 4, 5]
        let entry;
        if (letterChar === 'ق') {
          entry = {
            char: 'ق',
            dots: [1, 2, 3, 4, 5],
            nameUrdu: 'قاف',
            nameEn: 'Qaaf'
          };
        } else if (letterChar === 'أ' || letterChar === '\u0623') {
          entry = { char: 'أ', dots: [3, 4], nameUrdu: 'الف مع ہمزہ', nameEn: 'Alif with Hamza' };
        } else {
          entry = CHAR_MAP.get(letterChar) || {
            char: letterChar,
            dots: [1, 2, 3, 4, 5, 6],
            nameUrdu: letterChar,
            nameEn: letterChar
          };
        }

        cells.push({
          dots: entry.dots,
          unicode: dotsToUnicode(entry.dots),
          display: letterChar,
          nameUrdu: entry.nameUrdu,
          nameEn: entry.nameEn,
          rule: isAlifMaqsoorah ? 'Alif Maqsoorah' : 'Letter'
        });

        // Update last vowel context for subsequent letters
        for (let hi = attachedHarakat.length - 1; hi >= 0; hi--) {
          const h = attachedHarakat[hi];
          if (h === '\u0650' || h === '\u064E' || h === '\u064F' || h === '\u0670') {
            lastVowel = h;
            break;
          }
        }

        // Rule 2: Harakat & Tanween Sequencing
        attachedHarakat.forEach(h => {
          // Maddah check: Always [3, 4, 5] (⠜), NEVER [3, 6]
          if (h === 'ۤ' || h === 'ٓ' || h === '\u06E4' || h === '\u0653') {
            cells.push({
              dots: [3, 4, 5],
              unicode: dotsToUnicode([3, 4, 5]),
              display: h,
              nameUrdu: 'مدّ',
              nameEn: 'Maddah [3,4,5]',
              rule: 'Maddah'
            });
            return;
          }
          const hEntry = CHAR_MAP.get(h);
          if (hEntry) {
            cells.push({
              dots: hEntry.dots,
              unicode: dotsToUnicode(hEntry.dots),
              display: h,
              nameUrdu: hEntry.nameUrdu,
              nameEn: hEntry.nameEn,
              rule: 'Harakah'
            });
          }
        });
      }

      return cells;
    }

    // Alias for compatibility with external calls or specification references
    const translateArabicToBraille = transcribeArabicToBraille;

    // Audio SFX & Voice Feedback
    function speakArabic(text, lang = 'ar-SA') {
      try {
        if (window.AndroidTTS && typeof window.AndroidTTS.speak === 'function') {
          window.AndroidTTS.speak(text, lang);
          return;
        }
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang;
          utterance.rate = 0.85;
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {
        console.warn('TTS not available:', e);
      }
    }

    // ==========================================
    // 2. BILINGUAL TRANSLATIONS
    // ==========================================
    const TRANSLATIONS = {
      ur: {
        appTitle: 'عربی بریل اسٹوڈیو',
        appSubtitle: 'تختۂ تحریر برائے عربی زبان و قرآن کریم',
        tabs: {
          perkins: 'تختۂ تحریر',
          translator: 'مترجم',
          rules: 'قواعدِ بریل',
          practice: 'مشق و سوالات',
          reference: 'دائرۃ المعارف'
        },
        actions: {
          punch: 'سیل درج کریں (Punch)',
          clear: 'صاف کریں',
          delete: 'حذف',
          copy: 'کاپی کریں',
          copied: 'کاپی ہو گیا!',
          exportBRF: 'ایکسپورٹ برف (.brf)',
          listen: 'سنیں',
          testInTranslator: 'مترجم میں جانچیں',
          exportEmbosser: 'ایمبوسر برآمد (Export)',
          close: 'بند کریں',
          save: 'محفوظ کریں'
        },
        settings: {
          title: 'سیٹنگز اور ترجیحات',
          language: 'زبان منتخب کریں (Language)',
          contractionLevel: 'بریل اختصار لیول (Contraction Level)',
          grade1: 'گریڈ 1 (مکمل اعراب و حرکات)',
          grade2: 'گریڈ 2 (مختصر / قرآنی مدہ و مقطعات قواعد)',
          keyboardGuide: 'پرکنز فزیکل کی بورڈ رہنمائی (Key Remapping)',
          keysLeft: 'بایاں ہاتھ: S = نقطہ 3 | D = نقطہ 2 | F = نقطہ 1',
          keysRight: 'دایاں ہاتھ: J = نقطہ 4 | K = نقطہ 5 | L = نقطہ 6',
          keysAction: 'اسپیس بار = نیا سیل درج کریں | بیک اسپیس = حذف'
        },
        studio: {
          activeCell: 'متحرک بریل سیل',
          dotsActive: 'منتخب نقاط',
          none: 'کوئی نہیں',
          chordSelected: 'نقطہ جات منتخب',
          unifiedRegistry: 'متحد عربی بریل نظام',
          tapeHistory: 'تحریر شدہ سیلز (Tape)',
          noPunchedCells: 'ابھی کوئی سیل درج نہیں کیا گیا۔ کی بورڈ یا بٹن دبائیں۔',
          exportTitle: 'بریل ایمبوسر ٹیکسٹ فائل ایکسپورٹ',
          exportDesc: 'تحریر شدہ ٹیپ کو معیاری فارمیٹ شدہ ٹیکسٹ یا .brf فائل کے طور پر تیار کریں تاکہ ایمباسنگ ڈیوائس پر بھیجا جا سکے۔',
          downloadFile: 'فائل ڈاؤن لوڈ کریں (.txt / .brf)',
          shareFile: 'ڈیوائس / پرنٹر پر شیئر کریں',
          formatRaw: 'صرف بریل یونی کوڈ (Raw Unicode)',
          formatBrf: 'معیاری ایمبوسر فارمیٹ مع ہیڈر (Formatted Header + BRF)',
          formatDetailed: 'سیل تفصیل مع نقاط (Detailed Cell Dot Notation)'
        },
        translator: {
          title: 'عربی ⇋ بریل براہِ راست مترجم',
          grade1Badge: 'گریڈ 1 (مکمل اعراب)',
          grade2Badge: 'گریڈ 2 (قرآنی اختصارات)',
          arabicInputLabel: 'عربی / قرآنی متن درج کریں:',
          brailleInputLabel: 'بریل یونی کوڈ متن درج کریں:',
          brailleOutputLabel: 'بریل یونی کوڈ آؤٹ پٹ:',
          arabicOutputLabel: 'حاصل شدہ عربی عبارت:',
          presetsLabel: 'قرآنی اور نحوی مثالیں:'
        },
        rules: {
          title: 'عربی اور قرآنی بریل قواعد گائیڈ',
          subtitle: 'مستند بین الاقوامی اور قرآنی بریل ضوابط کا عملی معائنہ',
          standardInput: 'معیاری متن',
          ruleInspection: 'سیل بمقابلہ سیل تفصیلی جائزہ:',
          quranicVersesTitle: 'قرآنی آیات اور جامع تحریری نمونے (Quranic Verses)',
          quranicVersesSubtitle: 'پیچیدہ اعراب، تشدیدات، کھڑے زبر اور اوقاف کے ساتھ مستند قرآنی بریل تحریر کا مکمل مطالعہ',
          viewBraille: 'بریل مشاہدہ کریں',
          hideBraille: 'بریل چھپائیں',
          brailleStreamTitle: 'پیشگی ٹرانسکرائب شدہ بریل یونی کوڈ:',
          cellsStreamTitle: 'سیل بمقابلہ سیل تجزیاتی اسٹریم:'
        },
        practice: {
          title: 'بریل مشق و تشخیصی کوئز',
          subtitle: 'نقاط اور حروف کی نشاندہی کر کے اپنی صلاحیت آزمائیں',
          score: 'اسکور',
          streak: 'تسلسل (Streak)',
          identifyChar: 'مندرجہ ذیل بریل سیل کس عربی حرف یا حرکت کا ہے؟'
        },
        reference: {
          title: 'عربی بریل دائرۃ المعارف',
          searchPlaceholder: 'حرف، نام یا نقاط تلاش کریں...',
          categories: {
            all: 'تمام',
            alphabet: 'حروفِ تہجی',
            harakat: 'حرکات و تنوین',
            markers: 'قرآنی علامات',
            numbers: 'اعداد'
          }
        }
      },
      en: {
        appTitle: 'Arabic Braille Studio',
        appSubtitle: 'Accessible Perkins Brailler & Quranic Orthography Engine',
        tabs: {
          perkins: 'Studio',
          translator: 'Translate',
          rules: 'Rules Guide',
          practice: 'Tutor',
          reference: 'Library'
        },
        actions: {
          punch: 'Punch Cell',
          clear: 'Clear',
          delete: 'Delete',
          copy: 'Copy',
          copied: 'Copied!',
          exportBRF: 'Export BRF (.brf)',
          listen: 'Listen',
          testInTranslator: 'Test in Translator',
          exportEmbosser: 'Export for Embosser',
          close: 'Close',
          save: 'Save'
        },
        settings: {
          title: 'Settings & Preferences',
          language: 'Select Language',
          contractionLevel: 'Braille Contraction Level',
          grade1: 'Grade 1 (Full Voweling & Harakat)',
          grade2: 'Grade 2 (Quranic Maddah & Muqatta\'at Contractions)',
          keyboardGuide: 'Perkins Physical Keyboard Mapping',
          keysLeft: 'Left Hand: S = Dot 3 | D = Dot 2 | F = Dot 1',
          keysRight: 'Right Hand: J = Dot 4 | K = Dot 5 | L = Dot 6',
          keysAction: 'Space = Punch / Next Cell | Backspace = Delete'
        },
        studio: {
          activeCell: 'Active Braille Cell',
          dotsActive: 'Active Dots',
          none: 'None',
          chordSelected: 'Chord Selected',
          unifiedRegistry: 'Unified Arabic Braille Registry',
          tapeHistory: 'Embossed Tape Stream',
          noPunchedCells: 'No cells embossed yet. Use Perkins keys or on-screen buttons.',
          exportTitle: 'Braille Embosser File Export',
          exportDesc: 'Generate a formatted text (.txt) or Braille (.brf) file ready for electronic embosser transmission.',
          downloadFile: 'Download File (.txt / .brf)',
          shareFile: 'Share to Embosser / Device',
          formatRaw: 'Raw Braille Unicode (Screen & Text Devices)',
          formatBrf: 'Standard Embosser Format (Header + UTF-8 Braille)',
          formatDetailed: 'Detailed Cell Breakdown (Dot Numbers & Labels)'
        },
        translator: {
          title: 'Arabic ⇋ Braille Bidirectional Engine',
          grade1Badge: 'Grade 1 (Full Vowels)',
          grade2Badge: 'Grade 2 (Quranic Rules)',
          arabicInputLabel: 'Enter Arabic / Quranic text:',
          brailleInputLabel: 'Enter Braille Unicode text:',
          brailleOutputLabel: 'Braille Unicode Output:',
          arabicOutputLabel: 'Transcribed Arabic Output:',
          presetsLabel: 'Quranic Orthography Presets:'
        },
        rules: {
          title: 'Arabic Braille Orthography Rules',
          subtitle: 'Programmatic inspector and interactive comparison of unified standards',
          standardInput: 'Standard Expression',
          ruleInspection: 'Tactile Cell Inspection & Breakdown:',
          quranicVersesTitle: 'Quranic Verses & Advanced Orthography',
          quranicVersesSubtitle: 'Pre-transcribed complex verses demonstrating advanced diacritics, shaddah sequencing, and Quranic markers in Braille',
          viewBraille: 'Inspect Braille',
          hideBraille: 'Hide Braille',
          brailleStreamTitle: 'Pre-transcribed Braille Unicode:',
          cellsStreamTitle: 'Tactile Cells Stream & Rule Attribution:'
        },
        practice: {
          title: 'Interactive Braille Tutor',
          subtitle: 'Test your recognition of unified Arabic Braille glyphs',
          score: 'Score',
          streak: 'Streak',
          identifyChar: 'Which character or diacritic corresponds to this Braille cell?'
        },
        reference: {
          title: 'Arabic Braille Encyclopedia',
          searchPlaceholder: 'Search character, Urdu name, or dots...',
          categories: {
            all: 'All',
            alphabet: 'Alphabet',
            harakat: 'Harakat & Tanween',
            markers: 'Quranic Markers',
            numbers: 'Numerals'
          }
        }
      }
    };

    // Braille SVG Cell Component
    function BrailleCell({ dots = [], size = "md", ariaLabel = null }) {
      const dotCoords = {
        1: { cx: 16, cy: 16 },
        2: { cx: 16, cy: 38 },
        3: { cx: 16, cy: 60 },
        4: { cx: 40, cy: 16 },
        5: { cx: 40, cy: 38 },
        6: { cx: 40, cy: 60 },
      };

      const dimensions = {
        sm: { w: 32, h: 48, r: 4.5, stroke: 1.5 },
        md: { w: 56, h: 76, r: 7, stroke: 2 },
        lg: { w: 84, h: 114, r: 10, stroke: 2.5 }
      }[size] || { w: 56, h: 76, r: 7, stroke: 2 };

      const activeDotsText = dots.length > 0 ? dots.join(', ') : 'None';
      const cellLabel = ariaLabel || `Braille Cell with active dots: ${activeDotsText}`;

      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 56 76"
          className="select-none flex-none"
          role="img"
          aria-label={cellLabel}
        >
          <rect
            x="2"
            y="2"
            width="52"
            height="72"
            rx="10"
            fill="#051C15"
            stroke="#D4AF37"
            strokeWidth={dimensions.stroke}
            strokeOpacity="0.25"
          />
          {[1, 2, 3, 4, 5, 6].map(num => {
            const isActive = dots.includes(num);
            const { cx, cy } = dotCoords[num];
            return (
              <g key={num}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={dimensions.r}
                  fill={isActive ? "#FFD700" : "#1A4D3E"}
                  stroke={isActive ? "#D4AF37" : "#0B3023"}
                  strokeWidth="1.5"
                  className={isActive ? "filter drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" : ""}
                />
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fontSize={size === 'sm' ? "6" : "9"}
                  fill={isActive ? "#051C15" : "#4ade80"}
                  fontWeight="bold"
                  className="pointer-events-none opacity-85 select-none"
                  aria-hidden="true"
                >
                  {num}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    // ==========================================
    // 3. STATIC NAVIGATION TABS
    // ==========================================
    const APP_TABS = [
      { id: 'perkins', labelEn: 'Perkins Studio', labelUr: 'تختۂ تحریر', icon: 'edit_square' },
      { id: 'translator', labelEn: 'Translator', labelUr: 'مترجم', icon: 'translate' },
      { id: 'rules', labelEn: 'Rules Guide', labelUr: 'قواعدِ بریل', icon: 'menu_book' },
      { id: 'practice', labelEn: 'Practice', labelUr: 'مشق و آزمائش', icon: 'school' },
      { id: 'reference', labelEn: 'Reference', labelUr: 'دائرۃ المعارف', icon: 'library_books' },
    ];

    // ==========================================
    // 4. MAIN REACT APPLICATION
    // ==========================================
    function App() {
      const [lang, setLang] = useState(() => {
        return localStorage.getItem('arabic_braille_lang') || 'ur';
      });
      const [contractionLevel, setContractionLevel] = useState(1);
      const [isSettingsOpen, setIsSettingsOpen] = useState(false);
      const [activeTab, setActiveTab] = useState('perkins');
      const [copiedState, setCopiedState] = useState(false);

      const t = TRANSLATIONS[lang] || TRANSLATIONS.ur;

      useEffect(() => {
        localStorage.setItem('arabic_braille_lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang === 'ur' ? 'ur' : 'en');
      }, [lang]);

      // Studio State
      const [selectedDots, setSelectedDots] = useState([1, 2]);
      const currentCellDots = selectedDots;
      const setCurrentCellDots = setSelectedDots;
      const [punchedTape, setPunchedTape] = useState([
        { char: 'ب', dots: [1, 2], nameUrdu: 'با', nameEn: 'Baa' },
        { char: 'ِ', dots: [1, 5], nameUrdu: 'زیر', nameEn: 'Kasrah' },
        { char: 'س', dots: [2, 3, 4], nameUrdu: 'سين', nameEn: 'Seen' },
        { char: 'ْ', dots: [2, 5], nameUrdu: 'سکون', nameEn: 'Sukoon' },
        { char: 'م', dots: [1, 3, 4], nameUrdu: 'ميم', nameEn: 'Meem' },
        { char: 'ِ', dots: [1, 5], nameUrdu: 'زیر', nameEn: 'Kasrah' }
      ]);
      const [isExportModalOpen, setIsExportModalOpen] = useState(false);
      const [exportFormat, setExportFormat] = useState('brf'); // 'brf' | 'raw' | 'detailed'
      const [exportSuccessMessage, setExportSuccessMessage] = useState(null);

      const currentCellMatch = useMemo(() => {
        if (selectedDots.length === 0) return null;
        const key = dotsKey(selectedDots);
        return ARABIC_BRAILLE_REGISTRY.find(it => dotsKey(it.dots) === key) || null;
      }, [selectedDots]);

      const handleDotClick = (dotNumber, e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        setSelectedDots((prev) =>
          prev.includes(dotNumber)
            ? prev.filter((d) => d !== dotNumber)
            : [...prev, dotNumber].sort((a, b) => a - b)
        );
      };

      const toggleDot = (dotNum, e) => handleDotClick(dotNum, e);

      const punchCell = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (selectedDots.length === 0) {
          setPunchedTape(prev => [...prev, { char: ' ', dots: [], nameUrdu: 'فاصلہ', nameEn: 'Space' }]);
          return;
        }
        const match = currentCellMatch || {
          char: '?',
          dots: selectedDots,
          nameUrdu: `نقاط ${selectedDots.join(',')}`,
          nameEn: `Dots ${selectedDots.join(',')}`
        };
        setPunchedTape(prev => [...prev, match]);
        setSelectedDots([]);
      };

      const clearCell = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        setSelectedDots([]);
      };

      const deleteLastPunched = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        setPunchedTape(prev => prev.slice(0, -1));
      };

      // Translator State
      const [arabicInput, setArabicInput] = useState('بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ');

      const parsedBrailleCells = useMemo(() => {
        return transcribeArabicToBraille(arabicInput, contractionLevel);
      }, [arabicInput, contractionLevel]);

      const outputBrailleUnicode = useMemo(() => {
        return parsedBrailleCells.map(c => c.unicode).join('');
      }, [parsedBrailleCells]);

      const presets = [
        { label: 'آیت الكرسی (سورۃ البقرہ: 255)', text: QURANIC_PRESETS[0].arabicText },
        { label: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ' },
        { label: 'سورۃ الفاتحہ', text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ ۝ ١ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِينَ ۝ ٢ الرَّحْمٰنِ الرَّحِيمِ ۝ ٣ مٰلِكِ يَوْمِ الدِّينِ ۝ ٤' },
        { label: 'سورۃ الإخلاص', text: 'قُلْ هُوَ اللّٰهُ اَحَدٌ ۝ ١ اَللّٰهُ الصَّمَدُ ۝ ٢ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ ٣ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ ۝ ٤' },
        { label: 'سورۃ الفلق', text: 'قُلْ اَعُوذُ بِرَبِّ الْفَلَقِ ۝ ١ مِنْ شَرِّ مَا خَلَقَ ۝ ٢ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ ۝ ٣' },
        { label: 'سورۃ الناس', text: 'قُلْ اَعُوذُ بِرَبِّ النَّاسِ ۝ ١ مَلِكِ النَّاسِ ۝ ٢ اِلٰهِ النَّاسِ ۝ ٣' }
      ];

      // Practice & Quiz State (with localStorage persistence)
      const [quizCategory, setQuizCategory] = useState('all');
      const [quizScore, setQuizScore] = useState(() => {
        try { return parseInt(localStorage.getItem('arabic_braille_quiz_score') || '0', 10) || 0; } catch (_) { return 0; }
      });
      const [quizStreak, setQuizStreak] = useState(() => {
        try { return parseInt(localStorage.getItem('arabic_braille_quiz_streak') || '0', 10) || 0; } catch (_) { return 0; }
      });
      const [bestStreak, setBestStreak] = useState(() => {
        try { return parseInt(localStorage.getItem('arabic_braille_best_streak') || '0', 10) || 0; } catch (_) { return 0; }
      });
      const [quizAttempted, setQuizAttempted] = useState(() => {
        try { return parseInt(localStorage.getItem('arabic_braille_quiz_attempted') || '0', 10) || 0; } catch (_) { return 0; }
      });
      const [quizCorrect, setQuizCorrect] = useState(() => {
        try { return parseInt(localStorage.getItem('arabic_braille_quiz_correct') || '0', 10) || 0; } catch (_) { return 0; }
      });
      const [showQuizHint, setShowQuizHint] = useState(false);
      const quizTimerRef = useRef(null);

      const quizPool = useMemo(() => {
        const valid = ARABIC_BRAILLE_REGISTRY.filter(it => Array.isArray(it.dots) && it.dots.length > 0);
        if (quizCategory === 'all') return valid;
        const filtered = valid.filter(it => it.category === quizCategory);
        return filtered.length >= 4 ? filtered : valid;
      }, [quizCategory]);

      const [quizDeck, setQuizDeck] = useState(() => shuffleArray(ARABIC_BRAILLE_REGISTRY.filter(it => Array.isArray(it.dots) && it.dots.length > 0)));
      const [quizIndex, setQuizIndex] = useState(0);
      const [quizFeedback, setQuizFeedback] = useState(null);

      useEffect(() => {
        if (quizTimerRef.current) {
          clearTimeout(quizTimerRef.current);
          quizTimerRef.current = null;
        }
        setQuizDeck(shuffleArray(quizPool));
        setQuizIndex(0);
        setQuizFeedback(null);
        setShowQuizHint(false);
      }, [quizPool]);

      useEffect(() => {
        try {
          localStorage.setItem('arabic_braille_quiz_score', String(quizScore));
          localStorage.setItem('arabic_braille_quiz_streak', String(quizStreak));
          localStorage.setItem('arabic_braille_best_streak', String(bestStreak));
          localStorage.setItem('arabic_braille_quiz_attempted', String(quizAttempted));
          localStorage.setItem('arabic_braille_quiz_correct', String(quizCorrect));
        } catch (_) {}
      }, [quizScore, quizStreak, bestStreak, quizAttempted, quizCorrect]);

      // Current active question item from the randomized deck
      const currentQuizItem = useMemo(() => {
        if (!quizDeck || quizDeck.length === 0) {
          return quizPool[0] || ARABIC_BRAILLE_REGISTRY[0];
        }
        return quizDeck[quizIndex % quizDeck.length];
      }, [quizDeck, quizIndex, quizPool]);

      // Dynamic multiple-choice generation with unique dot patterns & Fisher-Yates shuffling
      const quizChoices = useMemo(() => {
        const targetDotsKey = (currentQuizItem.cells
          ? currentQuizItem.cells.map(c => c.join(',')).join('|')
          : (currentQuizItem.dots || []).join(','));
        const seenPatterns = new Set([targetDotsKey]);
        const candidates = shuffleArray(ARABIC_BRAILLE_REGISTRY.filter(it => it.id !== currentQuizItem.id && Array.isArray(it.dots) && it.dots.length > 0));
        const distractors = [];
        for (const cand of candidates) {
          if (distractors.length >= 3) break;
          const candKey = (cand.cells
            ? cand.cells.map(c => c.join(',')).join('|')
            : cand.dots.join(','));
          if (!seenPatterns.has(candKey)) {
            seenPatterns.add(candKey);
            distractors.push(cand);
          }
        }
        return shuffleArray([currentQuizItem, ...distractors]);
      }, [currentQuizItem]);

      const handleNextQuestion = useCallback(() => {
        if (quizTimerRef.current) {
          clearTimeout(quizTimerRef.current);
          quizTimerRef.current = null;
        }
        setQuizFeedback(null);
        setShowQuizHint(false);
        setQuizIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= quizDeck.length) {
            setQuizDeck(shuffleArray(quizPool));
            return 0;
          }
          return nextIndex;
        });
      }, [quizDeck.length, quizPool]);

      const handleResetQuizStats = () => {
        setQuizScore(0);
        setQuizStreak(0);
        setBestStreak(0);
        setQuizAttempted(0);
        setQuizCorrect(0);
        handleNextQuestion();
      };

      const handleQuizAnswer = (item) => {
        if (quizFeedback) return;
        if (quizTimerRef.current) {
          clearTimeout(quizTimerRef.current);
          quizTimerRef.current = null;
        }

        const dotsText = (currentQuizItem.dots || []).join(', ');
        const isCorrect = item.id === currentQuizItem.id;
        setQuizAttempted(a => a + 1);

        if (isCorrect) {
          const nextStreak = quizStreak + 1;
          const streakBonus = nextStreak >= 3 ? 5 : 0;
          setQuizScore(s => s + 10 + streakBonus);
          setQuizStreak(nextStreak);
          setBestStreak(b => Math.max(b, nextStreak));
          setQuizCorrect(c => c + 1);
          if (typeof window !== 'undefined' && window.AndroidHaptic && window.AndroidHaptic.vibrate) {
            try { window.AndroidHaptic.vibrate(40); } catch (_) {}
          }
          setQuizFeedback({
            type: 'correct',
            selectedId: item.id,
            msg: lang === 'ur'
              ? `صحیح! ${currentQuizItem.char} (${currentQuizItem.nameUrdu || currentQuizItem.title}) [${dotsText}]${streakBonus ? ' (+5 بونس!)' : ''}`
              : `Correct! ${currentQuizItem.char} (${currentQuizItem.nameEn || currentQuizItem.title}) [${dotsText}]${streakBonus ? ' (+5 bonus!)' : ''}`
          });
        } else {
          setQuizStreak(0);
          if (typeof window !== 'undefined' && window.AndroidHaptic && window.AndroidHaptic.vibrate) {
            try { window.AndroidHaptic.vibrate(90); } catch (_) {}
          }
          setQuizFeedback({
            type: 'wrong',
            selectedId: item.id,
            msg: lang === 'ur'
              ? `غلط! صحیح جواب: ${currentQuizItem.char} (${currentQuizItem.nameUrdu || currentQuizItem.title}) [${dotsText}]`
              : `Wrong! Correct answer: ${currentQuizItem.char} (${currentQuizItem.nameEn || currentQuizItem.title}) [${dotsText}]`
          });
        }
        quizTimerRef.current = setTimeout(() => {
          handleNextQuestion();
        }, 1600);
      };

      // Reference State
      const [searchQuery, setSearchQuery] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('all');

      // Quranic Verses Pre-Transcribed List State
      const [expandedVerseId, setExpandedVerseId] = useState('ayatul_kursi');

      const transcribedQuranicVerses = useMemo(() => {
        return QURANIC_VERSES_CATALOG.map(item => {
          const cells = transcribeArabicToBraille(item.textArabic, 2);
          const brailleUnicode = cells.map(c => c.unicode).join('');
          return {
            ...item,
            cells,
            brailleUnicode
          };
        });
      }, []);

      const filteredRegistry = useMemo(() => {
        return ARABIC_BRAILLE_REGISTRY.filter(item => {
          const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
          const q = searchQuery.trim().toLowerCase();
          if (!q) return matchCat;
          const dotsStr = item.cells
            ? item.cells.map(c => c.join(',')).join(' ')
            : (item.dots ? item.dots.join(',') : '');
          const nameU = item.nameUrdu || item.title || '';
          const nameE = (item.nameEn || item.title || '').toLowerCase();
          const desc = (item.description || '').toLowerCase();
          return matchCat && (
            item.char.includes(q) ||
            nameU.includes(q) ||
            nameE.includes(q) ||
            desc.includes(q) ||
            dotsStr.includes(q)
          );
        });
      }, [selectedCategory, searchQuery]);

      const fallbackCopy = (text) => {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        } catch (_) {}
      };

      const copyText = (text, e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (!text) return;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(() => {
              fallbackCopy(text);
            });
          } else {
            fallbackCopy(text);
          }
          setCopiedState(true);
          setTimeout(() => setCopiedState(false), 1800);
        } catch (_) {
          fallbackCopy(text);
          setCopiedState(true);
          setTimeout(() => setCopiedState(false), 1800);
        }
      };

      const exportToBRF = (brailleText) => {
        if (!brailleText) return;
        // If running inside Android WebView with native bridge
        if (typeof window !== 'undefined' && window.AndroidEmbosser && typeof window.AndroidEmbosser.exportFile === 'function') {
          try {
            window.AndroidEmbosser.exportFile(brailleText, 'arabic_braille_output.brf');
            return;
          } catch (_) {}
        }
        // Standard Web Blob Download
        try {
          const blob = new Blob([brailleText], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'arabic_braille_output.brf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (err) {
          console.error('Failed to export BRF:', err);
        }
      };

      const generateEmbosserContent = (format = exportFormat) => {
        const rawBraille = punchedTape.map(p => dotsToUnicode(p.dots)).join('');
        const textRepresentation = punchedTape.map(p => p.char).join('');
        const timestamp = new Date().toISOString();

        if (format === 'raw') {
          return rawBraille;
        }

        if (format === 'detailed') {
          let out = '';
          out += '===================================================\r\n';
          out += '  ARABIC BRAILLE STUDIO - EMBOSSER TAPE EXPORT\r\n';
          out += '===================================================\r\n';
          out += `Timestamp: ${timestamp}\r\n`;
          out += `Total Cells: ${punchedTape.length}\r\n`;
          out += `Arabic Text: ${textRepresentation}\r\n`;
          out += `Braille Stream (Unicode): ${rawBraille}\r\n`;
          out += '---------------------------------------------------\r\n';
          out += 'CELL-BY-CELL EMBOSS SPECIFICATION (LEFT-TO-RIGHT):\r\n';
          out += '---------------------------------------------------\r\n';
          punchedTape.forEach((cell, idx) => {
            const cellNum = String(idx + 1).padStart(3, ' ');
            const dotList = cell.dots && cell.dots.length > 0 ? cell.dots.join(',') : 'Space';
            const charName = lang === 'ur' ? (cell.nameUrdu || cell.char) : (cell.nameEn || cell.char);
            const glyph = dotsToUnicode(cell.dots);
            out += `[Cell ${cellNum}] Glyph: ${glyph} | Char: ${cell.char} (${charName}) | Dots: [${dotList}]\r\n`;
          });
          out += '===================================================\r\n';
          out += 'End of Embosser Data.\r\n';
          return out;
        }

        // Standard BRF with Embosser Form Feed and Standard Header
        let out = '';
        out += ';; ARABIC BRAILLE EMBOSSER SPECIFICATION (UTF-8 BRF)\r\n';
        out += `;; CREATED: ${timestamp}\r\n`;
        out += `;; CELLS: ${punchedTape.length}\r\n`;
        out += `;; ARABIC: ${textRepresentation}\r\n`;
        out += ';; LINE-LENGTH: 40\r\n';
        out += '\r\n';
        // Wrap braille stream into 40-cell lines for standard braille embossers
        for (let i = 0; i < rawBraille.length; i += 40) {
          out += rawBraille.slice(i, i + 40) + '\r\n';
        }
        out += '\r\n\x0C'; // Form feed (Page Break) for Braille Embossers
        return out;
      };

      const downloadEmbosserFile = (format = exportFormat) => {
        const content = generateEmbosserContent(format);
        const ext = format === 'raw' ? 'txt' : (format === 'brf' ? 'brf' : 'txt');
        const filename = `arabic_braille_tape_${Date.now()}.${ext}`;

        try {
          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          setExportSuccessMessage(lang === 'ur' ? 'فائل کامیابی کے ساتھ تیار ہو گئی!' : 'Embosser file downloaded!');
          setTimeout(() => setExportSuccessMessage(null), 3000);
        } catch (_) {
          fallbackCopy(content);
          setExportSuccessMessage(lang === 'ur' ? 'متن کاپی کر لیا گیا!' : 'Content copied to clipboard!');
          setTimeout(() => setExportSuccessMessage(null), 3000);
        }
      };

      const shareToEmbosserDevice = (format = exportFormat) => {
        const content = generateEmbosserContent(format);
        const ext = format === 'raw' ? 'txt' : (format === 'brf' ? 'brf' : 'txt');
        const filename = `arabic_braille_emboss_${Date.now()}.${ext}`;

        // Check if native Android bridge is available
        if (typeof window !== 'undefined' && window.AndroidEmbosser && window.AndroidEmbosser.exportFile) {
          try {
            window.AndroidEmbosser.exportFile(content, filename);
            setExportSuccessMessage(lang === 'ur' ? 'اینڈرائیڈ پرنٹر / شیئر پر بھیجا گیا!' : 'Shared to Android Embosser!');
            setTimeout(() => setExportSuccessMessage(null), 3000);
            return;
          } catch (_) {}
        }

        // Web Share API fallback
        if (navigator.share) {
          try {
            navigator.share({
              title: 'Arabic Braille Embosser File',
              text: content
            }).catch(() => {
              downloadEmbosserFile(format);
            });
            return;
          } catch (_) {}
        }

        // Default to file download
        downloadEmbosserFile(format);
      };

      // Swipe navigation between main tabs is disabled (swipeEnabled: false)
      // to prevent accidental tab switches during horizontal scrolling or practice interactions.

      return (
        <div className="flex flex-col min-h-screen bg-[#051C15] text-slate-100 font-sans">
          {/* Header */}
          <header className="flex-none pt-4 pb-3 px-4 bg-gradient-to-b from-[#0B3023] to-transparent border-b border-[#D4AF37]/15">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-[#D4AF37]">
                  {t.appTitle}
                </h1>
                <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold opacity-90">
                  {t.appSubtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLang(l => (l === 'ur' ? 'en' : 'ur'));
                  }}
                  className="touch-manipulation cursor-pointer px-3 py-1.5 rounded-full bg-[#0B3023] hover:bg-[#1A4D3E] border border-[#D4AF37]/30 text-xs font-bold text-[#FFD700] transition active:scale-95 select-none"
                >
                  {lang === 'ur' ? 'English' : 'اردو'}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakArabic('أَهْلاً وَسَهْلاً بِكُمْ فِي مُعَلِّمِ الْبَرِيلِ');
                  }}
                  className="touch-manipulation cursor-pointer p-2 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/30 transition active:scale-95 select-none"
                  title="Play welcome audio"
                >
                  <span className="material-symbols-outlined text-lg pointer-events-none">volume_up</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSettingsOpen(true);
                  }}
                  className="touch-manipulation cursor-pointer p-2 rounded-full bg-[#0B3023] hover:bg-[#1A4D3E] border border-[#D4AF37]/30 text-[#D4AF37] transition active:scale-95 select-none"
                  title="Settings"
                >
                  <span className="material-symbols-outlined text-lg pointer-events-none">settings</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Area */}
          <main
            className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 pb-24 flex flex-col gap-4 overflow-y-auto touch-pan-y transition-opacity duration-200"
          >
            
            {/* WORKSPACE: PERKINS / STUDIO */}
            {activeTab === 'perkins' && (
              <div className="flex-1 flex flex-col gap-4">
                <section
                  className="bg-[#0B3023]/85 rounded-3xl border border-[#D4AF37]/25 p-5 relative overflow-hidden flex flex-col items-center justify-center shadow-xl"
                  aria-label={lang === 'ur' ? 'بریل سیل مشاہدہ کار و پیش نظارہ' : 'Braille Cell Visualizer & Preview'}
                >
                  <div className="w-full flex justify-between items-center mb-2">
                    <div className="flex gap-2" role="status" aria-live="polite">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-[10px] border border-emerald-700/50 text-emerald-300 font-semibold">
                        {t.studio.activeCell}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-[10px] border border-emerald-700/50 text-[#FFD700] font-semibold">
                        {selectedDots.length ? `${t.studio.dotsActive}: ${selectedDots.join(', ')}` : t.studio.none}
                      </span>
                    </div>
                    {currentCellMatch && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakArabic(currentCellMatch.char);
                        }}
                        className="touch-manipulation cursor-pointer p-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/30 transition active:scale-95 select-none"
                        title={lang === 'ur' ? `تلفظ سنیں: ${currentCellMatch.char}` : `Listen to pronunciation of ${currentCellMatch.char}`}
                        aria-label={lang === 'ur' ? `تلفظ سنیں: ${currentCellMatch.char}` : `Listen to pronunciation of ${currentCellMatch.char}`}
                      >
                        <span className="material-symbols-outlined text-sm pointer-events-none" aria-hidden="true">volume_up</span>
                      </button>
                    )}
                  </div>

                  {/* Character preview & Interactive Braille Cell */}
                  <div className="flex items-center justify-center gap-6 my-2 w-full">
                    <div
                      className="text-7xl font-arabic text-[#D4AF37] leading-none select-none min-w-[70px] text-center"
                      aria-label={currentCellMatch ? `${lang === 'ur' ? 'عربی حرف:' : 'Arabic Character:'} ${currentCellMatch.char}` : (lang === 'ur' ? 'خالی سیل' : 'Empty cell')}
                      role="text"
                    >
                      {currentCellMatch ? currentCellMatch.char : 'ـ'}
                    </div>

                    {/* Interactive 6-Dot Braille Cell (Clickable Dots) */}
                    <div
                      className="bg-[#051C15] p-3 rounded-2xl border border-[#D4AF37]/40 shadow-inner flex items-center justify-center gap-4"
                      role="group"
                      aria-label={
                        lang === 'ur'
                          ? `چھ نکاتی انٹرایکٹو بریل سیل۔ متحرک نقاط: ${selectedDots.length ? selectedDots.join(', ') : 'کوئی نہیں'}`
                          : `6-dot interactive Braille cell. Active dots: ${selectedDots.length ? selectedDots.join(', ') : 'None'}`
                      }
                    >
                      {/* Column 1: Dots 1, 2, 3 */}
                      <div className="flex flex-col gap-2.5" role="group" aria-label={lang === 'ur' ? 'بایاں کالم، نقاط 1، 2، 3' : 'Left column, dots 1, 2, 3'}>
                        {[1, 2, 3].map((dotNumber) => {
                          const isPressed = selectedDots.includes(dotNumber);
                          const dotLabelUrdu = `نقطہ ${dotNumber}، ${isPressed ? 'فعال' : 'غیر فعال'}`;
                          const dotLabelEn = `Dot ${dotNumber}, ${isPressed ? 'Active' : 'Inactive'}`;
                          return (
                            <button
                              type="button"
                              key={dotNumber}
                              onClick={(e) => handleDotClick(dotNumber, e)}
                              className={`touch-manipulation cursor-pointer select-none transition-transform active:scale-90 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                                isPressed
                                  ? 'bg-[#FFD700] text-slate-950 border-[#D4AF37] shadow-[0_0_12px_rgba(255,215,0,0.8)] scale-105'
                                  : 'bg-[#1A4D3E] text-emerald-300 border-[#0B3023] hover:border-emerald-500/40'
                              }`}
                              aria-pressed={isPressed}
                              aria-label={lang === 'ur' ? dotLabelUrdu : dotLabelEn}
                            >
                              <span aria-hidden="true">{dotNumber}</span>
                            </button>
                          );
                        })}
                      </div>
                      {/* Column 2: Dots 4, 5, 6 */}
                      <div className="flex flex-col gap-2.5" role="group" aria-label={lang === 'ur' ? 'دایاں کالم، نقاط 4، 5، 6' : 'Right column, dots 4, 5, 6'}>
                        {[4, 5, 6].map((dotNumber) => {
                          const isPressed = selectedDots.includes(dotNumber);
                          const dotLabelUrdu = `نقطہ ${dotNumber}، ${isPressed ? 'فعال' : 'غیر فعال'}`;
                          const dotLabelEn = `Dot ${dotNumber}, ${isPressed ? 'Active' : 'Inactive'}`;
                          return (
                            <button
                              type="button"
                              key={dotNumber}
                              onClick={(e) => handleDotClick(dotNumber, e)}
                              className={`touch-manipulation cursor-pointer select-none transition-transform active:scale-90 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                                isPressed
                                  ? 'bg-[#FFD700] text-slate-950 border-[#D4AF37] shadow-[0_0_12px_rgba(255,215,0,0.8)] scale-105'
                                  : 'bg-[#1A4D3E] text-emerald-300 border-[#0B3023] hover:border-emerald-500/40'
                              }`}
                              aria-pressed={isPressed}
                              aria-label={lang === 'ur' ? dotLabelUrdu : dotLabelEn}
                            >
                              <span aria-hidden="true">{dotNumber}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center min-w-[70px]"
                      aria-label={
                        lang === 'ur'
                          ? `یونی کوڈ بریل علامت: ${dotsToUnicode(selectedDots)}، کوڈ پوائنٹ U+${dotsToUnicode(selectedDots).charCodeAt(0).toString(16).toUpperCase()}`
                          : `Unicode Braille Glyph: ${dotsToUnicode(selectedDots)}, Code Point U+${dotsToUnicode(selectedDots).charCodeAt(0).toString(16).toUpperCase()}`
                      }
                      role="text"
                    >
                      <div className="text-5xl text-white select-none" aria-hidden="true">
                        {dotsToUnicode(selectedDots)}
                      </div>
                      <div className="text-xs font-mono text-emerald-400/80 mt-1" aria-hidden="true">
                        U+{dotsToUnicode(selectedDots).charCodeAt(0).toString(16).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 flex flex-col items-center" role="status" aria-live="polite">
                    <span className="text-lg font-bold text-emerald-50 leading-none">
                      {currentCellMatch ? (lang === 'ur' ? currentCellMatch.nameUrdu : currentCellMatch.nameEn) : t.studio.chordSelected}
                    </span>
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest mt-1 font-semibold" aria-hidden="true">
                      {t.studio.unifiedRegistry}
                    </span>
                  </div>
                </section>

                {/* 6-Dot Perkins Keyboard Buttons */}
                <section
                  className="flex-1 flex flex-col justify-center gap-3 py-2"
                  aria-label={lang === 'ur' ? 'پرکنز ۶ نکاتی کی بورڈ' : 'Perkins 6-Dot Keyboard'}
                >
                  <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-3 max-w-[320px] mx-auto w-full">
                    {/* Left Hand: Dots 1, 2, 3 */}
                    <div className="flex flex-col gap-3" role="group" aria-label={lang === 'ur' ? 'بایاں ہاتھ: نقاط 1، 2، 3' : 'Left hand keys: Dots 1, 2, 3'}>
                      {[1, 2, 3].map(dotNumber => {
                        const active = selectedDots.includes(dotNumber);
                        const keyShortcut = dotNumber === 1 ? 'F' : (dotNumber === 2 ? 'D' : 'S');
                        const dotTitleUrdu = `نقطہ ${dotNumber} (کلید ${keyShortcut})، ${active ? 'دبایا ہوا' : 'غیر فعال'}`;
                        const dotTitleEn = `Dot ${dotNumber} (Key ${keyShortcut}), ${active ? 'Selected' : 'Unselected'}`;
                        return (
                          <button
                            type="button"
                            key={dotNumber}
                            onClick={(e) => handleDotClick(dotNumber, e)}
                            className={`touch-manipulation cursor-pointer select-none transition-transform active:scale-90 w-full h-14 rounded-2xl font-bold flex items-center justify-between px-4 border ${
                              active
                                ? 'bg-[#FFD700] text-slate-950 border-[#D4AF37] shadow-[0_0_20px_rgba(255,215,0,0.35)]'
                                : 'bg-[#1A4D3E] text-emerald-100 border-emerald-800/30 hover:bg-[#205e4c]'
                            }`}
                            aria-pressed={active}
                            aria-label={lang === 'ur' ? dotTitleUrdu : dotTitleEn}
                          >
                            <span className="text-sm">{lang === 'ur' ? `نقطہ ${dotNumber}` : `Dot ${dotNumber}`}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border ${active ? 'bg-slate-950 border-slate-950' : 'border-emerald-300'}`} aria-hidden="true" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Hand: Dots 4, 5, 6 */}
                    <div className="flex flex-col gap-3" role="group" aria-label={lang === 'ur' ? 'دایاں ہاتھ: نقاط 4، 5، 6' : 'Right hand keys: Dots 4, 5, 6'}>
                      {[4, 5, 6].map(dotNumber => {
                        const active = selectedDots.includes(dotNumber);
                        const keyShortcut = dotNumber === 4 ? 'J' : (dotNumber === 5 ? 'K' : 'L');
                        const dotTitleUrdu = `نقطہ ${dotNumber} (کلید ${keyShortcut})، ${active ? 'دبایا ہوا' : 'غیر فعال'}`;
                        const dotTitleEn = `Dot ${dotNumber} (Key ${keyShortcut}), ${active ? 'Selected' : 'Unselected'}`;
                        return (
                          <button
                            type="button"
                            key={dotNumber}
                            onClick={(e) => handleDotClick(dotNumber, e)}
                            className={`touch-manipulation cursor-pointer select-none transition-transform active:scale-90 w-full h-14 rounded-2xl font-bold flex items-center justify-between px-4 border ${
                              active
                                ? 'bg-[#FFD700] text-slate-950 border-[#D4AF37] shadow-[0_0_20px_rgba(255,215,0,0.35)]'
                                : 'bg-[#1A4D3E] text-emerald-100 border-emerald-800/30 hover:bg-[#205e4c]'
                            }`}
                            aria-pressed={active}
                            aria-label={lang === 'ur' ? dotTitleUrdu : dotTitleEn}
                          >
                            <span className="text-sm">{lang === 'ur' ? `نقطہ ${dotNumber}` : `Dot ${dotNumber}`}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border ${active ? 'bg-slate-950 border-slate-950' : 'border-emerald-300'}`} aria-hidden="true" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2 max-w-[340px] mx-auto w-full mt-2" role="group" aria-label={lang === 'ur' ? 'پرکنز کنٹرول بٹن' : 'Perkins Brailler Controls'}>
                    <button
                      type="button"
                      onClick={(e) => clearCell(e)}
                      disabled={selectedDots.length === 0}
                      className="touch-manipulation cursor-pointer flex-1 py-3 rounded-2xl bg-[#2A1A10] text-rose-300 border border-[#D4AF37]/30 text-xs font-bold transition-transform active:scale-95 select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                      aria-label={lang === 'ur' ? 'سیل صاف کریں (منتخب نقاط ختم کریں)' : 'Clear Cell (Reset selected dots)'}
                    >
                      {t.actions.clear}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => punchCell(e)}
                      className="touch-manipulation cursor-pointer flex-[2] py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#FFD700] text-slate-950 font-bold text-sm shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition-transform active:scale-95 select-none"
                      aria-label={
                        selectedDots.length === 0
                          ? (lang === 'ur' ? 'خالی سیل یا فاصلہ درج کریں (اسپیس)' : 'Punch empty cell / space')
                          : (lang === 'ur'
                              ? `سیل درج کریں: نقاط ${selectedDots.join(', ')} (${currentCellMatch ? currentCellMatch.nameUrdu : 'مخصوص حرف'})`
                              : `Punch cell: Dots ${selectedDots.join(', ')} (${currentCellMatch ? currentCellMatch.nameEn : 'custom character'})`)
                      }
                    >
                      {t.actions.punch}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => deleteLastPunched(e)}
                      disabled={punchedTape.length === 0}
                      className="touch-manipulation cursor-pointer flex-1 py-3 rounded-2xl bg-[#0B3023] text-emerald-300 border border-emerald-700/40 text-xs font-bold transition-transform active:scale-95 select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                      aria-label={lang === 'ur' ? 'آخری درج شدہ سیل حذف کریں (بیک اسپیس)' : 'Delete last punched cell (Backspace)'}
                    >
                      {t.actions.delete}
                    </button>
                  </div>
                </section>

                {/* Tape Stream */}
                <section
                  className="bg-[#0B3023]/60 rounded-2xl border border-[#D4AF37]/20 p-4"
                  aria-label={lang === 'ur' ? 'تحریر شدہ بریل پٹی کی تاریخ' : 'Embossed Braille tape stream history'}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">{t.studio.tapeHistory}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExportModalOpen(true);
                        }}
                        disabled={punchedTape.length === 0}
                        className="touch-manipulation cursor-pointer text-xs text-[#FFD700] hover:text-amber-300 flex items-center gap-1 transition-transform active:scale-95 select-none disabled:opacity-40 disabled:cursor-not-allowed px-2 py-1 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30"
                        title={t.actions.exportEmbosser}
                        aria-label={t.actions.exportEmbosser}
                      >
                        <span className="material-symbols-outlined text-sm pointer-events-none" aria-hidden="true">print</span>
                        <span className="pointer-events-none font-semibold">{t.actions.exportEmbosser}</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => copyText(punchedTape.map(p => dotsToUnicode(p.dots)).join(''), e)}
                        disabled={punchedTape.length === 0}
                        className="touch-manipulation cursor-pointer text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-transform active:scale-95 select-none disabled:opacity-40 disabled:cursor-not-allowed px-2 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/30"
                        aria-label={copiedState ? t.actions.copied : (lang === 'ur' ? 'تحریر شدہ تمام بریل یونی کوڈ کاپی کریں' : 'Copy all embossed Braille Unicode')}
                      >
                        <span className="material-symbols-outlined text-sm pointer-events-none" aria-hidden="true">content_copy</span>
                        <span className="pointer-events-none">{copiedState ? t.actions.copied : t.actions.copy}</span>
                      </button>
                    </div>
                  </div>
                  <div
                    dir="ltr"
                    style={{ direction: 'ltr', textAlign: 'left' }}
                    className="flex items-center gap-2 overflow-x-auto py-2 min-h-[70px] text-left font-mono"
                    role="region"
                    aria-label={lang === 'ur' ? 'تحریر شدہ سیلز کی قطار' : 'List of embossed Braille cells'}
                  >
                    {punchedTape.length === 0 ? (
                      <p className="text-xs text-emerald-600/70">{t.studio.noPunchedCells}</p>
                    ) : (
                      punchedTape.map((p, idx) => {
                        const cellDotsDescr = p.dots && p.dots.length > 0 ? p.dots.join(', ') : (lang === 'ur' ? 'فاصلہ' : 'Space');
                        const charName = lang === 'ur' ? (p.nameUrdu || p.char) : (p.nameEn || p.char);
                        const cellAria = lang === 'ur'
                          ? `سیل ${idx + 1}: حرف ${p.char} (${charName})، نقاط ${cellDotsDescr}`
                          : `Cell ${idx + 1}: character ${p.char} (${charName}), dots ${cellDotsDescr}`;
                        return (
                          <div
                            key={idx}
                            className="flex-none flex flex-col items-center bg-[#051C15] px-2.5 py-1.5 rounded-xl border border-[#D4AF37]/20"
                            role="group"
                            aria-label={cellAria}
                          >
                            <span className="text-xl text-[#FFD700] font-arabic" aria-hidden="true">{p.char}</span>
                            <span className="text-2xl text-white font-mono" aria-hidden="true">{dotsToUnicode(p.dots)}</span>
                            <span className="text-[9px] text-emerald-400/80 font-mono" aria-hidden="true">[{p.dots.join(',')}]</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* WORKSPACE: TRANSLATOR */}
            {activeTab === 'translator' && (
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-[#0B3023]/80 rounded-2xl border border-[#D4AF37]/25 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h2 className="text-base font-bold text-[#D4AF37]">{t.translator.title}</h2>
                    <p className="text-xs text-emerald-300/80">{t.rules.subtitle}</p>
                  </div>

                  <div className="flex items-center bg-[#051C15] p-1 rounded-xl border border-[#D4AF37]/30">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setContractionLevel(1);
                      }}
                      className={`touch-manipulation cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition active:scale-95 select-none ${
                        contractionLevel === 1 ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-emerald-400 hover:text-emerald-200'
                      }`}
                    >
                      {t.translator.grade1Badge}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setContractionLevel(2);
                      }}
                      className={`touch-manipulation cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition active:scale-95 select-none ${
                        contractionLevel === 2 ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-emerald-400 hover:text-emerald-200'
                      }`}
                    >
                      {t.translator.grade2Badge}
                    </button>
                  </div>
                </div>

                {/* Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <span className="text-[11px] font-bold text-[#D4AF37] flex-none">{t.translator.presetsLabel}</span>
                  {presets.map((pr, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setArabicInput(pr.text);
                      }}
                      className="touch-manipulation cursor-pointer flex-none px-2.5 py-1 rounded-lg bg-[#0B3023] hover:bg-[#1A4D3E] text-xs border border-[#D4AF37]/20 text-emerald-200 transition active:scale-95 select-none"
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>

                {/* Translation Panel */}
                <div className="bg-[#0B3023]/70 rounded-2xl border border-[#D4AF37]/20 p-4 flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#D4AF37] flex justify-between items-center">
                    <span>{t.translator.arabicInputLabel}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (arabicInput.trim()) speakArabic(arabicInput);
                      }}
                      disabled={!arabicInput.trim()}
                      className="touch-manipulation cursor-pointer text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition active:scale-95 select-none disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-sm pointer-events-none">volume_up</span>
                      <span className="pointer-events-none">{t.actions.listen}</span>
                    </button>
                  </label>
                  <textarea
                    value={arabicInput}
                    onChange={e => setArabicInput(e.target.value)}
                    rows={3}
                    className="w-full bg-[#051C15] border border-emerald-800/60 rounded-xl p-3 text-lg font-arabic text-[#FFD700] focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-emerald-400">{t.translator.brailleOutputLabel}</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => exportToBRF(outputBrailleUnicode)}
                          disabled={!outputBrailleUnicode}
                          className="touch-manipulation cursor-pointer text-xs text-[#D4AF37] hover:text-[#FFD700] flex items-center gap-1 transition active:scale-95 select-none disabled:opacity-40 disabled:cursor-not-allowed"
                          title={t.actions.exportBRF}
                        >
                          <span className="material-symbols-outlined text-xs pointer-events-none">download</span>
                          <span className="pointer-events-none">{t.actions.exportBRF}</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => copyText(outputBrailleUnicode, e)}
                          disabled={!outputBrailleUnicode}
                          className="touch-manipulation cursor-pointer text-xs text-[#D4AF37] hover:text-[#FFD700] flex items-center gap-1 transition active:scale-95 select-none disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined text-xs pointer-events-none">content_copy</span>
                          <span className="pointer-events-none">{copiedState ? t.actions.copied : t.actions.copy}</span>
                        </button>
                      </div>
                    </div>
                    <div
                      dir="ltr"
                      style={{ direction: 'ltr', textAlign: 'left' }}
                      className="p-3 bg-[#051C15] rounded-xl border border-[#D4AF37]/30 text-2xl font-mono text-left tracking-widest text-white min-h-[50px] select-all break-words"
                    >
                      {outputBrailleUnicode || '⠠⠠⠠'}
                    </div>
                  </div>
                </div>

                {/* Rules Inspection Stream */}
                <div className="bg-[#0B3023]/60 rounded-2xl border border-[#D4AF37]/20 p-4">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
                    {t.rules.ruleInspection}
                  </span>
                  <div
                    dir="ltr"
                    style={{ direction: 'ltr', textAlign: 'left' }}
                    className="flex items-center gap-2.5 overflow-x-auto py-1 text-left font-mono"
                  >
                    {parsedBrailleCells.map((c, idx) => (
                      <div key={idx} className="flex-none flex flex-col items-center bg-[#051C15] p-2 rounded-xl border border-[#D4AF37]/20 min-w-[65px]">
                        <span className="text-xl font-arabic text-[#FFD700]">{c.display}</span>
                        <BrailleCell dots={c.dots} size="sm" />
                        <span className="text-[10px] text-emerald-300 font-bold mt-1 text-center truncate max-w-[70px]">
                          {lang === 'ur' ? c.nameUrdu : c.nameEn}
                        </span>
                        {c.rule && (
                          <span className="text-[8px] px-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] mt-1 font-mono">
                            {c.rule}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* WORKSPACE: RULES GUIDE */}
            {activeTab === 'rules' && (
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-[#0B3023]/80 rounded-2xl border border-[#D4AF37]/25 p-4">
                  <h2 className="text-lg font-bold text-[#D4AF37]">{t.rules.title}</h2>
                  <p className="text-xs text-emerald-300/80">{t.rules.subtitle}</p>
                </div>

                <div className="flex flex-col gap-4">
                  {RULES_CATALOG.map((rule) => (
                    <div
                      key={rule.id}
                      className="bg-[#0B3023]/75 rounded-2xl border border-[#D4AF37]/25 p-5 flex flex-col gap-3 shadow-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-slate-950 font-bold flex items-center justify-center text-sm shadow-md">
                            {rule.number}
                          </span>
                          <div>
                            <h3 className="text-base font-bold text-[#FFD700]">
                              {lang === 'ur' ? rule.titleUrdu : rule.titleEn}
                            </h3>
                            <p className="text-xs text-emerald-200/90 mt-0.5">
                              {lang === 'ur' ? rule.descUrdu : rule.descEn}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setArabicInput(rule.exampleArabic);
                            setActiveTab('translator');
                          }}
                          className="touch-manipulation cursor-pointer px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-bold transition active:scale-95 select-none flex-none"
                        >
                          {t.actions.testInTranslator}
                        </button>
                      </div>

                      <div className="bg-[#051C15] rounded-xl p-3 border border-emerald-800/40 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[11px] text-emerald-400">
                          <span><strong>{t.rules.standardInput}:</strong> {rule.exampleArabic}</span>
                          <span className="text-[#D4AF37] font-mono">
                            {lang === 'ur' ? rule.demonstration.explanationUrdu : rule.demonstration.explanationEn}
                          </span>
                        </div>

                        <div
                          dir="ltr"
                          style={{ direction: 'ltr', textAlign: 'left' }}
                          className="flex items-center gap-3 overflow-x-auto py-1 text-left font-mono"
                        >
                          {rule.demonstration.cells.map((c, i) => (
                            <div key={i} className="flex-none flex flex-col items-center bg-[#0B3023]/80 p-2 rounded-xl border border-[#D4AF37]/20 min-w-[65px]">
                              <span className="text-lg font-arabic text-[#FFD700]">{c.label}</span>
                              <BrailleCell dots={c.dots} size="sm" />
                              <span className="text-[10px] text-emerald-200 mt-1 font-semibold">{lang === 'ur' ? c.urdu : c.en}</span>
                              <span className="text-[9px] text-emerald-400/80 font-mono">[{c.dots.join(',')}]</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comprehensive Expansion of Quranic Ramooz-e-Awqaf (All 14 Pause Signs) */}
                      {rule.id === 'quranic_waqf' && (
                        <div className="mt-2 pt-3 border-t border-[#D4AF37]/25 flex flex-col gap-3">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 bg-[#051C15] p-3 rounded-xl border border-emerald-800/40">
                            <div className="flex items-center gap-2">
                              <span className="text-base">📖</span>
                              <span className="text-sm font-bold text-[#FFD700] font-arabic">
                                فہرستِ مکمل رموزِ اوقاف قرآن مجید (14 متفقہ علامات بمع 2-خلیاتی مرکب بریل قواعد)
                              </span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                              درجہ دوم (Grade 2) • LTR
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {QURANIC_WAQF_RULES_REGISTRY.map((item, idx) => (
                              <div
                                key={item.id}
                                className="bg-[#051C15]/90 hover:bg-[#051C15] rounded-xl border border-emerald-800/70 p-3.5 flex flex-col justify-between gap-2.5 shadow transition-all hover:border-[#D4AF37]/50"
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFD700] text-[10px] font-bold flex items-center justify-center shrink-0">
                                      {idx + 1}
                                    </span>
                                    <div>
                                      <div className="text-sm font-bold text-white font-arabic">{item.title}</div>
                                      <div dir="ltr" style={{ direction: 'ltr' }} className="text-[10px] text-emerald-400/90 font-mono text-left">
                                        {`[${item.cells[0].join(',')}] + [${item.cells[1].join(',')}]`}
                                      </div>
                                    </div>
                                  </div>

                                  {/* 2-Cell Compound Layout (Strict LTR: Prefix [3,6] on Left, Sign on Right) */}
                                  <div
                                    dir="ltr"
                                    style={{ direction: 'ltr' }}
                                    className="flex items-center gap-1.5 bg-black/50 px-2 py-1.5 rounded-xl border border-emerald-800/80 shrink-0"
                                    title={`Cell 1: [${item.cells[0].join(',')}] | Cell 2: [${item.cells[1].join(',')}]`}
                                  >
                                    <div className="flex flex-col items-center">
                                      <BrailleCell dots={item.cells[0]} size="sm" />
                                      <span className="text-[8px] text-emerald-400 font-mono mt-0.5">[3,6]</span>
                                    </div>
                                    <span className="text-emerald-500 font-bold text-xs">+</span>
                                    <div className="flex flex-col items-center">
                                      <BrailleCell dots={item.cells[1]} size="sm" />
                                      <span className="text-[8px] text-emerald-400 font-mono mt-0.5">[{item.cells[1].join(',')}]</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Descriptive Urdu Rule text beneath */}
                                <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/50">
                                  <p className="text-[11px] text-emerald-100 font-arabic leading-relaxed text-right">
                                    <strong className="text-[#FFD700] ml-1">قاعدہ:</strong>
                                    {item.ruleTextUrdu}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Section: Quranic Verses & Advanced Diacritics */}
                <div className="mt-4 flex flex-col gap-4">
                  <div className="bg-gradient-to-r from-[#0B3023] to-[#051C15] rounded-2xl border-2 border-[#D4AF37]/40 p-5 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#FFD700] text-xl">
                        📖
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#FFD700]">
                          {t.rules.quranicVersesTitle}
                        </h3>
                        <p className="text-xs text-emerald-200/90 mt-0.5">
                          {t.rules.quranicVersesSubtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {transcribedQuranicVerses.map((verse) => {
                      const isExpanded = expandedVerseId === verse.id;
                      return (
                        <div
                          key={verse.id}
                          className="bg-[#0B3023]/80 rounded-2xl border border-[#D4AF37]/30 p-5 flex flex-col gap-3 shadow-lg transition-all"
                        >
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#FFD700] border border-[#D4AF37]/40 text-xs font-bold font-arabic">
                                  {lang === 'ur' ? verse.surahUrdu : verse.surahEn}
                                </span>
                                {verse.tags.map((tag, tIdx) => (
                                  <span key={tIdx} className="px-2 py-0.5 rounded-md bg-[#051C15] text-[10px] text-emerald-300 border border-emerald-800/60 font-mono">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className="text-xs text-emerald-300/80 mt-1">
                                {lang === 'ur' ? verse.descUrdu : verse.descEn}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap self-end sm:self-auto">
                              <button
                                type="button"
                                onClick={() => setExpandedVerseId(isExpanded ? null : verse.id)}
                                className="touch-manipulation cursor-pointer px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 text-xs font-semibold transition active:scale-95 flex items-center gap-1.5"
                              >
                                <span>{isExpanded ? '▲' : '▼'}</span>
                                <span>{isExpanded ? t.rules.hideBraille : t.rules.viewBraille}</span>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setArabicInput(verse.textArabic);
                                  setActiveTab('translator');
                                }}
                                className="touch-manipulation cursor-pointer px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FFD700] border border-[#D4AF37]/50 text-xs font-bold transition active:scale-95 select-none"
                              >
                                {t.actions.testInTranslator}
                              </button>
                            </div>
                          </div>

                          {/* Full Vocalized Arabic Text Display */}
                          <div className="p-4 bg-[#051C15] rounded-xl border border-emerald-800/50">
                            <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                              {lang === 'ur' ? 'عربی متن مع اعراب و علامات:' : 'Full Vocalized Arabic Text:'}
                            </span>
                            <div className="text-xl sm:text-2xl font-arabic text-[#FFD700] leading-relaxed text-right dir-rtl">
                              {verse.textArabic}
                            </div>
                          </div>

                          {/* Expanded Pre-Transcribed Braille Unicode & Cell Breakdown */}
                          {isExpanded && (
                            <div className="flex flex-col gap-3 mt-1 pt-3 border-t border-emerald-800/60">
                              {/* Braille Unicode Stream */}
                              <div className="p-3.5 bg-[#051C15]/90 rounded-xl border border-[#D4AF37]/30 flex flex-col gap-1.5">
                                <div className="flex justify-between items-center text-xs font-bold text-[#D4AF37]">
                                  <span>{t.rules.brailleStreamTitle}</span>
                                  <span className="text-[11px] text-emerald-400 font-mono">
                                    {verse.cells.length} {lang === 'ur' ? 'سیلز' : 'Cells'}
                                  </span>
                                </div>
                                <div
                                  dir="ltr"
                                  style={{ direction: 'ltr', textAlign: 'left' }}
                                  className="text-xl text-white font-mono text-left leading-loose tracking-widest break-words select-all bg-[#0B3023]/40 p-2.5 rounded-lg border border-emerald-800/40"
                                >
                                  {verse.brailleUnicode}
                                </div>
                              </div>

                              {/* Tactile Cell Stream Inspection */}
                              <div className="p-3 bg-[#051C15]/90 rounded-xl border border-emerald-800/50 flex flex-col gap-2">
                                <span className="text-xs font-bold text-emerald-400">
                                  {t.rules.cellsStreamTitle}
                                </span>
                                <div
                                  dir="ltr"
                                  style={{ direction: 'ltr', textAlign: 'left' }}
                                  className="flex items-center gap-2.5 overflow-x-auto py-2 text-left font-mono"
                                >
                                  {verse.cells.map((c, cIdx) => (
                                    <div
                                      key={cIdx}
                                      className="flex-none flex flex-col items-center bg-[#0B3023] p-2 rounded-xl border border-[#D4AF37]/20 min-w-[62px]"
                                    >
                                      <span className="text-lg font-arabic text-[#FFD700] min-h-[28px] flex items-center">
                                        {c.display || '—'}
                                      </span>
                                      <BrailleCell dots={c.dots} size="sm" />
                                      <span className="text-[10px] text-emerald-200 mt-1 font-semibold truncate max-w-[65px] text-center">
                                        {lang === 'ur' ? c.nameUrdu : c.nameEn}
                                      </span>
                                      <span className="text-[9px] text-emerald-400/70 font-mono">
                                        {c.dots.length > 0 ? `[${c.dots.join(',')}]` : '[-]'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* WORKSPACE: PRACTICE */}
            {activeTab === 'practice' && (
              <div className="flex-1 flex flex-col gap-4">
                {/* Score, Streak, Best Streak & Accuracy Header */}
                <div className="bg-[#0B3023]/80 rounded-2xl border border-[#D4AF37]/25 p-4 flex flex-col gap-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h2 className="text-base font-bold text-[#D4AF37]">{t.practice.title}</h2>
                      <p className="text-xs text-emerald-300/80">{t.practice.subtitle}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetQuizStats}
                      className="touch-manipulation cursor-pointer px-2.5 py-1.5 rounded-xl bg-[#051C15] hover:bg-[#1A4D3E] text-emerald-300/80 hover:text-white border border-[#D4AF37]/20 text-[11px] font-semibold transition active:scale-95"
                      title={lang === 'ur' ? 'اسکور ری سیٹ کریں' : 'Reset Stats'}
                    >
                      {lang === 'ur' ? 'ری سیٹ' : 'Reset'}
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#D4AF37]/15">
                    <div className="bg-[#051C15]/80 rounded-xl p-2 text-center border border-[#D4AF37]/15">
                      <div className="text-[10px] text-emerald-400 font-bold">{t.practice.score}</div>
                      <div className="text-lg font-bold text-[#FFD700]">{quizScore}</div>
                    </div>
                    <div className="bg-[#051C15]/80 rounded-xl p-2 text-center border border-[#D4AF37]/15">
                      <div className="text-[10px] text-emerald-400 font-bold">{t.practice.streak}</div>
                      <div className="text-lg font-bold text-emerald-300">🔥 {quizStreak}</div>
                    </div>
                    <div className="bg-[#051C15]/80 rounded-xl p-2 text-center border border-[#D4AF37]/15">
                      <div className="text-[10px] text-emerald-400 font-bold">{lang === 'ur' ? 'بہترین' : 'Best'}</div>
                      <div className="text-lg font-bold text-amber-300">🏆 {bestStreak}</div>
                    </div>
                    <div className="bg-[#051C15]/80 rounded-xl p-2 text-center border border-[#D4AF37]/15">
                      <div className="text-[10px] text-emerald-400 font-bold">{lang === 'ur' ? 'درستگی' : 'Accuracy'}</div>
                      <div className="text-lg font-bold text-white">
                        {quizAttempted > 0 ? `${Math.round((quizCorrect / quizAttempted) * 100)}%` : '—'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: t.reference.categories.all },
                    { id: 'alphabet', label: t.reference.categories.alphabet },
                    { id: 'harakat', label: t.reference.categories.harakat },
                    { id: 'markers', label: t.reference.categories.markers },
                    { id: 'numbers', label: t.reference.categories.numbers },
                  ].map(cat => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuizCategory(cat.id);
                      }}
                      className={`touch-manipulation cursor-pointer select-none px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 flex-none border ${
                        quizCategory === cat.id
                          ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                          : 'bg-[#0B3023] text-emerald-300 border-[#D4AF37]/20 hover:bg-[#1A4D3E]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Quiz Question Card */}
                <div className="bg-[#0B3023]/70 rounded-3xl border border-[#D4AF37]/20 p-6 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#051C15] border border-[#D4AF37]/25 text-[11px] font-bold text-[#D4AF37]">
                      {currentQuizItem.category === 'alphabet' ? t.reference.categories.alphabet
                        : currentQuizItem.category === 'harakat' ? t.reference.categories.harakat
                        : currentQuizItem.category === 'markers' ? t.reference.categories.markers
                        : t.reference.categories.numbers}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-emerald-200 text-center">
                    {t.practice.identifyChar}
                  </span>

                  <div dir="ltr" style={{ direction: 'ltr' }} className="p-4 bg-[#051C15] rounded-2xl border border-[#D4AF37]/30 shadow-inner flex items-center gap-3">
                    {currentQuizItem.cells ? (
                      currentQuizItem.cells.map((cellDots, cIdx) => (
                        <BrailleCell key={cIdx} dots={cellDots} size="lg" />
                      ))
                    ) : (
                      <BrailleCell dots={currentQuizItem.dots || []} size="lg" />
                    )}
                  </div>

                  {showQuizHint && !quizFeedback && (
                    <div dir="ltr" className="text-xs font-mono px-3 py-1 rounded-lg bg-[#051C15] text-[#FFD700] border border-[#D4AF37]/30">
                      {lang === 'ur' ? 'نقاط: ' : 'Dots: '}
                      {currentQuizItem.cells
                        ? currentQuizItem.cells.map(c => `[${c.join(',')}]`).join(' + ')
                        : `[${(currentQuizItem.dots || []).join(', ')}]`}
                    </div>
                  )}

                  {quizFeedback && (
                    <div className={`text-sm font-bold px-4 py-2 rounded-xl text-center flex items-center gap-2 ${
                      quizFeedback.type === 'correct' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500' : 'bg-rose-950 text-rose-200 border border-rose-500'
                    }`}>
                      <span>{quizFeedback.msg}</span>
                      <button
                        type="button"
                        onClick={() => speakArabic(currentQuizItem.char)}
                        className="p-1 rounded-lg bg-black/20 hover:bg-black/40 text-white"
                        aria-label={t.actions.listen}
                      >
                        <span className="material-symbols-outlined text-sm">volume_up</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-2">
                    {quizChoices.map((choice) => {
                      const isTarget = choice.id === currentQuizItem.id;
                      const isSelected = quizFeedback?.selectedId === choice.id;
                      let cardStyle = 'bg-[#051C15] hover:bg-[#1A4D3E] border-[#D4AF37]/25';
                      if (quizFeedback) {
                        if (isTarget) {
                          cardStyle = 'bg-emerald-900/80 border-emerald-400 ring-2 ring-emerald-400/50';
                        } else if (isSelected) {
                          cardStyle = 'bg-rose-950/90 border-rose-500 ring-2 ring-rose-500/50';
                        } else {
                          cardStyle = 'bg-[#051C15]/50 border-[#D4AF37]/10 opacity-60';
                        }
                      }
                      return (
                        <button
                          type="button"
                          key={choice.id}
                          disabled={!!quizFeedback}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuizAnswer(choice);
                          }}
                          className={`touch-manipulation cursor-pointer select-none min-h-[56px] p-3.5 rounded-2xl border flex items-center justify-between transition-all active:scale-95 ${cardStyle}`}
                        >
                          <span className="text-3xl font-arabic text-[#FFD700]">{choice.char}</span>
                          <span className="text-xs font-bold text-white text-end">
                            {lang === 'ur' ? (choice.nameUrdu || choice.title) : (choice.nameEn || choice.title)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint & Next Random Question Controls */}
                  <div className="w-full max-w-md flex justify-between items-center mt-1 gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowQuizHint(h => !h);
                      }}
                      className="touch-manipulation cursor-pointer select-none min-h-[40px] px-3.5 py-2 rounded-xl bg-[#051C15] hover:bg-[#1A4D3E] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-xs pointer-events-none">lightbulb</span>
                      <span>{lang === 'ur' ? (showQuizHint ? 'اشارہ چھپائیں' : 'نقاط کا اشارہ') : (showQuizHint ? 'Hide Hint' : 'Hint')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextQuestion();
                      }}
                      className="touch-manipulation cursor-pointer select-none min-h-[40px] px-4 py-2 rounded-xl bg-[#051C15] hover:bg-[#1A4D3E] text-emerald-300 border border-[#D4AF37]/30 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-xs pointer-events-none">shuffle</span>
                      <span>{lang === 'ur' ? 'اگلا بے ترتیب سوال' : 'Next Random Question'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* WORKSPACE: REFERENCE */}
            {activeTab === 'reference' && (
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-[#0B3023]/80 rounded-2xl border border-[#D4AF37]/25 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h2 className="text-base font-bold text-[#D4AF37]">{t.reference.title}</h2>
                    <p className="text-xs text-emerald-300/80">{ARABIC_BRAILLE_REGISTRY.length} Unified Characters</p>
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.reference.searchPlaceholder}
                    className="bg-[#051C15] border border-emerald-700/50 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full md:w-64"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: t.reference.categories.all },
                    { id: 'alphabet', label: t.reference.categories.alphabet },
                    { id: 'harakat', label: t.reference.categories.harakat },
                    { id: 'markers', label: t.reference.categories.markers },
                    { id: 'numbers', label: t.reference.categories.numbers },
                  ].map(cat => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(cat.id);
                      }}
                      className={`touch-manipulation cursor-pointer select-none px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 flex-none border ${
                        selectedCategory === cat.id
                          ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                          : 'bg-[#0B3023] text-emerald-300 border-[#D4AF37]/20 hover:bg-[#1A4D3E]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredRegistry.map(item => (
                    <div
                      key={item.id}
                      className="bg-[#0B3023]/70 hover:bg-[#0B3023] rounded-2xl border border-[#D4AF37]/20 p-3.5 flex flex-col justify-between transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-3xl font-arabic text-[#FFD700] font-bold leading-none">{item.char}</div>
                          <div className="text-xs font-bold text-white mt-1.5">{lang === 'ur' ? (item.title || item.nameUrdu) : (item.nameEn || item.title)}</div>
                          <div dir="ltr" style={{ direction: 'ltr' }} className="text-[10px] text-emerald-400/80 font-mono text-left">
                            {item.cells
                              ? item.cells.map(c => `[${c.join(',')}]`).join(' + ')
                              : `[${item.dots.join(', ')}]`}
                          </div>
                        </div>
                        {item.cells ? (
                          <div
                            dir="ltr"
                            style={{ direction: 'ltr' }}
                            className="flex items-center gap-2 justify-center bg-black/40 p-2 rounded-xl border border-emerald-800/80 flex-nowrap shrink-0"
                            title={item.cells.map(c => `[${c.join(',')}]`).join(' + ')}
                            aria-label={`Compound Braille cells: Cell 1 [${item.cells[0]?.join(',')}], Cell 2 [${item.cells[1]?.join(',')}]`}
                          >
                            {/* Cell 1: Prefix [3,6] on the Left */}
                            <div className="p-1 bg-emerald-950/60 rounded-lg flex items-center justify-center">
                              <BrailleCell dots={item.cells[0]} size="sm" />
                            </div>

                            {/* Cell 2: Specific Awqaf Letter on the Right */}
                            <div className="p-1 bg-emerald-950/60 rounded-lg flex items-center justify-center">
                              <BrailleCell dots={item.cells[1]} size="sm" />
                            </div>
                          </div>
                        ) : (
                          <BrailleCell dots={item.dots} size="sm" />
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#D4AF37]/15 flex flex-col gap-1.5 text-xs">
                        {item.description && (
                          <p className="text-[11px] text-emerald-200/95 font-arabic leading-relaxed text-right">
                            {item.description}
                          </p>
                        )}
                        <div className="flex justify-between items-center text-xs mt-1">
                          <span className="text-[10px] text-emerald-400 font-arabic truncate max-w-[150px]">
                            {item.example ? `مثال: ${item.example}` : ''}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakArabic(item.char || item.title);
                            }}
                            className="touch-manipulation cursor-pointer select-none p-1 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 transition active:scale-95"
                            title="Pronounce"
                          >
                            <span className="material-symbols-outlined text-xs pointer-events-none">volume_up</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

          {/* Fixed Bottom Navigation Bar */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B3023]/95 border-t border-[#D4AF37]/30 backdrop-blur-md px-2 py-2 flex items-center justify-around shadow-2xl">
            {APP_TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`touch-manipulation cursor-pointer flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all select-none ${
                    isSelected
                      ? 'text-[#D4AF37] font-bold scale-105'
                      : 'text-emerald-400/70 hover:text-emerald-200'
                  }`}
                >
                  <span className={`material-symbols-outlined w-5 h-5 mb-1 text-xl flex items-center justify-center pointer-events-none ${
                    isSelected ? 'font-bold' : ''
                  }`}>
                    {tab.icon}
                  </span>
                  <span className="text-[11px] leading-tight whitespace-nowrap">
                    {lang === 'ur' ? tab.labelUr : tab.labelEn}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Settings Modal */}
          {isSettingsOpen && (
            <div
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm touch-manipulation"
            >
              <div
                dir={lang === 'ur' ? 'rtl' : 'ltr'}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0B3023] border border-[#D4AF37]/40 rounded-3xl max-w-lg w-full p-6 flex flex-col gap-5 shadow-2xl relative max-h-[90vh] overflow-y-auto pointer-events-auto select-none"
              >
                <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-3">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <span className="material-symbols-outlined">settings</span>
                    <h3 className="text-lg font-bold">{t.settings.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSettingsOpen(false);
                    }}
                    className="touch-manipulation cursor-pointer text-emerald-400 hover:text-white p-1 transition active:scale-95 select-none"
                    title="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#D4AF37] uppercase">{t.settings.language}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLang('ur');
                      }}
                      className={`touch-manipulation cursor-pointer py-2.5 rounded-xl text-sm font-bold border transition active:scale-95 select-none ${
                        lang === 'ur' ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#051C15] text-emerald-200 border-emerald-800/50'
                      }`}
                    >
                      اردو (Urdu)
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLang('en');
                      }}
                      className={`touch-manipulation cursor-pointer py-2.5 rounded-xl text-sm font-bold border transition active:scale-95 select-none ${
                        lang === 'en' ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#051C15] text-emerald-200 border-emerald-800/50'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#D4AF37] uppercase">{t.settings.contractionLevel}</label>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setContractionLevel(1);
                      }}
                      className={`touch-manipulation cursor-pointer p-3 rounded-xl text-xs font-bold text-left border transition active:scale-95 select-none ${
                        contractionLevel === 1 ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#051C15] text-emerald-200 border-emerald-800/50'
                      }`}
                    >
                      {t.settings.grade1}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setContractionLevel(2);
                      }}
                      className={`touch-manipulation cursor-pointer p-3 rounded-xl text-xs font-bold text-left border transition active:scale-95 select-none ${
                        contractionLevel === 2 ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#051C15] text-emerald-200 border-emerald-800/50'
                      }`}
                    >
                      {t.settings.grade2}
                    </button>
                  </div>
                </div>

                <div className="bg-[#051C15] p-4 rounded-2xl border border-emerald-800/50 flex flex-col gap-2">
                  <span className="text-xs font-bold text-[#D4AF37]">{t.settings.keyboardGuide}</span>
                  <p className="text-[11px] text-emerald-200">{t.settings.keysLeft}</p>
                  <p className="text-[11px] text-emerald-200">{t.settings.keysRight}</p>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1">{t.settings.keysAction}</p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSettingsOpen(false);
                  }}
                  className="touch-manipulation cursor-pointer py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#FFD700] text-slate-950 font-bold text-sm transition active:scale-95 mt-1 select-none"
                >
                  {t.actions.close}
                </button>
              </div>
            </div>
          )}

          {/* EMBOSSER EXPORT MODAL */}
          {isExportModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div
                className="bg-[#0B3023] border border-[#D4AF37]/40 rounded-3xl p-6 max-w-lg w-full flex flex-col gap-4 shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#FFD700]">print</span>
                    <h3 className="text-base font-bold text-[#D4AF37]">{t.studio.exportTitle}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExportModalOpen(false);
                    }}
                    className="touch-manipulation cursor-pointer p-1.5 rounded-full hover:bg-white/10 text-emerald-300 transition"
                  >
                    <span className="material-symbols-outlined text-lg pointer-events-none">close</span>
                  </button>
                </div>

                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {t.studio.exportDesc}
                </p>

                {exportSuccessMessage && (
                  <div className="text-xs font-bold px-3 py-2 rounded-xl bg-emerald-900/90 text-emerald-100 border border-emerald-400 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>{exportSuccessMessage}</span>
                  </div>
                )}

                {/* Format Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-emerald-300">{lang === 'ur' ? 'ایکسپورٹ فارمیٹ منتخب کریں:' : 'Select Export Format:'}</span>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'brf', label: t.studio.formatBrf, ext: '.brf' },
                      { id: 'raw', label: t.studio.formatRaw, ext: '.txt' },
                      { id: 'detailed', label: t.studio.formatDetailed, ext: '.txt' }
                    ].map(fmt => (
                      <button
                        type="button"
                        key={fmt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExportFormat(fmt.id);
                        }}
                        className={`touch-manipulation cursor-pointer p-3 rounded-xl text-xs font-bold text-left border transition active:scale-95 flex items-center justify-between ${
                          exportFormat === fmt.id
                            ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                            : 'bg-[#051C15] text-emerald-200 border-emerald-800/50 hover:bg-[#1A4D3E]'
                        }`}
                      >
                        <span>{fmt.label}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          exportFormat === fmt.id ? 'bg-slate-950 text-[#FFD700]' : 'bg-emerald-900/60 text-emerald-300'
                        }`}>{fmt.ext}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Preview */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[11px] text-emerald-300 font-bold">
                    <span>{lang === 'ur' ? 'فائل پیشگی مشاہدہ (Preview):' : 'File Preview:'}</span>
                    <span className="text-emerald-400 font-mono text-[10px]">{punchedTape.length} {lang === 'ur' ? 'سیلز' : 'Cells'}</span>
                  </div>
                  <pre
                    dir="ltr"
                    style={{ direction: 'ltr', textAlign: 'left' }}
                    className="p-3 bg-[#051C15] text-emerald-200 rounded-xl border border-emerald-800/60 text-xs font-mono max-h-36 overflow-y-auto whitespace-pre-wrap select-all"
                  >
                    {generateEmbosserContent(exportFormat)}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#D4AF37]/20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadEmbosserFile(exportFormat);
                    }}
                    className="touch-manipulation cursor-pointer flex-1 py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-slate-950 font-bold text-xs transition active:scale-95 flex items-center justify-center gap-1.5 shadow"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>{t.studio.downloadFile}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      shareToEmbosserDevice(exportFormat);
                    }}
                    className="touch-manipulation cursor-pointer flex-1 py-3 px-4 rounded-xl bg-[#051C15] hover:bg-[#1A4D3E] text-emerald-300 border border-[#D4AF37]/40 font-bold text-xs transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">share</span>
                    <span>{t.studio.shareFile}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

if (typeof window !== "undefined" && document.getElementById("root")) {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = App;
}
