package com.example.braille

object UrduBrailleEngine {

    const val AYAH_MARKER_UNICODE = "⠯"
    val AYAH_MARKER_DOTS = listOf(2, 3, 5, 6)

    const val NUMBER_SIGN_UNICODE = "⠼"
    val NUMBER_SIGN_DOTS = listOf(3, 4, 5, 6)

    val CHAR_MAP = mapOf(
        'ا' to BrailleCell(listOf(1), "⠁", "ا", "الف", "Alif", "حرف اول"),
        'آ' to BrailleCell(listOf(3, 4, 5), "⠜", "آ", "الف مد آ", "Alif Madda", "مفرد نشان"),
        'ب' to BrailleCell(listOf(1, 2), "⠃", "ب", "بے", "Bay"),
        'پ' to BrailleCell(listOf(1, 2, 3, 4), "⠏", "پ", "پے", "Pay"),
        'ت' to BrailleCell(listOf(2, 3, 4, 5), "⠞", "ت", "تے", "Tay"),
        'ٹ' to BrailleCell(listOf(2, 4, 5, 6), "⠺", "ٹ", "ٹے", "Ttav"),
        'ث' to BrailleCell(listOf(1, 4, 5, 6), "⠹", "ث", "ثے", "Say"),
        'ج' to BrailleCell(listOf(2, 4, 5), "⠚", "ج", "جیم", "Jeem"),
        'چ' to BrailleCell(listOf(1, 4), "⠉", "چ", "چے", "Chay"),
        'ح' to BrailleCell(listOf(1, 5, 6), "⠱", "ح", "بڑی حے", "Hay"),
        'خ' to BrailleCell(listOf(1, 3, 4, 6), "⠭", "خ", "خے", "Khay"),
        'د' to BrailleCell(listOf(1, 4, 5), "⠙", "د", "دال", "Daal"),
        'ڈ' to BrailleCell(listOf(1, 2, 4, 6), "⠫", "ڈ", "ڈال", "Ddaal"),
        'ذ' to BrailleCell(listOf(2, 3, 4, 6), "⠽", "ذ", "ذال", "Zaal"),
        'ر' to BrailleCell(listOf(1, 2, 3, 5), "⠗", "ر", "رے", "Ray"),
        'ڑ' to BrailleCell(listOf(1, 2, 3, 4, 5, 6), "⠿", "ڑ", "ڑے", "Rray"),
        'ز' to BrailleCell(listOf(1, 3, 5, 6), "⠵", "ز", "زے", "Zay"),
        'ژ' to BrailleCell(listOf(3, 5, 6), "⠸", "ژ", "ژے", "Zhey"),
        'س' to BrailleCell(listOf(2, 3, 4), "⠎", "س", "سین", "Seen"),
        'ش' to BrailleCell(listOf(1, 4, 6), "⠩", "ش", "شین", "Sheen"),
        'ص' to BrailleCell(listOf(1, 2, 3, 4, 6), "⠯", "ص", "صاد", "Saad"),
        'ض' to BrailleCell(listOf(1, 2, 4, 5, 6), "⠻", "ض", "ضاد", "Zaad"),
        'ط' to BrailleCell(listOf(2, 3, 4, 5, 6), "⠾", "ط", "طوئے", "Ttoy"),
        'ظ' to BrailleCell(listOf(1, 2, 3, 4, 5), "⠟", "ظ", "ظوئے", "Zoy"),
        'ع' to BrailleCell(listOf(1, 2, 3, 5, 6), "⠷", "ع", "عین", "Ain"),
        'غ' to BrailleCell(listOf(1, 2, 6), "⠛", "غ", "غین", "Ghain"),
        'ف' to BrailleCell(listOf(1, 2, 4), "⠋", "ف", "فے", "Fay"),
        'ق' to BrailleCell(listOf(1, 2, 3, 4, 5), "⠟", "ق", "قاف", "Qaaf"),
        'ک' to BrailleCell(listOf(1, 3), "⠅", "ک", "کاف", "Kaaf"),
        'گ' to BrailleCell(listOf(1, 2, 4, 5), "⠛", "گ", "گاف", "Gaaf"),
        'ل' to BrailleCell(listOf(1, 2, 3), "⠇", "ل", "لام", "Laam"),
        'م' to BrailleCell(listOf(1, 3, 4), "⠍", "م", "میم", "Meem"),
        'ن' to BrailleCell(listOf(1, 3, 4, 5), "⠝", "ن", "نون", "Noon"),
        'ں' to BrailleCell(listOf(3, 4, 6), "⠬", "ں", "نون غنہ", "Noon Ghunna"),
        'و' to BrailleCell(listOf(2, 4, 5, 6), "⠺", "و", "واؤ", "Wao"),
        'ہ' to BrailleCell(listOf(1, 2, 5), "⠓", "ہ", "چھوٹی ہ", "Choti He"),
        'ھ' to BrailleCell(listOf(2, 3, 6), "⠦", "ھ", "دو چشمی ھ", "Do Chashmi He"),
        'ء' to BrailleCell(listOf(3), "⠄", "ء", "ہمزہ", "Hamza"),
        'ی' to BrailleCell(listOf(2, 4), "⠊", "ی", "چھوٹی یے", "Choti Ye"),
        'ے' to BrailleCell(listOf(3, 4), "⠌", "ے", "بڑی یے", "Badi Ye"),
        'ئ' to BrailleCell(listOf(1, 3, 4, 5, 6), "⠝", "ئ", "ہمزہ یے", "Hamza Ye"),
        // Diacritics
        'َ' to BrailleCell(listOf(2), "⠂", "َ", "زبر", "Zabar"),
        'ِ' to BrailleCell(listOf(1, 5), "⠑", "ِ", "زیر", "Zair"),
        'ُ' to BrailleCell(listOf(1, 3, 6), "⠥", "ُ", "پیش", "Pesh"),
        'ّ' to BrailleCell(listOf(4), "⠈", "ّ", "تشدید", "Tashdeed"),
        'ً' to BrailleCell(listOf(2, 3), "⠆", "ً", "دو زبر / تنوین", "Tanween"),
        'ٍ' to BrailleCell(listOf(3, 5), "⠔", "ٍ", "دو زیر", "Do Zair"),
        'ٌ' to BrailleCell(listOf(2, 6), "⠢", "ٌ", "دو پیش", "Do Pesh"),
        'ْ' to BrailleCell(listOf(2, 5), "⠒", "ْ", "جزم / سکون", "Jazam"),
        'ٰ' to BrailleCell(listOf(3, 4, 5), "⠜", "ٰ", "کھڑا زبر", "Khada Zabar"),
        // Quranic Waqf & Punctuation
        'ۚ' to BrailleCell(listOf(3, 6), "⠤", "ۚ", "وقف جائز", "Waqf Jaiz"),
        'ۖ' to BrailleCell(listOf(1, 2, 5, 6), "⠳", "ۖ", "وقف صلی", "Waqf Sali"),
        'ۗ' to BrailleCell(listOf(1, 2, 3, 4, 5), "⠟", "ۗ", "وقف قلی", "Waqf Qali"),
        '۔' to BrailleCell(listOf(2, 5, 6), "⠲", "۔", "ختمہ / فل اسٹاپ", "Full Stop"),
        '،' to BrailleCell(listOf(2), "⠂", "،", "سکتہ / کوما", "Comma"),
        '؛' to BrailleCell(listOf(2, 3), "⠆", "؛", "وقفہ / سیمی کولن", "Semicolon"),
        '؟' to BrailleCell(listOf(2, 3, 6), "⠦", "؟", "سوالیہ", "Question Mark"),
        '!' to BrailleCell(listOf(2, 3, 5), "⠖", "!", "ندائیہ / فجائیہ", "Exclamation"),
        '۝' to BrailleCell(listOf(2, 3, 5, 6), "⠯", "۝", "نشانِ آیت", "Ayah Marker"),
        '۞' to BrailleCell(listOf(2, 3, 5, 6), "⠯", "۞", "نشانِ آیت و رکوع", "Ayah/Ruku")
    )

