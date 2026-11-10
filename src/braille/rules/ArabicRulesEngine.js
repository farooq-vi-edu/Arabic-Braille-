/**
 * Arabic Braille Transcription & Rules Engine
 * Enforces unified Arabic and Quranic Braille orthography standards.
 */

export const BRAILLE_REGISTRY = {
  // Letters
  'ا': { id: 'alif', char: 'ا', dots: [1], urdu: 'الف', en: 'Alif' },
  'ب': { id: 'baa', char: 'ب', dots: [1, 2], urdu: 'با', en: 'Baa' },
  'ت': { id: 'taa', char: 'ت', dots: [2, 3, 4, 5], urdu: 'تا', en: 'Taa' },
  'ث': { id: 'thaa', char: 'ث', dots: [1, 4, 5, 6], urdu: 'ثا', en: 'Thaa' },
  'ج': { id: 'jeem', char: 'ج', dots: [2, 4, 5], urdu: 'جيم', en: 'Jeem' },
  'ح': { id: 'haa', char: 'ح', dots: [1, 5, 6], urdu: 'حا', en: 'Haa' },
  'خ': { id: 'khaa', char: 'خ', dots: [1, 3, 4, 6], urdu: 'خا', en: 'Khaa' },
  'د': { id: 'daal', char: 'د', dots: [1, 4, 5], urdu: 'دال', en: 'Daal' },
  'ذ': { id: 'zhaal', char: 'ذ', dots: [2, 3, 4, 6], urdu: 'ذال', en: 'Zhaal' },
  'ر': { id: 'raa', char: 'ر', dots: [1, 2, 3, 5], urdu: 'را', en: 'Raa' },
  'ز': { id: 'zay', char: 'ز', dots: [1, 3, 5, 6], urdu: 'زا / زے', en: 'Zay' },
  'س': { id: 'seen', char: 'س', dots: [2, 3, 4], urdu: 'سين', en: 'Seen' },
  'ش': { id: 'sheen', char: 'ش', dots: [1, 4, 6], urdu: 'شين', en: 'Sheen' },
  'ص': { id: 'saad', char: 'ص', dots: [1, 2, 3, 4, 6], urdu: 'صاد', en: 'Saad' },
  'ض': { id: 'daad', char: 'ض', dots: [1, 2, 4, 6], urdu: 'ضاد', en: 'Daad' },
  'ط': { id: 'taa_heavy', char: 'ط', dots: [2, 3, 4, 5, 6], urdu: 'طا', en: 'Taa (Emphatic)' },
  'ظ': { id: 'zaa', char: 'ظ', dots: [1, 2, 3, 4, 5, 6], urdu: 'ظا', en: 'Zaa (Emphatic)' },
  'ع': { id: 'ayn', char: 'ع', dots: [1, 2, 3, 5, 6], urdu: 'عين', en: 'Ayn' },
  'غ': { id: 'ghayn', char: 'غ', dots: [1, 2, 6], urdu: 'غين', en: 'Ghayn' },
  'ف': { id: 'faa', char: 'ف', dots: [1, 2, 4], urdu: 'فا', en: 'Faa' },
  'ق': { id: 'qaaf', char: 'ق', dots: [1, 2, 3, 4, 5], urdu: 'قاف', en: 'Qaaf' },
  'ك': { id: 'kaaf', char: 'ك', dots: [1, 3], urdu: 'كاف', en: 'Kaaf' },
  'ک': { id: 'kaaf_urdu', char: 'ک', dots: [1, 3], urdu: 'کاف', en: 'Kaaf' },
  'ل': { id: 'laam', char: 'ل', dots: [1, 2, 3], urdu: 'لام', en: 'Laam' },
  'م': { id: 'meem', char: 'م', dots: [1, 3, 4], urdu: 'ميم', en: 'Meem' },
  'ن': { id: 'noon', char: 'ن', dots: [1, 3, 4, 5], urdu: 'نون', en: 'Noon' },
  'ه': { id: 'haa_soft', char: 'ه', dots: [1, 2, 5], urdu: 'ہائے ہوز', en: 'Haa' },
  'ہ': { id: 'haa_urdu', char: 'ہ', dots: [1, 2, 5], urdu: 'چھوٹی ہ', en: 'Haa' },
  'و': { id: 'waw', char: 'و', dots: [2, 4, 5, 6], urdu: 'واؤ', en: 'Waw' },
  'ي': { id: 'yaa', char: 'ي', dots: [2, 4], urdu: 'يا (معیاری)', en: 'Standard Yaa', context: 'Beginning, middle, or end of word (e.g. فِي, قِيلَ, الَّذِي)' },
  'ی': { id: 'yaa_urdu', char: 'ی', dots: [2, 4], urdu: 'چھوٹی ی', en: 'Yaa (Urdu/Farsi)' },
  'ة': { id: 'taa_marbuta', char: 'ة', dots: [1, 6], urdu: 'تائے مربوطہ', en: 'Taa Marbuta' },
  'أ': { id: 'alif_hamza_above', char: 'أ', dots: [1, 4], urdu: 'الف مع ہمزہ بالا', en: 'Alif Hamza Above' },
  'إ': { id: 'alif_hamza_below', char: 'إ', dots: [4, 6], urdu: 'الف مع ہمزہ زیر', en: 'Alif Hamza Below' },
  'ؤ': { id: 'waw_hamza', char: 'ؤ', dots: [1, 2, 5, 6], urdu: 'واؤ مع ہمزہ', en: 'Waw Hamza' },
  'ئ': { id: 'yaa_hamza', char: 'ئ', dots: [1, 3, 4, 5, 6], urdu: 'یا مع ہمزہ', en: 'Yaa Hamza' },
  'ء': { id: 'hamza_isolated', char: 'ء', dots: [3], urdu: 'ہمزہ مفرد', en: 'Isolated Hamza' },
  'ى': { id: 'alif_maqsoorah', char: 'ى', dots: [1, 3, 5], urdu: 'الف مقصورہ', en: 'Alif Maqsoorah', context: 'Exclusively terminal carrying dagger alif or preceded by Fathah (e.g. عَلَىٰ, مَوْلَىٰ, هُدًى)' },
  'لا': { id: 'laam_alif', char: 'لا', dots: [1, 2, 3, 6], urdu: 'لام الف مرکب', en: 'Laam-Alif' },

  // Harakat & Vocalization
  '\u064E': { id: 'fathah', char: 'َ', dots: [2], urdu: 'زبر / فتحہ', en: 'Fathah' },
  '\u0650': { id: 'kasrah', char: 'ِ', dots: [1, 5], urdu: 'زیر / کسرہ', en: 'Kasrah' },
  '\u064F': { id: 'dammah', char: 'ُ', dots: [1, 3, 6], urdu: 'پیش / ضمہ', en: 'Dammah' },
  '\u064B': { id: 'tanween_fath', char: 'ً', dots: [2, 3], urdu: 'دو زبر / تنوین فتح', en: 'Tanween Fath' },
  '\u064D': { id: 'tanween_kasr', char: 'ٍ', dots: [3, 5], urdu: 'دو زیر / تنوین کسر', en: 'Tanween Kasr' },
  '\u064C': { id: 'tanween_damm', char: 'ٌ', dots: [2, 6], urdu: 'دو پیش / تنوین ضم', en: 'Tanween Damm' },
  '\u0670': { id: 'dagger_alif', char: 'ٰ', dots: [4], urdu: 'کھڑا زبر / الف خنجریہ', en: 'Dagger Alif' },
  '\u0656': { id: 'khari_zair', char: 'ٖ', dots: [4, 5], urdu: 'کھڑی زیر', en: 'Subscript Alef' },
  '\u0657': { id: 'inverted_dammah', char: 'ٗ', dots: [3, 4, 6], urdu: 'الٹا پیش', en: 'Inverted Dammah' },
  '\u0652': { id: 'sukoon', char: 'ْ', dots: [2, 5], urdu: 'جزم / سکون', en: 'Sukoon' },
  '\u06E1': { id: 'quranic_sukoon', char: 'ۡ', dots: [2, 5], urdu: 'جزم قرآنی / سکون', en: 'Quranic Sukoon' },
  '\u06E4': { id: 'madda_comp', char: 'ۤ', dots: [3, 4, 5], urdu: 'مدّ قرآنی', en: 'Maddah' },
  '\u0653': { id: 'maddah', char: 'ٓ', dots: [3, 4, 5], urdu: 'مدّ', en: 'Maddah' },
  '\u0654': { id: 'hamza_above', char: 'ٔ', dots: [3], urdu: 'ہمزہ بالا', en: 'Hamza Above' },

  // Special Markers & Waqf (رموزِ اوقاف قرآن مجید)
  '\u0651': { id: 'shaddah', char: 'ّ', dots: [6], urdu: 'شدّ / تشدید (حرف سے پہلے)', en: 'Shaddah' },
  'waqf_marker': { id: 'waqf_marker', char: 'ۚ', title: 'رموزِ اوقاف اشاریہ', dots: [3, 6], urdu: 'رموزِ اوقاف اشاریہ', en: 'Waqf Marker' },
  'waqf_laazim_m': { id: 'waqf_laazim_m', char: 'م', title: 'وقف لازم (م)', dots: [1, 3, 4], cells: [[3, 6], [1, 3, 4]], urdu: 'وقف لازم (م)', en: 'Waqf Laazim (Meem)', meaning: 'یہاں وقف کرنا لازم ہے، نہ ٹھہرنے کی صورت میں معنی خراب ہو سکتے ہیں۔' },
  'waqf_mutlaq_t': { id: 'waqf_mutlaq_t', char: 'ط', title: 'وقف مطلق (ط)', dots: [1, 4, 5], cells: [[3, 6], [1, 4, 5]], urdu: 'وقف مطلق (ط)', en: 'Waqf Mutlaq (Tah)', meaning: 'وقفِ تام کی علامت ہے، یہاں ٹھہرنا چاہیے۔' },
  'waqf_jaaiz_j': { id: 'waqf_jaaiz_j', char: 'ج', title: 'وقف جائید (ج)', dots: [2, 4, 5], cells: [[3, 6], [2, 4, 5]], urdu: 'وقف جائید (ج)', en: 'Waqf Jaaiz (Jeem)', meaning: 'یہاں ٹھہرنا اور نہ ٹھہرنا دونوں جائز ہیں۔' },
  'waqf_mujawwaz_z': { id: 'waqf_mujawwaz_z', char: 'ز', title: 'علامتِ وقفِ مجوز (ز)', dots: [1, 3, 5, 6], cells: [[3, 6], [1, 3, 5, 6]], urdu: 'علامتِ وقفِ مجوز (ز)', en: 'Waqf Mujawwaz (Zay)', meaning: 'یہاں نہ ٹھہرنا بہتر ہے۔' },
  'waqf_murakhkhas_s': { id: 'waqf_murakhkhas_s', char: 'ص', title: 'علامتِ وقفِ مرخص (ص)', dots: [1, 2, 3, 4, 6], cells: [[3, 6], [1, 2, 3, 4, 6]], urdu: 'علامتِ وقفِ مرخص (ص)', en: 'Waqf Murakh-khas (Saad)', meaning: 'ملا کر پڑھنا چاہیے لیکن اگر کوئی تھکن کی وجہ سے ٹھہر جائے تو رخصت ہے۔' },
  'waqf_al_wasl_awla_sl': { id: 'waqf_al_wasl_awla_sl', char: 'صل', title: 'الوصل اولى (صل)', dots: [1, 2, 3, 4, 5], cells: [[3, 6], [1, 2, 3, 4, 5]], urdu: 'الوصل اولى (صل)', en: 'Al-Wasl Awla (Sad-Lam)', meaning: 'ملا کر پڑھنا بہتر ہے۔' },
  'waqf_qif_q': { id: 'waqf_qif_q', char: 'ق', title: 'قِف / قلی (ق)', dots: [1, 2, 3, 4, 5], cells: [[3, 6], [1, 2, 3, 4, 5]], urdu: 'قِف / قلی (ق)', en: 'Qif / Qila (Qaf)', meaning: 'وقف کے معنی میں ہے، یہاں ٹھہرنا چاہیے۔' },
  'waqf_qila_awla_qf': { id: 'waqf_qila_awla_qf', char: 'قف', title: 'قلی / وقف قلی (قف)', dots: [1, 2, 3, 4, 5], cells: [[3, 6], [1, 2, 3, 4, 5]], urdu: 'قلی / وقف قلی (قف)', en: 'Qila / Waqf Qila (Qaf-Fe)', meaning: 'وقف اولیٰ ہے۔' },
  'waqf_salle_qif': { id: 'waqf_salle_qif', char: 'صلّ', title: 'صلّ (قِف)', dots: [1, 2, 3, 4], cells: [[3, 6], [1, 2, 3, 4]], urdu: 'صلّ (قِف)', en: 'Salle / Qad Yusal', meaning: 'قد یصل کا مخفف ہے، یہاں ٹھہرنا بھی اور کبھی نہیں بھی۔' },
  'waqf_saktah_s': { id: 'waqf_saktah_s', char: 'س', title: 'سکتہ (س)', dots: [2, 3, 4], cells: [[3, 6], [2, 3, 4]], urdu: 'سکتہ (س)', en: 'Saktah (Seen)', meaning: 'یہاں کسی قدر ٹھہرنا چاہیے مگر سانس نہ ٹوٹنے پائے۔' },
  'waqf_waqfah': { id: 'waqf_waqfah', char: 'وقفہ', title: 'وقفہ', dots: [2, 3, 4, 5], cells: [[3, 6], [2, 3, 4, 5]], urdu: 'وقفہ', en: 'Waqfah', meaning: 'سکتہ کی نسبت زیادہ ٹھہرنا چاہیے لیکن سانس نہ ٹوٹے۔' },
  'waqf_la_mamnoo': { id: 'waqf_la_mamnoo', char: 'لا', title: 'لا (ممنوع وقف)', dots: [1, 2, 3], cells: [[3, 6], [1, 2, 3]], urdu: 'لا (ممنوع وقف)', en: 'La (Mamnoo Waqf)', meaning: 'یہاں ہرگز نہ ٹھہرنا چاہئے۔' },
  'waqf_kaf_kazalik': { id: 'waqf_kaf_kazalik', char: 'ک', title: 'کف (ک)', dots: [1, 3], cells: [[3, 6], [1, 3]], urdu: 'کف (ک)', en: 'Kaf (Kazalik)', meaning: 'کذلک کا مخفف ہے، اس سے مراد ہے کہ جو حکم پہلی آیت میں ہے وہی اس پر بھی ہے۔' },
  'waqf_muanaqah': { id: 'waqf_muanaqah', char: '∴', title: 'معانقہ (∴ ∴)', dots: [1, 4, 6], cells: [[3, 6], [1, 4, 6]], urdu: 'معانقہ (∴ ∴)', en: 'Muanaqah (Three Dots)', meaning: 'یہ تین نقطوں والے دو وقف قریب قریب آتے ہیں (معانقہ)، دونوں وقت میں سے ایک پر ٹھہرنا چاہئے۔' },
  'ۚ': { id: 'waqf_jaaiz_j', char: 'ۚ', title: 'وقف جائید (ج)', dots: [2, 4, 5], cells: [[3, 6], [2, 4, 5]], urdu: 'وقف جائید (ج)', en: 'Waqf Jaaiz (Jeem)' },
  'ؕ': { id: 'waqf_mutlaq_t', char: 'ؕ', title: 'وقف مطلق (ط)', dots: [1, 4, 5], cells: [[3, 6], [1, 4, 5]], urdu: 'وقف مطلق (ط)', en: 'Waqf Mutlaq (Tah)' },
  'ۘ': { id: 'waqf_laazim_m', char: 'ۘ', title: 'وقف لازم (م)', dots: [1, 3, 4], cells: [[3, 6], [1, 3, 4]], urdu: 'وقف لازم (م)', en: 'Waqf Laazim (Meem)' },
  'ۖ': { id: 'waqf_mujawwaz_z', char: 'ۖ', title: 'علامتِ وقفِ مجوز (ز)', dots: [1, 3, 5, 6], cells: [[3, 6], [1, 3, 5, 6]], urdu: 'علامتِ وقفِ مجوز (ز)', en: 'Waqf Mujawwaz (Zay)' },
  'ۛ': { id: 'waqf_muanaqah', char: 'ۛ', title: 'معانقہ (∴ ∴)', dots: [1, 4, 6], cells: [[3, 6], [1, 4, 6]], urdu: 'معانقہ (∴ ∴)', en: 'Muanaqah' },
  'ayah_marker': { id: 'ayah_marker', char: '۝', title: 'نشانِ آیت', dots: [2, 3, 5, 6], urdu: 'نشانِ آیت', en: 'Ayah Marker' },
  'num_sign': { id: 'num_sign', char: '#', dots: [3, 4, 5, 6], urdu: 'علامتِ عدد', en: 'Number Sign' },
  '\u283C': { id: 'braille_num_sign_sym', char: '⠼', dots: [3, 4, 5, 6], urdu: 'علامتِ عدد بریل', en: 'Number Sign' },
  '\u2832': { id: 'braille_full_stop_sym', char: '⠲', dots: [2, 5, 6], urdu: 'ختمہ / فل اسٹاپ (نقاط 2، 5، 6)', en: 'Full Stop [2,5,6]' }
};

