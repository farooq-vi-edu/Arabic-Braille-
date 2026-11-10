import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

// ============================================================================
// 1. ARABIC & QURANIC BRAILLE REGISTRY & TRANSCRIPTION RULES ENGINE
// ============================================================================

export const ARABIC_BRAILLE_REGISTRY = [
  // Alphabet
  { id: 'alif', char: 'ا', nameUrdu: 'الف', nameEn: 'Alif', dots: [1], category: 'alphabet', example: 'الله' },
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
  { id: 'alif_hamza_above', char: 'أ', nameUrdu: 'الف مع ہمزہ بالا', nameEn: 'Alif Hamza Above', dots: [1, 4], category: 'alphabet', example: 'أَمْر' },
  { id: 'alif_hamza_below', char: 'إ', nameUrdu: 'الف مع ہمزہ زیر', nameEn: 'Alif Hamza Below', dots: [4, 6], category: 'alphabet', example: 'إِنَّ' },
  { id: 'waw_hamza', char: 'ؤ', nameUrdu: 'واؤ مع ہمزہ', nameEn: 'Waw Hamza', dots: [1, 2, 5, 6], category: 'alphabet', example: 'مُؤْمِن' },
  { id: 'yaa_hamza', char: 'ئ', nameUrdu: 'یا مع ہمزہ', nameEn: 'Yaa Hamza', dots: [1, 3, 4, 5, 6], category: 'alphabet', example: 'بَرِيء' },
  { id: 'hamza_isolated', char: 'ء', nameUrdu: 'ہمزہ مفرد', nameEn: 'Isolated Hamza', dots: [3], category: 'alphabet', example: 'سَمَاء' },
  { id: 'alif_maqsoorah', char: 'ى', nameUrdu: 'الف مقصورہ', nameEn: 'Alif Maqsoorah', dots: [1, 3, 5], category: 'alphabet', example: 'عَلَىٰ / مَوْلَىٰ / هُدًى', context: 'Exclusively terminal carrying dagger alif or preceded by Fathah' },
  { id: 'laam_alif', char: 'لا', nameUrdu: 'لام الف مرکب', nameEn: 'Laam-Alif Ligature', dots: [1, 2, 3, 6], category: 'alphabet', example: 'لَا إِلٰهَ' },

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

  // Sukoon, Shaddah & Quranic Markers
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

export const REFERENCE_REGISTRY = ARABIC_BRAILLE_REGISTRY;
export const CHAR_MAP = new Map(ARABIC_BRAILLE_REGISTRY.map(it => [it.char, it]));
export const ID_MAP = new Map(ARABIC_BRAILLE_REGISTRY.map(it => [it.id, it]));

// Lookup fallbacks & explicit canonical overrides
CHAR_MAP.set('\u282F', CHAR_MAP.get('۝'));
ID_MAP.set('waqf_jeem', ID_MAP.get('waqf_jaaiz_j'));
ID_MAP.set('waqf_tah', ID_MAP.get('waqf_mutlaq_t'));
ID_MAP.set('waqf_tah_code', ID_MAP.get('waqf_mutlaq_t'));
ID_MAP.set('waqf_qila_q', ID_MAP.get('waqf_qif_q'));
ID_MAP.set('waqf_salle_s', ID_MAP.get('waqf_al_wasl_awla_sl'));
ID_MAP.set('braille_ayah_sym', ID_MAP.get('ayah_marker'));

// Explicit canonical mapping to guarantee alphabet letters & Maddah are never overwritten
CHAR_MAP.set('ق', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'qaaf')); // dots: [1, 2, 3, 4, 5] (⠟)
CHAR_MAP.set('ۤ', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'madda_comp')); // dots: [3, 4, 5] (⠜)
CHAR_MAP.set('ٓ', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'maddah'));     // dots: [3, 4, 5] (⠜)
CHAR_MAP.set('\u06E4', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'madda_comp')); // dots: [3, 4, 5] (⠜)
CHAR_MAP.set('\u0653', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'maddah'));     // dots: [3, 4, 5] (⠜)
CHAR_MAP.set('م', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'meem'));
CHAR_MAP.set('ط', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'taa_heavy'));
CHAR_MAP.set('ج', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'jeem'));
CHAR_MAP.set('ز', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'zay'));
CHAR_MAP.set('ص', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'saad'));
CHAR_MAP.set('س', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'seen'));
CHAR_MAP.set('ک', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'kaaf_urdu'));
CHAR_MAP.set('ك', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'kaaf'));
CHAR_MAP.set('لا', ARABIC_BRAILLE_REGISTRY.find(it => it.id === 'laam_alif')); // dots: [1, 2, 3, 6] (⠧)

CHAR_MAP.set('ۘ', ID_MAP.get('waqf_laazim_m'));
CHAR_MAP.set('ؕ', ID_MAP.get('waqf_mutlaq_t'));
CHAR_MAP.set('ۚ', ID_MAP.get('waqf_jaaiz_j'));
CHAR_MAP.set('ۖ', ID_MAP.get('waqf_mujawwaz_z'));
CHAR_MAP.set('ۗ', ID_MAP.get('waqf_qila_awla_qf') || ID_MAP.get('waqf_qif_q'));
CHAR_MAP.set('ۛ', ID_MAP.get('waqf_muanaqah'));
CHAR_MAP.set('∴', ID_MAP.get('waqf_muanaqah'));

export function dotsKey(dots) {
  return [...dots].sort((a, b) => a - b).join(',');
}

export function dotsToUnicode(dots) {
  if (!dots || dots.length === 0) return '\u2800';
  let mask = 0;
  dots.forEach(d => {
    if (d >= 1 && d <= 6) mask |= (1 << (d - 1));
  });
  return String.fromCharCode(0x2800 + mask);
}

