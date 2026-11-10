package com.example.braille

object UrduBrailleData {

    val DICTIONARY_ENTRIES: List<BrailleDictEntry> = listOf(
        // Grade 1 Letters
        BrailleDictEntry("g1_alif", "الف (ا)", listOf(1), "⠁", "درجہ اول", "حروفِ تہجی", "نقطہ ۱ - ابتدائی حرف"),
        BrailleDictEntry("g1_bay", "بے (ب)", listOf(1, 2), "⠃", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۲"),
        BrailleDictEntry("g1_pay", "پے (پ)", listOf(1, 2, 3, 4), "⠏", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۲، ۳، ۴"),
        BrailleDictEntry("g1_tay", "تے (ت)", listOf(2, 3, 4, 5), "⠞", "درجہ اول", "حروفِ تہجی", "نقاط ۲، ۳، ۴، ۵"),
        BrailleDictEntry("g1_ttay", "ٹے (ٹ)", listOf(2, 4, 5, 6), "⠺", "درجہ اول", "حروفِ تہجی", "نقاط ۲، ۴، ۵، ۶"),
        BrailleDictEntry("g1_say", "ثے (ث)", listOf(1, 4, 5, 6), "⠹", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۴، ۵، ۶"),
        BrailleDictEntry("g1_jeem", "جیم (ج)", listOf(2, 4, 5), "⠚", "درجہ اول", "حروفِ تہجی", "نقاط ۲، ۴، ۵"),
        BrailleDictEntry("g1_chay", "چے (چ)", listOf(1, 4), "⠉", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۴"),
        BrailleDictEntry("g1_hay", "حے (ح)", listOf(1, 5, 6), "⠱", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۵، ۶"),
        BrailleDictEntry("g1_khay", "خے (خ)", listOf(1, 3, 4, 6), "⠭", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۳، ۴، ۶"),
        BrailleDictEntry("g1_daal", "دال (د)", listOf(1, 4, 5), "⠙", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۴، ۵"),
        BrailleDictEntry("g1_ddaal", "ڈال (ڈ)", listOf(1, 2, 4, 6), "⠫", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۲، ۴، ۶"),
        BrailleDictEntry("g1_ray", "رے (ر)", listOf(1, 2, 3, 5), "⠗", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۲، ۳، ۵"),
        BrailleDictEntry("g1_rray", "ڑے (ڑ)", listOf(1, 2, 3, 4, 5, 6), "⠿", "درجہ اول", "حروفِ تہجی", "تمام چھ نقاط (۱ تا ۶)"),
        BrailleDictEntry("g1_seen", "سین (س)", listOf(2, 3, 4), "⠎", "درجہ اول", "حروفِ تہجی", "نقاط ۲، ۳، ۴"),
        BrailleDictEntry("g1_sheen", "شین (ش)", listOf(1, 4, 6), "⠩", "درجہ اول", "حروفِ تہجی", "نقاط ۱، ۴، ۶"),
        BrailleDictEntry("g1_dochashmi", "دو چشمی ھ (ھ)", listOf(2, 3, 6), "⠦", "درجہ اول", "حروفِ تہجی", "نقاط ۲، ۳، ۶"),
        BrailleDictEntry("g1_noonghunna", "نون غنہ (ں)", listOf(3, 4, 6), "⠬", "درجہ اول", "حروفِ تہجی", "نقاط ۳، ۴، ۶"),
        BrailleDictEntry("g1_chotiye", "چھوٹی یے (ی)", listOf(2, 4), "⠊", "درجہ اول", "حروفِ تہجی", "نقاط ۲، ۴"),
        BrailleDictEntry("g1_badiye", "بڑی یے (ے)", listOf(3, 4), "⠌", "درجہ اول", "حروفِ تہجی", "نقاط ۳، ۴"),
        // Grade 2 Contractions
        BrailleDictEntry("g2_bohat", "بہت", listOf(1, 2), "⠃", "درجہ دوم", "کل لفظی مفرد نشانات", "نشانِ بے (۱، ۲) برائے مکمل لفظ 'بہت'"),
        BrailleDictEntry("g2_par", "پر", listOf(1, 2, 3, 4), "⠏", "درجہ دوم", "کل لفظی مفرد نشانات", "نشانِ پے برائے لفظ 'پر'"),
        BrailleDictEntry("g2_to", "تو", listOf(2, 3, 4, 5), "⠞", "درجہ دوم", "کل لفظی مفرد نشانات", "نشانِ تے برائے لفظ 'تو'"),
        BrailleDictEntry("g2_chahiye", "چاہیے", listOf(1, 4), "⠉", "درجہ دوم", "کل لفظی مفرد نشانات", "نشانِ چے برائے لفظ 'چاہیے'"),
        BrailleDictEntry("g2_hasil", "حاصل", listOf(1, 5, 6), "⠱", "درجہ دوم", "کل لفظی مفرد نشانات", "نشانِ حے برائے لفظ 'حاصل'"),
        BrailleDictEntry("g2_khali", "خالی", listOf(1, 3, 4, 6), "⠭", "درجہ دوم", "کل لفظی مفرد نشانات", "نشانِ خے برائے لفظ 'خالی'"),
        BrailleDictEntry("g2_bhee", "بھی", listOf(2, 3), "⠆", "درجہ دوم", "دو چشمی ھ مرکبات", "نقاط ۲، ۳ برائے لفظ 'بھی'"),
        BrailleDictEntry("g2_phir", "پھر", listOf(1, 2, 3), "⠇", "درجہ دوم", "دو چشمی ھ مرکبات", "نقاط ۱، ۲، ۳ برائے لفظ 'پھر'"),
        BrailleDictEntry("g2_tak", "تک", listOf(2, 3, 4, 5), "⠞", "درجہ دوم", "دو چشمی ھ مرکبات", "نقاط ۲، ۳، ۴، ۵ برائے لفظ 'تک'"),
        BrailleDictEntry("g2_theek", "ٹھیک", listOf(2, 4, 5, 6), "⠺", "درجہ دوم", "دو چشمی ھ مرکبات", "نقاط ۲، ۴، ۵، ۶ برائے لفظ 'ٹھیک'"),
        BrailleDictEntry("g2_aur", "اور", listOf(1, 2, 3, 4, 6), "⠯", "درجہ دوم", "مفردات", "نقاط ۱، ۲، ۳، ۴، ۶ برائے 'اور'"),
        // Quranic Braille Entries
        BrailleDictEntry("q_ayah", "نشانِ آیت (۝)", listOf(2, 3, 5, 6), "⠯", "رموز و اوقاف", "قرآنی بریل", "نقاط ۲، ۳، ۵، ۶ - آیت کا اختتامی نشان جو پچھلے لفظ کے ساتھ بغیر فاصلے کے لگتا ہے"),
        BrailleDictEntry("q_number", "علامتِ عدد (#)", listOf(3, 4, 5, 6), "⠼", "قواعدِ گنتی", "قرآنی بریل", "نقاط ۳، ۴، ۵، ۶ - آیت کے نمبر سے قبل ایک فاصلے کے بعد لازمی علامت"),
        BrailleDictEntry("q_waqf_jaiz", "وقف جائز (ۚ)", listOf(3, 6), "⠤", "رموز و اوقاف", "قرآنی بریل", "نقاط ۳، ۶ - وقف جائز کی علامت")
    )

    val RULES_LIST: List<BrailleRule> = listOf(
        BrailleRule(
            id = "rule_ayah_numbering",
            titleUrdu = "قواعدِ نشانِ آیت و تسلسل (Quranic Ayah Marker Rules)",
            titleEn = "Standard Quranic Ayah Marker & Number Sequence",
            grade = "قرآنی بریل و رموز",
            descUrdu = "۱. نشانِ آیت (⠯ نقاط ۲، ۳، ۵، ۶) پچھلے لفظ یا وقف کی علامت کے فورا بعد بلا کسی فاصلے کے جڑے گا۔\n۲. اگر آیت کے اختتام پر وقف (جیسے ۚ، ۖ، ۗ) ہو تو وہ لفظ کے ساتھ اور اس کے فورا بعد نشانِ آیت بلا فاصلہ آئے گا۔\n۳. نشانِ آیت کے فورا بعد لازما بالکل ایک خالی خانہ (فاصلہ ⠀) دیا جائے گا۔\n۴. اس فاصلے کے بعد علامتِ عدد (⠼ نقاط ۳، ۴، ۵، ۶) اور پھر بغیر فاصلہ آیت کے ہندسے آئیں گے۔",
            descEn = "1. No space before Ayah Marker (dots 2-3-5-6), attached directly to preceding word or waqf stop.\n2. Waqf marks attach to word, then Ayah Marker attaches immediately.\n3. Exactly one space follows Ayah Marker.\n4. Number Sign (dots 3-4-5-6) precedes Ayah digits.",
            exampleUrdu = "الرَّحِيمِ ۝١",
            exampleBraille = "⠁⠇⠠⠗⠂⠱⠑⠊⠍⠑⠯ ⠼⠁",
            sequenceDesc = "[Last Char/Waqf] + [2,3,5,6] + [SPACE] + [3,4,5,6] + [Ayah Digits]"
        ),
        BrailleRule(
            id = "rule_tashdeed",
            titleUrdu = "قاعدہ تشدید (Tashdeed Placement Rule)",
            titleEn = "Diacritic Rule: Tashdeed Precedence",
            grade = "درجہ اول (حرفی)",
            descUrdu = "اردو بریل میں تشدید (نقطہ ۴) ہمیشہ اس حرف سے پہلے لکھی جاتی ہے جس پر تشدید موجود ہو، تاکہ قاری کو پہلے سے پتہ چل سکے کہ اگلا حرف مشدد ہے۔",
            descEn = "Tashdeed (Dot 4) always strictly precedes the consonant it applies to in Urdu Braille.",
            exampleUrdu = "مُحَمَّد",
            exampleBraille = "⠍⠥⠱⠂⠈⠍⠙",
            sequenceDesc = "[Pesh/Vowel] + [Dot 4] + [Target Consonant]"
        ),
        BrailleRule(
            id = "rule_grade2_contractions",
            titleUrdu = "قاعدہ مخففات درجہ دوم (Grade 2 Contraction Rules)",
            titleEn = "Contracted Urdu Braille (Grade 2)",
            grade = "درجہ دوم (مخففات)",
            descUrdu = "درجہ دوم میں مخصوص عام الفاظ کے لیے اکیلے حروف یا دو نقاطی مرکبات مقرر ہیں، جیسے 'بہت' کے لیے صرف 'ب' (نقاط ۱، ۲) اور 'پر' کے لیے 'پ'۔ مخفف کو سطر کے آخر میں توڑنا منع ہے۔",
            descEn = "Whole-word contractions allow single cells to represent frequent words like 'Bohat' or 'Par'. Contractions must never be broken across line wraps.",
            exampleUrdu = "وہ بہت خوش ہے",
            exampleBraille = "⠺ ⠃ ⠭⠺⠩ ⠓",
            sequenceDesc = "Word boundary check applied before contraction rendering."
        ),
        BrailleRule(
            id = "rule_hyphenation",
            titleUrdu = "قاعدہ سطر بندی و تقسیم لفظ (Line Wrap & Hyphenation)",
            titleEn = "Standard Line Centering & Hyphenation",
            grade = "رموز اوقاف و قواعد",
            descUrdu = "معیاری ۳۸ یا ۴۰ خانوں والی سطر پر عنوانات کو درمیان میں لایا جاتا ہے۔ مخففات، اختصارات یا علاماتِ اعداد کو سطر کے آخر میں آدھا توڑ کر اگلی سطر میں نہیں لے جایا جا سکتا۔",
            descEn = "Headings centered on 38/40-cell lines. Never break contractions or numbers across line boundaries.",
            exampleUrdu = "عنوان: اردو بریل",
            exampleBraille = "⠀⠀⠀⠷⠝⠺⠁⠝⠒ ⠁⠗⠙⠺ ⠃⠗⠊⠇⠀⠀⠀",
            sequenceDesc = "Padding calculated for standard line width."
        )
    )
}