export const NUMBER_DIGITS = {
  '٠': { char: '٠', dots: [2, 4, 5], urdu: 'صفر', en: '0' },
  '١': { char: '١', dots: [1], urdu: 'ایک', en: '1' },
  '٢': { char: '٢', dots: [1, 2], urdu: 'دو', en: '2' },
  '٣': { char: '٣', dots: [1, 4], urdu: 'تین', en: '3' },
  '٤': { char: '٤', dots: [1, 4, 5], urdu: 'چار', en: '4' },
  '٥': { char: '٥', dots: [1, 5], urdu: 'پانچ', en: '5' },
  '٦': { char: '٦', dots: [1, 2, 4], urdu: 'چھ', en: '6' },
  '٧': { char: '٧', dots: [1, 2, 4, 5], urdu: 'سات', en: '7' },
  '٨': { char: '٨', dots: [1, 2, 5], urdu: 'آٹھ', en: '8' },
  '٩': { char: '٩', dots: [2, 4], urdu: 'نو', en: '9' }
};

export function dotsToUnicode(dots) {
  if (!dots || dots.length === 0) return '\u2800';
  let mask = 0;
  dots.forEach(d => {
    if (d >= 1 && d <= 6) mask |= (1 << (d - 1));
  });
  return String.fromCharCode(0x2800 + mask);
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

/**
 * Programmatic Rules Definitions & Educational Inspector Metadata
 */
export const ARABIC_BRAILLE_RULES = [
  {
    id: 'shaddah_precedence',
    number: 1,
    titleUrdu: 'حرفِ مشدد کا قاعدہ (Shaddah Precedence)',
    titleEn: 'Shaddah Precedence Rule',
    descUrdu: 'بریل میں تشدید (شد) کا سیل [6] ہمیشہ مشدد حرف سے پہلے لکھا جاتا ہے، بعد میں نہیں۔',
    descEn: 'The Shaddah indicator cell [Dot 6] MUST precede the doubled consonant, never follow it.',
    exampleArabic: 'أَنَّ',
    demonstration: {
      standardInput: 'أَنَّ',
      explanationUrdu: 'أ [1,4] ➔ شدّ [6] ➔ ن [1,3,4,5] ➔ زبر [2]',
      explanationEn: 'Alif Hamza [1,4] ➔ Shaddah [6] ➔ Noon [1,3,4,5] ➔ Fathah [2]',
      cells: [
        { label: 'أ', dots: [1, 4], urdu: 'الف مع ہمزہ' },
        { label: 'ـّ', dots: [6], urdu: 'شدّ (قبل از حرف)' },
        { label: 'ن', dots: [1, 3, 4, 5], urdu: 'نون' },
        { label: 'ـَ', dots: [2], urdu: 'زبر' }
      ]
    }
  },
  {
    id: 'harakat_sequencing',
    number: 2,
    titleUrdu: 'حرکات اور تنوین کا تسلسل',
    titleEn: 'Harakat & Tanween Sequencing',
    descUrdu: 'حرکات (زبر، زیر، پیش)، تنوین اور کھڑے اعراب بغیر کسی وقفے کے بنیادی حرف کے فوراً بعد پیوستہ ہوتے ہیں۔',
    descEn: 'Vowels, Tanween, Sukoon, and vertical diacritics must immediately follow their base consonant with zero spacing.',
    exampleArabic: 'بِسْمِ اللَّهِ',
    demonstration: {
      standardInput: 'بِسْمِ',
      explanationUrdu: 'با [1,2] ➔ زیر [1,5] ➔ سين [2,3,4] ➔ جزم [2,5] ➔ ميم [1,3,4] ➔ زیر [1,5]',
      explanationEn: 'Baa [1,2] ➔ Kasrah [1,5] ➔ Seen [2,3,4] ➔ Sukoon [2,5] ➔ Meem [1,3,4] ➔ Kasrah [1,5]',
      cells: [
        { label: 'ب', dots: [1, 2], urdu: 'با' },
        { label: 'ـِ', dots: [1, 5], urdu: 'زیر' },
        { label: 'س', dots: [2, 3, 4], urdu: 'سين' },
        { label: 'ـْ', dots: [2, 5], urdu: 'سکون' },
        { label: 'م', dots: [1, 3, 4], urdu: 'ميم' },
        { label: 'ـِ', dots: [1, 5], urdu: 'زیر' }
      ]
    }
  },
  {
    id: 'grade2_maddah',
    number: 3,
    titleUrdu: 'قاعدہ الف، یا، اور واؤ مدہ (Grade 2)',
    titleEn: 'Grade 2 Maddah Contraction Rule',
    descUrdu: 'گریڈ 2 بریل میں حروفِ مدہ (ا، و، ی) سے قبل ہم جنس مختصر حرکت (زبر، پیش، زیر) کو ساقط کر دیا جاتا ہے۔',
    descEn: 'In Grade 2 contracted Braille, redundant short vowels before long vowels (fathah+alif, kasrah+yaa, dammah+waw) are omitted.',
    exampleArabic: 'لَا رَيْبَ فِيهِ',
    demonstration: {
      standardInput: 'لَا',
      explanationUrdu: 'گریڈ 1: ل [1,2,3] + زبر [2] + ا [1] | گریڈ 2: لا مرکب [1,2,3,6]',
      explanationEn: 'Grade 1: Laam + Fathah + Alif | Grade 2: Contracted Laam-Alif [1,2,3,6]',
      cells: [
        { label: 'لا', dots: [1, 2, 3, 6], urdu: 'لام الف مرکب' }
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
    titleUrdu: 'رموزِ اوقاف اور علاماتِ وقف',
    titleEn: 'Quranic Pause Markers (Waqf)',
    descUrdu: 'درمیانِ آیت وقف علامت سے پہلے اشاریہ [3,6] لفظ سے متصل لکھا جاتا ہے، پھر وقف کا حرف اور اس کے بعد ایک خالی سیل دیا جاتا ہے۔',
    descEn: 'Waqf marker [3,6] attaches directly to the word, followed by the pause symbol letter, followed by exactly one space cell.',
    exampleArabic: 'أَبْصَارَهُمْ ۚ كُلَّمَا',
    demonstration: {
      standardInput: 'أَبْصَارَهُمْۚ كُلَّمَا',
      explanationUrdu: 'لفظ ➔ [3,6] ➔ ج/ط/م ➔ فاصلہ [Space] ➔ اگلا لفظ',
      explanationEn: 'Word ➔ Waqf Indicator [3,6] ➔ Pause letter ➔ [Space] ➔ Next word',
      cells: [
        { label: 'ۚ', dots: [3, 6], urdu: 'علامتِ وقف' },
        { label: 'ط', dots: [1, 4, 5], urdu: 'وقف مطلق (ط)' },
        { label: ' ', dots: [], urdu: 'فاصلہ (Space)' }
      ]
    }
  },
  {
    id: 'ayah_numbering',
    number: 6,
    titleUrdu: 'نشانِ آیت اور نمبر کا تسلسل',
    titleEn: 'Ayah End & Verse Numbering',
    descUrdu: 'آیت کے آخری لفظ سے نشانِ آیت [2,3,5,6] ملا کر لکھا جاتا ہے، پھر ایک فاصلہ، علامتِ عدد [3,4,5,6] اور بریل اعداد آتے ہیں۔',
    descEn: 'Ayah End Marker [2,3,5,6] attaches to the final word, followed by one blank space cell, then Number Sign [3,4,5,6] and digits.',
    exampleArabic: 'يَعْلَمُونَ ۝ ١٠',
    demonstration: {
      standardInput: 'يَعْلَمُونَ ۝ ١٠',
      explanationUrdu: 'آخری لفظ ➔ نشانِ آیت [2,3,5,6] ➔ فاصلہ ➔ عدد نشان [3,4,5,6] ➔ ١ [1] ➔ ٠ [2,4,5]',
      explanationEn: 'Final Word ➔ Ayah Marker [2,3,5,6] ➔ Space ➔ Number Sign [3,4,5,6] ➔ Digit 1 ➔ Digit 0',
      cells: [
        { label: '۝', dots: [2, 3, 5, 6], urdu: 'نشانِ آیت' },
        { label: ' ', dots: [], urdu: 'فاصلہ' },
        { label: '#', dots: [3, 4, 5, 6], urdu: 'علامتِ عدد' },
        { label: '١', dots: [1], urdu: 'عدد ۱' },
        { label: '٠', dots: [2, 4, 5], urdu: 'عدد ۰' }
      ]
    }
  },
  {
    id: 'muqattaat',
    number: 7,
    titleUrdu: 'حروفِ مقطعات اشاریہ',
    titleEn: "Huroof-e-Muqatta'at Rule",
    descUrdu: 'حروفِ مقطعات میں ہر منفرد حرف کے بعد اشاریہ [3,6] درج کیا جاتا ہے تاکہ اس کی جداگانہ ادائیگی واضح رہے۔',
    descEn: "In Huroof-e-Muqatta'at, insert dot pattern [3,6] immediately after every isolated letter.",
    exampleArabic: 'الٓمّٓ',
    demonstration: {
      standardInput: 'الـم',
      explanationUrdu: 'ا [1] ➔ [3,6] ➔ ل [1,2,3] ➔ [3,6] ➔ م [1,3,4] ➔ [3,6]',
      explanationEn: 'Alif [1] ➔ [3,6] ➔ Laam [1,2,3] ➔ [3,6] ➔ Meem [1,3,4] ➔ [3,6]',
      cells: [
        { label: 'ا', dots: [1], urdu: 'الف' },
        { label: 'ۤ', dots: [3, 6], urdu: 'اشاریہ' },
        { label: 'ل', dots: [1, 2, 3], urdu: 'لام' },
        { label: 'ۤ', dots: [3, 6], urdu: 'اشاریہ' },
        { label: 'م', dots: [1, 3, 4], urdu: 'ميم' },
        { label: 'ۤ', dots: [3, 6], urdu: 'اشاریہ' }
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

// 3. Character-level mapper for Yaa (یا) vs. Alif Maqsoorah (الف مقصورہ) & canonical overrides
export function mapArabicCharToBrailleEnhanced(char, nextChar, isWordEnd) {
  // Qaf explicit Quranic Braille [1, 2, 3, 4, 5] (⠟)
  if (char === 'ق') {
    return '\u281F'; // Dots [1, 2, 3, 4, 5]
  }

  // Maddah explicit Quranic Braille [3, 4, 5] (⠜)
  if (char === 'ۤ' || char === 'ٓ' || char === '\u06E4' || char === '\u0653') {
    return '\u281C'; // Dots [3, 4, 5]
  }

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

  const entry = BRAILLE_REGISTRY[char];
  if (entry) {
    return dotsToUnicode(entry.dots);
  }
  return '\u2800';
}

/**
 * Core Parser enforcing all 7 transcription rules with Grade 1 and Grade 2 support.
 */
export function transcribeArabicToBraille(text, options = { grade: 1 }) {
  if (!text) return [];
  text = formatAyahEndBraille(text);
  const cells = [];
  const grade = options.grade || 1;
  let i = 0;
  let lastVowel = null;

  const isDigit = ch => (ch >= '٠' && ch <= '٩') || (ch >= '0' && ch <= '9');

  const WAQF_MAP = {
    'ۚ': { letterDots: [2, 4, 5], display: 'ج', urdu: 'وقف جائز (ج)', en: 'Waqf Jaaiz (Jeem)' },
    'ؕ': { letterDots: [1, 4, 5], display: 'ط', urdu: 'وقف مطلق (ط)', en: 'Waqf Mutlaq (Tah)' },
    'ۘ': { letterDots: [1, 3, 4], display: 'م', urdu: 'وقف لازم (م)', en: 'Waqf Laazim (Meem)' },
    'ۖ': { letterDots: [1, 3, 5, 6], display: 'ز', urdu: 'علامتِ وقفِ مجوز (ز)', en: 'Waqf Mujawwaz (Zay)' },
    'ۗ': { letterDots: [1, 2, 3, 4, 5], display: 'قف', urdu: 'وقف قلی (قف)', en: 'Waqf Qila (Qaf-Fe)' },
    'ۛ': { letterDots: [1, 4, 6], display: '∴', urdu: 'معانقہ (∴)', en: 'Muanaqah' },
    '∴': { letterDots: [1, 4, 6], display: '∴', urdu: 'معانقہ (∴)', en: 'Muanaqah' },
    'ۜ': { letterDots: [2, 3, 4], display: 'س', urdu: 'سکتہ (س)', en: 'Saktah (Seen)' },
    '\u06D6': { letterDots: [1, 2, 3, 4, 5], display: 'صل', urdu: 'الوصل اولى (صل)', en: 'Al-Wasl Awla' },
    '\u06D7': { letterDots: [1, 2, 3, 4, 5], display: 'قف', urdu: 'وقف قلی (قف)', en: 'Waqf Qila' },
    '\u06D8': { letterDots: [1, 3, 4], display: 'م', urdu: 'وقف لازم (م)', en: 'Waqf Laazim' },
    '\u06D9': { letterDots: [1, 2, 3], display: 'لا', urdu: 'لا (ممنوع وقف)', en: 'La (Mamnoo Waqf)' },
    '\u06DA': { letterDots: [2, 4, 5], display: 'ج', urdu: 'وقف جائز (ج)', en: 'Waqf Jaaiz' },
    '\u06DB': { letterDots: [1, 4, 6], display: '∴', urdu: 'معانقہ', en: 'Muanaqah' },
    '\u06DC': { letterDots: [2, 3, 4], display: 'س', urdu: 'سکتہ (س)', en: 'Saktah' }
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
    '،': { dots: [2], display: '،', urdu: 'سکتہ / کوما', en: 'Comma [2]' },
    ',': { dots: [2], display: '،', urdu: 'سکتہ / کوما', en: 'Comma [2]' },
    '؛': { dots: [2, 3], display: '؛', urdu: 'وقفہ / سیمی کولن', en: 'Semicolon [2,3]' },
    ';': { dots: [2, 3], display: '؛', urdu: 'وقفہ / سیمی کولن', en: 'Semicolon [2,3]' },
    '؟': { dots: [2, 3, 6], display: '؟', urdu: 'سوالیہ نشان', en: 'Question Mark [2,3,6]' },
    '?': { dots: [2, 3, 6], display: '؟', urdu: 'سوالیہ نشان', en: 'Question Mark [2,3,6]' },
    '.': { dots: [2, 5, 6], display: '.', urdu: 'ختمہ / فل اسٹاپ', en: 'Full Stop [2,5,6]' },
    '۔': { dots: [2, 5, 6], display: '۔', urdu: 'ختمہ', en: 'Full Stop [2,5,6]' },
    ':': { dots: [2, 5], display: ':', urdu: 'رابطہ / کولن', en: 'Colon [2,5]' },
    '!': { dots: [2, 3, 5], display: '!', urdu: 'فجائیہ / ندائیہ', en: 'Exclamation [2,3,5]' },
    '-': { dots: [3, 6], display: '-', urdu: 'خطِ فاصل / ہائفن', en: 'Hyphen [3,6]' }
  };

  const isPunctuationChar = ch => Boolean(PUNCT_MAP[ch]);

  // Check if string is a known Muqatta'at expression (e.g. الم, الر, طه, يس, حم, ق, ن)
  const cleanBare = text.replace(/[\u064B-\u065F\u0670]/g, '').trim();
  const isMuqattaatMatch = /^(الم|المر|الر|طسم|طس|طه|يس|حم|حم عسق|كهيعص|ص|ق|ن)$/.test(cleanBare);

  if (isMuqattaatMatch && grade === 2) {
    for (const char of cleanBare) {
      if (char === ' ') {
        cells.push({ dots: [], unicode: ' ', display: ' ', urdu: 'فاصلہ', en: 'Space' });
        continue;
      }
      const entry = BRAILLE_REGISTRY[char];
      if (entry) {
        cells.push({
          dots: entry.dots,
          unicode: dotsToUnicode(entry.dots),
          display: char,
          urdu: entry.urdu,
          en: entry.en,
          rule: 'Huroof-e-Muqattaat'
        });
        cells.push({
          dots: [3, 6],
          unicode: dotsToUnicode([3, 6]),
          display: 'ۤ',
          urdu: 'مقطعات اشاریہ',
          en: 'Muqattaat Dot [3,6]',
          rule: 'Huroof-e-Muqattaat'
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
      cells.push({ dots: [], unicode: '\n', display: '\n', urdu: 'نئی سطر', en: 'Newline' });
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
      cells.push({ dots: [], unicode: ' ', display: ' ', urdu: 'فاصلہ', en: 'Space' });
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
        urdu: 'علامتِ عدد',
        en: 'Number Sign',
        rule: 'Ayah Numbering'
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
        urdu: 'ختمہ / فل اسٹاپ (نقاط 2، 5، 6)',
        en: 'Full Stop [2,5,6]',
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
        urdu: bDig.urdu,
        en: bDig.en,
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
        urdu: 'نشانِ آیت',
        en: 'Ayah End Marker',
        rule: 'Ayah Numbering'
      });
      i++;

      // Check for optional pause marker immediately adjacent
      if (i < text.length && isWaqfChar(text[i], i, text)) {
        const waqfEntry = BRAILLE_REGISTRY[text[i]];
        if (waqfEntry) {
          cells.push({
            dots: waqfEntry.dots,
            unicode: dotsToUnicode(waqfEntry.dots),
            display: text[i],
            urdu: waqfEntry.urdu,
            en: waqfEntry.en,
            rule: 'Ayah Waqf'
          });
        }
        i++;
      }

      // If next char is whitespace or direct Braille number sign, ensure space cell is preserved
      if (i < text.length && (text[i] === ' ' || text[i] === '\t')) {
        cells.push({ dots: [], unicode: ' ', display: ' ', urdu: 'فاصلہ', en: 'Space' });
        while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i++;
      } else if (i < text.length && (isDigit(text[i]) || text[i] === '\u283C')) {
        cells.push({ dots: [], unicode: ' ', display: ' ', urdu: 'فاصلہ', en: 'Space' });
      }

      if (i < text.length && isDigit(text[i])) {
        cells.push({
          dots: [3, 4, 5, 6],
          unicode: dotsToUnicode([3, 4, 5, 6]),
          display: '#',
          urdu: 'علامتِ عدد',
          en: 'Number Sign',
          rule: 'Ayah Numbering'
        });
        while (i < text.length && isDigit(text[i])) {
          const digit = text[i];
          const norm = (digit >= '0' && digit <= '9') ? String.fromCharCode(digit.charCodeAt(0) - 48 + 0x0660) : digit;
          const digEntry = NUMBER_DIGITS[norm];
          if (digEntry) {
            cells.push({
              dots: digEntry.dots,
              unicode: dotsToUnicode(digEntry.dots),
              display: norm,
              urdu: digEntry.urdu,
              en: digEntry.en,
              rule: 'Ayah Digit'
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
        urdu: 'رموزِ اوقاف اشاریہ',
        en: 'Waqf Indicator [3,6]',
        rule: 'Waqf Indicator'
      });

      // 3. Right Cell: Specific Waqf sign
      let wInfo = WAQF_MAP[ch];
      if (!wInfo) {
        const waqfLetterMap = {
          'م': { letterDots: [1, 3, 4], display: 'م', urdu: 'وقف لازم (م)', en: 'Waqf Laazim (Meem)' },
          'ط': { letterDots: [1, 4, 5], display: 'ط', urdu: 'وقف مطلق (ط)', en: 'Waqf Mutlaq (Tah)' },
          'ج': { letterDots: [2, 4, 5], display: 'ج', urdu: 'وقف جائز (ج)', en: 'Waqf Jaaiz (Jeem)' },
          'ز': { letterDots: [1, 3, 5, 6], display: 'ز', urdu: 'علامتِ وقفِ مجوز (ز)', en: 'Waqf Mujawwaz (Zay)' },
          'ص': { letterDots: [1, 2, 3, 4, 6], display: 'ص', urdu: 'علامتِ وقفِ مرخص (ص)', en: 'Waqf Murakh-khas (Saad)' },
          'س': { letterDots: [2, 3, 4], display: 'س', urdu: 'سکتہ (س)', en: 'Saktah (Seen)' },
          'ق': { letterDots: [1, 2, 3, 4, 5], display: 'ق', urdu: 'قِف / قلی (ق)', en: 'Qif (Qaf)' },
          'ک': { letterDots: [1, 3], display: 'ک', urdu: 'کف (ک)', en: 'Kaf (Kazalik)' }
        };
        wInfo = waqfLetterMap[ch] || { letterDots: [2, 4, 5], display: ch, urdu: 'علامتِ وقف', en: 'Waqf Sign' };
      }

      cells.push({
        dots: wInfo.letterDots,
        unicode: dotsToUnicode(wInfo.letterDots),
        display: wInfo.display,
        urdu: wInfo.urdu,
        en: wInfo.en,
        rule: 'Waqf Sign'
      });

      i++;
      // Consume all trailing whitespace in input text
      while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i++;

      // Exactly ONE space cell after sign before next word begins
      if (i < text.length && text[i] !== '\n' && text[i] !== '۝' && text[i] !== '\u282F') {
        cells.push({ dots: [], unicode: ' ', display: ' ', urdu: 'فاصلہ', en: 'Space' });
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
        urdu: pInfo.urdu,
        en: pInfo.en,
        rule: 'Punctuation'
      });
      i++;
      while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i++;
      if (i < text.length && text[i] !== '\n' && text[i] !== '۝' && text[i] !== '\u282F') {
        cells.push({ dots: [], unicode: ' ', display: ' ', urdu: 'فاصلہ', en: 'Space' });
      }
      continue;
    }

    // Numbers
    if (isDigit(ch)) {
      cells.push({
        dots: [3, 4, 5, 6],
        unicode: dotsToUnicode([3, 4, 5, 6]),
        display: '#',
        urdu: 'علامتِ عدد',
        en: 'Number Sign'
      });
      while (i < text.length && isDigit(text[i])) {
        const digit = text[i];
        const norm = (digit >= '0' && digit <= '9') ? String.fromCharCode(digit.charCodeAt(0) - 48 + 0x0660) : digit;
        const digEntry = NUMBER_DIGITS[norm];
        if (digEntry) {
          cells.push({
            dots: digEntry.dots,
            unicode: dotsToUnicode(digEntry.dots),
            display: norm,
            urdu: digEntry.urdu,
            en: digEntry.en
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
            urdu: 'لام الف مرکب',
            en: 'Laam-Alif Ligature [1,2,3,6]',
            rule: 'Grade 2 Laam-Alif'
          });
          // If Maddah is present, append proper Maddah dots [3, 4, 5] (⠜)
          if (hasMaddah) {
            cells.push({
              dots: [3, 4, 5],
              unicode: dotsToUnicode([3, 4, 5]),
              display: maddahChar || 'ۤ',
              urdu: 'مدّ قرآنی',
              en: 'Maddah [3,4,5]',
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
            urdu: 'لام',
            en: 'Laam',
            rule: 'Grade 1 Letter'
          });
          if (hasFathah) {
            cells.push({
              dots: [2],
              unicode: dotsToUnicode([2]),
              display: 'َ',
              urdu: 'زبر',
              en: 'Fathah',
              rule: 'Grade 1 Harakah'
            });
          }
          cells.push({
            dots: [1],
            unicode: dotsToUnicode([1]),
            display: 'ا',
            urdu: 'الف',
            en: 'Alif',
            rule: 'Grade 1 Letter'
          });
          if (hasMaddah) {
            cells.push({
              dots: [3, 4, 5],
              unicode: dotsToUnicode([3, 4, 5]),
              display: maddahChar || 'ۤ',
              urdu: 'مدّ قرآنی',
              en: 'Maddah [3,4,5]',
              rule: 'Maddah'
            });
          }
          i = afterAlif;
          continue;
        }
      }
    }

    // Base letter analysis
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
    // Omit redundant short vowel before long vowel:
    // fathah (\u064E) before 'ا'
    // kasrah (\u0650) before 'ي'
    // dammah (\u064F) before 'و'
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
        urdu: 'شدّ (قبل از حرف)',
        en: 'Shaddah [6] (Prepended)',
        rule: 'Shaddah Precedence'
      });
    }

    // Base letter output with Qaaf check
    let entry;
    if (letterChar === 'ق') {
      entry = {
        char: 'ق',
        dots: [1, 2, 3, 4, 5],
        urdu: 'قاف',
        en: 'Qaaf'
      };
    } else {
      entry = BRAILLE_REGISTRY[letterChar] || {
        char: letterChar,
        dots: [1, 2, 3, 4, 5, 6],
        urdu: letterChar,
        en: letterChar
      };
    }

    cells.push({
      dots: entry.dots,
      unicode: dotsToUnicode(entry.dots),
      display: letterChar,
      urdu: entry.urdu,
      en: entry.en,
      rule: isAlifMaqsoorah ? 'Alif Maqsoorah' : 'Base Letter'
    });

    // Rule 2: Harakat & Tanween Sequencing (Attached immediately after consonant)
    attachedHarakat.forEach(h => {
      // Maddah check: Always [3, 4, 5] (⠜), NEVER [3, 6]
      if (h === 'ۤ' || h === 'ٓ' || h === '\u06E4' || h === '\u0653') {
        cells.push({
          dots: [3, 4, 5],
          unicode: dotsToUnicode([3, 4, 5]),
          display: h,
          urdu: 'مدّ',
          en: 'Maddah [3,4,5]',
          rule: 'Maddah'
        });
        return;
      }
      const hEntry = BRAILLE_REGISTRY[h];
      if (hEntry) {
        cells.push({
          dots: hEntry.dots,
          unicode: dotsToUnicode(hEntry.dots),
          display: h,
          urdu: hEntry.urdu,
          en: hEntry.en,
          rule: 'Vowel Sequencing'
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

export const translateArabicToBraille = transcribeArabicToBraille;