    val DIGIT_MAP = mapOf(
        '1' to BrailleCell(listOf(1), "⠁", "1", "عدد ۱", "Digit 1"),
        '2' to BrailleCell(listOf(1, 2), "⠃", "2", "عدد ۲", "Digit 2"),
        '3' to BrailleCell(listOf(1, 4), "⠉", "3", "عدد ۳", "Digit 3"),
        '4' to BrailleCell(listOf(1, 4, 5), "⠙", "4", "عدد ۴", "Digit 4"),
        '5' to BrailleCell(listOf(1, 5), "⠑", "5", "عدد ۵", "Digit 5"),
        '6' to BrailleCell(listOf(1, 2, 4), "⠋", "6", "عدد ۶", "Digit 6"),
        '7' to BrailleCell(listOf(1, 2, 4, 5), "⠛", "7", "عدد ۷", "Digit 7"),
        '8' to BrailleCell(listOf(1, 2, 5), "⠓", "8", "عدد ۸", "Digit 8"),
        '9' to BrailleCell(listOf(2, 4), "⠊", "9", "عدد ۹", "Digit 9"),
        '0' to BrailleCell(listOf(2, 4, 5), "⠚", "0", "عدد ۰", "Digit 0"),
        '۱' to BrailleCell(listOf(1), "⠁", "۱", "عدد ۱", "Digit 1"),
        '۲' to BrailleCell(listOf(1, 2), "⠃", "۲", "عدد ۲", "Digit 2"),
        '۳' to BrailleCell(listOf(1, 4), "⠉", "۳", "عدد ۳", "Digit 3"),
        '۴' to BrailleCell(listOf(1, 4, 5), "⠙", "۴", "عدد ۴", "Digit 4"),
        '۵' to BrailleCell(listOf(1, 5), "⠑", "۵", "عدد ۵", "Digit 5"),
        '۶' to BrailleCell(listOf(1, 2, 4), "⠋", "۶", "عدد ۶", "Digit 6"),
        '۷' to BrailleCell(listOf(1, 2, 4, 5), "⠛", "۷", "عدد ۷", "Digit 7"),
        '۸' to BrailleCell(listOf(1, 2, 5), "⠓", "۸", "عدد ۸", "Digit 8"),
        '۹' to BrailleCell(listOf(2, 4), "⠊", "۹", "عدد ۹", "Digit 9"),
        '۰' to BrailleCell(listOf(2, 4, 5), "⠚", "۰", "عدد ۰", "Digit 0")
    )

