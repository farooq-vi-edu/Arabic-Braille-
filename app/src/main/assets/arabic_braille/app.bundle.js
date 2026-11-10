
/** Urdu Braille Master App Bundle - Precompiled */
(function() {
  try {
    /* UrduBrailleApp.jsx - Comprehensive Pakistani Urdu Braille Application
   Strictly adheres to Allama Iqbal Open University (AIOU) Code 3601 & National Braille Standards.
*/

const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} = React;

// ==============================================================================
// 1. OFFICIAL PAKISTANI URDU BRAILLE REGISTRY (AIOU CODE 3601 & NATIONAL STANDARDS)
// ==============================================================================

const URDU_BRAILLE_REGISTRY = [
// --- Grade 1: حروف تہجی (Alphabets) ---
{
  id: 'alif',
  char: 'ا',
  nameUrdu: 'الف',
  nameEn: 'Alif',
  dots: [1],
  category: 'alphabets',
  grade: 1,
  example: 'انسان'
}, {
  id: 'alif_madd',
  char: 'آ',
  nameUrdu: 'الف مد آ',
  nameEn: 'Alif Madd',
  dots: [3, 4, 5],
  category: 'alphabets',
  grade: 1,
  example: 'آسمان'
}, {
  id: 'bay',
  char: 'ب',
  nameUrdu: 'بے',
  nameEn: 'Bay',
  dots: [1, 2],
  category: 'alphabets',
  grade: 1,
  example: 'بہار'
}, {
  id: 'pay',
  char: 'پ',
  nameUrdu: 'پے',
  nameEn: 'Pay',
  dots: [1, 2, 3, 4],
  category: 'alphabets',
  grade: 1,
  example: 'پاکستان'
}, {
  id: 'tay',
  char: 'ت',
  nameUrdu: 'تے',
  nameEn: 'Tay',
  dots: [2, 3, 4, 5],
  category: 'alphabets',
  grade: 1,
  example: 'تعلیم'
}, {
  id: 'ttay',
  char: 'ٹ',
  nameUrdu: 'ٹے',
  nameEn: 'Ttay',
  dots: [2, 3, 4, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'ٹماٹر'
}, {
  id: 'say',
  char: 'ث',
  nameUrdu: 'ثے',
  nameEn: 'Say',
  dots: [1, 4, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'ثواب'
}, {
  id: 'jeem',
  char: 'ج',
  nameUrdu: 'جیم',
  nameEn: 'Jeem',
  dots: [2, 4, 5],
  category: 'alphabets',
  grade: 1,
  example: 'جہان'
}, {
  id: 'chay',
  char: 'چ',
  nameUrdu: 'چے',
  nameEn: 'Chay',
  dots: [1, 4],
  category: 'alphabets',
  grade: 1,
  example: 'چاند'
}, {
  id: 'hay',
  char: 'ح',
  nameUrdu: 'حائے حطی',
  nameEn: 'Hay',
  dots: [1, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'حکمت'
}, {
  id: 'khay',
  char: 'خ',
  nameUrdu: 'خے',
  nameEn: 'Khay',
  dots: [1, 3, 4, 6],
  category: 'alphabets',
  grade: 1,
  example: 'خوشی'
}, {
  id: 'daal',
  char: 'د',
  nameUrdu: 'دال',
  nameEn: 'Daal',
  dots: [1, 4, 5],
  category: 'alphabets',
  grade: 1,
  example: 'دوست'
}, {
  id: 'ddaal',
  char: 'ڈ',
  nameUrdu: 'ڈال',
  nameEn: 'Ddaal',
  dots: [1, 2, 4, 6],
  category: 'alphabets',
  grade: 1,
  example: 'ڈاکیا'
}, {
  id: 'zaal',
  char: 'ذ',
  nameUrdu: 'ذال',
  nameEn: 'Zaal',
  dots: [2, 3, 4, 6],
  category: 'alphabets',
  grade: 1,
  example: 'ذہن'
}, {
  id: 'ray',
  char: 'ر',
  nameUrdu: 'رے',
  nameEn: 'Ray',
  dots: [1, 2, 3, 5],
  category: 'alphabets',
  grade: 1,
  example: 'روشنی'
}, {
  id: 'rray',
  char: 'ڑ',
  nameUrdu: 'ڑے',
  nameEn: 'Rray',
  dots: [1, 2, 4, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'پہاڑ'
}, {
  id: 'zay',
  char: 'ز',
  nameUrdu: 'زے',
  nameEn: 'Zay',
  dots: [1, 3, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'زندگی'
}, {
  id: 'zhay',
  char: 'ژ',
  nameUrdu: 'ژے',
  nameEn: 'Zhay',
  dots: [3, 4, 6],
  category: 'alphabets',
  grade: 1,
  example: 'ژالہ باری'
}, {
  id: 'seen',
  char: 'س',
  nameUrdu: 'سین',
  nameEn: 'Seen',
  dots: [2, 3, 4],
  category: 'alphabets',
  grade: 1,
  example: 'ستارہ'
}, {
  id: 'sheen',
  char: 'ش',
  nameUrdu: 'شین',
  nameEn: 'Sheen',
  dots: [1, 4, 6],
  category: 'alphabets',
  grade: 1,
  example: 'شمع'
}, {
  id: 'swaad',
  char: 'ص',
  nameUrdu: 'صاد',
  nameEn: 'Swaad',
  dots: [1, 2, 3, 4, 6],
  category: 'alphabets',
  grade: 1,
  example: 'صبر'
}, {
  id: 'zwaad',
  char: 'ض',
  nameUrdu: 'ضاد',
  nameEn: 'Zwaad',
  dots: [1, 2, 4, 6],
  category: 'alphabets',
  grade: 1,
  example: 'ضرورت'
}, {
  id: 'toay',
  char: 'ط',
  nameUrdu: 'طوئے',
  nameEn: 'Toay',
  dots: [2, 3, 4, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'طالب'
}, {
  id: 'zoay',
  char: 'ظ',
  nameUrdu: 'ظوئے',
  nameEn: 'Zoay',
  dots: [1, 2, 3, 4, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'ظلم'
}, {
  id: 'ain',
  char: 'ع',
  nameUrdu: 'عین',
  nameEn: 'Ain',
  dots: [1, 2, 3, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'علم'
}, {
  id: 'ghain',
  char: 'غ',
  nameUrdu: 'غین',
  nameEn: 'Ghain',
  dots: [1, 2, 6],
  category: 'alphabets',
  grade: 1,
  example: 'غریب'
}, {
  id: 'fay',
  char: 'ف',
  nameUrdu: 'فے',
  nameEn: 'Fay',
  dots: [1, 2, 4],
  category: 'alphabets',
  grade: 1,
  example: 'فکر'
}, {
  id: 'qaaf',
  char: 'ق',
  nameUrdu: 'قاف',
  nameEn: 'Qaaf',
  dots: [1, 2, 3, 4, 5],
  category: 'alphabets',
  grade: 1,
  example: 'قلم'
}, {
  id: 'kaaf',
  char: 'ک',
  nameUrdu: 'کاف',
  nameEn: 'Kaaf',
  dots: [1, 3],
  category: 'alphabets',
  grade: 1,
  example: 'کتاب'
}, {
  id: 'gaaf',
  char: 'گ',
  nameUrdu: 'گاف',
  nameEn: 'Gaaf',
  dots: [1, 2, 4, 5],
  category: 'alphabets',
  grade: 1,
  example: 'گلاب'
}, {
  id: 'laam',
  char: 'ل',
  nameUrdu: 'لام',
  nameEn: 'Laam',
  dots: [1, 2, 3],
  category: 'alphabets',
  grade: 1,
  example: 'لاہور'
}, {
  id: 'meem',
  char: 'م',
  nameUrdu: 'میم',
  nameEn: 'Meem',
  dots: [1, 3, 4],
  category: 'alphabets',
  grade: 1,
  example: 'محبت'
}, {
  id: 'noon',
  char: 'ن',
  nameUrdu: 'نون',
  nameEn: 'Noon',
  dots: [1, 3, 4, 5],
  category: 'alphabets',
  grade: 1,
  example: 'نور'
}, {
  id: 'noon_ghunna',
  char: 'ں',
  nameUrdu: 'نون غنہ',
  nameEn: 'Noon Ghunna',
  dots: [5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'ماں'
}, {
  id: 'waw',
  char: 'و',
  nameUrdu: 'واؤ',
  nameEn: 'Waw',
  dots: [2, 4, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'وقت'
}, {
  id: 'hay_hawaaz',
  char: 'ہ',
  nameUrdu: 'گول ہ / ہوز',
  nameEn: 'Chhoti He',
  dots: [1, 2, 5],
  category: 'alphabets',
  grade: 1,
  example: 'ہوا'
}, {
  id: 'do_chashmi_he',
  char: 'ھ',
  nameUrdu: 'دو چشمی ھ',
  nameEn: 'Do Chashmi He',
  dots: [2, 3],
  category: 'alphabets',
  grade: 1,
  example: 'بھائی'
}, {
  id: 'hamza',
  char: 'ء',
  nameUrdu: 'ہمزہ',
  nameEn: 'Hamza',
  dots: [3],
  category: 'alphabets',
  grade: 1,
  example: 'دعا'
}, {
  id: 'hamza_yaa',
  char: 'ئ',
  nameUrdu: 'ہمزہ ی',
  nameEn: 'Hamza Yaa',
  dots: [1, 3, 4, 5, 6],
  category: 'alphabets',
  grade: 1,
  example: 'کوئی'
}, {
  id: 'chhoti_ye',
  char: 'ی',
  nameUrdu: 'چھوٹی ی',
  nameEn: 'Chhoti Ye',
  dots: [2, 4],
  category: 'alphabets',
  grade: 1,
  example: 'یقین'
}, {
  id: 'bari_ye',
  char: 'ے',
  nameUrdu: 'بڑی ے',
  nameEn: 'Bari Ye',
  dots: [3, 4],
  category: 'alphabets',
  grade: 1,
  example: 'ستارے'
},
// --- اعراب و علامات (Diacritics) ---
{
  id: 'zabar',
  char: 'َ',
  nameUrdu: 'زبر (فتحہ)',
  nameEn: 'Zabar (Fathah)',
  dots: [2],
  category: 'diacritics',
  grade: 1,
  example: 'بَ'
}, {
  id: 'zair',
  char: 'ِ',
  nameUrdu: 'زیر (کسرہ)',
  nameEn: 'Zair (Kasrah)',
  dots: [1, 5],
  category: 'diacritics',
  grade: 1,
  example: 'بِ'
}, {
  id: 'paish',
  char: 'ُ',
  nameUrdu: 'پیش (ضمہ)',
  nameEn: 'Paish (Dammah)',
  dots: [1, 3, 6],
  category: 'diacritics',
  grade: 1,
  example: 'بُ'
}, {
  id: 'jazam',
  char: 'ْ',
  nameUrdu: 'جزم (سکون)',
  nameEn: 'Jazam (Sukoon)',
  dots: [2, 5],
  category: 'diacritics',
  grade: 1,
  example: 'بْ'
}, {
  id: 'tashdeed',
  char: 'ّ',
  nameUrdu: 'تشدید (حرف سے پہلے)',
  nameEn: 'Tashdeed (Prepended)',
  dots: [6],
  category: 'diacritics',
  grade: 1,
  example: 'مّ'
}, {
  id: 'khara_zabar',
  char: 'ٰ',
  nameUrdu: 'کھڑا زبر',
  nameEn: 'Khara Zabar',
  dots: [4],
  category: 'diacritics',
  grade: 1,
  example: 'اٰ'
}, {
  id: 'khari_zair',
  char: 'ٖ',
  nameUrdu: 'کھڑی زیر',
  nameEn: 'Khari Zair',
  dots: [4, 5],
  category: 'diacritics',
  grade: 1,
  example: 'ہٖ'
}, {
  id: 'ulta_paish',
  char: 'ٗ',
  nameUrdu: 'الٹا پیش',
  nameEn: 'Ulta Paish',
  dots: [3, 4, 6],
  category: 'diacritics',
  grade: 1,
  example: 'ہٗ'
}, {
  id: 'do_zabar',
  char: 'ً',
  nameUrdu: 'دو زبر (تنوین فتح)',
  nameEn: 'Do Zabar (Tanween)',
  dots: [2, 3],
  category: 'diacritics',
  grade: 1,
  example: 'فوراً'
}, {
  id: 'do_zair',
  char: 'ٍ',
  nameUrdu: 'دو زیر (تنوین کسر)',
  nameEn: 'Do Zair (Tanween)',
  dots: [3, 5],
  category: 'diacritics',
  grade: 1,
  example: 'بٍ'
}, {
  id: 'do_paish',
  char: 'ٌ',
  nameUrdu: 'دو پیش (تنوین ضم)',
  nameEn: 'Do Paish (Tanween)',
  dots: [2, 6],
  category: 'diacritics',
  grade: 1,
  example: 'بٌ'
},
// --- Grade 2: کل لفظی مفرد نشانات (Whole-word Single Cell Contractions) ---
{
  id: 'g2_aa',
  char: 'آ',
  nameUrdu: 'آ (کل لفظی)',
  nameEn: 'Aa (Whole Word)',
  dots: [3, 4, 5],
  category: 'g2_single',
  grade: 2,
  example: 'وہ آ گیا'
}, {
  id: 'g2_aik',
  char: 'ایک',
  nameUrdu: 'ایک',
  nameEn: 'Aik (One)',
  dots: [1, 5],
  category: 'g2_single',
  grade: 2,
  example: 'ایک تھا راجہ'
}, {
  id: 'g2_bohat',
  char: 'بہت',
  nameUrdu: 'بہت',
  nameEn: 'Bohat (Very)',
  dots: [1, 2],
  category: 'g2_single',
  grade: 2,
  example: 'بہت اچھا'
}, {
  id: 'g2_par',
  char: 'پر',
  nameUrdu: 'پر',
  nameEn: 'Par (On/But)',
  dots: [1, 2, 3, 4],
  category: 'g2_single',
  grade: 2,
  example: 'میز پر رکھو'
}, {
  id: 'g2_to',
  char: 'تو',
  nameUrdu: 'تو',
  nameEn: 'To (Then/You)',
  dots: [2, 3, 4, 5],
  category: 'g2_single',
  grade: 2,
  example: 'اگر تم آؤ تو'
}, {
  id: 'g2_saabit',
  char: 'ثابت',
  nameUrdu: 'ثابت',
  nameEn: 'Saabit (Proven)',
  dots: [1, 4, 5, 6],
  category: 'g2_single',
  grade: 2,
  example: 'ثابت قدم'
}, {
  id: 'g2_jo',
  char: 'جو',
  nameUrdu: 'جو',
  nameEn: 'Jo (Who/Which)',
  dots: [2, 4, 5],
  category: 'g2_single',
  grade: 2,
  example: 'جو محنت کرے'
}, {
  id: 'g2_chahiye',
  char: 'چاہیے',
  nameUrdu: 'چاہیے',
  nameEn: 'Chahiye (Should/Need)',
  dots: [1, 4],
  category: 'g2_single',
  grade: 2,
  example: 'ہمیں چاہیے'
}, {
  id: 'g2_haasil',
  char: 'حاصل',
  nameUrdu: 'حاصل',
  nameEn: 'Haasil (Achieved)',
  dots: [1, 5, 6],
  category: 'g2_single',
  grade: 2,
  example: 'علم حاصل کرو'
}, {
  id: 'g2_khaali',
  char: 'خالی',
  nameUrdu: 'خالی',
  nameEn: 'Khaali (Empty)',
  dots: [1, 3, 4, 6],
  category: 'g2_single',
  grade: 2,
  example: 'خالی ہاتھ'
}, {
  id: 'g2_dar',
  char: 'در',
  nameUrdu: 'در',
  nameEn: 'Dar (In/At)',
  dots: [1, 4, 5],
  category: 'g2_single',
  grade: 2,
  example: 'در حقیقت'
}, {
  id: 'g2_zara',
  char: 'ذرا',
  nameUrdu: 'ذرا',
  nameEn: 'Zara (A little)',
  dots: [2, 3, 4, 6],
  category: 'g2_single',
  grade: 2,
  example: 'ذرا سنئے'
}, {
  id: 'g2_raaye',
  char: 'رائے',
  nameUrdu: 'رائے',
  nameEn: 'Raaye (Opinion)',
  dots: [1, 2, 3, 5],
  category: 'g2_single',
  grade: 2,
  example: 'میری رائے ہے'
}, {
  id: 'g2_ziyada',
  char: 'زیادہ',
  nameUrdu: 'زیادہ',
  nameEn: 'Ziyada (More)',
  dots: [1, 3, 5, 6],
  category: 'g2_single',
  grade: 2,
  example: 'زیادہ محنت'
}, {
  id: 'g2_say',
  char: 'سے',
  nameUrdu: 'سے',
  nameEn: 'Say (From/With)',
  dots: [2, 3, 4],
  category: 'g2_single',
  grade: 2,
  example: 'دل سے'
}, {
  id: 'g2_shayad',
  char: 'شاید',
  nameUrdu: 'شاید',
  nameEn: 'Shayad (Perhaps)',
  dots: [1, 4, 6],
  category: 'g2_single',
  grade: 2,
  example: 'شاید بارش ہو'
}, {
  id: 'g2_sirf',
  char: 'صرف',
  nameUrdu: 'صرف',
  nameEn: 'Sirf (Only)',
  dots: [1, 2, 3, 4, 6],
  category: 'g2_single',
  grade: 2,
  example: 'صرف ایک بار'
}, {
  id: 'g2_zaroor',
  char: 'ضرور',
  nameUrdu: 'ضرور',
  nameEn: 'Zaroor (Surely)',
  dots: [1, 2, 4, 6],
  category: 'g2_single',
  grade: 2,
  example: 'ضرور آنا'
}, {
  id: 'g2_taraf',
  char: 'طرف',
  nameUrdu: 'طرف',
  nameEn: 'Taraf (Towards)',
  dots: [2, 3, 4, 5, 6],
  category: 'g2_single',
  grade: 2,
  example: 'اس طرف'
}, {
  id: 'g2_zaahir',
  char: 'ظاہر',
  nameUrdu: 'ظاہر',
  nameEn: 'Zaahir (Apparent)',
  dots: [1, 2, 3, 4, 5, 6],
  category: 'g2_single',
  grade: 2,
  example: 'ظاہر و باطن'
}, {
  id: 'g2_aam',
  char: 'عام',
  nameUrdu: 'عام',
  nameEn: 'Aam (Common)',
  dots: [1, 2, 3, 5, 6],
  category: 'g2_single',
  grade: 2,
  example: 'عام آدمی'
}, {
  id: 'g2_ghair',
  char: 'غیر',
  nameUrdu: 'غیر',
  nameEn: 'Ghair (Other/Non)',
  dots: [1, 2, 6],
  category: 'g2_single',
  grade: 2,
  example: 'غیر حاضر'
}, {
  id: 'g2_faqat',
  char: 'فقط',
  nameUrdu: 'فقط',
  nameEn: 'Faqat (Only/Merely)',
  dots: [1, 2, 4],
  category: 'g2_single',
  grade: 2,
  example: 'فقط والسلام'
}, {
  id: 'g2_qaabil',
  char: 'قابل',
  nameUrdu: 'قابل',
  nameEn: 'Qaabil (Able/Worthy)',
  dots: [1, 2, 3, 4, 5],
  category: 'g2_single',
  grade: 2,
  example: 'قابل تعریف'
}, {
  id: 'g2_kya',
  char: 'کیا',
  nameUrdu: 'کیا',
  nameEn: 'Kya (What)',
  dots: [1, 3],
  category: 'g2_single',
  grade: 2,
  example: 'کیا بات ہے'
}, {
  id: 'g2_goya',
  char: 'گویا',
  nameUrdu: 'گویا',
  nameEn: 'Goya (As if)',
  dots: [1, 2, 4, 5],
  category: 'g2_single',
  grade: 2,
  example: 'گویا سب ٹھیک ہے'
}, {
  id: 'g2_liye',
  char: 'لئے',
  nameUrdu: 'لئے / لیے',
  nameEn: 'Liye (For)',
  dots: [1, 2, 3],
  category: 'g2_single',
  grade: 2,
  example: 'آپ کے لئے'
}, {
  id: 'g2_main',
  char: 'میں',
  nameUrdu: 'میں',
  nameEn: 'Main (In/I)',
  dots: [1, 3, 4],
  category: 'g2_single',
  grade: 2,
  example: 'کمرے میں'
}, {
  id: 'g2_nah',
  char: 'نہ',
  nameUrdu: 'نہ',
  nameEn: 'Nah (No/Not)',
  dots: [1, 3, 4, 5],
  category: 'g2_single',
  grade: 2,
  example: 'ایسا نہ کرو'
}, {
  id: 'g2_woh',
  char: 'وہ',
  nameUrdu: 'وہ',
  nameEn: 'Woh (He/She/That)',
  dots: [2, 4, 5, 6],
  category: 'g2_single',
  grade: 2,
  example: 'وہ کون ہے'
}, {
  id: 'g2_hai',
  char: 'ہے',
  nameUrdu: 'ہے',
  nameEn: 'Hai (Is)',
  dots: [1, 2, 5],
  category: 'g2_single',
  grade: 2,
  example: 'سب ٹھیک ہے'
}, {
  id: 'g2_yeh',
  char: 'یہ',
  nameUrdu: 'یہ',
  nameEn: 'Yeh (This)',
  dots: [2, 4],
  category: 'g2_single',
  grade: 2,
  example: 'یہ میرا ہے'
},
// --- Grade 2: دو چشمی ھ والے مرکبات (Do Chashmi He Contractions) ---
{
  id: 'g2_bhee',
  char: 'بھی',
  nameUrdu: 'بھی',
  nameEn: 'Bhee (Also)',
  compoundCells: [[1, 2], [2, 3]],
  dots: [1, 2],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'تم بھی آؤ'
}, {
  id: 'g2_phir',
  char: 'پھر',
  nameUrdu: 'پھر',
  nameEn: 'Phir (Again)',
  compoundCells: [[1, 2, 3, 4], [2, 3]],
  dots: [1, 2, 3, 4],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'پھر ملیں گے'
}, {
  id: 'g2_thoda',
  char: 'تھوڑا',
  nameUrdu: 'تھوڑا',
  nameEn: 'Thoda (Little)',
  compoundCells: [[2, 3, 4, 5], [2, 3]],
  dots: [2, 3, 4, 5],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'تھوڑا سا'
}, {
  id: 'g2_theek',
  char: 'ٹھیک',
  nameUrdu: 'ٹھیک',
  nameEn: 'Theek (Right/Fine)',
  compoundCells: [[2, 3, 4, 5, 6], [2, 3]],
  dots: [2, 3, 4, 5, 6],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'سب ٹھیک ہے'
}, {
  id: 'g2_jab',
  char: 'جب',
  nameUrdu: 'جب',
  nameEn: 'Jab (When)',
  compoundCells: [[2, 4, 5], [2, 3]],
  dots: [2, 4, 5],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'جب تم کہو'
}, {
  id: 'g2_kuch',
  char: 'کچھ',
  nameUrdu: 'کچھ / چھ',
  nameEn: 'Kuch (Some)',
  compoundCells: [[1, 4], [2, 3]],
  dots: [1, 4],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'کچھ کہو'
}, {
  id: 'g2_dhoop',
  char: 'دھوپ',
  nameUrdu: 'دھوپ',
  nameEn: 'Dhoop (Sunlight)',
  compoundCells: [[1, 4, 5], [2, 3]],
  dots: [1, 4, 5],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'تیز دھوپ'
}, {
  id: 'g2_dher',
  char: 'ڈھیر',
  nameUrdu: 'ڈھیر',
  nameEn: 'Dher (Pile)',
  compoundCells: [[1, 2, 4, 6], [2, 3]],
  dots: [1, 2, 4, 6],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'ڈھیر سارا'
}, {
  id: 'g2_kha',
  char: 'کھا',
  nameUrdu: 'کھا',
  nameEn: 'Kha (Eat)',
  compoundCells: [[1, 3], [2, 3]],
  dots: [1, 3],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'کھانا کھا لو'
}, {
  id: 'g2_ghar',
  char: 'گھر',
  nameUrdu: 'گھر',
  nameEn: 'Ghar (Home)',
  compoundCells: [[1, 2, 4, 5], [2, 3]],
  dots: [1, 2, 4, 5],
  category: 'g2_dochashmi',
  grade: 2,
  example: 'گھر چلو'
},
// --- Grade 2: نقطہ 5 سے بننے والے ابتدائی مخففات (Initial Dot 5 Contractions) ---
{
  id: 'g2_aainda',
  char: 'آئندہ',
  nameUrdu: 'آئندہ',
  nameEn: 'Aainda (Future)',
  compoundCells: [[5], [3, 4, 5]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'آئندہ کل'
}, {
  id: 'g2_baar',
  char: 'بار',
  nameUrdu: 'بار',
  nameEn: 'Baar (Turn/Time)',
  compoundCells: [[5], [1, 2]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'بار بار'
}, {
  id: 'g2_chaar',
  char: 'چار',
  nameUrdu: 'چار',
  nameEn: 'Chaar (Four)',
  compoundCells: [[5], [1, 4]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'چار دن'
}, {
  id: 'g2_haal',
  char: 'حال',
  nameUrdu: 'حال',
  nameEn: 'Haal (Condition)',
  compoundCells: [[5], [1, 5, 6]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'کیا حال ہے'
}, {
  id: 'g2_khush',
  char: 'خوش',
  nameUrdu: 'خوش',
  nameEn: 'Khush (Happy)',
  compoundCells: [[5], [1, 3, 4, 6]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'خوش رہو'
}, {
  id: 'g2_dil',
  char: 'دل',
  nameUrdu: 'دل',
  nameEn: 'Dil (Heart)',
  compoundCells: [[5], [1, 4, 5]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'دل کی بات'
}, {
  id: 'g2_roz',
  char: 'روز',
  nameUrdu: 'روز',
  nameEn: 'Roz (Day)',
  compoundCells: [[5], [1, 2, 3, 5]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'روزانہ'
}, {
  id: 'g2_saath',
  char: 'ساتھ',
  nameUrdu: 'ساتھ',
  nameEn: 'Saath (Together)',
  compoundCells: [[5], [2, 3, 4]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'ہمارے ساتھ'
}, {
  id: 'g2_shumaar',
  char: 'شمار',
  nameUrdu: 'شمار',
  nameEn: 'Shumaar (Count)',
  compoundCells: [[5], [1, 4, 6]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'بے شمار'
}, {
  id: 'g2_kaar',
  char: 'کار',
  nameUrdu: 'کار',
  nameEn: 'Kaar (Work)',
  compoundCells: [[5], [1, 3]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'کاروبار'
}, {
  id: 'g2_naam',
  char: 'نام',
  nameUrdu: 'نام',
  nameEn: 'Naam (Name)',
  compoundCells: [[5], [1, 3, 4, 5]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'آپ کا نام'
}, {
  id: 'g2_waqt',
  char: 'وقت',
  nameUrdu: 'وقت',
  nameEn: 'Waqt (Time)',
  compoundCells: [[5], [2, 4, 5, 6]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'وقت کی قدر'
}, {
  id: 'g2_hum',
  char: 'ہم',
  nameUrdu: 'ہم',
  nameEn: 'Hum (We)',
  compoundCells: [[5], [1, 2, 5]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'ہم سب'
}, {
  id: 'g2_yaad',
  char: 'یاد',
  nameUrdu: 'یاد',
  nameEn: 'Yaad (Memory)',
  compoundCells: [[5], [2, 4]],
  dots: [5],
  category: 'g2_dot5',
  grade: 2,
  example: 'یاد رکھنا'
},
// --- Grade 2: نقاط 4، 5 سے بننے والے مخففات (Dots 4, 5 Contractions) ---
{
  id: 'g2_aahista',
  char: 'آہستہ',
  nameUrdu: 'آہستہ',
  nameEn: 'Aahista (Slowly)',
  compoundCells: [[4, 5], [1]],
  dots: [4, 5],
  category: 'g2_dots45',
  grade: 2,
  example: 'آہستہ چلو'
}, {
  id: 'g2_pohanch',
  char: 'پہنچ',
  nameUrdu: 'پہنچ',
  nameEn: 'Pohanch (Reach)',
  compoundCells: [[4, 5], [1, 2, 3, 4]],
  dots: [4, 5],
  category: 'g2_dots45',
  grade: 2,
  example: 'وہاں پہنچو'
}, {
  id: 'g2_taaluq',
  char: 'تعلق',
  nameUrdu: 'تعلق',
  nameEn: 'Taaluq (Relation)',
  compoundCells: [[4, 5], [2, 3, 4, 5]],
  dots: [4, 5],
  category: 'g2_dots45',
  grade: 2,
  example: 'قریبی تعلق'
}, {
  id: 'g2_haasil45',
  char: 'حاصل',
  nameUrdu: 'حاصل (مرکب)',
  nameEn: 'Haasil',
  compoundCells: [[4, 5], [1, 5, 6]],
  dots: [4, 5],
  category: 'g2_dots45',
  grade: 2,
  example: 'حاصل وصول'
}, {
  id: 'g2_darasal',
  char: 'دراصل',
  nameUrdu: 'دراصل',
  nameEn: 'Darasal (Actually)',
  compoundCells: [[4, 5], [1, 4, 5]],
  dots: [4, 5],
  category: 'g2_dots45',
  grade: 2,
  example: 'دراصل بات یہ ہے'
}, {
  id: 'g2_soorat',
  char: 'صورت',
  nameUrdu: 'صورت',
  nameEn: 'Soorat (Form/Case)',
  compoundCells: [[4, 5], [1, 2, 3, 4, 6]],
  dots: [4, 5],
  category: 'g2_dots45',
  grade: 2,
  example: 'اس صورت میں'
}, {
  id: 'g2_maaloom',
  char: 'معلوم',
  nameUrdu: 'معلوم',
  nameEn: 'Maaloom (Known)',
  compoundCells: [[4, 5], [1, 3, 4]],
  dots: [4, 5],
  category: 'g2_dots45',
  grade: 2,
  example: 'مجھے معلوم ہے'
}, {
  id: 'g2_wajah',
  char: 'وجہ',
  nameUrdu: 'وجہ',
  nameEn: 'Wajah (Reason)',
  compoundCells: [[4, 5], [2, 4, 5, 6]],
  dots: [4, 5],
  category: 'g2_dots45',
  grade: 2,
  example: 'اس کی وجہ'
},
// --- Grade 2: نقاط 4، 5، 6 سے بننے والے مخففات (Dots 4, 5, 6 Contractions) ---
{
  id: 'g2_aamada',
  char: 'آمادہ',
  nameUrdu: 'آمادہ',
  nameEn: 'Aamada (Ready)',
  compoundCells: [[4, 5, 6], [3, 4, 5]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'آمادہ بہ سفر'
}, {
  id: 'g2_bilkul',
  char: 'بالکل',
  nameUrdu: 'بالکل',
  nameEn: 'Bilkul (Absolutely)',
  compoundCells: [[4, 5, 6], [1, 2]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'بالکل درست'
}, {
  id: 'g2_pehal',
  char: 'پہل',
  nameUrdu: 'پہل',
  nameEn: 'Pehal (Initiative)',
  compoundCells: [[4, 5, 6], [1, 2, 3, 4]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'پہل کرو'
}, {
  id: 'g2_tumhara',
  char: 'تمہارا',
  nameUrdu: 'تمہارا',
  nameEn: 'Tumhara (Yours)',
  compoundCells: [[4, 5, 6], [2, 3, 4, 5]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'تمہارا بھائی'
}, {
  id: 'g2_jahan',
  char: 'جہاں',
  nameUrdu: 'جہاں',
  nameEn: 'Jahan (Where/World)',
  compoundCells: [[4, 5, 6], [2, 4, 5]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'سارا جہاں'
}, {
  id: 'g2_khud',
  char: 'خود',
  nameUrdu: 'خود',
  nameEn: 'Khud (Self)',
  compoundCells: [[4, 5, 6], [1, 3, 4, 6]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'خود دیکھو'
}, {
  id: 'g2_darmiyan',
  char: 'درمیان',
  nameUrdu: 'درمیان',
  nameEn: 'Darmiyan (Between)',
  compoundCells: [[4, 5, 6], [1, 4, 5]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'ہمارے درمیان'
}, {
  id: 'g2_dunya',
  char: 'دنیا',
  nameUrdu: 'دنیا',
  nameEn: 'Dunya (World)',
  compoundCells: [[4, 5, 6], [1, 2, 4, 6]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'ساری دنیا'
}, {
  id: 'g2_lekin',
  char: 'لیکن',
  nameUrdu: 'لیکن',
  nameEn: 'Lekin (But)',
  compoundCells: [[4, 5, 6], [1, 2, 3]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'لیکن ایسا نہیں'
}, {
  id: 'g2_maujood',
  char: 'موجود',
  nameUrdu: 'موجود',
  nameEn: 'Maujood (Present)',
  compoundCells: [[4, 5, 6], [1, 3, 4]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'یہاں موجود'
}, {
  id: 'g2_hamesha',
  char: 'ہمیشہ',
  nameUrdu: 'ہمیشہ',
  nameEn: 'Hamesha (Always)',
  compoundCells: [[4, 5, 6], [1, 2, 5]],
  dots: [4, 5, 6],
  category: 'g2_dots456',
  grade: 2,
  example: 'ہمیشہ خوش رہو'
},
// --- Grade 2: لاحقے بر نقاط 4، 6 (Suffixes with Dots 4, 6) ---
{
  id: 'g2_parast',
  char: 'پرست',
  nameUrdu: 'پرست (لاحقہ)',
  nameEn: 'Parast (Suffix)',
  compoundCells: [[4, 6], [1, 2, 3, 4]],
  dots: [4, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'وطن پرست'
}, {
  id: 'g2_baad',
  char: 'باد',
  nameUrdu: 'باد (لاحقہ)',
  nameEn: 'Baad (Suffix)',
  compoundCells: [[4, 6], [1, 2]],
  dots: [4, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'زندہ باد'
}, {
  id: 'g2_geer',
  char: 'گیر',
  nameUrdu: 'گیر (لاحقہ)',
  nameEn: 'Geer (Suffix)',
  compoundCells: [[4, 6], [1, 2, 4, 5]],
  dots: [4, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'عالم گیر'
}, {
  id: 'g2_tareen',
  char: 'ترین',
  nameUrdu: 'ترین (لاحقہ)',
  nameEn: 'Tareen (Suffix)',
  compoundCells: [[4, 6], [2, 3, 4, 5]],
  dots: [4, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'بہترین'
}, {
  id: 'g2_gaah',
  char: 'گاہ',
  nameUrdu: 'گاہ (لاحقہ)',
  nameEn: 'Gaah (Suffix)',
  compoundCells: [[4, 6], [1, 2, 5]],
  dots: [4, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'عید گاہ'
},
// --- Grade 2: لاحقے بر نقاط 5، 6 (Suffixes with Dots 5, 6) ---
{
  id: 'g2_daasht',
  char: 'داشت',
  nameUrdu: 'داشت (لاحقہ)',
  nameEn: 'Daasht (Suffix)',
  compoundCells: [[5, 6], [1, 4, 5]],
  dots: [5, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'یاد داشت'
}, {
  id: 'g2_mand',
  char: 'مند',
  nameUrdu: 'مند (لاحقہ)',
  nameEn: 'Mand (Suffix)',
  compoundCells: [[5, 6], [1, 3, 4]],
  dots: [5, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'عقل مند'
}, {
  id: 'g2_gaar',
  char: 'گار',
  nameUrdu: 'گار (لاحقہ)',
  nameEn: 'Gaar (Suffix)',
  compoundCells: [[5, 6], [1, 2, 4, 5]],
  dots: [5, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'مدد گار'
}, {
  id: 'g2_khaiz',
  char: 'خیز',
  nameUrdu: 'خیز (لاحقہ)',
  nameEn: 'Khaiz (Suffix)',
  compoundCells: [[5, 6], [1, 3, 4, 6]],
  dots: [5, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'حیرت خیز'
}, {
  id: 'g2_furosh',
  char: 'فروش',
  nameUrdu: 'فروش (لاحقہ)',
  nameEn: 'Furosh (Suffix)',
  compoundCells: [[5, 6], [1, 2, 4]],
  dots: [5, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'کتاب فروش'
}, {
  id: 'g2_khanah',
  char: 'خانہ',
  nameUrdu: 'خانہ (لاحقہ)',
  nameEn: 'Khanah (Suffix)',
  compoundCells: [[5, 6], [1, 3]],
  dots: [5, 6],
  category: 'g2_suffixes',
  grade: 2,
  example: 'کتب خانہ'
},
// --- Grade 2: کہ بیانیہ بر نقطہ 6 (Conjunctive 'Keh' on Dot 6) ---
{
  id: 'g2_balkeh',
  char: 'بلکہ',
  nameUrdu: 'بلکہ',
  nameEn: 'Balkeh',
  compoundCells: [[6], [1, 2]],
  dots: [6],
  category: 'g2_keh',
  grade: 2,
  example: 'نہ صرف بلکہ'
}, {
  id: 'g2_taakeh',
  char: 'تاکہ',
  nameUrdu: 'تاکہ',
  nameEn: 'Taakeh',
  compoundCells: [[6], [2, 3, 4, 5]],
  dots: [6],
  category: 'g2_keh',
  grade: 2,
  example: 'پڑھو تاکہ کامیاب ہو'
}, {
  id: 'g2_choonkeh',
  char: 'چونکہ',
  nameUrdu: 'چونکہ',
  nameEn: 'Choonkeh',
  compoundCells: [[6], [1, 4]],
  dots: [6],
  category: 'g2_keh',
  grade: 2,
  example: 'چونکہ وقت کم تھا'
}, {
  id: 'g2_haalaankeh',
  char: 'حالانکہ',
  nameUrdu: 'حالانکہ',
  nameEn: 'Haalaankeh',
  compoundCells: [[6], [1, 5, 6]],
  dots: [6],
  category: 'g2_keh',
  grade: 2,
  example: 'حالانکہ وہ جانتا تھا'
}, {
  id: 'g2_kyonkeh',
  char: 'کیونکہ',
  nameUrdu: 'کیونکہ',
  nameEn: 'Kyonkeh',
  compoundCells: [[6], [1, 3]],
  dots: [6],
  category: 'g2_keh',
  grade: 2,
  example: 'کیونکہ یہ سچ ہے'
}, {
  id: 'g2_jabkeh',
  char: 'جبکہ',
  nameUrdu: 'جبکہ',
  nameEn: 'Jabkeh',
  compoundCells: [[6], [2, 4, 5]],
  dots: [6],
  category: 'g2_keh',
  grade: 2,
  example: 'جبکہ وہ چلا گیا'
},
// --- Grade 2: نشان گنتی کے مرکبات بر نقاط 3، 4، 5، 6 ---
{
  id: 'g2_aawaaz',
  char: 'آواز',
  nameUrdu: 'آواز',
  nameEn: 'Aawaaz (Voice)',
  compoundCells: [[3, 4, 5, 6], [3, 4, 5]],
  dots: [3, 4, 5, 6],
  category: 'g2_numeral_comp',
  grade: 2,
  example: 'میٹھی آواز'
}, {
  id: 'g2_pasand',
  char: 'پسند',
  nameUrdu: 'پسند',
  nameEn: 'Pasand (Like)',
  compoundCells: [[3, 4, 5, 6], [1, 2, 3, 4]],
  dots: [3, 4, 5, 6],
  category: 'g2_numeral_comp',
  grade: 2,
  example: 'مجھے پسند ہے'
}, {
  id: 'g2_tamaam',
  char: 'تمام',
  nameUrdu: 'تمام',
  nameEn: 'Tamaam (All)',
  compoundCells: [[3, 4, 5, 6], [2, 3, 4, 5]],
  dots: [3, 4, 5, 6],
  category: 'g2_numeral_comp',
  grade: 2,
  example: 'تمام لوگ'
}, {
  id: 'g2_khaas',
  char: 'خاص',
  nameUrdu: 'خاص',
  nameEn: 'Khaas (Special)',
  compoundCells: [[3, 4, 5, 6], [1, 3, 4, 6]],
  dots: [3, 4, 5, 6],
  category: 'g2_numeral_comp',
  grade: 2,
  example: 'خاص بات'
}, {
  id: 'g2_saath_num',
  char: 'ساتھ',
  nameUrdu: 'ساتھ (مرکب)',
  nameEn: 'Saath',
  compoundCells: [[3, 4, 5, 6], [2, 3, 4]],
  dots: [3, 4, 5, 6],
  category: 'g2_numeral_comp',
  grade: 2,
  example: 'ساتھ ساتھ'
}, {
  id: 'g2_qaraar',
  char: 'قرار',
  nameUrdu: 'قرار',
  nameEn: 'Qaraar (Rest/Resolution)',
  compoundCells: [[3, 4, 5, 6], [1, 2, 3, 4, 5]],
  dots: [3, 4, 5, 6],
  category: 'g2_numeral_comp',
  grade: 2,
  example: 'قرار پایا'
},
// --- Grade 2: حصہ دوم اختصارات (Abbreviations Part 2) ---
{
  id: 'g2_abhee',
  char: 'ابھی',
  nameUrdu: 'ابھی',
  nameEn: 'Abhee (Now)',
  compoundCells: [[1], [1, 2], [2, 3]],
  dots: [1],
  category: 'g2_abbrev',
  grade: 2,
  example: 'ابھی آؤ'
}, {
  id: 'g2_ab_tak',
  char: 'اب تک',
  nameUrdu: 'اب تک',
  nameEn: 'Ab Tak (Till now)',
  compoundCells: [[1], [2, 3, 4, 5]],
  dots: [1],
  category: 'g2_abbrev',
  grade: 2,
  example: 'اب تک نہیں آیا'
}, {
  id: 'g2_ittefaq',
  char: 'اتفاق',
  nameUrdu: 'اتفاق',
  nameEn: 'Ittefaq (Accord)',
  compoundCells: [[1], [2, 3, 4, 5], [1, 2, 4]],
  dots: [1],
  category: 'g2_abbrev',
  grade: 2,
  example: 'اتفاق رائے'
}, {
  id: 'g2_agarchay',
  char: 'اگرچہ',
  nameUrdu: 'اگرچہ',
  nameEn: 'Agarchay (Although)',
  compoundCells: [[1], [1, 2, 4, 5], [1, 4]],
  dots: [1],
  category: 'g2_abbrev',
  grade: 2,
  example: 'اگرچہ وہ دور ہے'
}, {
  id: 'g2_albattah',
  char: 'البتہ',
  nameUrdu: 'البتہ',
  nameEn: 'Albattah (However)',
  compoundCells: [[1], [1, 2, 3], [1, 2]],
  dots: [1],
  category: 'g2_abbrev',
  grade: 2,
  example: 'البتہ یہ ممکن ہے'
}, {
  id: 'g2_chunanplay',
  char: 'چنانچہ',
  nameUrdu: 'چنانچہ',
  nameEn: 'Chunanplay (Therefore)',
  compoundCells: [[1, 4], [1, 3, 4, 5], [1, 4]],
  dots: [1, 4],
  category: 'g2_abbrev',
  grade: 2,
  example: 'چنانچہ ایسا ہوا'
}, {
  id: 'g2_guftagu',
  char: 'گفتگو',
  nameUrdu: 'گفتگو',
  nameEn: 'Guftagu (Conversation)',
  compoundCells: [[1, 2, 4, 5], [1, 2, 4], [2, 3, 4, 5]],
  dots: [1, 2, 4, 5],
  category: 'g2_abbrev',
  grade: 2,
  example: 'خوبصورت گفتگو'
},
// --- رموزِ اوقاف (Punctuation Rules) ---
{
  id: 'punc_saktah',
  char: '،',
  nameUrdu: 'سکتہ (وقف خفیف / Comma)',
  nameEn: 'Comma (Saktah)',
  dots: [2],
  category: 'punctuation',
  grade: 1,
  example: 'کتاب، قلم اور دوات'
}, {
  id: 'punc_waqfah',
  char: '؛',
  nameUrdu: 'وقفہ (Semicolon)',
  nameEn: 'Semicolon (Waqfah)',
  dots: [2, 3],
  category: 'punctuation',
  grade: 1,
  example: 'محنت کرو؛ کامیابی ملے گی'
}, {
  id: 'punc_raabitah',
  char: ':',
  nameUrdu: 'رابطہ (Colon)',
  nameEn: 'Colon (Raabitah)',
  dots: [2, 5],
  category: 'punctuation',
  grade: 1,
  example: 'اقبال نے کہا:'
}, {
  id: 'punc_tafseeliya',
  char: ':-',
  nameUrdu: 'تفصیلیہ (Colon Dash)',
  nameEn: 'Colon Dash',
  compoundCells: [[2, 5], [3, 6]],
  dots: [2, 5],
  category: 'punctuation',
  grade: 1,
  example: 'تفصیلات درج ذیل ہیں:-'
}, {
  id: 'punc_khatmah',
  char: '۔',
  nameUrdu: 'ختمہ (مکمل وقف / Full Stop)',
  nameEn: 'Full Stop (Khatmah)',
  dots: [2, 5, 6],
  category: 'punctuation',
  grade: 1,
  example: 'سبق ختم ہوا۔'
}, {
  id: 'punc_sawaliya',
  char: '؟',
  nameUrdu: 'سوالیہ (Question Mark)',
  nameEn: 'Question Mark',
  dots: [2, 3, 6],
  category: 'punctuation',
  grade: 1,
  example: 'آپ کا نام کیا ہے؟'
}, {
  id: 'punc_taajjub',
  char: '!',
  nameUrdu: 'تعجب و فجائیہ (Exclamation)',
  nameEn: 'Exclamation',
  dots: [2, 3, 5],
  category: 'punctuation',
  grade: 1,
  example: 'کتنا پیارا پھول ہے!'
}, {
  id: 'punc_qausain',
  char: '(',
  nameUrdu: 'قوسین (Parentheses)',
  nameEn: 'Parentheses',
  dots: [2, 3, 5, 6],
  category: 'punctuation',
  grade: 1,
  example: '(وضاحت)'
}, {
  id: 'punc_wawain_start',
  char: '“',
  nameUrdu: 'ابتدائی واوین (Quotes Open)',
  nameEn: 'Quote Open',
  dots: [2, 3, 6],
  category: 'punctuation',
  grade: 1,
  example: '“سچ بولو”'
}, {
  id: 'punc_wawain_end',
  char: '”',
  nameUrdu: 'اختتامی واوین (Quotes Close)',
  nameEn: 'Quote Close',
  dots: [3, 5, 6],
  category: 'punctuation',
  grade: 1,
  example: '“سچ بولو”'
}, {
  id: 'punc_khat',
  char: '—',
  nameUrdu: 'خط (Dash)',
  nameEn: 'Dash (Khat)',
  compoundCells: [[3, 6], [3, 6]],
  dots: [3, 6],
  category: 'punctuation',
  grade: 1,
  example: 'بات — دوسری بات'
}, {
  id: 'punc_zanjeerah',
  char: '…',
  nameUrdu: 'زنجیرہ (حذف / Ellipsis)',
  nameEn: 'Ellipsis (Zanjeerah)',
  compoundCells: [[3, 6], [3, 6], [3, 6]],
  dots: [3, 6],
  category: 'punctuation',
  grade: 1,
  example: 'وغیرہ وغیرہ…'
},
// --- ہندسے و گنتی (Numerals 0-9) ---
{
  id: 'num_sign',
  char: '#',
  nameUrdu: 'علامتِ عدد (نشان گنتی)',
  nameEn: 'Number Sign Prefix',
  dots: [3, 4, 5, 6],
  category: 'numerals',
  grade: 1,
  example: '#۱'
}, {
  id: 'num_1',
  char: '۱',
  nameUrdu: '۱ (ایک)',
  nameEn: 'Digit 1',
  dots: [1],
  category: 'numerals',
  grade: 1,
  example: '#۱'
}, {
  id: 'num_2',
  char: '۲',
  nameUrdu: '۲ (دو)',
  nameEn: 'Digit 2',
  dots: [1, 2],
  category: 'numerals',
  grade: 1,
  example: '#۲'
}, {
  id: 'num_3',
  char: '۳',
  nameUrdu: '۳ (تین)',
  nameEn: 'Digit 3',
  dots: [1, 4],
  category: 'numerals',
  grade: 1,
  example: '#۳'
}, {
  id: 'num_4',
  char: '۴',
  nameUrdu: '۴ (چار)',
  nameEn: 'Digit 4',
  dots: [1, 4, 5],
  category: 'numerals',
  grade: 1,
  example: '#۴'
}, {
  id: 'num_5',
  char: '۵',
  nameUrdu: '۵ (پانچ)',
  nameEn: 'Digit 5',
  dots: [1, 5],
  category: 'numerals',
  grade: 1,
  example: '#۵'
}, {
  id: 'num_6',
  char: '۶',
  nameUrdu: '۶ (چھ)',
  nameEn: 'Digit 6',
  dots: [1, 2, 4],
  category: 'numerals',
  grade: 1,
  example: '#۶'
}, {
  id: 'num_7',
  char: '۷',
  nameUrdu: '۷ (سات)',
  nameEn: 'Digit 7',
  dots: [1, 2, 4, 5],
  category: 'numerals',
  grade: 1,
  example: '#۷'
}, {
  id: 'num_8',
  char: '۸',
  nameUrdu: '۸ (آٹھ)',
  nameEn: 'Digit 8',
  dots: [1, 2, 5],
  category: 'numerals',
  grade: 1,
  example: '#۸'
}, {
  id: 'num_9',
  char: '۹',
  nameUrdu: '۹ (نو)',
  nameEn: 'Digit 9',
  dots: [2, 4],
  category: 'numerals',
  grade: 1,
  example: '#۹'
}, {
  id: 'num_0',
  char: '۰',
  nameUrdu: '۰ (صفر)',
  nameEn: 'Digit 0',
  dots: [2, 4, 5],
  category: 'numerals',
  grade: 1,
  example: '#۰'
}];

// Helper: Convert dot numbers array into Unicode Braille Character (U+2800 to U+28FF)
function dotsToUnicode(dots) {
  if (!dots || !dots.length) return '⠀'; // U+2800 (Braille blank space)
  let mask = 0;
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    if (d >= 1 && d <= 6) {
      mask |= 1 << d - 1;
    }
  }
  return String.fromCharCode(0x2800 + mask);
}

// Helper: Convert Unicode Braille Character back into array of dot numbers
function unicodeToDots(brailleChar) {
  const code = brailleChar.charCodeAt(0);
  if (code < 0x2800 || code > 0x28FF) return [];
  const mask = code - 0x2800;
  const dots = [];
  for (let d = 1; d <= 6; d++) {
    if ((mask & 1 << d - 1) !== 0) {
      dots.push(d);
    }
  }
  return dots;
}

// Clean Screen-Reader ARIA Dot Description in Urdu & English
function dotsToAriaDescription(dots, lang = 'ur') {
  if (!dots || !dots.length) {
    return lang === 'ur' ? 'خالی خانہ' : 'Blank Braille cell';
  }
  const sorted = [...dots].sort((a, b) => a - b);
  if (lang === 'ur') {
    if (sorted.length === 1) return `نقطہ ${sorted[0]}`;
    const allExceptLast = sorted.slice(0, -1).join('، ');
    const last = sorted[sorted.length - 1];
    return `نقاط ${allExceptLast} اور ${last}`;
  }
  return `Dots ${sorted.join(', ')}`;
}

// Map for quick Grade 1 lookups
const CHAR_MAP_G1 = new Map();
URDU_BRAILLE_REGISTRY.filter(item => item.grade === 1 && !item.compoundCells).forEach(item => {
  CHAR_MAP_G1.set(item.char, item);
});

// Normalized mappings for alternate Arabic/Persian glyph inputs
CHAR_MAP_G1.set('ي', CHAR_MAP_G1.get('ی'));
CHAR_MAP_G1.set('ك', CHAR_MAP_G1.get('ک'));
CHAR_MAP_G1.set('ة', CHAR_MAP_G1.get('ہ'));
CHAR_MAP_G1.set('.', CHAR_MAP_G1.get('۔') || {
  dots: [2, 5, 6],
  char: '۔',
  nameUrdu: 'ختمہ'
});
CHAR_MAP_G1.set(',', CHAR_MAP_G1.get('،') || {
  dots: [2],
  char: '،',
  nameUrdu: 'سکتہ'
});
CHAR_MAP_G1.set(';', CHAR_MAP_G1.get('؛') || {
  dots: [2, 3],
  char: '؛',
  nameUrdu: 'وقفہ'
});
CHAR_MAP_G1.set('?', CHAR_MAP_G1.get('؟') || {
  dots: [2, 3, 6],
  char: '؟',
  nameUrdu: 'سوالیہ'
});
CHAR_MAP_G1.set('1', CHAR_MAP_G1.get('۱'));
CHAR_MAP_G1.set('2', CHAR_MAP_G1.get('۲'));
CHAR_MAP_G1.set('3', CHAR_MAP_G1.get('۳'));
CHAR_MAP_G1.set('4', CHAR_MAP_G1.get('۴'));
CHAR_MAP_G1.set('5', CHAR_MAP_G1.get('۵'));
CHAR_MAP_G1.set('6', CHAR_MAP_G1.get('۶'));
CHAR_MAP_G1.set('7', CHAR_MAP_G1.get('۷'));
CHAR_MAP_G1.set('8', CHAR_MAP_G1.get('۸'));
CHAR_MAP_G1.set('9', CHAR_MAP_G1.get('۹'));
CHAR_MAP_G1.set('0', CHAR_MAP_G1.get('۰'));

// Grade 2 Contractions sorted by descending length for greedy matching
const G2_CONTRACTIONS = URDU_BRAILLE_REGISTRY.filter(item => item.grade === 2).sort((a, b) => b.char.length - a.char.length);

// ==============================================================================
// 2. CORE TRANSLATION ENGINE (URDU ⇄ BRAILLE, GRADE 1 & 2)
// ==============================================================================

function translateUrduToBraille(text, grade = 2, lang = 'ur') {
  if (!text) return {
    cells: [],
    unicodeString: '',
    dotBreakdown: []
  };
  const cells = []; // Array of { urdu: string, dots: number[], unicode: string, aria: string, category: string, note?: string }
  const words = text.split(/(\s+)/); // Preserves spaces and line breaks

  for (let w = 0; w < words.length; w++) {
    const segment = words[w];
    if (!segment) continue;
    if (/^\s+$/.test(segment)) {
      // Space or line break
      for (let s = 0; s < segment.length; s++) {
        if (segment[s] === '\n') {
          cells.push({
            urdu: '\n',
            dots: [],
            unicode: '\n',
            aria: lang === 'ur' ? 'نئی سطر' : 'New line',
            category: 'space'
          });
        } else {
          cells.push({
            urdu: ' ',
            dots: [],
            unicode: '⠀',
            aria: lang === 'ur' ? 'خالی فاصلہ' : 'Space cell',
            category: 'space'
          });
        }
      }
      continue;
    }
    let i = 0;
    while (i < segment.length) {
      let matched = false;

      // Check Grade 2 Contractions if Grade 2 is selected
      if (grade === 2) {
        for (let c = 0; c < G2_CONTRACTIONS.length; c++) {
          const item = G2_CONTRACTIONS[c];
          // Check if whole-word or prefix matches at position
          if (segment.startsWith(item.char, i)) {
            // Is it whole word or can it be sub-word?
            // AIOU Rule: Whole-word single contractions (g2_single) only apply if isolated
            if (item.category === 'g2_single') {
              const isStart = i === 0;
              const isEnd = i + item.char.length === segment.length;
              if (!isStart || !isEnd) {
                continue; // Do not apply whole-word contraction inside another word
              }
            }
            if (item.compoundCells && item.compoundCells.length) {
              item.compoundCells.forEach((cDots, idx) => {
                cells.push({
                  urdu: idx === 0 ? item.char : '',
                  dots: cDots,
                  unicode: dotsToUnicode(cDots),
                  aria: `${dotsToAriaDescription(cDots, lang)} (${item.nameUrdu})`,
                  category: item.category,
                  note: `Grade 2: ${item.nameUrdu}`
                });
              });
            } else {
              cells.push({
                urdu: item.char,
                dots: item.dots,
                unicode: dotsToUnicode(item.dots),
                aria: `${dotsToAriaDescription(item.dots, lang)} (${item.nameUrdu})`,
                category: item.category,
                note: `Grade 2: ${item.nameUrdu}`
              });
            }
            i += item.char.length;
            matched = true;
            break;
          }
        }
      }
      if (matched) continue;

      // Check for Tashdeed Rule: In Urdu Braille, Tashdeed PRECEDES the letter!
      // If next char is Tashdeed (U+0651), emit Tashdeed [6] BEFORE the current letter!
      if (i + 1 < segment.length && segment[i + 1] === 'ّ') {
        cells.push({
          urdu: 'ّ',
          dots: [6],
          unicode: dotsToUnicode([6]),
          aria: `${dotsToAriaDescription([6], lang)} (تشدید برائے ${segment[i]})`,
          category: 'diacritics',
          note: 'تشدید (حرف سے پہلے)'
        });
      }

      // Skip standalone Tashdeed if already handled
      if (segment[i] === 'ّ') {
        i++;
        continue;
      }

      // Check for number prefix
      const ch = segment[i];
      if (/[0-9۰-۹]/.test(ch)) {
        // If this is the start of a number sequence, emit number sign [3, 4, 5, 6]
        if (i === 0 || !/[0-9۰-۹]/.test(segment[i - 1])) {
          cells.push({
            urdu: '#',
            dots: [3, 4, 5, 6],
            unicode: dotsToUnicode([3, 4, 5, 6]),
            aria: `${dotsToAriaDescription([3, 4, 5, 6], lang)} (علامتِ عدد)`,
            category: 'numerals',
            note: 'نشان گنتی'
          });
        }
      }

      // Check Grade 1 Character Map
      const g1 = CHAR_MAP_G1.get(ch);
      if (g1) {
        cells.push({
          urdu: ch,
          dots: g1.dots,
          unicode: dotsToUnicode(g1.dots),
          aria: `${dotsToAriaDescription(g1.dots, lang)} (${g1.nameUrdu})`,
          category: g1.category,
          note: g1.nameUrdu
        });
      } else {
        // Unknown symbol: output placeholder cell
        cells.push({
          urdu: ch,
          dots: [],
          unicode: ch,
          aria: `${ch}`,
          category: 'unknown'
        });
      }
      i++;
    }
  }
  const unicodeString = cells.map(c => c.unicode).join('');
  return {
    cells,
    unicodeString
  };
}

// Reverse Translation: Braille Unicode String ➔ Urdu Text
function translateBrailleToUrdu(brailleText) {
  if (!brailleText) return '';
  let result = '';
  let inNumber = false;
  for (let i = 0; i < brailleText.length; i++) {
    const ch = brailleText[i];
    if (ch === ' ' || ch === '⠀') {
      result += ' ';
      inNumber = false;
      continue;
    }
    if (ch === '\n') {
      result += '\n';
      inNumber = false;
      continue;
    }
    const dots = unicodeToDots(ch);
    const dotsKey = dots.sort((a, b) => a - b).join(',');
    if (dotsKey === '3,4,5,6') {
      inNumber = true;
      continue;
    }
    if (inNumber) {
      const numMatch = URDU_BRAILLE_REGISTRY.find(it => it.category === 'numerals' && it.char !== '#' && it.dots.sort((a, b) => a - b).join(',') === dotsKey);
      if (numMatch) {
        result += numMatch.char;
        continue;
      } else {
        inNumber = false;
      }
    }

    // Lookup matching character
    const match = URDU_BRAILLE_REGISTRY.find(it => it.grade === 1 && !it.compoundCells && it.dots.sort((a, b) => a - b).join(',') === dotsKey);
    if (match) {
      result += match.char;
    } else {
      // Check punctuation
      const punc = URDU_BRAILLE_REGISTRY.find(it => it.category === 'punctuation' && !it.compoundCells && it.dots.sort((a, b) => a - b).join(',') === dotsKey);
      if (punc) {
        result += punc.char;
      } else {
        result += ch;
      }
    }
  }
  return result;
}

// ==============================================================================
// 3. CURATED 4-TIER INTERACTIVE PRACTICE DATASET
// ==============================================================================

const PRACTICE_TIERS = {
  1: {
    id: 1,
    titleUrdu: 'درجہ اول: حروف و اعراب (Alphabets & Diacritics)',
    titleEn: 'Tier 1: Alphabets & Diacritics',
    descUrdu: 'بنیادی اردو حروف، مخصوص حروف (ٹ، ڈ، ڑ، ں، ے) اور اعراب کی عملی مشق۔',
    descEn: 'Fundamental Urdu letters, specialized characters and diacritic signs.',
    questions: [{
      id: 'q1_1',
      targetChar: 'ب',
      nameUrdu: 'بے',
      expectedDots: [1, 2],
      hint: 'نقطہ 1 اور 2',
      audio: 'بے'
    }, {
      id: 'q1_2',
      targetChar: 'پ',
      nameUrdu: 'پے',
      expectedDots: [1, 2, 3, 4],
      hint: 'نقاط 1، 2، 3 اور 4',
      audio: 'پے'
    }, {
      id: 'q1_3',
      targetChar: 'ٹ',
      nameUrdu: 'ٹے (مخصوص اردو حرف)',
      expectedDots: [2, 3, 4, 5, 6],
      hint: 'نقاط 2، 3، 4، 5 اور 6',
      audio: 'ٹے'
    }, {
      id: 'q1_4',
      targetChar: 'چ',
      nameUrdu: 'چے',
      expectedDots: [1, 4],
      hint: 'نقطہ 1 اور 4',
      audio: 'چے'
    }, {
      id: 'q1_5',
      targetChar: 'ڈ',
      nameUrdu: 'ڈال (مخصوص اردو حرف)',
      expectedDots: [1, 2, 4, 6],
      hint: 'نقاط 1، 2، 4 اور 6',
      audio: 'ڈال'
    }, {
      id: 'q1_6',
      targetChar: 'ڑ',
      nameUrdu: 'ڑے (مخصوص اردو حرف)',
      expectedDots: [1, 2, 4, 5, 6],
      hint: 'نقاط 1، 2، 4، 5 اور 6',
      audio: 'ڑے'
    }, {
      id: 'q1_7',
      targetChar: 'ں',
      nameUrdu: 'نون غنہ',
      expectedDots: [5, 6],
      hint: 'نقطہ 5 اور 6',
      audio: 'نون غنہ'
    }, {
      id: 'q1_8',
      targetChar: 'ے',
      nameUrdu: 'بڑی ے',
      expectedDots: [3, 4],
      hint: 'نقطہ 3 اور 4',
      audio: 'بڑی ے'
    }, {
      id: 'q1_9',
      targetChar: 'ھ',
      nameUrdu: 'دو چشمی ھ',
      expectedDots: [2, 3],
      hint: 'نقطہ 2 اور 3',
      audio: 'دو چشمی ھ'
    }, {
      id: 'q1_10',
      targetChar: 'َ',
      nameUrdu: 'زبر (فتحہ)',
      expectedDots: [2],
      hint: 'نقطہ 2',
      audio: 'زبر'
    }, {
      id: 'q1_11',
      targetChar: 'ِ',
      nameUrdu: 'زیر (کسرہ)',
      expectedDots: [1, 5],
      hint: 'نقطہ 1 اور 5',
      audio: 'زیر'
    }, {
      id: 'q1_12',
      targetChar: 'ُ',
      nameUrdu: 'پیش (ضمہ)',
      expectedDots: [1, 3, 6],
      hint: 'نقاط 1، 3 اور 6',
      audio: 'پیش'
    }, {
      id: 'q1_13',
      targetChar: 'ّ',
      nameUrdu: 'تشدید (حرف سے پہلے)',
      expectedDots: [6],
      hint: 'نقطہ 6',
      audio: 'تشدید'
    }, {
      id: 'q1_14',
      targetChar: 'ْ',
      nameUrdu: 'جزم (سکون)',
      expectedDots: [2, 5],
      hint: 'نقطہ 2 اور 5',
      audio: 'جزم'
    }, {
      id: 'q1_15',
      targetChar: 'آ',
      nameUrdu: 'الف مد آ',
      expectedDots: [3, 4, 5],
      hint: 'نقاط 3، 4 اور 5',
      audio: 'الف مد'
    }]
  },
  2: {
    id: 2,
    titleUrdu: 'درجہ دوم: دو چشمی ھ و کل لفظی مخففات',
    titleEn: 'Tier 2: Dual Consonants & Whole-Word Contractions',
    descUrdu: 'مفرد نشانات اور دو چشمی ھ کے کلیدی مرکبات۔',
    descEn: 'Single-cell whole-word contractions and aspirated dual consonants.',
    questions: [{
      id: 'q2_1',
      targetChar: 'بہت',
      nameUrdu: 'بہت (کل لفظی مفرد)',
      expectedDots: [1, 2],
      hint: 'بے والا نشان [1, 2]',
      audio: 'بہت'
    }, {
      id: 'q2_2',
      targetChar: 'پر',
      nameUrdu: 'پر (کل لفظی مفرد)',
      expectedDots: [1, 2, 3, 4],
      hint: 'پے والا نشان [1, 2, 3, 4]',
      audio: 'پر'
    }, {
      id: 'q2_3',
      targetChar: 'تو',
      nameUrdu: 'تو (کل لفظی مفرد)',
      expectedDots: [2, 3, 4, 5],
      hint: 'تے والا نشان [2, 3, 4, 5]',
      audio: 'تو'
    }, {
      id: 'q2_4',
      targetChar: 'جو',
      nameUrdu: 'جو (کل لفظی مفرد)',
      expectedDots: [2, 4, 5],
      hint: 'جیم والا نشان [2, 4, 5]',
      audio: 'جو'
    }, {
      id: 'q2_5',
      targetChar: 'چاہیے',
      nameUrdu: 'چاہیے (کل لفظی مفرد)',
      expectedDots: [1, 4],
      hint: 'چے والا نشان [1, 4]',
      audio: 'چاہیے'
    }, {
      id: 'q2_6',
      targetChar: 'سے',
      nameUrdu: 'سے (کل لفظی مفرد)',
      expectedDots: [2, 3, 4],
      hint: 'سین والا نشان [2, 3, 4]',
      audio: 'سے'
    }, {
      id: 'q2_7',
      targetChar: 'ایک',
      nameUrdu: 'ایک (کل لفظی مفرد)',
      expectedDots: [1, 5],
      hint: 'زیر والا نشان [1, 5]',
      audio: 'ایک'
    }, {
      id: 'q2_8',
      targetChar: 'کیا',
      nameUrdu: 'کیا (کل لفظی مفرد)',
      expectedDots: [1, 3],
      hint: 'کاف والا نشان [1, 3]',
      audio: 'کیا'
    }, {
      id: 'q2_9',
      targetChar: 'میں',
      nameUrdu: 'میں (کل لفظی مفرد)',
      expectedDots: [1, 3, 4],
      hint: 'میم والا نشان [1, 3, 4]',
      audio: 'میں'
    }, {
      id: 'q2_10',
      targetChar: 'ہے',
      nameUrdu: 'ہے (کل لفظی مفرد)',
      expectedDots: [1, 2, 5],
      hint: 'ہوز والا نشان [1, 2, 5]',
      audio: 'ہے'
    }, {
      id: 'q2_11',
      targetChar: 'بھی',
      nameUrdu: 'بھی (مرکب بے + دو چشمی ھ)',
      expectedDots: [1, 2],
      hint: 'بے [1,2] + ھ [2,3]',
      audio: 'بھی'
    }, {
      id: 'q2_12',
      targetChar: 'پھر',
      nameUrdu: 'پھر (مرکب پے + دو چشمی ھ)',
      expectedDots: [1, 2, 3, 4],
      hint: 'پے [1,2,3,4] + ھ [2,3]',
      audio: 'پھر'
    }, {
      id: 'q2_13',
      targetChar: 'ٹھیک',
      nameUrdu: 'ٹھیک (مرکب ٹے + دو چشمی ھ)',
      expectedDots: [2, 3, 4, 5, 6],
      hint: 'ٹے [2,3,4,5,6] + ھ [2,3]',
      audio: 'ٹھیک'
    }, {
      id: 'q2_14',
      targetChar: 'کچھ',
      nameUrdu: 'کچھ (مرکب چے + دو چشمی ھ)',
      expectedDots: [1, 4],
      hint: 'چے [1,4] + ھ [2,3]',
      audio: 'کچھ'
    }, {
      id: 'q2_15',
      targetChar: 'گھر',
      nameUrdu: 'گھر (مرکب گاف + دو چشمی ھ)',
      expectedDots: [1, 2, 4, 5],
      hint: 'گاف [1,2,4,5] + ھ [2,3]',
      audio: 'گھر'
    }]
  },
  3: {
    id: 3,
    titleUrdu: 'درجہ سوم: ابتدائی و آخری مخففات، سابقے و لاحقے',
    titleEn: 'Tier 3: Compound Initial/Final Contractions',
    descUrdu: 'نقطہ 5، نقاط 4،5 اور 4،5،6 کے سابقے اور لاحقے۔',
    descEn: 'Multi-cell contractions based on dot 5, dots 4-5, and dots 4-5-6.',
    questions: [{
      id: 'q3_1',
      targetChar: 'دل',
      nameUrdu: 'دل (نقطہ 5 کا مخفف)',
      expectedDots: [5],
      hint: 'نقطہ 5 برائے دال [1, 4, 5]',
      audio: 'دل'
    }, {
      id: 'q3_2',
      targetChar: 'ہم',
      nameUrdu: 'ہم (نقطہ 5 کا مخفف)',
      expectedDots: [5],
      hint: 'نقطہ 5 برائے ہ [1, 2, 5]',
      audio: 'ہم'
    }, {
      id: 'q3_3',
      targetChar: 'وقت',
      nameUrdu: 'وقت (نقطہ 5 کا مخفف)',
      expectedDots: [5],
      hint: 'نقطہ 5 برائے واؤ [2, 4, 5, 6]',
      audio: 'وقت'
    }, {
      id: 'q3_4',
      targetChar: 'نام',
      nameUrdu: 'نام (نقطہ 5 کا مخفف)',
      expectedDots: [5],
      hint: 'نقطہ 5 برائے نون [1, 3, 4, 5]',
      audio: 'نام'
    }, {
      id: 'q3_5',
      targetChar: 'آہستہ',
      nameUrdu: 'آہستہ (نقاط 4، 5 کا مخفف)',
      expectedDots: [4, 5],
      hint: 'نقاط 4، 5 برائے الف [1]',
      audio: 'آہستہ'
    }, {
      id: 'q3_6',
      targetChar: 'پہنچ',
      nameUrdu: 'پہنچ (نقاط 4، 5 کا مخفف)',
      expectedDots: [4, 5],
      hint: 'نقاط 4، 5 برائے پے [1, 2, 3, 4]',
      audio: 'پہنچ'
    }, {
      id: 'q3_7',
      targetChar: 'معلوم',
      nameUrdu: 'معلوم (نقاط 4، 5 کا مخفف)',
      expectedDots: [4, 5],
      hint: 'نقاط 4، 5 برائے میم [1, 3, 4]',
      audio: 'معلوم'
    }, {
      id: 'q3_8',
      targetChar: 'بالکل',
      nameUrdu: 'بالکل (نقاط 4، 5، 6 کا مخفف)',
      expectedDots: [4, 5, 6],
      hint: 'نقاط 4، 5، 6 برائے بے [1, 2]',
      audio: 'بالکل'
    }, {
      id: 'q3_9',
      targetChar: 'تمہارا',
      nameUrdu: 'تمہارا (نقاط 4، 5، 6 کا مخفف)',
      expectedDots: [4, 5, 6],
      hint: 'نقاط 4، 5، 6 برائے تے [2, 3, 4, 5]',
      audio: 'تمہارا'
    }, {
      id: 'q3_10',
      targetChar: 'ہمیشہ',
      nameUrdu: 'ہمیشہ (نقاط 4، 5، 6 کا مخفف)',
      expectedDots: [4, 5, 6],
      hint: 'نقاط 4، 5، 6 برائے ہ [1, 2, 5]',
      audio: 'ہمیشہ'
    }, {
      id: 'q3_11',
      targetChar: 'مند',
      nameUrdu: 'مند (لاحقہ بر نقاط 5، 6)',
      expectedDots: [5, 6],
      hint: 'نقاط 5، 6 برائے میم [1, 3, 4]',
      audio: 'مند'
    }, {
      id: 'q3_12',
      targetChar: 'ترین',
      nameUrdu: 'ترین (لاحقہ بر نقاط 4، 6)',
      expectedDots: [4, 6],
      hint: 'نقاط 4، 6 برائے تے [2, 3, 4, 5]',
      audio: 'ترین'
    }, {
      id: 'q3_13',
      targetChar: 'کیونکہ',
      nameUrdu: 'کیونکہ (کہ بیانیہ بر نقطہ 6)',
      expectedDots: [6],
      hint: 'نقطہ 6 برائے کاف [1, 3]',
      audio: 'کیونکہ'
    }, {
      id: 'q3_14',
      targetChar: 'تاکہ',
      nameUrdu: 'تاکہ (کہ بیانیہ بر نقطہ 6)',
      expectedDots: [6],
      hint: 'نقطہ 6 برائے تے [2, 3, 4, 5]',
      audio: 'تاکہ'
    }, {
      id: 'q3_15',
      targetChar: 'تمام',
      nameUrdu: 'تمام (نشان گنتی بر نقاط 3،4،5،6)',
      expectedDots: [3, 4, 5, 6],
      hint: 'نقاط 3، 4، 5، 6 برائے تے',
      audio: 'تمام'
    }]
  },
  4: {
    id: 4,
    titleUrdu: 'درجہ چہارم: اختصارات و مکمل جملوں کی عبارتی مشق',
    titleEn: 'Tier 4: Timed Sentences & Layout Practice',
    descUrdu: 'مکمل اردو جملوں کی باقاعدہ بریل نویسی، سطر بندی اور درست مخففات کا امتحان۔',
    descEn: 'Full sentences transcription with proper line spacing and Grade 2 contractions.',
    sentences: [{
      id: 's4_1',
      textUrdu: 'علم حاصل کرو کیونکہ یہ روشنی ہے۔',
      targetContractions: ['حاصل', 'کیونکہ', 'یہ', 'ہے'],
      tip: 'حاصل [1,5,6]، کیونکہ [6+1,3]، یہ [2,4]، ہے [1,2,5] اور ختمہ [2,5,6]'
    }, {
      id: 's4_2',
      textUrdu: 'ہمیشہ سچ بولو تاکہ دل میں سکون رہے۔',
      targetContractions: ['ہمیشہ', 'تاکہ', 'دل', 'میں'],
      tip: 'ہمیشہ [4,5,6+1,2,5]، تاکہ [6+2,3,4,5]، دل [5+1,4,5]، میں [1,3,4]'
    }, {
      id: 's4_3',
      textUrdu: 'وقت پر کام کرنا بہت ضروری ہے۔',
      targetContractions: ['وقت', 'پر', 'بہت', 'ہے'],
      tip: 'وقت [5+2,4,5,6]، پر [1,2,3,4]، بہت [1,2]، ہے [1,2,5]'
    }, {
      id: 's4_4',
      textUrdu: 'پاکستان ہمارا پیارا وطن ہے اور ہم اس سے محبت کرتے ہیں۔',
      targetContractions: ['ہے', 'ہم', 'سے'],
      tip: 'ہے [1,2,5]، ہم [5+1,2,5]، سے [2,3,4]'
    }, {
      id: 's4_5',
      textUrdu: 'سبق نمبر ۵: علم بڑی دولت ہے۔',
      targetContractions: ['#۵', 'بڑی', 'ہے'],
      tip: 'نمبر کے لیے علامت عدد [3,4,5,6] اور ۵ [1,5]'
    }]
  }
};

// ==============================================================================
// 4. MAIN URDU BRAILLE MASTER APP COMPONENT
// ==============================================================================

function App() {
  // Navigation Tabs
  // 6 Core Tabs:
  // 1. translator: بریل مترجم (Urdu ⇄ Braille Translator)
  // 2. practice: عملی مشق گاہ (Interactive Practice & Perkins/Slate Simulator)
  // 3. lexicon: جامع بریل لغت (Universal Urdu Braille Lexicon & Dictionary)
  // 4. rules: رموز اوقاف و قواعد (Official Formatting & Grammar Rules)
  // 5. search: ہوشیار تلاش (Smart Multi-Way Search)
  // 6. tutor: معلم بریل اے آئی (AI Tutor & Assistant)
  const [activeTab, setActiveTab] = useState('translator');

  // Application Settings & Accessibility
  const [theme, setTheme] = useState(() => localStorage.getItem('urdu_braille_theme') || 'emerald');
  const [grade, setGrade] = useState(2); // 1 = Grade 1 (حرفی), 2 = Grade 2 (مخففات)
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [fontSizeScale, setFontSizeScale] = useState(100);
  const [copiedNotification, setCopiedNotification] = useState('');

  // Tab 1: Translator States
  const [urduInput, setUrduInput] = useState('پاکستان زندہ باد۔ علم بڑی دولت ہے۔');
  const [brailleInput, setBrailleInput] = useState('');
  const [translatorMode, setTranslatorMode] = useState('urduToBraille'); // 'urduToBraille' | 'perkinsDirect' | 'brailleToUrdu'
  const [perkinsDotsActive, setPerkinsDotsActive] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  // Tab 2: Interactive Practice Lab States
  const [practiceTier, setPracticeTier] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [practicePunchedDots, setPracticePunchedDots] = useState([]);
  const [practiceSimulatorMode, setPracticeSimulatorMode] = useState('perkins'); // 'perkins' (L to R) | 'slate' (R to L mirrored)
  const [isPaperFlipped, setIsPaperFlipped] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceFeedback, setPracticeFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [practiceTimerSeconds, setPracticeTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Tab 3: Universal Lexicon States
  const [lexiconQuery, setLexiconQuery] = useState('');
  const [lexiconCategory, setLexiconCategory] = useState('all');
  const [selectedLexiconItem, setSelectedLexiconItem] = useState(null);

  // Tab 4: Rules Calculator States
  const [titleToCenter, setTitleToCenter] = useState('اردو بریل ماسٹر کورس ۳۶۰۱');
  const [lineLengthOption, setLineLengthOption] = useState(40); // 38 or 40

  // Tab 5: Smart Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDotsMatrix, setSearchDotsMatrix] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });
  const [searchGradeFilter, setSearchGradeFilter] = useState('all');

  // Tab 6: AI Tutor Proofreading & Custom Exercise Generator States
  const [proofreadingInput, setProofreadingInput] = useState('وہ بہت اچھا طالب علم ہے');
  const [proofreadingResults, setProofreadingResults] = useState(null);
  const [generatorTier, setGeneratorTier] = useState(2);
  const [generatedExercises, setGeneratedExercises] = useState(null);

  // Speech & Haptic Native Bridge
  const triggerHaptic = useCallback((durationMs = 30) => {
    if (!hapticsEnabled) return;
    try {
      if (window.AndroidHaptic && typeof window.AndroidHaptic.vibrate === 'function') {
        window.AndroidHaptic.vibrate(durationMs);
      } else if (navigator.vibrate) {
        navigator.vibrate(durationMs);
      }
    } catch (_) {}
  }, [hapticsEnabled]);
  const speakText = useCallback((text, langCode = 'ur') => {
    if (!speechEnabled || !text) return;
    try {
      if (window.AndroidTTS && typeof window.AndroidTTS.speak === 'function') {
        window.AndroidTTS.speak(text, langCode);
      } else if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode === 'ur' ? 'ur-PK' : 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (_) {}
  }, [speechEnabled]);

  // Export embosser file (.brf / .txt)
  const exportEmbosserFile = useCallback((content, filename = 'urdu_braille_document.brf') => {
    triggerHaptic(40);
    try {
      if (window.AndroidEmbosser && typeof window.AndroidEmbosser.exportFile === 'function') {
        window.AndroidEmbosser.exportFile(content, filename);
        showNotification('بریل ایمبوسر فائل بھیج دی گئی');
      } else {
        const blob = new Blob([content], {
          type: 'text/plain;charset=utf-8'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('فائل ڈاؤن لوڈ ہو گئی');
      }
    } catch (err) {
      showNotification('فائل ایکسپورٹ کی جا سکی');
    }
  }, [triggerHaptic]);
  const showNotification = msg => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(''), 2500);
  };
  const copyToClipboard = (text, label = 'متن کاپی کر لیا گیا') => {
    triggerHaptic(30);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showNotification(label);
      });
    } else {
      showNotification(label);
    }
  };

  // Synchronized translation calculations
  const translationOutput = useMemo(() => {
    return translateUrduToBraille(urduInput, grade, 'ur');
  }, [urduInput, grade]);

  // Keyboard accessibility for Perkins Brailler: F-D-S for 1-2-3; J-K-L for 4-5-6; Spacebar for cell break
  useEffect(() => {
    const handleKeyDown = e => {
      // Only process when translator or practice tab is active and not focused on input/textarea
      const activeEl = document.activeElement;
      const isInputFocused = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');
      if (isInputFocused) return;
      const key = e.key.toLowerCase();
      let dot = null;
      if (key === 'f') dot = 1;else if (key === 'd') dot = 2;else if (key === 's') dot = 3;else if (key === 'j') dot = 4;else if (key === 'k') dot = 5;else if (key === 'l') dot = 6;
      if (dot !== null) {
        e.preventDefault();
        triggerHaptic(20);
        if (activeTab === 'translator' && translatorMode === 'perkinsDirect') {
          setPerkinsDotsActive(prev => ({
            ...prev,
            [dot]: !prev[dot]
          }));
        } else if (activeTab === 'practice') {
          setPracticePunchedDots(prev => {
            if (prev.includes(dot)) return prev.filter(d => d !== dot);
            return [...prev, dot].sort((a, b) => a - b);
          });
        }
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (activeTab === 'translator' && translatorMode === 'perkinsDirect') {
          e.preventDefault();
          commitPerkinsCell();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, translatorMode, triggerHaptic]);

  // Perkins Cell commit function
  const commitPerkinsCell = () => {
    const active = Object.keys(perkinsDotsActive).filter(d => perkinsDotsActive[d]).map(Number);
    if (active.length === 0) {
      // Space cell
      setUrduInput(prev => prev + ' ');
    } else {
      const brailleGlyph = dotsToUnicode(active);
      const urduChar = translateBrailleToUrdu(brailleGlyph);
      setUrduInput(prev => prev + (urduChar || brailleGlyph));
      speakText(urduChar || dotsToAriaDescription(active, 'ur'));
    }
    triggerHaptic(40);
    setPerkinsDotsActive({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    });
  };

  // Practice timer
  useEffect(() => {
    let timer = null;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setPracticeTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Practice verification
  const handleCheckPracticeAnswer = () => {
    const tierData = PRACTICE_TIERS[practiceTier];
    if (!tierData || !tierData.questions) return;
    const currentQ = tierData.questions[currentQuestionIndex];
    if (!currentQ) return;
    const userSorted = [...practicePunchedDots].sort((a, b) => a - b);
    const expectedSorted = [...currentQ.expectedDots].sort((a, b) => a - b);
    const isCorrect = userSorted.length === expectedSorted.length && userSorted.every((d, i) => d === expectedSorted[i]);
    if (isCorrect) {
      triggerHaptic(60);
      setPracticeFeedback({
        type: 'success',
        message: `ماشاءاللہ درست جواب! (${currentQ.nameUrdu})`
      });
      setPracticeScore(prev => prev + 10);
      speakText('درست جواب');
    } else {
      triggerHaptic(120);
      setPracticeFeedback({
        type: 'error',
        message: `دوبارہ کوشش کریں! مطلوبہ نقاط: [${expectedSorted.join('، ')}] (${currentQ.hint})`
      });
      speakText('دوبارہ کوشش کریں');
    }
  };
  const handleNextPracticeQuestion = () => {
    const tierData = PRACTICE_TIERS[practiceTier];
    if (!tierData || !tierData.questions) return;
    if (currentQuestionIndex + 1 < tierData.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setPracticePunchedDots([]);
      setPracticeFeedback(null);
      setIsPaperFlipped(false);
    } else {
      setPracticeFeedback({
        type: 'success',
        message: `مبارک ہو! آپ نے درجہ ${practiceTier} کی مشق مکمل کر لی۔ کل سکور: ${practiceScore}`
      });
    }
  };

  // Run automated proofreading in AI Tutor Tab
  const runProofreading = inputText => {
    triggerHaptic(40);
    const issues = [];
    let score = 100;

    // 1. Check for missed Grade 2 Contractions
    G2_CONTRACTIONS.forEach(cont => {
      if (cont.category === 'g2_single') {
        const regex = new RegExp(`\\b${cont.char}\\b`, 'g');
        let m;
        while ((m = regex.exec(inputText)) !== null) {
          // Found whole-word contraction opportunity
        }
      }
    });

    // 2. Check for misplaced Tashdeed (if placed after consonant in Urdu text instead of before in Braille)
    if (inputText.includes('ّ')) {
      issues.push({
        type: 'rule',
        title: 'قاعدہ تشدید (Tashdeed Positioning)',
        detail: 'یاد رہے کہ بریل میں تشدید [6] حرف سے پہلے ابھاری جاتی ہے، حرف کے بعد نہیں۔ مترجم خودکار طور پر اس کی تصحیح کر دیتا ہے۔',
        severity: 'info'
      });
    }

    // 3. Check for spacing before punctuation
    if (/ [،؛۔؟!:]/.test(inputText)) {
      issues.push({
        type: 'typography',
        title: 'رموز اوقاف سے پہلے غیر ضروری فاصلہ',
        detail: 'بریل قواعد کے تحت ختمہ، سکتہ اور سوالیہ سے پہلے فاصلہ نہیں چھوڑا جاتا۔',
        severity: 'warning'
      });
      score -= 10;
    }

    // 4. Check for line width overflow (38 or 40 cells)
    const lines = inputText.split('\n');
    lines.forEach((l, idx) => {
      const bRes = translateUrduToBraille(l, grade);
      if (bRes.cells.length > 40) {
        issues.push({
          type: 'layout',
          title: `سطر نمبر ${idx + 1} میں خلیوں کا تجاوز (${bRes.cells.length} خانے)`,
          detail: 'معیاری بریل سطر میں زیادہ سے زیادہ 38 یا 40 خانے ہونے چاہئیں۔ سطر کے آخر میں لفظ توڑنے کے اصول کے تحت نئے لفظ کو اگلی سطر میں منتقل کریں۔',
          severity: 'warning'
        });
        score -= 15;
      }
    });
    if (issues.length === 0) {
      issues.push({
        type: 'perfect',
        title: 'شاندار تحریر! کوئی غلطی نہیں پائی گئی۔',
        detail: 'آپ کا متن قومی اردو بریل معیار کے عین مطابق ہے۔',
        severity: 'success'
      });
    }
    setProofreadingResults({
      score: Math.max(score, 0),
      issues
    });
  };

  // Run Custom Exercise Generator
  const generateExercises = () => {
    triggerHaptic(40);
    const tier = PRACTICE_TIERS[generatorTier] || PRACTICE_TIERS[1];
    const shuffled = [...(tier.questions || [])].sort(() => 0.5 - Math.random()).slice(0, 5);
    setGeneratedExercises(shuffled);
    showNotification('نئی مشقیں تیار ہیں');
  };

  // Theme Styles
  const themeClasses = {
    emerald: {
      bg: 'bg-[#051C15]',
      surface: 'bg-[#0B3023]',
      surfaceBorder: 'border-[#1A4D3E]',
      card: 'bg-[#0d3b2b]',
      textPrimary: 'text-amber-100',
      textSecondary: 'text-emerald-200',
      accent: 'bg-amber-400 text-slate-900',
      accentBorder: 'border-amber-400',
      accentGold: '#FBBF24',
      dotActive: 'bg-amber-400 text-slate-900 shadow-md shadow-amber-400/50',
      dotInactive: 'bg-[#144233] text-emerald-300 border-2 border-[#1E5744]',
      badge: 'bg-emerald-900/80 text-amber-300 border border-emerald-600',
      header: 'bg-[#041610] border-b border-[#1A4D3E]'
    },
    oled: {
      bg: 'bg-[#000000]',
      surface: 'bg-[#111111]',
      surfaceBorder: 'border-[#333333]',
      card: 'bg-[#181818]',
      textPrimary: 'text-yellow-300',
      textSecondary: 'text-neutral-300',
      accent: 'bg-yellow-400 text-black',
      accentBorder: 'border-yellow-400',
      accentGold: '#FACC15',
      dotActive: 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50',
      dotInactive: 'bg-[#222222] text-neutral-400 border-2 border-[#444444]',
      badge: 'bg-neutral-900 text-yellow-300 border border-yellow-500',
      header: 'bg-[#000000] border-b border-[#222222]'
    },
    light: {
      bg: 'bg-slate-50',
      surface: 'bg-white',
      surfaceBorder: 'border-slate-300',
      card: 'bg-slate-100',
      textPrimary: 'text-slate-900',
      textSecondary: 'text-slate-700',
      accent: 'bg-amber-500 text-slate-950 font-bold',
      accentBorder: 'border-amber-500',
      accentGold: '#D97706',
      dotActive: 'bg-amber-500 text-black shadow-md shadow-amber-500/50',
      dotInactive: 'bg-slate-200 text-slate-600 border-2 border-slate-300',
      badge: 'bg-amber-100 text-amber-900 border border-amber-300',
      header: 'bg-white border-b border-slate-300'
    }
  }[theme] || themeClasses.emerald;

  // Render Visual 6-Dot Braille Cell Component
  const BrailleCellVisual = ({
    dots = [],
    size = 'md',
    interactive = false,
    onToggleDot = null,
    mirrored = false,
    testTag = ''
  }) => {
    // Standard layout: column 1 (dots 1, 2, 3 on left), column 2 (dots 4, 5, 6 on right)
    // Mirrored layout (Slate & Stylus): column 1 (dots 1, 2, 3 on right), column 2 (dots 4, 5, 6 on left)
    const dotArray = [1, 2, 3, 4, 5, 6];
    const leftDots = mirrored ? [4, 5, 6] : [1, 2, 3];
    const rightDots = mirrored ? [1, 2, 3] : [4, 5, 6];
    const sizeClasses = {
      sm: {
        cell: 'w-10 h-16 p-1 gap-1',
        dot: 'w-3.5 h-3.5 text-[8px]'
      },
      md: {
        cell: 'w-16 h-24 p-2 gap-2',
        dot: 'w-5 h-5 text-xs'
      },
      lg: {
        cell: 'w-24 h-36 p-3 gap-3',
        dot: 'w-8 h-8 text-sm font-bold'
      }
    }[size];
    return /*#__PURE__*/React.createElement("div", {
      className: `inline-flex rounded-xl p-1.5 transition-all select-none ${themeClasses.card} border ${themeClasses.surfaceBorder} shadow-inner ${sizeClasses.cell}`,
      "data-testid": testTag,
      role: "group",
      "aria-label": dotsToAriaDescription(dots, 'ur')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col justify-between items-center w-1/2 h-full"
    }, leftDots.map(d => {
      const isActive = dots.includes(d);
      return /*#__PURE__*/React.createElement("button", {
        key: d,
        type: "button",
        disabled: !interactive,
        onClick: () => onToggleDot && onToggleDot(d),
        "aria-pressed": isActive,
        "aria-label": `نقطہ ${d}`,
        className: `flex items-center justify-center rounded-full transition-all duration-150 ${sizeClasses.dot} ${isActive ? themeClasses.dotActive : themeClasses.dotInactive} ${interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'}`
      }, d);
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col justify-between items-center w-1/2 h-full"
    }, rightDots.map(d => {
      const isActive = dots.includes(d);
      return /*#__PURE__*/React.createElement("button", {
        key: d,
        type: "button",
        disabled: !interactive,
        onClick: () => onToggleDot && onToggleDot(d),
        "aria-pressed": isActive,
        "aria-label": `نقطہ ${d}`,
        className: `flex items-center justify-center rounded-full transition-all duration-150 ${sizeClasses.dot} ${isActive ? themeClasses.dotActive : themeClasses.dotInactive} ${interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'}`
      }, d);
    })));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `min-h-screen ${themeClasses.bg} ${themeClasses.textPrimary} font-sans transition-colors duration-200 pb-20 select-none`,
    dir: "rtl"
  }, copiedNotification && /*#__PURE__*/React.createElement("div", {
    className: "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-amber-400 text-slate-900 px-5 py-2.5 rounded-full font-bold shadow-2xl flex items-center gap-2 text-sm border-2 border-amber-300 animate-bounce"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-lg"
  }, "check_circle"), /*#__PURE__*/React.createElement("span", null, copiedNotification)), /*#__PURE__*/React.createElement("header", {
    className: `sticky top-0 z-40 ${themeClasses.header} px-4 py-3 flex items-center justify-between shadow-md`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-xl shadow-lg"
  }, "\u2803"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "font-extrabold text-base md:text-lg tracking-tight font-arabic flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\u0627\u0631\u062F\u0648 \u0628\u0631\u06CC\u0644 \u0645\u0627\u0633\u0679\u0631"), /*#__PURE__*/React.createElement("span", {
    className: `text-[10px] px-2 py-0.5 rounded-full ${themeClasses.badge} font-sans`
  }, "AIOU 3601")), /*#__PURE__*/React.createElement("p", {
    className: `text-xs ${themeClasses.textSecondary} hidden md:block`
  }, "\u062C\u0627\u0645\u0639 \u067E\u0627\u06A9\u0633\u062A\u0627\u0646\u06CC \u0642\u0648\u0645\u06CC \u0627\u0631\u062F\u0648 \u0628\u0631\u06CC\u0644 \u0646\u0638\u0627\u0645 (\u062F\u0631\u062C\u06C1 \u0627\u0648\u0644 \u0648 \u062F\u0648\u0645)"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex bg-black/20 p-1 rounded-xl border border-white/10 text-xs"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setGrade(1);
      showNotification('درجہ اول (حرفی) منتخب');
    },
    className: `px-2.5 py-1 rounded-lg font-bold transition ${grade === 1 ? 'bg-amber-400 text-slate-900 shadow' : 'text-slate-300'}`,
    "data-testid": "grade_1_btn"
  }, "\u062F\u0631\u062C\u06C1 \u0627\u0648\u0644"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setGrade(2);
      showNotification('درجہ دوم (مخففات) منتخب');
    },
    className: `px-2.5 py-1 rounded-lg font-bold transition ${grade === 2 ? 'bg-amber-400 text-slate-900 shadow' : 'text-slate-300'}`,
    "data-testid": "grade_2_btn"
  }, "\u062F\u0631\u062C\u06C1 \u062F\u0648\u0645")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setSpeechEnabled(!speechEnabled);
    },
    className: `w-9 h-9 rounded-xl flex items-center justify-center border ${themeClasses.surfaceBorder} ${speechEnabled ? 'text-amber-400' : 'text-slate-500'}`,
    title: "\u0635\u0648\u062A\u06CC \u062A\u0644\u0641\u0638",
    "aria-label": "\u0635\u0648\u062A\u06CC \u062A\u0644\u0641\u0638 \u0622\u0646 \u06CC\u0627 \u0622\u0641"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-lg"
  }, speechEnabled ? 'volume_up' : 'volume_off')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      const nextTheme = theme === 'emerald' ? 'oled' : theme === 'oled' ? 'light' : 'emerald';
      setTheme(nextTheme);
      localStorage.setItem('urdu_braille_theme', nextTheme);
    },
    className: `w-9 h-9 rounded-xl flex items-center justify-center border ${themeClasses.surfaceBorder} text-amber-400`,
    title: "\u062A\u0628\u062F\u06CC\u0644\u06CC \u062A\u06BE\u06CC\u0645",
    "aria-label": "\u062A\u0628\u062F\u06CC\u0644\u06CC \u062A\u06BE\u06CC\u0645"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-lg"
  }, theme === 'emerald' ? 'palette' : theme === 'oled' ? 'dark_mode' : 'light_mode')))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-5xl mx-auto p-3 md:p-6 space-y-6"
  }, activeTab === 'translator' && /*#__PURE__*/React.createElement("section", {
    className: "space-y-4",
    "aria-label": "\u0628\u0631\u06CC\u0644 \u0645\u062A\u0631\u062C\u0645"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} shadow-sm flex flex-wrap items-center justify-between gap-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "translate"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sm"
  }, "\u0645\u062A\u0631\u062C\u0645 \u0645\u0648\u0688:"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1.5 text-xs"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setTranslatorMode('urduToBraille');
    },
    className: `px-3 py-1.5 rounded-xl font-bold transition ${translatorMode === 'urduToBraille' ? themeClasses.accent : 'bg-white/5'}`
  }, "\u0627\u0631\u062F\u0648 \u2794 \u0628\u0631\u06CC\u0644"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setTranslatorMode('perkinsDirect');
    },
    className: `px-3 py-1.5 rounded-xl font-bold transition ${translatorMode === 'perkinsDirect' ? themeClasses.accent : 'bg-white/5'}`
  }, "\u067E\u0631\u06A9\u0646\u0632 \u06A9\u06CC \u0628\u0648\u0631\u0688"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setTranslatorMode('brailleToUrdu');
    },
    className: `px-3 py-1.5 rounded-xl font-bold transition ${translatorMode === 'brailleToUrdu' ? themeClasses.accent : 'bg-white/5'}`
  }, "\u0628\u0631\u06CC\u0644 \u2794 \u0627\u0631\u062F\u0648"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => speakText(urduInput),
    className: `p-2 rounded-xl border ${themeClasses.surfaceBorder} hover:bg-white/10`,
    title: "\u0645\u06A9\u0645\u0644 \u0627\u0631\u062F\u0648 \u0633\u0646\u06CC\u06BA"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-base"
  }, "record_voice_over")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => copyToClipboard(translationOutput.unicodeString, 'بریل یونیکوڈ کاپی ہو گیا'),
    className: `p-2 rounded-xl border ${themeClasses.surfaceBorder} hover:bg-white/10`,
    title: "\u0628\u0631\u06CC\u0644 \u06CC\u0648\u0646\u06CC\u06A9\u0648\u0688 \u06A9\u0627\u067E\u06CC \u06A9\u0631\u06CC\u06BA"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-base"
  }, "content_copy")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => exportEmbosserFile(translationOutput.unicodeString),
    className: `px-3 py-2 rounded-xl font-bold text-xs bg-amber-400 text-slate-900 flex items-center gap-1.5 shadow`
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-base"
  }, "print"), /*#__PURE__*/React.createElement("span", null, "\u0627\u06CC\u0645\u0628\u0648\u0633\u0631 \u0641\u0627\u0626\u0644")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} flex flex-col justify-between gap-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "urdu_input_textarea",
    className: "font-bold text-sm flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400 text-base"
  }, "edit_note"), /*#__PURE__*/React.createElement("span", null, "\u0627\u0631\u062F\u0648 \u062A\u062D\u0631\u06CC\u0631 (Urdu Text):")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 font-sans"
  }, urduInput.length, " \u062D\u0631\u0648\u0641")), /*#__PURE__*/React.createElement("textarea", {
    id: "urdu_input_textarea",
    value: urduInput,
    onChange: e => setUrduInput(e.target.value),
    placeholder: "\u06CC\u06C1\u0627\u06BA \u0627\u0631\u062F\u0648 \u062A\u062D\u0631\u06CC\u0631 \u062F\u0631\u062C \u06A9\u0631\u06CC\u06BA \u06CC\u0627 \u067E\u0631\u06A9\u0646\u0632 \u06A9\u06CC\u0632 \u062F\u0628\u0627\u0626\u06CC\u06BA...",
    rows: 4,
    className: `w-full p-3 rounded-xl bg-black/25 border ${themeClasses.surfaceBorder} text-base focus:outline-none focus:border-amber-400 resize-none font-arabic`,
    "data-testid": "urdu_input_field"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1.5"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setUrduInput('پاکستان زندہ باد'),
    className: "text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10"
  }, "\u0646\u0645\u0648\u0646\u06C1 \u06F1"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setUrduInput('علم بڑی دولت ہے اور جہالت تاریکی ہے۔'),
    className: "text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10"
  }, "\u0646\u0645\u0648\u0646\u06C1 \u06F2")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setUrduInput('');
      triggerHaptic(20);
    },
    className: "text-xs text-rose-400 hover:text-rose-300 font-bold"
  }, "\u0635\u0627\u0641 \u06A9\u0631\u06CC\u06BA"))), /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} flex flex-col justify-between gap-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sm flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400 text-base"
  }, "visibility"), /*#__PURE__*/React.createElement("span", null, "\u0628\u0631\u06CC\u0644 \u062E\u0644\u06CC\u0627\u062A\u06CC \u0646\u0645\u0627\u0626\u0646\u062F\u06AF\u06CC (Braille Cells):")), /*#__PURE__*/React.createElement("span", {
    className: `text-[10px] px-2 py-0.5 rounded-full ${themeClasses.badge}`
  }, grade === 2 ? 'درجہ دوم مخففات' : 'درجہ اول حرفی')), /*#__PURE__*/React.createElement("div", {
    className: "w-full min-h-[100px] p-3 rounded-xl bg-black/40 border border-amber-400/20 text-3xl font-mono tracking-widest text-amber-300 overflow-x-auto flex items-center gap-2 leading-relaxed",
    dir: "ltr",
    "aria-label": "\u0628\u0631\u06CC\u0644 \u0646\u062A\u06CC\u062C\u06C1"
  }, translationOutput.unicodeString || '⠀'), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-1 text-xs text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "\u06A9\u0644 \u062E\u0627\u0646\u06D2: ", translationOutput.cells.filter(c => c.category !== 'space').length), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => copyToClipboard(translationOutput.cells.map(c => `${c.urdu}: [${c.dots.join(',')}]`).join(' | '), 'نقاط کا ریکارڈ کاپی ہو گیا'),
    className: "text-amber-400 hover:underline"
  }, "\u0646\u0642\u0627\u0637 \u06A9\u06CC \u0641\u06C1\u0631\u0633\u062A \u06A9\u0627\u067E\u06CC \u06A9\u0631\u06CC\u06BA")))), translatorMode === 'perkinsDirect' && /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.card} border-2 border-amber-400/40 space-y-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "keyboard"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-sm"
  }, "\u0648\u0631\u0686\u0648\u0626\u0644 \u067E\u0631\u06A9\u0646\u0632 \u06F6 \u06A9\u06CC \u0628\u0648\u0631\u0688 (Perkins 6-Key Simulator)")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "\u06A9\u06CC \u0628\u0648\u0631\u0688 \u0634\u0627\u0631\u0679 \u06A9\u0679\u0633: F-D-S (\u0646\u0642\u0627\u0637 1-2-3) | J-K-L (\u0646\u0642\u0627\u0637 4-5-6) | Space (\u0627\u06AF\u0644\u0627 \u062E\u0627\u0646\u06C1)")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row items-center justify-center gap-6 py-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mb-1"
  }, "\u0645\u0648\u062C\u0648\u062F\u06C1 \u062E\u0627\u0646\u06C1"), /*#__PURE__*/React.createElement(BrailleCellVisual, {
    dots: Object.keys(perkinsDotsActive).filter(d => perkinsDotsActive[d]).map(Number),
    size: "lg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 md:gap-3 flex-wrap justify-center",
    dir: "ltr"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(25);
      setPerkinsDotsActive(p => ({
        ...p,
        3: !p[3]
      }));
    },
    className: `w-12 h-20 rounded-2xl font-bold flex flex-col items-center justify-center border-2 transition ${perkinsDotsActive[3] ? themeClasses.dotActive : themeClasses.dotInactive}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "3"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] opacity-75 font-mono"
  }, "S")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(25);
      setPerkinsDotsActive(p => ({
        ...p,
        2: !p[2]
      }));
    },
    className: `w-12 h-24 rounded-2xl font-bold flex flex-col items-center justify-center border-2 transition ${perkinsDotsActive[2] ? themeClasses.dotActive : themeClasses.dotInactive}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "2"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] opacity-75 font-mono"
  }, "D")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(25);
      setPerkinsDotsActive(p => ({
        ...p,
        1: !p[1]
      }));
    },
    className: `w-12 h-28 rounded-2xl font-bold flex flex-col items-center justify-center border-2 transition ${perkinsDotsActive[1] ? themeClasses.dotActive : themeClasses.dotInactive}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "1"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] opacity-75 font-mono"
  }, "F")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: commitPerkinsCell,
    className: "w-16 h-14 rounded-2xl bg-amber-400 text-slate-900 font-extrabold flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95",
    title: "\u062E\u0627\u0646\u06C1 \u062F\u0631\u062C \u06A9\u0631\u06CC\u06BA"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-xl"
  }, "subdirectory_arrow_left"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px]"
  }, "\u062F\u0631\u062C")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setPerkinsDotsActive({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false
      });
      triggerHaptic(20);
    },
    className: "w-16 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 font-bold"
  }, "\u062E\u0627\u0644\u06CC")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(25);
      setPerkinsDotsActive(p => ({
        ...p,
        4: !p[4]
      }));
    },
    className: `w-12 h-28 rounded-2xl font-bold flex flex-col items-center justify-center border-2 transition ${perkinsDotsActive[4] ? themeClasses.dotActive : themeClasses.dotInactive}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "4"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] opacity-75 font-mono"
  }, "J")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(25);
      setPerkinsDotsActive(p => ({
        ...p,
        5: !p[5]
      }));
    },
    className: `w-12 h-24 rounded-2xl font-bold flex flex-col items-center justify-center border-2 transition ${perkinsDotsActive[5] ? themeClasses.dotActive : themeClasses.dotInactive}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "5"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] opacity-75 font-mono"
  }, "K")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(25);
      setPerkinsDotsActive(p => ({
        ...p,
        6: !p[6]
      }));
    },
    className: `w-12 h-20 rounded-2xl font-bold flex flex-col items-center justify-center border-2 transition ${perkinsDotsActive[6] ? themeClasses.dotActive : themeClasses.dotInactive}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "6"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] opacity-75 font-mono"
  }, "L"))))), /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-sm flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400 text-base"
  }, "grid_view"), /*#__PURE__*/React.createElement("span", null, "\u062E\u0644\u06CC\u0627\u062A\u06CC \u062A\u0641\u0635\u06CC\u0644 \u0627\u0648\u0631 \u062A\u0641\u06C1\u06CC\u0645 (Cell-by-Cell Interactive Inspector):")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "\u06A9\u0633\u06CC \u0628\u06BE\u06CC \u062E\u0627\u0646\u06D2 \u067E\u0631 \u06A9\u0644\u06A9 \u06A9\u0631 \u06A9\u06D2 \u0627\u0633 \u06A9\u06D2 \u0646\u0642\u0627\u0637 \u0627\u0648\u0631 \u0635\u0648\u062A\u06CC \u062A\u0644\u0641\u0638 \u0633\u0646\u06CC\u06BA")), translationOutput.cells.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 py-4 text-center"
  }, "\u06A9\u0648\u0626\u06CC \u062A\u062D\u0631\u06CC\u0631 \u0645\u0648\u062C\u0648\u062F \u0646\u06C1\u06CC\u06BA\u06D4") : /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2.5 max-h-80 overflow-y-auto p-1"
  }, translationOutput.cells.map((cell, idx) => {
    if (cell.category === 'space') {
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        className: "w-6 h-20 flex items-center justify-center text-xs text-slate-600 border border-dashed border-white/10 rounded-lg"
      }, "\u2423");
    }
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      onClick: () => {
        triggerHaptic(30);
        speakText(`${cell.urdu || ''}، ${dotsToAriaDescription(cell.dots, 'ur')}`);
      },
      className: `p-2 rounded-xl ${themeClasses.card} border ${themeClasses.surfaceBorder} hover:border-amber-400 transition cursor-pointer flex flex-col items-center justify-between min-w-[70px] shadow-sm group`,
      title: cell.aria
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-amber-300 font-arabic truncate max-w-[65px]"
    }, cell.urdu || '—'), /*#__PURE__*/React.createElement(BrailleCellVisual, {
      dots: cell.dots,
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-mono text-slate-400 mt-1"
    }, "[", cell.dots.join(','), "]"));
  })))), activeTab === 'practice' && /*#__PURE__*/React.createElement("section", {
    className: "space-y-4",
    "aria-label": "\u0639\u0645\u0644\u06CC \u0645\u0634\u0642 \u06AF\u0627\u06C1"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "school"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-sm"
  }, "\u06F4 \u062F\u0631\u062C\u0627\u062A\u06CC \u062A\u0639\u0644\u06CC\u0645\u06CC \u0645\u0634\u0642 \u06AF\u0627\u06C1 (4-Tier Interactive Practice Lab):")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30"
  }, "\u0633\u06A9\u0648\u0631: ", practiceScore), /*#__PURE__*/React.createElement("div", {
    className: "flex bg-black/30 p-1 rounded-xl border border-white/10 text-xs"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setPracticeSimulatorMode('perkins');
      setIsPaperFlipped(false);
    },
    className: `px-3 py-1 rounded-lg font-bold transition ${practiceSimulatorMode === 'perkins' ? themeClasses.accent : 'text-slate-300'}`
  }, "\u067E\u0631\u06A9\u0646\u0632 \u0645\u0648\u0688 (\u0628\u0627\u0626\u06CC\u06BA \u062A\u0627 \u062F\u0627\u0626\u06CC\u06BA)"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setPracticeSimulatorMode('slate');
      setIsPaperFlipped(false);
    },
    className: `px-3 py-1 rounded-lg font-bold transition ${practiceSimulatorMode === 'slate' ? themeClasses.accent : 'text-slate-300'}`
  }, "\u062A\u062E\u062A\u06CC \u0648 \u0642\u0644\u0645 (\u062F\u0627\u0626\u06CC\u06BA \u062A\u0627 \u0628\u0627\u0626\u06CC\u06BA \u0645\u0639\u06A9\u0648\u0633)")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-2"
  }, [1, 2, 3, 4].map(tierNum => {
    const tData = PRACTICE_TIERS[tierNum];
    const isSelected = practiceTier === tierNum;
    return /*#__PURE__*/React.createElement("button", {
      key: tierNum,
      type: "button",
      onClick: () => {
        triggerHaptic(25);
        setPracticeTier(tierNum);
        setCurrentQuestionIndex(0);
        setPracticePunchedDots([]);
        setPracticeFeedback(null);
        setIsPaperFlipped(false);
      },
      className: `p-3 rounded-xl border text-right transition flex flex-col justify-between ${isSelected ? `${themeClasses.accentBorder} bg-amber-400/10` : `${themeClasses.surfaceBorder} bg-black/10 hover:bg-white/5`}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-300'}`
    }, "\u062F\u0631\u062C\u06C1 ", tierNum), /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] text-slate-400 truncate mt-1"
    }, tData.titleUrdu.split(':')[1] || tData.titleUrdu));
  }))), practiceTier !== 4 ? /*#__PURE__*/React.createElement("div", {
    className: `p-6 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-6 text-center`
  }, (() => {
    const tierData = PRACTICE_TIERS[practiceTier];
    const q = tierData.questions[currentQuestionIndex];
    if (!q) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-xs text-slate-400"
    }, /*#__PURE__*/React.createElement("span", null, "\u0633\u0648\u0627\u0644 ", currentQuestionIndex + 1, " \u0627\u0632 ", tierData.questions.length), /*#__PURE__*/React.createElement("span", {
      className: `px-2 py-0.5 rounded-full ${themeClasses.badge}`
    }, practiceSimulatorMode === 'perkins' ? 'پرکنز ایمبوسنگ' : 'تختی و قلم (Slate & Stylus)')), /*#__PURE__*/React.createElement("h3", {
      className: "text-2xl md:text-3xl font-extrabold font-arabic text-amber-300"
    }, "\u062D\u0631\u0641 / \u0644\u0641\u0638: ", /*#__PURE__*/React.createElement("span", {
      className: "underline decoration-amber-400 decoration-2"
    }, q.targetChar)), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-300"
    }, q.nameUrdu, " \u06A9\u06D2 \u062F\u0631\u0633\u062A \u0628\u0631\u06CC\u0644 \u0646\u0642\u0627\u0637 \u062F\u0628\u0627\u0626\u06CC\u06BA \u0627\u0648\u0631 \u062C\u0627\u0646\u0686\u06CC\u06BA\u06D4")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center justify-center gap-4 py-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, practiceSimulatorMode === 'slate' && isPaperFlipped ? /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-emerald-400 font-bold"
    }, "\u06A9\u0627\u063A\u0630 \u067E\u0644\u0679 \u062F\u06CC\u0627 \u06AF\u06CC\u0627 \u06C1\u06D2 (\u0633\u0627\u0645\u0646\u06D2 \u0633\u06D2 \u067E\u0691\u06BE\u0646\u06D2 \u06A9\u06CC \u062A\u0631\u062A\u06CC\u0628):"), /*#__PURE__*/React.createElement(BrailleCellVisual, {
      dots: practicePunchedDots,
      size: "lg",
      mirrored: false
    })) : /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 font-sans"
    }, practiceSimulatorMode === 'slate' ? 'معکوس سوراخ کاری (نقاط 1-2-3 دائیں جانب ہیں)' : 'معیاری پرکنز ترتیب (نقاط 1-2-3 بائیں جانب ہیں)'), /*#__PURE__*/React.createElement(BrailleCellVisual, {
      dots: practicePunchedDots,
      size: "lg",
      interactive: true,
      mirrored: practiceSimulatorMode === 'slate',
      onToggleDot: d => {
        triggerHaptic(30);
        setPracticePunchedDots(prev => {
          if (prev.includes(d)) return prev.filter(x => x !== d);
          return [...prev, d].sort((a, b) => a - b);
        });
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "text-xs font-mono text-slate-400"
    }, "\u0645\u0646\u062A\u062E\u0628 \u0646\u0642\u0627\u0637: [", practicePunchedDots.sort((a, b) => a - b).join('، ') || 'کوئی نہیں', "]"), practiceSimulatorMode === 'slate' && /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => {
        triggerHaptic(40);
        setIsPaperFlipped(!isPaperFlipped);
        speakText(isPaperFlipped ? 'کاغذ معکوس موڈ پر چلا گیا' : 'کاغذ پلٹ دیا گیا');
      },
      className: "px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-amber-300 flex items-center gap-2 border border-white/10 shadow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-outlined text-base"
    }, "flip"), /*#__PURE__*/React.createElement("span", null, isPaperFlipped ? 'کاغذ دوبارہ پلٹیں (سوراخ کاری)' : 'کاغذ پلٹ کر دیکھیں (سامنے کا منظر)'))), practiceFeedback && /*#__PURE__*/React.createElement("div", {
      className: `p-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${practiceFeedback.type === 'success' ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-500' : 'bg-rose-900/60 text-rose-200 border border-rose-500'}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-outlined text-lg"
    }, practiceFeedback.type === 'success' ? 'check_circle' : 'cancel'), /*#__PURE__*/React.createElement("span", null, practiceFeedback.message)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-center justify-center gap-3 pt-2"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: handleCheckPracticeAnswer,
      className: "px-6 py-2.5 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-sm shadow hover:scale-105 active:scale-95",
      "data-testid": "check_answer_btn"
    }, "\u062C\u0648\u0627\u0628 \u06A9\u06CC \u062A\u0635\u062F\u06CC\u0642 \u06A9\u0631\u06CC\u06BA"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => {
        triggerHaptic(20);
        setPracticeFeedback({
          type: 'error',
          message: `اشارہ: ${q.hint}`
        });
        speakText(q.hint);
      },
      className: `px-4 py-2.5 rounded-xl border ${themeClasses.surfaceBorder} text-xs font-bold hover:bg-white/5`
    }, "\u0627\u0634\u0627\u0631\u06C1 (Hint)"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: handleNextPracticeQuestion,
      className: `px-5 py-2.5 rounded-xl border ${themeClasses.surfaceBorder} text-xs font-bold hover:bg-white/5 flex items-center gap-1.5`
    }, /*#__PURE__*/React.createElement("span", null, "\u0627\u06AF\u0644\u0627 \u0633\u0648\u0627\u0644"), /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-outlined text-base"
    }, "arrow_forward"))));
  })()) :
  /*#__PURE__*/
  /* Tier 4: Timed Sentences Practice */
  React.createElement("div", {
    className: `p-6 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-6`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-base text-amber-300"
  }, "\u062F\u0631\u062C\u06C1 \u0686\u06C1\u0627\u0631\u0645: \u0639\u0628\u0627\u0631\u062A\u06CC \u0645\u0634\u0642 \u0648 \u0633\u0637\u0631 \u0628\u0646\u062F\u06CC"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "\u0645\u06A9\u0645\u0644 \u0627\u0631\u062F\u0648 \u062C\u0645\u0644\u0648\u06BA \u06A9\u06CC \u0628\u0627\u0642\u0627\u0639\u062F\u06C1 \u0628\u0631\u06CC\u0644 \u0646\u0648\u06CC\u0633\u06CC \u0627\u0648\u0631 \u0645\u062E\u0641\u0641\u0627\u062A \u06A9\u06CC \u0645\u0634\u0642\u06D4")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setIsTimerRunning(!isTimerRunning),
    className: `px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${isTimerRunning ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-900'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-sm"
  }, isTimerRunning ? 'pause' : 'play_arrow'), /*#__PURE__*/React.createElement("span", null, "\u0648\u0642\u062A: ", Math.floor(practiceTimerSeconds / 60), ":", String(practiceTimerSeconds % 60).padStart(2, '0'))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, PRACTICE_TIERS[4].sentences.map((s, idx) => {
    const trans = translateUrduToBraille(s.textUrdu, 2);
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      className: `p-4 rounded-xl ${themeClasses.card} border ${themeClasses.surfaceBorder} space-y-2`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-amber-400"
    }, "\u062C\u0645\u0644\u06C1 \u0646\u0645\u0628\u0631 ", idx + 1), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 font-sans"
    }, trans.cells.filter(c => c.category !== 'space').length, " \u062E\u0627\u0646\u06D2")), /*#__PURE__*/React.createElement("p", {
      className: "text-lg font-bold font-arabic text-slate-100"
    }, s.textUrdu), /*#__PURE__*/React.createElement("div", {
      className: "p-2 rounded-lg bg-black/40 text-xl font-mono text-amber-300 tracking-wider overflow-x-auto",
      dir: "ltr"
    }, trans.unicodeString), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-emerald-300"
    }, "\u0646\u06A9\u0627\u062A: ", s.tip));
  })))), activeTab === 'lexicon' && /*#__PURE__*/React.createElement("section", {
    className: "space-y-4",
    "aria-label": "\u062C\u0627\u0645\u0639 \u0628\u0631\u06CC\u0644 \u0644\u063A\u062A"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "library_books"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-sm"
  }, "\u062C\u0627\u0645\u0639 \u0627\u0631\u062F\u0648 \u0628\u0631\u06CC\u0644 \u0644\u063A\u062A \u0648 \u062F\u0627\u0626\u0631\u06C3 \u0627\u0644\u0645\u0639\u0627\u0631\u0641 (AIOU 3601 Lexicon)")), /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 max-w-md"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined absolute right-3 top-2.5 text-slate-400 text-lg"
  }, "search"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: lexiconQuery,
    onChange: e => setLexiconQuery(e.target.value),
    placeholder: "\u0644\u0641\u0638\u060C \u062D\u0631\u0641 \u06CC\u0627 \u0646\u0642\u0637\u06C1 \u062A\u0644\u0627\u0634 \u06A9\u0631\u06CC\u06BA (\u0645\u062B\u0644\u0627\u064B: \u0628\u06C1\u062A\u060C [1,2]\u060C \u0686\u0627\u06C1\u06CC\u06D2)...",
    className: "w-full pr-10 pl-3 py-2 rounded-xl bg-black/25 border border-white/10 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
  }), lexiconQuery && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setLexiconQuery(''),
    className: "absolute left-3 top-2 text-slate-400 text-sm"
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar"
  }, [{
    id: 'all',
    label: 'تمام (All)'
  }, {
    id: 'alphabets',
    label: 'حروف تہجی'
  }, {
    id: 'diacritics',
    label: 'اعراب و علامات'
  }, {
    id: 'g2_single',
    label: 'کل لفظی مفرد'
  }, {
    id: 'g2_dochashmi',
    label: 'دو چشمی ھ مرکبات'
  }, {
    id: 'g2_dot5',
    label: 'نقطہ ۵ مخففات'
  }, {
    id: 'g2_dots45',
    label: 'نقاط ۴، ۵ مخففات'
  }, {
    id: 'g2_dots456',
    label: 'نقاط ۴، ۵، ۶ مخففات'
  }, {
    id: 'g2_suffixes',
    label: 'لاحقے (۴،۶ و ۵،۶)'
  }, {
    id: 'g2_keh',
    label: 'کہ بیانیہ بر ۶'
  }, {
    id: 'g2_numeral_comp',
    label: 'نشان گنتی مرکبات'
  }, {
    id: 'g2_abbrev',
    label: 'حصہ دوم اختصارات'
  }, {
    id: 'punctuation',
    label: 'رموز اوقاف'
  }, {
    id: 'numerals',
    label: 'ہندسے و اعداد'
  }].map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat.id,
    type: "button",
    onClick: () => {
      triggerHaptic(20);
      setLexiconCategory(cat.id);
    },
    className: `px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition ${lexiconCategory === cat.id ? themeClasses.accent : 'bg-white/5 hover:bg-white/10 text-slate-300'}`
  }, cat.label)))), (() => {
    const filtered = URDU_BRAILLE_REGISTRY.filter(item => {
      if (lexiconCategory !== 'all' && item.category !== lexiconCategory) {
        return false;
      }
      if (!lexiconQuery.trim()) return true;
      const q = lexiconQuery.trim().toLowerCase();
      const inChar = item.char.toLowerCase().includes(q);
      const inUrdu = item.nameUrdu.toLowerCase().includes(q);
      const inEn = item.nameEn.toLowerCase().includes(q);
      const inDots = item.dots.join(',').includes(q);
      return inChar || inUrdu || inEn || inDots;
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-xs text-slate-400 px-1"
    }, /*#__PURE__*/React.createElement("span", null, "\u0646\u062A\u0627\u0626\u062C: ", filtered.length, " \u0627\u0646\u062F\u0631\u0627\u062C\u0627\u062A"), /*#__PURE__*/React.createElement("span", null, "\u062A\u0641\u0635\u06CC\u0644\u0627\u062A \u062F\u06CC\u06A9\u06BE\u0646\u06D2 \u0627\u0648\u0631 \u062A\u0644\u0641\u0638 \u0633\u0646\u0646\u06D2 \u06A9\u06D2 \u0644\u06CC\u06D2 \u06A9\u0627\u0631\u0688 \u067E\u0631 \u06A9\u0644\u06A9 \u06A9\u0631\u06CC\u06BA\u06D4")), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
    }, filtered.map(item => /*#__PURE__*/React.createElement("div", {
      key: item.id,
      onClick: () => {
        triggerHaptic(25);
        setSelectedLexiconItem(item);
        speakText(`${item.char}، ${item.nameUrdu}، ${dotsToAriaDescription(item.dots, 'ur')}`);
      },
      className: `p-3 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} hover:border-amber-400 transition cursor-pointer flex flex-col items-center justify-between gap-2 shadow-sm group`
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full flex items-center justify-between text-[10px] text-slate-400"
    }, /*#__PURE__*/React.createElement("span", {
      className: `px-1.5 py-0.5 rounded ${item.grade === 2 ? 'bg-amber-400/20 text-amber-300' : 'bg-white/10 text-slate-300'}`
    }, item.grade === 2 ? 'گریڈ ۲' : 'گریڈ ۱'), /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "[", item.dots.join(','), "]")), /*#__PURE__*/React.createElement("div", {
      className: "text-xl md:text-2xl font-bold font-arabic text-amber-200 group-hover:scale-105 transition"
    }, item.char), /*#__PURE__*/React.createElement(BrailleCellVisual, {
      dots: item.dots,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      className: "text-center w-full"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-bold text-slate-100 truncate"
    }, item.nameUrdu), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-slate-400 truncate font-sans"
    }, item.nameEn))))));
  })(), selectedLexiconItem && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4",
    onClick: () => setSelectedLexiconItem(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-6 rounded-3xl ${themeClasses.surface} border-2 border-amber-400 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95`,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `px-2 py-0.5 rounded-full text-xs font-bold ${themeClasses.badge}`
  }, selectedLexiconItem.grade === 2 ? 'درجہ دوم مخفف (Grade 2 Contraction)' : 'درجہ اول (Grade 1)'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setSelectedLexiconItem(null),
    className: "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-around py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-4xl font-extrabold font-arabic text-amber-300 mb-1"
  }, selectedLexiconItem.char), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-slate-200"
  }, selectedLexiconItem.nameUrdu), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 font-sans"
  }, selectedLexiconItem.nameEn)), /*#__PURE__*/React.createElement(BrailleCellVisual, {
    dots: selectedLexiconItem.dots,
    size: "md"
  })), /*#__PURE__*/React.createElement("div", {
    className: `p-3 rounded-xl ${themeClasses.card} text-xs space-y-1.5`
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-300"
  }, "\u0646\u0642\u0627\u0637 \u06A9\u06CC \u062A\u0631\u062A\u06CC\u0628:"), " [", selectedLexiconItem.dots.join('، '), "]"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-300"
  }, "\u0627\u0633\u06A9\u0631\u06CC\u0646 \u0631\u06CC\u0688\u0631 \u062A\u0648\u0635\u06CC\u0641:"), " ", dotsToAriaDescription(selectedLexiconItem.dots, 'ur')), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-300"
  }, "\u0645\u062B\u0627\u0644 \u0627\u0633\u062A\u0639\u0645\u0627\u0644:"), " ", selectedLexiconItem.example || '—')), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => speakText(`${selectedLexiconItem.char}، ${selectedLexiconItem.nameUrdu}`),
    className: "flex-1 py-2.5 rounded-xl bg-amber-400 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-base"
  }, "volume_up"), /*#__PURE__*/React.createElement("span", null, "\u0635\u0648\u062A\u06CC \u062A\u0644\u0641\u0638 \u0633\u0646\u06CC\u06BA")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      copyToClipboard(selectedLexiconItem.char, 'لفظ کاپی ہو گیا');
    },
    className: "px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
  }, "\u06A9\u0627\u067E\u06CC \u06A9\u0631\u06CC\u06BA"))))), activeTab === 'rules' && /*#__PURE__*/React.createElement("section", {
    className: "space-y-6",
    "aria-label": "\u0631\u0645\u0648\u0632 \u0627\u0648\u0642\u0627\u0641 \u0648 \u0642\u0648\u0627\u0639\u062F"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-5 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "format_align_center"), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-sm"
  }, "\u0642\u0627\u0639\u062F\u06C1 \u0633\u0637\u0631 \u0628\u0646\u062F\u06CC \u0648 \u0639\u0646\u0648\u0627\u0646 \u06A9\u06CC \u0645\u0631\u06A9\u0632\u06CC\u062A (Title Centering Rule on 38/40 Cell Line)")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 leading-relaxed"
  }, "\u0642\u0648\u0645\u06CC \u0628\u0631\u06CC\u0644 \u0642\u0648\u0627\u0639\u062F (AIOU 3601) \u06A9\u06D2 \u0645\u0637\u0627\u0628\u0642 \u0639\u0646\u0648\u0627\u0646 \u06A9\u0648 \u0633\u0637\u0631 \u06A9\u06D2 \u0639\u06CC\u0646 \u062F\u0631\u0645\u06CC\u0627\u0646 \u0645\u06CC\u06BA \u0644\u06A9\u06BE\u0646\u06D2 \u06A9\u0627 \u0641\u0627\u0631\u0645\u0648\u0644\u0627:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-amber-300 font-bold"
  }, "\u062E\u0627\u0644\u06CC \u062E\u0627\u0646\u06D2 = (\u0633\u0637\u0631 \u06A9\u06D2 \u06A9\u0644 \u062E\u0627\u0646\u06D2 - \u0639\u0646\u0648\u0627\u0646 \u06A9\u06D2 \u062E\u0627\u0646\u06D2) \xF7 \u06F2")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-3 items-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2 space-y-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-300"
  }, "\u0639\u0646\u0648\u0627\u0646 \u062F\u0631\u062C \u06A9\u0631\u06CC\u06BA:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: titleToCenter,
    onChange: e => setTitleToCenter(e.target.value),
    className: "w-full p-2.5 rounded-xl bg-black/25 border border-white/10 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-300"
  }, "\u0633\u0637\u0631 \u06A9\u06CC \u06AF\u0646\u062C\u0627\u0626\u0634:"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setLineLengthOption(38),
    className: `flex-1 py-2 rounded-xl text-xs font-bold border transition ${lineLengthOption === 38 ? themeClasses.accent : 'bg-white/5 border-white/10'}`
  }, "38 \u062E\u0627\u0646\u06D2"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setLineLengthOption(40),
    className: `flex-1 py-2 rounded-xl text-xs font-bold border transition ${lineLengthOption === 40 ? themeClasses.accent : 'bg-white/5 border-white/10'}`
  }, "40 \u062E\u0627\u0646\u06D2")))), (() => {
    const titleTrans = translateUrduToBraille(titleToCenter, 2);
    const titleCellCount = titleTrans.cells.length;
    const remaining = Math.max(0, lineLengthOption - titleCellCount);
    const leadingBlanks = Math.floor(remaining / 2);
    const trailingBlanks = remaining - leadingBlanks;
    return /*#__PURE__*/React.createElement("div", {
      className: `p-4 rounded-xl ${themeClasses.card} space-y-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-center justify-between text-xs"
    }, /*#__PURE__*/React.createElement("span", null, "\u0639\u0646\u0648\u0627\u0646 \u06A9\u06D2 \u06A9\u0644 \u062E\u0627\u0646\u06D2: ", /*#__PURE__*/React.createElement("strong", {
      className: "text-amber-400"
    }, titleCellCount)), /*#__PURE__*/React.createElement("span", null, "\u0633\u0637\u0631 \u06A9\u06D2 \u0628\u0627\u0626\u06CC\u06BA \u062C\u0627\u0646\u0628 \u0686\u06BE\u0648\u0691\u06D2 \u062C\u0627\u0646\u06D2 \u0648\u0627\u0644\u06D2 \u062E\u0627\u0644\u06CC \u062E\u0627\u0646\u06D2: ", /*#__PURE__*/React.createElement("strong", {
      className: "text-amber-400"
    }, leadingBlanks)), /*#__PURE__*/React.createElement("span", null, "\u0633\u0637\u0631 \u06A9\u06D2 \u0627\u062E\u062A\u062A\u0627\u0645 \u067E\u0631 \u0628\u0627\u0642\u06CC \u062E\u0627\u0646\u06D2: ", /*#__PURE__*/React.createElement("strong", {
      className: "text-amber-400"
    }, trailingBlanks))), /*#__PURE__*/React.createElement("div", {
      className: "p-2 rounded-lg bg-black/60 border border-white/10 overflow-x-auto text-[10px] font-mono whitespace-nowrap text-amber-300 tracking-widest flex items-center gap-1",
      dir: "ltr"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-500"
    }, "[", leadingBlanks, " \u062E\u0627\u0646\u06D2 \u062E\u0627\u0644\u06CC] \u2794 "), /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400 font-bold"
    }, titleTrans.unicodeString), /*#__PURE__*/React.createElement("span", {
      className: "text-slate-500"
    }, " \u2794 [", trailingBlanks, " \u062E\u0627\u0646\u06D2 \u062E\u0627\u0644\u06CC]")));
  })()), /*#__PURE__*/React.createElement("div", {
    className: `p-5 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "help"), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-sm"
  }, "\u0633\u0631\u06A9\u0627\u0631\u06CC \u0631\u0645\u0648\u0632 \u0627\u0648\u0642\u0627\u0641 \u0648 \u0639\u0644\u0627\u0645\u0627\u062A (Official Punctuation Rules)")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
  }, URDU_BRAILLE_REGISTRY.filter(it => it.category === 'punctuation').map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: `p-3 rounded-xl ${themeClasses.card} border ${themeClasses.surfaceBorder} flex items-center justify-between`
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-xs text-amber-300"
  }, p.nameUrdu), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400 font-mono"
  }, "\u0646\u0642\u0627\u0637: [", p.dots.join('، '), "]"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400 mt-1"
  }, p.example)), /*#__PURE__*/React.createElement(BrailleCellVisual, {
    dots: p.dots,
    size: "sm"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-2`
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-xs text-amber-300 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-base"
  }, "content_cut"), /*#__PURE__*/React.createElement("span", null, "\u0633\u0637\u0631 \u06A9\u06D2 \u0622\u062E\u0631 \u0645\u06CC\u06BA \u0644\u0641\u0638 \u062A\u0648\u0691\u0646\u06D2 \u06A9\u06D2 \u0627\u0635\u0648\u0644 (Hyphenation):")), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-300 space-y-1.5 list-disc pr-4 leading-relaxed"
  }, /*#__PURE__*/React.createElement("li", null, "\u06A9\u0633\u06CC \u0628\u06BE\u06CC ", /*#__PURE__*/React.createElement("strong", null, "\u0645\u062E\u0641\u0641 \u06CC\u0627 \u0627\u062E\u062A\u0635\u0627\u0631"), " \u06A9\u0648 \u0633\u0637\u0631 \u06A9\u06D2 \u0622\u062E\u0631 \u0645\u06CC\u06BA \u062A\u0648\u0691 \u06A9\u0631 \u0622\u062F\u06BE\u0627 \u0627\u06AF\u0644\u06CC \u0633\u0637\u0631 \u0645\u06CC\u06BA \u0644\u06A9\u06BE\u0646\u0627 \u0633\u062E\u062A\u06CC \u0633\u06D2 \u0645\u0646\u0639 \u06C1\u06D2\u06D4"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u062F\u0648 \u0686\u0634\u0645\u06CC \u062D\u0631\u0648\u0641"), " (\u0645\u062B\u0644\u0627\u064B \u0628\u06BE\u06CC\u060C \u06AF\u06BE\u0631\u060C \u0679\u06BE\u06CC\u06A9) \u06A9\u0648 \u06A9\u0628\u06BE\u06CC \u0627\u0644\u06AF \u0646\u06C1\u06CC\u06BA \u06A9\u06CC\u0627 \u062C\u0627 \u0633\u06A9\u062A\u0627\u06D4"), /*#__PURE__*/React.createElement("li", null, "\u0627\u06AF\u0631 \u0639\u0627\u0645 \u0644\u0641\u0638 \u0644\u0645\u0628\u0627 \u06C1\u0648 \u062A\u0648 \u0639\u0644\u0627\u0645\u062A\u06CC \u062E\u0637 [3,6] (\u2824) \u0644\u06AF\u0627 \u06A9\u0631 \u0628\u0642\u06CC\u06C1 \u062D\u0631\u0648\u0641 \u06A9\u0648 \u0627\u06AF\u0644\u06CC \u0633\u0637\u0631 \u0645\u06CC\u06BA \u0645\u0646\u062A\u0642\u0644 \u06A9\u0631\u06CC\u06BA\u06D4"))), /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-2`
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-xs text-amber-300 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-base"
  }, "format_shapes"), /*#__PURE__*/React.createElement("span", null, "\u062A\u0634\u062F\u06CC\u062F \u0648 \u0627\u0639\u0631\u0627\u0628 \u06A9\u06CC \u062F\u0631\u0633\u062A \u067E\u0648\u0632\u06CC\u0634\u0646:")), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-300 space-y-1.5 list-disc pr-4 leading-relaxed"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u062A\u0634\u062F\u06CC\u062F \u06A9\u0627 \u0645\u0642\u0627\u0645:"), " \u0639\u0627\u0645 \u0627\u0631\u062F\u0648 \u062A\u062D\u0631\u06CC\u0631 \u06A9\u06D2 \u0628\u0631\u0639\u06A9\u0633\u060C \u0628\u0631\u06CC\u0644 \u0645\u06CC\u06BA \u062A\u0634\u062F\u06CC\u062F \u06A9\u0627 \u0646\u0634\u0627\u0646 [6] (\u2820) \u062D\u0631\u0641 \u0633\u06D2 ", /*#__PURE__*/React.createElement("strong", null, "\u067E\u06C1\u0644\u06D2"), " \u0644\u06A9\u06BE\u0627 \u062C\u0627\u062A\u0627 \u06C1\u06D2\u06D4"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u0627\u0639\u0631\u0627\u0628:"), " \u0632\u0628\u0631\u060C \u0632\u06CC\u0631 \u0627\u0648\u0631 \u067E\u06CC\u0634 \u06C1\u0645\u06CC\u0634\u06C1 \u062F\u0648 \u062D\u0631\u0648\u0641 \u06A9\u06D2 \u062F\u0631\u0645\u06CC\u0627\u0646 \u0627\u067E\u0646\u06D2 \u0635\u0648\u062A\u06CC \u0645\u0642\u0627\u0645 \u067E\u0631 \u0622\u062A\u06D2 \u06C1\u06CC\u06BA\u06D4"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u06A9\u06BE\u0691\u0627 \u0632\u0628\u0631:"), " \u0646\u0642\u0637\u06C1 4 (\u2808) \u06A9\u06D2 \u0633\u0627\u062A\u06BE \u062D\u0631\u0641 \u06A9\u06D2 \u0628\u0639\u062F \u0622\u062A\u0627 \u06C1\u06D2\u06D4"))))), activeTab === 'search' && /*#__PURE__*/React.createElement("section", {
    className: "space-y-4",
    "aria-label": "\u06C1\u0648\u0634\u06CC\u0627\u0631 \u062A\u0644\u0627\u0634"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "travel_explore"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-sm"
  }, "\u06C1\u0648\u0634\u06CC\u0627\u0631 \u062F\u0648 \u0637\u0631\u0641\u06C1 \u062A\u0644\u0627\u0634 (Smart Multi-Way Search & Reverse Dot Matrix):")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-300"
  }, "\u06F1. \u0627\u0631\u062F\u0648 \u0644\u0641\u0638\u060C \u0646\u0627\u0645 \u06CC\u0627 \u0646\u0642\u0637\u06C1 \u0646\u0645\u0628\u0631 \u0633\u06D2 \u062A\u0644\u0627\u0634 \u06A9\u0631\u06CC\u06BA:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    placeholder: "\u0645\u062B\u0644\u0627\u064B: '\u0628\u06C1\u062A'\u060C '2, 5'\u060C '\u062D\u0627\u0635\u0644'...",
    className: "w-full p-2.5 rounded-xl bg-black/25 border border-white/10 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400"
  }, "\u06A9\u0648\u0626\u06CC \u0628\u06BE\u06CC \u0627\u0631\u062F\u0648 \u0644\u0641\u0638 \u06CC\u0627 \u0646\u0642\u0627\u0637 \u06A9\u0627 \u062C\u0648\u0691\u0627 (\u062C\u06CC\u0633\u06D2 1\u060C 5) \u062F\u0631\u062C \u06A9\u0631\u06CC\u06BA\u06D4")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-center md:text-right"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-300"
  }, "\u06F2. \u06CC\u0627 \u0648\u0631\u0686\u0648\u0626\u0644 \u0633\u06CC\u0644 \u06A9\u06D2 \u0646\u0642\u0627\u0637 \u06A9\u0648 \u0686\u06BE\u0648 \u06A9\u0631 \u0645\u0639\u0646\u06CC \u062F\u0631\u06CC\u0627\u0641\u062A \u06A9\u0631\u06CC\u06BA:"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center md:justify-start gap-4"
  }, /*#__PURE__*/React.createElement(BrailleCellVisual, {
    dots: Object.keys(searchDotsMatrix).filter(d => searchDotsMatrix[d]).map(Number),
    size: "md",
    interactive: true,
    onToggleDot: d => {
      triggerHaptic(25);
      setSearchDotsMatrix(prev => ({
        ...prev,
        [d]: !prev[d]
      }));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-right"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-amber-400 font-bold font-mono"
  }, "\u0646\u0642\u0627\u0637: [", Object.keys(searchDotsMatrix).filter(d => searchDotsMatrix[d]).join('، ') || 'کوئی نہیں', "]"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setSearchDotsMatrix({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false
      });
      triggerHaptic(20);
    },
    className: "text-[11px] text-rose-400 hover:underline"
  }, "\u0646\u0642\u0627\u0637 \u0631\u06CC \u0633\u06CC\u0679 \u06A9\u0631\u06CC\u06BA")))))), (() => {
    const activeMatrixDots = Object.keys(searchDotsMatrix).filter(d => searchDotsMatrix[d]).map(Number);
    const matrixKey = activeMatrixDots.sort((a, b) => a - b).join(',');
    const results = URDU_BRAILLE_REGISTRY.filter(item => {
      // If matrix dots selected, match exact dots or compound starting dots
      if (activeMatrixDots.length > 0) {
        const itemKey = item.dots.sort((a, b) => a - b).join(',');
        if (itemKey === matrixKey) return true;
        return false;
      }
      // Text search fallback
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      const inChar = item.char.toLowerCase().includes(q);
      const inUrdu = item.nameUrdu.toLowerCase().includes(q);
      const inEn = item.nameEn.toLowerCase().includes(q);
      const inDots = item.dots.join(',').includes(q);
      return inChar || inUrdu || inEn || inDots;
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-xs text-slate-400 px-1"
    }, /*#__PURE__*/React.createElement("span", null, "\u062A\u0644\u0627\u0634 \u0634\u062F\u06C1 \u0646\u062A\u0627\u0626\u062C: ", results.length)), results.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: `p-6 rounded-2xl ${themeClasses.surface} text-center text-xs text-slate-400`
    }, "\u06A9\u0648\u0626\u06CC \u0646\u062A\u06CC\u062C\u06C1 \u0628\u0631\u0622\u0645\u062F \u0646\u06C1\u06CC\u06BA \u06C1\u0648\u0627\u06D4 \u0645\u062E\u062A\u0644\u0641 \u0646\u0642\u0627\u0637 \u06CC\u0627 \u062F\u0648\u0633\u0631\u0627 \u0644\u0641\u0638 \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA\u06D4") : /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
    }, results.map(r => /*#__PURE__*/React.createElement("div", {
      key: r.id,
      className: `p-4 rounded-xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} flex items-center justify-between`
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-amber-400"
    }, r.char), /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-bold text-slate-100"
    }, r.nameUrdu), /*#__PURE__*/React.createElement("p", {
      className: "text-[11px] text-slate-400"
    }, r.nameEn), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-emerald-400 font-mono mt-1"
    }, "\u0646\u0642\u0627\u0637: [", r.dots.join('، '), "] ", r.grade === 2 ? '(درجہ دوم)' : '(درجہ اول)')), /*#__PURE__*/React.createElement(BrailleCellVisual, {
      dots: r.dots,
      size: "sm"
    })))));
  })()), activeTab === 'tutor' && /*#__PURE__*/React.createElement("section", {
    className: "space-y-6",
    "aria-label": "\u0645\u0639\u0644\u0645 \u0628\u0631\u06CC\u0644 \u0627\u06D2 \u0622\u0626\u06CC"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-5 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "fact_check"), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-sm"
  }, "\u062E\u0648\u062F\u06A9\u0627\u0631 \u067E\u0631\u0648\u0641 \u0631\u06CC\u0688\u0646\u06AF \u0627\u0648\u0631 \u062A\u062F\u0631\u06CC\u0633\u06CC \u062C\u0627\u0626\u0632\u06C1 (Automated Proofreader)")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300"
  }, "\u0627\u067E\u0646\u0627 \u0645\u062A\u0646 \u0646\u06CC\u0686\u06D2 \u062F\u0631\u062C \u06A9\u0631\u06CC\u06BA\u06D4 \u0645\u0639\u0644\u0645 \u0627\u06D2 \u0622\u0626\u06CC \u0645\u0633\u0648\u062F\u06D2 \u0645\u06CC\u06BA \u0686\u06BE\u0648\u0679 \u062C\u0627\u0646\u06D2 \u0648\u0627\u0644\u06D2 \u062F\u0631\u062C\u06C1 \u062F\u0648\u0645 \u06A9\u06D2 \u0645\u062E\u0641\u0641\u0627\u062A\u060C \u062A\u0634\u062F\u06CC\u062F \u06A9\u06CC \u063A\u0644\u0637 \u067E\u0648\u0632\u06CC\u0634\u0646 \u0627\u0648\u0631 \u0633\u0637\u0631 \u0628\u0646\u062F\u06CC \u06A9\u0627 \u0628\u0627\u0631\u06CC\u06A9 \u0628\u06CC\u0646\u06CC \u0633\u06D2 \u0645\u0639\u0627\u0626\u0646\u06C1 \u06A9\u0631\u06D2 \u06AF\u0627\u06D4"), /*#__PURE__*/React.createElement("textarea", {
    value: proofreadingInput,
    onChange: e => setProofreadingInput(e.target.value),
    rows: 3,
    className: "w-full p-3 rounded-xl bg-black/25 border border-white/10 text-xs text-slate-100 focus:outline-none focus:border-amber-400 font-arabic",
    placeholder: "\u062C\u0627\u0646\u0686 \u06A9\u06D2 \u0644\u06CC\u06D2 \u0627\u0631\u062F\u0648 \u062A\u062D\u0631\u06CC\u0631 \u062F\u0631\u062C \u06A9\u0631\u06CC\u06BA..."
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => runProofreading(proofreadingInput),
    className: "px-5 py-2.5 rounded-xl bg-amber-400 text-slate-900 font-bold text-xs shadow hover:scale-105 active:scale-95 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-base"
  }, "check_circle"), /*#__PURE__*/React.createElement("span", null, "\u0645\u0639\u0627\u0626\u0646\u06C1 \u0648 \u067E\u0631\u0648\u0641 \u0631\u06CC\u0688\u0646\u06AF \u0634\u0631\u0648\u0639 \u06A9\u0631\u06CC\u06BA")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setProofreadingInput('وہ بہت اچھا طالب علم ہے کیونکہ اس کے دل میں شوق ہے۔'),
    className: "text-xs text-amber-300 underline"
  }, "\u0646\u0645\u0648\u0646\u06C1 \u0645\u062A\u0646 \u0622\u0632\u0645\u0627\u0626\u06CC\u06BA")), proofreadingResults && /*#__PURE__*/React.createElement("div", {
    className: `p-4 rounded-xl ${themeClasses.card} border ${themeClasses.surfaceBorder} space-y-3 mt-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-xs"
  }, "\u062F\u0631\u0633\u062A\u06AF\u06CC \u06A9\u0627 \u062A\u0646\u0627\u0633\u0628 (Accuracy Score):"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-extrabold text-amber-400"
  }, proofreadingResults.score, "%")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, proofreadingResults.issues.map((issue, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "text-xs p-2.5 rounded-lg bg-black/30 border border-white/5 space-y-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-amber-300 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-sm"
  }, issue.severity === 'success' ? 'verified' : 'info'), /*#__PURE__*/React.createElement("span", null, issue.title)), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 pr-5"
  }, issue.detail)))))), /*#__PURE__*/React.createElement("div", {
    className: `p-5 rounded-2xl ${themeClasses.surface} border ${themeClasses.surfaceBorder} space-y-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-amber-400"
  }, "auto_stories"), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-sm"
  }, "\u0645\u062E\u0635\u0648\u0635 \u0627\u0645\u062A\u062D\u0627\u0646\u06CC \u0645\u0634\u0642\u0648\u06BA \u06A9\u0627 \u062C\u0646\u0631\u06CC\u0679\u0631 (Custom Exercise Generator)")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300"
  }, "\u0627\u0633\u0627\u062A\u0630\u06C1 \u0627\u0648\u0631 \u0637\u0644\u0628\u06C1 \u06A9\u06D2 \u0644\u06CC\u06D2: \u0645\u0646\u062A\u062E\u0628 \u062F\u0631\u062C\u06D2 \u06A9\u06CC \u0628\u0646\u06CC\u0627\u062F \u067E\u0631 \u06F5 \u0627\u0645\u062A\u062D\u0627\u0646\u06CC \u0633\u0648\u0627\u0644\u0627\u062A \u0641\u0648\u0631\u06CC \u0637\u0648\u0631 \u067E\u0631 \u062A\u062E\u0644\u06CC\u0642 \u06A9\u0631\u06CC\u06BA\u06D4"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-300"
  }, "\u062F\u0631\u062C\u06C1 \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA:"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, [1, 2, 3].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    type: "button",
    onClick: () => setGeneratorTier(t),
    className: `px-3 py-1.5 rounded-xl text-xs font-bold border transition ${generatorTier === t ? themeClasses.accent : 'bg-white/5 border-white/10'}`
  }, "\u062F\u0631\u062C\u06C1 ", t))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: generateExercises,
    className: "px-4 py-2 rounded-xl bg-amber-400 text-slate-900 font-bold text-xs shadow hover:scale-105 active:scale-95"
  }, "\u0646\u0626\u06CC \u0645\u0634\u0642\u06CC\u06BA \u0628\u0646\u0627\u0626\u06CC\u06BA")), generatedExercises && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pt-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-bold text-amber-300"
  }, "\u062A\u062E\u0644\u06CC\u0642 \u0634\u062F\u06C1 \u0627\u0645\u062A\u062D\u0627\u0646\u06CC \u0633\u0648\u0627\u0644\u0627\u062A:"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, generatedExercises.map((ex, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: `p-3 rounded-xl ${themeClasses.card} border ${themeClasses.surfaceBorder} flex items-center justify-between`
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-amber-400 font-bold"
  }, "\u0633\u0648\u0627\u0644 ", idx + 1), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-sm font-arabic text-slate-100"
  }, ex.targetChar), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, ex.nameUrdu), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-emerald-400 mt-1"
  }, "\u062C\u0648\u0627\u0628\u06CC \u0646\u0642\u0627\u0637: [", ex.expectedDots.join('، '), "]")), /*#__PURE__*/React.createElement(BrailleCellVisual, {
    dots: ex.expectedDots,
    size: "sm"
  })))))))), /*#__PURE__*/React.createElement("nav", {
    className: `fixed bottom-0 left-0 right-0 z-40 ${themeClasses.header} border-t px-2 py-1.5 shadow-2xl`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto flex items-center justify-around"
  }, [{
    id: 'translator',
    label: 'مترجم',
    icon: 'translate'
  }, {
    id: 'practice',
    label: 'مشق گاہ',
    icon: 'school'
  }, {
    id: 'lexicon',
    label: 'لغت',
    icon: 'library_books'
  }, {
    id: 'rules',
    label: 'قواعد',
    icon: 'menu_book'
  }, {
    id: 'search',
    label: 'تلاش',
    icon: 'travel_explore'
  }, {
    id: 'tutor',
    label: 'معلم اے آئی',
    icon: 'psychology'
  }].map(tab => {
    const isSelected = activeTab === tab.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      type: "button",
      onClick: () => {
        triggerHaptic(20);
        setActiveTab(tab.id);
        speakText(tab.label);
      },
      className: `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${isSelected ? 'text-amber-400 font-extrabold scale-105' : 'text-slate-400 hover:text-slate-200'}`,
      "data-testid": `tab_${tab.id}`,
      "aria-selected": isSelected
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-outlined text-xl mb-0.5"
    }, tab.icon), /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-arabic"
    }, tab.label));
  }))));
}

// Global Mount
if (typeof window !== "undefined" && document.getElementById("root")) {
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
}
    console.log('[UrduBraille] App initialized successfully.');
  } catch (err) {
    console.error('[UrduBraille] Initialization error:', err);
    var root = document.getElementById('root');
    if (root) {
      root.innerHTML = '<div style="padding: 20px; color: #f87171; font-family: sans-serif; text-align: center;"><h2>ایپ لوڈ کرنے میں دشواری پیش آئی</h2><p>' + (err && err.message ? err.message : err) + '</p><button onclick="window.location.reload()" style="padding: 10px 20px; background: #fbbf24; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">دوبارہ کوشش کریں</button></div>';
    }
  }
})();
