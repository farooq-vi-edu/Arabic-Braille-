package com.example.braille

data class BrailleCell(
    val dots: List<Int>,
    val unicode: String,
    val display: String,
    val nameUrdu: String,
    val nameEn: String,
    val rule: String = ""
)

data class BrailleDictEntry(
    val id: String,
    val urdu: String,
    val dots: List<Int>,
    val unicode: String,
    val grade: String,
    val category: String,
    val description: String
)

data class BrailleRule(
    val id: String,
    val titleUrdu: String,
    val titleEn: String,
    val grade: String,
    val descUrdu: String,
    val descEn: String,
    val exampleUrdu: String,
    val exampleBraille: String,
    val sequenceDesc: String
)