    // Grade 2 Contractions (مخففات و اختصارات)
    val GRADE2_CONTRACTIONS = listOf(
        // کل لفظی مفرد نشانات
        Triple("بہت", listOf(1, 2), "⠃"),
        Triple("پر", listOf(1, 2, 3, 4), "⠏"),
        Triple("تو", listOf(2, 3, 4, 5), "⠞"),
        Triple("جو", listOf(2, 4, 5), "⠚"),
        Triple("چاہیے", listOf(1, 4), "⠉"),
        Triple("حاصل", listOf(1, 5, 6), "⠱"),
        Triple("خالی", listOf(1, 3, 4, 6), "⠭"),
        Triple("دیکھ", listOf(1, 4, 5), "⠙"),
        Triple("ڈال", listOf(1, 2, 4, 6), "⠫"),
        Triple("رکھ", listOf(1, 2, 3, 5), "⠗"),
        Triple("سب", listOf(2, 3, 4), "⠎"),
        Triple("شاید", listOf(1, 4, 6), "⠩"),
        Triple("طرف", listOf(2, 3, 4, 5, 6), "⠾"),
        Triple("غیر", listOf(1, 2, 6), "⠛"),
        Triple("فورا", listOf(1, 2, 4), "⠋"),
        Triple("کوئی", listOf(1, 3), "⠅"),
        Triple("لے", listOf(1, 2, 3), "⠇"),
        Triple("میں", listOf(1, 3, 4), "⠍"),
        Triple("نہ", listOf(1, 3, 4, 5), "⠝"),
        Triple("وہ", listOf(2, 4, 5, 6), "⠺"),
        Triple("ہو", listOf(1, 2, 5), "⠓"),
        Triple("یہ", listOf(2, 4), "⠊"),
        Triple("ایک", listOf(1, 5), "⠑"),
        Triple("اور", listOf(1, 2, 3, 4, 6), "⠯"),
        // دو چشمی ھ والے مرکبات
        Triple("بھی", listOf(2, 3), "⠆"),
        Triple("پھر", listOf(1, 2, 3), "⠇"),
        Triple("تک", listOf(2, 3, 4, 5), "⠞"),
        Triple("ٹھیک", listOf(2, 4, 5, 6), "⠺"),
        Triple("جب", listOf(2, 4, 5), "⠚"),
        Triple("کچھ", listOf(1, 6), "⠡")
    )

