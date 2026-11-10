/* UrduBrailleApp.jsx - Comprehensive Urdu Braille Master Studio */
const { useState, useEffect, useMemo, useCallback, useRef } = React;

// Helper: safe native bridge callers
const triggerHaptic = (ms = 40) => {
  try {
    if (window.AndroidHaptic && typeof window.AndroidHaptic.vibrate === 'function') {
      window.AndroidHaptic.vibrate(ms);
    } else if (navigator.vibrate) {
      navigator.vibrate(ms);
    }
  } catch (_) {}
};

const speakText = (text, lang = 'ur') => {
  try {
    if (window.AndroidTTS && typeof window.AndroidTTS.speak === 'function') {
      window.AndroidTTS.speak(text, lang);
      return;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ur' ? 'ur-PK' : 'ar-SA';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  } catch (_) {}
};

const exportFileNative = (content, filename = 'Urdu_Braille_Doc.brf') => {
  try {
    if (window.AndroidEmbosser && typeof window.AndroidEmbosser.exportFile === 'function') {
      window.AndroidEmbosser.exportFile(content, filename);
      return;
    }
    // Fallback: browser download
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (_) {}
};

// ==========================================
// 1. OFFICIAL LINGUISTIC REGISTRY (AIOU 3601 & NATIONAL STANDARDS)
// ==========================================
const URDU_BRAILLE_LETTERS = [
  { id: 'alif', char: 'ا', nameUrdu: 'الف', dots: [1], grade: 1, category: 'letters', example: 'انسان' },
  { id: 'alif_madda', char: 'آ', nameUrdu: 'الف مدہ', dots: [3, 4, 5], grade: 1, category: 'letters', example: 'آسمان' },
  { id: 'baa', char: 'ب', nameUrdu: 'بے', dots: [1, 2], grade: 1, category: 'letters', example: 'بہار' },
  { id: 'paa', char: 'پ', nameUrdu: 'پے', dots: [1, 2, 3, 4], grade: 1, category: 'letters', example: 'پاکستان' },
  { id: 'taa', char: 'ت', nameUrdu: 'تے', dots: [2, 3, 4, 5], grade: 1, category: 'letters', example: 'تلاش' },
  { id: 'ttaa', char: 'ٹ', nameUrdu: 'ٹے', dots: [2, 3, 4, 5, 6], grade: 1, category: 'letters', example: 'ٹوپی' },
  { id: 'thaa', char: 'ث', nameUrdu: 'ثے', dots: [1, 4, 5, 6], grade: 1, category: 'letters', example: 'ثمر' },
  { id: 'jeem', char: 'ج', nameUrdu: 'جیم', dots: [2, 4, 5], grade: 1, category: 'letters', example: 'جہاں' },
  { id: 'cheem', char: 'چ', nameUrdu: 'چے', dots: [1, 4], grade: 1, category: 'letters', example: 'چاند' },
  { id: 'haa_badi', char: 'ح', nameUrdu: 'بڑی حے', dots: [1, 5, 6], grade: 1, category: 'letters', example: 'حال' },
  { id: 'khaa', char: 'خ', nameUrdu: 'خے', dots: [1, 3, 4, 6], grade: 1, category: 'letters', example: 'خواب' },
  { id: 'daal', char: 'د', nameUrdu: 'دال', dots: [1, 4, 5], grade: 1, category: 'letters', example: 'دوست' },
  { id: 'ddaal', char: 'ڈ', nameUrdu: 'ڈال', dots: [1, 2, 4, 6], grade: 1, category: 'letters', example: 'ڈاکیا' },
  { id: 'zhaal', char: 'ذ', nameUrdu: 'ذال', dots: [2, 3, 4, 6], grade: 1, category: 'letters', example: 'ذہن' },
  { id: 'raa', char: 'ر', nameUrdu: 'رے', dots: [1, 2, 3, 5], grade: 1, category: 'letters', example: 'روشنی' },
  { id: 'rraa', char: 'ڑ', nameUrdu: 'ڑے', dots: [1, 2, 3, 4, 5, 6], grade: 1, category: 'letters', example: 'پہاڑ' },
  { id: 'zaa', char: 'ز', nameUrdu: 'زے', dots: [1, 3, 5, 6], grade: 1, category: 'letters', example: 'زندگی' },
  { id: 'zhaa', char: 'ژ', nameUrdu: 'ژے', dots: [3, 4, 6], grade: 1, category: 'letters', example: 'ژالہ باری' },
  { id: 'seen', char: 'س', nameUrdu: 'سین', dots: [2, 3, 4], grade: 1, category: 'letters', example: 'سفر' },
  { id: 'sheen', char: 'ش', nameUrdu: 'شین', dots: [1, 4, 6], grade: 1, category: 'letters', example: 'شوق' },
  { id: 'saad', char: 'ص', nameUrdu: 'صاد', dots: [1, 2, 3, 4, 6], grade: 1, category: 'letters', example: 'صبر' },
  { id: 'daad', char: 'ض', nameUrdu: 'ضاد', dots: [1, 2, 4, 6], grade: 1, category: 'letters', example: 'ضرورت' },
  { id: 'toye', char: 'ط', nameUrdu: 'طوئے', dots: [2, 3, 4, 5, 6], grade: 1, category: 'letters', example: 'طالب علم' },
  { id: 'zoye', char: 'ظ', nameUrdu: 'ظوئے', dots: [1, 2, 3, 4, 5, 6], grade: 1, category: 'letters', example: 'ظلم' },
  { id: 'ayn', char: 'ع', nameUrdu: 'عین', dots: [1, 2, 3, 5, 6], grade: 1, category: 'letters', example: 'علم' },
  { id: 'ghayn', char: 'غ', nameUrdu: 'غین', dots: [1, 2, 6], grade: 1, category: 'letters', example: 'غیرت' },
  { id: 'faa', char: 'ف', nameUrdu: 'فے', dots: [1, 2, 4], grade: 1, category: 'letters', example: 'فکر' },
  { id: 'qaaf', char: 'ق', nameUrdu: 'قاف', dots: [1, 2, 3, 4, 5], grade: 1, category: 'letters', example: 'قلم' },
  { id: 'kaaf', char: 'ک', nameUrdu: 'کاف', dots: [1, 3], grade: 1, category: 'letters', example: 'کتاب' },
  { id: 'gaaf', char: 'گ', nameUrdu: 'گاف', dots: [1, 2, 4, 5], grade: 1, category: 'letters', example: 'گلاب' },
  { id: 'laam', char: 'ل', nameUrdu: 'لام', dots: [1, 2, 3], grade: 1, category: 'letters', example: 'لاہور' },
  { id: 'meem', char: 'م', nameUrdu: 'میم', dots: [1, 3, 4], grade: 1, category: 'letters', example: 'محبت' },
  { id: 'noon', char: 'ن', nameUrdu: 'نون', dots: [1, 3, 4, 5], grade: 1, category: 'letters', example: 'نور' },
  { id: 'noon_ghunna', char: 'ں', nameUrdu: 'نون غنہ', dots: [3, 4, 5], grade: 1, category: 'letters', example: 'ماں' },
  { id: 'waw', char: 'و', nameUrdu: 'واؤ', dots: [2, 4, 5, 6], grade: 1, category: 'letters', example: 'وطن' },
  { id: 'haa_choti', char: 'ہ', nameUrdu: 'چھوٹی ہ گول', dots: [1, 2, 5], grade: 1, category: 'letters', example: 'ہوا' },
  { id: 'haa_dochashmi', char: 'ھ', nameUrdu: 'دو چشمی ھ', dots: [6], grade: 1, category: 'letters', example: 'ہاتھ' },
  { id: 'hamza', char: 'ء', nameUrdu: 'ہمزہ', dots: [3], grade: 1, category: 'letters', example: 'شعرائے' },
  { id: 'hamza_yaa', char: 'ئ', nameUrdu: 'ہمزہ بر ی', dots: [1, 3, 4, 5, 6], grade: 1, category: 'letters', example: 'کوئی' },
  { id: 'yaa_choti', char: 'ی', nameUrdu: 'چھوٹی یے', dots: [2, 4], grade: 1, category: 'letters', example: 'یقین' },
  { id: 'yaa_badi', char: 'ے', nameUrdu: 'بڑی یے', dots: [1, 3, 5], grade: 1, category: 'letters', example: 'ستارے' }
];

const URDU_BRAILLE_DIACRITICS = [
  { id: 'zabar', char: 'َ', nameUrdu: 'زبر (فتحہ)', dots: [2], grade: 1, category: 'diacritics', example: 'مَدَد' },
  { id: 'zeer', char: 'ِ', nameUrdu: 'زیر (کسرہ)', dots: [1, 5], grade: 1, category: 'diacritics', example: 'دِل' },
  { id: 'pesh', char: 'ُ', nameUrdu: 'پیش (ضمہ)', dots: [1, 3, 6], grade: 1, category: 'diacritics', example: 'پُل' },
  { id: 'jazm', char: 'ْ', nameUrdu: 'جزم / سکون', dots: [2, 5], grade: 1, category: 'diacritics', example: 'سَمْجھ' },
  { id: 'tashdeed', char: 'ّ', nameUrdu: 'تشدید (قبل از حرف)', dots: [6], grade: 1, category: 'diacritics', example: 'ابّا' },
  { id: 'khara_zabar', char: 'ٰ', nameUrdu: 'کھڑا زبر', dots: [4], grade: 1, category: 'diacritics', example: 'عیسیٰ' },
  { id: 'khari_zeer', char: 'ٖ', nameUrdu: 'کھڑی زیر', dots: [4, 5], grade: 1, category: 'diacritics', example: 'بِہٖ' },
  { id: 'ulta_pesh', char: 'ٗ', nameUrdu: 'الٹا پیش', dots: [3, 4, 6], grade: 1, category: 'diacritics', example: 'لَہٗ' },
  { id: 'do_zabar', char: 'ً', nameUrdu: 'دو زبر (تنوین فتح)', dots: [2, 3], grade: 1, category: 'diacritics', example: 'فوراً' },
  { id: 'do_zeer', char: 'ٍ', nameUrdu: 'دو زیر (تنوین کسر)', dots: [3, 5], grade: 1, category: 'diacritics', example: 'احترارٍ' },
  { id: 'do_pesh', char: 'ٌ', nameUrdu: 'دو پیش (تنوین ضم)', dots: [2, 6], grade: 1, category: 'diacritics', example: 'کتابٌ' }
];

const URDU_BRAILLE_NUMERALS = [
  { id: 'num_sign', char: '#', nameUrdu: 'علامتِ عدد', dots: [3, 4, 5, 6], grade: 1, category: 'numerals' },
  { id: 'num_1', char: '۱', standardDigit: '1', nameUrdu: 'ہندسہ ایک', dots: [1], grade: 1, category: 'numerals' },
  { id: 'num_2', char: '۲', standardDigit: '2', nameUrdu: 'ہندسہ دو', dots: [1, 2], grade: 1, category: 'numerals' },
  { id: 'num_3', char: '۳', standardDigit: '3', nameUrdu: 'ہندسہ تین', dots: [1, 4], grade: 1, category: 'numerals' },
  { id: 'num_4', char: '۴', standardDigit: '4', nameUrdu: 'ہندسہ چار', dots: [1, 4, 5], grade: 1, category: 'numerals' },
  { id: 'num_5', char: '۵', standardDigit: '5', nameUrdu: 'ہندسہ پانچ', dots: [1, 5], grade: 1, category: 'numerals' },
  { id: 'num_6', char: '۶', standardDigit: '6', nameUrdu: 'ہندسہ چھ', dots: [1, 2, 4], grade: 1, category: 'numerals' },
  { id: 'num_7', char: '۷', standardDigit: '7', nameUrdu: 'ہندسہ سات', dots: [1, 2, 4, 5], grade: 1, category: 'numerals' },
  { id: 'num_8', char: '۸', standardDigit: '8', nameUrdu: 'ہندسہ آٹھ', dots: [1, 2, 5], grade: 1, category: 'numerals' },
  { id: 'num_9', char: '۹', standardDigit: '9', nameUrdu: 'ہندسہ نو', dots: [2, 4], grade: 1, category: 'numerals' },
  { id: 'num_0', char: '۰', standardDigit: '0', nameUrdu: 'ہندسہ صفر', dots: [2, 4, 5], grade: 1, category: 'numerals' }
];

const URDU_BRAILLE_PUNCTUATION = [
  { id: 'comma', char: '،', nameUrdu: 'سکتہ (کوما)', dotsCells: [[2]], explanation: 'نقطہ 2', grade: 1, category: 'punctuation' },
  { id: 'semicolon', char: '؛', nameUrdu: 'وقفہ / نیم وقفہ', dotsCells: [[2, 3]], explanation: 'نقاط 2، 3', grade: 1, category: 'punctuation' },
  { id: 'colon', char: ':', nameUrdu: 'رابطہ', dotsCells: [[2, 5]], explanation: 'نقاط 2، 5', grade: 1, category: 'punctuation' },
  { id: 'colondash', char: ':-', nameUrdu: 'تفصیلیہ', dotsCells: [[2, 5], [3, 6]], explanation: 'نقاط [2,5] + [3,6]', grade: 1, category: 'punctuation' },
  { id: 'fullstop', char: '۔', nameUrdu: 'ختمہ (فل اسٹاپ)', dotsCells: [[2, 5, 6]], explanation: 'نقاط 2، 5، 6', grade: 1, category: 'punctuation' },
  { id: 'question', char: '؟', nameUrdu: 'سوالیہ نشان', dotsCells: [[2, 3, 6]], explanation: 'نقاط 2، 3، 6', grade: 1, category: 'punctuation' },
  { id: 'exclamation', char: '!', nameUrdu: 'تعجب / فجائیہ', dotsCells: [[2, 3, 5]], explanation: 'نقاط 2، 3، 5', grade: 1, category: 'punctuation' },
  { id: 'parentheses', char: '()', nameUrdu: 'قوسین (بریکٹ)', dotsCells: [[2, 3, 5, 6]], explanation: 'نقاط 2، 3، 5، 6', grade: 1, category: 'punctuation' },
  { id: 'quotes', char: '""', nameUrdu: 'واوین (انورٹڈ کوماز)', dotsCells: [[2, 3, 6]], endDots: [[3, 5, 6]], explanation: 'شروع: [2,3,6]، اختتام: [3,5,6]', grade: 1, category: 'punctuation' },
  { id: 'dash', char: '—', nameUrdu: 'خط / ڈیش', dotsCells: [[3, 6], [3, 6]], explanation: 'نقاط [3,6] + [3,6]', grade: 1, category: 'punctuation' },
  { id: 'ellipsis', char: '...', nameUrdu: 'زنجیرہ (حذف نشان)', dotsCells: [[3], [3], [3]], explanation: 'تین خلیے نقطہ 3', grade: 1, category: 'punctuation' }
];

// Grade 2 Contractions (مخففات و اختصارات)
const GRADE2_CONTRACTIONS = [
  // A. کل لفظی مفرد نشانات
  { id: 'g2_aa', urdu: 'آ', dotsCells: [[3, 4, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان آ', grade: 2 },
  { id: 'g2_aik', urdu: 'ایک', dotsCells: [[1, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان ایک [1,5]', grade: 2 },
  { id: 'g2_bohat', urdu: 'بہت', dotsCells: [[1, 2]], type: 'whole_single', desc: 'کل لفظی مفرد نشان بہت [1,2]', grade: 2 },
  { id: 'g2_par', urdu: 'پر', dotsCells: [[1, 2, 3, 4]], type: 'whole_single', desc: 'کل لفظی مفرد نشان پر [1,2,3,4]', grade: 2 },
  { id: 'g2_to', urdu: 'تو', dotsCells: [[2, 3, 4, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان تو [2,3,4,5]', grade: 2 },
  { id: 'g2_saabit', urdu: 'ثابت', dotsCells: [[1, 4, 5, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان ثابت [1,4,5,6]', grade: 2 },
  { id: 'g2_jo', urdu: 'جو', dotsCells: [[2, 4, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان جو [2,4,5]', grade: 2 },
  { id: 'g2_chahiye', urdu: 'چاہیے', dotsCells: [[1, 4]], type: 'whole_single', desc: 'کل لفظی مفرد نشان چاہیے [1,4]', grade: 2 },
  { id: 'g2_hasil', urdu: 'حاصل', dotsCells: [[1, 5, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان حاصل [1,5,6]', grade: 2 },
  { id: 'g2_khaali', urdu: 'خالی', dotsCells: [[1, 3, 4, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان خالی [1,3,4,6]', grade: 2 },
  { id: 'g2_dar', urdu: 'در', dotsCells: [[1, 4, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان در [1,4,5]', grade: 2 },
  { id: 'g2_ziyada', urdu: 'زیادہ', dotsCells: [[1, 3, 5, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان زیادہ [1,3,5,6]', grade: 2 },
  { id: 'g2_say', urdu: 'سے', dotsCells: [[2, 3, 4]], type: 'whole_single', desc: 'کل لفظی مفرد نشان سے [2,3,4]', grade: 2 },
  { id: 'g2_sirf', urdu: 'صرف', dotsCells: [[1, 2, 3, 4, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان صرف [1,2,3,4,6]', grade: 2 },
  { id: 'g2_zaroor', urdu: 'ضرور', dotsCells: [[1, 2, 4, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان ضرور [1,2,4,6]', grade: 2 },
  { id: 'g2_taur', urdu: 'طور', dotsCells: [[2, 3, 4, 5, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان طور [2,3,4,5,6]', grade: 2 },
  { id: 'g2_zahir', urdu: 'ظاہر', dotsCells: [[1, 2, 3, 4, 5, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان ظاہر [1..6]', grade: 2 },
  { id: 'g2_ghayr', urdu: 'غیر', dotsCells: [[1, 2, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان غیر [1,2,6]', grade: 2 },
  { id: 'g2_faqat', urdu: 'فقط', dotsCells: [[1, 2, 4]], type: 'whole_single', desc: 'کل لفظی مفرد نشان فقط [1,2,4]', grade: 2 },
  { id: 'g2_qabal', urdu: 'قبل', dotsCells: [[1, 2, 3, 4, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان قبل [1,2,3,4,5]', grade: 2 },
  { id: 'g2_kaa', urdu: 'کا', dotsCells: [[1, 3]], type: 'whole_single', desc: 'کل لفظی مفرد نشان کا [1,3]', grade: 2 },
  { id: 'g2_gaya', urdu: 'گیا', dotsCells: [[1, 2, 4, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان گیا [1,2,4,5]', grade: 2 },
  { id: 'g2_liye', urdu: 'لیے', dotsCells: [[1, 2, 3]], type: 'whole_single', desc: 'کل لفظی مفرد نشان لیے [1,2,3]', grade: 2 },
  { id: 'g2_mein', urdu: 'میں', dotsCells: [[1, 3, 4]], type: 'whole_single', desc: 'کل لفظی مفرد نشان میں [1,3,4]', grade: 2 },
  { id: 'g2_nah', urdu: 'نہ', dotsCells: [[1, 3, 4, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان نہ [1,3,4,5]', grade: 2 },
  { id: 'g2_woh', urdu: 'وہ', dotsCells: [[2, 4, 5, 6]], type: 'whole_single', desc: 'کل لفظی مفرد نشان وہ [2,4,5,6]', grade: 2 },
  { id: 'g2_hum', urdu: 'ہم', dotsCells: [[1, 2, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان ہم [1,2,5]', grade: 2 },
  { id: 'g2_yeh', urdu: 'یہ', dotsCells: [[2, 4]], type: 'whole_single', desc: 'کل لفظی مفرد نشان یہ [2,4]', grade: 2 },
  { id: 'g2_hai', urdu: 'ہے', dotsCells: [[1, 3, 5]], type: 'whole_single', desc: 'کل لفظی مفرد نشان ہے [1,3,5]', grade: 2 },

  // B. دو چشمی ھ والے مرکبات (حرف + نقطہ 6)
  { id: 'g2_bhi', urdu: 'بھی', dotsCells: [[1, 2], [6]], type: 'dochashmi', desc: 'مرکب بھی: ب [1,2] + ھ [6]', grade: 2 },
  { id: 'g2_phir', urdu: 'پھر', dotsCells: [[1, 2, 3, 4], [6]], type: 'dochashmi', desc: 'مرکب پھر: پ [1,2,3,4] + ھ [6]', grade: 2 },
  { id: 'g2_tak', urdu: 'تک', dotsCells: [[2, 3, 4, 5], [6]], type: 'dochashmi', desc: 'مرکب تک: ت [2,3,4,5] + ھ [6]', grade: 2 },
  { id: 'g2_theek', urdu: 'ٹھیک', dotsCells: [[2, 3, 4, 5, 6], [6]], type: 'dochashmi', desc: 'مرکب ٹھیک: ٹ [2,3,4,5,6] + ھ [6]', grade: 2 },
  { id: 'g2_jab', urdu: 'جب', dotsCells: [[2, 4, 5], [6]], type: 'dochashmi', desc: 'مرکب جب: ج [2,4,5] + ھ [6]', grade: 2 },
  { id: 'g2_chhat', urdu: 'چھ', dotsCells: [[1, 4], [6]], type: 'dochashmi', desc: 'مرکب چھ / کچھ: چ [1,4] + ھ [6]', grade: 2 },
  { id: 'g2_kuch', urdu: 'کچھ', dotsCells: [[1, 4], [6]], type: 'dochashmi', desc: 'مرکب کچھ: چ [1,4] + ھ [6]', grade: 2 },
  { id: 'g2_dha', urdu: 'دھ', dotsCells: [[1, 4, 5], [6]], type: 'dochashmi', desc: 'مرکب دھ: د [1,4,5] + ھ [6]', grade: 2 },
  { id: 'g2_ddha', urdu: 'ڈھ', dotsCells: [[1, 2, 4, 6], [6]], type: 'dochashmi', desc: 'مرکب ڈھ: ڈ [1,2,4,6] + ھ [6]', grade: 2 },
  { id: 'g2_rha', urdu: 'رھ', dotsCells: [[1, 2, 3, 5], [6]], type: 'dochashmi', desc: 'مرکب رھ: ر [1,2,3,5] + ھ [6]', grade: 2 },
  { id: 'g2_rrha', urdu: 'ڑھ', dotsCells: [[1, 2, 3, 4, 5, 6], [6]], type: 'dochashmi', desc: 'مرکب ڑھ: ڑ [1..6] + ھ [6]', grade: 2 },
  { id: 'g2_kha', urdu: 'کھ', dotsCells: [[1, 3], [6]], type: 'dochashmi', desc: 'مرکب کھ: ک [1,3] + ھ [6]', grade: 2 },
  { id: 'g2_gha', urdu: 'گھ', dotsCells: [[1, 2, 4, 5], [6]], type: 'dochashmi', desc: 'مرکب گھ: گ [1,2,4,5] + ھ [6]', grade: 2 },

  // C. نقطہ 5 سے بننے والے ابتدائی مخففات
  { id: 'g2_ayenda', urdu: 'آئندہ', dotsCells: [[5], [3, 4, 5]], type: 'dot5', desc: 'نقطہ 5 + آ [3,4,5]', grade: 2 },
  { id: 'g2_baat', urdu: 'بات', dotsCells: [[5], [1, 2]], type: 'dot5', desc: 'نقطہ 5 + ب [1,2]', grade: 2 },
  { id: 'g2_paida', urdu: 'پیدا', dotsCells: [[5], [1, 2, 3, 4]], type: 'dot5', desc: 'نقطہ 5 + پ [1,2,3,4]', grade: 2 },
  { id: 'g2_tamaam_5', urdu: 'تمام', dotsCells: [[5], [2, 3, 4, 5]], type: 'dot5', desc: 'نقطہ 5 + ت [2,3,4,5]', grade: 2 },
  { id: 'g2_tukra', urdu: 'ٹکڑا', dotsCells: [[5], [2, 3, 4, 5, 6]], type: 'dot5', desc: 'نقطہ 5 + ٹ [2,3,4,5,6]', grade: 2 },
  { id: 'g2_jaari', urdu: 'جاری', dotsCells: [[5], [2, 4, 5]], type: 'dot5', desc: 'نقطہ 5 + ج [2,4,5]', grade: 2 },
  { id: 'g2_chaar', urdu: 'چار', dotsCells: [[5], [1, 4]], type: 'dot5', desc: 'نقطہ 5 + چ [1,4]', grade: 2 },
  { id: 'g2_haal', urdu: 'حال', dotsCells: [[5], [1, 5, 6]], type: 'dot5', desc: 'نقطہ 5 + ح [1,5,6]', grade: 2 },
  { id: 'g2_khush', urdu: 'خوش', dotsCells: [[5], [1, 3, 4, 6]], type: 'dot5', desc: 'نقطہ 5 + خ [1,3,4,6]', grade: 2 },
  { id: 'g2_dil', urdu: 'دل', dotsCells: [[5], [1, 4, 5]], type: 'dot5', desc: 'نقطہ 5 + د [1,4,5]', grade: 2 },
  { id: 'g2_rang', urdu: 'رنگ', dotsCells: [[5], [1, 2, 3, 5]], type: 'dot5', desc: 'نقطہ 5 + ر [1,2,3,5]', grade: 2 },
  { id: 'g2_saath_5', urdu: 'ساتھ', dotsCells: [[5], [2, 3, 4]], type: 'dot5', desc: 'نقطہ 5 + س [2,3,4]', grade: 2 },
  { id: 'g2_kaam', urdu: 'کام', dotsCells: [[5], [1, 3]], type: 'dot5', desc: 'نقطہ 5 + ک [1,3]', grade: 2 },
  { id: 'g2_log', urdu: 'لوگ', dotsCells: [[5], [1, 2, 3]], type: 'dot5', desc: 'نقطہ 5 + ل [1,2,3]', grade: 2 },
  { id: 'g2_naam', urdu: 'نام', dotsCells: [[5], [1, 3, 4, 5]], type: 'dot5', desc: 'نقطہ 5 + ن [1,3,4,5]', grade: 2 },
  { id: 'g2_waqt', urdu: 'وقت', dotsCells: [[5], [2, 4, 5, 6]], type: 'dot5', desc: 'نقطہ 5 + و [2,4,5,6]', grade: 2 },
  { id: 'g2_hamesha', urdu: 'ہمیشہ', dotsCells: [[5], [1, 2, 5]], type: 'dot5', desc: 'نقطہ 5 + ہ [1,2,5]', grade: 2 },
  { id: 'g2_yahan', urdu: 'یہاں', dotsCells: [[5], [2, 4]], type: 'dot5', desc: 'نقطہ 5 + ی [2,4]', grade: 2 },

  // D. نقاط 4، 5 سے بننے والے مخففات
  { id: 'g2_aahista', urdu: 'آہستہ', dotsCells: [[4, 5], [3, 4, 5]], type: 'dots45', desc: 'نقاط 4، 5 + آ [3,4,5]', grade: 2 },
  { id: 'g2_pahunch', urdu: 'پہنچ', dotsCells: [[4, 5], [1, 2, 3, 4]], type: 'dots45', desc: 'نقاط 4، 5 + پ [1,2,3,4]', grade: 2 },
  { id: 'g2_taalluq', urdu: 'تعلق', dotsCells: [[4, 5], [2, 3, 4, 5]], type: 'dots45', desc: 'نقاط 4، 5 + ت [2,3,4,5]', grade: 2 },
  { id: 'g2_haq', urdu: 'حق', dotsCells: [[4, 5], [1, 5, 6]], type: 'dots45', desc: 'نقاط 4، 5 + ح [1,5,6]', grade: 2 },
  { id: 'g2_raaye', urdu: 'رائے', dotsCells: [[4, 5], [1, 2, 3, 5]], type: 'dots45', desc: 'نقاط 4، 5 + ر [1,2,3,5]', grade: 2 },
  { id: 'g2_taraf', urdu: 'طرف', dotsCells: [[4, 5], [2, 3, 4, 5, 6]], type: 'dots45', desc: 'نقاط 4، 5 + ط [2,3,4,5,6]', grade: 2 },
  { id: 'g2_qoum', urdu: 'قوم', dotsCells: [[4, 5], [1, 2, 3, 4, 5]], type: 'dots45', desc: 'نقاط 4، 5 + ق [1,2,3,4,5]', grade: 2 },
  { id: 'g2_koi', urdu: 'کوئی', dotsCells: [[4, 5], [1, 3]], type: 'dots45', desc: 'نقاط 4، 5 + ک [1,3]', grade: 2 },
  { id: 'g2_matlab', urdu: 'مطلب', dotsCells: [[4, 5], [1, 3, 4]], type: 'dots45', desc: 'نقاط 4، 5 + م [1,3,4]', grade: 2 },
  { id: 'g2_nazar', urdu: 'نظر', dotsCells: [[4, 5], [1, 3, 4, 5]], type: 'dots45', desc: 'نقاط 4، 5 + ن [1,3,4,5]', grade: 2 },
  { id: 'g2_wajah', urdu: 'وجہ', dotsCells: [[4, 5], [2, 4, 5, 6]], type: 'dots45', desc: 'نقاط 4، 5 + و [2,4,5,6]', grade: 2 },

  // E. نقاط 4، 5، 6 سے بننے والے مخففات
  { id: 'g2_aamada', urdu: 'آمادہ', dotsCells: [[4, 5, 6], [3, 4, 5]], type: 'dots456', desc: 'نقاط 4، 5، 6 + آ [3,4,5]', grade: 2 },
  { id: 'g2_bilkul', urdu: 'بالکل', dotsCells: [[4, 5, 6], [1, 2]], type: 'dots456', desc: 'نقاط 4، 5، 6 + ب [1,2]', grade: 2 },
  { id: 'g2_pehal', urdu: 'پہل', dotsCells: [[4, 5, 6], [1, 2, 3, 4]], type: 'dots456', desc: 'نقاط 4، 5، 6 + پ [1,2,3,4]', grade: 2 },
  { id: 'g2_pehle', urdu: 'پہلے', dotsCells: [[4, 5, 6], [1, 2, 3, 4]], type: 'dots456', desc: 'نقاط 4، 5، 6 + پ [1,2,3,4]', grade: 2 },
  { id: 'g2_tumhara', urdu: 'تمہارا', dotsCells: [[4, 5, 6], [2, 3, 4, 5]], type: 'dots456', desc: 'نقاط 4، 5، 6 + ت [2,3,4,5]', grade: 2 },
  { id: 'g2_tum', urdu: 'تم', dotsCells: [[4, 5, 6], [2, 3, 4, 5]], type: 'dots456', desc: 'نقاط 4، 5، 6 + ت [2,3,4,5]', grade: 2 },
  { id: 'g2_jahan', urdu: 'جہاں', dotsCells: [[4, 5, 6], [2, 4, 5]], type: 'dots456', desc: 'نقاط 4، 5، 6 + ج [2,4,5]', grade: 2 },
  { id: 'g2_khud', urdu: 'خود', dotsCells: [[4, 5, 6], [1, 3, 4, 6]], type: 'dots456', desc: 'نقاط 4، 5، 6 + خ [1,3,4,6]', grade: 2 },
  { id: 'g2_dunya', urdu: 'دنیا', dotsCells: [[4, 5, 6], [1, 4, 5]], type: 'dots456', desc: 'نقاط 4، 5، 6 + د [1,4,5]', grade: 2 },
  { id: 'g2_kabhi', urdu: 'کبھی', dotsCells: [[4, 5, 6], [1, 3]], type: 'dots456', desc: 'نقاط 4، 5، 6 + ک [1,3]', grade: 2 },
  { id: 'g2_hamara', urdu: 'ہمارا', dotsCells: [[4, 5, 6], [1, 2, 5]], type: 'dots456', desc: 'نقاط 4، 5، 6 + ہ [1,2,5]', grade: 2 },

  // F. آخری مرکب مخففات و لاحقے
  // نقاط [4, 6] کے لاحقے
  { id: 'suf_parast', urdu: 'پرست', dotsCells: [[4, 6], [1, 2, 3, 4]], type: 'suffix46', desc: 'لاحقہ پرست: [4,6] + پ', grade: 2 },
  { id: 'suf_baad', urdu: 'باد', dotsCells: [[4, 6], [1, 2]], type: 'suffix46', desc: 'لاحقہ باد: [4,6] + ب', grade: 2 },
  { id: 'suf_geer', urdu: 'گیر', dotsCells: [[4, 6], [1, 2, 4, 5]], type: 'suffix46', desc: 'لاحقہ گیر: [4,6] + گ', grade: 2 },
  { id: 'suf_tareen', urdu: 'ترین', dotsCells: [[4, 6], [2, 3, 4, 5]], type: 'suffix46', desc: 'لاحقہ ترین: [4,6] + ت', grade: 2 },
  { id: 'suf_gaah', urdu: 'گاہ', dotsCells: [[4, 6], [1, 2, 4, 5]], type: 'suffix46', desc: 'لاحقہ گاہ: [4,6] + گ', grade: 2 },

  // نقاط [5, 6] کے لاحقے
  { id: 'suf_daasht', urdu: 'داشت', dotsCells: [[5, 6], [1, 4, 5]], type: 'suffix56', desc: 'لاحقہ داشت: [5,6] + د', grade: 2 },
  { id: 'suf_mand', urdu: 'مند', dotsCells: [[5, 6], [1, 3, 4]], type: 'suffix56', desc: 'لاحقہ مند: [5,6] + م', grade: 2 },
  { id: 'suf_gaar', urdu: 'گار', dotsCells: [[5, 6], [1, 2, 4, 5]], type: 'suffix56', desc: 'لاحقہ گار: [5,6] + گ', grade: 2 },
  { id: 'suf_kheez', urdu: 'خیز', dotsCells: [[5, 6], [1, 3, 4, 6]], type: 'suffix56', desc: 'لاحقہ خیز: [5,6] + خ', grade: 2 },
  { id: 'suf_furosh', urdu: 'فروش', dotsCells: [[5, 6], [1, 2, 4]], type: 'suffix56', desc: 'لاحقہ فروش: [5,6] + ف', grade: 2 },
  { id: 'suf_khana', urdu: 'خانہ', dotsCells: [[5, 6], [1, 3, 4, 6]], type: 'suffix56', desc: 'لاحقہ خانہ: [5,6] + خ', grade: 2 },

  // G. کہ بیانیہ کے مرکبات بر نقطہ 6
  { id: 'g2_balkeh', urdu: 'بلکہ', dotsCells: [[1, 2], [6]], type: 'dot6_conj', desc: 'بلکہ: ب [1,2] + نقطہ 6', grade: 2 },
  { id: 'g2_taakeh', urdu: 'تاکہ', dotsCells: [[2, 3, 4, 5], [6]], type: 'dot6_conj', desc: 'تاکہ: ت [2,3,4,5] + نقطہ 6', grade: 2 },
  { id: 'g2_choonkeh', urdu: 'چونکہ', dotsCells: [[1, 4], [6]], type: 'dot6_conj', desc: 'چونکہ: چ [1,4] + نقطہ 6', grade: 2 },
  { id: 'g2_haalankeh', urdu: 'حالانکہ', dotsCells: [[1, 5, 6], [6]], type: 'dot6_conj', desc: 'حالانکہ: ح [1,5,6] + نقطہ 6', grade: 2 },
  { id: 'g2_kyonkeh', urdu: 'کیونکہ', dotsCells: [[1, 3], [6]], type: 'dot6_conj', desc: 'کیونکہ: ک [1,3] + نقطہ 6', grade: 2 },
  { id: 'g2_goyakeh', urdu: 'گویا کہ', dotsCells: [[1, 2, 4, 5], [6]], type: 'dot6_conj', desc: 'گویا کہ: گ [1,2,4,5] + نقطہ 6', grade: 2 },

  // H. نشان گنتی کے مرکبات بر نقاط 3، 4، 5، 6
  { id: 'g2_aawaz', urdu: 'آواز', dotsCells: [[3, 4, 5, 6], [3, 4, 5]], type: 'numsign_comp', desc: 'علامتِ عدد [3,4,5,6] + آ', grade: 2 },
  { id: 'g2_pasand', urdu: 'پسند', dotsCells: [[3, 4, 5, 6], [1, 2, 3, 4]], type: 'numsign_comp', desc: 'علامتِ عدد [3,4,5,6] + پ', grade: 2 },
  { id: 'g2_tamaam_num', urdu: 'تمام', dotsCells: [[3, 4, 5, 6], [2, 3, 4, 5]], type: 'numsign_comp', desc: 'علامتِ عدد [3,4,5,6] + ت', grade: 2 },
  { id: 'g2_khaas', urdu: 'خاص', dotsCells: [[3, 4, 5, 6], [1, 3, 4, 6]], type: 'numsign_comp', desc: 'علامتِ عدد [3,4,5,6] + خ', grade: 2 },
  { id: 'g2_saath_num', urdu: 'ساتھ', dotsCells: [[3, 4, 5, 6], [2, 3, 4]], type: 'numsign_comp', desc: 'علامتِ عدد [3,4,5,6] + س', grade: 2 },

  // I. حصہ دوم اختصارات (Abbreviations)
  { id: 'abbr_abhi', urdu: 'ابھی', dotsCells: [[1], [1, 2], [6]], type: 'abbreviation', desc: 'ابھی: ا + ب + ھ [6]', grade: 2 },
  { id: 'abbr_abtak', urdu: 'اب تک', dotsCells: [[1], [1, 2], [2, 3, 4, 5]], type: 'abbreviation', desc: 'اب تک: ا + ب + ت', grade: 2 },
  { id: 'abbr_ittifaq', urdu: 'اتفاق', dotsCells: [[1], [2, 3, 4, 5], [1, 2, 3, 4, 5]], type: 'abbreviation', desc: 'اتفاق: ا + ت + ق', grade: 2 },
  { id: 'abbr_agarchay', urdu: 'اگرچہ', dotsCells: [[1], [1, 2, 4, 5], [1, 4]], type: 'abbreviation', desc: 'اگرچہ: ا + گ + چ', grade: 2 },
  { id: 'abbr_albatta', urdu: 'البتہ', dotsCells: [[1], [1, 2, 3], [1, 2]], type: 'abbreviation', desc: 'البتہ: ا + ل + ب', grade: 2 },
  { id: 'abbr_chunancheh', urdu: 'چنانچہ', dotsCells: [[1, 4], [1, 3, 4, 5], [1, 4]], type: 'abbreviation', desc: 'چنانچہ: چ + ن + چ', grade: 2 },
  { id: 'abbr_guftagu', urdu: 'گفتگو', dotsCells: [[1, 2, 4, 5], [1, 2, 4, 5]], type: 'abbreviation', desc: 'گفتگو: گ + ف + ت', grade: 2 }
];

// Combine all lexicon entries for universal search
const ALL_LEXICON_ENTRIES = [
  ...URDU_BRAILLE_LETTERS.map(it => ({ ...it, dotsCells: [it.dots], title: it.char, subtitle: it.nameUrdu, typeName: 'درجہ اول: حروفِ تہجی' })),
  ...URDU_BRAILLE_DIACRITICS.map(it => ({ ...it, dotsCells: [it.dots], title: it.char, subtitle: it.nameUrdu, typeName: 'درجہ اول: اعراب' })),
  ...URDU_BRAILLE_NUMERALS.map(it => ({ ...it, dotsCells: [it.dots], title: it.char, subtitle: it.nameUrdu, typeName: 'ہندسہ جات' })),
  ...URDU_BRAILLE_PUNCTUATION.map(it => ({ ...it, title: it.char, subtitle: it.nameUrdu, typeName: 'رموز اوقاف' })),
  ...GRADE2_CONTRACTIONS.map(it => ({ ...it, title: it.urdu, subtitle: it.desc, typeName: 'درجہ دوم: مخفف / اختصار' }))
];

// Maps for fast lookups
const CHAR_MAP = new Map(URDU_BRAILLE_LETTERS.map(it => [it.char, it]));
URDU_BRAILLE_DIACRITICS.forEach(it => CHAR_MAP.set(it.char, it));
URDU_BRAILLE_NUMERALS.forEach(it => {
  CHAR_MAP.set(it.char, it);
  if (it.standardDigit) CHAR_MAP.set(it.standardDigit, it);
});

// Helper: Dot list to Unicode Braille Pattern Character
function dotsToUnicode(dots) {
  if (!dots || dots.length === 0) return '\u2800';
  let mask = 0;
  dots.forEach(d => {
    if (d >= 1 && d <= 6) mask |= (1 << (d - 1));
  });
  return String.fromCharCode(0x2800 + mask);
}

// Helper: Unicode Braille Pattern Character to Dot list
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

// Helper: Sort and format dots list as text
function formatDots(dots) {
  if (!dots || dots.length === 0) return 'خالی';
  return '[' + [...dots].sort((a, b) => a - b).join(', ') + ']';
}

// Helper: ARIA & Spoken speech for dot patterns
function dotsToSpokenUrdu(dots, charName = '') {
  if (!dots || dots.length === 0) return 'خالی خلیہ';
  const sorted = [...dots].sort((a, b) => a - b);
  const dotNames = sorted.map(d => {
    const map = { 1: 'ایک', 2: 'دو', 3: 'تین', 4: 'چار', 5: 'پانچ', 6: 'چھ' };
    return map[d] || d;
  }).join(' اور ');
  return `نقطہ ${dotNames}` + (charName ? `، برائے ${charName}` : '');
}

// ==========================================
// 2. BIDIRECTIONAL TRANSLATION ENGINE
// ==========================================
function transcribeUrduToBraille(text, grade = 2) {
  if (!text) return { cells: [], brailleUnicode: '', explanation: '' };

  const cells = [];
  const tokens = text.split(/(\s+|[،؛:۔؟!—\(\)\"\'])/);

  for (let t = 0; t < tokens.length; t++) {
    const token = tokens[t];
    if (!token) continue;

    if (/^\s+$/.test(token)) {
      // Space token
      cells.push({
        dots: [],
        unicode: ' ',
        urduChar: ' ',
        nameUrdu: 'فاصلہ',
        description: 'ایک خالی سیل'
      });
      continue;
    }

    // Check Punctuation
    const punctMatch = URDU_BRAILLE_PUNCTUATION.find(p => p.char === token);
    if (punctMatch) {
      punctMatch.dotsCells.forEach((d, idx) => {
        cells.push({
          dots: d,
          unicode: dotsToUnicode(d),
          urduChar: idx === 0 ? token : '',
          nameUrdu: punctMatch.nameUrdu,
          description: punctMatch.explanation
        });
      });
      continue;
    }

    // Check Grade 2 Whole-Word Contraction / Abbreviation first
    if (grade === 2) {
      const g2Match = GRADE2_CONTRACTIONS.find(c => c.urdu === token);
      if (g2Match) {
        g2Match.dotsCells.forEach((d, idx) => {
          cells.push({
            dots: d,
            unicode: dotsToUnicode(d),
            urduChar: idx === 0 ? token : '',
            nameUrdu: g2Match.desc,
            description: `${g2Match.desc} (${formatDots(d)})`,
            isGrade2: true
          });
        });
        continue;
      }
    }

    // Character by character transcription with Diacritic & Tashdeed rules
    let i = 0;
    while (i < token.length) {
      // Check for Tashdeed (Shaddah) Rule:
      // In Urdu Braille, Shaddah [6] MUST precede the consonant!
      // If next char is Tashdeed (ّ), output Shaddah first
      const nextChar = (i + 1 < token.length) ? token[i + 1] : null;
      if (nextChar === 'ّ') {
        cells.push({
          dots: [6],
          unicode: dotsToUnicode([6]),
          urduChar: 'ّ',
          nameUrdu: 'تشدید (قبل از حرف)',
          description: 'نقطہ 6 (تشدید حرف سے پہلے درج ہوتی ہے)'
        });
      }

      const ch = token[i];
      if (ch === 'ّ') {
        // Already handled ahead of time
        i++;
        continue;
      }

      // Check numbers
      if (/[0-9۰-۹]/.test(ch)) {
        // Output number sign prefix if first digit in sequence
        if (i === 0 || !/[0-9۰-۹]/.test(token[i - 1])) {
          cells.push({
            dots: [3, 4, 5, 6],
            unicode: dotsToUnicode([3, 4, 5, 6]),
            urduChar: '#',
            nameUrdu: 'علامتِ عدد',
            description: 'نقاط 3، 4، 5، 6'
          });
        }
        const numEntry = URDU_BRAILLE_NUMERALS.find(n => n.char === ch || n.standardDigit === ch);
        if (numEntry) {
          cells.push({
            dots: numEntry.dots,
            unicode: dotsToUnicode(numEntry.dots),
            urduChar: ch,
            nameUrdu: numEntry.nameUrdu,
            description: `${numEntry.nameUrdu} (${formatDots(numEntry.dots)})`
          });
        }
        i++;
        continue;
      }

      // Check two-character compounds (like دو چشمی ھ: بھ، پھ، تھ وغیرہ) in Grade 2 or standard
      if (i + 1 < token.length && (token[i + 1] === 'ھ' || token[i + 1] === 'ہ')) {
        const compoundKey = ch + token[i + 1];
        const compoundMatch = GRADE2_CONTRACTIONS.find(c => c.urdu === compoundKey);
        if (compoundMatch) {
          compoundMatch.dotsCells.forEach((d, idx) => {
            cells.push({
              dots: d,
              unicode: dotsToUnicode(d),
              urduChar: idx === 0 ? compoundKey : '',
              nameUrdu: compoundMatch.desc,
              description: `${compoundMatch.desc} (${formatDots(d)})`,
              isGrade2: true
            });
          });
          i += 2;
          continue;
        }
      }

      // Regular Letter or Diacritic lookup
      const entry = CHAR_MAP.get(ch);
      if (entry) {
        cells.push({
          dots: entry.dots,
          unicode: dotsToUnicode(entry.dots),
          urduChar: ch,
          nameUrdu: entry.nameUrdu,
          description: `${entry.nameUrdu} (${formatDots(entry.dots)})`
        });
      } else {
        // Fallback for untracked characters
        cells.push({
          dots: [],
          unicode: ch,
          urduChar: ch,
          nameUrdu: ch,
          description: 'غیر معیاری حرف'
        });
      }
      i++;
    }
  }

  const brailleUnicode = cells.map(c => c.unicode).join('');
  return { cells, brailleUnicode };
}

// Convert Unicode Braille or dots to Urdu text
function transcribeBrailleToUrdu(brailleText) {
  if (!brailleText) return '';
  let result = '';
  const chars = Array.from(brailleText);
  let isNumberMode = false;

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch === ' ' || ch === '\u2800') {
      result += ' ';
      isNumberMode = false;
      continue;
    }
    const dots = unicodeToDots(ch);
    const key = dots.sort((a, b) => a - b).join(',');

    if (key === '3,4,5,6') {
      isNumberMode = true;
      continue;
    }

    if (isNumberMode) {
      const numMatch = URDU_BRAILLE_NUMERALS.find(n => n.dots && n.dots.sort((a,b)=>a-b).join(',') === key);
      if (numMatch && numMatch.char !== '#') {
        result += numMatch.char;
        continue;
      }
    }

    // Lookup Grade 1 letter/diacritic
    const match = URDU_BRAILLE_LETTERS.find(l => l.dots.sort((a,b)=>a-b).join(',') === key) ||
                  URDU_BRAILLE_DIACRITICS.find(d => d.dots.sort((a,b)=>a-b).join(',') === key);
    if (match) {
      result += match.char;
    } else {
      result += '؟';
    }
  }
  return result;
}

// ==========================================
// 3. REACT APP ROOT COMPONENT
// ==========================================
function UrduBrailleApp() {
  const [activeTab, setActiveTab] = useState('translator'); // translator, simulator, lexicon, rules, search, tutor
  const [themeMode, setThemeMode] = useState('oled'); // oled, light
  const [fontSize, setFontSize] = useState('normal'); // normal, large, xlarge

  // Audio & Speech Narration feedback state
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Tab 1: Translator States
  const [inputText, setInputText] = useState('پاکستان ہمارا پیارا وطن ہے');
  const [transMode, setTransMode] = useState('urduToBraille'); // urduToBraille, brailleToUrdu
  const [gradeLevel, setGradeLevel] = useState(2); // 1 = Grade 1 (حرفی), 2 = Grade 2 (مخففات)
  const [brailleInput, setBrailleInput] = useState('');
  const [perkinsActiveDots, setPerkinsActiveDots] = useState([]);

  // Tab 2: Simulator States
  const [simMode, setSimMode] = useState('perkins'); // perkins, slate
  const [isSlateFlipped, setIsSlateFlipped] = useState(false);
  const [simulatorCells, setSimulatorCells] = useState([]);
  const [currentCellDots, setCurrentCellDots] = useState([]);
  const [practiceTier, setPracticeTier] = useState(1); // 1, 2, 3, 4
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceFeedback, setPracticeFeedback] = useState(null);

  // Tab 3: Lexicon States
  const [lexiconFilter, setLexiconFilter] = useState('all');
  const [lexiconSearch, setLexiconSearch] = useState('');

  // Tab 4: Rules States
  const [titleToCenter, setTitleToCenter] = useState('اردو بریل ماسٹر کورس');
  const [paperWidth, setPaperWidth] = useState(38); // 38 or 40

  // Tab 5: Smart Search States
  const [dotQuery, setDotQuery] = useState([]);
  const [wordQuery, setWordQuery] = useState('');

  // Tab 6: AI Tutor States
  const [auditText, setAuditText] = useState('ہم بہت خوش ہیں اور ایک دوسرے کے ساتھ رہتے ہیں۔');
  const [auditResults, setAuditResults] = useState(null);
  const [quizCategory, setQuizCategory] = useState('all');
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  // Apply dark mode class to html
  useEffect(() => {
    if (themeMode === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 min-h-screen';
    } else {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-oledBlack text-slate-100 min-h-screen';
    }
  }, [themeMode]);

  // Compute translation in real time
  const translationOutput = useMemo(() => {
    if (transMode === 'urduToBraille') {
      return transcribeUrduToBraille(inputText, gradeLevel);
    } else {
      const urdu = transcribeBrailleToUrdu(brailleInput);
      return { cells: [], brailleUnicode: brailleInput, urduOutput: urdu };
    }
  }, [inputText, brailleInput, transMode, gradeLevel]);

  // Handle hardware keyboard for Perkins Brailler (F, D, S, J, K, L, Space, Enter, Backspace)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept when user is typing inside text inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();
      const dotMap = {
        'f': 1, 'd': 2, 's': 3,
        'j': 4, 'k': 5, 'l': 6
      };

      if (dotMap[key]) {
        e.preventDefault();
        triggerHaptic(20);
        setCurrentCellDots(prev => {
          const d = dotMap[key];
          return prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d].sort();
        });
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        commitCurrentCell();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLastCell();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        commitCurrentCell();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCellDots]);

  // Commit current dot selection to simulator / braille text
  const commitCurrentCell = () => {
    triggerHaptic(40);
    const unicodeChar = dotsToUnicode(currentCellDots);
    setSimulatorCells(prev => [...prev, { dots: [...currentCellDots], unicode: unicodeChar }]);
    setBrailleInput(prev => prev + unicodeChar);
    setCurrentCellDots([]);
  };

  const deleteLastCell = () => {
    triggerHaptic(30);
    if (currentCellDots.length > 0) {
      setCurrentCellDots([]);
    } else {
      setSimulatorCells(prev => prev.slice(0, -1));
      setBrailleInput(prev => prev.slice(0, -1));
    }
  };

  // Voice Input helper using Android native bridge or browser web speech
  const handleStartVoice = () => {
    triggerHaptic(50);
    if (window.AndroidVoice && typeof window.AndroidVoice.startVoiceInput === 'function') {
      window.onVoiceResult = (text) => {
        setInputText(prev => prev ? prev + ' ' + text : text);
        speakText('آواز موصول ہوئی: ' + text);
      };
      window.AndroidVoice.startVoiceInput('window.onVoiceResult');
      return;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ur-PK';
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev ? prev + ' ' + transcript : transcript);
        speakText('آواز موصول ہوئی: ' + transcript);
      };
      recognition.onerror = () => {
        speakText('آواز کی شناخت میں خرابی، دوبارہ کوشش کریں۔');
      };
      recognition.start();
    } else {
      alert('اس ڈیوائس پر صوتی ان پٹ دستیاب نہیں ہے۔');
    }
  };

  // Run AI Proofreader Audit
  const handleRunAudit = () => {
    triggerHaptic(45);
    const issues = [];
    const text = auditText.trim();

    // Check missed Grade 2 single-cell contractions
    const missedContractions = [
      { word: 'بہت', dots: [1, 2], rule: 'کل لفظی مفرد نشان [1,2] استعمال کریں' },
      { word: 'ایک', dots: [1, 5], rule: 'کل لفظی مفرد نشان [1,5] استعمال کریں' },
      { word: 'پر', dots: [1, 2, 3, 4], rule: 'کل لفظی مفرد نشان [1,2,3,4] استعمال کریں' },
      { word: 'چاہیے', dots: [1, 4], rule: 'مخفف چاہیے [1,4] استعمال کریں' },
      { word: 'بھی', dots: [1, 2, 6], rule: 'دو چشمی ھ والا مرکب [1,2] + [6] استعمال کریں' },
      { word: 'میں', dots: [1, 3, 4], rule: 'کل لفظی مفرد نشان [1,3,4] استعمال کریں' },
      { word: 'ساتھ', dots: [5, 2, 3, 4], rule: 'نقطہ 5 کا مخفف [5]+س استعمال کریں' }
    ];

    missedContractions.forEach(item => {
      const regex = new RegExp(`\\b${item.word}\\b`, 'g');
      let match;
      while ((match = regex.exec(text)) !== null) {
        issues.push({
          type: 'missed_g2',
          word: item.word,
          position: match.index,
          recommendation: item.rule,
          dots: item.dots
        });
      }
    });

    // Check Tashdeed placement
    if (text.includes('ّ')) {
      issues.push({
        type: 'tashdeed_rule',
        word: 'تشدید',
        recommendation: 'بریل میں تشدید کا سیل [نقطہ 6] ہمیشہ حرف سے پہلے آتا ہے، بعد میں نہیں۔'
      });
    }

    const score = Math.max(70, 100 - (issues.length * 6));
    setAuditResults({
      score,
      issues,
      timestamp: new Date().toLocaleTimeString('ur-PK')
    });

    speakText(`آڈٹ مکمل ہوا۔ معیار: ${score} فیصد۔ کل تجاویز: ${issues.length}`);
  };

  // Generate Custom Exercise Question
  const generateNewQuizQuestion = () => {
    triggerHaptic(30);
    const pool = ALL_LEXICON_ENTRIES.filter(it => it.dotsCells && it.dotsCells.length > 0);
    const target = pool[Math.floor(Math.random() * pool.length)];

    // 3 random distractors
    const distractors = [];
    while (distractors.length < 3) {
      const cand = pool[Math.floor(Math.random() * pool.length)];
      if (cand.title !== target.title && !distractors.some(d => d.title === cand.title)) {
        distractors.push(cand);
      }
    }

    const allOptions = [target, ...distractors].sort(() => 0.5 - Math.random());
    setQuizQuestion({
      target,
      options: allOptions
    });
    setQuizFeedback(null);
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeMode === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-oledBlack text-slate-100'}`}>

      {/* TOP ACCESSIBILITY APP BAR */}
      <header className={`sticky top-0 z-50 border-b px-4 py-3 flex items-center justify-between shadow-md ${
        themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brandBlue to-brandPurple flex items-center justify-center shadow-lg">
            <span className="text-xl">⠃</span>
          </div>
          <div>
            <h1 className="text-lg font-bold font-urdu tracking-wide leading-tight">اردو بریل ماسٹر</h1>
            <p className="text-xs text-slate-400 font-sans">Pakistani Urdu Braille AIOU 3601</p>
          </div>
        </div>

        {/* Quick controls: Theme & TTS Speech */}
        <div className="flex items-center gap-2">
          {/* TTS Speed button */}
          <button
            onClick={() => {
              triggerHaptic(20);
              setSpeechSpeed(prev => (prev === 1.0 ? 0.75 : prev === 0.75 ? 1.25 : 1.0));
              speakText(`رفتار: ${speechSpeed === 1.0 ? 'آہستہ' : speechSpeed === 0.75 ? 'تیز' : 'معمول'}`);
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 ${
              themeMode === 'light' ? 'border-slate-300 bg-slate-100 text-slate-700' : 'border-slate-700 bg-slate-800 text-slate-200'
            }`}
            title="رفتارِ تلفظ تبدیل کریں"
            aria-label={`تلفظ کی رفتار: ${speechSpeed}x`}
          >
            <span>🔊 {speechSpeed}x</span>
          </button>

          {/* Theme Mode Toggle */}
          <button
            onClick={() => {
              triggerHaptic(30);
              const next = themeMode === 'oled' ? 'light' : 'oled';
              setThemeMode(next);
              speakText(next === 'light' ? 'لائٹ موڈ آن' : 'او ایل ای ڈی ڈارک موڈ آن');
            }}
            className={`p-2 rounded-lg border flex items-center justify-center ${
              themeMode === 'light' ? 'border-slate-300 bg-slate-100 text-amber-600' : 'border-slate-700 bg-slate-800 text-amber-400'
            }`}
            title="تھیم تبدیل کریں (Light / Dark)"
            aria-label="تھیم سوئچر"
          >
            <span className="material-symbols-outlined text-lg">
              {themeMode === 'oled' ? 'wb_sunny' : 'nightlight'}
            </span>
          </button>
        </div>
      </header>

      {/* CORE 6 TABS NAVIGATION */}
      <nav
        className={`border-b overflow-x-auto no-scrollbar px-2 flex gap-1 ${
          themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
        }`}
        aria-label="اہم مینو ٹیبز"
      >
        {[
          { id: 'translator', label: 'بریل مترجم', icon: 'translate' },
          { id: 'simulator', label: 'عملی مشق گاہ', icon: 'keyboard' },
          { id: 'lexicon', label: 'جامع لغت', icon: 'menu_book' },
          { id: 'rules', label: 'رموز و قواعد', icon: 'format_shapes' },
          { id: 'search', label: 'ہوشیار تلاش', icon: 'search' },
          { id: 'tutor', label: 'معلم بریل اے آئی', icon: 'psychology' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                triggerHaptic(25);
                setActiveTab(tab.id);
                speakText(tab.label);
              }}
              className={`py-3 px-3.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold border-b-2 transition-all font-urdu ${
                isActive
                  ? 'border-brandBlue text-brandBlue font-bold bg-blue-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
              role="tab"
              aria-selected={isActive}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 pb-20">

        {/* ========================================================
            TAB 1: بریل مترجم (Urdu ⇄ Braille Translator)
            ======================================================== */}
        {activeTab === 'translator' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Mode Selector and Grade 1 vs Grade 2 Toggle */}
            <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-darkSurface border-darkBorder'
            }`}>
              {/* Direction Toggle */}
              <div className="flex items-center gap-2 bg-slate-900/40 p-1 rounded-xl border border-slate-700/60">
                <button
                  onClick={() => {
                    triggerHaptic(20);
                    setTransMode('urduToBraille');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-urdu transition-all ${
                    transMode === 'urduToBraille' ? 'bg-brandBlue text-white shadow' : 'text-slate-400'
                  }`}
                >
                  اردو ➔ بریل
                </button>
                <button
                  onClick={() => {
                    triggerHaptic(20);
                    setTransMode('brailleToUrdu');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-urdu transition-all ${
                    transMode === 'brailleToUrdu' ? 'bg-brandBlue text-white shadow' : 'text-slate-400'
                  }`}
                >
                  بریل ➔ اردو
                </button>
              </div>

              {/* Grade Toggle: Grade 1 (حرفی) vs Grade 2 (مخففات) */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 font-urdu">معیارِ بریل:</span>
                <div className="flex bg-slate-900/40 p-1 rounded-xl border border-slate-700/60">
                  <button
                    onClick={() => {
                      triggerHaptic(20);
                      setGradeLevel(1);
                      speakText('درجہ اول: حرفی بریل فعال ہے');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-urdu ${
                      gradeLevel === 1 ? 'bg-brandEmerald text-white shadow' : 'text-slate-400'
                    }`}
                  >
                    درجہ اول (حرفی)
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic(20);
                      setGradeLevel(2);
                      speakText('درجہ دوم: مخففات و اختصارات فعال ہے');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-urdu ${
                      gradeLevel === 2 ? 'bg-brandPurple text-white shadow' : 'text-slate-400'
                    }`}
                  >
                    درجہ دوم (مخففات)
                  </button>
                </div>
              </div>
            </div>

            {/* Input Box */}
            <div className={`p-5 rounded-2xl border ${
              themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold font-urdu flex items-center gap-2">
                  <span className="material-symbols-outlined text-brandBlue">edit_note</span>
                  {transMode === 'urduToBraille' ? 'اردو عبارت درج کریں:' : 'بریل پیٹرن / یونی کوڈ درج کریں:'}
                </label>

                {/* Voice Input button & Clear */}
                <div className="flex items-center gap-2">
                  {transMode === 'urduToBraille' && (
                    <button
                      onClick={handleStartVoice}
                      className="px-2.5 py-1 rounded-lg bg-brandBlue/20 text-brandBlue text-xs font-semibold border border-brandBlue/40 flex items-center gap-1 hover:bg-brandBlue/30"
                      title="مائیکروفون سے بولیں"
                      aria-label="صوتی ان پٹ"
                    >
                      <span className="material-symbols-outlined text-sm">mic</span>
                      <span>بولیں</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      triggerHaptic(20);
                      if (transMode === 'urduToBraille') setInputText('');
                      else setBrailleInput('');
                    }}
                    className="text-xs text-slate-400 hover:text-rose-400"
                    title="صاف کریں"
                  >
                    صاف کریں
                  </button>
                </div>
              </div>

              {transMode === 'urduToBraille' ? (
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  dir="rtl"
                  rows={3}
                  className={`w-full p-3 rounded-xl border text-lg font-urdu outline-none focus:ring-2 focus:ring-brandBlue/50 ${
                    themeMode === 'light' ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-oledBlack border-slate-700 text-slate-100'
                  }`}
                  placeholder="یہاں اردو لکھیے..."
                  aria-label="اردو ٹیکسٹ ان پٹ"
                />
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={brailleInput}
                    onChange={(e) => setBrailleInput(e.target.value)}
                    dir="ltr"
                    className={`w-full p-3 rounded-xl border text-2xl font-mono outline-none focus:ring-2 focus:ring-brandBlue/50 ${
                      themeMode === 'light' ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-oledBlack border-slate-700 text-slate-100'
                    }`}
                    placeholder="⠏⠁⠅⠎⠞⠁⠝"
                    aria-label="بریل یونی کوڈ ان پٹ"
                  />
                  {/* Virtual Perkins Keys inside translator */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center gap-2">
                    <p className="text-xs text-slate-400 font-urdu">پرکنز کی بورڈ سے بریل سیل بنائیں (F-D-S نقاط 1-2-3 | J-K-L نقاط 4-5-6):</p>
                    <div className="flex items-center gap-2">
                      {[3, 2, 1].map(d => (
                        <button
                          key={d}
                          onClick={() => {
                            triggerHaptic(20);
                            setCurrentCellDots(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d].sort());
                          }}
                          className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                            currentCellDots.includes(d)
                              ? 'bg-brailleDotActive text-slate-950 scale-105 shadow-md'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                      <div className="w-px h-8 bg-slate-700 mx-1" />
                      {[4, 5, 6].map(d => (
                        <button
                          key={d}
                          onClick={() => {
                            triggerHaptic(20);
                            setCurrentCellDots(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d].sort());
                          }}
                          className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                            currentCellDots.includes(d)
                              ? 'bg-brailleDotActive text-slate-950 scale-105 shadow-md'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                      <button
                        onClick={commitCurrentCell}
                        className="px-3 py-2 rounded-xl bg-brandEmerald text-white text-xs font-bold font-urdu mr-2 shadow"
                      >
                        درج کریں
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sample Urdu Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/60">
                <span className="text-xs text-slate-400 font-urdu">نمونہ عبارت:</span>
                {[
                  'پاکستان ہمارا پیارا وطن ہے',
                  'علم بڑی دولت ہے',
                  'ہم بہت خوش ہیں اور ایک ساتھ پڑھتے ہیں',
                  'اللہ ایک ہے'
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      triggerHaptic(20);
                      setInputText(sample);
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-urdu"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* RESPONSE PROTOCOL (3 MANDATORY ELEMENTS DISPLAY) */}
            <div className={`p-5 rounded-2xl border space-y-5 ${
              themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-slate-700/60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brandEmerald">verified</span>
                  <h3 className="font-bold text-base font-urdu">بریل ترجمہ کا نتیجہ (تینوں لازمی عناصر)</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brandPurple/20 text-brandPurple font-semibold font-urdu">
                    {gradeLevel === 1 ? 'درجہ اول (حرفی)' : 'درجہ دوم (مخففات)'}
                  </span>
                </div>

                {/* Actions: Speak, Copy, Export BRF */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      triggerHaptic(30);
                      speakText(inputText);
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                    title="عبارت سنیں"
                    aria-label="عبارت سنیں"
                  >
                    <span className="material-symbols-outlined text-base">volume_up</span>
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic(30);
                      navigator.clipboard.writeText(translationOutput.brailleUnicode);
                      speakText('بریل کاپی ہو گئی');
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                    title="کاپی کریں"
                  >
                    <span className="material-symbols-outlined text-base">content_copy</span>
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic(35);
                      exportFileNative(translationOutput.brailleUnicode, 'Urdu_Braille_Export.brf');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-brandBlue hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                    title="ایمبوسر فائل ڈاؤنلوڈ (.brf)"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span className="font-urdu">ایمبوسر فائل (.brf)</span>
                  </button>
                </div>
              </div>

              {/* Element 1: Original Urdu Word or Phrase */}
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 font-urdu block mb-1">۱. اصل اردو عبارت (Original Urdu):</span>
                <p className="text-xl font-bold font-urdu text-brandEmerald" dir="rtl">
                  {transMode === 'urduToBraille' ? inputText || 'کوئی عبارت نہیں' : translationOutput.urduOutput || 'کوئی نتیجہ نہیں'}
                </p>
              </div>

              {/* Element 2: Unicode Braille Cell Glyphs */}
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 font-urdu block mb-1">۲. بریل یونی کوڈ نشانات (Unicode Braille Glyphs):</span>
                <p className="text-3xl font-mono tracking-widest text-brailleDotActive break-all" dir="ltr">
                  {translationOutput.brailleUnicode || '⠠'}
                </p>
              </div>

              {/* Element 3: Exact Dot Numbers for Each Cell */}
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 font-urdu block mb-2">۳. خلیہ بہ خلیہ نقاط کی تفصیل (Dot Combinations Breakdown):</span>

                <div className="flex flex-wrap gap-2.5 max-h-72 overflow-y-auto p-1" dir="ltr">
                  {translationOutput.cells && translationOutput.cells.map((cell, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-between min-w-[70px] ${
                        cell.isGrade2
                          ? 'border-brandPurple/60 bg-brandPurple/10'
                          : themeMode === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                      }`}
                      title={cell.description}
                    >
                      {/* Urdu label */}
                      <span className="text-xs font-bold text-slate-300 font-urdu">{cell.urduChar || 'فاصلہ'}</span>

                      {/* Visual 6-dot Braille Cell */}
                      <div className="braille-cell my-1.5 bg-slate-950/70 border border-slate-700">
                        {[1, 2, 3, 4, 5, 6].map(dotNum => (
                          <div
                            key={dotNum}
                            className={`braille-dot ${
                              cell.dots.includes(dotNum) ? 'bg-brailleDotActive shadow-[0_0_6px_#38BDF8]' : 'bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Dot numbers list */}
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        {cell.dots.length > 0 ? `[${cell.dots.join(',')}]` : '[خالی]'}
                      </span>

                      {/* Cell Audio button */}
                      <button
                        onClick={() => {
                          triggerHaptic(20);
                          const spoken = dotsToSpokenUrdu(cell.dots, cell.nameUrdu);
                          speakText(spoken);
                        }}
                        className="mt-1 text-[10px] text-brandBlue hover:underline flex items-center gap-0.5"
                        aria-label={`سنیں: ${cell.nameUrdu}`}
                      >
                        <span className="material-symbols-outlined text-xs">volume_up</span>
                        <span>سنیں</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: عملی مشق گاہ (Interactive Practice & Perkins/Slate Simulator)
            ======================================================== */}
        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Simulator Mode Switcher: Perkins vs Slate & Stylus */}
            <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold font-urdu">مشق گاہ انداز:</span>
                <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => {
                      triggerHaptic(25);
                      setSimMode('perkins');
                      setIsSlateFlipped(false);
                      speakText('پرکنز موڈ منتخب ہوا: بائیں سے دائیں ایمبوسنگ');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-urdu ${
                      simMode === 'perkins' ? 'bg-brandBlue text-white shadow' : 'text-slate-400'
                    }`}
                  >
                    پرکنز بریلر (بائیں تا دائیں)
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic(25);
                      setSimMode('slate');
                      speakText('سلیٹ اور اسٹائلس موڈ منتخب ہوا: دائیں سے بائیں معکوس ایمبوسنگ');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-urdu ${
                      simMode === 'slate' ? 'bg-brandAmber text-slate-950 shadow' : 'text-slate-400'
                    }`}
                  >
                    سلیٹ اور اسٹائلس (دائیں تا بائیں معکوس)
                  </button>
                </div>
              </div>

              {/* Slate Flip Paper Action */}
              {simMode === 'slate' && (
                <button
                  onClick={() => {
                    triggerHaptic(40);
                    setIsSlateFlipped(!isSlateFlipped);
                    speakText(isSlateFlipped ? 'کاغذ کا رخ سیدھا ہوا' : 'کاغذ الٹ دیا گیا، اب سیدھی بریل پڑھیں');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-brandPurple hover:bg-purple-600 text-white text-xs font-bold font-urdu flex items-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-sm">flip</span>
                  <span>{isSlateFlipped ? 'کاغذ الٹیں (واپس سلیٹ رخ)' : 'کاغذ الٹیں (سیدھی بریل پڑھیں)'}</span>
                </button>
              )}
            </div>

            {/* Embossed Paper Output Surface */}
            <div className={`p-6 rounded-2xl border min-h-[140px] flex flex-col justify-between ${
              themeMode === 'light' ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-urdu">
                <span>
                  {simMode === 'slate'
                    ? isSlateFlipped ? 'کاغذ کی پشت (سیدھا بریل رخ - پڑھنے کا انداز):' : 'سلیٹ رخ (اسٹائلس سے نقطہ دبائیں - معکوس انداز):'
                    : 'ایمبوس شدہ کاغذ (پرکنز انداز):'}
                </span>
                <button
                  onClick={() => {
                    triggerHaptic(20);
                    setSimulatorCells([]);
                  }}
                  className="text-rose-400 hover:underline"
                >
                  کاغذ خالی کریں
                </button>
              </div>

              {/* Embossed Braille Line */}
              <div
                className={`flex flex-wrap gap-2 text-3xl font-mono p-4 rounded-xl border border-dashed ${
                  themeMode === 'light' ? 'border-amber-300 bg-white' : 'border-slate-700 bg-slate-900/50'
                } ${simMode === 'slate' && !isSlateFlipped ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
                dir={simMode === 'slate' && !isSlateFlipped ? 'rtl' : 'ltr'}
              >
                {simulatorCells.length === 0 ? (
                  <span className="text-sm font-urdu text-slate-500 py-3">
                    {simMode === 'slate'
                      ? 'اسٹائلس کی مدد سے دائیں سے بائیں نقاط دبائیں...'
                      : 'نیچے پرکنز کیز (F-D-S اور J-K-L) دبا کر لکھیں...'}
                  </span>
                ) : (
                  simulatorCells.map((cell, idx) => (
                    <div
                      key={idx}
                      className="inline-flex flex-col items-center bg-slate-800/40 p-1 rounded-lg border border-slate-700/60"
                    >
                      <span className="text-brailleDotActive">{cell.unicode}</span>
                      <span className="text-[10px] text-slate-400 font-mono">[{cell.dots.join(',')}]</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* VIRTUAL BRAILLER / SLATE INTERACTION CONTROLLER */}
            <div className={`p-6 rounded-2xl border ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <h3 className="font-bold text-base font-urdu mb-4 flex items-center justify-between">
                <span>
                  {simMode === 'slate'
                    ? 'اسٹائلس ان پٹ سیل (دائیں ہاتھ سے نقاط دبائیں):'
                    : 'پرکنز 6-کی بورڈ (F-D-S اور J-K-L):'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  سیل نقاط: {formatDots(currentCellDots)}
                </span>
              </h3>

              {/* Braille 6-Key Layout */}
              <div className="flex flex-col items-center gap-6">
                {/* Visual Active Dots Cell in Center */}
                <div className="w-16 h-24 rounded-2xl bg-slate-950 border-2 border-slate-700 p-2.5 grid grid-cols-2 gap-2 shadow-inner">
                  {[1, 2, 3, 4, 5, 6].map(d => {
                    const isSlateMirrored = simMode === 'slate' && !isSlateFlipped;
                    // Mirror dots 1-2-3 with 4-5-6 in slate mode
                    const active = currentCellDots.includes(d);
                    return (
                      <div
                        key={d}
                        className={`rounded-full transition-all flex items-center justify-center font-bold text-[10px] ${
                          active
                            ? 'bg-brailleDotActive text-slate-950 shadow-[0_0_8px_#38BDF8]'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {d}
                      </div>
                    );
                  })}
                </div>

                {/* Perkins Physical / Touch Keypad */}
                <div className="w-full flex items-center justify-center gap-2 md:gap-4 max-w-lg">
                  {/* Left Hand: Dots 3, 2, 1 (Keys S, D, F) */}
                  <div className="flex gap-2">
                    {[
                      { dot: 3, key: 'S' },
                      { dot: 2, key: 'D' },
                      { dot: 1, key: 'F' }
                    ].map(btn => (
                      <button
                        key={btn.dot}
                        onClick={() => {
                          triggerHaptic(25);
                          setCurrentCellDots(prev =>
                            prev.includes(btn.dot) ? prev.filter(x => x !== btn.dot) : [...prev, btn.dot].sort()
                          );
                        }}
                        className={`w-12 h-20 md:w-14 md:h-24 rounded-2xl flex flex-col items-center justify-between p-2 font-bold transition-all transform active:scale-95 shadow-md ${
                          currentCellDots.includes(btn.dot)
                            ? 'bg-brailleDotActive text-slate-950 ring-4 ring-sky-500/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                        aria-label={`نقطہ ${btn.dot} (بٹن ${btn.key})`}
                      >
                        <span className="text-xs text-slate-400 font-mono">{btn.key}</span>
                        <span className="text-xl">{btn.dot}</span>
                        <div className={`w-3 h-3 rounded-full ${currentCellDots.includes(btn.dot) ? 'bg-slate-950' : 'bg-slate-600'}`} />
                      </button>
                    ))}
                  </div>

                  {/* Center Spacebar */}
                  <button
                    onClick={commitCurrentCell}
                    className="flex-1 max-w-[100px] h-20 md:h-24 rounded-2xl bg-slate-700 hover:bg-slate-600 border border-slate-600 flex flex-col items-center justify-center font-urdu text-xs text-slate-200 shadow active:scale-95 transition-all"
                    title="خلیہ مکمل کریں / فاصلہ (Spacebar)"
                  >
                    <span className="material-symbols-outlined text-lg">space_bar</span>
                    <span>سیل مکمل</span>
                  </button>

                  {/* Right Hand: Dots 4, 5, 6 (Keys J, K, L) */}
                  <div className="flex gap-2">
                    {[
                      { dot: 4, key: 'J' },
                      { dot: 5, key: 'K' },
                      { dot: 6, key: 'L' }
                    ].map(btn => (
                      <button
                        key={btn.dot}
                        onClick={() => {
                          triggerHaptic(25);
                          setCurrentCellDots(prev =>
                            prev.includes(btn.dot) ? prev.filter(x => x !== btn.dot) : [...prev, btn.dot].sort()
                          );
                        }}
                        className={`w-12 h-20 md:w-14 md:h-24 rounded-2xl flex flex-col items-center justify-between p-2 font-bold transition-all transform active:scale-95 shadow-md ${
                          currentCellDots.includes(btn.dot)
                            ? 'bg-brailleDotActive text-slate-950 ring-4 ring-sky-500/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                        aria-label={`نقطہ ${btn.dot} (بٹن ${btn.key})`}
                      >
                        <span className="text-xs text-slate-400 font-mono">{btn.key}</span>
                        <span className="text-xl">{btn.dot}</span>
                        <div className={`w-3 h-3 rounded-full ${currentCellDots.includes(btn.dot) ? 'bg-slate-950' : 'bg-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Backspace & Clear actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={deleteLastCell}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-rose-400 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">backspace</span>
                    <span className="font-urdu">پچھلا سیل حذف</span>
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic(30);
                      const fullText = simulatorCells.map(c => c.unicode).join('');
                      const urdu = transcribeBrailleToUrdu(fullText);
                      speakText('لکھا گیا: ' + urdu);
                    }}
                    className="px-4 py-2 rounded-xl bg-brandBlue hover:bg-blue-600 text-xs font-semibold text-white flex items-center gap-1.5 shadow"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                    <span className="font-urdu">پڑھ کر سنائیں</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4-TIER INTERACTIVE PRACTICE DRILLS */}
            <div className={`p-6 rounded-2xl border ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-slate-700/60 mb-4">
                <div>
                  <h3 className="font-bold text-base font-urdu">چار درجاتی عملی مشق (4-Tier Interactive Practice)</h3>
                  <p className="text-xs text-slate-400 font-urdu">مرحلہ وار مہارت حاصل کریں اور بریل نقاط کی تصدیق کریں</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-brandEmerald/20 text-brandEmerald font-bold font-mono">
                  اسکور: {practiceScore}
                </span>
              </div>

              {/* Tier Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {[
                  { tier: 1, title: 'پہلا درجہ: حروف و اعراب', desc: 'Grade 1 Alphabets' },
                  { tier: 2, title: 'دوسرا درجہ: دو چشمی ھ و کل لفظی', desc: 'Grade 2 Single Cells' },
                  { tier: 3, title: 'تیسرا درجہ: سابقے و لاحقے', desc: 'Initial & Final Contractions' },
                  { tier: 4, title: 'چوتھا درجہ: عبارتی و وقتی مشق', desc: 'Timed Sentences & Layout' }
                ].map(t => (
                  <button
                    key={t.tier}
                    onClick={() => {
                      triggerHaptic(20);
                      setPracticeTier(t.tier);
                      setPracticeIndex(0);
                      setPracticeFeedback(null);
                    }}
                    className={`p-3 rounded-xl border text-right transition-all ${
                      practiceTier === t.tier
                        ? 'border-brandBlue bg-brandBlue/15 font-bold shadow'
                        : 'border-slate-700/60 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block text-xs font-urdu font-bold">{t.title}</span>
                    <span className="block text-[10px] text-slate-500 font-sans">{t.desc}</span>
                  </button>
                ))}
              </div>

              {/* Active Practice Card */}
              {(() => {
                let targetList = [];
                if (practiceTier === 1) targetList = URDU_BRAILLE_LETTERS.slice(0, 15);
                else if (practiceTier === 2) targetList = GRADE2_CONTRACTIONS.filter(c => c.type === 'dochashmi' || c.type === 'whole_single');
                else if (practiceTier === 3) targetList = GRADE2_CONTRACTIONS.filter(c => c.type === 'dot5' || c.type === 'dots45' || c.type === 'suffix46');
                else targetList = [
                  { urdu: 'پاکستان ہمارا وطن ہے', desc: 'مکمل جملہ درجہ دوم' },
                  { urdu: 'ہم بہت خوش ہیں', desc: 'مخفف ہم اور بہت' },
                  { urdu: 'علم ایک بڑی دولت ہے', desc: 'مخفف ایک اور ہے' }
                ];

                const currentItem = targetList[practiceIndex % targetList.length];
                const expectedDots = currentItem.dots || (currentItem.dotsCells && currentItem.dotsCells[0]) || [];

                return (
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center space-y-4">
                    <span className="text-xs text-brandBlue font-urdu font-semibold">
                      سوال {practiceIndex + 1} از {targetList.length}:
                    </span>

                    <h4 className="text-4xl font-bold font-urdu text-brandEmerald">
                      {currentItem.char || currentItem.urdu}
                    </h4>
                    <p className="text-xs text-slate-400 font-urdu">
                      {currentItem.nameUrdu || currentItem.desc}
                    </p>

                    {/* Feedback result */}
                    {practiceFeedback && (
                      <div className={`p-3 rounded-xl w-full max-w-md text-xs font-urdu font-bold ${
                        practiceFeedback.isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {practiceFeedback.message}
                      </div>
                    )}

                    {/* Check Answer Button using currentCellDots */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          triggerHaptic(35);
                          const userSorted = [...currentCellDots].sort().join(',');
                          const expSorted = [...expectedDots].sort().join(',');
                          if (userSorted === expSorted) {
                            setPracticeScore(prev => prev + 10);
                            setPracticeFeedback({ isCorrect: true, message: 'شاباش! بالکل درست جواب ہے۔' });
                            speakText('بہت خوب! درست جواب ہے۔');
                            setTimeout(() => {
                              setPracticeIndex(prev => prev + 1);
                              setCurrentCellDots([]);
                              setPracticeFeedback(null);
                            }, 1200);
                          } else {
                            setPracticeFeedback({
                              isCorrect: false,
                              message: `غلط! متوقع نقاط: [${expectedDots.join(', ')}] تھے۔ آپ نے [${currentCellDots.join(', ')}] دبائے۔`
                            });
                            speakText(`درست نقاط ${expectedDots.join(' اور ')} ہیں`);
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-brandEmerald hover:bg-emerald-600 text-white font-bold font-urdu shadow"
                      >
                        جواب کی جانچ کریں
                      </button>

                      <button
                        onClick={() => {
                          triggerHaptic(20);
                          setPracticeIndex(prev => prev + 1);
                          setCurrentCellDots([]);
                          setPracticeFeedback(null);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-urdu text-xs"
                      >
                        اگلا سوال ➔
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: جامع بریل لغت (Universal Urdu Braille Lexicon & Dictionary)
            ======================================================== */}
        {activeTab === 'lexicon' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header & Filter Controls */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg font-urdu">جامع اردو بریل لغت و فرہنگ</h3>
                  <p className="text-xs text-slate-400 font-urdu">تمام 38 حروف، اعراب، ہندسے، اور درجہ دوم کے کل لفظی و مرکب مخففات</p>
                </div>

                {/* Search Bar inside Lexicon */}
                <div className="relative min-w-[240px]">
                  <input
                    type="text"
                    value={lexiconSearch}
                    onChange={(e) => setLexiconSearch(e.target.value)}
                    dir="rtl"
                    placeholder="لفظ یا مخفف تلاش کریں..."
                    className={`w-full py-2 pr-9 pl-3 rounded-xl border text-sm font-urdu outline-none focus:ring-2 focus:ring-brandBlue/50 ${
                      themeMode === 'light' ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-oledBlack border-slate-700 text-slate-100'
                    }`}
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-slate-400 text-lg">search</span>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                {[
                  { id: 'all', label: 'تمام (All)' },
                  { id: 'letters', label: 'حروفِ تہجی (Grade 1)' },
                  { id: 'diacritics', label: 'اعراب و نشانات' },
                  { id: 'whole_single', label: 'کل لفظی مفرد نشانات' },
                  { id: 'dochashmi', label: 'دو چشمی ھ مرکبات' },
                  { id: 'dot5', label: 'نقطہ 5 کے ابتدائی مخففات' },
                  { id: 'dots45', label: 'نقاط 4، 5 کے مخففات' },
                  { id: 'dots456', label: 'نقاط 4، 5، 6 کے مخففات' },
                  { id: 'suffix', label: 'لاحقے (4,6 و 5,6)' },
                  { id: 'conjunction', label: 'کہ بیانیہ کے مرکبات' },
                  { id: 'numerals', label: 'ہندسہ جات و علامات' },
                  { id: 'punctuation', label: 'رموزِ اوقاف' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      triggerHaptic(20);
                      setLexiconFilter(cat.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-urdu transition-all ${
                      lexiconFilter === cat.id
                        ? 'bg-brandBlue text-white font-bold shadow'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lexicon Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_LEXICON_ENTRIES
                .filter(item => {
                  // Filter by Category
                  if (lexiconFilter === 'letters') return item.category === 'letters';
                  if (lexiconFilter === 'diacritics') return item.category === 'diacritics';
                  if (lexiconFilter === 'whole_single') return item.type === 'whole_single';
                  if (lexiconFilter === 'dochashmi') return item.type === 'dochashmi';
                  if (lexiconFilter === 'dot5') return item.type === 'dot5';
                  if (lexiconFilter === 'dots45') return item.type === 'dots45';
                  if (lexiconFilter === 'dots456') return item.type === 'dots456';
                  if (lexiconFilter === 'suffix') return item.type === 'suffix46' || item.type === 'suffix56';
                  if (lexiconFilter === 'conjunction') return item.type === 'dot6_conj';
                  if (lexiconFilter === 'numerals') return item.category === 'numerals';
                  if (lexiconFilter === 'punctuation') return item.category === 'punctuation';
                  return true;
                })
                .filter(item => {
                  if (!lexiconSearch) return true;
                  const q = lexiconSearch.trim();
                  return item.title.includes(q) || item.subtitle.includes(q);
                })
                .map((entry, idx) => {
                  const dotsCells = entry.dotsCells || (entry.dots ? [entry.dots] : []);
                  const unicodeGlyphs = dotsCells.map(d => dotsToUnicode(d)).join('');
                  const dotsString = dotsCells.map(d => `[${d.join(',')}]`).join(' + ');

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-all hover:scale-[1.01] ${
                        entry.grade === 2
                          ? 'border-brandPurple/40 bg-brandPurple/5'
                          : themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-darkSurface border-darkBorder'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Braille Unicode Glyph Box */}
                        <div className="w-12 h-14 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
                          <span className="text-2xl font-mono text-brailleDotActive">{unicodeGlyphs}</span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold font-urdu text-brandEmerald">{entry.title}</h4>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                              {dotsString}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 font-urdu">{entry.subtitle}</p>
                          <span className="text-[10px] text-slate-500 font-urdu">{entry.typeName}</span>
                        </div>
                      </div>

                      {/* Audio Button */}
                      <button
                        onClick={() => {
                          triggerHaptic(20);
                          const desc = `${entry.title}، ${entry.subtitle}، بریل نقاط ${dotsString}`;
                          speakText(desc);
                        }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                        title="سنیں"
                        aria-label={`سنیں ${entry.title}`}
                      >
                        <span className="material-symbols-outlined text-base">volume_up</span>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: رموز اوقاف و قواعد (Official Formatting & Grammar Rules)
            ======================================================== */}
        {activeTab === 'rules' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header info */}
            <div className={`p-5 rounded-2xl border ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <h3 className="font-bold text-lg font-urdu text-brandEmerald">سرکاری قواعدِ ضوابط و رموزِ اوقاف</h3>
              <p className="text-xs text-slate-400 font-urdu">
                علامہ اقبال اوپن یونیورسٹی کوڈ 3601 اور قومی بریل کونسل کے مصدقہ معیارات
              </p>
            </div>

            {/* INTERACTIVE TITLE CENTERING CALCULATOR FOR 38 & 40 CELL LINES */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base font-urdu">عنوان کو سطر کے درمیان لانے کا حسابی قاعدہ (Centering Formula)</h4>
                  <p className="text-xs text-slate-400 font-urdu">
                    سرکاری قاعدہ: (کل سطر کے خلیے - عنوان کے خلیے) تقسیم ۲ = بائیں طرف چھوڑے جانے والے خالی خلیے
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-urdu">سطر کی گنجائش:</span>
                  {[38, 40].map(w => (
                    <button
                      key={w}
                      onClick={() => {
                        triggerHaptic(20);
                        setPaperWidth(w);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                        paperWidth === w ? 'bg-brandBlue text-white shadow' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {w} سیل
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold font-urdu text-slate-300">عنوان لکھیں:</label>
                <input
                  type="text"
                  value={titleToCenter}
                  onChange={(e) => setTitleToCenter(e.target.value)}
                  dir="rtl"
                  className={`w-full p-2.5 rounded-xl border font-urdu text-sm outline-none ${
                    themeMode === 'light' ? 'bg-slate-50 border-slate-300' : 'bg-oledBlack border-slate-700'
                  }`}
                />
              </div>

              {/* Centering Calculation Demonstration */}
              {(() => {
                const titleBraille = transcribeUrduToBraille(titleToCenter, 2);
                const titleCellCount = titleBraille.cells.length;
                const leftSpaces = Math.max(0, Math.floor((paperWidth - titleCellCount) / 2));
                const rightSpaces = Math.max(0, paperWidth - titleCellCount - leftSpaces);

                return (
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between text-xs font-urdu text-slate-300">
                      <span>عنوان کے بریل خلیے: <strong className="text-brandEmerald font-mono">{titleCellCount}</strong></span>
                      <span>بائیں جانب چھوڑے جانے والے خالی خلیے: <strong className="text-brandAmber font-mono">{leftSpaces}</strong></span>
                      <span>دائیں جانب بقیہ خلیے: <strong className="text-brandBlue font-mono">{rightSpaces}</strong></span>
                    </div>

                    {/* Visual Cell Line Simulation */}
                    <div className="overflow-x-auto no-scrollbar py-2 border-t border-slate-800">
                      <div className="inline-flex gap-1 p-2 rounded-lg bg-slate-950 border border-slate-800 min-w-full">
                        {Array.from({ length: leftSpaces }).map((_, i) => (
                          <div key={'l' + i} className="w-5 h-7 rounded border border-dashed border-slate-700/60 flex items-center justify-center text-[9px] text-slate-600 font-mono">
                            ␣
                          </div>
                        ))}
                        {titleBraille.cells.map((cell, i) => (
                          <div key={'c' + i} className="w-5 h-7 rounded bg-brandBlue/30 border border-brandBlue/60 flex items-center justify-center text-xs font-mono text-brandBlue font-bold">
                            {cell.unicode}
                          </div>
                        ))}
                        {Array.from({ length: rightSpaces }).map((_, i) => (
                          <div key={'r' + i} className="w-5 h-7 rounded border border-dashed border-slate-700/60 flex items-center justify-center text-[9px] text-slate-600 font-mono">
                            ␣
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* OFFICIAL PUNCTUATION RULES TABLE */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <h4 className="font-bold text-base font-urdu text-brandEmerald">رموزِ اوقاف کی تفصیلی فہرست و نقاشی</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {URDU_BRAILLE_PUNCTUATION.map((p, idx) => {
                  const glyphs = p.dotsCells.map(d => dotsToUnicode(d)).join('');
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-mono text-xl text-brailleDotActive">
                          {glyphs}
                        </div>
                        <div>
                          <h5 className="font-bold text-sm font-urdu text-slate-200">{p.nameUrdu} ({p.char})</h5>
                          <p className="text-xs text-slate-400 font-urdu">{p.explanation}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          triggerHaptic(20);
                          speakText(`${p.nameUrdu}، نشان ${p.explanation}`);
                        }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                      >
                        <span className="material-symbols-outlined text-sm">volume_up</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HYPHENATION & DIACRITIC PLACEMENT RULES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-5 rounded-2xl border space-y-2 ${
                themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
              }`}>
                <h5 className="font-bold text-sm font-urdu text-brandAmber flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">rule</span>
                  <span>سطر کے آخر میں لفظ توڑنے کے قواعد (Hyphenation)</span>
                </h5>
                <ul className="text-xs text-slate-300 font-urdu space-y-1.5 list-disc list-inside leading-relaxed">
                  <li>درجہ دوم کے مخففات اور اختصارات کو کسی صورت سطر کے آخر میں نہیں توڑا جا سکتا۔</li>
                  <li>اگر لفظ کو توڑنا ناگزیر ہو تو سطر کے آخر میں ہائفن نشان [نقاط 3، 6] درج کریں اور بقیہ لفظ اگلی سطر میں منتقل کریں۔</li>
                  <li>حرفِ مشدد اور اس کے ساتھ والی تشدید کو الگ الگ سطروں پر تقسیم کرنا ممنوع ہے۔</li>
                </ul>
              </div>

              <div className={`p-5 rounded-2xl border space-y-2 ${
                themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
              }`}>
                <h5 className="font-bold text-sm font-urdu text-brandBlue flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">font_download</span>
                  <span>اعراب اور تشدید کے قواعد (Diacritic Placement)</span>
                </h5>
                <ul className="text-xs text-slate-300 font-urdu space-y-1.5 list-disc list-inside leading-relaxed">
                  <li><strong>تشدید کا قاعدہ:</strong> تشدید [نقطہ 6] ہمیشہ مشدد حرف سے پہلے درج ہوتی ہے (مثلاً: ابّا میں پہلے الف، پھر [6]، پھر بے)۔</li>
                  <li><strong>حرکات:</strong> زبر [2]، زیر [1,5]، پیش [1,3,6] متعلقہ حرف کے فوراً بعد درج ہوتے ہیں۔</li>
                  <li><strong>جزم / سکون:</strong> جزم [2,5] ساکن حرف کے فوراً بعد بغیر کسی فاصلے کے آتا ہے۔</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: ہوشیار تلاش (Smart Multi-Way Search)
            ======================================================== */}
        {activeTab === 'search' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search Overview */}
            <div className={`p-5 rounded-2xl border ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <h3 className="font-bold text-lg font-urdu text-brandEmerald">ہوشیار کثیر الجہتی تلاش (Smart Multi-Way Search)</h3>
              <p className="text-xs text-slate-400 font-urdu">
                نقاط کے ذریعے معکوس تلاش (Reverse Dot Search) یا اردو لفظ سے براہ راست تلاش کریں
              </p>
            </div>

            {/* INTERACTIVE 6-DOT MATRIX FOR REVERSE DOT SEARCH */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base font-urdu">نقاطی میٹرکس سے تلاش (Reverse 6-Dot Search)</h4>
                  <p className="text-xs text-slate-400 font-urdu">
                    کوئی بھی نقاط دبائیں تاکہ درجہ اول و دوم کے تمام سیاقی معانی ظاہر ہوں
                  </p>
                </div>
                <button
                  onClick={() => {
                    triggerHaptic(20);
                    setDotQuery([]);
                  }}
                  className="text-xs text-rose-400 hover:underline font-urdu"
                >
                  نقاط صاف کریں
                </button>
              </div>

              {/* 6 Dots Toggle Grid */}
              <div className="flex flex-col items-center gap-3">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                  {[
                    [1, 4],
                    [2, 5],
                    [3, 6]
                  ].map((row, rIdx) => (
                    <React.Fragment key={rIdx}>
                      {row.map(d => {
                        const active = dotQuery.includes(d);
                        return (
                          <button
                            key={d}
                            onClick={() => {
                              triggerHaptic(25);
                              setDotQuery(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d].sort());
                            }}
                            className={`w-14 h-14 rounded-2xl font-bold text-lg flex items-center justify-center transition-all ${
                              active
                                ? 'bg-brailleDotActive text-slate-950 scale-105 shadow-[0_0_12px_#38BDF8]'
                                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                            }`}
                            aria-label={`نقطہ ${d}`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>

                <div className="text-center font-mono text-sm text-slate-400">
                  منتخب نقاط: <strong className="text-brailleDotActive">{formatDots(dotQuery)}</strong> | یونی کوڈ: <strong className="text-2xl text-brailleDotActive">{dotsToUnicode(dotQuery)}</strong>
                </div>
              </div>

              {/* Reverse Search Results */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <h5 className="font-bold text-xs text-slate-400 font-urdu mb-2">تلاش کے نتائج (اس سیل کے تمام سیاقی معانی):</h5>

                {(() => {
                  if (dotQuery.length === 0) {
                    return <p className="text-xs text-slate-500 font-urdu py-2">کوئی نقطہ منتخب نہیں ہوا۔ اوپر دیے گئے نقاط پر کلک کیجیے۔</p>;
                  }

                  const queryKey = [...dotQuery].sort().join(',');
                  const matches = ALL_LEXICON_ENTRIES.filter(entry => {
                    const dots = entry.dots || (entry.dotsCells && entry.dotsCells[0]) || [];
                    return dots.sort().join(',') === queryKey;
                  });

                  if (matches.length === 0) {
                    return <p className="text-xs text-amber-400 font-urdu py-2">اس پیٹرن کے لیے کوئی مفرد اندراج نہیں ملا۔ یہ کسی مرکب کا حصہ ہو سکتا ہے۔</p>;
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {matches.map((m, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-base font-bold text-brandEmerald font-urdu">{m.title}</span>
                            <p className="text-xs text-slate-300 font-urdu">{m.subtitle}</p>
                            <span className="text-[10px] text-slate-500 font-urdu">{m.typeName}</span>
                          </div>
                          <button
                            onClick={() => {
                              triggerHaptic(20);
                              speakText(`${m.title}، ${m.subtitle}`);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          >
                            <span className="material-symbols-outlined text-sm">volume_up</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* SEARCH BY URDU WORD */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <h4 className="font-bold text-base font-urdu">اردو لفظ یا جملے سے تلاش</h4>
              <input
                type="text"
                value={wordQuery}
                onChange={(e) => setWordQuery(e.target.value)}
                dir="rtl"
                placeholder="مثلاً: بہت، چاہیے، پانی، یا کوئی بھی لفظ..."
                className={`w-full p-3 rounded-xl border text-sm font-urdu outline-none ${
                  themeMode === 'light' ? 'bg-slate-50 border-slate-300' : 'bg-oledBlack border-slate-700'
                }`}
              />

              {wordQuery && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h5 className="font-bold text-xs text-slate-400 font-urdu mb-2">لفظ کا تجزیہ اور درجہ دوم کے مخففات:</h5>
                  {(() => {
                    const g2Match = GRADE2_CONTRACTIONS.find(c => c.urdu === wordQuery.trim());
                    const g1Braille = transcribeUrduToBraille(wordQuery, 1);
                    const g2Braille = transcribeUrduToBraille(wordQuery, 2);

                    return (
                      <div className="space-y-2 text-xs font-urdu text-slate-300">
                        {g2Match ? (
                          <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                            <strong>مصدقہ مخفف موجود ہے:</strong> {g2Match.desc} | خلیے: {g2Match.dotsCells.map(d => `[${d.join(',')}]`).join(' + ')}
                          </div>
                        ) : (
                          <p className="text-slate-400">اس لفظ کا کوئی مخصوص درجہ دوم مفرد مخفف نہیں ہے، یہ حروف کے امتزاج سے لکھا جاتا ہے۔</p>
                        )}
                        <div className="flex items-center gap-4 pt-2">
                          <div>
                            <span className="text-slate-500 block">درجہ اول بریل:</span>
                            <span className="text-xl font-mono text-brailleDotActive">{g1Braille.brailleUnicode}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">درجہ دوم بریل:</span>
                            <span className="text-xl font-mono text-purple-400">{g2Braille.brailleUnicode}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: معلم بریل اے آئی (AI Tutor & Assistant)
            ======================================================== */}
        {activeTab === 'tutor' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header info */}
            <div className={`p-5 rounded-2xl border ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-darkSurface border-darkBorder'
            }`}>
              <h3 className="font-bold text-lg font-urdu text-brandEmerald">معلم بریل اے آئی (AI Tutor & Assistant)</h3>
              <p className="text-xs text-slate-400 font-urdu">
                خودکار تصحیح (Proofreading)، چھوٹ جانے والے مخففات کی نشاندہی، اور اساتذہ و طلبہ کے لیے حسبِ منشا امتحانی مشقیں
              </p>
            </div>

            {/* AUTOMATED PROOFREADER & VALIDATOR */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base font-urdu flex items-center gap-2">
                  <span className="material-symbols-outlined text-brandBlue">fact_check</span>
                  <span>خودکار بریل جانچ و آڈٹ (Automated Proofreader)</span>
                </h4>
                <button
                  onClick={handleRunAudit}
                  className="px-4 py-2 rounded-xl bg-brandBlue hover:bg-blue-600 text-white font-bold font-urdu text-xs shadow flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  <span>جانچ شروع کریں</span>
                </button>
              </div>

              <textarea
                value={auditText}
                onChange={(e) => setAuditText(e.target.value)}
                dir="rtl"
                rows={3}
                className={`w-full p-3 rounded-xl border text-base font-urdu outline-none ${
                  themeMode === 'light' ? 'bg-slate-50 border-slate-300' : 'bg-oledBlack border-slate-700'
                }`}
                placeholder="تحریر یہاں درج کیجیے..."
              />

              {/* Audit Results Panel */}
              {auditResults && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 font-urdu">
                      آڈٹ نتیجہ برائے: {auditResults.timestamp}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                      auditResults.score >= 90 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      معیاری اسکور: {auditResults.score}%
                    </span>
                  </div>

                  {auditResults.issues.length === 0 ? (
                    <p className="text-xs text-emerald-400 font-urdu">
                      مبارک ہو! اس تحریر میں کوئی غلطی یا چھوٹ جانے والا مخفف نہیں پایا گیا۔
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <span className="text-xs text-slate-400 font-urdu block">شناخت شدہ امور اور تجاویز:</span>
                      {auditResults.issues.map((issue, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-amber-400 text-base mt-0.5">warning</span>
                          <div className="text-xs font-urdu">
                            <span className="font-bold text-slate-200">لفظ: "{issue.word}" </span>
                            <span className="text-slate-400">- {issue.recommendation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CUSTOM EXERCISE GENERATOR FOR STUDENTS & TEACHERS */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-darkSurface border-darkBorder'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base font-urdu flex items-center gap-2">
                    <span className="material-symbols-outlined text-brandPurple">quiz</span>
                    <span>امتحانی کوئز جنریٹر (Quiz Generator)</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-urdu">طالب علموں کی آزمائش کے لیے سوالات بنائیں</p>
                </div>

                <button
                  onClick={generateNewQuizQuestion}
                  className="px-4 py-2 rounded-xl bg-brandPurple hover:bg-purple-600 text-white font-bold font-urdu text-xs shadow"
                >
                  نیا سوال بنائیں
                </button>
              </div>

              {quizQuestion ? (
                <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 text-center">
                  <span className="text-xs text-slate-400 font-urdu">درج ذیل بریل سیل کس لفظ یا حرف کی نمائندگی کرتا ہے؟</span>

                  {/* Question Visual Cell */}
                  <div className="w-16 h-24 mx-auto rounded-2xl bg-slate-950 border-2 border-brandBlue/60 p-2.5 grid grid-cols-2 gap-2 shadow-lg">
                    {[1, 2, 3, 4, 5, 6].map(d => {
                      const active = (quizQuestion.target.dots || (quizQuestion.target.dotsCells && quizQuestion.target.dotsCells[0]) || []).includes(d);
                      return (
                        <div
                          key={d}
                          className={`rounded-full flex items-center justify-center font-bold text-[10px] ${
                            active ? 'bg-brailleDotActive text-slate-950 shadow-[0_0_8px_#38BDF8]' : 'bg-slate-800 text-slate-600'
                          }`}
                        >
                          {d}
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-2xl font-mono text-brailleDotActive">
                    {dotsToUnicode(quizQuestion.target.dots || (quizQuestion.target.dotsCells && quizQuestion.target.dotsCells[0]) || [])}
                  </p>

                  {/* Feedback */}
                  {quizFeedback && (
                    <div className={`p-3 rounded-xl max-w-sm mx-auto text-xs font-urdu font-bold ${
                      quizFeedback.correct ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      {quizFeedback.message}
                    </div>
                  )}

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {quizQuestion.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          triggerHaptic(30);
                          const isCorrect = opt.title === quizQuestion.target.title;
                          setQuizFeedback({
                            correct: isCorrect,
                            message: isCorrect
                              ? 'زبردست! بالکل درست جواب ہے۔'
                              : `غلط! صحیح جواب "${quizQuestion.target.title}" تھا (${quizQuestion.target.subtitle})۔`
                          });
                          speakText(isCorrect ? 'بہت خوب! شاباش' : 'دوبارہ کوشش کریں');
                        }}
                        className="p-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-urdu font-bold text-sm transition-all"
                      >
                        {opt.title} ({opt.subtitle})
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 font-urdu text-sm border border-dashed border-slate-800 rounded-xl">
                  اوپر 'نیا سوال بنائیں' بٹن پر کلک کریں تاکہ طالب علم کے لیے فوری ٹیسٹ شروع ہو۔
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className={`mt-auto border-t py-4 px-6 text-center text-xs ${
        themeMode === 'light' ? 'bg-white border-slate-200 text-slate-500' : 'bg-darkSurface border-darkBorder text-slate-400'
      }`}>
        <p className="font-urdu">
          اردو بریل ماسٹر - Allama Iqbal Open University Code 3601 & National Braille Standards
        </p>
      </footer>
    </div>
  );
}

// Mount the App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<UrduBrailleApp />);
}