export function unicodeToDots(char) {
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
export const QURANIC_WAQF_RULES_REGISTRY = [
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

// 7 Unified Arabic Braille Rules Definitions
export const RULES_CATALOG = [
  {
    id: 'shaddah_precedence',
    number: 1,
    titleUrdu: 'حرفِ مشدد کا قاعدہ (Shaddah Precedence)',
    titleEn: 'Shaddah Precedence Rule',
    descUrdu: 'بریل میں تشدید (شدّ) کا سیل [Dot 6] ہمیشہ مشدد حرف سے پہلے رکھا جاتا ہے، بعد میں نہیں۔',
    descEn: 'The Shaddah indicator cell [Dot 6] MUST precede the doubled consonant, never follow it.',
    exampleArabic: 'أَنَّ',
    demonstration: {
      standardInput: 'أَنَّ',
      explanationUrdu: 'أ [1,4] ➔ شدّ [6] ➔ ن [1,3,4,5] ➔ زبر [2]',
      explanationEn: 'Alif Hamza [1,4] ➔ Shaddah [6] ➔ Noon [1,3,4,5] ➔ Fathah [2]',
      cells: [
        { label: 'أ', dots: [1, 4], urdu: 'الف مع ہمزہ', en: 'Alif Hamza' },
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
    descUrdu: 'حرکات (زبر [2]، زیر [1,5]، پیش [1,3,6])، تنوین اور کھڑے اعراب بغیر فاصلے کے بنیادی حرف کے فوراً بعد پیوستہ ہوتے ہیں۔',
    descEn: 'Vowels [2], [1,5], [1,3,6], Tanween, Sukoon [2,5], and vertical diacritics must immediately follow the base consonant.',
    exampleArabic: 'بِسْمِ',
    demonstration: {
      standardInput: 'بِسْمِ',
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
    descEn: 'In Grade 2 contracted Braille, redundant short vowels before long vowels are omitted (fathah+alif ➔ bare alif [1], kasrah+yaa ➔ bare yaa [2,4], dammah+waw ➔ bare waw [2,4,5,6]).',
    exampleArabic: 'لَا رَيْبَ فِيهِ',
    demonstration: {
      standardInput: 'لَا رَيْبَ',
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
      standardInput: 'عَلَىٰ وَفِي',
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
    descEn: 'Waqf indicator [3,6] attaches directly to the word without space, appends the pause character, then inserts one blank space cell.',
    exampleArabic: 'أَبْصَارَهُمْ ۚ كُلَّمَا',
    demonstration: {
      standardInput: 'أَبْصَارَهُمْۚ كُلَّمَا',
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
      standardInput: 'يَعْلَمُونَ ۝ ١٠',
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
    titleUrdu: 'حروفِ مقطعات (Huroof-e-Muqatta\'at)',
    titleEn: "Huroof-e-Muqatta'at Rule",
    descUrdu: 'حروفِ مقطعات میں ہر منفرد حرف کے بعد اشاریہ [3,6] درج کیا جاتا ہے تاکہ اس کی جداگانہ ادائیگی واضح رہے۔',
    descEn: "Insert dot pattern [3,6] immediately after every isolated letter in Huroof-e-Muqatta'at.",
    exampleArabic: 'الٓمّٓ',
    demonstration: {
      standardInput: 'الـم',
      explanationUrdu: 'ا [1] ➔ [3,6] ➔ ل [1,2,3] ➔ [3,6] ➔ م [1,3,4] ➔ [3,6]',
      explanationEn: 'Alif [1] ➔ [3,6] ➔ Laam [1,2,3] ➔ [3,6] ➔ Meem [1,3,4] ➔ [3,6]',
      cells: [
        { label: 'ا', dots: [1], urdu: 'الف', en: 'Alif' },
        { label: 'ۤ', dots: [3, 6], urdu: 'اشاریہ', en: 'Dot [3,6]' },
        { label: 'ل', dots: [1, 2, 3], urdu: 'لام', en: 'Laam' },
        { label: 'ۤ', dots: [3, 6], urdu: 'اشاریہ', en: 'Dot [3,6]' },
        { label: 'م', dots: [1, 3, 4], urdu: 'ميم', en: 'Meem' },
        { label: 'ۤ', dots: [3, 6], urdu: 'اشاریہ', en: 'Dot [3,6]' }
      ]
    }
  }
];

// ==========================================
// AYAT-UL-KURSI DATA UPDATE IN ARABIC BRAILLE STUDIO
// ==========================================

// 1. Updated Preset Text for Ayat-ul-Kursi with Explicit Ayah Sign & Number
export const AYAT_UL_KURSI_TEXT = 'اَللّٰهُ لَاۤ اِلٰهَ اِلَّا هُوَ الۡحَـىُّ الۡقَيُّوۡمُ ۚ لَا تَاۡخُذُهٗ سِنَةٌ وَّلَا نَوۡمٌؕ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الۡاَرۡضِؕ مَنۡ ذَا الَّذِىۡ يَشۡفَعُ عِنۡدَهٗۤ اِلَّا بِاِذۡنِهٖؕ يَعۡلَمُ مَا بَيۡنَ اَيۡدِيۡهِمۡ وَمَا خَلۡفَهُمۡۚ وَلَا يُحِيۡطُوۡنَ بِشَىۡءٍ مِّنۡ عِلۡمِهٖۤ اِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرۡسِيُّهُ السَّمٰوٰتِ وَالۡاَرۡضَۚ وَلَا يَـــُٔوۡدُهٗ حِفۡظُهُمَا ۚ وَ هُوَ الۡعَلِىُّ الۡعَظِيۡمُ ٢٥٥';

export const QURANIC_PRESETS = [
  {
    id: 'ayat_ul_kursi',
    titleUrdu: 'آیت الكرسی (سورۃ البقرہ: 255)',
    arabicText: AYAT_UL_KURSI_TEXT
  }
];

export function convertDigitToBraille(digit) {
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
export function formatAyahEndBraille(text) {
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

export const processAyahAndCharacterRules = formatAyahEndBraille;

// 3. Character-level mapper for Yaa (یا) vs. Alif Maqsoorah (الف مقصورہ)
export function mapArabicCharToBrailleEnhanced(char, nextChar, isWordEnd) {
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

// Mapping logic implementation for Yaa vs. Alif Maqsoorah distinction
export function mapArabicCharToBraille(char, nextChar, isWordEnd) {
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

// Transcribe function applying Grade 1 or Grade 2 rules
export function transcribeArabicToBraille(text, grade = 1) {
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

  const cleanBare = text.replace(/[\u064B-\u065F\u0670]/g, '').trim();
  const isMuqattaatMatch = /^(الم|المر|الر|طسم|طس|طه|يس|حم|حم عسق|كهيعص|ص|ق|ن)$/.test(cleanBare);

  if (isMuqattaatMatch && grade === 2) {
    for (const char of cleanBare) {
      if (char === ' ') {
        cells.push({ dots: [], unicode: ' ', display: ' ', nameUrdu: 'فاصلہ', nameEn: 'Space' });
        continue;
      }
      const entry = CHAR_MAP.get(char);
      if (entry) {
        cells.push({
          dots: entry.dots,
          unicode: dotsToUnicode(entry.dots),
          display: char,
          nameUrdu: entry.nameUrdu,
          nameEn: entry.nameEn,
          rule: 'Muqattaat'
        });
        cells.push({
          dots: [3, 6],
          unicode: dotsToUnicode([3, 6]),
          display: 'ۤ',
          nameUrdu: 'مقطعات اشاریہ',
          nameEn: 'Indicator [3,6]',
          rule: 'Muqattaat'
        });
      }
    }
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

    // Base letter & attached diacritics
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

    // Rule 4: Precise Yaa vs. Alif Maqsoorah Distinction
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

      if (isWordEnd) {
        if (lastVowel === '\u0650') {
          isAlifMaqsoorah = false;
          letterChar = 'ي';
        } else if (letterChar === 'ى' || hasDaggerAlif) {
          isAlifMaqsoorah = true;
          letterChar = 'ى';
          attachedHarakat = attachedHarakat.filter(h => h !== '\u0670');
        } else {
          isAlifMaqsoorah = false;
          letterChar = 'ي';
        }
      } else {
        isAlifMaqsoorah = false;
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

    // Rule 2: Harakat & Tanween Sequencing (Attached immediately after base consonant)
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

    // Update last vowel context for subsequent letters
    for (let hi = attachedHarakat.length - 1; hi >= 0; hi--) {
      const h = attachedHarakat[hi];
      if (/[\u064E\u0650\u064F\u064B\u064D\u064C\u0670]/.test(h)) {
        lastVowel = h;
        break;
      }
    }
  }

  return cells;
}

// Canonical export requested for translation engine
export const translateArabicToBraille = transcribeArabicToBraille;

// Audio SFX Manager
class SoundEffectsManager {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  playSuccessChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(587.33, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      osc2.frequency.setValueAtTime(880, now + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.35);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.2);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.45);
    } catch (e) {}
  }
  playMistakeThud() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.28);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }
  playTactileClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

const sfx = new SoundEffectsManager();

export function speakArabic(text, lang = 'ar-SA') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } catch (e) {}
}

// ============================================================================
// 2. BILINGUAL TRANSLATION DICTIONARY & LOCALIZATION
// ============================================================================

export const TRANSLATIONS = {
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
      close: 'بند کریں',
      save: 'محفوظ کریں',
      submit: 'تصدیق'
    },
    settings: {
      title: 'سیٹنگز اور ترجیحات',
      language: 'زبان منتخب کریں (Language)',
      contractionLevel: 'بریل اختصار لیول (Contraction Level)',
      grade1: 'گریڈ 1 (مکمل اعراب و حرکات)',
      grade2: 'گریڈ 2 (مختصر / قرآنی مدہ و مقطعات قواعد)',
      audioVoice: 'صوتی تلفظ و آواز (Speech Engine)',
      arabicVoice: 'عربی تلفظ (ar-SA)',
      uiVoice: 'اردو / مقامی آواز',
      keyboardGuide: 'پرکنز بریلر فزیکل کی بورڈ رہنمائی (Key Remapping)',
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
      perkinsControls: 'پرکنز کنٹرول پینل'
    },
    translator: {
      title: 'عربی ⇋ بریل براہِ راست مترجم',
      gradeMode: 'قاعدہ لیول',
      grade1Badge: 'گریڈ 1 (مکمل اعراب)',
      grade2Badge: 'گریڈ 2 (قرآنی اختصارات)',
      arabicInputLabel: 'عربی / قرآنی متن درج کریں:',
      brailleInputLabel: 'بریل یونی کوڈ متن درج کریں:',
      brailleOutputLabel: 'بریل یونی کوڈ آؤٹ پٹ:',
      arabicOutputLabel: 'حاصل شدہ عربی عبارت:',
      presetsLabel: 'قرآنی اور نحوی مثالیں:',
      ruleBadges: 'لاگو شدہ قواعد'
    },
    rules: {
      title: 'عربی اور قرآنی بریل قواعد گائیڈ',
      subtitle: 'مستند بین الاقوامی اور قرآنی بریل ضوابط کا عملی معائنہ',
      rulePrefix: 'قاعدہ نمبر',
      ruleInspection: 'سیل بمقابلہ سیل تفصیلی جائزہ:',
      demonstration: 'عملی مظاہرہ',
      standardInput: 'معیاری متن'
    },
    practice: {
      title: 'بریل مشق و تشخیصی کوئز',
      subtitle: 'نقاط اور حروف کی نشاندہی کر کے اپنی صلاحیت آزمائیں',
      score: 'اسکور',
      streak: 'تسلسل (Streak)',
      identifyChar: 'مندرجہ ذیل بریل سیل کس عربی حرف یا حرکت کا ہے؟',
      punchFor: 'اس حرف کے لیے درست نقاط منتخب کر کے تصدیق کریں:'
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
      perkins: 'Perkins Studio',
      translator: 'Translator',
      rules: 'Rules Guide',
      practice: 'Practice',
      reference: 'Reference'
    },
    actions: {
      punch: 'Punch Cell',
      clear: 'Clear Cell',
      delete: 'Delete Last',
      copy: 'Copy Unicode',
      copied: 'Copied!',
      exportBRF: 'Export BRF (.brf)',
      listen: 'Listen',
      testInTranslator: 'Test in Translator',
      close: 'Close',
      save: 'Save',
      submit: 'Submit Chord'
    },
    settings: {
      title: 'Settings & Preferences',
      language: 'Select Language',
      contractionLevel: 'Braille Contraction Level',
      grade1: 'Grade 1 (Full Voweling & Harakat)',
      grade2: 'Grade 2 (Quranic Maddah & Muqatta\'at Contractions)',
      audioVoice: 'Audio Voice Engine',
      arabicVoice: 'Arabic Voice (ar-SA)',
      uiVoice: 'Urdu / Local Voice',
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
      perkinsControls: 'Perkins Tactile Controls'
    },
    translator: {
      title: 'Arabic ⇋ Braille Bidirectional Engine',
      gradeMode: 'Transcription Mode',
      grade1Badge: 'Grade 1 (Full Vowels)',
      grade2Badge: 'Grade 2 (Quranic Rules)',
      arabicInputLabel: 'Enter Arabic / Quranic text:',
      brailleInputLabel: 'Enter Braille Unicode text:',
      brailleOutputLabel: 'Braille Unicode Output:',
      arabicOutputLabel: 'Transcribed Arabic Output:',
      presetsLabel: 'Quranic Orthography Presets:',
      ruleBadges: 'Active Rules Applied'
    },
    rules: {
      title: 'Arabic Braille Orthography Rules',
      subtitle: 'Programmatic inspector and interactive comparison of unified standards',
      rulePrefix: 'Rule #',
      ruleInspection: 'Tactile Cell Inspection & Breakdown:',
      demonstration: 'Demonstration',
      standardInput: 'Standard Expression'
    },
    practice: {
      title: 'Interactive Braille Tutor',
      subtitle: 'Test your recognition of unified Arabic Braille glyphs',
      score: 'Score',
      streak: 'Streak',
      identifyChar: 'Which character or diacritic corresponds to this Braille cell?',
      punchFor: 'Punch the matching dots for this character:'
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

// ============================================================================
// 3. REUSABLE UI COMPONENTS (Braille SVG & Icons)
// ============================================================================

export function BrailleCellSVG({ dots = [], size = "md", className = "" }) {
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

  return (
    <svg
      width={dimensions.w}
      height={dimensions.h}
      viewBox="0 0 56 76"
      className={`select-none flex-none ${className}`}
      aria-label={`Braille cell dots ${dots.length ? dots.join(',') : 'empty'}`}
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
            >
              {num}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Icons
function IconGear({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconKeyboard({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" />
    </svg>
  );
}
function IconTranslate({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
    </svg>
  );
}
function IconBook({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10M6 10h10" />
    </svg>
  );
}
function IconRules({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
function IconAward({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
function IconVolume({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
function IconCopy({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function IconDownload({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function exportToBRF(brailleText) {
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
}

// ============================================================================
// 4. MAIN HIGH-DENSITY APPLICATION COMPONENT
// ============================================================================

export default function ArabicBrailleApp() {
  // Localization State & Direction Management
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('arabic_braille_lang') || 'ur';
    }
    return 'ur';
  });

  const [contractionLevel, setContractionLevel] = useState(1); // 1 = Grade 1, 2 = Grade 2
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('perkins');
  const [announcement, setAnnouncement] = useState('');
  const [copiedState, setCopiedState] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ur;

  // Persist language and set document direction
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('arabic_braille_lang', lang);
      document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', lang === 'ur' ? 'ur' : 'en');
    }
  }, [lang]);

  const announce = useCallback((msg) => {
    setAnnouncement(msg);
  }, []);

  // Studio Perkins State
  const [currentCellDots, setCurrentCellDots] = useState([1, 2]);
  const [punchedTape, setPunchedTape] = useState([
    { char: 'ب', dots: [1, 2], nameUrdu: 'با', nameEn: 'Baa' },
    { char: 'ِ', dots: [1, 5], nameUrdu: 'زیر', nameEn: 'Kasrah' },
    { char: 'س', dots: [2, 3, 4], nameUrdu: 'سين', nameEn: 'Seen' },
    { char: 'ْ', dots: [2, 5], nameUrdu: 'سکون', nameEn: 'Sukoon' },
    { char: 'م', dots: [1, 3, 4], nameUrdu: 'ميم', nameEn: 'Meem' },
    { char: 'ِ', dots: [1, 5], nameUrdu: 'زیر', nameEn: 'Kasrah' }
  ]);

  const currentCellMatch = useMemo(() => {
    if (currentCellDots.length === 0) return null;
    const key = dotsKey(currentCellDots);
    return ARABIC_BRAILLE_REGISTRY.find(it => dotsKey(it.dots) === key) || null;
  }, [currentCellDots]);

  const toggleDot = useCallback((dotNum) => {
    sfx.playTactileClick();
    setCurrentCellDots(prev => {
      const next = prev.includes(dotNum)
        ? prev.filter(d => d !== dotNum)
        : [...prev, dotNum].sort((a, b) => a - b);
      const match = ARABIC_BRAILLE_REGISTRY.find(it => dotsKey(it.dots) === dotsKey(next));
      if (match) {
        announce(`Dot ${dotNum} toggled. Letter: ${lang === 'ur' ? match.nameUrdu : match.nameEn}`);
      } else {
        announce(`Dot ${dotNum} toggled. Active: ${next.length ? next.join(', ') : 'none'}`);
      }
      return next;
    });
  }, [announce, lang]);

  const punchCell = useCallback(() => {
    if (currentCellDots.length === 0) {
      setPunchedTape(prev => [...prev, { char: ' ', dots: [], nameUrdu: 'فاصلہ', nameEn: 'Space' }]);
      announce(lang === 'ur' ? 'خالی سیل درج ہوا' : 'Space cell punched');
      sfx.playTactileClick();
      return;
    }
    const match = currentCellMatch || {
      char: '?',
      dots: currentCellDots,
      nameUrdu: `نقاط ${currentCellDots.join(',')}`,
      nameEn: `Dots ${currentCellDots.join(',')}`
    };
    setPunchedTape(prev => [...prev, match]);
    sfx.playTactileClick();
    announce(lang === 'ur' ? `${match.nameUrdu} درج ہوا` : `Committed ${match.nameEn}`);
    setCurrentCellDots([]);
  }, [currentCellDots, currentCellMatch, announce, lang]);

  const clearCell = useCallback(() => {
    setCurrentCellDots([]);
    announce(lang === 'ur' ? 'سیل صاف کر دیا گیا' : 'Cell cleared');
    sfx.playTactileClick();
  }, [announce, lang]);

  const deleteLastPunched = useCallback(() => {
    setPunchedTape(prev => {
      if (prev.length === 0) return prev;
      const removed = prev[prev.length - 1];
      announce(lang === 'ur' ? `حذف شدہ: ${removed.nameUrdu}` : `Deleted: ${removed.nameEn}`);
      return prev.slice(0, -1);
    });
    sfx.playTactileClick();
  }, [announce, lang]);

  // Physical Keyboard listener for Perkins Brailler (S-D-F and J-K-L)
  useEffect(() => {
    if (activeTab !== 'perkins' || isSettingsOpen) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      const key = e.key.toLowerCase();
      if (key === 'f') { e.preventDefault(); toggleDot(1); }
      else if (key === 'd') { e.preventDefault(); toggleDot(2); }
      else if (key === 's') { e.preventDefault(); toggleDot(3); }
      else if (key === 'j') { e.preventDefault(); toggleDot(4); }
      else if (key === 'k') { e.preventDefault(); toggleDot(5); }
      else if (key === 'l') { e.preventDefault(); toggleDot(6); }
      else if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); punchCell(); }
      else if (e.key === 'Backspace') { e.preventDefault(); deleteLastPunched(); }
      else if (e.key === 'Enter') { e.preventDefault(); punchCell(); }
      else if (e.key === 'c' || e.key === 'Escape') { e.preventDefault(); clearCell(); }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isSettingsOpen, toggleDot, punchCell, deleteLastPunched, clearCell]);

  // Translator State
  const [arabicInput, setArabicInput] = useState('بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ ﴿١﴾');

  const parsedBrailleCells = useMemo(() => {
    return transcribeArabicToBraille(arabicInput, contractionLevel);
  }, [arabicInput, contractionLevel]);

  const outputBrailleUnicode = useMemo(() => {
    return parsedBrailleCells.map(c => c.unicode).join('');
  }, [parsedBrailleCells]);

  const translatorPresets = [
    { label: 'آیت الكرسی (سورۃ البقرہ: 255)', text: QURANIC_PRESETS[0].arabicText },
    { label: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ' },
    { label: 'سورۃ الفاتحہ', text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ ۝ ١ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِينَ ۝ ٢ الرَّحْمٰنِ الرَّحِيمِ ۝ ٣ مٰلِكِ يَوْمِ الدِّينِ ۝ ٤' },
    { label: 'سورۃ الإخلاص', text: 'قُلْ هُوَ اللّٰهُ اَحَدٌ ۝ ١ اَللّٰهُ الصَّمَدُ ۝ ٢ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ ٣ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ ۝ ٤' },
    { label: 'سورۃ الفلق', text: 'قُلْ اَعُوذُ بِرَبِّ الْفَلَقِ ۝ ١ مِنْ شَرِّ مَا خَلَقَ ۝ ٢ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ ۝ ٣' },
    { label: 'سورۃ الناس', text: 'قُلْ اَعُوذُ بِرَبِّ النَّاسِ ۝ ١ مَلِكِ النَّاسِ ۝ ٢ اِلٰهِ النَّاسِ ۝ ٣' }
  ];

  // Practice Quiz State (with localStorage persistence)
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

  const shuffleQuizItems = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const [quizDeck, setQuizDeck] = useState(() => shuffleQuizItems(ARABIC_BRAILLE_REGISTRY.filter(it => Array.isArray(it.dots) && it.dots.length > 0)));
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState(null);

  useEffect(() => {
    if (quizTimerRef.current) {
      clearTimeout(quizTimerRef.current);
      quizTimerRef.current = null;
    }
    setQuizDeck(shuffleQuizItems(quizPool));
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

  const currentQuizItem = useMemo(() => {
    if (!quizDeck || quizDeck.length === 0) {
      return quizPool[0] || ARABIC_BRAILLE_REGISTRY[0];
    }
    return quizDeck[quizIndex % quizDeck.length];
  }, [quizDeck, quizIndex, quizPool]);

  const quizChoices = useMemo(() => {
    const targetDotsKey = (currentQuizItem.cells
      ? currentQuizItem.cells.map(c => c.join(',')).join('|')
      : (currentQuizItem.dots || []).join(','));
    const seenPatterns = new Set([targetDotsKey]);
    const candidates = shuffleQuizItems(ARABIC_BRAILLE_REGISTRY.filter(it => it.id !== currentQuizItem.id && Array.isArray(it.dots) && it.dots.length > 0));
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
    return shuffleQuizItems([currentQuizItem, ...distractors]);
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
        setQuizDeck(shuffleQuizItems(quizPool));
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
      sfx.playSuccessChime();
      const nextStreak = quizStreak + 1;
      const streakBonus = nextStreak >= 3 ? 5 : 0;
      setQuizScore(s => s + 10 + streakBonus);
      setQuizStreak(nextStreak);
      setBestStreak(b => Math.max(b, nextStreak));
      setQuizCorrect(c => c + 1);
      setQuizFeedback({
        type: 'correct',
        selectedId: item.id,
        msg: lang === 'ur'
          ? `صحیح! ${currentQuizItem.char} (${currentQuizItem.nameUrdu || currentQuizItem.title}) [${dotsText}]${streakBonus ? ' (+5 بونس!)' : ''}`
          : `Correct! ${currentQuizItem.char} (${currentQuizItem.nameEn || currentQuizItem.title}) [${dotsText}]${streakBonus ? ' (+5 bonus!)' : ''}`
      });
    } else {
      sfx.playMistakeThud();
      setQuizStreak(0);
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

  // Encyclopedia State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedState(true);
      announce(`${label || text} ${t.actions.copied}`);
      setTimeout(() => setCopiedState(false), 1800);
    }
  };

  return (
    <div
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
      className="flex flex-col min-h-screen bg-[#051C15] text-slate-100 font-sans selection:bg-[#D4AF37]/30 selection:text-[#FFD700]"
    >
      {/* Live Accessibility Screen-Reader Region */}
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      {/* Top Header Bar */}
      <header className="flex-none pt-4 pb-3 px-4 md:px-6 bg-gradient-to-b from-[#0B3023] to-transparent border-b border-[#D4AF37]/15">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#D4AF37]">
              {t.appTitle}
            </h1>
            <p className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold opacity-90">
              {t.appSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Language Pill */}
            <button
              onClick={() => setLang(l => (l === 'ur' ? 'en' : 'ur'))}
              className="px-3 py-1.5 rounded-full bg-[#0B3023] hover:bg-[#1A4D3E] border border-[#D4AF37]/30 text-xs font-bold text-[#FFD700] transition flex items-center gap-1 shadow-sm"
              title="Toggle Urdu / English"
            >
              <span>{lang === 'ur' ? 'English' : 'اردو'}</span>
            </button>

            {/* Welcome Audio */}
            <button
              onClick={() => speakArabic('أَهْلاً وَسَهْلاً بِكُمْ فِي مُعَلِّمِ الْبَرِيلِ الْعَرَبِيِّ')}
              className="p-2 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/30 transition"
              title={t.actions.listen}
            >
              <IconVolume className="w-4 h-4" />
            </button>

            {/* Settings Gear Modal Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full bg-[#0B3023] hover:bg-[#1A4D3E] border border-[#D4AF37]/30 text-[#D4AF37] transition shadow-sm"
              title={t.settings.title}
            >
              <IconGear className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspaces */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-4 flex flex-col gap-4">

        {/* ================================================================== */}
        {/* TAB 1: PERKINS STUDIO                                              */}
        {/* ================================================================== */}
        {activeTab === 'perkins' && (
          <div className="flex-1 flex flex-col gap-4">
            {/* Active Cell Display Card */}
            <section className="bg-[#0B3023]/85 rounded-3xl border border-[#D4AF37]/25 p-5 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl">
              <div className="w-full flex justify-between items-center mb-2">
                <div className="flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-[10px] border border-emerald-700/50 text-emerald-300 uppercase tracking-wider font-semibold">
                    {t.studio.activeCell}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-[10px] border border-emerald-700/50 text-[#FFD700] uppercase tracking-wider font-semibold">
                    {currentCellDots.length ? `${t.studio.dotsActive}: ${currentCellDots.join(', ')}` : t.studio.none}
                  </span>
                </div>
                {currentCellMatch && (
                  <button
                    onClick={() => speakArabic(currentCellMatch.char)}
                    className="p-1.5 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/40 transition"
                    title={t.actions.listen}
                  >
                    <IconVolume className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center gap-8 my-2">
                <div className="text-7xl font-serif text-[#D4AF37] select-none leading-none">
                  {currentCellMatch ? currentCellMatch.char : 'ـ'}
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-5xl tracking-tighter text-white select-none">
                    {dotsToUnicode(currentCellDots)}
                  </div>
                  <div className="text-xs font-mono text-emerald-400/80 mt-1">
                    U+{dotsToUnicode(currentCellDots).charCodeAt(0).toString(16).toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-col items-center">
                <span className="text-lg font-bold text-emerald-50 leading-none">
                  {currentCellMatch ? (lang === 'ur' ? currentCellMatch.nameUrdu : currentCellMatch.nameEn) : t.studio.chordSelected}
                </span>
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest mt-1 font-semibold">
                  {t.studio.unifiedRegistry}
                </span>
              </div>
            </section>

            {/* Perkins 6-Dot Tactile Inputs */}
            <section aria-label="Perkins Brailler Inputs" className="flex-1 flex flex-col justify-center gap-3 py-2">
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 max-w-[280px] mx-auto">
                {/* Column 1: Dots 1, 2, 3 */}
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map(dotNum => {
                    const isActive = currentCellDots.includes(dotNum);
                    return (
                      <button
                        key={dotNum}
                        onClick={() => toggleDot(dotNum)}
                        aria-pressed={isActive}
                        className={`w-28 h-14 rounded-2xl font-bold flex items-center justify-between px-4 transition-all duration-150 border active:scale-95 ${
                          isActive
                            ? 'bg-[#FFD700] text-slate-950 border-[#D4AF37] shadow-[0_0_20px_rgba(255,215,0,0.35)] translate-y-0.5'
                            : 'bg-[#1A4D3E] text-emerald-100 hover:bg-[#236350] border-emerald-800/30'
                        }`}
                      >
                        <span className="text-sm uppercase tracking-wider">{lang === 'ur' ? `نقطہ ${dotNum}` : `Dot ${dotNum}`}</span>
                        <div className={`w-4 h-4 rounded-full border ${isActive ? 'bg-slate-950 border-slate-950' : 'bg-transparent border-emerald-300'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Column 2: Dots 4, 5, 6 */}
                <div className="flex flex-col gap-3">
                  {[4, 5, 6].map(dotNum => {
                    const isActive = currentCellDots.includes(dotNum);
                    return (
                      <button
                        key={dotNum}
                        onClick={() => toggleDot(dotNum)}
                        aria-pressed={isActive}
                        className={`w-28 h-14 rounded-2xl font-bold flex items-center justify-between px-4 transition-all duration-150 border active:scale-95 ${
                          isActive
                            ? 'bg-[#FFD700] text-slate-950 border-[#D4AF37] shadow-[0_0_20px_rgba(255,215,0,0.35)] translate-y-0.5'
                            : 'bg-[#1A4D3E] text-emerald-100 hover:bg-[#236350] border-emerald-800/30'
                        }`}
                      >
                        <span className="text-sm uppercase tracking-wider">{lang === 'ur' ? `نقطہ ${dotNum}` : `Dot ${dotNum}`}</span>
                        <div className={`w-4 h-4 rounded-full border ${isActive ? 'bg-slate-950 border-slate-950' : 'bg-transparent border-emerald-300'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar (Punch, Clear, Delete) */}
              <div className="flex gap-2 max-w-[340px] mx-auto w-full mt-2">
                <button
                  onClick={clearCell}
                  className="flex-1 py-3 px-3 rounded-2xl bg-[#2A1A10] hover:bg-[#3D2518] text-rose-300 border border-[#D4AF37]/30 text-xs font-bold transition flex items-center justify-center gap-1 active:scale-95"
                >
                  <span>{t.actions.clear}</span>
                </button>

                <button
                  onClick={punchCell}
                  className="flex-[2] py-3 px-4 rounded-2xl bg-[#D4AF37] hover:bg-[#FFD700] text-slate-950 font-bold text-sm transition shadow-[0_4px_16px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>{t.actions.punch}</span>
                </button>

                <button
                  onClick={deleteLastPunched}
                  className="flex-1 py-3 px-3 rounded-2xl bg-[#0B3023] hover:bg-[#1A4D3E] text-emerald-300 border border-emerald-700/40 text-xs font-bold transition flex items-center justify-center gap-1 active:scale-95"
                >
                  <span>{t.actions.delete}</span>
                </button>
              </div>
            </section>

            {/* Punched Tape Stream */}
            <section className="bg-[#0B3023]/60 rounded-2xl border border-[#D4AF37]/20 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">{t.studio.tapeHistory}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(punchedTape.map(p => dotsToUnicode(p.dots)).join(''), 'Unicode')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <IconCopy className="w-3.5 h-3.5" />
                    <span>{copiedState ? t.actions.copied : t.actions.copy}</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 min-h-[70px]">
                {punchedTape.length === 0 ? (
                  <p className="text-xs text-emerald-600/70">{t.studio.noPunchedCells}</p>
                ) : (
                  punchedTape.map((p, idx) => (
                    <div key={idx} className="flex-none flex flex-col items-center bg-[#051C15] px-2.5 py-1.5 rounded-xl border border-[#D4AF37]/20">
                      <span className="text-xl text-[#FFD700] select-none font-serif">{p.char}</span>
                      <span className="text-2xl text-white select-none">{dotsToUnicode(p.dots)}</span>
                      <span className="text-[9px] text-emerald-400/80 font-mono mt-0.5">[{p.dots.join(',')}]</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: TRANSLATOR WORKSPACE (Grade 1 & Grade 2 Support)           */}
        {/* ================================================================== */}
        {activeTab === 'translator' && (
          <div className="flex-1 flex flex-col gap-4">
            {/* Header & Contraction Toggle */}
            <div className="bg-[#0B3023]/80 rounded-2xl border border-[#D4AF37]/25 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <h2 className="text-base font-bold text-[#D4AF37]">{t.translator.title}</h2>
                <p className="text-xs text-emerald-300/80">{t.rules.subtitle}</p>
              </div>

              {/* Grade 1 vs Grade 2 Toggle */}
              <div className="flex items-center bg-[#051C15] p-1 rounded-xl border border-[#D4AF37]/30 self-stretch md:self-auto">
                <button
                  onClick={() => setContractionLevel(1)}
                  className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    contractionLevel === 1 ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-emerald-400 hover:text-emerald-200'
                  }`}
                >
                  {t.translator.grade1Badge}
                </button>
                <button
                  onClick={() => setContractionLevel(2)}
                  className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    contractionLevel === 2 ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-emerald-400 hover:text-emerald-200'
                  }`}
                >
                  {t.translator.grade2Badge}
                </button>
              </div>
            </div>

            {/* Presets Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[11px] font-bold text-[#D4AF37] flex-none">{t.translator.presetsLabel}</span>
              {translatorPresets.map((pr, idx) => (
                <button
                  key={idx}
                  onClick={() => setArabicInput(pr.text)}
                  className="flex-none px-2.5 py-1 rounded-lg bg-[#0B3023] hover:bg-[#1A4D3E] text-xs border border-[#D4AF37]/20 text-emerald-200 hover:text-white transition"
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
                  onClick={() => speakArabic(arabicInput)}
                  className="text-xs text-emerald-400 hover:text-emerald-200 flex items-center gap-1"
                >
                  <IconVolume className="w-3.5 h-3.5" />
                  <span>{t.actions.listen}</span>
                </button>
              </label>
              <textarea
                value={arabicInput}
                onChange={e => setArabicInput(e.target.value)}
                rows={4}
                className="w-full bg-[#051C15] border border-emerald-800/60 rounded-xl p-3 text-lg font-serif text-[#FFD700] focus:outline-none focus:border-[#D4AF37] resize-none"
              />

              {/* Live Braille Output Display */}
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-emerald-400">{t.translator.brailleOutputLabel}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => exportToBRF(outputBrailleUnicode)}
                      disabled={!outputBrailleUnicode}
                      className="text-xs text-[#D4AF37] hover:text-[#FFD700] hover:underline flex items-center gap-1 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      title={t.actions.exportBRF}
                    >
                      <IconDownload className="w-3.5 h-3.5" />
                      <span>{t.actions.exportBRF}</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(outputBrailleUnicode, 'Braille')}
                      className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      <IconCopy className="w-3 h-3" />
                      <span>{copiedState ? t.actions.copied : t.actions.copy}</span>
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-[#051C15] rounded-xl border border-[#D4AF37]/30 text-2xl tracking-widest text-white min-h-[56px] select-all">
                  {outputBrailleUnicode || '⠠⠠⠠'}
                </div>
              </div>
            </div>

            {/* Individual Cell Rule Inspector Stream */}
            <div className="bg-[#0B3023]/60 rounded-2xl border border-[#D4AF37]/20 p-4">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
                {t.rules.ruleInspection}
              </span>
              <div className="flex items-center gap-2.5 overflow-x-auto py-2">
                {parsedBrailleCells.map((c, idx) => (
                  <div key={idx} className="flex-none flex flex-col items-center bg-[#051C15] p-2.5 rounded-xl border border-[#D4AF37]/20 min-w-[70px]">
                    <span className="text-xl font-serif text-[#FFD700]">{c.display}</span>
                    <BrailleCellSVG dots={c.dots} size="sm" />
                    <span className="text-[10px] text-emerald-300 font-bold mt-1 text-center truncate max-w-[75px]">
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

        {/* ================================================================== */}
        {/* TAB 3: RULES GUIDE (Interactive Educational Reference)             */}
        {/* ================================================================== */}
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
                      onClick={() => {
                        setArabicInput(rule.exampleArabic);
                        setActiveTab('translator');
                        announce(`Loaded ${rule.exampleArabic} into Translator`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-bold transition flex items-center gap-1 flex-none"
                    >
                      <span>{t.actions.testInTranslator}</span>
                    </button>
                  </div>

                  {/* Demonstration Comparison Stream */}
                  <div className="bg-[#051C15] rounded-xl p-3 border border-emerald-800/40 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[11px] text-emerald-400">
                      <span><strong>{t.rules.standardInput}:</strong> {rule.exampleArabic}</span>
                      <span className="text-[#D4AF37] font-mono">
                        {lang === 'ur' ? rule.demonstration.explanationUrdu : rule.demonstration.explanationEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto py-1">
                      {rule.demonstration.cells.map((c, i) => (
                        <div key={i} className="flex-none flex flex-col items-center bg-[#0B3023]/80 p-2 rounded-xl border border-[#D4AF37]/20 min-w-[65px]">
                          <span className="text-lg font-serif text-[#FFD700]">{c.label}</span>
                          <BrailleCellSVG dots={c.dots} size="sm" />
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
                                  <BrailleCellSVG dots={item.cells[0]} size="sm" />
                                  <span className="text-[8px] text-emerald-400 font-mono mt-0.5">[3,6]</span>
                                </div>
                                <span className="text-emerald-500 font-bold text-xs">+</span>
                                <div className="flex flex-col items-center">
                                  <BrailleCellSVG dots={item.cells[1]} size="sm" />
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
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: PRACTICE / TUTOR                                            */}
        {/* ================================================================== */}
        {activeTab === 'practice' && (
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-[#0B3023]/80 rounded-2xl border border-[#D4AF37]/25 p-4 flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                  <h2 className="text-base font-bold text-[#D4AF37]">{t.practice.title}</h2>
                  <p className="text-xs text-emerald-300/80">{t.practice.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={handleResetQuizStats}
                  className="px-2.5 py-1.5 rounded-xl bg-[#051C15] hover:bg-[#1A4D3E] text-emerald-300/80 hover:text-white border border-[#D4AF37]/20 text-[11px] font-semibold transition active:scale-95"
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

            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: t.reference.categories.all },
                { id: 'alphabet', label: t.reference.categories.alphabet },
                { id: 'harakat', label: t.reference.categories.harakat },
                { id: 'markers', label: t.reference.categories.markers },
                { id: 'numbers', label: t.reference.categories.numbers },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setQuizCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-none border ${
                    quizCategory === cat.id
                      ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                      : 'bg-[#0B3023] text-emerald-300 border-[#D4AF37]/20 hover:bg-[#1A4D3E]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Question Card */}
            <div className="bg-[#0B3023]/70 rounded-3xl border border-[#D4AF37]/20 p-6 flex flex-col items-center gap-4">
              <span className="px-2.5 py-0.5 rounded-full bg-[#051C15] border border-[#D4AF37]/25 text-[11px] font-bold text-[#D4AF37]">
                {currentQuizItem.category === 'alphabet' ? t.reference.categories.alphabet
                  : currentQuizItem.category === 'harakat' ? t.reference.categories.harakat
                  : currentQuizItem.category === 'markers' ? t.reference.categories.markers
                  : t.reference.categories.numbers}
              </span>

              <span className="text-sm font-semibold text-emerald-200 text-center">
                {t.practice.identifyChar}
              </span>

              <div dir="ltr" className="p-4 bg-[#051C15] rounded-2xl border border-[#D4AF37]/30 shadow-inner flex items-center gap-3">
                {currentQuizItem.cells ? (
                  currentQuizItem.cells.map((cellDots, cIdx) => (
                    <BrailleCellSVG key={cIdx} dots={cellDots} size="lg" />
                  ))
                ) : (
                  <BrailleCellSVG dots={currentQuizItem.dots || []} size="lg" />
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
                <div className={`text-sm font-bold px-4 py-2 rounded-xl text-center ${
                  quizFeedback.type === 'correct' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500' : 'bg-rose-950 text-rose-200 border border-rose-500'
                }`}>
                  {quizFeedback.msg}
                </div>
              )}

              {/* 4 Multi-Choice Options */}
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
                      key={choice.id}
                      disabled={!!quizFeedback}
                      onClick={() => handleQuizAnswer(choice)}
                      className={`min-h-[56px] p-3.5 rounded-2xl border flex items-center justify-between transition-all active:scale-95 ${cardStyle}`}
                    >
                      <span className="text-3xl font-serif text-[#FFD700]">{choice.char}</span>
                      <span className="text-xs font-bold text-white text-end">
                        {lang === 'ur' ? (choice.nameUrdu || choice.title) : (choice.nameEn || choice.title)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="w-full max-w-md flex justify-between items-center mt-1 gap-2">
                <button
                  onClick={() => setShowQuizHint(h => !h)}
                  className="px-3.5 py-2 rounded-xl bg-[#051C15] hover:bg-[#1A4D3E] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold transition"
                >
                  {lang === 'ur' ? (showQuizHint ? 'اشارہ چھپائیں' : 'نقاط کا اشارہ') : (showQuizHint ? 'Hide Hint' : 'Hint')}
                </button>
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 rounded-xl bg-[#051C15] hover:bg-[#1A4D3E] text-emerald-300 border border-[#D4AF37]/30 text-xs font-bold transition"
                >
                  {lang === 'ur' ? 'اگلا بے ترتیب سوال' : 'Next Random Question'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 5: REFERENCE / ENCYCLOPEDIA                                    */}
        {/* ================================================================== */}
        {activeTab === 'reference' && (
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-[#0B3023]/80 rounded-2xl border border-[#D4AF37]/25 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <h2 className="text-base font-bold text-[#D4AF37]">{t.reference.title}</h2>
                <p className="text-xs text-emerald-300/80">{ARABIC_BRAILLE_REGISTRY.length} Unified Characters</p>
              </div>

              {/* Search Box */}
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.reference.searchPlaceholder}
                className="bg-[#051C15] border border-emerald-700/50 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full md:w-64"
              />
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
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-none border ${
                    selectedCategory === cat.id
                      ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                      : 'bg-[#0B3023] text-emerald-300 border-[#D4AF37]/20 hover:bg-[#1A4D3E]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Registry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredRegistry.map(item => (
                <div
                  key={item.id}
                  className="bg-[#0B3023]/70 hover:bg-[#0B3023] rounded-2xl border border-[#D4AF37]/20 p-3.5 flex flex-col justify-between transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-3xl font-serif text-[#FFD700] font-bold leading-none">{item.char}</div>
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
                          <BrailleCellSVG dots={item.cells[0]} size="sm" />
                        </div>

                        {/* Cell 2: Specific Awqaf Letter on the Right */}
                        <div className="p-1 bg-emerald-950/60 rounded-lg flex items-center justify-center">
                          <BrailleCellSVG dots={item.cells[1]} size="sm" />
                        </div>
                      </div>
                    ) : (
                      <BrailleCellSVG dots={item.dots} size="sm" />
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#D4AF37]/15 flex flex-col gap-1.5 text-xs">
                    {item.description && (
                      <p className="text-[11px] text-emerald-200/95 font-arabic leading-relaxed text-right">
                        {item.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-xs mt-1">
                      <span className="text-[10px] text-emerald-400/80 font-serif truncate max-w-[150px]">
                        {item.example ? `مثال: ${item.example}` : ''}
                      </span>
                      <button
                        onClick={() => speakArabic(item.char || item.title)}
                        className="p-1 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 shrink-0"
                        title="سنیں"
                      >
                        <IconVolume className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Settings Modal Dialog */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div
            dir={lang === 'ur' ? 'rtl' : 'ltr'}
            className="bg-[#0B3023] border border-[#D4AF37]/40 rounded-3xl max-w-lg w-full p-6 flex flex-col gap-5 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-3">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <IconGear className="w-5 h-5" />
                <h3 className="text-lg font-bold">{t.settings.title}</h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-emerald-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Language Setting */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#D4AF37] uppercase">{t.settings.language}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLang('ur')}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition ${
                    lang === 'ur' ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#051C15] text-emerald-200 border-emerald-800/50'
                  }`}
                >
                  اردو (Urdu)
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition ${
                    lang === 'en' ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#051C15] text-emerald-200 border-emerald-800/50'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Contraction Level */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#D4AF37] uppercase">{t.settings.contractionLevel}</label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setContractionLevel(1)}
                  className={`p-3 rounded-xl text-xs font-bold text-left border transition ${
                    contractionLevel === 1 ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#051C15] text-emerald-200 border-emerald-800/50'
                  }`}
                >
                  {t.settings.grade1}
                </button>
                <button
                  onClick={() => setContractionLevel(2)}
                  className={`p-3 rounded-xl text-xs font-bold text-left border transition ${
                    contractionLevel === 2 ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#051C15] text-emerald-200 border-emerald-800/50'
                  }`}
                >
                  {t.settings.grade2}
                </button>
              </div>
            </div>

            {/* Perkins Key Map Guide */}
            <div className="bg-[#051C15] p-4 rounded-2xl border border-emerald-800/50 flex flex-col gap-2">
              <span className="text-xs font-bold text-[#D4AF37]">{t.settings.keyboardGuide}</span>
              <p className="text-[11px] text-emerald-200">{t.settings.keysLeft}</p>
              <p className="text-[11px] text-emerald-200">{t.settings.keysRight}</p>
              <p className="text-[11px] text-emerald-400 font-mono mt-1">{t.settings.keysAction}</p>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#FFD700] text-slate-950 font-bold text-sm transition mt-1"
            >
              {t.actions.close}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Dock */}
      <nav aria-label="Main Navigation" className="flex-none h-20 bg-[#0B3023] border-t border-[#D4AF37]/25 px-4 flex items-center justify-around pb-4 mt-auto">
        <button
          onClick={() => { setActiveTab('perkins'); announce(t.tabs.perkins); }}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'perkins' ? 'text-[#D4AF37]' : 'text-emerald-700 hover:text-emerald-500'
          }`}
        >
          <IconKeyboard className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.tabs.perkins}</span>
        </button>

        <button
          onClick={() => { setActiveTab('translator'); announce(t.tabs.translator); }}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'translator' ? 'text-[#D4AF37]' : 'text-emerald-700 hover:text-emerald-500'
          }`}
        >
          <IconTranslate className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.tabs.translator}</span>
        </button>

        <button
          onClick={() => { setActiveTab('rules'); announce(t.tabs.rules); }}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'rules' ? 'text-[#D4AF37]' : 'text-emerald-700 hover:text-emerald-500'
          }`}
        >
          <IconRules className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.tabs.rules}</span>
        </button>

        <button
          onClick={() => { setActiveTab('practice'); announce(t.tabs.practice); }}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'practice' ? 'text-[#D4AF37]' : 'text-emerald-700 hover:text-emerald-500'
          }`}
        >
          <IconAward className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.tabs.practice}</span>
        </button>

        <button
          onClick={() => { setActiveTab('reference'); announce(t.tabs.reference); }}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'reference' ? 'text-[#D4AF37]' : 'text-emerald-700 hover:text-emerald-500'
          }`}
        >
          <IconBook className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.tabs.reference}</span>
        </button>
      </nav>
    </div>
  );
}