    fun dotsToUnicode(dots: List<Int>): String {
        if (dots.isEmpty()) return "⠀"
        var code = 0x2800
        for (d in dots) {
            if (d in 1..8) {
                code = code or (1 shl (d - 1))
            }
        }
        return code.toChar().toString()
    }

    /**
     * Translates Urdu text to Braille cells adhering strictly to:
     * - Grade 1 & Grade 2 standards (AIOU Code 3601).
     * - Ayah Marker Rule: [Last Char/Waqf] + [2,3,5,6 (⠯)] + [SPACE] + [3,4,5,6 (⠼)] + [Ayah Digits].
     */
    fun translateToBraille(rawText: String, grade2: Boolean = false): List<BrailleCell> {
        val cells = mutableListOf<BrailleCell>()
        if (rawText.isBlank()) return cells

        // Regex to identify Ayah Marker patterns: e.g. " ۝ ١", " ۝1", " 1", " (١)"
        // Quranic Verse Ending Pattern: optional waqf before, optional ۝, then digits
        val ayahRegex = Regex("""\s*([۝۞]?)\s*([\d\u0660-\u0669]+)""")

        var text = rawText

        var i = 0
        while (i < text.length) {
            val remaining = text.substring(i)

            // Check if upcoming substring is Ayah Marker with number
            val ayahMatch = ayahRegex.matchAt(remaining, 0)
            if (ayahMatch != null && (ayahMatch.groupValues[1].isNotEmpty() || (i > 0 && text[i - 1].isLetter()))) {
                val digits = ayahMatch.groupValues[2]
                // 1. Ayah marker attached directly with NO leading space
                cells.add(
                    BrailleCell(
                        dots = AYAH_MARKER_DOTS,
                        unicode = AYAH_MARKER_UNICODE,
                        display = "۝",
                        nameUrdu = "نشانِ آیت (بلا فاصلہ پیوستہ)",
                        nameEn = "Ayah Marker (Dots 2-3-5-6)",
                        rule = "قاعدہ ۱: نشانِ آیت پچھلے لفظ کے ساتھ بغیر فاصلہ متصل ہوگا"
                    )
                )
                // 2. Exactly one blank space after Ayah marker
                cells.add(
                    BrailleCell(
                        dots = emptyList(),
                        unicode = "⠀",
                        display = " ",
                        nameUrdu = "ایک خالی خانہ (فاصلہ)",
                        nameEn = "Single Blank Cell (Space)",
                        rule = "قاعدہ ۳: نشانِ آیت کے فورا بعد ایک خالی خانہ لازمی ہے"
                    )
                )
                // 3. Braille Number sign
                cells.add(
                    BrailleCell(
                        dots = NUMBER_SIGN_DOTS,
                        unicode = NUMBER_SIGN_UNICODE,
                        display = "#",
                        nameUrdu = "علامتِ عدد",
                        nameEn = "Braille Number Sign (Dots 3-4-5-6)",
                        rule = "قاعدہ ۴: ہندسوں سے قبل علامتِ عدد لازمی ہے"
                    )
                )
                // 4. Digits
                for (digitChar in digits) {
                    val digitCell = DIGIT_MAP[digitChar] ?: BrailleCell(
                        listOf(1), "⠁", digitChar.toString(), "عدد $digitChar", "Digit"
                    )
                    cells.add(digitCell)
                }
                i += ayahMatch.value.length
                continue
            }

            // Check for Grade 2 Contractions if enabled
            if (grade2) {
                var contractionFound = false
                for ((word, dots, unicode) in GRADE2_CONTRACTIONS) {
                    if (remaining.startsWith(word)) {
                        // Ensure word boundary or valid position
                        val nextIdx = i + word.length
                        val isBoundary = nextIdx >= text.length || text[nextIdx].isWhitespace() || text[nextIdx] in "،۔؛؟!۝"
                        if (isBoundary) {
                            cells.add(
                                BrailleCell(
                                    dots = dots,
                                    unicode = unicode,
                                    display = word,
                                    nameUrdu = "مخفف: $word",
                                    nameEn = "Grade 2 Contraction: $word",
                                    rule = "درجہ دوم اردو بریل مخففات"
                                )
                            )
                            i += word.length
                            contractionFound = true
                            break
                        }
                    }
                }
                if (contractionFound) continue
            }

            val ch = text[i]
            when {
                ch == ' ' -> {
                    cells.add(
                        BrailleCell(
                            dots = emptyList(),
                            unicode = "⠀",
                            display = " ",
                            nameUrdu = "فاصلہ (خالی خانہ)",
                            nameEn = "Space"
                        )
                    )
                }
                ch in "0123456789۰۱۲۳۴۵۶۷۸۹" -> {
                    // Prepend number sign if start of digit run
                    if (cells.isEmpty() || cells.last().display == " " || cells.last().rule != "عدد سلسلہ") {
                        cells.add(
                            BrailleCell(
                                dots = NUMBER_SIGN_DOTS,
                                unicode = NUMBER_SIGN_UNICODE,
                                display = "#",
                                nameUrdu = "علامتِ عدد",
                                nameEn = "Number Sign",
                                rule = "عدد سلسلہ"
                            )
                        )
                    }
                    val cell = DIGIT_MAP[ch] ?: BrailleCell(listOf(1), "⠁", ch.toString(), "عدد $ch", "Digit")
                    cells.add(cell.copy(rule = "عدد سلسلہ"))
                }
                else -> {
                    val cell = CHAR_MAP[ch] ?: BrailleCell(
                        dots = emptyList(),
                        unicode = "⠀",
                        display = ch.toString(),
                        nameUrdu = "نامعلوم: $ch",
                        nameEn = "Unknown char"
                    )
                    cells.add(cell)
                }
            }
            i++
        }

        return cells
    }

    /**
     * Reverse translates Braille cells into Urdu text
     */
    fun brailleCellsToUrdu(cells: List<BrailleCell>): String {
        val sb = StringBuilder()
        var inNumber = false
        var afterAyah = false

        for (cell in cells) {
            when {
                cell.dots == AYAH_MARKER_DOTS -> {
                    sb.append(" ۝")
                    afterAyah = true
                    inNumber = false
                }
                cell.dots == NUMBER_SIGN_DOTS -> {
                    inNumber = true
                }
                cell.dots.isEmpty() -> {
                    sb.append(" ")
                    inNumber = false
                    afterAyah = false
                }
                inNumber -> {
                    val digitEntry = DIGIT_MAP.entries.find { it.value.dots == cell.dots }
                    if (digitEntry != null) {
                        sb.append(digitEntry.key)
                    } else {
                        inNumber = false
                    }
                }
                else -> {
                    val charEntry = CHAR_MAP.entries.find { it.value.dots == cell.dots }
                    if (charEntry != null) {
                        sb.append(charEntry.key)
                    } else {
                        sb.append("؟")
                    }
                }
            }
        }
        return sb.toString().trim()
    }
}
